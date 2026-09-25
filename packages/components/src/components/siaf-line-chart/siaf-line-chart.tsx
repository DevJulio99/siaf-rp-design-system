import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafLineDatum {
  label: string;
  value: number;
}

/**
 * Graphics Kit Line — mismo chrome que Bar (pad 24 · gap 16 · r16) + path brand primary.
 */
@Component({ tag: 'siaf-line-chart', styleUrl: 'siaf-line-chart.css', shadow: true })
export class SiafLineChart {
  @Prop() heading?: string;
  @Prop() data: SiafLineDatum[] | string = [];
  @Prop() legendLabel = 'Serie';

  private parsed(): SiafLineDatum[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  private ticks(max: number): number[] {
    const niceMax = Math.max(1, Math.ceil(max / 100) * 100 || 100);
    const step = niceMax / 5;
    const out: number[] = [];
    for (let i = 5; i >= 0; i--) out.push(Math.round(i * step));
    return out;
  }

  private path(series: SiafLineDatum[], yMax: number): string {
    if (!series.length) return '';
    const w = 518;
    const h = 203;
    const step = series.length > 1 ? w / (series.length - 1) : 0;
    return series
      .map((d, i) => {
        const x = i * step;
        const y = h - (d.value / yMax) * h;
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  }

  render() {
    const series = this.parsed();
    const dataMax = Math.max(1, ...series.map(d => d.value));
    const yTicks = this.ticks(dataMax);
    const yMax = yTicks[0] || dataMax;
    const stroke = 'var(--sys-color-bg-brand-primary, #014899)';

    return (
      <Host>
        <section class="shell" part="shell">
          <header class="header" part="header">
            {this.heading ? <h2 class="title">{this.heading}</h2> : null}
            <div class="legend">
              <span class="leg-item">
                <span class="swatch" style={{ background: stroke }} />
                {this.legendLabel}
              </span>
              <slot name="header" />
            </div>
          </header>
          <div class="body" part="body">
            {series.length ? (
              <div class="graph">
                <div class="guide" aria-hidden="true">
                  {yTicks.map((t, i) => (
                    <span class="level" key={i}>
                      {t}
                    </span>
                  ))}
                </div>
                <div class="plot">
                  <div class="grid" aria-hidden="true">
                    {yTicks.map((_, i) => (
                      <div class="grid-line" key={i} />
                    ))}
                  </div>
                  <svg class="chart" viewBox="0 0 518 203" preserveAspectRatio="none" aria-hidden="true">
                    <path d={this.path(series, yMax)} fill="none" stroke={stroke} stroke-width="2" />
                  </svg>
                  <div class="x-axis">
                    {series.map((d, i) => (
                      <span class="axis" key={i}>
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <slot />
            )}
          </div>
          <footer class="footer" part="footer">
            <slot name="footer" />
          </footer>
        </section>
      </Host>
    );
  }
}
