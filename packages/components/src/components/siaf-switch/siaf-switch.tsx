import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-switch', styleUrl: 'siaf-switch.css', shadow: true })
export class SiafSwitch {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() label?: string;
  @Event() siafChange!: EventEmitter<boolean>;

  private toggle = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.siafChange.emit(this.checked);
  };

  render() {
    return (
      <Host disabled={this.disabled ? true : undefined}>
        <button
          type="button"
          class={{ track: true, on: this.checked }}
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          disabled={this.disabled}
          onClick={this.toggle}
        >
          <span class="thumb" />
        </button>
        <span class="label" onClick={this.toggle}>
          <slot>{this.label}</slot>
        </span>
      </Host>
    );
  }
}
