import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/Uploader',
  component: 'siaf-uploader',
};
export default meta;

type Story = StoryObj;

/** Matriz: default · multiple · disabled */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:480px">
      <siaf-uploader hint="jpg, png, svg, pdf"></siaf-uploader>
      <siaf-uploader multiple hint="Varios archivos"></siaf-uploader>
      <siaf-uploader disabled hint="No disponible"></siaf-uploader>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-uploader hint="jpg, png, svg, pdf"></siaf-uploader>`,
};
