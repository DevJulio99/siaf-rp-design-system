import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feedback/Loader',
  component: 'siaf-loader',
};
export default meta;

type Story = StoryObj;

/** Matriz: size sm | md | lg */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">
      <siaf-loader size="sm" label="sm"></siaf-loader>
      <siaf-loader size="md" label="md"></siaf-loader>
      <siaf-loader size="lg" label="lg"></siaf-loader>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center">
      <siaf-loader></siaf-loader>
      <siaf-loader label="Procesando"></siaf-loader>
    </div>
  `,
};
