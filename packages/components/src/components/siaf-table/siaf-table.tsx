import { Component, Host, Prop, h } from '@stencil/core';
import { siafId } from '../../utils/a11y';

export interface SiafColumn {
  key: string;
  label: string;
  width?: string;
  overflow?: 'truncate' | 'wrap';
}

export type SiafRow = Record<string, string | number | boolean | null | undefined>;

/**
 * Tabla SIAF — composición de Cell + Cell header (UI Kit ↳ Table).
 * Medido: header h40 · body Cell h48 · pad 12/16 · header caption 12 Bold.
 * Cell Kit tiene variantes (Amount, Flow, Checkbox, Icons…): esta WC cubre Text básico;
 * el resto se compone en consumidor o gaps.
 * a11y: caption, scope=col, empty state con role=status.
 */
@Component({ tag: 'siaf-table', styleUrl: 'siaf-table.css', shadow: true })
export class SiafTable {
  @Prop() columns: SiafColumn[] | string = [];
  @Prop() rows: SiafRow[] | string = [];
  @Prop() caption?: string;

  private captionId = siafId('table-cap');

  private cols(): SiafColumn[] {
    if (typeof this.columns === 'string') {
      try {
        return JSON.parse(this.columns);
      } catch {
        return [];
      }
    }
    return this.columns || [];
  }

  private data(): SiafRow[] {
    if (typeof this.rows === 'string') {
      try {
        return JSON.parse(this.rows);
      } catch {
        return [];
      }
    }
    return this.rows || [];
  }

  render() {
    const cols = this.cols();
    const rows = this.data();
    const empty = rows.length === 0;
    return (
      <Host>
        <div class="wrap" part="wrap">
          <table aria-labelledby={this.captionId}>
            <caption id={this.captionId} class={this.caption ? undefined : 'sr-only'}>
              {this.caption || 'Tabla de datos'}
            </caption>
            <thead>
              <tr>
                {cols.map((c) => (
                  <th scope="col" style={c.width ? { width: c.width } : undefined}>
                    <span class="th-title">{c.label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empty ? (
                <tr>
                  <td colSpan={cols.length || 1} class="empty" role="status">
                    Sin registros
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr>
                    {cols.map((c) => (
                      <td class={c.overflow === 'truncate' ? 'truncate' : undefined}>{String(r[c.key] ?? '')}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <slot />
        </div>
      </Host>
    );
  }
}
