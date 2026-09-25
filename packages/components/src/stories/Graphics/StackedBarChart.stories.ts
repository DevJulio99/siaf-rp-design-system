import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Graphics/StackedBarChart',
  component: 'siaf-stacked-bar-chart',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      <siaf-stacked-bar-chart
        heading="Stacked vertical"
        legend-labels='["Serie A","Serie B"]'
        data='[{"label":"Ene","values":[120,110]},{"label":"Feb","values":[140,90]},{"label":"Mar","values":[100,130]}]'
      ></siaf-stacked-bar-chart>
      <siaf-stacked-bar-chart
        heading="Stacked horizontal"
        orientation="horizontal"
        legend-labels='["Serie A","Serie B"]'
        data='[{"label":"Ene","values":[120,110]},{"label":"Feb","values":[140,90]}]'
      ></siaf-stacked-bar-chart>
    </div>
  `,
};
