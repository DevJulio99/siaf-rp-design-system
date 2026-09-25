import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-input', () => {
  it('renders Default size field with notch label', async () => {
    const { root } = await render(<siaf-input label="Año fiscal" value="2026"></siaf-input>);
    expect(root).toHaveClass('has-label');
    expect(root.shadowRoot?.querySelector('.label-wrap')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('label')?.textContent).toContain('Año fiscal');
    const input = root.shadowRoot?.querySelector('input') as HTMLInputElement | null;
    expect(input?.value).toBe('2026');
  });

  it('shows error text as alert', async () => {
    const { root } = await render(<siaf-input errorText="Campo obligatorio"></siaf-input>);
    const err = root.shadowRoot?.querySelector('.error');
    expect(err?.getAttribute('role')).toBe('alert');
    expect(root).toHaveClass('invalid');
  });
});
