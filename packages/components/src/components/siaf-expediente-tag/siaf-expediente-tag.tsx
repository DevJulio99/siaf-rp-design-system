import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Expediente tags (UI Kit · node 14883:215).
 * Soft default / warning / success · radius 4 · caption 12.
 */
@Component({ tag: 'siaf-expediente-tag', styleUrl: 'siaf-expediente-tag.css', shadow: true })
export class SiafExpedienteTag {
  @Prop({ reflect: true }) estado: 'creado' | 'en-tramite' | 'archivado' = 'creado';
  @Prop({ reflect: true }) size: 'standard' | 'small' = 'standard';
  @Prop() label?: string;

  private text(): string {
    if (this.label) return this.label;
    const map: Record<typeof this.estado, string> = {
      creado: 'Creado',
      'en-tramite': 'En trámite',
      archivado: 'Archivado',
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
