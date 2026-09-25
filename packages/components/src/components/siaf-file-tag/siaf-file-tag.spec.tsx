import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-file-tag', () => {
  it('renders default label for new', async () => {
    const { root } = await render(<siaf-file-tag estado="new"></siaf-file-tag>);
    expect(root.shadowRoot?.querySelector('.tag')?.textContent?.trim()).toBe('Nuevo');
  });

  it('renders edit label', async () => {
    const { root } = await render(<siaf-file-tag estado="edit"></siaf-file-tag>);
    expect(root.shadowRoot?.querySelector('.tag')?.textContent?.trim()).toBe('Edición');
  });
});
