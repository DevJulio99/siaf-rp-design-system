import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Logo SIAF (UI Kit · Logo siaf · node 7718:1244).
 * Assets locales en `/assets/logo/`.
 */
@Component({ tag: 'siaf-logo', styleUrl: 'siaf-logo.css', shadow: true })
export class SiafLogo {
  @Prop({ reflect: true }) variant: 'blanco' | 'negro' | 'acolor' = 'blanco';
  @Prop({ reflect: true }) version: 'default' | 'simplificado' = 'simplificado';

  private src(): string {
    return `/assets/logo/logo-siaf-${this.variant}-${this.version}.svg`;
  }

  render() {
    return (
      <Host>
        <img
          class={{ logo: true, [`version-${this.version}`]: true }}
          src={this.src()}
          alt="SIAF"
          part="logo"
        />
      </Host>
    );
  }
}
