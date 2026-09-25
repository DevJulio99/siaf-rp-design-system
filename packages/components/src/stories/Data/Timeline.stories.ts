import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Data/Timeline',
  component: 'siaf-timeline',
};
export default meta;

type Story = StoryObj;

const FLOW =
  '[{"id":"1","title":"Comision","time":"01/09","status":"finished"},{"id":"2","title":"Validacion","time":"10/09","status":"current"},{"id":"3","title":"Cierre","status":"pending"}]';

const PENDING_ONLY =
  '[{"id":"a","title":"Solo pendiente","status":"pending"},{"id":"b","title":"Siguiente","status":"pending"}]';

/** Matriz: flujo finished/current/pending */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px;max-width:420px">
      <siaf-timeline items=${FLOW}></siaf-timeline>
      <siaf-timeline items=${PENDING_ONLY}></siaf-timeline>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`<siaf-timeline items=${FLOW}></siaf-timeline>`,
};
