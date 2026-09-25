import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-tag', () => {
  it('applies size standard by default', async () => {
    const { root } = await render(<siaf-tag tone="info">Etiqueta</siaf-tag>);
    const tag = root.shadowRoot?.querySelector('.tag');
    expect(tag?.classList.contains('size-standard')).toBe(true);
  });
});
