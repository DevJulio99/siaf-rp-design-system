import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { SiafButtonColor, SiafButtonSize, SiafButtonVariant } from '../../utils/types';
import type { SiafIconName } from '../../utils/icons';
import type { SiafIconSize } from '../siaf-icon/siaf-icon';

/**
 * Botón institucional SIAF-RP (UI Kit · Buttons, node 8305:2071).
 * Filled = brand accent · Outline/Text = neutral · Default 40 · Small 32 · gap 8 · Icon 24.
 * color=primary en Filled mapea al Filled del Kit (accent), no a brand-primary azul.
 *
 * @slot - Etiqueta del botón
 * @slot leading - Ícono / contenido a la izquierda
 * @slot trailing - Ícono / contenido a la derecha
 */
@Component({
  tag: 'siaf-button',
  styleUrl: 'siaf-button.css',
  shadow: true,
})
export class SiafButton {
  @Element() el!: HTMLElement;
  @Prop({ reflect: true }) variant: SiafButtonVariant = 'filled';
  /** En Filled, `primary` ≡ Kit Filled (accent). Outline/Text Kit = neutral. */
  @Prop({ reflect: true }) color: SiafButtonColor = 'primary';
  @Prop({ reflect: true }) size: SiafButtonSize = 'md';
  @Prop({ reflect: true }) disabled = false;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() ariaLabel?: string;
  /** Nombre de ícono SIAF a la izquierda (alternativa al slot leading) */
  @Prop() icon?: SiafIconName | string;
  /** Nombre de ícono SIAF a la derecha */
  @Prop() iconEnd?: SiafIconName | string;
  @Event() siafClick!: EventEmitter<MouseEvent>;

  private onClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.siafClick.emit(event);
  };

  private hasNamedSlot(name: string): boolean {
    return Array.from(this.el.childNodes).some(
      (n) => n.nodeType === Node.ELEMENT_NODE && (n as HTMLElement).slot === name,
    );
  }

  /** Figma Buttons: Icon 24×24 en Default y Small. */
  private glyphSize(): SiafIconSize {
    return 'lg';
  }

  render() {
    const showLeading = !!this.icon || this.hasNamedSlot('leading');
    const showTrailing = !!this.iconEnd || this.hasNamedSlot('trailing');
    const glyph = this.glyphSize();
    return (
      <Host>
        <button
          class={{
            btn: true,
            [`variant-${this.variant}`]: true,
            [`color-${this.color}`]: true,
            [`size-${this.size}`]: true,
            'has-icon': showLeading || showTrailing,
          }}
          type={this.type}
          disabled={this.disabled}
          aria-label={this.ariaLabel}
          aria-disabled={this.disabled ? 'true' : undefined}
          onClick={this.onClick}
        >
          {showLeading ? (
            <span class="leading" aria-hidden={this.icon && !this.hasNamedSlot('leading') ? 'true' : undefined}>
              {this.hasNamedSlot('leading') ? (
                <slot name="leading" />
              ) : this.icon ? (
                <siaf-icon name={this.icon} size={glyph}></siaf-icon>
              ) : null}
            </span>
          ) : null}
          <span class="label">
            <slot />
          </span>
          {showTrailing ? (
            <span class="trailing" aria-hidden={this.iconEnd && !this.hasNamedSlot('trailing') ? 'true' : undefined}>
              {this.hasNamedSlot('trailing') ? (
                <slot name="trailing" />
              ) : this.iconEnd ? (
                <siaf-icon name={this.iconEnd} size={glyph}></siaf-icon>
              ) : null}
            </span>
          ) : null}
        </button>
      </Host>
    );
  }
}
