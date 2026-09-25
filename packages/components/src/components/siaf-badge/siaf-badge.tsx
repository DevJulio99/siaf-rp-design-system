import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Badges (UI Kit · `7262:6493`):
 * Label Standard 20 · Small 16 · Dot Standard 12 · Small 8
 * Color Accent `#d13255` · Primary `#014899` · caption 12 Medium · pad 4 · radius full
 */
@Component({ tag: 'siaf-badge', styleUrl: 'siaf-badge.css', shadow: true })
export class SiafBadge {
  @Prop() value?: string | number;
  /** shape=Dot */
  @Prop({ reflect: true }) dot = false;
  /** Color: accent | primary (Kit). `danger`/`neutral` legacy → accent/primary. */
  @Prop({ reflect: true }) tone: 'accent' | 'primary' | 'danger' | 'neutral' = 'accent';
  @Prop({ reflect: true }) size: 'sm' | 'md' = 'md';

  private colorClass(): string {
    if (this.tone === 'primary' || this.tone === 'neutral') return 'color-primary';
    return 'color-accent';
  }

  render() {
    return (
      <Host
        class={{
          badge: true,
          dot: this.dot,
          [`size-${this.size}`]: true,
          [this.colorClass()]: true,
        }}
      >
        {!this.dot ? (
          <span class="value">
            <slot>{this.value}</slot>
          </span>
        ) : null}
      </Host>
    );
  }
}
