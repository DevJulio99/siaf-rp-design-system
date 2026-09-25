import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafGroupedDatum {
  label: string;
  values: number[];
}

const SERIES_COLORS = [
  'var(--sys-color-bg-brand-primary, #014899)',
  'var(--sys-color-bg-brand-secondary, #0068b0)',
  'var(--sys-color-bg-brand-accent, #d13255)',
  'var(--sys-color-bg-status-solid-success, #298079)',
];

/**
 * Kit Graphics · Bar grouped `22743:453` — shell pad 24 · r16.
 */
@Component({
  tag: 'siaf-bar-grouped-chart',
  styleUrl: 'siaf-bar-grouped-chart.css',
  shadow: true,
})
export class SiafBarGroupedChart {
  @Prop() heading?: string;
  @Prop() data: SiafGroupedDatum[] | string = [];
  @Prop() seriesLabels: string[] | string = [];
  @Prop({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  private parsed(): SiafGroupedDatum[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  private labels(): string[] {
    if (typeof this.seriesLabels === 'string') {
      try {
        return JSON.parse(this.seriesLabels);
      } catch {
        return [];
      }
    }
    return this.seriesLabels || [];
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
    const flat = series.flatMap(d => d.values || []);
    const dataMax = Math.max(1, ...flat);
    const yTicks = this.ticks(dataMax);
    const yMax = yTicks[0] || dataMax;
    const legends = this.labels();
    const seriesCount = Math.max(...series.map(d => d.values?.length || 0), legends.length, 1);

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
                    {series.map((d, i) => (
                      <div class="bar-col" key={i}>
                        <div class="bar-track">
                          <div class="group">
                            {(d.values || []).map((value, j) => (
                              <div
                                class="bar"
                                key={j}
                                style={{
                                  height: `${(value / yMax) * 100}%`,
                                  background: SERIES_COLORS[j % SERIES_COLORS.length],
                                }}
                                title={`${d.label}: ${value}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span class="axis">{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : series.length ? (
              <div class="chart horizontal">
                {series.map((d, i) => (
                  <div class="bar-col" key={i}>
                    <span class="axis">{d.label}</span>
                    <div class="group horizontal">
                      {(d.values || []).map((value, j) => (
                        <div
                          class="bar"
                          key={j}
                          style={{
                            width: `${(value / dataMax) * 100}%`,
                            background: SERIES_COLORS[j % SERIES_COLORS.length],
                          }}
                          title={`${d.label}: ${value}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
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
