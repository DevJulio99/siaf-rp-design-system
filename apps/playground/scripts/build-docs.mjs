/**
 * Static docs / variant catalog for SIAF-RP core (Storybook-lite).
 * Served from apps/playground/docs after prepare.mjs copies vendor.
 */
import { mkdirSync, writeFileSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'docs');
mkdirSync(out, { recursive: true });

const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>SIAF-RP · Catálogo de variantes</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../vendor/siaf-tokens.css" />
  <link rel="stylesheet" href="../vendor/siaf-tokens.layout.css" />
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #f7f7f7; color: #202020; }
    header { background: #014899; color: #fff; padding: 16px 24px; }
    header a { color: #fff; margin-right: 16px; }
    main { max-width: 960px; margin: 0 auto; padding: 24px; display: flex; flex-direction: column; gap: 32px; }
    section { background: #fff; border-radius: 8px; padding: 20px 24px; border: 1px solid rgba(32,32,32,.12); }
    h2 { margin: 0 0 8px; font-size: 16px; }
    .hint { margin: 0 0 16px; font-size: 13px; color: #6f6f71; }
    .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .stack { display: flex; flex-direction: column; gap: 12px; }
    nav.toc { display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 13px; }
    nav.toc a { color: #014899; }
  </style>
  <script type="module" src="../vendor/siaf-rp/siaf-rp.esm.js"></script>
</head>
<body>
  <header>
    <strong>SIAF-RP Docs</strong>
    <a href="../index.html">Playground</a>
    <a href="../flow.html">Piloto flujo</a>
  </header>
  <main>
    <nav class="toc">
      <a href="#button">Button</a>
      <a href="#input">Input</a>
      <a href="#alert">Alert</a>
      <a href="#tag">Tag</a>
      <a href="#modal">Modal</a>
      <a href="#steps">Steps</a>
      <a href="#pagination">Pagination</a>
      <a href="#uploader">Uploader</a>
      <a href="#icon">Icon</a>
    </nav>

    <section id="button">
      <h2>siaf-button</h2>
      <p class="hint">Variantes filled / outlined / text / tonal · sizes sm/md/lg · colors</p>
      <div class="row">
        <siaf-button variant="filled" color="primary">Filled</siaf-button>
        <siaf-button variant="outlined" color="primary">Outlined</siaf-button>
        <siaf-button variant="text" color="primary">Text</siaf-button>
        <siaf-button variant="tonal" color="primary">Tonal</siaf-button>
        <siaf-button variant="filled" color="danger">Danger</siaf-button>
        <siaf-button variant="filled" size="sm">SM</siaf-button>
        <siaf-button variant="filled" size="lg" icon="add">LG</siaf-button>
        <siaf-button variant="filled" color="primary" icon="check">Continuar</siaf-button>
        <siaf-button variant="text" color="primary" icon="refresh">Limpiar</siaf-button>
        <siaf-button disabled>Disabled</siaf-button>
      </div>
    </section>

    <section id="input">
      <h2>siaf-input / readonly</h2>
      <p class="hint">Default 40 · Compact 32 · error / helper. Combo cerrado: componer Text fields + menus/Lists en la app (no hay Select Kit).</p>
      <div class="stack">
        <siaf-input label="Default" placeholder="Texto" helper-text="Ayuda"></siaf-input>
        <siaf-input label="Compact" size="compact" value="32px"></siaf-input>
        <siaf-input label="Error" error-text="Campo obligatorio"></siaf-input>
        <siaf-readonly label="Readonly" value="Solo lectura"></siaf-readonly>
      </div>
    </section>

    <section id="alert">
      <h2>siaf-alert</h2>
      <div class="stack">
        <siaf-alert tone="info"><span slot="title">Info</span>Mensaje informativo</siaf-alert>
        <siaf-alert tone="success"><span slot="title">Éxito</span>Operación correcta</siaf-alert>
        <siaf-alert tone="warning"><span slot="title">Advertencia</span>Revise los datos</siaf-alert>
        <siaf-alert tone="danger"><span slot="title">Error</span>No se pudo guardar</siaf-alert>
      </div>
    </section>

    <section id="tag">
      <h2>siaf-tag / flow-status-tag</h2>
      <div class="row">
        <siaf-tag tone="info" size="standard">Standard</siaf-tag>
        <siaf-tag tone="success" size="small">Small</siaf-tag>
        <siaf-tag tone="warning" variant="outlined">Outlined</siaf-tag>
        <siaf-tag tone="danger" variant="filled">Filled</siaf-tag>
        <siaf-flow-status-tag tone="info">Flujo</siaf-flow-status-tag>
      </div>
    </section>

    <section id="modal">
      <h2>siaf-modal / side-panel / snackbar</h2>
      <div class="row">
        <siaf-button id="open-modal" variant="filled">Abrir modal</siaf-button>
        <siaf-button id="open-panel" variant="outlined">Abrir panel</siaf-button>
        <siaf-button id="open-snack" variant="tonal">Snackbar</siaf-button>
      </div>
      <siaf-modal id="m" heading="Confirmar" confirm-actions>Contenido del modal Transversales.</siaf-modal>
      <siaf-side-panel id="p" heading="Panel">Detalle lateral.</siaf-side-panel>
      <siaf-snackbar id="s" tone="info" message="Notificación"></siaf-snackbar>
    </section>

    <section id="steps">
      <h2>siaf-steps / page-header</h2>
      <siaf-page-header heading="Registro" subtitle="Docs bloque 2">
        <siaf-flow-status-tag slot="status" tone="info" label="Borrador"></siaf-flow-status-tag>
      </siaf-page-header>
      <siaf-steps
        interactive
        current="1"
        steps='[{"id":"a","label":"Datos"},{"id":"b","label":"Detalle"},{"id":"c","label":"Resumen"}]'
      ></siaf-steps>
    </section>

    <section id="pagination">
      <h2>siaf-pagination / table / breadcrumb</h2>
      <siaf-breadcrumb items='[{"label":"Docs","href":"#"},{"label":"Catálogo"}]'></siaf-breadcrumb>
      <siaf-table
        caption="Ejemplo"
        columns='[{"key":"a","label":"A"},{"key":"b","label":"B"}]'
        rows='[{"a":"1","b":"Uno"},{"a":"2","b":"Dos"}]'
      ></siaf-table>
      <siaf-pagination total-items="40" page="1" page-size="10" show-page-size></siaf-pagination>
    </section>

    <section id="uploader">
      <h2>siaf-uploader</h2>
      <siaf-uploader label="Arrastre archivos o haga clic" hint="PDF · máx. 10 MB" accept=".pdf"></siaf-uploader>
    </section>

    <section id="icon">
      <h2>siaf-icon</h2>
      <div class="row" style="color:#014899">
        <siaf-icon name="search" size="lg"></siaf-icon>
        <siaf-icon name="filter_list" size="lg"></siaf-icon>
        <siaf-icon name="upload" size="lg"></siaf-icon>
        <siaf-icon name="settings" size="lg"></siaf-icon>
        <siaf-icon name="check_circle" size="lg"></siaf-icon>
        <siaf-icon name="warning" size="lg"></siaf-icon>
        <siaf-icon name="error" size="lg"></siaf-icon>
      </div>
    </section>
  </main>
  <script>
    const demo = document.getElementById('overlay-demo') || document.body;
    document.getElementById('open-modal').addEventListener('siafClick', () => { document.getElementById('m').open = true; });
    document.getElementById('open-panel').addEventListener('siafClick', () => { document.getElementById('p').open = true; });
    document.getElementById('open-snack').addEventListener('siafClick', () => { document.getElementById('s').open = true; });
  </script>
</body>
</html>
`;

writeFileSync(join(out, 'index.html'), html);
console.log('Docs catalog → apps/playground/docs/index.html');
