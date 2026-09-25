import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafListItem { id: string; label: string; secondary?: string; disabled?: boolean }

@Component({ tag: 'siaf-list', styleUrl: 'siaf-list.css', shadow: true })
export class SiafList {
  @Prop() items: SiafListItem[] | string = [];
  @Prop({ mutable: true }) selectedId?: string;
  @Event() siafSelect!: EventEmitter<string>;

  private parsed(): SiafListItem[] {
    if (typeof this.items === 'string') { try { return JSON.parse(this.items); } catch { return []; } }
    return this.items || [];
  }

  render() {
    return (
      <Host>
        <ul role="listbox">
          {this.parsed().map((item) => (
            <li>
              <button
                type="button"
                role="option"
                class={{ item: true, selected: item.id === this.selectedId }}
                aria-selected={item.id === this.selectedId ? 'true' : 'false'}
                disabled={item.disabled}
                onClick={() => { this.selectedId = item.id; this.siafSelect.emit(item.id); }}
              >
                <span class="label">{item.label}</span>
                {item.secondary ? <span class="sec">{item.secondary}</span> : null}
              </button>
            </li>
          ))}
          <slot />
        </ul>
      </Host>
    );
  }
}
