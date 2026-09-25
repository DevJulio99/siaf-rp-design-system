import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/Sidebar',
  component: 'siaf-sidebar',
};
export default meta;

type Story = StoryObj;

/** Matriz: collapsed false | true */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px">
      <div
        style="display:flex;border:1px solid rgba(32,32,32,0.12);border-radius:8px;max-height:240px;overflow:hidden"
      >
        <siaf-sidebar>
          <siaf-side-nav heading="Expandido">
            <siaf-button variant="text">Item A</siaf-button>
          </siaf-side-nav>
        </siaf-sidebar>
        <div style="padding:12px;font-size:12px">expanded</div>
      </div>
      <div
        style="display:flex;border:1px solid rgba(32,32,32,0.12);border-radius:8px;max-height:240px;overflow:hidden"
      >
        <siaf-sidebar collapsed>
          <siaf-side-nav heading="Colapsado">
            <siaf-button variant="text">A</siaf-button>
          </siaf-side-nav>
        </siaf-sidebar>
        <div style="padding:12px;font-size:12px">collapsed</div>
      </div>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div
      style="display:flex;gap:0;border:1px solid rgba(32,32,32,0.12);border-radius:8px;max-height:240px;overflow:hidden"
    >
      <siaf-sidebar>
        <siaf-side-nav heading="Navegacion">
          <siaf-button variant="text">Item A</siaf-button>
          <siaf-button variant="text">Item B</siaf-button>
        </siaf-side-nav>
      </siaf-sidebar>
      <div style="padding:16px;flex:1">Contenido (composicion consumidor).</div>
    </div>
  `,
};
