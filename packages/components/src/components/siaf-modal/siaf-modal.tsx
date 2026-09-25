import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { FocusRestore, focusFirst, trapFocus } from '../../utils/a11y';

/**
 * Modals - SIAF (Componentes Transversales).
 * Spec Figma Grabar: 500px, Modal interno radius 8, padding 48/24/24/24, gap 24.
 * a11y: dialog modal, Escape, focus trap, restore focus.
 */
@Component({ tag: 'siaf-modal', styleUrl: 'siaf-modal.css', shadow: true })
export class SiafModal {
  @Element() el!: HTMLElement;
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop() heading = '';
  @Prop() showClose = true;
  @Prop() confirmActions = false;
  @Prop() cancelLabel = 'Cancelar';
  @Prop() confirmLabel = 'Aceptar';
  @Event() siafClose!: EventEmitter<void>;
  @Event() siafCancel!: EventEmitter<void>;
  @Event() siafConfirm!: EventEmitter<void>;

  private restore = new FocusRestore();

  @Watch('open')
  onOpenChange(open: boolean) {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      this.restore.capture();
      requestAnimationFrame(() => {
        const dialog = this.el.shadowRoot?.querySelector<HTMLElement>('[role="dialog"]');
        if (dialog) {
          dialog.setAttribute('tabindex', '-1');
          focusFirst(dialog);
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

  private cancel = () => {
    this.siafCancel.emit();
    this.close();
  };

  private confirm = () => {
    this.siafConfirm.emit();
  };

  private onKey = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      return;
    }
    const dialog = this.el.shadowRoot?.querySelector<HTMLElement>('[role="dialog"]');
    if (dialog) trapFocus(dialog, e);
  };

  private onScrim = (e: MouseEvent) => {
    if (e.target === e.currentTarget) this.close();
  };

  render() {
    if (!this.open) return <Host aria-hidden="true" />;
    const titleId = 'siaf-modal-title';
    const descId = 'siaf-modal-desc';
    return (
      <Host onKeyDown={this.onKey}>
        <div class="scrim" part="scrim" onClick={this.onScrim}>
          <div
            class="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            part="dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {this.showClose ? (
              <button type="button" class="x" aria-label="Cerrar" onClick={this.close}>
                <siaf-icon name="close" size="lg"></siaf-icon>
              </button>
            ) : null}
            <div class="thumb">
              <slot name="illustration" />
            </div>
            <div class="body-block">
              <h2 class="title" id={titleId}>
                <slot name="header">{this.heading}</slot>
              </h2>
              <div class="body" id={descId}>
                <slot />
              </div>
            </div>
            <footer class="footer" part="footer">
              <slot name="footer" />
              {this.confirmActions ? (
                <div class="actions" part="actions">
                  <siaf-button variant="outlined" color="primary" onSiafClick={this.cancel}>
                    {this.cancelLabel}
                  </siaf-button>
                  <siaf-button variant="filled" color="primary" onSiafClick={this.confirm}>
                    {this.confirmLabel}
                  </siaf-button>
                </div>
              ) : null}
            </footer>
          </div>
        </div>
      </Host>
    );
  }
}
