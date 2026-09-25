import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafTone } from '../../utils/types';
import type { SiafIconName } from '../../utils/icons';

/**
 * status register tags (UI Kit · `12800:5587`):
 * Small h24 · Standard h32 · radius 4 · pad 0/8 · gap 8 · icon 20 · caption 12
 * Soft feedback fill + border feedback + leading icon.
 */
@Component({ tag: 'siaf-record-status-tag', styleUrl: 'siaf-record-status-tag.css', shadow: true })
export class SiafRecordStatusTag {
  @Prop({ reflect: true }) tone: SiafTone = 'info';
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
