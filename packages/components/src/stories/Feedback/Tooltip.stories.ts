import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Feedback/Tooltip',
  component: 'siaf-tooltip',
};
export default meta;

type Story = StoryObj;

const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

/** Matriz: placement */
export const Matrix: Story = {
  render: () => html`
    <div
      style="display:grid;grid-template-columns:repeat(2,minmax(140px,auto));gap:48px;padding:48px;justify-items:center"
    >
      ${PLACEMENTS.map(
        (placement) => html`
          <siaf-tooltip content="Supporting text" placement=${placement}>
            <siaf-button variant="outlined" size="sm">${placement}</siaf-button>
          </siaf-tooltip>
        `,
      )}
    </div>
  `,
};

export const Gallery: Story = {
  render: () => html`
    <siaf-tooltip content="Supporting text">
      <siaf-button variant="outlined" size="sm">Hover tip</siaf-button>
    </siaf-tooltip>
  `,
};
