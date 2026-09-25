import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Overlay/SideNav',
  component: 'siaf-side-nav',
};
export default meta;

type Story = StoryObj;

/** Matriz: con heading · sin heading */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px">
      <siaf-side-nav
        heading="Módulo PAC"
        style="max-width:260px;border:1px solid rgba(32,32,32,0.12);border-radius:8px"
      >
        <siaf-button variant="text">Inicio</siaf-button>
        <siaf-button variant="text">Bandeja</siaf-button>
      </siaf-side-nav>
      <siaf-side-nav style="max-width:260px;border:1px solid rgba(32,32,32,0.12);border-radius:8px">
        <siaf-button variant="text">Solo ítems</siaf-button>
      </siaf-side-nav>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <siaf-side-nav
      heading="Módulo PAC"
      style="max-width:260px;border:1px solid rgba(32,32,32,0.12);border-radius:8px"
    >
      <siaf-button variant="text">Inicio</siaf-button>
      <siaf-button variant="text">Bandeja</siaf-button>
    </siaf-side-nav>
  `,
};
