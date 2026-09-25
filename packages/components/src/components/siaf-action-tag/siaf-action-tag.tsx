import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { SiafIconName } from '../../utils/icons';

/**
 * Action tags (UI Kit · 4. Action tags · node 12500:328).
 * Sin prop selected — solo Enabled en Kit.
 */
@Component({ tag: 'siaf-action-tag', styleUrl: 'siaf-action-tag.css', shadow: true })
export class SiafActionTag {
  @Prop() label?: string;
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop({ reflect: true }) disabled = false;
  @Prop() icon?: SiafIconName | string;
  @Event() siafClick!: EventEmitter<MouseEvent>;

  private onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.siafClick.emit(e);
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{
            tag: true,
            [`size-${this.size}`]: true,
          }}
          part="tag"
          disabled={this.disabled}
          onClick={this.onClick}
        >
          {this.icon ? (
            <span class="ico" aria-hidden="true">
              <siaf-icon name={this.icon} size="md"></siaf-icon>
            </span>
          ) : null}
          <span class="label">
            <slot>{this.label}</slot>
          </span>
        </button>
      </Host>
    );
  }
}
