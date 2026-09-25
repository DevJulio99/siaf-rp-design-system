import { Component, Host, Prop, h } from '@stencil/core';

/**
 * File tags (UI Kit · file tags · node 2576:10150).
 * FILLED brand · radius 4 · caption 12.
 */
@Component({ tag: 'siaf-file-tag', styleUrl: 'siaf-file-tag.css', shadow: true })
export class SiafFileTag {
  @Prop({ reflect: true }) estado: 'new' | 'edit' = 'new';
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop() label?: string;

  private text(): string {
    if (this.label) return this.label;
    return this.estado === 'new' ? 'Nuevo' : 'Edición';
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
