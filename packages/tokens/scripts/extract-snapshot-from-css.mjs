/**
 * Re-extract snapshot from committed siaf-tokens.css (offline fallback).
 * Usage: node scripts/extract-snapshot-from-css.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src/css/siaf-tokens.css'), 'utf8');
const re =
  /--(figma-light-sys-[a-z0-9-]+|figma-device-sys-[a-z0-9-]+|figma-color-palette-[a-z0-9-]+)\s*:\s*([^;}]+);/gi;

const map = new Map();
let m;
while ((m = re.exec(css))) {
  const full = m[1];
  const val = m[2].trim();
  if (val.startsWith('var(')) continue;
  let name;
  if (full.startsWith('figma-light-')) name = full.slice('figma-light-'.length).replace(/-/g, '/');
  else if (full.startsWith('figma-device-')) name = full.slice('figma-device-'.length).replace(/-/g, '/');
  else name = 'color/palette/' + full.slice('figma-color-palette-'.length).replace(/-/g, '/');
  if (!map.has(name)) map.set(name, { name, css: val });
}

const out = {
  source: 'extracted-from-siaf-tokens.css',
  extractedAt: new Date().toISOString(),
  variables: [...map.values()],
};

mkdirSync(join(root, 'figma'), { recursive: true });
writeFileSync(join(root, 'figma/variables.snapshot.json'), JSON.stringify(out, null, 2));
console.log(`Wrote figma/variables.snapshot.json (${out.variables.length} vars)`);
