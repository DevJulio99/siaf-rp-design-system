import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const ALERT_TONES = [
  { tone: 'neutral', figma: 'Neutral', title: 'Neutral', message: 'Mensaje informativo neutro.' },
  { tone: 'success', figma: 'Success', title: 'Éxito', message: 'La operación se completó correctamente.' },
  { tone: 'info', figma: 'Info', title: 'Información', message: 'Revise el detalle antes de continuar.' },
  {
    tone: 'warning',
    figma: 'Warning',
    title: 'Advertencia',
    message: 'Hay datos pendientes de validación.',
  },
  { tone: 'danger', figma: 'Error', title: 'Error', message: 'No se pudo guardar el registro.' },
] as const;

const meta: Meta = {
  title: 'Feedback/Alert',
  component: 'siaf-alert',
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
  args: { tone: 'info', title: 'Información', message: 'Mensaje de alerta institucional.' },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <siaf-alert tone=${args.tone}>
      <span slot="title">${args.title}</span>
      ${args.message}
    </siaf-alert>
  `,
};

/** Gallery: Neutral | Success | Info | Warning | Error (tone danger) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;max-width:560px">
      ${ALERT_TONES.map(
        (row) => html`
          <div>
            <p style="margin:0 0 4px;font-size:11px;color:#666">Figma ${row.figma} → tone=${row.tone}</p>
            <siaf-alert tone=${row.tone}>
              <span slot="title">${row.title}</span>
              ${row.message}
            </siaf-alert>
          </div>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;max-width:560px">
      ${ALERT_TONES.map(
        (row) => html`
          <siaf-alert tone=${row.tone}>
            <span slot="title">${row.title}</span>
            ${row.message}
          </siaf-alert>
        `,
      )}
    </div>
  `,
};
