import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { SiafTone } from '../../utils/types';
import { SIAF_SNACKBAR_ICONS } from '../../utils/icons';

/**
 * Snackbar SIAF (UI Kit).
 * @slot - Mensaje
 * @slot action - Acción opcional
 * @slot icon - Ícono (reemplaza el del tono)
 */
@Component({ tag: 'siaf-snackbar', styleUrl: 'siaf-snackbar.css', shadow: true })
export class SiafSnackbar {
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop({ reflect: true }) tone: SiafTone = 'neutral';
  @Prop() message = '';
  @Prop() duration = 4000;
  @Prop() showIcon = true;
  @Event() siafClose!: EventEmitter<void>;
  private timer?: number;

  @Watch('open')
  onOpen(open: boolean) {
    window.clearTimeout(this.timer);
    if (open && this.duration > 0) {
      this.timer = window.setTimeout(() => this.close(), this.duration);
    }
  }

  disconnectedCallback() {
    window.clearTimeout(this.timer);
  }

  private close = () => {
    this.open = false;
    this.siafClose.emit();
  };

  render() {
    const iconName = SIAF_SNACKBAR_ICONS[this.tone] ?? 'notifications';
    return (
      <Host class={{ open: this.open }} role="status" aria-live="polite" aria-atomic="true">
        <div class={`toast tone-${this.tone}`} part="toast">
          {this.showIcon ? (
            <span class="icon" aria-hidden="true">
              <slot name="icon">
                <siaf-icon name={iconName} size="lg"></siaf-icon>
              </slot>
            </span>
          ) : null}
          <span class="msg">
            <slot>{this.message}</slot>
          </span>
          <span class="action">
            <slot name="action" />
          </span>
          <button type="button" class="close" aria-label="Cerrar" onClick={this.close}>
            <siaf-icon name="close" size="lg"></siaf-icon>
          </button>
        </div>
      </Host>
    );
  }
}
