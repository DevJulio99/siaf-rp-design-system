import type { StorybookConfig } from '@storybook/web-components-vite';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-links'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: [
    { from: join(root, '../../tokens/dist'), to: '/tokens' },
    { from: join(root, '../dist/siaf-rp'), to: '/siaf-rp' },
    { from: join(root, '../src/assets'), to: '/assets' },
  ],
  async viteFinal(config) {
    config.server = config.server ?? {};
    config.server.fs = {
      ...config.server.fs,
      allow: [join(root, '../..'), join(root, '..'), join(root, '../../tokens')],
    };
    // Stencil emite *.entry.js.map; Vite/Rollup no debe tratarlos como módulos JS
    config.plugins = [
      ...(config.plugins ?? []),
      {
        name: 'siaf-ignore-stencil-sourcemaps',
        enforce: 'pre' as const,
        load(id: string) {
          if (id.includes('\0')) return null;
          if (id.endsWith('.map') || id.includes('.entry.js.map')) return '';
          return null;
        },
      },
    ];
    return config;
  },
};

export default config;
