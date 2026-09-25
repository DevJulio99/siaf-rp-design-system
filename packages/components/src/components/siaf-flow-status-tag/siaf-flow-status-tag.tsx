import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafTone, SiafTagVariant } from '../../utils/types';

/**
 * Flow / status register tag (UI Kit · Small, radius 4).
 */
@Component({ tag: 'siaf-flow-status-tag', styleUrl: 'siaf-flow-status-tag.css', shadow: true })
export class SiafFlowStatusTag {
  @Prop({ reflect: true }) tone: SiafTone = 'neutral';
  @Prop({ reflect: true }) variant: SiafTagVariant = 'filled';
  @Prop() label?: string;

  render() {
    return (
      <Host>
        <span class={`tag tone-${this.tone} ${this.variant}`} part="tag">
          <slot>{this.label}</slot>
        </span>
      </Host>
    );
  }
}
