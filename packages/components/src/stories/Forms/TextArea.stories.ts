import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/TextArea',
  component: 'siaf-text-area',
  argTypes: {
    size: { control: 'select', options: ['default', 'compact'] },
  },
  args: {
    label: 'Descripción',
    placeholder: 'Escriba aquí',
    helperText: 'Texto de ayuda',
    size: 'default',
    rows: 3,
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-text-area
      label=${args.label}
      placeholder=${args.placeholder}
      helper-text=${args.helperText}
      size=${args.size}
      rows=${args.rows}
      value="Texto de ejemplo"
    ></siaf-text-area>`,
};

/** Matriz State × Size (UI Kit Text area 7524:7485) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-text-area label="Enabled Default" value="Contenido"></siaf-text-area>
      <siaf-text-area label="Enabled Compact" size="compact" value="Compact"></siaf-text-area>
      <siaf-text-area
        label="Con contador"
        value="abc"
        max-length="120"
        helper-text="Máximo 120 caracteres"
      ></siaf-text-area>
      <siaf-text-area label="Error" value="x" error-text="Campo inválido"></siaf-text-area>
      <siaf-text-area label="Disabled" value="No editable" disabled></siaf-text-area>
    </div>
  `,
};
