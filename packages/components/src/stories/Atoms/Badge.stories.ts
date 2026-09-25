import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/Badge',
  component: 'siaf-badge',
  argTypes: {
    tone: { control: 'select', options: ['accent', 'primary'] },
    dot: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'sm'] },
  },
  args: { tone: 'accent', dot: false, size: 'md', value: '3' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-badge tone=${args.tone} ?dot=${args.dot} size=${args.size} value=${args.value}></siaf-badge>`,
};

/** Color × shape × size (UI Kit 7262:6493) */
export const Matrix: Story = {
  render: () => {
    const tones = ['accent', 'primary'] as const;
    const shapes = [
      { dot: false, label: 'Label' },
      { dot: true, label: 'Dot' },
    ] as const;
    const sizes = ['md', 'sm'] as const;
    return html`
      <div style="display:grid;gap:16px">
        ${tones.map(
          (tone) => html`
            <div>
              <p style="margin:0 0 8px;font-size:12px;font-weight:600">Color ${tone}</p>
              <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
                ${shapes.map(
                  (shape) => html`
                    ${sizes.map(
                      (size) => html`
                        <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
                          <siaf-badge tone=${tone} ?dot=${shape.dot} size=${size} value="3"></siaf-badge>
                          <span style="font-size:10px;color:#666">${shape.label} · ${size}</span>
                        </div>
                      `,
                    )}
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

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-badge value="3"></siaf-badge>
      <siaf-badge tone="primary" value="3"></siaf-badge>
      <siaf-badge dot></siaf-badge>
      <siaf-badge tone="primary" dot></siaf-badge>
      <siaf-badge size="sm" value="9"></siaf-badge>
    </div>
  `,
};
