import { render, h, describe, it, expect } from '@stencil/vitest';
import { SIAF_ICON_NAMES } from '../../utils/icons';

describe('siaf-icon catalog', () => {
  it('exposes foundation set size', () => {
    expect(SIAF_ICON_NAMES.length).toBeGreaterThanOrEqual(50);
  });

  it('renders search glyph', async () => {
    const { root } = await render(<siaf-icon name="search"></siaf-icon>);
    expect(root.shadowRoot?.querySelector('path')).toBeTruthy();
  });
});
