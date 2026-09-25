import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/ChoiceTag',
  component: 'siaf-choice-tag',
  argTypes: {
    size: { control: 'select', options: ['standard', 'small'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-choice-tag label="Opción A"></siaf-choice-tag>
      <siaf-choice-tag label="Opción B" selected></siaf-choice-tag>
      <siaf-choice-tag label="Con ícono" icon="calendar_today"></siaf-choice-tag>
      <siaf-choice-tag label="Sel ícono" icon="calendar_today" selected></siaf-choice-tag>
      <siaf-choice-tag label="Small" size="small"></siaf-choice-tag>
      <siaf-choice-tag label="Disabled" disabled></siaf-choice-tag>
    </div>
  `,
};
