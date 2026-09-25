import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafAlertTone } from '../../utils/types';
import { SIAF_ALERT_ICONS } from '../../utils/icons';

/**
 * Alerta institucional SIAF-RP (UI Kit · Alerts).
 * Medido: pad 16, radius 8, h~68, gap 8, título 14 Bold, mensaje 12, sin borde.
 *
 * @slot - Contenido / mensaje
 * @slot title - Título opcional
 * @slot icon - Ícono opcional (reemplaza el glifo por tono)
 */
@Component({
  tag: 'siaf-alert',
  styleUrl: 'siaf-alert.css',
  shadow: true,
})
export class SiafAlert {
  @Prop({ reflect: true }) tone: SiafAlertTone = 'info';
  @Prop() role: 'status' | 'alert' = 'status';
  /** Si false, no muestra ícono por defecto */
  @Prop() showIcon = true;

  render() {
    const iconName = SIAF_ALERT_ICONS[this.tone] ?? 'info';
    return (
      <Host>
        <div class={{ alert: true, [`tone-${this.tone}`]: true }} role={this.role}>
          {this.showIcon ? (
            <div class="icon" aria-hidden="true">
              <slot name="icon">
                <siaf-icon name={iconName} size="lg"></siaf-icon>
              </slot>
            </div>
          ) : null}
          <div class="body">
            <div class="title">
              <slot name="title" />
            </div>
            <div class="message">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
