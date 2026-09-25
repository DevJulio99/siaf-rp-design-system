import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

function openInDemo(e: Event, selector: string) {
  const demo = (e.currentTarget as HTMLElement).closest('.overlay-demo');
  const el = demo?.querySelector(selector) as (HTMLElement & { open: boolean }) | null;
  if (el) el.open = true;
}

const meta: Meta = {
  title: 'Overlay/SidePanel',
  component: 'siaf-side-panel',
};
export default meta;

type Story = StoryObj;

/** Matriz: side right | left */
export const Matrix: Story = {
  render: () => html`
    <div class="overlay-demo" style="display:flex;flex-wrap:wrap;gap:12px;min-height:200px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-side="right"]')}>
        Abrir derecha
      </siaf-button>
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, '[data-side="left"]')}>
        Abrir izquierda
      </siaf-button>
      <siaf-side-panel data-side="right" heading="Panel derecho">Contenido panel right.</siaf-side-panel>
      <siaf-side-panel data-side="left" heading="Panel izquierdo" side="left">Contenido panel left.</siaf-side-panel>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div class="overlay-demo" style="min-height:200px">
      <siaf-button variant="outlined" @siafClick=${(e: Event) => openInDemo(e, 'siaf-side-panel')}>
        Abrir panel
      </siaf-button>
      <siaf-side-panel heading="Panel lateral">Contenido del panel.</siaf-side-panel>
    </div>
  `,
};
