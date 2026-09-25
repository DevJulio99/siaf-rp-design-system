import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/Input',
  component: 'siaf-input',
  args: {
    label: 'Año fiscal',
    placeholder: 'Texto',
    helperText: 'Ayuda contextual',
    size: 'default',
  },
  argTypes: {
    size: { control: 'select', options: ['default', 'compact'] },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-input
      label=${args.label}
      placeholder=${args.placeholder}
      helper-text=${args.helperText}
      size=${args.size}
      value="2026"
    ></siaf-input>`,
};

/** Matriz State × Size (gap 24 entre campos con notch) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-input
        label="Enabled · Default"
        value="2026"
        helper-text="Texto de ayuda"
      ></siaf-input>
      <siaf-input
        label="Enabled · Compact"
        size="compact"
        value="10"
        helper-text="Compact 32px"
      ></siaf-input>
      <siaf-input
        label="Error · Default"
        value="x"
        error-text="Dato inválido"
        helper-text="No se muestra si hay error"
      ></siaf-input>
      <siaf-input label="Error · Compact" size="compact" value="x" error-text="Inválido"></siaf-input>
      <siaf-input label="Disabled · Default" value="2026" helper-text="Solo lectura" disabled></siaf-input>
      <siaf-input label="Disabled · Compact" size="compact" value="10" disabled></siaf-input>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-input label="Año fiscal" value="2026" helper-text="Ayuda contextual"></siaf-input>
      <siaf-input label="Con error" value="x" error-text="Dato inválido"></siaf-input>
      <siaf-input label="Compact" size="compact" value="10"></siaf-input>
    </div>
  `,
};
