import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feedback/EmptyState',
  component: 'siaf-empty-state',
};
export default meta;

type Story = StoryObj;

/** Matriz: heading · con/sin description */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-empty-state heading="Sin datos"></siaf-empty-state>
      <siaf-empty-state
        heading="Título"
        description="Sin registros para mostrar."
      ></siaf-empty-state>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-empty-state heading="Título" description="Sin registros para mostrar."></siaf-empty-state>`,
};
