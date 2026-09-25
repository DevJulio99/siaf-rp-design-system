import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-alert', () => {
  it('renders tone and default icon', async () => {
    const { root } = await render(
      <siaf-alert tone="warning">
        <span slot="title">Atención</span>
        Mensaje
      </siaf-alert>,
    );
    const alert = root.shadowRoot?.querySelector('.alert');
    expect(alert?.classList.contains('tone-warning')).toBe(true);
    expect(alert?.getAttribute('role')).toBe('status');
    expect(root.shadowRoot?.querySelector('siaf-icon')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('.message')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('.title')).toBeTruthy();
  });
});
