import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { FocusRestore, focusFirst, trapFocus } from '../../utils/a11y';

/**
 * Side panel / drawer SIAF (Transversales).
 * a11y: dialog modal, Escape, focus trap, restore focus, body scroll lock.
 *
 * @slot - Cuerpo
 * @slot header - Título alternativo
 * @slot footer - Acciones
 */
@Component({ tag: 'siaf-side-panel', styleUrl: 'siaf-side-panel.css', shadow: true })
export class SiafSidePanel {
  @Element() el!: HTMLElement;
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop() heading = '';
  @Prop({ reflect: true }) side: 'right' | 'left' = 'right';
  /** Ancho Kit Sidenav = 370 */
  @Prop() width = '370px';
  @Event() siafClose!: EventEmitter<void>;

  private restore = new FocusRestore();

  @Watch('open')
  onOpen(open: boolean) {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      this.restore.capture();
      requestAnimationFrame(() => {
        const panel = this.el.shadowRoot?.querySelector<HTMLElement>('[role="dialog"]');
        if (panel) {
          panel.setAttribute('tabindex', '-1');
          focusFirst(panel);
        }
      });
    } else {
      this.restore.restore();
    }
  }

  disconnectedCallback() {
    if (typeof document !== 'undefined') document.body.style.overflow = '';
  }

  private close = () => {
    this.open = false;
    this.siafClose.emit();
  };

  private onKey = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      return;
    }
    const panel = this.el.shadowRoot?.querySelector<HTMLElement>('[role="dialog"]');
    if (panel) trapFocus(panel, e);
  };

  render() {
    const titleId = 'siaf-side-panel-title';
    return (
      <Host class={{ open: this.open }} onKeyDown={this.onKey}>
        <div class="scrim" onClick={this.close} hidden={!this.open} />
        <aside
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-hidden={this.open ? 'false' : 'true'}
          style={{ '--siaf-side-panel-width': this.width } as Record<string, string>}
        >
          <header class="header">
            <h2 class="title" id={titleId}>
              <slot name="header">{this.heading}</slot>
            </h2>
            <button type="button" class="x" aria-label="Cerrar" onClick={this.close}>
              <siaf-icon name="close" size="lg"></siaf-icon>
            </button>
          </header>
          <div class="body">
            <slot />
          </div>
          <footer class="footer">
            <slot name="footer" />
          </footer>
        </aside>
      </Host>
    );
  }
}
