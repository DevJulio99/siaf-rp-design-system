import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-button', () => {
  it('renders slot label', async () => {
    const { root } = await render(<siaf-button>Continuar</siaf-button>);
    expect(root.shadowRoot?.querySelector('.label')).toBeTruthy();
    expect(root.textContent).toContain('Continuar');
  });

  it('respects disabled', async () => {
    const { root } = await render(<siaf-button disabled>X</siaf-button>);
    const button = root.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
  });

  it('renders named icon at Figma Default size (24 / lg)', async () => {
    const { root } = await render(<siaf-button icon="add">Nuevo</siaf-button>);
    const icon = root.shadowRoot?.querySelector('siaf-icon');
    expect(icon).toBeTruthy();
    expect(icon?.getAttribute('size')).toBe('lg');
    expect(root.shadowRoot?.querySelector('.leading')).toBeTruthy();
    // Glifo real en shadow del icon (no caja vacía)
    await new Promise((r) => setTimeout(r, 0));
    const path = icon?.shadowRoot?.querySelector('path');
    expect(path?.getAttribute('d')).toBeTruthy();
  });

  it('keeps Icon 24 (lg) on size sm (Figma Small)', async () => {
    const { root } = await render(
      <siaf-button size="sm" icon="add">
        Nuevo
      </siaf-button>,
    );
    expect(root.shadowRoot?.querySelector('siaf-icon')?.getAttribute('size')).toBe('lg');
  });
});
