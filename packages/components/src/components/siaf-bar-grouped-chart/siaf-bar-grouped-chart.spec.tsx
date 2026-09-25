import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-bar-grouped-chart', () => {
  it('renders grouped bars', async () => {
    const { root } = await render(
      <siaf-bar-grouped-chart
        data={JSON.stringify([{ label: 'Ene', values: [40, 55] }])}
        series-labels={JSON.stringify(['A', 'B'])}
      ></siaf-bar-grouped-chart>,
    );
    expect(root.shadowRoot?.querySelectorAll('.bar').length).toBe(2);
  });
});
