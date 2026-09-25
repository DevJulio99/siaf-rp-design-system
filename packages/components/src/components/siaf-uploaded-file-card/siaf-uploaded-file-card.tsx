import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

/**
 * Kit Uploader · `upload` Estado=Done|Failed (`2612:2115` / `2612:9065`).
 * pad 16 · radius 8 · stroke 1 · row gap 12 · xls_file 32 · actions 24 (repeat + cancel).
 */
@Component({ tag: 'siaf-uploaded-file-card', styleUrl: 'siaf-uploaded-file-card.css', shadow: true })
export class SiafUploadedFileCard {
  @Prop() fileName = '';
  @Prop() meta?: string;
  /** Done | Failed (stroke/texto danger cuando Failed) */
  @Prop({ reflect: true }) status: 'done' | 'failed' | 'uploading' = 'done';
  @Event() siafRemove!: EventEmitter<void>;
  @Event() siafRetry!: EventEmitter<void>;

  render() {
    const failed = this.status === 'failed';
    return (
      <Host>
        <div class={{ card: true, failed, uploading: this.status === 'uploading' }}>
          <div class="row">
            <span class="file-icon" aria-hidden="true">
              <siaf-icon name="xls_file" size="xl"></siaf-icon>
            </span>
            <div class="text">
              <div class="name">
                <slot>{this.fileName}</slot>
              </div>
              {this.meta || failed ? (
                <div class="meta">{failed && !this.meta ? 'Upload failed' : this.meta}</div>
              ) : null}
            </div>
            <div class="action">
              <button
                type="button"
                class="icon-btn"
                aria-label={failed ? 'Reintentar' : 'Reemplazar archivo'}
                onClick={() => this.siafRetry.emit()}
              >
                <siaf-icon name={failed ? 'refresh' : 'repeat'} size="lg"></siaf-icon>
              </button>
              <button type="button" class="icon-btn" aria-label="Quitar archivo" onClick={() => this.siafRemove.emit()}>
                <siaf-icon name="cancel" size="lg"></siaf-icon>
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
