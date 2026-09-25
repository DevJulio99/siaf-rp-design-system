import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Graphics/DivergingChart',
  component: 'siaf-diverging-chart',
};
export default meta;

type Story = StoryObj;

const DIVERGING_DATA =
  '[{"label":"Ene","left":40,"right":55},{"label":"Feb","left":60,"right":35},{"label":"Mar","left":25,"right":70}]';

/** Matriz: labels · datos */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      <siaf-diverging-chart
        heading="Comparativo"
        left-label="Ingresos"
        right-label="Gastos"
        data=${DIVERGING_DATA}
      ></siaf-diverging-chart>
      <siaf-diverging-chart
        heading="Alternativo"
        left-label="Plan"
        right-label="Ejecución"
        data='[{"label":"Q1","left":30,"right":45},{"label":"Q2","left":50,"right":40}]'
      ></siaf-diverging-chart>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-diverging-chart
      heading="Comparativo"
      left-label="Ingresos"
      right-label="Gastos"
      data='[{"label":"Ene","left":40,"right":55},{"label":"Feb","left":60,"right":35},{"label":"Mar","left":25,"right":70}]'
    ></siaf-diverging-chart>`,
};
