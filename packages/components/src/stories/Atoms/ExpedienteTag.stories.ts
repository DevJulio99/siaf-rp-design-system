import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Atoms/ExpedienteTag',
  component: 'siaf-expediente-tag',
};
export default meta;

type Story = StoryObj;

export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:16px">
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-expediente-tag estado="creado" size="standard"></siaf-expediente-tag>
        <siaf-expediente-tag estado="en-tramite" size="standard"></siaf-expediente-tag>
        <siaf-expediente-tag estado="archivado" size="standard"></siaf-expediente-tag>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <siaf-expediente-tag estado="creado" size="small"></siaf-expediente-tag>
        <siaf-expediente-tag estado="en-tramite" size="small"></siaf-expediente-tag>
        <siaf-expediente-tag estado="archivado" size="small"></siaf-expediente-tag>
      </div>
    </div>
  `,
};
