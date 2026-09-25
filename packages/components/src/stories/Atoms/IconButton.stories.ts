import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/IconButton',
  component: 'siaf-icon-button',
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outline', 'standard'] },
    size: { control: 'select', options: ['md', 'sm'] },
    disabled: { control: 'boolean' },
    activated: { control: 'boolean' },
  },
  args: {
    icon: 'search',
    ariaLabel: 'Buscar',
    variant: 'filled',
    size: 'md',
    disabled: false,
    activated: false,
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-icon-button
      icon=${args.icon}
      aria-label=${args.ariaLabel}
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?activated=${args.activated}
    ></siaf-icon-button>`,
};

/** Matriz Variant × Size × Disabled × Activated (8307:5607) */
export const Matrix: Story = {
  render: () => {
    const variants = ['filled', 'outline', 'standard'] as const;
    const sizes = ['md', 'sm'] as const;
    return html`
      <div style="display:grid;gap:16px">
        ${variants.map(
          (variant) => html`
            <div>
              <p style="margin:0 0 8px;font-size:12px;font-weight:600">${variant}</p>
              <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
                ${sizes.map(
                  (size) => html`
                    <siaf-icon-button
                      icon="edit"
                      aria-label="Editar ${variant} ${size}"
                      variant=${variant}
                      size=${size}
                    ></siaf-icon-button>
                    <siaf-icon-button
                      icon="edit"
                      aria-label="Activado"
                      variant=${variant}
                      size=${size}
                      activated
                    ></siaf-icon-button>
                    <siaf-icon-button
                      icon="edit"
                      aria-label="Disabled"
                      variant=${variant}
                      size=${size}
                      disabled
                    ></siaf-icon-button>
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
