import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-icon-button', () => {
  it('renders icon button with aria-label', async () => {
    const { root } = await render(
      <siaf-icon-button icon="search" aria-label="Buscar"></siaf-icon-button>,
    );
    const btn = root.shadowRoot?.querySelector('button');
    expect(btn?.getAttribute('aria-label')).toBe('Buscar');
    expect(root.shadowRoot?.querySelector('siaf-icon')).toBeTruthy();
  });

  it('reflects activated as aria-pressed', async () => {
    const { root } = await render(
      <siaf-icon-button icon="favorite" aria-label="Favorito" activated></siaf-icon-button>,
    );
    expect(root.shadowRoot?.querySelector('button')?.getAttribute('aria-pressed')).toBe('true');
  });
});
