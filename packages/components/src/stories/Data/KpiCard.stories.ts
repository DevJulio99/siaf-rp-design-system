import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Data/KpiCard',
  component: 'siaf-kpi-card',
};
export default meta;

type Story = StoryObj;

/** Matriz: icon-style */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:stretch">
      <siaf-kpi-card label="Informative" value="1,024" progress="65" icon-style="informative"></siaf-kpi-card>
      <siaf-kpi-card label="Success" value="1,024" progress="65" icon-style="success"></siaf-kpi-card>
      <siaf-kpi-card label="Warning" value="1,024" progress="65" icon-style="warning"></siaf-kpi-card>
      <siaf-kpi-card label="Danger" value="1,024" progress="65" icon-style="danger"></siaf-kpi-card>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:stretch">
      <siaf-kpi-card label="Total Activos" value="$1,245,800.00" progress="80"></siaf-kpi-card>
      <siaf-kpi-card label="Observados" value="128" progress="42" icon-style="warning"></siaf-kpi-card>
    </div>
  `,
};
