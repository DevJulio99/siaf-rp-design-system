import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafStackedSegment {
  value: number;
  color?: string;
}

export interface SiafStackedDatum {
  label: string;
  segments?: SiafStackedSegment[];
  values?: number[];
}

const SERIES_COLORS = [
  'var(--sys-color-bg-brand-primary, #014899)',
  'var(--sys-color-bg-brand-secondary, #0068b0)',
  'var(--sys-color-bg-brand-accent, #d13255)',
  'var(--sys-color-bg-status-solid-success, #298079)',
  'var(--sys-color-bg-status-solid-warning, #ae8532)',
];

/**
 * Kit Graphics · Stacked bar `22743:356` — shell pad 24 · r16.
 */
@Component({
  tag: 'siaf-stacked-bar-chart',
  styleUrl: 'siaf-stacked-bar-chart.css',
  shadow: true,
})
export class SiafStackedBarChart {
  @Prop() heading?: string;
  @Prop() data: SiafStackedDatum[] | string = [];
  @Prop() legendLabels: string[] | string = [];
  @Prop({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  private parsed(): SiafStackedDatum[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  private legends(): string[] {
    if (typeof this.legendLabels === 'string') {
      try {
        return JSON.parse(this.legendLabels);
      } catch {
        return [];
      }
    }
    return this.legendLabels || [];
  }

  private segments(d: SiafStackedDatum): SiafStackedSegment[] {
    if (d.segments?.length) return d.segments;
    if (d.values?.length) {
      return d.values.map((value, i) => ({ value, color: SERIES_COLORS[i % SERIES_COLORS.length] }));
    }
    return [];
  }

  private ticks(max: number): number[] {
    const niceMax = Math.max(1, Math.ceil(max / 100) * 100 || 100);
    const step = niceMax / 5;
    const out: number[] = [];
    for (let i = 5; i >= 0; i--) out.push(Math.round(i * step));
    return out;
  }

  render() {
    const series = this.parsed();
    const totals = series.map(d => this.segments(d).reduce((a, s) => a + s.value, 0));
    const dataMax = Math.max(1, ...totals);
    const yTicks = this.ticks(dataMax);
    const yMax = yTicks[0] || dataMax;
    const legends = this.legends();
    const seriesCount = Math.max(
      ...series.map(d => this.segments(d).length),
      legends.length,
      1,
    );

    return (
      <Host>
        <section class="shell" part="shell">
          <header class="header" part="header">
            {this.heading ? <h2 class="title">{this.heading}</h2> : null}
            <div class="legend" part="legend">
              {Array.from({ length: seriesCount }, (_, i) => (
                <span class="leg-item" key={i}>
                  <span class="swatch" style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }} />
                  {legends[i] || `Serie ${i + 1}`}
                </span>
              ))}
              <slot name="header" />
            </div>
          </header>
          <div class={{ body: true, horizontal: this.orientation === 'horizontal' }} part="body">
            {series.length && this.orientation === 'vertical' ? (
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
                  <div class="bars">
                    {series.map((d, i) => {
                      const segs = this.segments(d);
                      const total = totals[i] || 1;
                      return (
                        <div class="bar-col" key={i}>
                          <div class="bar-track">
                            <div class="bar-stack" style={{ height: `${(total / yMax) * 100}%` }}>
                              {segs.map((seg, j) => (
                                <div
                                  class="seg"
                                  key={j}
                                  style={{
                                    flex: `${seg.value} 0 0`,
                                    background: seg.color || SERIES_COLORS[j % SERIES_COLORS.length],
                                  }}
                                  title={`${d.label}: ${seg.value}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span class="axis">{d.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : series.length ? (
              <div class="chart horizontal">
                {series.map((d, i) => {
                  const segs = this.segments(d);
                  const total = totals[i] || 1;
                  return (
                    <div class="bar-col" key={i}>
                      <span class="axis">{d.label}</span>
                      <div class="bar-stack horizontal" style={{ width: `${(total / dataMax) * 100}%` }}>
                        {segs.map((seg, j) => (
                          <div
                            class="seg"
                            key={j}
                            style={{
                              flex: `${seg.value} 0 0`,
                              background: seg.color || SERIES_COLORS[j % SERIES_COLORS.length],
                            }}
                            title={`${d.label}: ${seg.value}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
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
