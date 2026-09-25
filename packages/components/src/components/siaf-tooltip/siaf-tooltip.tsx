import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({ tag: 'siaf-tooltip', styleUrl: 'siaf-tooltip.css', shadow: true })
export class SiafTooltip {
  @Prop() content = '';
  @Prop({ reflect: true }) placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @State() open = false;
  render() {
    return (
      <Host
        onMouseEnter={() => (this.open = true)}
        onMouseLeave={() => (this.open = false)}
        onFocusin={() => (this.open = true)}
        onFocusout={() => (this.open = false)}
      >
        <span class="anchor"><slot /></span>
        {this.open ? <span class={`tip place-${this.placement}`} role="tooltip">{this.content}<slot name="content" /></span> : null}
      </Host>
    );
  }
}
