import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/Switch',
  component: 'siaf-switch',
};
export default meta;

type Story = StoryObj;

/** Matriz: checked × disabled */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:360px">
      <siaf-switch label="Apagado"></siaf-switch>
      <siaf-switch label="Encendido" checked></siaf-switch>
      <siaf-switch label="Deshabilitado" disabled></siaf-switch>
      <siaf-switch label="Encendido · disabled" checked disabled></siaf-switch>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px">
      <siaf-switch label="Notificar" checked></siaf-switch>
      <siaf-switch label="Apagado"></siaf-switch>
      <siaf-switch label="Deshabilitado" disabled></siaf-switch>
    </div>
  `,
};
