import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/FileTag',
  component: 'siaf-file-tag',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-file-tag estado="new" size="standard"></siaf-file-tag>
        <siaf-file-tag estado="edit" size="standard"></siaf-file-tag>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-file-tag estado="new" size="small"></siaf-file-tag>
        <siaf-file-tag estado="edit" size="small"></siaf-file-tag>
      </div>
    </div>
  `,
};
