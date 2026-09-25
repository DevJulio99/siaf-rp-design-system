import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = join(root, 'vendor');

const tokensCss = join(root, '../../packages/tokens/dist/siaf-tokens.css');
const fontsCss = join(root, '../../packages/tokens/dist/siaf-fonts.css');
const layoutCss = join(root, '../../packages/tokens/dist/siaf-tokens.layout.css');
const componentsDist = join(root, '../../packages/components/dist/siaf-rp');

if (!existsSync(tokensCss) || !existsSync(fontsCss) || !existsSync(componentsDist)) {
  console.error('Build tokens + components first: npm run build (from repo root)');
  process.exit(1);
}

mkdirSync(vendor, { recursive: true });
cpSync(tokensCss, join(vendor, 'siaf-tokens.css'));
cpSync(fontsCss, join(vendor, 'siaf-fonts.css'));
if (existsSync(layoutCss)) cpSync(layoutCss, join(vendor, 'siaf-tokens.layout.css'));
cpSync(componentsDist, join(vendor, 'siaf-rp'), { recursive: true });
console.log('Playground vendor/ updated');

await import('./build-docs.mjs');
