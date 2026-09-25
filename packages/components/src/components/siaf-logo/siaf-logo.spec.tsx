import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-logo', () => {
  it('renders img with alt SIAF', async () => {
    const { root } = await render(<siaf-logo variant="acolor" version="default"></siaf-logo>);
    const img = root.shadowRoot?.querySelector('img');
    expect(img?.getAttribute('alt')).toBe('SIAF');
    expect(img?.getAttribute('src')).toContain('logo-siaf-acolor-default.svg');
  });
});
