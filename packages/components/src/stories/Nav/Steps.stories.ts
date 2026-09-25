import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Nav/Steps',
  component: 'siaf-steps',
};
export default meta;

type Story = StoryObj;

const STEPS =
  '[{"id":"1","label":"Contrataciones","description":"Step"},{"id":"2","label":"Procedimiento","description":"Step"},{"id":"3","label":"Validación","description":"Step"}]';

const SIZES = [
  { id: 'small', label: 'Small (default)' },
  { id: 'default', label: 'Default' },
] as const;

const CURRENTS = [0, 1, 2] as const;

/** Matriz: size × current */
export const Matrix: Story = {
  render: () => html`
    <div style="display:grid;gap:28px">
      ${SIZES.map(
        (size) => html`
          <div>
            <p style="margin:0 0 12px;font-size:12px;font-weight:600">${size.label}</p>
            <div style="display:grid;gap:16px">
              ${CURRENTS.map(
                (current) => html`
                  <div>
                    <p style="margin:0 0 6px;font-size:11px;color:#666">current=${current}</p>
                    <siaf-steps
                      size=${size.id}
                      current=${String(current)}
                      steps=${STEPS}
                    ></siaf-steps>
                  </div>
                `,
              )}
            </div>
          </div>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px">
      <div>
        <p style="margin:0 0 8px;font-size:12px;color:#6f6f71">Steps Small</p>
        <siaf-steps current="1" steps=${STEPS}></siaf-steps>
      </div>
      <div>
        <p style="margin:0 0 8px;font-size:12px;color:#6f6f71">Steps Default</p>
        <siaf-steps size="default" current="1" steps=${STEPS}></siaf-steps>
      </div>
    </div>
  `,
};
