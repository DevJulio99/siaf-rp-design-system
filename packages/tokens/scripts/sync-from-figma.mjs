/**
 * Sync Figma Variables → CSS custom properties (@siaf-rp/tokens).
 *
 * Modes:
 *  1) From snapshot JSON (committed / exported via MCP):
 *       node scripts/sync-from-figma.mjs --from=figma/variables.snapshot.json
 *  2) From Figma REST API (requires FIGMA_ACCESS_TOKEN + file key of UI Kit):
 *       node scripts/sync-from-figma.mjs --file-key=<KEY>
 *
 * Output:
 *   - dist/siaf-tokens.generated.css  (raw --figma-* / --sys-* from snapshot)
 *   - updates src/css/siaf-tokens.figma.css (checked in; imported by build)
 *
 * Naming: Figma `sys/color/bg/brand/primary` → `--sys-color-bg-brand-primary`
 *         palette vars also emit `--figma-light-sys-…` when collection is Theme light.
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const figmaDir = join(root, 'figma');

function toCssName(figmaName) {
  return (
    '--' +
    figmaName
      .replace(/^\/+|\/+$/g, '')
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .toLowerCase()
  );
}

function colorToCss(c) {
  if (typeof c === 'string') return c;
  if (!c || typeof c !== 'object') return null;
  if ('r' in c) {
    const r = Math.round(c.r * 255);
    const g = Math.round(c.g * 255);
    const b = Math.round(c.b * 255);
    const a = c.a == null ? 1 : c.a;
    if (a >= 0.999) {
      return (
        '#' +
        [r, g, b]
          .map((x) => x.toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase()
      );
    }
    return `rgb(${r} ${g} ${b} / ${a})`;
  }
  return null;
}

function floatToCss(n) {
  if (typeof n !== 'number') return String(n);
  return Number.isInteger(n) ? `${n}px` : `${n}px`;
}

function resolveEntry(entry) {
  if (entry == null) return null;
  if (typeof entry === 'string' || typeof entry === 'number' || typeof entry === 'boolean') {
    return entry;
  }
  if (entry.type === 'COLOR' || entry.resolvedType === 'COLOR') {
    return colorToCss(entry.value ?? entry);
  }
  if (entry.type === 'FLOAT' || entry.resolvedType === 'FLOAT') {
    return floatToCss(entry.value ?? entry);
  }
  if (entry.css) return entry.css;
  if (entry.value != null) return resolveEntry(entry.value);
  return colorToCss(entry) ?? (typeof entry === 'object' ? null : String(entry));
}

function normalizeSnapshot(raw) {
  // Accept { variables: [{ name, resolvedType, value|css }] } or REST API shape
  if (Array.isArray(raw.variables)) {
    return raw.variables
      .map((v) => {
        const name = v.name || v.variableName;
        if (!name) return null;
        let css = v.css ?? resolveEntry(v);
        if (css == null && v.valuesByMode) {
          const mode = Object.keys(v.valuesByMode)[0];
          css = resolveEntry({ ...v, value: v.valuesByMode[mode] });
        }
        if (css == null) return null;
        if (typeof css === 'number') css = floatToCss(css);
        if (typeof css === 'boolean') css = String(css);
        return { name, css: String(css), collection: v.collection || v.variableCollectionName || '' };
      })
      .filter(Boolean);
  }
  if (raw.meta?.variables) {
    // Figma REST /v1/files/:key/variables/local
    const vars = Object.values(raw.meta.variables);
    return vars
      .map((v) => {
        const mode = Object.keys(v.valuesByMode || {})[0];
        const val = v.valuesByMode?.[mode];
        let css;
        if (v.resolvedType === 'COLOR') css = colorToCss(val);
        else if (v.resolvedType === 'FLOAT') css = floatToCss(val);
        else css = val == null ? null : String(val);
        if (!css) return null;
        return { name: v.name, css, collection: '' };
      })
      .filter(Boolean);
  }
  throw new Error('Unrecognized snapshot format. Expected { variables: [...] }');
}

function emitCss(entries) {
  const lines = [
    '/**',
    ' * AUTO-GENERATED — do not edit by hand.',
    ' * Source: Figma Variables snapshot / REST sync.',
    ` * Generated: ${new Date().toISOString()}`,
    ' * Re-run: npm run sync:tokens -w @siaf-rp/tokens',
    ' */',
    '',
    ':root {',
  ];
  const seen = new Set();
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const sys = toCssName(e.name.startsWith('sys/') || e.name.startsWith('ref/') ? e.name : `sys/${e.name}`);
    // Prefer --sys-* for semantic, also keep --figma-* mirror for Theme/Device dumps
    const figma = toCssName(
      e.name.startsWith('sys/') ? `figma-light-${e.name}` : e.name.startsWith('figma') ? e.name : `figma-${e.name}`,
    );
    if (!seen.has(sys)) {
      lines.push(`  ${sys}: ${e.css};`);
      seen.add(sys);
    }
    if (!seen.has(figma) && figma !== sys) {
      lines.push(`  ${figma}: ${e.css};`);
      seen.add(figma);
    }
  }
  lines.push('}', '');
  return lines.join('\n');
}

async function fetchFromApi(fileKey, token) {
  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API ${res.status}: ${text.slice(0, 400)}`);
  }
  return res.json();
}

function parseArgs(argv) {
  const out = { from: null, fileKey: null, dry: false };
  for (const a of argv) {
    if (a === '--dry') out.dry = true;
    else if (a.startsWith('--from=')) out.from = a.slice(7);
    else if (a.startsWith('--file-key=')) out.fileKey = a.slice(11);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  mkdirSync(figmaDir, { recursive: true });
  mkdirSync(join(root, 'dist'), { recursive: true });
  mkdirSync(join(root, 'src/css'), { recursive: true });

  let raw;
  if (args.fileKey) {
    const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
    if (!token) {
      console.error('FIGMA_ACCESS_TOKEN required for --file-key mode');
      process.exit(1);
    }
    console.log(`Fetching variables from Figma file ${args.fileKey}…`);
    raw = await fetchFromApi(args.fileKey, token);
    const snapPath = join(figmaDir, 'variables.snapshot.json');
    if (!args.dry) {
      writeFileSync(snapPath, JSON.stringify({ source: 'figma-rest', fileKey: args.fileKey, fetchedAt: new Date().toISOString(), ...raw }, null, 2));
      console.log(`Wrote ${snapPath}`);
    }
  } else {
    const from = args.from
      ? resolve(process.cwd(), args.from)
      : join(figmaDir, 'variables.snapshot.json');
    if (!existsSync(from)) {
      console.error(`Snapshot not found: ${from}`);
      console.error('Create one via MCP export or: npm run sync:tokens -- --file-key=<UI_KIT_FILE_KEY>');
      process.exit(1);
    }
    raw = JSON.parse(readFileSync(from, 'utf8'));
  }

  const entries = normalizeSnapshot(raw);
  const css = emitCss(entries);
  const outSrc = join(root, 'src/css/siaf-tokens.figma.css');
  const outDist = join(root, 'dist/siaf-tokens.generated.css');

  if (args.dry) {
    console.log(css.slice(0, 800));
    console.log(`… (${entries.length} variables)`);
    return;
  }

  writeFileSync(outSrc, css);
  writeFileSync(outDist, css);
  console.log(`Synced ${entries.length} variables → src/css/siaf-tokens.figma.css`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
