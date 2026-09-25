import { Component, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';

const WEEKDAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Date & time pickers · Calendar Type=Default (Kit `2097:989`).
 * Panel 268 · pad 8 · gap 8 · r8 · Day 36 (Selected/Today corner 40 · brand).
 */
@Component({ tag: 'siaf-date-time-picker', styleUrl: 'siaf-date-time-picker.css', shadow: true })
export class SiafDateTimePicker {
  @Prop() label?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() mode: 'date' | 'time' | 'datetime-local' = 'date';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ reflect: true, mutable: true }) open = false;
  @Event() siafChange!: EventEmitter<string>;

  @State() viewYear = new Date().getFullYear();
  @State() viewMonth = new Date().getMonth();

  @Watch('value')
  syncView(v: string) {
    if (!v || this.mode === 'time') return;
    const d = new Date(`${v}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      this.viewYear = d.getFullYear();
      this.viewMonth = d.getMonth();
    }
  }

  componentWillLoad() {
    this.syncView(this.value);
  }

  private toggle = (e?: Event) => {
    e?.stopPropagation();
    if (this.disabled || this.mode === 'time') return;
    this.open = !this.open;
  };

  private prevMonth = () => {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
  };

  private nextMonth = () => {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear += 1;
    } else {
      this.viewMonth += 1;
    }
  };

  private prevYear = () => {
    this.viewYear -= 1;
  };

  private nextYear = () => {
    this.viewYear += 1;
  };

  private pickDay = (day: number) => {
    const mm = String(this.viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    this.value = `${this.viewYear}-${mm}-${dd}`;
    this.siafChange.emit(this.value);
    this.open = false;
  };

  private onTimeChange = (e: CustomEvent<string>) => {
    this.value = e.detail;
    this.siafChange.emit(this.value);
  };

  private buildCells() {
    const first = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const total = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const prevMonth = this.viewMonth === 0 ? 11 : this.viewMonth - 1;
    const prevYear = this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear;
    const prevTotal = new Date(prevYear, prevMonth + 1, 0).getDate();
    const today = new Date();
    let sel: { y: number; m: number; d: number } | null = null;
    if (this.value && this.mode !== 'time') {
      const d = new Date(`${this.value}T12:00:00`);
      if (!Number.isNaN(d.getTime())) sel = { y: d.getFullYear(), m: d.getMonth(), d: d.getDate() };
    }

    type Cell = { label: string; day?: number; muted: boolean; today: boolean; selected: boolean };
    const cells: Cell[] = [];

    for (let i = 0; i < first; i++) {
      cells.push({
        label: String(prevTotal - first + 1 + i).padStart(2, '0'),
        muted: true,
        today: false,
        selected: false,
      });
    }
    for (let d = 1; d <= total; d++) {
      const isToday =
        today.getFullYear() === this.viewYear && today.getMonth() === this.viewMonth && today.getDate() === d;
      const isSel = !!sel && sel.y === this.viewYear && sel.m === this.viewMonth && sel.d === d;
      cells.push({
        label: String(d).padStart(2, '0'),
        day: d,
        muted: false,
        today: isToday && !isSel,
        selected: isSel,
      });
    }
    let next = 1;
    while (cells.length % 7 !== 0) {
      cells.push({
        label: String(next++).padStart(2, '0'),
        muted: true,
        today: false,
        selected: false,
      });
    }
    return cells;
  }

  render() {
    if (this.mode === 'time') {
      return (
        <Host>
          <siaf-input label={this.label} type="time" value={this.value} disabled={this.disabled} onSiafChange={this.onTimeChange} />
        </Host>
      );
    }

    const cells = this.buildCells();

    return (
      <Host>
        <div class="field-wrap" onClick={this.toggle}>
          <siaf-input label={this.label} value={this.value} disabled={this.disabled} readonly={true}>
            <button
              slot="trailing"
              type="button"
              class="cal-trigger"
              disabled={this.disabled}
              onClick={(e) => {
                e.stopPropagation();
                this.toggle();
              }}
              aria-label="Abrir calendario"
              aria-expanded={this.open ? 'true' : 'false'}
            >
              <siaf-icon name="calendar_today" size="md"></siaf-icon>
            </button>
          </siaf-input>
        </div>
        {this.open ? (
          <div class="calendar" role="dialog" aria-label="Calendario">
            <div class="cal-header">
              <div class="nav-group">
                <button type="button" class="nav" aria-label="Año anterior" onClick={this.prevYear}>
                  <siaf-icon name="keyboard_double_arrow_left" size="md"></siaf-icon>
                </button>
                <button type="button" class="nav" aria-label="Mes anterior" onClick={this.prevMonth}>
                  <siaf-icon name="chevron_left" size="md"></siaf-icon>
                </button>
              </div>
              <div class="month-year">
                <span>{MONTHS[this.viewMonth]}</span>
                <span>{this.viewYear}</span>
              </div>
              <div class="nav-group">
                <button type="button" class="nav" aria-label="Mes siguiente" onClick={this.nextMonth}>
                  <siaf-icon name="chevron_right" size="md"></siaf-icon>
                </button>
                <button type="button" class="nav" aria-label="Año siguiente" onClick={this.nextYear}>
                  <siaf-icon name="keyboard_double_arrow_right" size="md"></siaf-icon>
                </button>
              </div>
            </div>
            <div class="weekdays">
              {WEEKDAYS.map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div class="grid">
              {cells.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  class={{ day: true, muted: c.muted, today: c.today, selected: c.selected }}
                  disabled={c.muted || this.disabled}
                  onClick={() => c.day && this.pickDay(c.day)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Host>
    );
  }
}
