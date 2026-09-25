import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Period tags (UI Kit · Period tags · node 19299:105).
 * Soft domain · radius 4 · caption 12.
 */
@Component({ tag: 'siaf-period-tag', styleUrl: 'siaf-period-tag.css', shadow: true })
export class SiafPeriodTag {
  @Prop({ reflect: true }) estado: 'cerrado' | 'abierto' = 'cerrado';
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop() label?: string;

  private text(): string {
    if (this.label) return this.label;
    return this.estado === 'cerrado' ? 'Cerrado' : 'Abierto';
  }

  render() {
    return (
      <Host>
        <span class={`tag size-${this.size} estado-${this.estado}`} part="tag">
          {this.text()}
        </span>
      </Host>
    );
  }
}
