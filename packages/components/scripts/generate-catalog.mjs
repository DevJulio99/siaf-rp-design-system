/**
 * Generates Stencil component scaffolds for the SIAF-RP catalog.
 * Run: node scripts/generate-catalog.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = join(root, 'src/components');

/** Already implemented manually — skip overwrite */
const SKIP = new Set(['siaf-button', 'siaf-alert']);

/**
 * @typedef {'atom'|'feedback'|'form'|'nav'|'data'|'overlay'|'layout'|'domain'|'chart'} Kind
 * @type {Array<{ tag: string, kind: Kind, summary: string }>}
 */
const CATALOG = [
  // atoms
  { tag: 'siaf-icon', kind: 'atom', summary: 'Ícono tipográfico / SVG slot' },
  { tag: 'siaf-divider', kind: 'atom', summary: 'Separador horizontal o vertical' },
  { tag: 'siaf-tag', kind: 'atom', summary: 'Filter tags' },
  { tag: 'siaf-input-tag', kind: 'atom', summary: 'Input tags' },
  { tag: 'siaf-choice-tag', kind: 'atom', summary: 'Choice tags' },
  { tag: 'siaf-action-tag', kind: 'atom', summary: 'Action tags' },
  { tag: 'siaf-icon-button', kind: 'atom', summary: 'Icon buttons' },
  { tag: 'siaf-badge', kind: 'atom', summary: 'Badge numérico o punto' },
  { tag: 'siaf-status-tag', kind: 'atom', summary: 'Tag de estado genérico' },
  { tag: 'siaf-flow-status-tag', kind: 'atom', summary: 'Tag de estado de flujo' },
  { tag: 'siaf-record-status-tag', kind: 'atom', summary: 'Tag de estado de registro' },
  { tag: 'siaf-checkbox', kind: 'form', summary: 'Checkbox' },
  { tag: 'siaf-switch', kind: 'form', summary: 'Switch' },
  { tag: 'siaf-radio-group', kind: 'form', summary: 'Grupo de radios' },
  { tag: 'siaf-input', kind: 'form', summary: 'Campo de texto outlined' },
  { tag: 'siaf-text-area', kind: 'form', summary: 'Área de texto' },
  { tag: 'siaf-readonly', kind: 'form', summary: 'Campo solo lectura' },
  { tag: 'siaf-date-time-picker', kind: 'form', summary: 'Selector fecha/hora (MVP)' },
  // feedback
  { tag: 'siaf-snackbar', kind: 'feedback', summary: 'Snackbar temporal' },
  { tag: 'siaf-loader', kind: 'feedback', summary: 'Loader circular' },
  { tag: 'siaf-loading-progress', kind: 'feedback', summary: 'Barra de progreso' },
  { tag: 'siaf-progress-circular', kind: 'feedback', summary: 'Progreso circular determinado' },
  { tag: 'siaf-empty-state', kind: 'feedback', summary: 'Estado vacío' },
  { tag: 'siaf-tooltip', kind: 'feedback', summary: 'Tooltip' },
  // nav
  { tag: 'siaf-breadcrumb', kind: 'nav', summary: 'Migas de pan' },
  { tag: 'siaf-tabs', kind: 'nav', summary: 'Pestañas' },
  { tag: 'siaf-steps', kind: 'nav', summary: 'Stepper / Steps' },
  { tag: 'siaf-pagination', kind: 'nav', summary: 'Paginación' },
  { tag: 'siaf-menu', kind: 'nav', summary: 'Menú desplegable' },
  // data
  { tag: 'siaf-list', kind: 'data', summary: 'Lista' },
  { tag: 'siaf-table', kind: 'data', summary: 'Tabla base' },
  { tag: 'siaf-kpi-card', kind: 'data', summary: 'Tarjeta KPI' },
  { tag: 'siaf-timeline', kind: 'data', summary: 'Línea de tiempo' },
  // overlay
  { tag: 'siaf-modal', kind: 'overlay', summary: 'Modal / diálogo' },
  { tag: 'siaf-popover', kind: 'overlay', summary: 'Popover' },
  { tag: 'siaf-side-nav', kind: 'overlay', summary: 'Sidenav' },
  { tag: 'siaf-side-panel', kind: 'overlay', summary: 'Panel lateral' },
  // layout
  { tag: 'siaf-accordion', kind: 'layout', summary: 'Acordeón' },
  { tag: 'siaf-collapsible-card', kind: 'layout', summary: 'Card colapsable' },
  { tag: 'siaf-navbar', kind: 'layout', summary: 'Navbar institucional' },
  { tag: 'siaf-sidebar', kind: 'layout', summary: 'Sidebar de navegación' },
  { tag: 'siaf-uploader', kind: 'form', summary: 'Carga de archivos' },
  { tag: 'siaf-uploaded-file-card', kind: 'form', summary: 'Card de archivo cargado' },
  { tag: 'siaf-action-tracker', kind: 'layout', summary: 'Action tracker' },
  // domain shells (compose slots; refine later)
  { tag: 'siaf-report-table', kind: 'domain', summary: 'Tabla de reporte (shell)' },
  { tag: 'siaf-documents-records-table', kind: 'domain', summary: 'Tabla documentos (shell)' },
  { tag: 'siaf-records-search-toolbar', kind: 'domain', summary: 'Toolbar búsqueda (shell)' },
  { tag: 'siaf-form-table-search', kind: 'domain', summary: 'Búsqueda en formulario (shell)' },
  { tag: 'siaf-consultas-filtros-chips', kind: 'domain', summary: 'Chips de filtros (shell)' },
  { tag: 'siaf-parametros-aplicados', kind: 'domain', summary: 'Parámetros aplicados (shell)' },
  { tag: 'siaf-custom-filter', kind: 'domain', summary: 'Filtro custom (shell)' },
  { tag: 'siaf-solicitude-form-card', kind: 'domain', summary: 'Card solicitud form (shell)' },
  { tag: 'siaf-solicitude-info-card', kind: 'domain', summary: 'Card info solicitud (shell)' },
  { tag: 'siaf-summary-card', kind: 'domain', summary: 'Card resumen (shell)' },
  { tag: 'siaf-report-summary-card', kind: 'domain', summary: 'Card resumen reporte (shell)' },
  { tag: 'siaf-document-summary-card', kind: 'domain', summary: 'Card resumen documento (shell)' },
  { tag: 'siaf-stepper-card', kind: 'domain', summary: 'Card stepper (shell)' },
  { tag: 'siaf-desk-card', kind: 'domain', summary: 'Card escritorio (shell)' },
  { tag: 'siaf-detail-history-tabs', kind: 'domain', summary: 'Tabs historial (shell)' },
  { tag: 'siaf-document-history-panel', kind: 'domain', summary: 'Panel historial doc (shell)' },
  { tag: 'siaf-account-history-panel', kind: 'domain', summary: 'Panel historial cuenta (shell)' },
  { tag: 'siaf-asiento-history-panel', kind: 'domain', summary: 'Panel historial asiento (shell)' },
  { tag: 'siaf-request-approval-modals', kind: 'domain', summary: 'Modales aprobación (shell)' },
  { tag: 'siaf-annulment-modal', kind: 'domain', summary: 'Modal anulación (shell)' },
  { tag: 'siaf-selection-side-nav', kind: 'domain', summary: 'Sidenav selección (shell)' },
  { tag: 'siaf-upload-side-nav', kind: 'domain', summary: 'Sidenav upload (shell)' },
  { tag: 'siaf-timeline-detail-panel', kind: 'domain', summary: 'Panel detalle timeline (shell)' },
  { tag: 'siaf-column-visibility-panel', kind: 'domain', summary: 'Panel columnas (shell)' },
  { tag: 'siaf-query-parameters-panel', kind: 'domain', summary: 'Panel parámetros (shell)' },
  { tag: 'siaf-solicitude-page-layout', kind: 'domain', summary: 'Layout solicitud (shell)' },
  { tag: 'siaf-solicitude-header', kind: 'domain', summary: 'Header solicitud (shell)' },
  { tag: 'siaf-create-document', kind: 'domain', summary: 'Crear documento (shell)' },
  { tag: 'siaf-documents-records-page', kind: 'domain', summary: 'Página documentos (shell)' },
  { tag: 'siaf-query-report-page', kind: 'domain', summary: 'Página consulta (shell)' },
  { tag: 'siaf-mobile-navigation-menu', kind: 'domain', summary: 'Nav móvil (shell)' },
  { tag: 'siaf-process-menu-tree', kind: 'domain', summary: 'Árbol procesos (shell)' },
  { tag: 'siaf-notifications-panel', kind: 'domain', summary: 'Panel notificaciones (shell)' },
  { tag: 'siaf-tray-menu', kind: 'domain', summary: 'Menú bandeja (shell)' },
  { tag: 'siaf-tray-documents-view', kind: 'domain', summary: 'Vista docs bandeja (shell)' },
  { tag: 'siaf-tray-notifications-view', kind: 'domain', summary: 'Vista notif bandeja (shell)' },
  { tag: 'siaf-landing-header', kind: 'domain', summary: 'Landing header (shell)' },
  { tag: 'siaf-landing-systems-bar', kind: 'domain', summary: 'Landing systems bar (shell)' },
  { tag: 'siaf-landing-detail-hero', kind: 'domain', summary: 'Landing hero (shell)' },
  { tag: 'siaf-landing-cards-carousel', kind: 'domain', summary: 'Landing carousel (shell)' },
  { tag: 'siaf-landing-footer', kind: 'domain', summary: 'Landing footer (shell)' },
  { tag: 'siaf-landing-chat-button', kind: 'domain', summary: 'Landing chat button (shell)' },
  // charts (MVP shells)
  { tag: 'siaf-bar-chart', kind: 'chart', summary: 'Barras (shell)' },
  { tag: 'siaf-line-chart', kind: 'chart', summary: 'Líneas (shell)' },
  { tag: 'siaf-diverging-chart', kind: 'chart', summary: 'Divergente (shell)' },
];

function toClassName(tag) {
  return tag
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function tsxFor(entry) {
  const Class = toClassName(entry.tag);
  if (entry.kind === 'domain' || entry.kind === 'chart') {
    return `import { Component, Host, Prop, h } from '@stencil/core';

/**
 * ${entry.summary}.
 * Shell componible — refinar paridad visual vs Figma en iteraciones.
 *
 * @slot - Contenido
 * @slot header - Encabezado opcional
 * @slot footer - Pie opcional
 */
@Component({
  tag: '${entry.tag}',
  styleUrl: '${entry.tag}.css',
  shadow: true,
})
export class ${Class} {
  /** Título opcional */
  @Prop() heading?: string;

  render() {
    return (
      <Host>
        <section class="shell" part="shell">
          <header class="header" part="header">
            {this.heading ? <h2 class="title">{this.heading}</h2> : null}
            <slot name="header" />
          </header>
          <div class="body" part="body">
            <slot />
          </div>
          <footer class="footer" part="footer">
            <slot name="footer" />
          </footer>
        </section>
      </Host>
    );
  }
}
`;
  }

  // Generic rich scaffold — specialized files overwrite these after generation
  return `import { Component, Host, Prop, h } from '@stencil/core';

/**
 * ${entry.summary}.
 *
 * @slot - Contenido principal
 */
@Component({
  tag: '${entry.tag}',
  styleUrl: '${entry.tag}.css',
  shadow: true,
})
export class ${Class} {
  /** Deshabilitado */
  @Prop({ reflect: true }) disabled = false;

  render() {
    return (
      <Host aria-disabled={this.disabled ? 'true' : null}>
        <div class="root" part="root">
          <slot />
        </div>
      </Host>
    );
  }
}
`;
}

function cssFor(entry) {
  if (entry.kind === 'domain' || entry.kind === 'chart') {
    return `:host {
  display: block;
}

.shell {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--sys-gap-base-sm, 12px);
  padding: var(--sys-padding-base-md, 16px);
  border-radius: var(--sys-radius-md, 8px);
  border: var(--sys-border-linear-thin, 1px) solid var(--sys-color-border-states-enabled, rgba(32, 32, 32, 0.4));
  background: var(--sys-color-bg-surfaces-surface, #fff);
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  color: var(--sys-color-text-neutral-high, #202020);
}

.header:empty,
.footer:empty {
  display: none;
}

.title {
  margin: 0;
  font-size: var(--sys-typography-size-subtitle-1, 16px);
  font-weight: var(--sys-typography-weight-semibold, 600);
}

.body {
  min-width: 0;
}

.footer {
  display: flex;
  gap: var(--sys-gap-base-xs, 8px);
  justify-content: flex-end;
}
`;
  }

  return `:host {
  display: block;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  color: var(--sys-color-text-neutral-high, #202020);
}

.root {
  box-sizing: border-box;
}

:host([disabled]),
:host([aria-disabled='true']) {
  opacity: 0.64;
  pointer-events: none;
}
`;
}

let created = 0;
let skipped = 0;

for (const entry of CATALOG) {
  if (SKIP.has(entry.tag)) {
    skipped++;
    continue;
  }
  const dir = join(componentsDir, entry.tag);
  mkdirSync(dir, { recursive: true });
  const tsxPath = join(dir, `${entry.tag}.tsx`);
  const cssPath = join(dir, `${entry.tag}.css`);

  // Don't overwrite handcrafted files if marked
  if (existsSync(tsxPath) && SKIP.has(entry.tag)) {
    skipped++;
    continue;
  }

  writeFileSync(tsxPath, tsxFor(entry), 'utf8');
  writeFileSync(cssPath, cssFor(entry), 'utf8');
  created++;
}

writeFileSync(
  join(root, 'CATALOG.md'),
  `# Catálogo SIAF-RP (Stencil)

Total entradas generadas/planificadas: ${CATALOG.length + SKIP.size}

## Leyenda de kind

- **atom / form / feedback / nav / data / overlay / layout** — implementación base (se refina)
- **domain / chart** — shell con slots (paridad Figma en iteraciones)

## Lista

${CATALOG.map((c) => `- \`${c.tag}\` (${c.kind}) — ${c.summary}`).join('\n')}
- \`siaf-button\` (atom) — implementado
- \`siaf-alert\` (feedback) — implementado
`,
  'utf8',
);

console.log(`Created/updated ${created} components, skipped ${skipped}`);
