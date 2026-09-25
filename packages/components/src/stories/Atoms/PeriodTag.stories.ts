import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/PeriodTag',
  component: 'siaf-period-tag',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-period-tag estado="cerrado" size="standard"></siaf-period-tag>
        <siaf-period-tag estado="abierto" size="standard"></siaf-period-tag>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-period-tag estado="cerrado" size="small"></siaf-period-tag>
        <siaf-period-tag estado="abierto" size="small"></siaf-period-tag>
      </div>
    </div>
  `,
};
