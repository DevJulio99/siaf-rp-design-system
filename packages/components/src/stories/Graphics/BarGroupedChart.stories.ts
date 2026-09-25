import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Graphics/BarGroupedChart',
  component: 'siaf-bar-grouped-chart',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))">
      <siaf-bar-grouped-chart
        heading="Grouped vertical"
        series-labels='["2024","2025"]'
        data='[{"label":"Ene","values":[230,180]},{"label":"Feb","values":[300,220]},{"label":"Mar","values":[350,260]}]'
      ></siaf-bar-grouped-chart>
      <siaf-bar-grouped-chart
        heading="Grouped horizontal"
        orientation="horizontal"
        series-labels='["2024","2025"]'
        data='[{"label":"Ene","values":[230,180]},{"label":"Feb","values":[300,220]}]'
      ></siaf-bar-grouped-chart>
    </div>
  `,
};
