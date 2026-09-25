import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feedback/ProgressCircular',
  component: 'siaf-progress-circular',
};
export default meta;

type Story = StoryObj;

/** Matriz: value, label, size */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:24px;align-items:center">
      <siaf-progress-circular value="25"></siaf-progress-circular>
      <siaf-progress-circular value="50" label="50%"></siaf-progress-circular>
      <siaf-progress-circular value="80" size="100" label="Compacto"></siaf-progress-circular>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;gap:24px;align-items:center">
      <siaf-progress-circular value="50"></siaf-progress-circular>
      <siaf-progress-circular value="80" label="80%"></siaf-progress-circular>
    </div>
  `,
};
