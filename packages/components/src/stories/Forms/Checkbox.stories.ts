import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/Checkbox',
  component: 'siaf-checkbox',
};
export default meta;

type Story = StoryObj;

/** Matriz: checked × disabled × indeterminate */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:360px">
      <siaf-checkbox label="Sin marcar"></siaf-checkbox>
      <siaf-checkbox label="Marcado" checked></siaf-checkbox>
      <siaf-checkbox label="Indeterminado" indeterminate></siaf-checkbox>
      <siaf-checkbox label="Deshabilitado" disabled></siaf-checkbox>
      <siaf-checkbox label="Marcado · disabled" checked disabled></siaf-checkbox>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <siaf-checkbox label="Acepto condiciones" checked></siaf-checkbox>
      <siaf-checkbox label="Sin marcar"></siaf-checkbox>
      <siaf-checkbox label="Deshabilitado" disabled></siaf-checkbox>
      <siaf-checkbox label="Indeterminado" indeterminate></siaf-checkbox>
    </div>
  `,
};
