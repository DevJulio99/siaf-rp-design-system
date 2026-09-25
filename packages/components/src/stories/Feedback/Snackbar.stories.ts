import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

function openInDemo(e: Event, selector: string) {
  const demo = (e.currentTarget as HTMLElement).closest('.overlay-demo');
  const el = demo?.querySelector(selector) as (HTMLElement & { open: boolean }) | null;
  if (el) el.open = true;
}

const meta: Meta = {
  title: 'Feedback/Snackbar',
  component: 'siaf-snackbar',
};
export default meta;

type Story = StoryObj;

/** Matriz: tones (open) */
export const Matrix: Story = {
  render: () => html`
    <div class="overlay-demo" style="display:grid;gap:12px;min-height:320px;padding-bottom:80px">
      <siaf-snackbar tone="neutral" message="Mensaje neutral" open></siaf-snackbar>
      <siaf-snackbar tone="info" message="Mensaje info" open></siaf-snackbar>
      <siaf-snackbar tone="success" message="Mensaje success" open></siaf-snackbar>
      <siaf-snackbar tone="warning" message="Mensaje warning" open></siaf-snackbar>
      <siaf-snackbar tone="danger" message="Mensaje danger" open></siaf-snackbar>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:120px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, 'siaf-snackbar')}>
        Mostrar snackbar
      </siaf-button>
      <siaf-snackbar tone="success" message="Guardado correctamente"></siaf-snackbar>
    </div>
  `,
};
