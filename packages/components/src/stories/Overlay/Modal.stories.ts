import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

function openInDemo(e: Event, selector: string) {
  const demo = (e.currentTarget as HTMLElement).closest('.overlay-demo');
  const el = demo?.querySelector(selector) as (HTMLElement & { open: boolean }) | null;
  if (el) el.open = true;
}

const meta: Meta = {
  title: 'Overlay/Modal',
  component: 'siaf-modal',
};
export default meta;

type Story = StoryObj;

/** Modals - SIAF · Property 1 = Eliminar */
export const PropertyEliminar: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:200px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="eliminar"]')}>
        Eliminar
      </siaf-button>
      <siaf-modal data-modal="eliminar" heading="¿Eliminar documento?" confirm-actions>
        <img
          slot="illustration"
          src="/assets/modals/eliminar-documento.svg"
          alt=""
          width="188"
          height="128"
        />
        El documento será eliminado de forma permanente.
      </siaf-modal>
    </div>
  `,
};

/** Modals - SIAF · Property 1 = Grabar */
export const PropertyGrabar: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:200px">
      <siaf-button variant="filled" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="grabar"]')}>
        Grabar
      </siaf-button>
      <siaf-modal
        data-modal="grabar"
        heading="¿Grabar documento?"
        confirm-actions
        confirm-label="Grabar"
        cancel-label="Cancelar"
      >
        Se guardarán los cambios del formulario.
      </siaf-modal>
    </div>
  `,
};

/** Modals - SIAF · Property 1 = Observar */
export const PropertyObservar: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:200px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="observar"]')}>
        Observar
      </siaf-button>
      <siaf-modal
        data-modal="observar"
        heading="Observación al documento"
        confirm-actions
        confirm-label="Aceptar"
        cancel-label="Cancelar"
      >
        Indique el motivo de la observación para continuar el flujo.
      </siaf-modal>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div class="overlay-demo" style="display:flex;flex-wrap:wrap;gap:12px;min-height:200px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="eliminar"]')}>
        Eliminar
      </siaf-button>
      <siaf-button variant="filled" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="grabar"]')}>
        Grabar
      </siaf-button>
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-modal="observar"]')}>
        Observar
      </siaf-button>
      <siaf-modal data-modal="eliminar" heading="¿Eliminar documento?" confirm-actions>
        <img slot="illustration" src="/assets/modals/eliminar-documento.svg" alt="" width="188" height="128" />
        El documento será eliminado.
      </siaf-modal>
      <siaf-modal
        data-modal="grabar"
        heading="¿Grabar documento?"
        confirm-actions
        confirm-label="Grabar"
      >
        Se guardarán los cambios del formulario.
      </siaf-modal>
      <siaf-modal
        data-modal="observar"
        heading="Observación al documento"
        confirm-actions
        confirm-label="Aceptar"
      >
        Registre la observación.
      </siaf-modal>
    </div>
  `,
};

/** Matriz Modals - SIAF · Property 1 (Eliminar / Grabar / Observar) */
export const Matrix: Story = Gallery;
