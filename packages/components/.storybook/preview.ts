import type { Preview } from '@storybook/web-components';
import { html } from 'lit';

import '../../tokens/dist/siaf-tokens.css';
import '../../tokens/dist/siaf-tokens.layout.css';
import '../dist/siaf-rp/siaf-rp.esm.js';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    docs: {
      source: { type: 'dynamic' },
    },
  },
  decorators: [
    (story) => html`
      <div
        style="font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); color: var(--sys-color-text-neutral-high, #202020);"
      >
        ${story()}
      </div>
    `,
  ],
};

export default preview;
