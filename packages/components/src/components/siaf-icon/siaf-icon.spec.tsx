import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-icon', () => {
  it('renders svg for known name', async () => {
    const { root } = await render(<siaf-icon name="info" size="lg"></siaf-icon>);
    expect(root.shadowRoot?.querySelector('svg path')).toBeTruthy();
    expect(root.getAttribute('aria-hidden')).toBe('true');
  });

  it('is labelled when aria-label set', async () => {
    const { root } = await render(<siaf-icon name="close" ariaLabel="Cerrar"></siaf-icon>);
    expect(root.getAttribute('role')).toBe('img');
    expect(root.getAttribute('aria-label')).toBe('Cerrar');
  });
});
