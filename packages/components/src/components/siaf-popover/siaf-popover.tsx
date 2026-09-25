import { Component, Host, Prop, State, h } from '@stencil/core';

/** Popover Kit 9059:20293 */
@Component({ tag: 'siaf-popover', styleUrl: 'siaf-popover.css', shadow: true })
export class SiafPopover {
  @Prop() heading?: string;
  @State() open = false;

  render() {
    return (
      <Host>
        <div class="wrap">
          <div class="trigger" onClick={() => (this.open = !this.open)}>
            <slot name="trigger" />
          </div>
          {this.open ? (
            <div class="pop" role="dialog">
              {this.heading ? <div class="h">{this.heading}</div> : null}
              <div class="b">
                <slot />
              </div>
              <div class="actions">
                <slot name="actions" />
              </div>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
