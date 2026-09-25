import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { siafId } from '../../utils/a11y';

/**
 * Text fields SIAF-RP (UI Kit · node 7524:6726).
 * Size=Default: min-h 40, pad 8/16, radius 8, body 14.
 * Size=Compact: min-h 32.
 * Label: notch sobre el borde (caption 12 Medium), no encima del campo.
 */
@Component({ tag: 'siaf-input', styleUrl: 'siaf-input.css', shadow: true })
export class SiafInput {
  @Prop() label?: string;
  @Prop() placeholder?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() type: string = 'text';
  @Prop() name?: string;
  @Prop() helperText?: string;
  @Prop() errorText?: string;
  @Prop({ reflect: true }) size: 'default' | 'compact' = 'default';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) required = false;
  @Event() siafInput!: EventEmitter<string>;
  @Event() siafChange!: EventEmitter<string>;

  private fieldId = siafId('input');
  private helpId = siafId('input-help');
  private errId = siafId('input-err');

  private onInput = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.siafInput.emit(this.value);
  };
  private onChange = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.siafChange.emit(this.value);
  };

  render() {
    const invalid = !!this.errorText;
    const describedBy = invalid ? this.errId : this.helperText ? this.helpId : undefined;
    const hasLabel = !!this.label;
    return (
      <Host
        class={{
          invalid,
          disabled: this.disabled,
          compact: this.size === 'compact',
          'has-label': hasLabel,
        }}
      >
        {/* Label fuera de .field: el border del field se pinta encima de hijos (Chrome);
            sibling + z-index cubre el stroke 1:1 Kit 7524:7106 */}
        <div class="control">
          {hasLabel ? (
            <div class="label-wrap">
              <label class="label" htmlFor={this.fieldId}>
                {this.label}
                {this.required ? (
                  <span class="req" aria-hidden="true">
                    *
                  </span>
                ) : null}
                {this.required ? <span class="sr-only"> (obligatorio)</span> : null}
              </label>
            </div>
          ) : null}
          <div class="field" part="field">
            <div class="icons-text">
              <slot name="leading" />
              <input
                id={this.fieldId}
                part="input"
                type={this.type}
                name={this.name}
                value={this.value}
                placeholder={this.placeholder}
                disabled={this.disabled}
                readOnly={this.readonly}
                required={this.required}
                aria-invalid={invalid ? 'true' : 'false'}
                aria-required={this.required ? 'true' : undefined}
                aria-describedby={describedBy}
                onInput={this.onInput}
                onChange={this.onChange}
              />
              <slot name="trailing" />
            </div>
          </div>
        </div>
        {this.errorText ? (
          <div class="msg error" id={this.errId} role="alert">
            {this.errorText}
          </div>
        ) : this.helperText ? (
          <div class="msg" id={this.helpId}>
            {this.helperText}
          </div>
        ) : null}
      </Host>
    );
  }
}
