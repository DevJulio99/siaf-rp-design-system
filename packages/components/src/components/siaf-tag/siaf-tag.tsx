import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafTone, SiafTagVariant, SiafTagSize } from '../../utils/types';

/**
 * Filter tags (UI Kit · `12482:543` Selected):
 * Standard h32 pad 4/8 · Small h24 pad 0/8 · radius 8 · gap 8 · body2 14
 * Selected=True: check 20 + label + expand_more 20 · bg brand 8% · border/texto #014899
 */
@Component({ tag: 'siaf-tag', styleUrl: 'siaf-tag.css', shadow: true })
export class SiafTag {
  @Prop({ reflect: true }) tone: SiafTone = 'neutral';
  @Prop({ reflect: true }) variant: SiafTagVariant = 'outlined';
  @Prop({ reflect: true }) size: SiafTagSize = 'standard';
  /** Filter tags Selected=True → check + expand_more + colores activated */
  @Prop({ reflect: true }) selected = false;
  @Prop() label?: string;
  /** Forzar/ocultar ícono leading (default: check si selected) */
  @Prop() showLeading?: boolean;
  /** Forzar/ocultar ícono trailing (default: expand_more si selected) */
  @Prop() showTrailing?: boolean;

  private leading(): boolean {
    if (this.showLeading !== undefined) return this.showLeading;
    return this.selected;
  }

  private trailing(): boolean {
    if (this.showTrailing !== undefined) return this.showTrailing;
    return this.selected;
  }

  render() {
    return (
      <Host>
        <span
          class={{
            tag: true,
            [`tone-${this.tone}`]: true,
            [this.variant]: true,
            [`size-${this.size}`]: true,
            selected: this.selected,
          }}
          part="tag"
        >
          {this.leading() ? (
            <span class="ico" part="leading">
              <siaf-icon name="check" size="md"></siaf-icon>
            </span>
          ) : null}
          <span class="label">
            <slot>{this.label}</slot>
          </span>
          {this.trailing() ? (
            <span class="ico" part="trailing">
              <siaf-icon name="expand_more" size="md"></siaf-icon>
            </span>
          ) : null}
        </span>
      </Host>
    );
  }
}
