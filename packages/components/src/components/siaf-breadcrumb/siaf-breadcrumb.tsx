import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface SiafCrumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumb SIAF (UI Kit · 7118:19582).
 * Spec: h=40, padding 4/16, gap 4, font 12, home Icon button 32.
 */
@Component({ tag: 'siaf-breadcrumb', styleUrl: 'siaf-breadcrumb.css', shadow: true })
export class SiafBreadcrumb {
  @Prop() items: SiafCrumb[] | string = [];
  /** Kit siempre inicia con Icon buttons home. */
  @Prop() homeHref?: string;
  @Prop({ reflect: true }) showHome = true;
  @Event() siafNavigate!: EventEmitter<SiafCrumb>;

  private parsed(): SiafCrumb[] {
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
    const items = this.parsed();
    const showHome = this.showHome;
    return (
      <Host>
        <nav aria-label="Breadcrumb">
          <ol>
            {showHome ? (
              <li>
                {this.homeHref ? (
                  <a
                    class="home"
                    href={this.homeHref}
                    aria-label="Inicio"
                    onClick={(e) => {
                      e.preventDefault();
                      this.siafNavigate.emit({ label: 'Inicio', href: this.homeHref });
                    }}
                  >
                    <siaf-icon name="home" size="md"></siaf-icon>
                  </a>
                ) : (
                  <span class="home" aria-hidden={items.length ? 'true' : undefined}>
                    <siaf-icon name="home" size="md"></siaf-icon>
                  </span>
                )}
                {items.length ? (
                  <span class="sep" aria-hidden="true">
                    <siaf-icon name="chevron_right" size="xs"></siaf-icon>
                  </span>
                ) : null}
              </li>
            ) : null}
            {items.map((item, i) => {
              const last = i === items.length - 1;
              return (
                <li>
                  {last || !item.href ? (
                    <span aria-current={last ? 'page' : undefined}>{item.label}</span>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        this.siafNavigate.emit(item);
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                  {!last ? (
                    <span class="sep" aria-hidden="true">
                      <siaf-icon name="chevron_right" size="xs"></siaf-icon>
                    </span>
                  ) : null}
                </li>
              );
            })}
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
