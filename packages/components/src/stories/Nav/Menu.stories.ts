import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Nav/Menu',
  component: 'siaf-menu',
};
export default meta;

type Story = StoryObj;

const MENU_ITEMS =
  '[{"id":"1","label":"Opción uno"},{"id":"2","label":"Opción dos","disabled":true},{"id":"3","label":"Eliminar","danger":true}]';

/** Matriz: density standard | compact */
export const Matrix: Story = {
  render: () => html`
    <div class="overlay-demo" style="display:grid;gap:24px;min-height:200px">
      <siaf-menu items=${MENU_ITEMS}></siaf-menu>
      <siaf-menu density="compact" items=${MENU_ITEMS}></siaf-menu>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:160px">
      <siaf-menu
        items='[{"id":"1","label":"Opción uno"},{"id":"2","label":"Opción dos"},{"id":"3","label":"Eliminar","danger":true}]'
      ></siaf-menu>
    </div>
  `,
};
