import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Overlay/Popover',
  component: 'siaf-popover',
};
export default meta;

type Story = StoryObj;

/** Matriz: con heading · sin heading (trigger en overlay-demo) */
export const Matrix: Story = {
  render: () => html`
    <div class="overlay-demo" style="display:flex;flex-wrap:wrap;gap:24px;min-height:200px">
      <siaf-popover heading="Detalle">
        <siaf-button slot="trigger" variant="outlined" size="sm">Con título</siaf-button>
        Texto del popover.
        <div slot="actions" style="display:flex;gap:8px">
          <siaf-button variant="text" size="sm">Cancelar</siaf-button>
          <siaf-button variant="filled" size="sm">Aceptar</siaf-button>
        </div>
      </siaf-popover>
      <siaf-popover>
        <siaf-button slot="trigger" variant="text" size="sm">Sin título</siaf-button>
        Contenido breve.
      </siaf-popover>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:200px">
      <siaf-popover heading="Detalle">
        <siaf-button slot="trigger" variant="outlined" size="sm">Ver más</siaf-button>
        Texto del popover.
        <div slot="actions" style="display:flex;gap:8px">
          <siaf-button variant="text" size="sm">Cancelar</siaf-button>
          <siaf-button variant="filled" size="sm">Aceptar</siaf-button>
        </div>
      </siaf-popover>
    </div>
  `,
};
