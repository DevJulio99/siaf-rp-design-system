import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafStep {
  id: string;
  label: string;
  description?: string;
}

/**
 * Steps PAC (UI Kit · Vertical stepper with status / Steps PAC).
 * Spec: indicador 24px, gap 16 entre indicador y texto, Size=Small.
 */
@Component({ tag: 'siaf-steps', styleUrl: 'siaf-steps.css', shadow: true })
export class SiafSteps {
  @Prop() steps: SiafStep[] | string = [];
  /** Índice 0-based del paso actual */
  @Prop({ mutable: true }) current = 0;
  /** Kit Steps Rows = vertical. Horizontal solo si el consumidor lo pide. */
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';
  @Prop({ reflect: true }) interactive = false;
  @Prop({ reflect: true }) size: 'small' | 'default' = 'small';
  @Event() siafStepChange!: EventEmitter<number>;

  private parsed(): SiafStep[] {
    if (typeof this.steps === 'string') {
      try {
        return JSON.parse(this.steps);
      } catch {
        return [];
      }
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
      <Host class={`${this.orientation} size-${this.size}`}>
        <ol class="track" part="track">
          {steps.map((s, i) => {
            const state = i < this.current ? 'done' : i === this.current ? 'current' : 'todo';
            return (
              <li class={`step ${state}`} part="step">
                <button
                  type="button"
                  class="node"
                  disabled={!this.interactive || i > this.current}
                  onClick={() => this.go(i)}
                  aria-current={state === 'current' ? 'step' : null}
                >
                  <span class="indicator" aria-hidden="true">
                    <span class="dot">
                      {state === 'done' ? (
                        <siaf-icon name="check" size={this.size === 'default' ? 'lg' : 'sm'}></siaf-icon>
                      ) : this.size === 'default' ? (
                        i + 1
                      ) : null}
                    </span>
                    {i < steps.length - 1 ? <span class="line" /> : null}
                  </span>
                  <span class="meta">
                    <span class="label">{s.label}</span>
                    {s.description ? <span class="desc">{s.description}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </Host>
    );
  }
}