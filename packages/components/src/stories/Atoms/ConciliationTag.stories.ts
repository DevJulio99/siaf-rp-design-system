import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/ConciliationTag',
  component: 'siaf-conciliation-tag',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-conciliation-tag estado="no-conciliado" size="standard"></siaf-conciliation-tag>
        <siaf-conciliation-tag estado="pendiente" size="standard"></siaf-conciliation-tag>
        <siaf-conciliation-tag estado="conciliado" size="standard"></siaf-conciliation-tag>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-conciliation-tag estado="no-conciliado" size="small"></siaf-conciliation-tag>
        <siaf-conciliation-tag estado="pendiente" size="small"></siaf-conciliation-tag>
        <siaf-conciliation-tag estado="conciliado" size="small"></siaf-conciliation-tag>
      </div>
    </div>
  `,
};
