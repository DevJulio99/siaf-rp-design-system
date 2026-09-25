import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Nav/Breadcrumb',
  component: 'siaf-breadcrumb',
};
export default meta;

type Story = StoryObj;

const CRUMBS =
  '[{"label":"Inicio","href":"#"},{"label":"PAC","href":"#"},{"label":"Elaboracion"}]';

/** Matriz: niveles */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <siaf-breadcrumb items=${CRUMBS}></siaf-breadcrumb>
      <siaf-breadcrumb
        items='[{"label":"Inicio","href":"#"},{"label":"Detalle"}]'
      ></siaf-breadcrumb>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`<siaf-breadcrumb items=${CRUMBS}></siaf-breadcrumb>`,
};
