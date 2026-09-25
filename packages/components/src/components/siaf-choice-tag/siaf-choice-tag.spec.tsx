import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-choice-tag', () => {
  it('renders as toggle button with aria-pressed', async () => {
    const { root } = await render(<siaf-choice-tag label="Opción" selected></siaf-choice-tag>);
    const btn = root.shadowRoot?.querySelector('button');
    expect(btn?.getAttribute('aria-pressed')).toBe('true');
    expect(btn).toHaveClass('selected');
  });
});
