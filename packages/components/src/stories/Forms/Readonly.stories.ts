import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/Readonly',
  component: 'siaf-readonly',
};
export default meta;

type Story = StoryObj;

/** Matriz: inputs text | comment · leadingIcon · hint */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-readonly label="Text (default)" value="UE 012 OGIP" hint="Precargado"></siaf-readonly>
      <siaf-readonly
        label="Comment"
        inputs="comment"
        value="Observacion en texto regular."
      ></siaf-readonly>
      <siaf-readonly label="Leading icon" value="PAC-2026-001" leading-icon></siaf-readonly>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-readonly label="Entidad" value="UE 012 OGIP" hint="Precargado"></siaf-readonly>
      <siaf-readonly label="Codigo" value="PAC-2026-001"></siaf-readonly>
    </div>
  `,
};
