import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/Accordion',
  component: 'siaf-accordion',
};
export default meta;

type Story = StoryObj;

/** Matriz: open true/false */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:640px">
      <siaf-accordion heading="Cerrado (default)">Cuerpo acordeon.</siaf-accordion>
      <siaf-accordion heading="Abierto" open>Cuerpo visible.</siaf-accordion>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:640px">
      <siaf-accordion heading="head panel" open>Cuerpo acordeon.</siaf-accordion>
      <siaf-accordion heading="Segundo panel">Otro contenido.</siaf-accordion>
    </div>
  `,
};
