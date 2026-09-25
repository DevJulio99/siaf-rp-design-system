import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * Input tags (UI Kit · 1. Input tags · node 12474:5170).
 */
@Component({ tag: 'siaf-input-tag', styleUrl: 'siaf-input-tag.css', shadow: true })
export class SiafInputTag {
  @Prop() label?: string;
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop({ reflect: true }) selected = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() dismissible = true;
  @Event() siafDismiss!: EventEmitter<void>;

  private onDismiss = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled) return;
    this.siafDismiss.emit();
  };

  render() {
    return (
      <Host>
        <span
          class={{
            tag: true,
            [`size-${this.size}`]: true,
            selected: this.selected,
            disabled: this.disabled,
          }}
          part="tag"
        >
          <span class="label">
            <slot>{this.label}</slot>
          </span>
          {this.dismissible ? (
            <button
              type="button"
              class="dismiss"
              part="dismiss"
              disabled={this.disabled}
              aria-label="Quitar"
              onClick={this.onDismiss}
            >
              <siaf-icon name="close" size="md"></siaf-icon>
            </button>
          ) : null}
        </span>
      </Host>
    );
  }
}
