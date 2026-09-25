import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Icon',
  component: 'siaf-icon',
  argTypes: {
    name: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  },
  args: { name: 'info', size: 'lg' },
};
export default meta;

type Story = StoryObj;

const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

/** Matriz: tamaños Kit (name fijo) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:20px;align-items:flex-end;color:var(--sys-color-text-brand-primary,#014899)">
      ${ICON_SIZES.map(
        (size) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
            <siaf-icon name="info" size=${size}></siaf-icon>
            <span style="font-size:11px;color:#666">${size}</span>
          </div>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;color:var(--sys-color-text-brand-primary,#014899);align-items:center">
      <siaf-icon name="info" size="lg"></siaf-icon>
      <siaf-icon name="search" size="md"></siaf-icon>
      <siaf-icon name="close" aria-label="Cerrar"></siaf-icon>
      <siaf-icon name="check_circle" size="lg"></siaf-icon>
      <siaf-icon name="warning" size="lg"></siaf-icon>
      <siaf-icon name="settings" size="lg"></siaf-icon>
    </div>
  `,
};

export const Default: Story = {
  render: (args) =>
    html`<siaf-icon name=${args.name} size=${args.size}></siaf-icon>`,
};
