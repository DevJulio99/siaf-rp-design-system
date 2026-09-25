import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-expediente-tag', () => {
  it('renders en-tramite label', async () => {
    const { root } = await render(<siaf-expediente-tag estado="en-tramite"></siaf-expediente-tag>);
    expect(root.shadowRoot?.querySelector('.tag')?.textContent?.trim()).toBe('En trámite');
  });
});
