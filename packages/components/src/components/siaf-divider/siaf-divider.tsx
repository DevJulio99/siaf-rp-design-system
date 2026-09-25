import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-divider', styleUrl: 'siaf-divider.css', shadow: true })
export class SiafDivider {
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return <Host role="separator" aria-orientation={this.orientation} />;
  }
}
