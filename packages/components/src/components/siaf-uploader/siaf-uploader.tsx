import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

/**
 * many upload Kit 2608:17555 — extend=true Default.
 */
@Component({ tag: 'siaf-uploader', styleUrl: 'siaf-uploader.css', shadow: true })
export class SiafUploader {
  @Prop() label = 'Arrastrar o elige archivo del computador';
  @Prop() hint = 'Se permiten archivos de 10 MB como máximo';
  @Prop() accept?: string;
  @Prop({ reflect: true }) multiple = false;
  @Prop({ reflect: true }) disabled = false;
  @State() dragging = false;
  @State() fileName?: string;
  @Event() siafFiles!: EventEmitter<FileList>;

  private onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileName = input.files[0].name;
      this.siafFiles.emit(input.files);
    }
  };

  private onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!this.disabled) this.dragging = true;
  };

  private onDragLeave = () => {
    this.dragging = false;
  };

  private onDrop = (e: DragEvent) => {
    e.preventDefault();
    this.dragging = false;
    if (this.disabled || !e.dataTransfer?.files?.length) return;
    this.fileName = e.dataTransfer.files[0].name;
    this.siafFiles.emit(e.dataTransfer.files);
  };

  private renderIdleLabel() {
    // Kit: "Arrastrar o " + Bold brand "elige archivo" + " del computador"
    const m = /^(.*?)(elige archivo)(.*)$/i.exec(this.label);
    if (!m) return <span class="text">{this.label}</span>;
    return (
      <span class="text">
        {m[1]}
        <span class="link">{m[2]}</span>
        {m[3]}
      </span>
    );
  }

  render() {
    return (
      <Host>
        <label
          class={{ drop: true, disabled: this.disabled, dragging: this.dragging, filled: !!this.fileName }}
          onDragOver={this.onDragOver}
          onDragLeave={this.onDragLeave}
          onDrop={this.onDrop}
        >
          <input
            type="file"
            accept={this.accept}
            multiple={this.multiple}
            disabled={this.disabled}
            onChange={this.onChange}
          />
          <span class="icon" aria-hidden="true">
            <siaf-icon name="backup" size="xxl"></siaf-icon>
          </span>
          <span class="copy">
            {this.fileName ? <span class="text">{this.fileName}</span> : this.renderIdleLabel()}
            {!this.fileName && this.hint ? <span class="hint">{this.hint}</span> : null}
          </span>
        </label>
      </Host>
    );
  }
}
