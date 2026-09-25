import { render, h, describe, it, expect } from '@stencil/vitest';

describe('siaf-steps', () => {
  it('marks current step', async () => {
    const { root } = await render(
      <siaf-steps
        current={1}
        steps='[{"id":"1","label":"A"},{"id":"2","label":"B"},{"id":"3","label":"C"}]'
      ></siaf-steps>,
    );
    const current = root.shadowRoot?.querySelector('.step.current .label');
    expect(current?.textContent).toBe('B');
  });
});
