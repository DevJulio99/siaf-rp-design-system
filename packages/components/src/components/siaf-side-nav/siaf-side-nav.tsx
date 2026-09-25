import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-side-nav', styleUrl: 'siaf-side-nav.css', shadow: true })
export class SiafSideNav {
  @Prop() heading?: string;
  render() {
    return (
      <Host>
        <nav class="nav" part="nav">
          {this.heading ? <div class="heading">{this.heading}</div> : <slot name="header" />}
          <div class="body"><slot /></div>
          <div class="footer"><slot name="footer" /></div>
        </nav>
      </Host>
    );
  }
}
