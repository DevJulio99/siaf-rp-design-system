import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'] as const;

const TONE_SAMPLES: Record<(typeof TONES)[number], { icon: string; label: string }> = {
  neutral: { icon: 'info', label: 'Registrado' },
  info: { icon: 'info', label: 'En trámite' },
  success: { icon: 'check_circle', label: 'Activo' },
  warning: { icon: 'warning', label: 'Suspendido' },
  danger: { icon: 'error', label: 'Inactivo' },
};

const meta: Meta = {
  title: 'Atoms/RecordStatusTag',
  component: 'siaf-record-status-tag',
  argTypes: {
    tone: { control: 'select', options: [...TONES] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { tone: 'success', size: 'sm', label: 'Activo', icon: 'check_circle' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-record-status-tag tone=${args.tone} size=${args.size} icon=${args.icon}
      >${args.label}</siaf-record-status-tag
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
            <siaf-record-status-tag tone=${tone} size="sm" icon=${TONE_SAMPLES[tone].icon}
              >${TONE_SAMPLES[tone].label}</siaf-record-status-tag
            >
            <siaf-record-status-tag tone=${tone} size="md" icon=${TONE_SAMPLES[tone].icon}
              >${TONE_SAMPLES[tone].label}</siaf-record-status-tag
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
      <siaf-record-status-tag tone="success" icon="check_circle">Activo</siaf-record-status-tag>
      <siaf-record-status-tag tone="danger" icon="error">Inactivo</siaf-record-status-tag>
      ${TONES.filter((t) => t !== 'success' && t !== 'danger').map(
        (tone) => html`
          <siaf-record-status-tag tone=${tone} icon=${TONE_SAMPLES[tone].icon}
            >${TONE_SAMPLES[tone].label}</siaf-record-status-tag
          >
        `,
      )}
    </div>
  `,
};
