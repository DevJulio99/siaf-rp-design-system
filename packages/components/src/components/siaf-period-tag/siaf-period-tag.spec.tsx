import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-period-tag', () => {
  it('renders cerrado by default', async () => {
    const { root } = await render(<siaf-period-tag></siaf-period-tag>);
    expect(root.shadowRoot?.querySelector('.estado-cerrado')).toBeTruthy();
  });

  it('renders abierto label', async () => {
    const { root } = await render(<siaf-period-tag estado="abierto"></siaf-period-tag>);
    expect(root.shadowRoot?.querySelector('.tag')?.textContent?.trim()).toBe('Abierto');
  });
});
