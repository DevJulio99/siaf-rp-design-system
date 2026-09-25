import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-modal', () => {
  it('hidden when closed', async () => {
    const { root } = await render(<siaf-modal heading="¿Grabar?"></siaf-modal>);
    expect(root.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders dialog when open', async () => {
    const { root } = await render(
      <siaf-modal open heading="¿Grabar documento?" confirmActions={true}></siaf-modal>,
    );
    const dialog = root.shadowRoot?.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(root.shadowRoot?.querySelector('.title')?.textContent).toContain('¿Grabar documento?');
    expect(root.shadowRoot?.querySelector('button[aria-label="Cerrar"]')).toBeTruthy();
  });
});
