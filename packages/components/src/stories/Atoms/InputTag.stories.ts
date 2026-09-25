import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/InputTag',
  component: 'siaf-input-tag',
  argTypes: {
    size: { control: 'select', options: ['standard', 'small'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-input-tag label="UE 012"></siaf-input-tag>
      <siaf-input-tag label="UE 012" selected></siaf-input-tag>
      <siaf-input-tag label="Small" size="small"></siaf-input-tag>
      <siaf-input-tag label="Small sel" size="small" selected></siaf-input-tag>
      <siaf-input-tag label="Disabled" disabled></siaf-input-tag>
      <siaf-input-tag label="Sin cerrar" ?dismissible=${false}></siaf-input-tag>
    </div>
  `,
};
