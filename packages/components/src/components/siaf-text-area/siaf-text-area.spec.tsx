import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-text-area', () => {
  it('renders with notch label and textarea', async () => {
    const { root } = await render(<siaf-text-area label="Descripción" value="Texto"></siaf-text-area>);
    expect(root).toHaveClass('has-label');
    expect(root.shadowRoot?.querySelector('.label-wrap')).toBeTruthy();
    const ta = root.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement | null;
    expect(ta).toBeTruthy();
    expect(root.value).toBe('Texto');
  });

  it('shows counter when maxLength is set', async () => {
    const { root } = await render(
      <siaf-text-area label="Nota" value="ab" max-length={10}></siaf-text-area>,
    );
    expect(root).toHaveClass('has-counter');
    expect(root.shadowRoot?.querySelector('.counter')?.textContent).toBe('2/10');
  });

  it('marks invalid when errorText is set', async () => {
    const { root } = await render(<siaf-text-area error-text="Requerido"></siaf-text-area>);
    expect(root).toHaveClass('invalid');
    expect(root.shadowRoot?.querySelector('.error')?.getAttribute('role')).toBe('alert');
  });
});
