import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
} from '@stencil/core';
import { siafId } from '../../utils/a11y';

/**
 * Pagination SIAF (UI Kit `Pagination`, node 2506:7606).
 * Spec: h=40, gap 16, rango caption 12, Icon buttons 40×40 / icon 24.
 * Row page=True: label + Text fields (min-h 32, w 82, pad 16/4, r8, expand_more 24)
 * + lista de opciones (composición Lists; no WC Select ni `<select>` nativo).
 */
@Component({ tag: 'siaf-pagination', styleUrl: 'siaf-pagination.css', shadow: true })
export class SiafPagination {
  @Element() el!: HTMLElement;
  @Prop() totalItems = 0;
  @Prop({ mutable: true }) page = 1;
  @Prop({ mutable: true }) pageSize = 25;
  @Prop() pageSizeOptions: number[] | string = [10, 25, 50, 100];
  @Prop() showPageSize = false;
  @Event() siafPageChange!: EventEmitter<number>;
  @Event() siafPageSizeChange!: EventEmitter<number>;

  @State() sizeOpen = false;
  @State() activeIndex = -1;

  private sizeTriggerId = siafId('page-size');
  private sizeListId = siafId('page-size-list');
  private listboxEl?: HTMLElement;
  private ignoreOutsideClick = false;

  private options(): number[] {
    if (typeof this.pageSizeOptions === 'string') {
      try {
        return JSON.parse(this.pageSizeOptions);
      } catch {
        return [10, 25, 50];
      }
    }
    return this.pageSizeOptions || [10, 25, 50];
  }

  private get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize) || 1);
  }

  private get rangeLabel(): string {
    if (this.totalItems <= 0) return '0-0 de 0';
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.totalItems);
    return `${start}-${end} de ${this.totalItems}`;
  }

  private go = (p: number) => {
    const next = Math.min(this.totalPages, Math.max(1, p));
    if (next === this.page) return;
    this.page = next;
    this.siafPageChange.emit(next);
  };

  private setSize = (n: number) => {
    if (!Number.isFinite(n) || n === this.pageSize) {
      this.sizeOpen = false;
      return;
    }
    this.pageSize = n;
    this.page = 1;
    this.sizeOpen = false;
    this.siafPageSizeChange.emit(n);
    this.siafPageChange.emit(1);
  };

  private toggleSize = (e?: Event) => {
    e?.stopPropagation();
    this.sizeOpen = !this.sizeOpen;
    if (this.sizeOpen) {
      const opts = this.options();
      const selected = opts.findIndex((n) => n === this.pageSize);
      this.activeIndex = selected >= 0 ? selected : 0;
      this.ignoreOutsideClick = true;
      requestAnimationFrame(() => {
        this.ignoreOutsideClick = false;
        this.focusActiveOption();
      });
    }
  };

  private focusActiveOption() {
    const opts = this.listboxEl?.querySelectorAll<HTMLElement>('[role="option"]');
    if (!opts?.length) return;
    const idx = Math.max(0, Math.min(this.activeIndex, opts.length - 1));
    opts[idx]?.focus();
  }

  @Listen('click', { target: 'document' })
  onDocClick(ev: MouseEvent) {
    if (!this.sizeOpen || this.ignoreOutsideClick) return;
    const path = typeof ev.composedPath === 'function' ? ev.composedPath() : [];
    if (path.includes(this.el)) return;
    this.sizeOpen = false;
  }

  private onTriggerKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!this.sizeOpen) this.toggleSize();
        break;
      case 'Escape':
        if (this.sizeOpen) {
          e.preventDefault();
          this.sizeOpen = false;
        }
        break;
      default:
        break;
    }
  };

  private onListKeyDown = (e: KeyboardEvent) => {
    const opts = this.options();
    if (!opts.length) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.activeIndex = Math.min(opts.length - 1, this.activeIndex + 1);
        this.focusActiveOption();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = Math.max(0, this.activeIndex - 1);
        this.focusActiveOption();
        break;
      case 'Home':
        e.preventDefault();
        this.activeIndex = 0;
        this.focusActiveOption();
        break;
      case 'End':
        e.preventDefault();
        this.activeIndex = opts.length - 1;
        this.focusActiveOption();
        break;
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const n = opts[this.activeIndex];
        if (n != null) this.setSize(n);
        break;
      }
      case 'Escape':
        e.preventDefault();
        this.sizeOpen = false;
        (this.el.shadowRoot?.getElementById(this.sizeTriggerId) as HTMLElement | null)?.focus();
        break;
      case 'Tab':
        this.sizeOpen = false;
        break;
      default:
        break;
    }
  };

  render() {
    const opts = this.options();
    return (
      <Host>
        <div class="bar" role="navigation" aria-label="Paginación">
          {this.showPageSize ? (
            <div class="size">
              <span class="size-label" id="siaf-page-size-label">
                Filas por página:
              </span>
              <div class="size-field">
                <button
                  type="button"
                  class={{ trigger: true, open: this.sizeOpen }}
                  id={this.sizeTriggerId}
                  aria-haspopup="listbox"
                  aria-expanded={this.sizeOpen ? 'true' : 'false'}
                  aria-controls={this.sizeListId}
                  aria-labelledby="siaf-page-size-label"
                  aria-label="Filas por página"
                  onClick={this.toggleSize}
                  onKeyDown={this.onTriggerKeyDown}
                >
                  <span class="value">{this.pageSize}</span>
                  <span class="chevron" aria-hidden="true">
                    <siaf-icon name={this.sizeOpen ? 'expand_less' : 'expand_more'} size="lg"></siaf-icon>
                  </span>
                </button>
                {this.sizeOpen ? (
                  <ul
                    class="listbox"
                    id={this.sizeListId}
                    role="listbox"
                    aria-labelledby="siaf-page-size-label"
                    tabindex={-1}
                    ref={(el) => (this.listboxEl = el)}
                    onKeyDown={this.onListKeyDown}
                  >
                    {opts.map((n, i) => {
                      const selected = n === this.pageSize;
                      const active = i === this.activeIndex;
                      return (
                        <li
                          role="option"
                          class={{ option: true, selected, active }}
                          aria-selected={selected ? 'true' : 'false'}
                          tabindex={active ? 0 : -1}
                          onClick={() => this.setSize(n)}
                          onMouseEnter={() => (this.activeIndex = i)}
                        >
                          {n}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </div>
          ) : null}
          <span class="range" aria-live="polite">
            {this.rangeLabel}
          </span>
          <div class="nav">
            <button
              type="button"
              class="icon-btn"
              aria-label="Página anterior"
              disabled={this.page <= 1}
              onClick={() => this.go(this.page - 1)}
            >
              <siaf-icon name="chevron_left" size="lg"></siaf-icon>
            </button>
            <button
              type="button"
              class="icon-btn"
              aria-label="Página siguiente"
              disabled={this.page >= this.totalPages}
              onClick={() => this.go(this.page + 1)}
            >
              <siaf-icon name="chevron_right" size="lg"></siaf-icon>
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
