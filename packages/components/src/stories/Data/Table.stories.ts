import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Data/Table',
  component: 'siaf-table',
};
export default meta;

type Story = StoryObj;

const TABLE_COLUMNS =
  '[{"key":"corr","label":"Correlativo"},{"key":"desc","label":"Descripción"},{"key":"monto","label":"Monto"}]';
const TABLE_ROWS =
  '[{"corr":"0001","desc":"Servicio de limpieza","monto":"S/ 12,000"},{"corr":"0002","desc":"Útiles","monto":"S/ 3,500"}]';

/** Matriz: con caption · sin caption */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px">
      <siaf-table caption="Vista previa" columns=${TABLE_COLUMNS} rows=${TABLE_ROWS}></siaf-table>
      <siaf-table columns=${TABLE_COLUMNS} rows=${TABLE_ROWS}></siaf-table>
    </div>
  `,
};

export const Gallery: Story = {
  render: () =>
    html`<siaf-table
      caption="Vista previa"
      columns='[{"key":"corr","label":"Correlativo"},{"key":"desc","label":"Descripción"},{"key":"monto","label":"Monto"}]'
      rows='[{"corr":"0001","desc":"Servicio de limpieza","monto":"S/ 12,000"},{"corr":"0002","desc":"Útiles","monto":"S/ 3,500"}]'
    ></siaf-table>`,
};
