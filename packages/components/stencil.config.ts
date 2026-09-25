import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'siaf-rp',
  globalStyle: 'src/global/global.css',
  globalScript: 'src/global/global.ts',
  sourceMap: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      // `bundle` → defineCustomElements() en dist/components (sin lazy .entry.js)
      // `autoLoader` → import side-effect que registra tags al aparecer en el DOM
      customElementsExportBehavior: 'bundle',
      externalRuntime: false,
      generateTypeDeclarations: true,
      autoLoader: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        {
          src: '../../tokens/dist/siaf-tokens.css',
          dest: 'siaf-tokens.css',
          warn: false,
        },
        {
          src: '../../tokens/dist/siaf-tokens.layout.css',
          dest: 'siaf-tokens.layout.css',
          warn: false,
        },
        {
          src: '../../tokens/dist/siaf-fonts.css',
          dest: 'siaf-fonts.css',
          warn: false,
        },
        {
          src: 'demo-kit.html',
          dest: 'demo-kit.html',
          warn: false,
        },
        {
          src: 'assets',
          dest: 'assets',
          warn: false,
        },
      ],
    },
  ],
  extras: {
    enableImportInjection: true,
  },
};
