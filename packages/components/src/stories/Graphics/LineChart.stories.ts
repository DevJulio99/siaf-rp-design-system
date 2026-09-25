import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Graphics/LineChart',
  component: 'siaf-line-chart',
};
export default meta;

type Story = StoryObj;

const LINE_A = '[{"label":"Ene","value":40},{"label":"Feb","value":65},{"label":"Mar","value":30},{"label":"Abr","value":80}]';
const LINE_B = '[{"label":"Ene","value":10},{"label":"Feb","value":55},{"label":"Mar","value":90}]';

/** Matriz: datasets */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      <siaf-line-chart heading="Tendencia A" legend-label="Serie A" data=${LINE_A}></siaf-line-chart>
      <siaf-line-chart heading="Tendencia B" legend-label="Serie B" data=${LINE_B}></siaf-line-chart>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-line-chart heading="Tendencia" legend-label="Serie" data=${LINE_A}></siaf-line-chart>`,
};
