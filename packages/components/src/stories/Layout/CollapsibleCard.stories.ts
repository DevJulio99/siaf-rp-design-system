import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/CollapsibleCard',
  component: 'siaf-collapsible-card',
};
export default meta;

type Story = StoryObj;

/** Matriz: open true/false */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;max-width:640px">
      <siaf-collapsible-card heading="Abierto" open>Contenido colapsable.</siaf-collapsible-card>
      <siaf-collapsible-card heading="Cerrado">Contenido oculto.</siaf-collapsible-card>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-collapsible-card heading="Card info" open style="max-width:640px">Contenido colapsable.</siaf-collapsible-card>`,
};
