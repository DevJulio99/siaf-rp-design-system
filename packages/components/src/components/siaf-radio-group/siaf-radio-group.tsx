import { Component, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

export interface SiafRadioOption { label: string; value: string; disabled?: boolean }

@Component({ tag: 'siaf-radio-group', styleUrl: 'siaf-radio-group.css', shadow: true })
export class SiafRadioGroup {
  @Element() el!: HTMLElement;
  @Prop() name = 'siaf-radio';
  @Prop({ mutable: true }) value?: string;
  @Prop() label?: string;
  @Prop() options: SiafRadioOption[] | string = [];
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';
  @Event() siafChange!: EventEmitter<string>;

  private parsed(): SiafRadioOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return this.options || [];
  }

  private onSelect = (value: string) => {
    if (this.disabled) return;
    this.value = value;
    this.siafChange.emit(value);
  };

  @Listen('keydown')
  onKeyDown(ev: KeyboardEvent) {
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
    const opts = this.parsed().filter((o) => !o.disabled);
    const idx = opts.findIndex((o) => o.value === this.value);
    const next = ev.key === 'ArrowDown' ? opts[Math.min(idx + 1, opts.length - 1)] : opts[Math.max(idx - 1, 0)];
    if (next) { this.onSelect(next.value); ev.preventDefault(); }
  }

  render() {
    const opts = this.parsed();
    return (
      <Host role="radiogroup" aria-label={this.label} class={this.orientation}>
        {this.label ? <div class="legend">{this.label}</div> : null}
        <div class="list">
          {opts.map((opt) => (
            <label class={{ item: true, disabled: this.disabled || !!opt.disabled }}>
              <input
                type="radio"
                name={this.name}
                value={opt.value}
                checked={this.value === opt.value}
                disabled={this.disabled || opt.disabled}
                onChange={() => this.onSelect(opt.value)}
              />
              <span class="hit">
                <span class="dot" part="dot" />
              </span>
              <span class="text">{opt.label}</span>
            </label>
          ))}
          <slot />
        </div>
      </Host>
    );
  }
}
