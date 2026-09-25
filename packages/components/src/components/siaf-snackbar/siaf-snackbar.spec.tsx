import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-snackbar', () => {
  it('uses polite live region and tone icon', async () => {
    const { root } = await render(<siaf-snackbar open tone="success" message="Ok"></siaf-snackbar>);
    expect(root.getAttribute('aria-live')).toBe('polite');
    expect(root.shadowRoot?.querySelector('siaf-icon')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('button[aria-label="Cerrar"]')).toBeTruthy();
  });
});
