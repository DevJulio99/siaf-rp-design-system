import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-side-panel a11y', () => {
  it('marks dialog closed when not open', async () => {
    const { root } = await render(<siaf-side-panel heading="Filtros"></siaf-side-panel>);
    const dialog = root.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-hidden')).toBe('true');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
  });

  it('exposes labelled dialog when open', async () => {
    const { root } = await render(<siaf-side-panel open heading="Filtros"></siaf-side-panel>);
    const dialog = root.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-hidden')).toBe('false');
    expect(root.shadowRoot?.querySelector('button[aria-label="Cerrar"]')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('#siaf-side-panel-title')?.textContent).toContain('Filtros');
  });
});
