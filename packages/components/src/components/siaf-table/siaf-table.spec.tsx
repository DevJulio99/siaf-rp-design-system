import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-table a11y', () => {
  it('exposes caption and column scopes', async () => {
    const { root } = await render(
      <siaf-table
        caption="Ítems"
        columns='[{"key":"id","label":"Código"},{"key":"n","label":"Nombre"}]'
        rows='[{"id":"1","n":"Uno"}]'
      ></siaf-table>,
    );
    const caption = root.shadowRoot?.querySelector('caption');
    expect(caption?.textContent).toContain('Ítems');
    const ths = root.shadowRoot?.querySelectorAll('th[scope="col"]');
    expect(ths?.length).toBe(2);
  });

  it('announces empty state', async () => {
    const { root } = await render(
      <siaf-table columns='[{"key":"id","label":"Código"}]' rows="[]"></siaf-table>,
    );
    expect(root.shadowRoot?.querySelector('td.empty')?.getAttribute('role')).toBe('status');
  });
});
