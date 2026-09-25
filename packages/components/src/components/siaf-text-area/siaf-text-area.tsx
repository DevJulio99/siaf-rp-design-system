import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { siafId } from '../../utils/a11y';

/**
 * Text area (UI Kit · node 7524:7485).
 * Notch label igual que siaf-input · counter N/max si maxLength.
 */
@Component({ tag: 'siaf-text-area', styleUrl: 'siaf-text-area.css', shadow: true })
export class SiafTextArea {
  @Prop() label?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() placeholder?: string;
  @Prop() helperText?: string;
  @Prop() errorText?: string;
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) size: 'default' | 'compact' = 'default';
  @Prop() maxLength?: number;
  @Prop() rows = 3;
  @Event() siafInput!: EventEmitter<string>;
  @Event() siafChange!: EventEmitter<string>;

  private fieldId = siafId('textarea');
  private helpId = siafId('textarea-help');
  private errId = siafId('textarea-err');

  private onInput = (e: Event) => {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.siafInput.emit(this.value);
  };
  private onChange = (e: Event) => {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.siafChange.emit(this.value);
  };

  render() {
    const invalid = !!this.errorText;
    const describedBy = invalid ? this.errId : this.helperText ? this.helpId : undefined;
    const hasLabel = !!this.label;
    const showCounter = this.maxLength != null && this.maxLength > 0;
    const counterText = showCounter ? `${this.value.length}/${this.maxLength}` : '';

    return (
      <Host
        class={{
          invalid,
          disabled: this.disabled,
          compact: this.size === 'compact',
          'has-label': hasLabel,
          'has-counter': showCounter,
        }}
      >
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
            <textarea
              id={this.fieldId}
              part="textarea"
              value={this.value}
              placeholder={this.placeholder}
              disabled={this.disabled}
              required={this.required}
              rows={this.rows}
              maxlength={this.maxLength}
              aria-invalid={invalid ? 'true' : 'false'}
              aria-required={this.required ? 'true' : undefined}
              aria-describedby={describedBy}
              onInput={this.onInput}
              onChange={this.onChange}
            ></textarea>
            {showCounter ? (
              <span class="counter" part="counter" aria-live="polite">
                {counterText}
              </span>
            ) : null}
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
