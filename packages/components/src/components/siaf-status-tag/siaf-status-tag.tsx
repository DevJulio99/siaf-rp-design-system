import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafTone } from '../../utils/types';
import type { SiafIconName } from '../../utils/icons';

/**
 * status items tags (UI Kit · `6756:221`):
 * Small h24 · Standard h32 · radius 4 · pad 0/8 · gap 8 · icon 20 · caption 12 Regular
 * Surface white + border/texto feedback (outlined), leading icon.
 */
@Component({ tag: 'siaf-status-tag', styleUrl: 'siaf-status-tag.css', shadow: true })
export class SiafStatusTag {
  @Prop({ reflect: true }) tone: SiafTone = 'success';
  @Prop({ reflect: true }) size: 'sm' | 'md' = 'sm';
  @Prop() icon: SiafIconName | string = 'check_circle';
  @Prop() label?: string;

  render() {
    return (
      <Host>
        <span class={`tag size-${this.size} tone-${this.tone}`} part="tag">
          <siaf-icon name={this.icon} size="md"></siaf-icon>
          <span class="label">
            <slot>{this.label}</slot>
          </span>
        </span>
      </Host>
    );
  }
}
