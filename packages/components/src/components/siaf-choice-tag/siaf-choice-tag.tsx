import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import type { SiafIconName } from '../../utils/icons';

/**
 * Choice tags (UI Kit · 2. Choice tags · node 12482:857).
 * Emite siafSelect al click; no auto-toggle interno.
 */
@Component({ tag: 'siaf-choice-tag', styleUrl: 'siaf-choice-tag.css', shadow: true })
export class SiafChoiceTag {
  @Prop() label?: string;
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop({ reflect: true }) selected = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() icon?: SiafIconName | string;
  @Event() siafSelect!: EventEmitter<MouseEvent>;

  private onClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.siafSelect.emit(e);
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{
            tag: true,
            [`size-${this.size}`]: true,
            selected: this.selected,
          }}
          part="tag"
          disabled={this.disabled}
          aria-pressed={this.selected ? 'true' : 'false'}
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
