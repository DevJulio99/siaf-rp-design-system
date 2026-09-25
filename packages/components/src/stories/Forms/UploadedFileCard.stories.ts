import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Forms/UploadedFileCard',
  component: 'siaf-uploaded-file-card',
};
export default meta;

type Story = StoryObj;

/** Matriz: status done | uploading | failed */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:420px">
      <siaf-uploaded-file-card
        file-name="DocEntregable001.xls"
        meta="500kb"
        status="done"
      ></siaf-uploaded-file-card>
      <siaf-uploaded-file-card
        file-name="Carga.pdf"
        meta="1.2 MB"
        status="uploading"
      ></siaf-uploaded-file-card>
      <siaf-uploaded-file-card
        file-name="Error.docx"
        meta="Falló"
        status="failed"
      ></siaf-uploaded-file-card>
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:grid;gap:12px;max-width:420px">
      <siaf-uploaded-file-card
        file-name="DocEntregable001.xls"
        meta="500kb"
        status="done"
      ></siaf-uploaded-file-card>
      <siaf-uploaded-file-card
        file-name="Carga.pdf"
        meta="1.2 MB"
        status="uploading"
      ></siaf-uploaded-file-card>
      <siaf-uploaded-file-card
        file-name="Error.docx"
        meta="Falló"
        status="failed"
      ></siaf-uploaded-file-card>
    </div>
  `,
};
