/**
 * Shared a11y helpers for SIAF overlay / form components.
 */

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let idSeq = 0;
export function siafId(prefix = 'siaf'): string {
  idSeq += 1;
  return `${prefix}-${idSeq}`;
}

export function getFocusable(root: ParentNode | null | undefined): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true' && el.tabIndex !== -1,
  );
}

export function focusFirst(root: ParentNode | null | undefined): void {
  const list = getFocusable(root);
  (list[0] || (root as HTMLElement))?.focus?.();
}

/**
 * Trap Tab/Shift+Tab inside `root`. Returns cleanup.
 */
export function trapFocus(root: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const list = getFocusable(root);
  if (list.length === 0) {
    event.preventDefault();
    root.focus();
    return;
  }
  const first = list[0];
  const last = list[list.length - 1];
  const active = root.getRootNode() instanceof ShadowRoot
    ? ((root.getRootNode() as ShadowRoot).activeElement as HTMLElement | null)
    : (document.activeElement as HTMLElement | null);

  if (event.shiftKey) {
    if (active === first || !list.includes(active as HTMLElement)) {
      event.preventDefault();
      last.focus();
    }
  } else if (active === last) {
    event.preventDefault();
    first.focus();
  }
}

export class FocusRestore {
  private previous: HTMLElement | null = null;

  capture(): void {
    this.previous = (document.activeElement as HTMLElement) || null;
  }

  restore(): void {
    try {
      this.previous?.focus?.();
    } catch {
      /* ignore */
    }
    this.previous = null;
  }
}
