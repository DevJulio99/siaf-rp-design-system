import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafTab { id: string; label: string; disabled?: boolean }

@Component({ tag: 'siaf-tabs', styleUrl: 'siaf-tabs.css', shadow: true })
export class SiafTabs {
  @Prop() tabs: SiafTab[] | string = [];
  @Prop({ mutable: true }) activeId?: string;
  /** Kit Tabs content Border=True (folder) | False (underline). */
  @Prop({ reflect: true }) bordered = true;
  @Event() siafTabChange!: EventEmitter<string>;

  private parsed(): SiafTab[] {
    if (typeof this.tabs === 'string') {
      try { return JSON.parse(this.tabs); } catch { return []; }
    }
    return this.tabs || [];
  }

  private select = (id: string) => {
    this.activeId = id;
    this.siafTabChange.emit(id);
  };

  render() {
    const tabs = this.parsed();
    const active = this.activeId || tabs[0]?.id;
    return (
      <Host class={{ underline: !this.bordered }}>
        <div class="list" role="tablist">
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              class={{ tab: true, active: t.id === active }}
              aria-selected={t.id === active ? 'true' : 'false'}
              disabled={t.disabled}
              onClick={() => this.select(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div class="panel" role="tabpanel">
          <slot name={active} />
          <slot />
        </div>
      </Host>
    );
  }
}
