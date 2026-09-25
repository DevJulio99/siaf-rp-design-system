import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Graphics/BarChart',
  component: 'siaf-bar-chart',
};
export default meta;

type Story = StoryObj;

const BAR_DATA =
  '[{"label":"Ene","value":230},{"label":"Feb","value":300},{"label":"Mar","value":350},{"label":"Abr","value":320}]';

/** Matriz: orientation vertical | horizontal */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      <siaf-bar-chart
        heading="Bar vertical"
        legend-label="Activos"
        data=${BAR_DATA}
      ></siaf-bar-chart>
      <siaf-bar-chart
        heading="Bar horizontal"
        orientation="horizontal"
        legend-label="Activos"
        data=${BAR_DATA}
      ></siaf-bar-chart>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-bar-chart
      heading="Bar vertical"
      legend-label="Activos"
      data='[{"label":"Ene","value":230},{"label":"Feb","value":300},{"label":"Mar","value":350},{"label":"Abr","value":320},{"label":"May","value":270}]'
    ></siaf-bar-chart>`,
};
