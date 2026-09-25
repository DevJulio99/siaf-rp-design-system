import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-conciliation-tag', () => {
  it('renders pendiente label', async () => {
    const { root } = await render(<siaf-conciliation-tag estado="pendiente"></siaf-conciliation-tag>);
    expect(root.shadowRoot?.querySelector('.tag')?.textContent?.trim()).toBe('Pendiente de conciliación');
  });
});
