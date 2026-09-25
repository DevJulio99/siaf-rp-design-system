import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/ActionTag',
  component: 'siaf-action-tag',
  argTypes: {
    size: { control: 'select', options: ['standard', 'small'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-action-tag label="Agregar filtro" icon="add"></siaf-action-tag>
      <siaf-action-tag label="Exportar" icon="download"></siaf-action-tag>
      <siaf-action-tag label="Small" size="small" icon="add"></siaf-action-tag>
      <siaf-action-tag label="Disabled" icon="add" disabled></siaf-action-tag>
    </div>
  `,
};
