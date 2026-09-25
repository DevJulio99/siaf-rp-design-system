import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafBarDatum {
  label: string;
  value: number;
  color?: string;
}

/**
 * Graphics Kit Bar `22743:375` position=vertical:
 * pad 24 · gap 16 · r16 · leyenda círculo 15 · guide Y · grid divider · atom-bars brand primary r4 top.
 */
@Component({ tag: 'siaf-bar-chart', styleUrl: 'siaf-bar-chart.css', shadow: true })
export class SiafBarChart {
  @Prop() heading?: string;
  @Prop() data: SiafBarDatum[] | string = [];
  @Prop() legendLabel = 'Activos';
  @Prop({ reflect: true }) orientation: 'vertical' | 'horizontal' = 'vertical';

  private parsed(): SiafBarDatum[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  /** Nice Y ticks (Kit guide 0…500 step 100). */
  private ticks(max: number): number[] {
    const niceMax = Math.max(1, Math.ceil(max / 100) * 100 || 100);
    const step = niceMax / 5;
    const out: number[] = [];
    for (let i = 5; i >= 0; i--) out.push(Math.round(i * step));
    return out;
  }

  render() {
    const series = this.parsed();
    const dataMax = Math.max(1, ...series.map(d => d.value));
    const yTicks = this.ticks(dataMax);
    const yMax = yTicks[0] || dataMax;
    const barColor = 'var(--sys-color-bg-brand-primary, #014899)';

    return (
      <Host>
        <section class="shell" part="shell">
          <header class="header" part="header">
            {this.heading ? <h2 class="title">{this.heading}</h2> : null}
            <div class="legend" part="legend">
              <span class="leg-item">
                <span class="swatch" style={{ background: barColor }} />
                {this.legendLabel}
              </span>
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
                          <div
                            class="bar"
                            style={{ height: `${(d.value / yMax) * 100}%`, background: d.color || barColor }}
                            title={`${d.label}: ${d.value}`}
                          />
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
                    <div
                      class="bar"
                      style={{ width: `${(d.value / dataMax) * 100}%`, background: d.color || barColor }}
                      title={`${d.label}: ${d.value}`}
                    />
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
