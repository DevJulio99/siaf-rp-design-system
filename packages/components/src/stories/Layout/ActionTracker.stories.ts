import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Layout/ActionTracker',
  component: 'siaf-action-tracker',
};
export default meta;

type Story = StoryObj;

/** Property=Default · un ItemRole (Acción por + Fecha) */
export const Default: Story = {
  render: () =>
    html`<siaf-action-tracker
      roles='[{"role":"Acción por","user":"Ana Pérez","date":"23/09/2026 08:00:59"}]'
    ></siaf-action-tracker>`,
};

/** Dos ItemRoles (_HistoryCards) */
export const TwoItemRoles: Story = {
  render: () =>
    html`<siaf-action-tracker
      roles='[
        {"role":"Acción por","user":"Ana Pérez","date":"23/09/2026 08:00:59"},
        {"role":"Registrado por","user":"Luis García","date":"24/09/2026 10:15:00"}
      ]'
    ></siaf-action-tracker>`,
};

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:480px">
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">Default · Acción por / Fecha</p>
        <siaf-action-tracker
          roles='[{"role":"Acción por","user":"Ana Pérez","date":"23/09/2026 08:00:59"}]'
        ></siaf-action-tracker>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">2 ItemRoles</p>
        <siaf-action-tracker
          roles='[
            {"role":"Acción por","user":"Ana Pérez","date":"23/09/2026 08:00:59"},
            {"role":"Registrado por","user":"Luis García","date":"24/09/2026 10:15:00"}
          ]'
        ></siaf-action-tracker>
      </div>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-action-tracker
      roles='[{"role":"Acción por","user":"Ana Pérez","date":"23/09/2026 08:00:59"}]'
    ></siaf-action-tracker>`,
};
