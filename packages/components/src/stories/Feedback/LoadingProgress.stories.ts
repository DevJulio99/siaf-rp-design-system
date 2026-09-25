import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feedback/LoadingProgress',
  component: 'siaf-loading-progress',
};
export default meta;

type Story = StoryObj;

/** Matriz: value y label */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;max-width:360px">
      <siaf-loading-progress value="70"></siaf-loading-progress>
      <siaf-loading-progress value="35" label="Cargando archivos"></siaf-loading-progress>
      <siaf-loading-progress value="50" label="Sin porcentaje visible"></siaf-loading-progress>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;max-width:360px">
      <siaf-loading-progress value="70"></siaf-loading-progress>
      <siaf-loading-progress value="35" label="Cargando archivos"></siaf-loading-progress>
    </div>
  `,
};
