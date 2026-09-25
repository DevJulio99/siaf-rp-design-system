import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-stacked-bar-chart', () => {
  it('renders stacked segments', async () => {
    const { root } = await render(
      <siaf-stacked-bar-chart
        data={JSON.stringify([{ label: 'Ene', values: [40, 60] }])}
      ></siaf-stacked-bar-chart>,
    );
    expect(root.shadowRoot?.querySelectorAll('.seg').length).toBe(2);
  });
});
