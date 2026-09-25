import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

export interface SiafMenuItem { id: string; label: string; disabled?: boolean; danger?: boolean }

@Component({ tag: 'siaf-menu', styleUrl: 'siaf-menu.css', shadow: true })
export class SiafMenu {
  @Prop() items: SiafMenuItem[] | string = [];
  /** Standard h48 · Compact h32 (Kit Density) */
  @Prop({ reflect: true }) density: 'standard' | 'compact' = 'standard';
  @State() open = false;
  @Event() siafSelect!: EventEmitter<string>;

  private parsed(): SiafMenuItem[] {
    if (typeof this.items === 'string') {
      try {
        return JSON.parse(this.items);
      } catch {
        return [];
      }
    }
    return this.items || [];
  }

  render() {
    return (
      <Host>
        <div class="wrap">
          <div class="trigger" onClick={() => (this.open = !this.open)}>
            <slot name="trigger">
              <siaf-button variant="outlined" size="sm">
                Menú
              </siaf-button>
            </slot>
          </div>
          {this.open ? (
            <ul class={{ menu: true, compact: this.density === 'compact' }} role="menu">
              {this.parsed().map(item => (
                <li role="none">
                  <button
                    type="button"
                    role="menuitem"
                    class={{ danger: !!item.danger }}
                    disabled={item.disabled}
                    onClick={() => {
                      this.siafSelect.emit(item.id);
                      this.open = false;
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Host>
    );
  }
}
