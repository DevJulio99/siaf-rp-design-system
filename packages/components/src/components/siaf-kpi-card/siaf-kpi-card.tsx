import { Component, Host, Prop, h } from '@stencil/core';

export type SiafKpiIconStyle = 'informative' | 'success' | 'warning' | 'danger';

/**
 * KPI card (UI Kit · Graphics `22743:662`).
 * Spec: pad 24 · gap 12 · radius 8 · stroke rgba(32,32,32,.4) ·
 * label subtitle2 14 Medium · value heading4 22 Bold ·
 * Progress/lineal h8 + % body2 14 · icon-box 24 pad 4 radius 4.
 */
@Component({ tag: 'siaf-kpi-card', styleUrl: 'siaf-kpi-card.css', shadow: true })
export class SiafKpiCard {
  @Prop() label = '';
  @Prop() value: string | number = '';
  /** 0–100; si se omite, no se muestra la barra */
  @Prop() progress?: number;
  @Prop({ reflect: true }) iconStyle: SiafKpiIconStyle = 'informative';
  @Prop() iconName = 'arrow_outward';
  @Prop() showIcon = true;

  private clampedProgress(): number | null {
    if (this.progress == null || Number.isNaN(Number(this.progress))) return null;
    return Math.max(0, Math.min(100, Number(this.progress)));
  }

  render() {
    const pct = this.clampedProgress();
    return (
      <Host>
        <div class="kpi" part="kpi">
          <div class="header">
            <div class="label">{this.label}</div>
            {this.showIcon ? (
              <span class={`icon-box style-${this.iconStyle}`} aria-hidden="true" part="icon">
                <slot name="icon">
                  <siaf-icon name={this.iconName} size="sm"></siaf-icon>
                </slot>
              </span>
            ) : (
              <slot name="icon" />
            )}
          </div>
          <div class="value" part="value">
            <slot>{this.value}</slot>
          </div>
          {pct != null ? (
            <div class="progress-row" part="progress">
              <div class="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
                <span class="fill" style={{ width: `${pct}%` }} />
              </div>
              <span class="pct">{`${Math.round(pct)}%`}</span>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}
