import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/RadioGroup',
  component: 'siaf-radio-group',
};
export default meta;

type Story = StoryObj;

const RADIO_OPTIONS =
  '[{"label":"Pública","value":"P"},{"label":"Privada","value":"R"},{"label":"Mixta","value":"M"}]';

/** Matriz: orientation × disabled */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-radio-group
        label="Vertical (default)"
        value="P"
        options=${RADIO_OPTIONS}
      ></siaf-radio-group>
      <siaf-radio-group
        label="Horizontal"
        orientation="horizontal"
        value="R"
        options=${RADIO_OPTIONS}
      ></siaf-radio-group>
      <siaf-radio-group
        label="Deshabilitado"
        disabled
        value="P"
        options=${RADIO_OPTIONS}
      ></siaf-radio-group>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <siaf-radio-group
      label="Modalidad"
      value="P"
      options='[{"label":"Pública","value":"P"},{"label":"Privada","value":"R"}]'
    ></siaf-radio-group>
  `,
};
