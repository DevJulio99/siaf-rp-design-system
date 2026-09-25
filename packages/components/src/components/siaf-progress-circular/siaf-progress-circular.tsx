import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Progress/circular Kit 20157:95 — default 150×150 · stroke 15 (outer 75 / inner 60).
 */
@Component({ tag: 'siaf-progress-circular', styleUrl: 'siaf-progress-circular.css', shadow: true })
export class SiafProgressCircular {
  @Prop() value = 0;
  @Prop() size = 150;
  /** Kit label encima del % (Caption 1 Medium). */
  @Prop() label?: string;

  render() {
    const r = 67.5;
    const c = 2 * Math.PI * r;
    const offset = c - (Math.min(100, Math.max(0, this.value)) / 100) * c;
    const pct = Math.round(this.value);
    return (
      <Host role="progressbar" aria-valuenow={this.value} aria-valuemin={0} aria-valuemax={100}>
        <svg width={this.size} height={this.size} viewBox="0 0 150 150">
          <circle class="track" cx="75" cy="75" r={r} />
          <circle class="prog" cx="75" cy="75" r={r} stroke-dasharray={`${c}`} stroke-dashoffset={offset} />
        </svg>
        <span class="label">
          {this.label ? <span class="caption">{this.label}</span> : null}
          <span class="pct">{pct}%</span>
        </span>
      </Host>
    );
  }
}
