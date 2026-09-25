import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Nav/Tabs',
  component: 'siaf-tabs',
};
export default meta;

type Story = StoryObj;

const TABS = '[{"id":"a","label":"General"},{"id":"b","label":"Historial"},{"id":"c","label":"Adjuntos"}]';

/** Matriz: active-id */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:20px">
      <siaf-tabs active-id="a" tabs=${TABS}></siaf-tabs>
      <siaf-tabs active-id="b" tabs=${TABS}></siaf-tabs>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-tabs
      active-id="a"
      tabs='[{"id":"a","label":"General"},{"id":"b","label":"Historial"}]'
    ></siaf-tabs>`,
};
