import { Component, Host, Prop, h } from '@stencil/core';
import { SIAF_ICON_PATHS, isSiafIconName, siafIconViewBox, type SiafIconName } from '../../utils/icons';

export type SiafIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Ícono SIAF (UI Kit · Material Symbols paths).
 * Uso: `<siaf-icon name="info" size="lg"></siaf-icon>`
 * Slot: SVG custom tiene prioridad sobre `name`.
 */
@Component({ tag: 'siaf-icon', styleUrl: 'siaf-icon.css', shadow: true })
export class SiafIcon {
  /** Nombre del glifo del set institucional */
  @Prop({ reflect: true }) name?: SiafIconName | string;
  @Prop({ reflect: true }) size: SiafIconSize = 'md';
  /** Etiqueta accesible; si falta, el ícono es decorativo (aria-hidden) */
  @Prop() ariaLabel?: string;

  private path(): string | null {
    if (!this.name || !isSiafIconName(this.name)) return null;
    return SIAF_ICON_PATHS[this.name];
  }

  private viewBox(): string {
    if (!this.name || !isSiafIconName(this.name)) return '0 0 24 24';
    return siafIconViewBox(this.name);
  }

  render() {
    const labelled = !!this.ariaLabel;
    const d = this.path();
    return (
      <Host
        role={labelled ? 'img' : undefined}
        aria-label={this.ariaLabel}
        aria-hidden={labelled ? undefined : 'true'}
      >
        <span class="glyph" part="glyph">
          <slot>
            {d ? (
              <svg viewBox={this.viewBox()} focusable="false" aria-hidden="true">
                <path d={d} fill="currentColor" />
              </svg>
            ) : null}
          </slot>
        </span>
      </Host>
    );
  }
}
