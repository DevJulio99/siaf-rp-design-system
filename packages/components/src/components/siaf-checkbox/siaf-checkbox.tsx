import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-checkbox', styleUrl: 'siaf-checkbox.css', shadow: true })
export class SiafCheckbox {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) indeterminate = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() value?: string;
  @Event() siafChange!: EventEmitter<boolean>;

  private onChange = (e: Event) => {
    const el = e.target as HTMLInputElement;
    this.checked = el.checked;
    this.siafChange.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <label class={{ control: true, disabled: this.disabled }}>
          <input
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            ref={(el) => {
              if (el) el.indeterminate = this.indeterminate;
            }}
            onChange={this.onChange}
          />
          <span class="hit">
            <span class="box" part="box" />
          </span>
          <span class="label"><slot>{this.label}</slot></span>
        </label>
      </Host>
    );
  }
}
