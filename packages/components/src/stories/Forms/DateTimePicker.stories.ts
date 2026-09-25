import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/DateTimePicker',
  component: 'siaf-date-time-picker',
};
export default meta;

type Story = StoryObj;

/** Matriz: mode date | time | datetime-local · disabled · open (date) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-date-time-picker label="Fecha" value="2026-09-23"></siaf-date-time-picker>
      <siaf-date-time-picker label="Hora" mode="time" value="08:30"></siaf-date-time-picker>
      <siaf-date-time-picker
        label="Fecha y hora"
        mode="datetime-local"
        value="2026-09-23T08:30"
      ></siaf-date-time-picker>
      <siaf-date-time-picker label="Deshabilitado" value="2026-09-23" disabled></siaf-date-time-picker>
      <div class="overlay-demo" style="min-height:320px">
        <siaf-date-time-picker label="Calendario abierto" value="2026-09-23" open></siaf-date-time-picker>
      </div>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-date-time-picker label="Fecha" value="2026-09-23"></siaf-date-time-picker>
      <siaf-date-time-picker label="Hora" mode="time" value="08:30"></siaf-date-time-picker>
      <siaf-date-time-picker
        label="Fecha y hora"
        mode="datetime-local"
        value="2026-09-23T08:30"
      ></siaf-date-time-picker>
    </div>
  `,
};
