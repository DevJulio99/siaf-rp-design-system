import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-pagination', () => {
  it('renders range label', async () => {
    const { root } = await render(<siaf-pagination totalItems={800} page={1} pageSize={25}></siaf-pagination>);
    const range = root.shadowRoot?.querySelector('.range');
    expect(range?.textContent).toBe('1-25 de 800');
  });

  it('disables previous on first page', async () => {
    const { root } = await render(<siaf-pagination totalItems={50} page={1} pageSize={25}></siaf-pagination>);
    const prev = root.shadowRoot?.querySelector('button[aria-label="Página anterior"]');
    expect(prev?.hasAttribute('disabled')).toBe(true);
  });

  it('page-size uses Kit Text field + listbox (not native select / not select-options WC)', async () => {
    const { root } = await render(
      <siaf-pagination totalItems={100} page={1} pageSize={25} showPageSize></siaf-pagination>,
    );
    expect(root.shadowRoot?.querySelector('select')).toBeFalsy();
    expect(root.shadowRoot?.querySelector('siaf-select-options')).toBeFalsy();
    expect(root.shadowRoot?.querySelector('.trigger')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('.size-label')?.textContent?.trim()).toBe('Filas por página:');
  });
});
