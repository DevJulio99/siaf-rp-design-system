import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { SiafIconName } from '../../utils/icons';
import type { SiafIconSize } from '../siaf-icon/siaf-icon';

/**
 * Icon buttons (UI Kit · node 8307:5607).
 * Filled = brand accent · Outline/Standard = neutral · Default 40 · Small 32.
 */
@Component({ tag: 'siaf-icon-button', styleUrl: 'siaf-icon-button.css', shadow: true })
export class SiafIconButton {
  @Prop() icon!: SiafIconName | string;
  @Prop({ reflect: true }) variant: 'filled' | 'outline' | 'standard' = 'filled';
  @Prop({ reflect: true }) size: 'md' | 'sm' = 'md';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) activated = false;
  @Prop() ariaLabel!: string;
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Event() siafClick!: EventEmitter<MouseEvent>;

  private onClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.siafClick.emit(event);
  };

  private glyphSize(): SiafIconSize {
    if (this.size === 'sm' && this.variant === 'standard') return 'md';
    return 'lg';
  }

  render() {
    return (
      <Host>
        <button
          class={{
            btn: true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            activated: this.activated,
          }}
          type={this.type}
          disabled={this.disabled}
          aria-label={this.ariaLabel}
          aria-pressed={this.activated ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : undefined}
          onClick={this.onClick}
        >
          <span class="glyph" aria-hidden="true">
            <siaf-icon name={this.icon} size={this.glyphSize()}></siaf-icon>
          </span>
        </button>
      </Host>
    );
  }
}
