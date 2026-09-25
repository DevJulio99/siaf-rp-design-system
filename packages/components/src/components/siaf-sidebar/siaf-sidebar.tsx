import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-sidebar', styleUrl: 'siaf-sidebar.css', shadow: true })
export class SiafSidebar {
  @Prop({ reflect: true }) collapsed = false;
  render() {
    return (
      <Host>
        <aside class={{ side: true, collapsed: this.collapsed }} part="side">
          <slot />
        </aside>
      </Host>
    );
  }
}
