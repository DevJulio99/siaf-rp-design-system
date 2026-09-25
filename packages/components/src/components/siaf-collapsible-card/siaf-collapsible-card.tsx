import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * accordion/collapsible_card (UI Kit 19632:66).
 * Spec OPENED: header h60 · pad 8/24 · gap 16 · indicator 3×24 brand primary ·
 * icon buttons 32 (icon 20) · body pad 16/24 gap 24 · radius 8 · stroke divider.
 */
@Component({ tag: 'siaf-collapsible-card', styleUrl: 'siaf-collapsible-card.css', shadow: true })
export class SiafCollapsibleCard {
  @Prop() heading = '';
  @Prop({ mutable: true, reflect: true }) open = true;
  @Prop() showClose = true;
  @Event() siafToggle!: EventEmitter<boolean>;
  @Event() siafClose!: EventEmitter<void>;

  private toggle = () => {
    this.open = !this.open;
    this.siafToggle.emit(this.open);
  };

  private onClose = (e: Event) => {
    e.stopPropagation();
    this.siafClose.emit();
  };

  render() {
    return (
      <Host class={{ open: this.open }}>
        <div class="card" part="card">
          <div class="header" part="header">
            <span class="indicator" aria-hidden="true" />
            <button
              type="button"
              class="icon-btn"
              aria-expanded={this.open ? 'true' : 'false'}
              aria-label={this.open ? 'Contraer' : 'Expandir'}
              onClick={this.toggle}
            >
              <siaf-icon name={this.open ? 'expand_less' : 'expand_more'} size="md"></siaf-icon>
            </button>
            <div class="info">
              <slot name="info">
                {this.heading ? <span class="heading">{this.heading}</span> : null}
              </slot>
            </div>
            {this.showClose ? (
              <button type="button" class="icon-btn" aria-label="Cerrar" onClick={this.onClose}>
                <siaf-icon name="close" size="md"></siaf-icon>
              </button>
            ) : null}
          </div>
          {this.open ? (
            <div class="body" part="body">
              <slot />
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
