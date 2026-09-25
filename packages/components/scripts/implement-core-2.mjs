/**
 * Part 2 — nav, feedback, overlay, data, layout implementations
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
  'siaf-loader',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-loader', styleUrl: 'siaf-loader.css', shadow: true })
export class SiafLoader {
  @Prop({ reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @Prop() label = 'Cargando';
  render() {
    return (
      <Host class={\`size-\${this.size}\`} role="status" aria-live="polite" aria-label={this.label}>
        <span class="spinner" part="spinner" />
      </Host>
    );
  }
}
`,
  `:host { display: inline-flex; }
.spinner {
  display: block; border-radius: 50%;
  border: 2px solid var(--sys-color-bg-surfaces-surface-high, rgba(32,32,32,.12));
  border-top-color: var(--sys-color-bg-brand-primary, #014899);
  animation: spin .7s linear infinite;
}
:host(.size-sm) .spinner { width: 16px; height: 16px; }
:host(.size-md) .spinner { width: 24px; height: 24px; }
:host(.size-lg) .spinner { width: 40px; height: 40px; border-width: 3px; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spinner { animation: none; border-top-color: var(--sys-color-bg-brand-primary, #014899); } }
`,
);

write(
  'siaf-loader-overlay',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-loader-overlay', styleUrl: 'siaf-loader-overlay.css', shadow: true })
export class SiafLoaderOverlay {
  @Prop({ reflect: true }) open = false;
  @Prop() label = 'Cargando';
  render() {
    if (!this.open) return <Host aria-hidden="true" />;
    return (
      <Host>
        <div class="scrim" part="scrim">
          <siaf-loader size="lg" label={this.label} />
          <p class="text">{this.label}</p>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: contents; }
.scrim {
  position: fixed; inset: 0; z-index: 1000;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  background: rgb(255 255 255 / .72);
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
.text { margin: 0; color: var(--sys-color-text-neutral-medium, #29292a); font-size: 14px; }
`,
);

write(
  'siaf-loading-progress',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-loading-progress', styleUrl: 'siaf-loading-progress.css', shadow: true })
export class SiafLoadingProgress {
  /** 0–100; omit for indeterminate */
  @Prop() value?: number;
  @Prop() label?: string;
  render() {
    const determinate = typeof this.value === 'number';
    return (
      <Host>
        {this.label ? <div class="label">{this.label}</div> : null}
        <div
          class={{ bar: true, indeterminate: !determinate }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={determinate ? this.value : null}
        >
          <div class="fill" style={determinate ? { width: \`\${Math.min(100, Math.max(0, this.value!))}%\` } : null} />
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.label { font-size: 12px; margin-bottom: 6px; color: var(--sys-color-text-neutral-low, #6f6f71); }
.bar {
  height: 4px; width: 100%; border-radius: 999px; overflow: hidden;
  background: var(--sys-color-bg-surfaces-surface-high, rgba(32,32,32,.12));
}
.fill {
  height: 100%; background: var(--sys-color-bg-brand-primary, #014899);
  transition: width .2s ease;
}
.indeterminate .fill {
  width: 40%; animation: slide 1.2s ease-in-out infinite;
}
@keyframes slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
`,
);

write(
  'siaf-progress-circular',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-progress-circular', styleUrl: 'siaf-progress-circular.css', shadow: true })
export class SiafProgressCircular {
  @Prop() value = 0;
  @Prop() size = 48;
  render() {
    const r = 18;
    const c = 2 * Math.PI * r;
    const offset = c - (Math.min(100, Math.max(0, this.value)) / 100) * c;
    return (
      <Host role="progressbar" aria-valuenow={this.value} aria-valuemin={0} aria-valuemax={100}>
        <svg width={this.size} height={this.size} viewBox="0 0 44 44">
          <circle class="track" cx="22" cy="22" r={r} />
          <circle class="prog" cx="22" cy="22" r={r} stroke-dasharray={c} stroke-dashoffset={offset} />
        </svg>
        <span class="pct">{Math.round(this.value)}%</span>
      </Host>
    );
  }
}
`,
  `:host { display: inline-grid; place-items: center; position: relative; }
svg { transform: rotate(-90deg); }
circle { fill: none; stroke-width: 4; }
.track { stroke: var(--sys-color-bg-surfaces-surface-high, rgba(32,32,32,.12)); }
.prog { stroke: var(--sys-color-bg-brand-primary, #014899); stroke-linecap: round; transition: stroke-dashoffset .2s ease; }
.pct {
  position: absolute; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  font-size: 11px; font-weight: 600;
}
`,
);

write(
  'siaf-snackbar',
  `import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { SiafTone } from '../../utils/types';

@Component({ tag: 'siaf-snackbar', styleUrl: 'siaf-snackbar.css', shadow: true })
export class SiafSnackbar {
  @Prop({ reflect: true, mutable: true }) open = false;
  @Prop({ reflect: true }) tone: SiafTone = 'neutral';
  @Prop() message = '';
  @Prop() duration = 4000;
  @Event() siafClose!: EventEmitter<void>;
  private timer?: number;

  @Watch('open')
  onOpen(open: boolean) {
    window.clearTimeout(this.timer);
    if (open && this.duration > 0) {
      this.timer = window.setTimeout(() => this.close(), this.duration);
    }
  }

  private close = () => {
    this.open = false;
    this.siafClose.emit();
  };

  render() {
    return (
      <Host class={{ open: this.open }} role="status" aria-live="polite">
        <div class={\`toast tone-\${this.tone}\`} part="toast">
          <span class="msg"><slot>{this.message}</slot></span>
          <button type="button" class="close" aria-label="Cerrar" onClick={this.close}>×</button>
        </div>
      </Host>
    );
  }
}
`,
  `:host {
  position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%) translateY(120%);
  z-index: 1100; opacity: 0; pointer-events: none;
  transition: transform .2s ease, opacity .2s ease;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
}
:host(.open) { transform: translateX(-50%) translateY(0); opacity: 1; pointer-events: auto; }
.toast {
  display: flex; align-items: center; gap: 12px; min-width: 280px; max-width: 480px;
  padding: 12px 16px; border-radius: var(--sys-radius-md, 8px);
  background: var(--sys-color-bg-feedback-dark-default, #353537); color: #fff;
  box-shadow: var(--sys-shadow-elevation-8, 0 8px 10px rgba(0,0,0,.14));
  font-size: 14px;
}
.tone-success { background: var(--sys-color-bg-feedback-dark-success, #298079); }
.tone-warning { background: var(--sys-color-bg-feedback-dark-warning, #ae8532); }
.tone-danger { background: var(--sys-color-bg-feedback-dark-danger, #a82427); }
.tone-info { background: var(--sys-color-bg-feedback-dark-info, #0068b0); }
.close {
  margin-left: auto; border: 0; background: transparent; color: inherit;
  font-size: 20px; line-height: 1; cursor: pointer; padding: 0 4px;
}
`,
);

write(
  'siaf-empty-state',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-empty-state', styleUrl: 'siaf-empty-state.css', shadow: true })
export class SiafEmptyState {
  @Prop() heading = 'Sin datos';
  @Prop() description?: string;
  render() {
    return (
      <Host>
        <div class="wrap" part="wrap">
          <div class="icon"><slot name="icon" /></div>
          <h3 class="title">{this.heading}</h3>
          {this.description ? <p class="desc">{this.description}</p> : <p class="desc"><slot /></p>}
          <div class="actions"><slot name="actions" /></div>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
.wrap {
  text-align: center; padding: 40px 24px;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  color: var(--sys-color-text-neutral-medium, #29292a);
}
.icon { margin-bottom: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); }
.title { margin: 0 0 8px; font-size: 18px; font-weight: 600; }
.desc { margin: 0 auto 16px; max-width: 420px; font-size: 14px; color: var(--sys-color-text-neutral-low, #6f6f71); }
.actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.actions:empty { display: none; }
`,
);

write(
  'siaf-tooltip',
  `import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({ tag: 'siaf-tooltip', styleUrl: 'siaf-tooltip.css', shadow: true })
export class SiafTooltip {
  @Prop() content = '';
  @Prop({ reflect: true }) placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @State() open = false;
  render() {
    return (
      <Host
        onMouseEnter={() => (this.open = true)}
        onMouseLeave={() => (this.open = false)}
        onFocusin={() => (this.open = true)}
        onFocusout={() => (this.open = false)}
      >
        <span class="anchor"><slot /></span>
        {this.open ? <span class={\`tip place-\${this.placement}\`} role="tooltip">{this.content}<slot name="content" /></span> : null}
      </Host>
    );
  }
}
`,
  `:host { position: relative; display: inline-flex; }
.tip {
  position: absolute; z-index: 20; padding: 6px 10px; border-radius: 4px;
  background: #202020; color: #fff; font-size: 12px; white-space: nowrap;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  pointer-events: none;
}
.place-top { bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
.place-bottom { top: calc(100% + 6px); left: 50%; transform: translateX(-50%); }
.place-left { right: calc(100% + 6px); top: 50%; transform: translateY(-50%); }
.place-right { left: calc(100% + 6px); top: 50%; transform: translateY(-50%); }
`,
);

write(
  'siaf-breadcrumb',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafCrumb { label: string; href?: string }

@Component({ tag: 'siaf-breadcrumb', styleUrl: 'siaf-breadcrumb.css', shadow: true })
export class SiafBreadcrumb {
  @Prop() items: SiafCrumb[] | string = [];
  @Event() siafNavigate!: EventEmitter<SiafCrumb>;

  private parsed(): SiafCrumb[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items || [];
  }

  render() {
    const items = this.parsed();
    return (
      <Host>
        <nav aria-label="Breadcrumb">
          <ol>
            {items.map((item, i) => {
              const last = i === items.length - 1;
              return (
                <li>
                  {last || !item.href ? (
                    <span aria-current={last ? 'page' : null}>{item.label}</span>
                  ) : (
                    <a href={item.href} onClick={(e) => { e.preventDefault(); this.siafNavigate.emit(item); }}>{item.label}</a>
                  )}
                  {!last ? <span class="sep" aria-hidden="true">/</span> : null}
                </li>
              );
            })}
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); font-size: 13px; }
ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
li { display: inline-flex; align-items: center; gap: 4px; color: var(--sys-color-text-neutral-low, #6f6f71); }
a { color: var(--sys-color-text-brand-primary, #014899); text-decoration: none; }
a:hover { text-decoration: underline; }
[aria-current='page'] { color: var(--sys-color-text-neutral-high, #202020); font-weight: 600; }
.sep { margin: 0 4px; color: var(--sys-color-text-neutral-disabled, #868688); }
`,
);

write(
  'siaf-tabs',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafTab { id: string; label: string; disabled?: boolean }

@Component({ tag: 'siaf-tabs', styleUrl: 'siaf-tabs.css', shadow: true })
export class SiafTabs {
  @Prop() tabs: SiafTab[] | string = [];
  @Prop({ mutable: true }) activeId?: string;
  @Event() siafTabChange!: EventEmitter<string>;

  private parsed(): SiafTab[] {
    if (typeof this.tabs === 'string') {
      try { return JSON.parse(this.tabs); } catch { return []; }
    }
    return this.tabs || [];
  }

  private select = (id: string) => {
    this.activeId = id;
    this.siafTabChange.emit(id);
  };

  render() {
    const tabs = this.parsed();
    const active = this.activeId || tabs[0]?.id;
    return (
      <Host>
        <div class="list" role="tablist">
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              class={{ tab: true, active: t.id === active }}
              aria-selected={t.id === active ? 'true' : 'false'}
              disabled={t.disabled}
              onClick={() => this.select(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div class="panel" role="tabpanel">
          <slot name={active} />
          <slot />
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.list {
  display: flex; gap: 0; border-bottom: 1px solid var(--sys-color-divider-default, rgba(32,32,32,.12));
}
.tab {
  appearance: none; border: 0; background: transparent; cursor: pointer;
  padding: 12px 16px; font: inherit; font-size: 14px; font-weight: 500;
  color: var(--sys-color-text-neutral-low, #6f6f71);
  border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.tab.active {
  color: var(--sys-color-text-brand-primary, #014899);
  border-bottom-color: var(--sys-color-bg-brand-primary, #014899);
}
.tab:disabled { opacity: .5; cursor: not-allowed; }
.tab:focus-visible { outline: 2px solid var(--sys-color-border-states-focus, rgba(1,72,153,.8)); outline-offset: 2px; }
.panel { padding-top: 16px; }
`,
);

write(
  'siaf-records-tabs',
  `import { Component, Host, h } from '@stencil/core';

/** Alias semántico de siaf-tabs para bandejas de registros */
@Component({ tag: 'siaf-records-tabs', styleUrl: 'siaf-records-tabs.css', shadow: true })
export class SiafRecordsTabs {
  render() {
    return (
      <Host>
        <siaf-tabs>
          <slot />
        </siaf-tabs>
      </Host>
    );
  }
}
`,
  `:host { display: block; }
`,
);

write(
  'siaf-steps',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafStep { id: string; label: string; description?: string }

@Component({ tag: 'siaf-steps', styleUrl: 'siaf-steps.css', shadow: true })
export class SiafSteps {
  @Prop() steps: SiafStep[] | string = [];
  @Prop({ mutable: true }) current = 0;
  @Prop({ reflect: true }) interactive = false;
  @Event() siafStepChange!: EventEmitter<number>;

  private parsed(): SiafStep[] {
    if (typeof this.steps === 'string') {
      try { return JSON.parse(this.steps); } catch { return []; }
    }
    return this.steps || [];
  }

  private go = (i: number) => {
    if (!this.interactive || i > this.current) return;
    this.current = i;
    this.siafStepChange.emit(i);
  };

  render() {
    const steps = this.parsed();
    return (
      <Host>
        <ol class="track">
          {steps.map((s, i) => {
            const state = i < this.current ? 'done' : i === this.current ? 'current' : 'todo';
            return (
              <li class={state}>
                <button type="button" class="node" disabled={!this.interactive || i > this.current} onClick={() => this.go(i)} aria-current={state === 'current' ? 'step' : null}>
                  <span class="index">{state === 'done' ? '✓' : i + 1}</span>
                  <span class="meta">
                    <span class="label">{s.label}</span>
                    {s.description ? <span class="desc">{s.description}</span> : null}
                  </span>
                </button>
                {i < steps.length - 1 ? <span class="line" aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ol>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.track { list-style: none; margin: 0; padding: 0; display: flex; gap: 0; align-items: flex-start; }
li { display: flex; align-items: center; flex: 1; min-width: 0; }
.node {
  display: flex; align-items: center; gap: 8px; border: 0; background: transparent;
  padding: 0; text-align: left; cursor: default; font: inherit; color: inherit;
}
.node:not(:disabled) { cursor: pointer; }
.index {
  flex: none; width: 28px; height: 28px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700;
  border: 2px solid var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  color: var(--sys-color-text-neutral-low, #6f6f71);
  background: #fff;
}
.current .index {
  border-color: var(--sys-color-bg-brand-primary, #014899);
  background: var(--sys-color-bg-brand-primary, #014899); color: #fff;
}
.done .index {
  border-color: var(--sys-color-bg-brand-primary, #014899);
  background: var(--sys-color-bg-brand-primary, #014899); color: #fff;
}
.label { display: block; font-size: 13px; font-weight: 600; }
.desc { display: block; font-size: 11px; color: var(--sys-color-text-neutral-low, #6f6f71); }
.line {
  flex: 1; height: 2px; margin: 0 8px;
  background: var(--sys-color-divider-default, rgba(32,32,32,.12));
}
.done + .line, .done .line { background: var(--sys-color-bg-brand-primary, #014899); }
`,
);

write(
  'siaf-pagination',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-pagination', styleUrl: 'siaf-pagination.css', shadow: true })
export class SiafPagination {
  @Prop() totalPages = 1;
  @Prop({ mutable: true }) page = 1;
  @Prop() pageSize = 10;
  @Event() siafPageChange!: EventEmitter<number>;

  private go = (p: number) => {
    const next = Math.min(this.totalPages, Math.max(1, p));
    if (next === this.page) return;
    this.page = next;
    this.siafPageChange.emit(next);
  };

  render() {
    return (
      <Host>
        <div class="bar" role="navigation" aria-label="Paginación">
          <siaf-button size="sm" variant="outlined" disabled={this.page <= 1} onSiafClick={() => this.go(this.page - 1)}>Anterior</siaf-button>
          <span class="info">Página {this.page} de {this.totalPages}</span>
          <siaf-button size="sm" variant="outlined" disabled={this.page >= this.totalPages} onSiafClick={() => this.go(this.page + 1)}>Siguiente</siaf-button>
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.bar { display: flex; align-items: center; gap: 12px; justify-content: flex-end; }
.info { font-size: 13px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

console.log('Part 2 written');
