import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Progress/lineal Kit 2611:1503 — track h8 · gap 16 · % 14 Regular · icon 24 opcional.
 */
@Component({ tag: 'siaf-loading-progress', styleUrl: 'siaf-loading-progress.css', shadow: true })
export class SiafLoadingProgress {
  /** 0–100; omit for indeterminate */
  @Prop() value?: number;
  @Prop() label?: string;
  @Prop({ reflect: true }) showPercent = true;

  render() {
    const determinate = typeof this.value === 'number';
    const pct = determinate ? Math.min(100, Math.max(0, this.value!)) : 0;
    return (
      <Host>
        <div class="row">
          <span class="icon" aria-hidden="true">
            <siaf-icon name="hourglass_empty" size="lg"></siaf-icon>
          </span>
          <div
            class={{ bar: true, indeterminate: !determinate }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={determinate ? pct : null}
            aria-label={this.label || 'Progreso'}
          >
            <div class="fill" style={determinate ? { width: `${pct}%` } : undefined} />
          </div>
          {this.showPercent && determinate ? <span class="pct">{Math.round(pct)}%</span> : null}
        </div>
      </Host>
    );
  }
}
