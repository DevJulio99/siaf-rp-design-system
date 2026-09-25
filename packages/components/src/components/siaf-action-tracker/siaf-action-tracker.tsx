import { Component, Host, Prop, h } from '@stencil/core';

export interface SiafTrackerRole {
  /** Label overline (p.ej. "Acción por" → se muestra en mayúsculas) */
  role: string;
  user?: string;
  date?: string;
}

/**
 * ActionTracker Transversales `3597:23982` Property=Default · _HistoryCards.
 * ItemRoles: Readonly-style label overline + value body2 Bold.
 */
@Component({ tag: 'siaf-action-tracker', styleUrl: 'siaf-action-tracker.css', shadow: true })
export class SiafActionTracker {
  @Prop() roles: SiafTrackerRole[] | string = [];

  private parsed(): SiafTrackerRole[] {
    if (typeof this.roles === 'string') {
      try {
        return JSON.parse(this.roles);
      } catch {
        return [];
      }
    }
    return this.roles || [];
  }

  render() {
    const roles = this.parsed();
    return (
      <Host>
        <div class="tracker">
          {roles.length ? (
            <div class="roles">
              {roles.map((r, i) => (
                <div class="role" key={i}>
                  {r.user || r.role ? (
                    <div class="field">
                      <div class="field-label">{r.role}</div>
                      {r.user ? <div class="field-value">{r.user}</div> : null}
                    </div>
                  ) : null}
                  {r.date ? (
                    <div class="field">
                      <div class="field-label">Fecha</div>
                      <div class="field-value">{r.date}</div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div class="actions">
              <slot />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
