import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * accordion/base (UI Kit 15458:113).
 * Spec: h48 · pad 4/16 · gap 8 · leading expand Icon button 40 · title subtitle2 14 Medium · trailing more_vert 40.
 * Body es extensión WC (Kit base = head); no inventar chrome del head.
 */
@Component({ tag: 'siaf-accordion', styleUrl: 'siaf-accordion.css', shadow: true })
export class SiafAccordion {
  @Prop() heading = '';
  @Prop({ reflect: true, mutable: true }) open = false;
  /** Muestra Icon button trailing (more_vert). Default Kit = true. */
  @Prop() showTrailing = true;
  @Event() siafToggle!: EventEmitter<boolean>;
  @Event() siafTrailingClick!: EventEmitter<void>;

  private onToggle = (e: Event) => {
    const el = e.target as HTMLDetailsElement;
    this.open = el.open;
    this.siafToggle.emit(this.open);
  };

  private onTrailing = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    this.siafTrailingClick.emit();
  };

  render() {
    return (
      <Host>
        <details open={this.open} onToggle={this.onToggle}>
          <summary class="head">
            <span class="icon-btn leading" aria-hidden="true">
              <siaf-icon name={this.open ? 'expand_less' : 'expand_more'} size="lg"></siaf-icon>
            </span>
            <span class="title">
              <slot name="summary">{this.heading}</slot>
            </span>
            {this.showTrailing ? (
              <button type="button" class="icon-btn trailing" aria-label="Más acciones" onClick={this.onTrailing}>
                <siaf-icon name="more_vert" size="lg"></siaf-icon>
              </button>
            ) : null}
          </summary>
          <div class="body">
            <slot />
          </div>
        </details>
      </Host>
    );
  }
}
