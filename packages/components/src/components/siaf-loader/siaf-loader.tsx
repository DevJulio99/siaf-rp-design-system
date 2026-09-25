import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Loader / Circles Kit 372:9418 — 8 dots · 32×32 (md).
 */
@Component({ tag: 'siaf-loader', styleUrl: 'siaf-loader.css', shadow: true })
export class SiafLoader {
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() label = 'Cargando';
  render() {
    return (
      <Host class={`size-${this.size}`} role="status" aria-live="polite" aria-label={this.label}>
        <span class="spinner" part="spinner">
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </span>
      </Host>
    );
  }
}
