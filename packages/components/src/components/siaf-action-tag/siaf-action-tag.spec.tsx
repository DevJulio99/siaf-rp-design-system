import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-action-tag', () => {
  it('renders clickable tag', async () => {
    const { root } = await render(<siaf-action-tag label="Acción" icon="add"></siaf-action-tag>);
    expect(root.shadowRoot?.querySelector('button.tag')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('siaf-icon')).toBeTruthy();
  });
});
