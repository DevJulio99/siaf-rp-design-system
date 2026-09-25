/**
 * Part 3 — modal, side panels, table, card, menu, uploader, etc.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/components');
function write(tag, tsx, css) {
  const d = join(dir, tag);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, `${tag}.tsx`), tsx.trimStart(), 'utf8');
  writeFileSync(join(d, `${tag}.css`), css.trimStart(), 'utf8');
}

write(
  'siaf-modal',
  `import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

@Component({ tag: 'siaf-modal', styleUrl: 'siaf-modal.css', shadow: true })
export class SiafModal {
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop() heading = '';
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';
  @Event() siafClose!: EventEmitter<void>;

  @Watch('open')
  lockScroll(open: boolean) {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  private close = () => {
    this.open = false;
    this.siafClose.emit();
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close();
  };

  render() {
    if (!this.open) return <Host aria-hidden="true" />;
    return (
      <Host onKeyDown={this.onKey}>
        <div class="scrim" part="scrim" onClick={this.close} />
        <div class={\`dialog size-\${this.size}\`} role="dialog" aria-modal="true" aria-label={this.heading || 'Diálogo'} part="dialog">
          <header class="header">
            <h2 class="title"><slot name="header">{this.heading}</slot></h2>
            <button type="button" class="x" aria-label="Cerrar" onClick={this.close}>×</button>
          </header>
          <div class="body"><slot /></div>
          <footer class="footer"><slot name="footer" /></footer>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: contents; }
.scrim {
  position: fixed; inset: 0; background: rgb(32 32 32 / .48); z-index: 1200;
}
.dialog {
  position: fixed; z-index: 1201; left: 50%; top: 50%; transform: translate(-50%, -50%);
  display: flex; flex-direction: column; max-height: min(90vh, 720px); width: min(100% - 32px, 560px);
  background: var(--sys-color-bg-surfaces-surface, #fff);
  border-radius: var(--sys-radius-md, 8px);
  box-shadow: var(--sys-shadow-elevation-16, 0 16px 22px rgba(0,0,0,.14));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.size-sm { width: min(100% - 32px, 400px); }
.size-lg { width: min(100% - 32px, 840px); }
.header {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 20px; border-bottom: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
}
.title { margin: 0; flex: 1; font-size: 18px; font-weight: 600; }
.x { border: 0; background: transparent; font-size: 24px; cursor: pointer; line-height: 1; color: var(--sys-color-text-neutral-low, #6f6f71); }
.body { padding: 20px; overflow: auto; flex: 1; }
.footer {
  display: flex; justify-content: flex-end; gap: 8px; padding: 12px 20px;
  border-top: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
}
.footer:empty { display: none; }
`,
);

write(
  'siaf-side-panel',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-side-panel', styleUrl: 'siaf-side-panel.css', shadow: true })
export class SiafSidePanel {
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop() heading = '';
  @Prop({ reflect: true }) side: 'right' | 'left' = 'right';
  @Event() siafClose!: EventEmitter<void>;

  private close = () => { this.open = false; this.siafClose.emit(); };

  render() {
    return (
      <Host class={{ open: this.open }}>
        <div class="scrim" onClick={this.close} />
        <aside class="panel" role="dialog" aria-modal="true" aria-label={this.heading || 'Panel'}>
          <header class="header">
            <h2 class="title"><slot name="header">{this.heading}</slot></h2>
            <button type="button" class="x" aria-label="Cerrar" onClick={this.close}>×</button>
          </header>
          <div class="body"><slot /></div>
          <footer class="footer"><slot name="footer" /></footer>
        </aside>
      </Host>
    );
  }
}
`,
  `:host { display: contents; }
.scrim {
  position: fixed; inset: 0; background: rgb(32 32 32 / .4); z-index: 1150;
  opacity: 0; pointer-events: none; transition: opacity .2s ease;
}
:host(.open) .scrim { opacity: 1; pointer-events: auto; }
.panel {
  position: fixed; top: 0; bottom: 0; z-index: 1151; width: min(100vw - 24px, 420px);
  background: #fff; display: flex; flex-direction: column;
  box-shadow: var(--sys-shadow-lg, 0 12px 32px rgba(16,24,40,.12));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  transition: transform .2s ease;
}
:host([side='right']) .panel { right: 0; transform: translateX(105%); }
:host([side='left']) .panel { left: 0; transform: translateX(-105%); }
:host(.open) .panel { transform: translateX(0); }
.header { display: flex; align-items: center; gap: 8px; padding: 16px 20px; border-bottom: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12)); }
.title { margin: 0; flex: 1; font-size: 16px; font-weight: 600; }
.x { border: 0; background: transparent; font-size: 22px; cursor: pointer; }
.body { flex: 1; overflow: auto; padding: 16px 20px; }
.footer { padding: 12px 20px; border-top: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12)); display: flex; gap: 8px; justify-content: flex-end; }
.footer:empty { display: none; }
`,
);

write(
  'siaf-side-nav',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-side-nav', styleUrl: 'siaf-side-nav.css', shadow: true })
export class SiafSideNav {
  @Prop() heading?: string;
  render() {
    return (
      <Host>
        <nav class="nav" part="nav">
          {this.heading ? <div class="heading">{this.heading}</div> : <slot name="header" />}
          <div class="body"><slot /></div>
          <div class="footer"><slot name="footer" /></div>
        </nav>
      </Host>
    );
  }
}
`,
  `:host { display: block; height: 100%; }
.nav {
  display: flex; flex-direction: column; height: 100%; min-height: 240px;
  background: var(--sys-color-bg-surfaces-surface, #fff);
  border-right: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.heading { padding: 16px; font-weight: 600; font-size: 14px; border-bottom: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12)); }
.body { flex: 1; overflow: auto; padding: 8px; }
.footer { padding: 12px; border-top: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12)); }
.footer:empty { display: none; }
`,
);

write(
  'siaf-card',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-card', styleUrl: 'siaf-card.css', shadow: true })
export class SiafCard {
  @Prop() heading?: string;
  @Prop({ reflect: true }) elevated = false;
  render() {
    return (
      <Host class={{ elevated: this.elevated }}>
        <article class="card" part="card">
          {(this.heading || true) && (
            <header class="header">
              {this.heading ? <h3 class="title">{this.heading}</h3> : null}
              <slot name="header" />
            </header>
          )}
          <div class="body"><slot /></div>
          <footer class="footer"><slot name="footer" /></footer>
        </article>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.card {
  border-radius: var(--sys-radius-md, 8px);
  border: 1px solid var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  background: var(--sys-color-bg-surfaces-surface, #fff);
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  overflow: hidden;
}
:host(.elevated) .card { box-shadow: var(--sys-shadow-md, 0 8px 24px rgba(16,24,40,.08)); border-color: transparent; }
.header { padding: 16px 16px 0; display: flex; align-items: center; gap: 8px; }
.header:empty { display: none; }
.title { margin: 0; font-size: 16px; font-weight: 600; flex: 1; }
.body { padding: 16px; }
.footer { padding: 0 16px 16px; display: flex; gap: 8px; justify-content: flex-end; }
.footer:empty { display: none; }
`,
);

write(
  'siaf-kpi-card',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-kpi-card', styleUrl: 'siaf-kpi-card.css', shadow: true })
export class SiafKpiCard {
  @Prop() label = '';
  @Prop() value: string | number = '';
  @Prop() hint?: string;
  render() {
    return (
      <Host>
        <div class="kpi" part="kpi">
          <div class="label">{this.label}</div>
          <div class="value"><slot>{this.value}</slot></div>
          {this.hint ? <div class="hint">{this.hint}</div> : null}
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.kpi {
  padding: 16px; border-radius: var(--sys-radius-lg, 16px);
  background: var(--sys-color-bg-surfaces-surface, #fff);
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.label { font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); margin-bottom: 4px; }
.value { font-size: 28px; font-weight: 700; color: var(--sys-color-text-neutral-high, #202020); line-height: 1.2; }
.hint { margin-top: 4px; font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

write(
  'siaf-table',
  `import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafColumn { key: string; label: string; width?: string }
export type SiafRow = Record<string, string | number | boolean | null | undefined>;

@Component({ tag: 'siaf-table', styleUrl: 'siaf-table.css', shadow: true })
export class SiafTable {
  @Prop() columns: SiafColumn[] | string = [];
  @Prop() rows: SiafRow[] | string = [];
  @Prop() caption?: string;

  private cols(): SiafColumn[] {
    if (typeof this.columns === 'string') { try { return JSON.parse(this.columns); } catch { return []; } }
    return this.columns || [];
  }
  private data(): SiafRow[] {
    if (typeof this.rows === 'string') { try { return JSON.parse(this.rows); } catch { return []; } }
    return this.rows || [];
  }

  render() {
    const cols = this.cols();
    const rows = this.data();
    return (
      <Host>
        <div class="wrap" part="wrap">
          <table>
            {this.caption ? <caption>{this.caption}</caption> : null}
            <thead>
              <tr>{cols.map((c) => <th style={c.width ? { width: c.width } : null}>{c.label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={cols.length || 1} class="empty">Sin registros</td></tr>
              ) : rows.map((r) => (
                <tr>{cols.map((c) => <td>{String(r[c.key] ?? '')}</td>)}</tr>
              ))}
            </tbody>
          </table>
          <slot />
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.wrap { overflow: auto; border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12)); border-radius: var(--sys-radius-md, 8px); }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
caption { text-align: left; padding: 12px 16px; font-weight: 600; }
th, td {
  padding: 12px 16px; text-align: left; vertical-align: middle;
  border-bottom: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
}
th {
  background: var(--sys-color-bg-surfaces-surface-low, rgba(32,32,32,.04));
  font-weight: 600; color: var(--sys-color-text-neutral-medium, #29292a);
  white-space: nowrap;
}
td { color: var(--sys-color-text-neutral-high, #202020); }
.empty { text-align: center; color: var(--sys-color-text-neutral-low, #6f6f71); }
tbody tr:hover td { background: var(--sys-color-bg-states-light-hover, rgba(32,32,32,.04)); }
`,
);

write(
  'siaf-data-table',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-data-table', styleUrl: 'siaf-data-table.css', shadow: true })
export class SiafDataTable {
  @Prop() columns: any = [];
  @Prop() rows: any = [];
  @Prop() caption?: string;
  render() {
    return (
      <Host>
        <div class="toolbar"><slot name="toolbar" /></div>
        <siaf-table columns={this.columns} rows={this.rows} caption={this.caption} />
        <div class="footer"><slot name="footer" /></div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.toolbar { margin-bottom: 12px; }
.toolbar:empty, .footer:empty { display: none; }
.footer { margin-top: 12px; }
`,
);

write(
  'siaf-table-skeleton',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-table-skeleton', styleUrl: 'siaf-table-skeleton.css', shadow: true })
export class SiafTableSkeleton {
  @Prop() rows = 5;
  @Prop() cols = 4;
  render() {
    return (
      <Host aria-busy="true" aria-label="Cargando tabla">
        <div class="grid">
          {Array.from({ length: this.rows }).map(() => (
            <div class="row">
              {Array.from({ length: this.cols }).map(() => <div class="cell" />)}
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.grid { display: flex; flex-direction: column; gap: 8px; }
.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 8px; }
.cell {
  height: 16px; border-radius: 4px;
  background: linear-gradient(90deg, rgba(32,32,32,.06), rgba(32,32,32,.12), rgba(32,32,32,.06));
  background-size: 200% 100%; animation: shimmer 1.2s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
`,
);

write(
  'siaf-list',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafListItem { id: string; label: string; secondary?: string; disabled?: boolean }

@Component({ tag: 'siaf-list', styleUrl: 'siaf-list.css', shadow: true })
export class SiafList {
  @Prop() items: SiafListItem[] | string = [];
  @Prop({ mutable: true }) selectedId?: string;
  @Event() siafSelect!: EventEmitter<string>;

  private parsed(): SiafListItem[] {
    if (typeof this.items === 'string') { try { return JSON.parse(this.items); } catch { return []; } }
    return this.items || [];
  }

  render() {
    return (
      <Host>
        <ul role="listbox">
          {this.parsed().map((item) => (
            <li>
              <button
                type="button"
                role="option"
                class={{ item: true, selected: item.id === this.selectedId }}
                aria-selected={item.id === this.selectedId ? 'true' : 'false'}
                disabled={item.disabled}
                onClick={() => { this.selectedId = item.id; this.siafSelect.emit(item.id); }}
              >
                <span class="label">{item.label}</span>
                {item.secondary ? <span class="sec">{item.secondary}</span> : null}
              </button>
            </li>
          ))}
          <slot />
        </ul>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
ul { list-style: none; margin: 0; padding: 4px; }
.item {
  width: 100%; text-align: left; border: 0; background: transparent; cursor: pointer;
  padding: 10px 12px; border-radius: 8px; font: inherit; display: flex; flex-direction: column; gap: 2px;
}
.item:hover { background: var(--sys-color-bg-states-light-hover, rgba(32,32,32,.04)); }
.item.selected { background: var(--sys-color-bg-states-light-selected, rgba(1,72,153,.08)); color: var(--sys-color-text-brand-primary, #014899); }
.label { font-size: 14px; font-weight: 500; }
.sec { font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

write(
  'siaf-buttons-group',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-buttons-group', styleUrl: 'siaf-buttons-group.css', shadow: true })
export class SiafButtonsGroup {
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Prop({ reflect: true }) align: 'start' | 'end' | 'center' | 'between' = 'end';
  render() {
    return (
      <Host>
        <div class={\`group \${this.orientation} align-\${this.align}\`} part="group">
          <slot />
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.group { display: flex; gap: 8px; flex-wrap: wrap; }
.vertical { flex-direction: column; }
.align-start { justify-content: flex-start; }
.align-end { justify-content: flex-end; }
.align-center { justify-content: center; }
.align-between { justify-content: space-between; }
`,
);

write(
  'siaf-filter-pill',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-filter-pill', styleUrl: 'siaf-filter-pill.css', shadow: true })
export class SiafFilterPill {
  @Prop() label = '';
  @Prop({ reflect: true }) removable = true;
  @Event() siafRemove!: EventEmitter<void>;
  render() {
    return (
      <Host>
        <span class="pill">
          <slot>{this.label}</slot>
          {this.removable ? (
            <button type="button" class="x" aria-label="Quitar filtro" onClick={() => this.siafRemove.emit()}>×</button>
          ) : null}
        </span>
      </Host>
    );
  }
}
`,
  `:host { display: inline-flex; }
.pill {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 8px 4px 12px; border-radius: 999px;
  background: var(--sys-color-bg-states-light-selected, rgba(1,72,153,.08));
  color: var(--sys-color-text-brand-primary, #014899);
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  font-size: 12px; font-weight: 500;
}
.x { border: 0; background: transparent; cursor: pointer; font-size: 16px; line-height: 1; color: inherit; padding: 0 2px; }
`,
);

write(
  'siaf-accordion',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-accordion', styleUrl: 'siaf-accordion.css', shadow: true })
export class SiafAccordion {
  @Prop() heading = '';
  @Prop({ reflect: true, mutable: true }) open = false;
  render() {
    return (
      <Host>
        <details open={this.open} onToggle={(e) => (this.open = (e.target as HTMLDetailsElement).open)}>
          <summary>{this.heading}<slot name="summary" /></summary>
          <div class="body"><slot /></div>
        </details>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
details {
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  border-radius: var(--sys-radius-md, 8px); overflow: hidden;
}
summary {
  list-style: none; cursor: pointer; padding: 12px 16px; font-weight: 600; font-size: 14px;
  background: var(--sys-color-bg-surfaces-surface-low, rgba(32,32,32,.04));
}
summary::-webkit-details-marker { display: none; }
.body { padding: 16px; }
`,
);

write(
  'siaf-expansion-panel',
  `import { Component, Host, h } from '@stencil/core';

@Component({ tag: 'siaf-expansion-panel', styleUrl: 'siaf-expansion-panel.css', shadow: true })
export class SiafExpansionPanel {
  render() {
    return (
      <Host>
        <siaf-accordion>
          <slot name="summary" slot="summary" />
          <slot />
        </siaf-accordion>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
`,
);

write(
  'siaf-menu',
  `import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

export interface SiafMenuItem { id: string; label: string; disabled?: boolean; danger?: boolean }

@Component({ tag: 'siaf-menu', styleUrl: 'siaf-menu.css', shadow: true })
export class SiafMenu {
  @Prop() items: SiafMenuItem[] | string = [];
  @State() open = false;
  @Event() siafSelect!: EventEmitter<string>;

  private parsed(): SiafMenuItem[] {
    if (typeof this.items === 'string') { try { return JSON.parse(this.items); } catch { return []; } }
    return this.items || [];
  }

  render() {
    return (
      <Host>
        <div class="wrap">
          <div class="trigger" onClick={() => (this.open = !this.open)}>
            <slot name="trigger"><siaf-button variant="outlined" size="sm">Menú</siaf-button></slot>
          </div>
          {this.open ? (
            <ul class="menu" role="menu">
              {this.parsed().map((item) => (
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    class={{ danger: !!item.danger }}
                    disabled={item.disabled}
                    onClick={() => { this.siafSelect.emit(item.id); this.open = false; }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: inline-block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.wrap { position: relative; display: inline-block; }
.menu {
  position: absolute; top: calc(100% + 4px); left: 0; z-index: 30; min-width: 180px;
  margin: 0; padding: 4px; list-style: none;
  background: #fff; border-radius: 8px;
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  box-shadow: var(--sys-shadow-md, 0 8px 24px rgba(16,24,40,.08));
}
button {
  width: 100%; text-align: left; border: 0; background: transparent; cursor: pointer;
  padding: 8px 12px; border-radius: 6px; font: inherit; font-size: 14px;
}
button:hover { background: var(--sys-color-bg-states-light-hover, rgba(32,32,32,.04)); }
button.danger { color: var(--sys-color-text-feedback-danger, #821c1e); }
`,
);

write(
  'siaf-uploader',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-uploader', styleUrl: 'siaf-uploader.css', shadow: true })
export class SiafUploader {
  @Prop() label = 'Arrastre archivos o haga clic para seleccionar';
  @Prop() accept?: string;
  @Prop({ reflect: true }) multiple = false;
  @Prop({ reflect: true }) disabled = false;
  @Event() siafFiles!: EventEmitter<FileList>;

  private onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) this.siafFiles.emit(input.files);
  };

  render() {
    return (
      <Host>
        <label class={{ drop: true, disabled: this.disabled }}>
          <input type="file" accept={this.accept} multiple={this.multiple} disabled={this.disabled} onChange={this.onChange} />
          <span class="text"><slot>{this.label}</slot></span>
        </label>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.drop {
  display: flex; align-items: center; justify-content: center; text-align: center;
  min-height: 120px; padding: 24px; cursor: pointer;
  border: 1px dashed var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  border-radius: var(--sys-radius-md, 8px);
  background: var(--sys-color-bg-surfaces-surface-low, rgba(32,32,32,.04));
  color: var(--sys-color-text-neutral-low, #6f6f71); font-size: 14px;
}
.drop:hover { border-color: var(--sys-color-border-states-hover, rgba(1,72,153,.56)); }
.disabled { opacity: .5; pointer-events: none; }
input { position: absolute; opacity: 0; width: 0; height: 0; }
`,
);

write(
  'siaf-uploaded-file-card',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-uploaded-file-card', styleUrl: 'siaf-uploaded-file-card.css', shadow: true })
export class SiafUploadedFileCard {
  @Prop() fileName = '';
  @Prop() meta?: string;
  @Event() siafRemove!: EventEmitter<void>;
  render() {
    return (
      <Host>
        <div class="card">
          <div class="info">
            <div class="name"><slot>{this.fileName}</slot></div>
            {this.meta ? <div class="meta">{this.meta}</div> : null}
          </div>
          <siaf-button size="sm" variant="text" color="danger" onSiafClick={() => this.siafRemove.emit()}>Quitar</siaf-button>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.card {
  display: flex; align-items: center; gap: 12px; padding: 12px;
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  border-radius: 8px; background: #fff;
}
.info { flex: 1; min-width: 0; }
.name { font-size: 14px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.meta { font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

write(
  'siaf-page-header',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-page-header', styleUrl: 'siaf-page-header.css', shadow: true })
export class SiafPageHeader {
  @Prop() heading = '';
  @Prop() subtitle?: string;
  render() {
    return (
      <Host>
        <header class="ph">
          <div class="crumbs"><slot name="breadcrumb" /></div>
          <div class="row">
            <div class="titles">
              <h1>{this.heading}</h1>
              {this.subtitle ? <p>{this.subtitle}</p> : null}
            </div>
            <div class="actions"><slot name="actions" /></div>
          </div>
          <div class="extra"><slot /></div>
        </header>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.ph { display: flex; flex-direction: column; gap: 12px; padding-bottom: 16px; }
.row { display: flex; gap: 16px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; }
h1 { margin: 0; font-size: 22px; font-weight: 700; }
p { margin: 4px 0 0; color: var(--sys-color-text-neutral-low, #6f6f71); font-size: 14px; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
.crumbs:empty, .extra:empty { display: none; }
`,
);

write(
  'siaf-page-shell',
  `import { Component, Host, h } from '@stencil/core';

@Component({ tag: 'siaf-page-shell', styleUrl: 'siaf-page-shell.css', shadow: true })
export class SiafPageShell {
  render() {
    return (
      <Host>
        <div class="shell">
          <aside class="side"><slot name="sidebar" /></aside>
          <div class="main">
            <div class="top"><slot name="header" /></div>
            <main class="content"><slot /></main>
          </div>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; min-height: 100%; }
.shell { display: grid; grid-template-columns: auto 1fr; min-height: 100vh; }
.side:empty { display: none; }
.main { display: flex; flex-direction: column; min-width: 0; background: var(--sys-color-bg-surfaces-surface, #fff); }
.top { padding: 16px 24px 0; }
.content { padding: 16px 24px 24px; flex: 1; }
`,
);

write(
  'siaf-navbar',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-navbar', styleUrl: 'siaf-navbar.css', shadow: true })
export class SiafNavbar {
  @Prop() brand = 'SIAF-RP';
  render() {
    return (
      <Host>
        <header class="nav" part="nav">
          <div class="brand"><slot name="brand">{this.brand}</slot></div>
          <div class="center"><slot /></div>
          <div class="end"><slot name="actions" /></div>
        </header>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.nav {
  display: flex; align-items: center; gap: 16px; min-height: 56px; padding: 0 20px;
  background: var(--sys-color-bg-brand-primary, #014899); color: #fff;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.brand { font-weight: 700; font-size: 16px; }
.center { flex: 1; display: flex; gap: 12px; align-items: center; }
.end { display: flex; gap: 8px; align-items: center; }
`,
);

write(
  'siaf-sidebar',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-sidebar', styleUrl: 'siaf-sidebar.css', shadow: true })
export class SiafSidebar {
  @Prop({ reflect: true }) collapsed = false;
  render() {
    return (
      <Host>
        <aside class={{ side: true, collapsed: this.collapsed }} part="side">
          <slot />
        </aside>
      </Host>
    );
  }
}
`,
  `:host { display: block; height: 100%; }
.side {
  width: 260px; height: 100%; padding: 12px;
  background: var(--sys-color-bg-surfaces-surface, #fff);
  border-right: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  transition: width .2s ease;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.collapsed { width: 72px; }
`,
);

write(
  'siaf-popover',
  `import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({ tag: 'siaf-popover', styleUrl: 'siaf-popover.css', shadow: true })
export class SiafPopover {
  @Prop() heading?: string;
  @State() open = false;
  render() {
    return (
      <Host>
        <div class="wrap">
          <div class="trigger" onClick={() => (this.open = !this.open)}><slot name="trigger" /></div>
          {this.open ? (
            <div class="pop" role="dialog">
              {this.heading ? <div class="h">{this.heading}</div> : null}
              <div class="b"><slot /></div>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: inline-block; }
.wrap { position: relative; display: inline-block; }
.pop {
  position: absolute; top: calc(100% + 8px); left: 0; z-index: 40; min-width: 220px;
  background: #fff; border-radius: 8px; padding: 12px;
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  box-shadow: var(--sys-shadow-md, 0 8px 24px rgba(16,24,40,.08));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.h { font-weight: 600; font-size: 13px; margin-bottom: 8px; }
`,
);

write(
  'siaf-date-time-picker',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-date-time-picker', styleUrl: 'siaf-date-time-picker.css', shadow: true })
export class SiafDateTimePicker {
  @Prop() label?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() mode: 'date' | 'time' | 'datetime-local' = 'date';
  @Prop({ reflect: true }) disabled = false;
  @Event() siafChange!: EventEmitter<string>;

  private onChange = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.siafChange.emit(this.value);
  };

  render() {
    return (
      <Host>
        <siaf-input label={this.label} type={this.mode} value={this.value} disabled={this.disabled} onSiafChange={(e) => { this.value = e.detail; this.siafChange.emit(e.detail); }}>
        </siaf-input>
        {/* native fallback sync */}
        <input class="native" type={this.mode} value={this.value} disabled={this.disabled} onChange={this.onChange} hidden />
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.native { display: none; }
`,
);

write(
  'siaf-table-controls',
  `import { Component, Host, h } from '@stencil/core';

@Component({ tag: 'siaf-table-controls', styleUrl: 'siaf-table-controls.css', shadow: true })
export class SiafTableControls {
  render() {
    return (
      <Host>
        <div class="controls">
          <div class="left"><slot name="search" /><slot name="filters" /></div>
          <div class="right"><slot name="actions" /><slot /></div>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.controls { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; }
.left, .right { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
`,
);

write(
  'siaf-action-tracker',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-action-tracker', styleUrl: 'siaf-action-tracker.css', shadow: true })
export class SiafActionTracker {
  @Prop() status = '';
  render() {
    return (
      <Host>
        <div class="tracker">
          <div class="status"><slot name="status">{this.status}</slot></div>
          <div class="actions"><slot /></div>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.tracker {
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;
  padding: 12px 16px; border-radius: 8px;
  background: var(--sys-color-bg-surfaces-surface, #fff);
  border: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.actions { display: flex; gap: 8px; flex-wrap: wrap; }
`,
);

write(
  'siaf-timeline',
  `import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafTimelineItem { id: string; title: string; time?: string; description?: string }

@Component({ tag: 'siaf-timeline', styleUrl: 'siaf-timeline.css', shadow: true })
export class SiafTimeline {
  @Prop() items: SiafTimelineItem[] | string = [];
  private parsed(): SiafTimelineItem[] {
    if (typeof this.items === 'string') { try { return JSON.parse(this.items); } catch { return []; } }
    return this.items || [];
  }
  render() {
    return (
      <Host>
        <ol>
          {this.parsed().map((item) => (
            <li>
              <span class="dot" />
              <div class="content">
                <div class="row">
                  <strong>{item.title}</strong>
                  {item.time ? <time>{item.time}</time> : null}
                </div>
                {item.description ? <p>{item.description}</p> : null}
              </div>
            </li>
          ))}
          <slot />
        </ol>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
ol { list-style: none; margin: 0; padding: 0; }
li { display: grid; grid-template-columns: 16px 1fr; gap: 12px; padding-bottom: 16px; position: relative; }
li:not(:last-child)::before {
  content: ''; position: absolute; left: 7px; top: 16px; bottom: 0; width: 2px;
  background: var(--sys-color-divider-default, rgba(32,32,32,.12));
}
.dot {
  width: 12px; height: 12px; margin-top: 4px; border-radius: 50%;
  background: var(--sys-color-bg-brand-primary, #014899);
}
.row { display: flex; justify-content: space-between; gap: 8px; font-size: 14px; }
time { color: var(--sys-color-text-neutral-low, #6f6f71); font-size: 12px; }
p { margin: 4px 0 0; font-size: 13px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

write(
  'siaf-icon-dropdown-menu',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-icon-dropdown-menu', styleUrl: 'siaf-icon-dropdown-menu.css', shadow: true })
export class SiafIconDropdownMenu {
  @Prop() items: any = [];
  @Prop() ariaLabel = 'Más acciones';
  @Event() siafSelect!: EventEmitter<string>;
  render() {
    return (
      <Host>
        <siaf-menu items={this.items} onSiafSelect={(e) => this.siafSelect.emit(e.detail)}>
          <siaf-button slot="trigger" size="sm" variant="text" aria-label={this.ariaLabel}>⋮</siaf-button>
        </siaf-menu>
      </Host>
    );
  }
}
`,
  `:host { display: inline-block; }
`,
);

write(
  'siaf-cascading-menu',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-cascading-menu', styleUrl: 'siaf-cascading-menu.css', shadow: true })
export class SiafCascadingMenu {
  @Prop() items: any = [];
  render() {
    return (
      <Host>
        <siaf-menu items={this.items}>
          <slot name="trigger" slot="trigger" />
        </siaf-menu>
      </Host>
    );
  }
}
`,
  `:host { display: inline-block; }
`,
);

write(
  'siaf-collapsible-card',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-collapsible-card', styleUrl: 'siaf-collapsible-card.css', shadow: true })
export class SiafCollapsibleCard {
  @Prop() heading = '';
  @Prop({ mutable: true, reflect: true }) open = true;
  render() {
    return (
      <Host>
        <siaf-accordion heading={this.heading} open={this.open}>
          <slot />
        </siaf-accordion>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
`,
);

write(
  'siaf-tree-view',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafTreeNode { id: string; label: string; children?: SiafTreeNode[] }

@Component({ tag: 'siaf-tree-view', styleUrl: 'siaf-tree-view.css', shadow: true })
export class SiafTreeView {
  @Prop() nodes: SiafTreeNode[] | string = [];
  @Event() siafSelect!: EventEmitter<string>;

  private parsed(): SiafTreeNode[] {
    if (typeof this.nodes === 'string') { try { return JSON.parse(this.nodes); } catch { return []; } }
    return this.nodes || [];
  }

  private renderNode(node: SiafTreeNode) {
    const hasChildren = !!(node.children && node.children.length);
    return (
      <li>
        {hasChildren ? (
          <details open>
            <summary onClick={(e) => { e.preventDefault(); this.siafSelect.emit(node.id); }}>{node.label}</summary>
            <ul>{node.children!.map((c) => this.renderNode(c))}</ul>
          </details>
        ) : (
          <button type="button" class="leaf" onClick={() => this.siafSelect.emit(node.id)}>{node.label}</button>
        )}
      </li>
    );
  }

  render() {
    return (
      <Host>
        <ul class="tree">{this.parsed().map((n) => this.renderNode(n))}</ul>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); font-size: 14px; }
.tree, .tree ul { list-style: none; margin: 0; padding-left: 12px; }
summary { cursor: pointer; padding: 4px 0; }
.leaf { border: 0; background: transparent; cursor: pointer; font: inherit; padding: 4px 0; text-align: left; width: 100%; }
.leaf:hover, summary:hover { color: var(--sys-color-text-brand-primary, #014899); }
`,
);

console.log('Part 3 written');
