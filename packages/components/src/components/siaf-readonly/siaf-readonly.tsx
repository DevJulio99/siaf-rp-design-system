import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Readonly Card SIAF-RP (UI Kit · 7008:36924).
 * Spec: gap 4 · label Overline 11 Medium uppercase · value row h24 gap 8 ·
 * value Text body2 14 Bold · trailing info 24 (default True) · leading 24 opcional.
 */
@Component({ tag: 'siaf-readonly', styleUrl: 'siaf-readonly.css', shadow: true })
export class SiafReadonly {
  @Prop() label?: string;
  @Prop() value?: string;
  /** Leyenda tipo "Precargado del CMN" */
  @Prop() hint?: string;
  /** Inputs=Text (Bold) | Comment (Regular) */
  @Prop({ reflect: true }) inputs: 'text' | 'comment' = 'text';
  /** Trailing icon Kit default = True (info 24). */
  @Prop() trailingIcon = true;
  /** Leading icon Kit default = False. */
  @Prop() leadingIcon = false;
  @Prop() trailingIconName = 'info';
  @Prop() leadingIconName = 'info';

  render() {
    return (
      <Host class={`inputs-${this.inputs}`}>
        <div class="card" part="card">
          {this.label ? <div class="label">{this.label}</div> : null}
          <div class="value-row" part="value">
            {this.leadingIcon ? (
              <span class="icon leading" aria-hidden="true">
                <slot name="leading">
                  <siaf-icon name={this.leadingIconName} size="lg"></siaf-icon>
                </slot>
              </span>
            ) : (
              <slot name="leading" />
            )}
            <div class="value">
              <slot>{this.value}</slot>
            </div>
            {this.trailingIcon ? (
              <span class="icon trailing" aria-hidden="true">
                <slot name="trailing">
                  <siaf-icon name={this.trailingIconName} size="lg"></siaf-icon>
                </slot>
              </span>
            ) : (
              <slot name="trailing" />
            )}
          </div>
          {this.hint ? <div class="hint">{this.hint}</div> : null}
        </div>
      </Host>
    );
  }
}
