import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafDivergingDatum {
  label: string;
  /** Valor hacia la izquierda (negativo visual) */
  left: number;
  /** Valor hacia la derecha */
  right: number;
}

/**
 * Kit Graphics · Divergente / Comparative bars — chrome pad 24 · gap 16 · r16.
 * Barras ± desde eje central; colores brand / secondary medidos del Kit.
 */
@Component({
  tag: 'siaf-diverging-chart',
  styleUrl: 'siaf-diverging-chart.css',
  shadow: true,
})
export class SiafDivergingChart {
  @Prop() heading?: string;
  @Prop() data: SiafDivergingDatum[] | string = [];
  @Prop() leftLabel = 'Serie A';
  @Prop() rightLabel = 'Serie B';

  private parsed(): SiafDivergingDatum[] {
    if (typeof this.data === 'string') {
      try {
        return JSON.parse(this.data);
      } catch {
        return [];
      }
    }
    return this.data || [];
  }

  render() {
    const series = this.parsed();
    const max = Math.max(
      1,
      ...series.map(d => Math.max(Math.abs(d.left), Math.abs(d.right))),
    );
    const leftColor = 'var(--sys-color-bg-brand-primary, #014899)';
    const rightColor = 'var(--sys-color-bg-brand-secondary, #0068b0)';

    return (
      <Host>
        <section class="shell" part="shell">
          <header class="header" part="header">
            {this.heading ? <h2 class="title">{this.heading}</h2> : null}
            <div class="legend">
              <span class="leg-item">
                <span class="swatch" style={{ background: leftColor }} />
                {this.leftLabel}
              </span>
              <span class="leg-item">
                <span class="swatch" style={{ background: rightColor }} />
                {this.rightLabel}
              </span>
              <slot name="header" />
            </div>
          </header>
          <div class="body" part="body">
            {series.length ? (
              <div class="rows">
                {series.map((d, i) => (
                  <div class="row" key={i}>
                    <span class="label">{d.label}</span>
                    <div class="bars">
                      <div class="half left">
                        <div
                          class="bar"
                          style={{
                            width: `${(Math.abs(d.left) / max) * 100}%`,
                            background: leftColor,
                          }}
                          title={`${this.leftLabel}: ${d.left}`}
                        />
                      </div>
                      <div class="axis" aria-hidden="true" />
                      <div class="half right">
                        <div
                          class="bar"
                          style={{
                            width: `${(Math.abs(d.right) / max) * 100}%`,
                            background: rightColor,
                          }}
                          title={`${this.rightLabel}: ${d.right}`}
                        />
                      </div>
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
