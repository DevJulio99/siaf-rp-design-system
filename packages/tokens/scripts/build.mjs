import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });

copyFileSync(join(root, 'src/css/siaf-tokens.css'), join(dist, 'siaf-tokens.css'));
copyFileSync(join(root, 'src/css/siaf-tokens.layout.css'), join(dist, 'siaf-tokens.layout.css'));
copyFileSync(join(root, 'src/css/siaf-fonts.css'), join(dist, 'siaf-fonts.css'));
if (existsSync(join(root, 'src/css/siaf-tokens.figma.css'))) {
  copyFileSync(join(root, 'src/css/siaf-tokens.figma.css'), join(dist, 'siaf-tokens.figma.css'));
}
copyFileSync(join(root, 'src/ts/index.js'), join(dist, 'index.js'));
copyFileSync(join(root, 'src/ts/index.d.ts'), join(dist, 'index.d.ts'));

console.log('@siaf-rp/tokens → dist/ ready');
