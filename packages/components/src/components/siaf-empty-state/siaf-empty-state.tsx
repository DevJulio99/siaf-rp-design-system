import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Empty Kit 7291:5997 (Type=Content).
 */
@Component({ tag: 'siaf-empty-state', styleUrl: 'siaf-empty-state.css', shadow: true })
export class SiafEmptyState {
  @Prop() heading = 'Sin datos';
  @Prop() description?: string;

  render() {
    return (
      <Host>
        <div class="wrap" part="wrap">
          <div class="icon">
            <slot name="icon" />
          </div>
          <div class="text">
            <h3 class="title">{this.heading}</h3>
            {this.description ? <p class="desc">{this.description}</p> : <p class="desc"><slot /></p>}
          </div>
          <div class="actions">
            <slot name="actions" />
          </div>
        </div>
      </Host>
    );
  }
}
