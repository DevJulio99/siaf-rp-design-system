import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

const TONE_SAMPLES: Record<(typeof TONES)[number], { icon: string; label: string }> = {
  neutral: { icon: 'info', label: 'Neutro' },
  info: { icon: 'info', label: 'En proceso' },
  success: { icon: 'check_circle', label: 'Completado' },
  warning: { icon: 'warning', label: 'Pendiente' },
  danger: { icon: 'error', label: 'Rechazado' },
};

const meta: Meta = {
  title: 'Atoms/StatusTag',
  component: 'siaf-status-tag',
  argTypes: {
    tone: { control: 'select', options: [...TONES] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { tone: 'success', size: 'sm', label: 'Completado', icon: 'check_circle' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-status-tag tone=${args.tone} size=${args.size} icon=${args.icon}
      >${args.label}</siaf-status-tag
    >`,
};

/** Todos los tones · sm + md */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      ${TONES.map(
        (tone) => html`
          <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
            <span style="width:72px;font-size:11px;color:#666">${tone}</span>
            <siaf-status-tag tone=${tone} size="sm" icon=${TONE_SAMPLES[tone].icon}
              >${TONE_SAMPLES[tone].label}</siaf-status-tag
            >
            <siaf-status-tag tone=${tone} size="md" icon=${TONE_SAMPLES[tone].icon}
              >${TONE_SAMPLES[tone].label}</siaf-status-tag
            >
          </div>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      ${TONES.map(
        (tone) => html`
          <siaf-status-tag tone=${tone} icon=${TONE_SAMPLES[tone].icon}
            >${TONE_SAMPLES[tone].label}</siaf-status-tag
          >
        `,
      )}
    </div>
  `,
};
