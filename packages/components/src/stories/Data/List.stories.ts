import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Data/List',
  component: 'siaf-list',
};
export default meta;

type Story = StoryObj;

const LIST_ITEMS =
  '[{"id":"1","label":"Ítem primario","secondary":"Secundario"},{"id":"2","label":"Otro ítem","secondary":"Detalle"},{"id":"3","label":"Tercero","secondary":"—"}]';

/** Matriz: selectedId */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))">
      <siaf-list items=${LIST_ITEMS} style="min-width:240px"></siaf-list>
      <siaf-list selected-id="2" items=${LIST_ITEMS} style="min-width:240px"></siaf-list>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-list
      selected-id="1"
      items='[{"id":"1","label":"Ítem primario","secondary":"Secundario"},{"id":"2","label":"Otro ítem","secondary":"Detalle"}]'
      style="min-width:280px;max-width:360px"
    ></siaf-list>`,
};
