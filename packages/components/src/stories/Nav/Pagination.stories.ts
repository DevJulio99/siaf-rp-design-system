import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Nav/Pagination',
  component: 'siaf-pagination',
  argTypes: {
    showPageSize: { control: 'boolean' },
    page: { control: 'number' },
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
  },
  args: {
    page: 1,
    totalItems: 48,
    pageSize: 10,
    showPageSize: false,
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args) =>
    html`<siaf-pagination
      page=${String(args.page)}
      total-items=${String(args.totalItems)}
      page-size=${String(args.pageSize)}
      ?show-page-size=${args.showPageSize}
    ></siaf-pagination>`,
};

/** Row page=False vs True (page-size Text field w82) */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:24px">
      <div>
        <p style="margin:0 0 8px;font-size:12px;font-weight:600">Row page = False</p>
        <siaf-pagination page="1" total-items="120" page-size="10"></siaf-pagination>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:12px;font-weight:600">Row page = True</p>
        <siaf-pagination
          page="1"
          total-items="120"
          page-size="10"
          show-page-size
        ></siaf-pagination>
      </div>
    </div>
  `,
};

/** Varias páginas: inicio · medio · fin */
export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:24px">
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">Página 1 de 10</p>
        <siaf-pagination page="1" total-items="100" page-size="10" show-page-size></siaf-pagination>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">Página 5 de 10</p>
        <siaf-pagination page="5" total-items="100" page-size="10" show-page-size></siaf-pagination>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:11px;color:#666">Página 10 de 10</p>
        <siaf-pagination page="10" total-items="100" page-size="10" show-page-size></siaf-pagination>
      </div>
    </div>
  `,
};
