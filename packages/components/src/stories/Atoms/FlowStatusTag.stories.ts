import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;
const VARIANTS = ['filled', 'outlined', 'soft'] as const;

const meta: Meta = {
  title: 'Atoms/FlowStatusTag',
  component: 'siaf-flow-status-tag',
  argTypes: {
    tone: { control: 'select', options: [...TONES] },
    variant: { control: 'select', options: [...VARIANTS] },
  },
  args: { tone: 'neutral', variant: 'filled', label: 'Elaborado' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-flow-status-tag tone=${args.tone} variant=${args.variant}
      >${args.label}</siaf-flow-status-tag
    >`,
};

/** Tone × variant (radius 4) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:12px">
      ${VARIANTS.map(
        (variant) => html`
          <div>
            <p style="margin:0 0 8px;font-size:12px;font-weight:600">${variant}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${TONES.map(
                (tone) => html`
                  <siaf-flow-status-tag tone=${tone} variant=${variant}>${tone}</siaf-flow-status-tag>
                `,
              )}
            </div>
          </div>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <siaf-flow-status-tag tone="neutral" variant="filled">Elaborado</siaf-flow-status-tag>
      <siaf-flow-status-tag tone="info" variant="filled">En revisión</siaf-flow-status-tag>
      <siaf-flow-status-tag tone="success" variant="filled">Aprobado</siaf-flow-status-tag>
      <siaf-flow-status-tag tone="warning" variant="outlined">Observado</siaf-flow-status-tag>
      <siaf-flow-status-tag tone="danger" variant="soft">Anulado</siaf-flow-status-tag>
    </div>
  `,
};
