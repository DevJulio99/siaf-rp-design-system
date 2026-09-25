import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-input-tag', () => {
  it('renders label and dismiss button by default', async () => {
    const { root } = await render(<siaf-input-tag label="UE 012"></siaf-input-tag>);
    expect(root.shadowRoot?.querySelector('.label')?.textContent).toContain('UE 012');
    expect(root.shadowRoot?.querySelector('.dismiss')).toBeTruthy();
  });

  it('applies selected class', async () => {
    const { root } = await render(<siaf-input-tag selected label="Sel"></siaf-input-tag>);
    expect(root.shadowRoot?.querySelector('.tag')).toHaveClass('selected');
  });
});
