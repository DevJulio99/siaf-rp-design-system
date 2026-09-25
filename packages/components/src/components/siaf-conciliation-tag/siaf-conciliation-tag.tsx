import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Conciliacion tags (UI Kit · node 15857:132).
 * Soft default / warning / success · radius 4 · caption 12.
 */
@Component({ tag: 'siaf-conciliation-tag', styleUrl: 'siaf-conciliation-tag.css', shadow: true })
export class SiafConciliationTag {
  @Prop({ reflect: true }) estado: 'no-conciliado' | 'pendiente' | 'conciliado' = 'no-conciliado';
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop() label?: string;

  private text(): string {
    if (this.label) return this.label;
    const map: Record<typeof this.estado, string> = {
      'no-conciliado': 'No conciliado',
      pendiente: 'Pendiente de conciliación',
      conciliado: 'Conciliado',
    };
    return map[this.estado];
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
