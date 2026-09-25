/**
 * Overwrites core catalog components with real token-based implementations.
 * Run after generate-catalog.mjs
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

const sharedHost = `
:host {
  display: inline-block;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  color: var(--sys-color-text-neutral-high, #202020);
  box-sizing: border-box;
}
*, *::before, *::after { box-sizing: border-box; }
`;

// ——— siaf-icon ———
write(
  'siaf-icon',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-icon', styleUrl: 'siaf-icon.css', shadow: true })
export class SiafIcon {
  @Prop({ reflect: true }) name?: string;
  @Prop({ reflect: true }) size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() ariaLabel?: string;

  render() {
    return (
      <Host
        role={this.ariaLabel ? 'img' : 'presentation'}
        aria-label={this.ariaLabel}
        aria-hidden={this.ariaLabel ? null : 'true'}
        class={\`size-\${this.size}\`}
      >
        <span class="glyph" part="glyph">
          <slot>{this.name}</slot>
        </span>
      </Host>
    );
  }
}
`,
  `${sharedHost}
:host { line-height: 0; vertical-align: middle; }
.glyph { display: inline-flex; align-items: center; justify-content: center; }
:host(.size-xs) .glyph { width: var(--figma-device-sys-sizes-icon-x-small, 12px); height: var(--figma-device-sys-sizes-icon-x-small, 12px); font-size: 12px; }
:host(.size-sm) .glyph { width: var(--figma-device-sys-sizes-icon-small, 16px); height: var(--figma-device-sys-sizes-icon-small, 16px); font-size: 16px; }
:host(.size-md) .glyph { width: var(--figma-device-sys-sizes-icon-medium, 20px); height: var(--figma-device-sys-sizes-icon-medium, 20px); font-size: 20px; }
:host(.size-lg) .glyph { width: var(--figma-device-sys-sizes-icon-large, 24px); height: var(--figma-device-sys-sizes-icon-large, 24px); font-size: 24px; }
:host(.size-xl) .glyph { width: var(--figma-device-sys-sizes-icon-x-large, 32px); height: var(--figma-device-sys-sizes-icon-x-large, 32px); font-size: 32px; }
::slotted(svg) { width: 100%; height: 100%; fill: currentColor; }
`,
);

// ——— siaf-divider ———
write(
  'siaf-divider',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-divider', styleUrl: 'siaf-divider.css', shadow: true })
export class SiafDivider {
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  render() {
    return <Host role="separator" aria-orientation={this.orientation} />;
  }
}
`,
  `:host {
  display: block;
  background: var(--sys-color-divider-default, rgba(32, 32, 32, 0.12));
  border: 0;
}
:host([orientation='horizontal']) { width: 100%; height: var(--sys-border-linear-thin, 1px); margin: var(--sys-gap-base-sm, 12px) 0; }
:host([orientation='vertical']) { width: var(--sys-border-linear-thin, 1px); height: 1.5em; margin: 0 var(--sys-gap-base-sm, 12px); display: inline-block; vertical-align: middle; }
`,
);

// ——— tags family ———
const tagCss = `
:host { display: inline-flex; vertical-align: middle; }
.tag {
  display: inline-flex; align-items: center; gap: 6px;
  max-width: 100%;
  padding: 2px 10px;
  border-radius: var(--sys-radius-full, 40px);
  border: 1px solid transparent;
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  font-size: var(--sys-typography-size-caption-1, 12px);
  font-weight: var(--sys-typography-weight-medium, 500);
  line-height: 1.4;
  white-space: nowrap;
}
.tone-info.soft { background: var(--sys-color-bg-feedback-light-info, #b0defd); color: var(--sys-color-text-feedback-info, #005188); }
.tone-success.soft { background: var(--sys-color-bg-feedback-light-success, #c2e8e5); color: var(--sys-color-text-feedback-success, #20635e); }
.tone-warning.soft { background: var(--sys-color-bg-feedback-light-warning, #fceac6); color: var(--sys-color-text-feedback-warning, #876727); }
.tone-danger.soft { background: var(--sys-color-bg-feedback-light-danger, #f9bfc1); color: var(--sys-color-text-feedback-danger, #821c1e); }
.tone-neutral.soft { background: var(--sys-color-bg-surfaces-surface-high, rgba(32,32,32,.12)); color: var(--sys-color-text-neutral-medium, #29292a); }
.tone-info.filled { background: var(--sys-color-bg-status-solid-info, #0068b0); color: #fff; }
.tone-success.filled { background: var(--sys-color-bg-status-solid-success, #298079); color: #fff; }
.tone-warning.filled { background: var(--sys-color-bg-status-solid-warning, #ae8532); color: #fff; }
.tone-danger.filled { background: var(--sys-color-bg-status-solid-danger, #a82427); color: #fff; }
.tone-neutral.filled { background: var(--sys-color-bg-status-solid-default, #353537); color: #fff; }
.outlined { background: transparent; }
.tone-info.outlined { color: var(--sys-color-text-feedback-info, #005188); border-color: currentColor; }
.tone-success.outlined { color: var(--sys-color-text-feedback-success, #20635e); border-color: currentColor; }
.tone-warning.outlined { color: var(--sys-color-text-feedback-warning, #876727); border-color: currentColor; }
.tone-danger.outlined { color: var(--sys-color-text-feedback-danger, #821c1e); border-color: currentColor; }
.tone-neutral.outlined { color: var(--sys-color-text-neutral-medium, #29292a); border-color: var(--sys-color-border-states-enabled, rgba(32,32,32,.4)); }
`;

function tagTsx(tag, Class) {
  return `import { Component, Host, Prop, h } from '@stencil/core';
import type { SiafTone, SiafTagVariant } from '../../utils/types';

@Component({ tag: '${tag}', styleUrl: '${tag}.css', shadow: true })
export class ${Class} {
  @Prop({ reflect: true }) tone: SiafTone = 'neutral';
  @Prop({ reflect: true }) variant: SiafTagVariant = 'soft';
  @Prop() label?: string;
  render() {
    return (
      <Host>
        <span class={\`tag tone-\${this.tone} \${this.variant}\`} part="tag">
          <slot>{this.label}</slot>
        </span>
      </Host>
    );
  }
}
`;
}

write('siaf-tag', tagTsx('siaf-tag', 'SiafTag'), tagCss);
write('siaf-status-tag', tagTsx('siaf-status-tag', 'SiafStatusTag'), tagCss);
write('siaf-flow-status-tag', tagTsx('siaf-flow-status-tag', 'SiafFlowStatusTag'), tagCss);
write('siaf-record-status-tag', tagTsx('siaf-record-status-tag', 'SiafRecordStatusTag'), tagCss);

write(
  'siaf-badge',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-badge', styleUrl: 'siaf-badge.css', shadow: true })
export class SiafBadge {
  @Prop() value?: string | number;
  @Prop({ reflect: true }) dot = false;
  @Prop({ reflect: true }) tone: 'primary' | 'danger' | 'neutral' = 'primary';
  render() {
    return (
      <Host class={{ dot: this.dot, [\`tone-\${this.tone}\`]: true }}>
        {!this.dot ? <span class="value"><slot>{this.value}</slot></span> : null}
      </Host>
    );
  }
}
`,
  `:host {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: var(--sys-radius-full, 40px);
  font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif);
  font-size: 10px; font-weight: 700; line-height: 1; color: #fff;
  background: var(--sys-color-bg-brand-primary, #014899);
}
:host(.tone-danger) { background: var(--sys-color-bg-feedback-danger, #d13255); }
:host(.tone-neutral) { background: var(--sys-color-bg-brand-secondary, #4b4b4d); }
:host(.dot) { min-width: 8px; width: 8px; height: 8px; padding: 0; }
`,
);

// ——— form controls ———
write(
  'siaf-checkbox',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-checkbox', styleUrl: 'siaf-checkbox.css', shadow: true })
export class SiafCheckbox {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) indeterminate = false;
  @Prop() label?: string;
  @Prop() name?: string;
  @Prop() value?: string;
  @Event() siafChange!: EventEmitter<boolean>;

  private onChange = (e: Event) => {
    const el = e.target as HTMLInputElement;
    this.checked = el.checked;
    this.siafChange.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <label class={{ control: true, disabled: this.disabled }}>
          <input
            type="checkbox"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            indeterminate={this.indeterminate}
            onChange={this.onChange}
          />
          <span class="box" part="box" />
          <span class="label"><slot>{this.label}</slot></span>
        </label>
      </Host>
    );
  }
}
`,
  `:host { display: inline-block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.control { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: var(--sys-typography-size-body-2, 14px); }
.control.disabled { cursor: not-allowed; color: var(--sys-color-text-neutral-disabled, #868688); }
input { position: absolute; opacity: 0; width: 0; height: 0; }
.box {
  width: 18px; height: 18px; border-radius: 4px;
  border: 2px solid var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  background: var(--sys-color-bg-surfaces-surface, #fff);
  display: inline-flex; align-items: center; justify-content: center;
}
input:checked + .box {
  background: var(--sys-color-bg-brand-primary, #014899);
  border-color: var(--sys-color-bg-brand-primary, #014899);
}
input:checked + .box::after {
  content: ''; width: 4px; height: 8px;
  border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); margin-top: -2px;
}
input:focus-visible + .box { outline: 2px solid var(--sys-color-border-states-focus, rgba(1,72,153,.8)); outline-offset: 2px; }
`,
);

write(
  'siaf-switch',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-switch', styleUrl: 'siaf-switch.css', shadow: true })
export class SiafSwitch {
  @Prop({ mutable: true, reflect: true }) checked = false;
  @Prop({ reflect: true }) disabled = false;
  @Prop() label?: string;
  @Event() siafChange!: EventEmitter<boolean>;

  private toggle = () => {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.siafChange.emit(this.checked);
  };

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{ track: true, on: this.checked }}
          role="switch"
          aria-checked={this.checked ? 'true' : 'false'}
          disabled={this.disabled}
          onClick={this.toggle}
        >
          <span class="thumb" />
        </button>
        {this.label || true ? <span class="label" onClick={this.toggle}><slot>{this.label}</slot></span> : null}
      </Host>
    );
  }
}
`,
  `:host { display: inline-flex; align-items: center; gap: 8px; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); font-size: 14px; }
.track {
  width: 40px; height: 24px; border: 0; border-radius: 999px; padding: 2px; cursor: pointer;
  background: var(--sys-color-bg-surfaces-surface-high, rgba(32,32,32,.12));
  transition: background .15s ease;
}
.track.on { background: var(--sys-color-bg-brand-primary, #014899); }
.thumb {
  display: block; width: 20px; height: 20px; border-radius: 50%;
  background: var(--sys-color-bg-switch-thumb, #fff);
  box-shadow: var(--sys-shadow-sm, 0 1px 2px rgba(16,24,40,.06));
  transition: transform .15s ease;
}
.track.on .thumb { transform: translateX(16px); }
.track:disabled { opacity: .5; cursor: not-allowed; }
.track:focus-visible { outline: 2px solid var(--sys-color-border-states-focus, rgba(1,72,153,.8)); outline-offset: 2px; }
.label { cursor: pointer; }
`,
);

write(
  'siaf-radio-group',
  `import { Component, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

export interface SiafRadioOption { label: string; value: string; disabled?: boolean }

@Component({ tag: 'siaf-radio-group', styleUrl: 'siaf-radio-group.css', shadow: true })
export class SiafRadioGroup {
  @Element() el!: HTMLElement;
  @Prop() name = 'siaf-radio';
  @Prop({ mutable: true }) value?: string;
  @Prop() label?: string;
  @Prop() options: SiafRadioOption[] | string = [];
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';
  @Event() siafChange!: EventEmitter<string>;

  private parsed(): SiafRadioOption[] {
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return this.options || [];
  }

  private onSelect = (value: string) => {
    if (this.disabled) return;
    this.value = value;
    this.siafChange.emit(value);
  };

  @Listen('keydown')
  onKeyDown(ev: KeyboardEvent) {
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;
    const opts = this.parsed().filter((o) => !o.disabled);
    const idx = opts.findIndex((o) => o.value === this.value);
    const next = ev.key === 'ArrowDown' ? opts[Math.min(idx + 1, opts.length - 1)] : opts[Math.max(idx - 1, 0)];
    if (next) { this.onSelect(next.value); ev.preventDefault(); }
  }

  render() {
    const opts = this.parsed();
    return (
      <Host role="radiogroup" aria-label={this.label} class={this.orientation}>
        {this.label ? <div class="legend">{this.label}</div> : null}
        <div class="list">
          {opts.map((opt) => (
            <label class={{ item: true, disabled: this.disabled || !!opt.disabled }}>
              <input
                type="radio"
                name={this.name}
                value={opt.value}
                checked={this.value === opt.value}
                disabled={this.disabled || opt.disabled}
                onChange={() => this.onSelect(opt.value)}
              />
              <span class="dot" />
              <span>{opt.label}</span>
            </label>
          ))}
          <slot />
        </div>
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); font-size: 14px; }
.legend { font-weight: 600; margin-bottom: 8px; }
.list { display: flex; flex-direction: column; gap: 8px; }
:host(.horizontal) .list { flex-direction: row; flex-wrap: wrap; gap: 16px; }
.item { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.item.disabled { cursor: not-allowed; color: var(--sys-color-text-neutral-disabled, #868688); }
input { position: absolute; opacity: 0; width: 0; height: 0; }
.dot {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  display: inline-flex; align-items: center; justify-content: center;
}
input:checked + .dot {
  border-color: var(--sys-color-bg-brand-primary, #014899);
}
input:checked + .dot::after {
  content: ''; width: 8px; height: 8px; border-radius: 50%;
  background: var(--sys-color-bg-brand-primary, #014899);
}
input:focus-visible + .dot { outline: 2px solid var(--sys-color-border-states-focus, rgba(1,72,153,.8)); outline-offset: 2px; }
`,
);

write(
  'siaf-input',
  `import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-input', styleUrl: 'siaf-input.css', shadow: true })
export class SiafInput {
  @Prop() label?: string;
  @Prop() placeholder?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() type: string = 'text';
  @Prop() name?: string;
  @Prop() helperText?: string;
  @Prop() errorText?: string;
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true }) readonly = false;
  @Prop({ reflect: true }) required = false;
  @Event() siafInput!: EventEmitter<string>;
  @Event() siafChange!: EventEmitter<string>;

  private onInput = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.siafInput.emit(this.value);
  };
  private onChange = (e: Event) => {
    this.value = (e.target as HTMLInputElement).value;
    this.siafChange.emit(this.value);
  };

  render() {
    const invalid = !!this.errorText;
    return (
      <Host class={{ invalid, disabled: this.disabled }}>
        {this.label ? <label class="label">{this.label}{this.required ? ' *' : ''}</label> : null}
        <div class="field" part="field">
          <slot name="leading" />
          <input
            part="input"
            type={this.type}
            name={this.name}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            aria-invalid={invalid ? 'true' : 'false'}
            aria-describedby={invalid ? 'err' : this.helperText ? 'help' : null}
            onInput={this.onInput}
            onChange={this.onChange}
          />
          <slot name="trailing" />
        </div>
        {this.errorText ? <div class="msg error" id="err">{this.errorText}</div> : this.helperText ? <div class="msg" id="help">{this.helperText}</div> : null}
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.label {
  display: block; margin-bottom: 6px;
  font-size: var(--sys-typography-size-caption-1, 12px);
  color: var(--sys-color-text-neutral-low, #6f6f71);
}
.field {
  display: flex; align-items: center; gap: 8px;
  min-height: 40px; padding: 0 12px;
  border-radius: var(--sys-radius-md, 8px);
  border: 1px solid var(--sys-color-border-states-enabled, rgba(32,32,32,.4));
  background: var(--sys-color-bg-surfaces-surface, #fff);
}
.field:focus-within {
  border-color: var(--sys-color-border-states-focus, rgba(1,72,153,.8));
  box-shadow: 0 0 0 1px var(--sys-color-border-states-focus, rgba(1,72,153,.8));
}
:host(.invalid) .field {
  border-color: var(--sys-color-border-feedback-danger, #821c1e);
}
input {
  flex: 1; min-width: 0; border: 0; outline: none; background: transparent;
  font: inherit; font-size: var(--sys-typography-size-body-2, 14px);
  color: var(--sys-color-text-neutral-high, #202020);
  padding: 10px 0;
}
input::placeholder { color: var(--sys-color-text-neutral-disabled, #868688); }
:host(.disabled) .field { background: var(--sys-color-bg-surfaces-disabled, #ededed); }
.msg { margin-top: 4px; font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); }
.msg.error { color: var(--sys-color-text-feedback-danger, #821c1e); }
`,
);

write(
  'siaf-readonly',
  `import { Component, Host, Prop, h } from '@stencil/core';

@Component({ tag: 'siaf-readonly', styleUrl: 'siaf-readonly.css', shadow: true })
export class SiafReadonly {
  @Prop() label?: string;
  @Prop() value?: string;
  @Prop() hint?: string;
  render() {
    return (
      <Host>
        {this.label ? <div class="label">{this.label}</div> : null}
        <div class="value" part="value"><slot>{this.value}</slot></div>
        {this.hint ? <div class="hint">{this.hint}</div> : null}
      </Host>
    );
  }
}
`,
  `:host { display: block; font-family: var(--sys-typography-font-family-base, Inter, system-ui, sans-serif); }
.label { font-size: 12px; color: var(--sys-color-text-neutral-low, #6f6f71); margin-bottom: 4px; }
.value {
  min-height: 40px; display: flex; align-items: center;
  padding: 8px 12px; border-radius: var(--sys-radius-md, 8px);
  background: var(--sys-color-bg-surfaces-surface-low, rgba(32,32,32,.04));
  border: 1px solid var(--sys-color-border-states-disabled, rgba(32,32,32,.12));
  font-size: 14px; color: var(--sys-color-text-neutral-medium, #29292a);
}
.hint { margin-top: 4px; font-size: 11px; color: var(--sys-color-text-neutral-low, #6f6f71); }
`,
);

console.log('Core implementations written');
