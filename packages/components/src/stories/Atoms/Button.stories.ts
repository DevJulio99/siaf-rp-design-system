import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'siaf-button',
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'text'] },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
  },
  args: {
    variant: 'filled',
    size: 'md',
    disabled: false,
    label: 'Continuar',
    icon: '',
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      icon=${args.icon || undefined}
      >${args.label}</siaf-button
    >`,
};

/** Matriz UI Kit: Variant × Size × Disabled (Filled primary, sin lg/tonal) */
export const Matrix: Story = {
  render: () => {
    const variants = [
      { id: 'filled', label: 'Filled' },
      { id: 'outlined', label: 'Outline' },
      { id: 'text', label: 'Text' },
    ] as const;
    const sizes = [
      { id: 'md', label: 'Default (md)' },
      { id: 'sm', label: 'Small (sm)' },
    ] as const;
    return html`
      <div style="display:grid;gap:20px">
        ${variants.map(
          (variant) => html`
            <div>
              <p style="margin:0 0 8px;font-size:12px;font-weight:600">${variant.label}</p>
              <div style="display:grid;grid-template-columns:repeat(2,minmax(140px,auto));gap:12px">
                ${sizes.map(
                  (size) => html`
                    <div style="display:flex;flex-direction:column;gap:8px">
                      <span style="font-size:11px;color:#666">${size.label}</span>
                      <siaf-button variant=${variant.id} size=${size.id}>Label</siaf-button>
                      <siaf-button variant=${variant.id} size=${size.id} disabled
                        >Disabled</siaf-button
                      >
                    </div>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  },
};

/** Estados adicionales: íconos y pares modal */
export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-button variant="filled" icon="check">Con ícono</siaf-button>
      <siaf-button variant="outlined" icon-end="expand_more">Trailing</siaf-button>
      <div style="display:flex;gap:8px">
        <siaf-button variant="outlined">Cancelar</siaf-button>
        <siaf-button variant="filled">Guardar</siaf-button>
      </div>
    </div>
  `,
};
