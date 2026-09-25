/**
 * axe-core against built Web Components (happy-dom).
 * color-contrast omitted — no real paint in this environment.
 */
import { describe, it, beforeAll, afterEach, expect } from 'vitest';
import { expectNoAxeViolations } from './axe';

beforeAll(async () => {
  await import('../../dist/siaf-rp/siaf-rp.esm.js');
});

afterEach(() => {
  document.body.innerHTML = '';
});

async function mount(html: string): Promise<HTMLElement> {
  const wrap = document.createElement('main');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);
  const tags = [...wrap.querySelectorAll('*')].map((el) => el.localName);
  await Promise.all(
    [...new Set(tags)]
      .filter((t) => t.startsWith('siaf-'))
      .map((t) => customElements.whenDefined(t).catch(() => undefined)),
  );
  // Allow Stencil lazy render
  await new Promise((r) => setTimeout(r, 30));
  return wrap;
}

describe('núcleo · axe a11y', () => {
  it('siaf-button', async () => {
    const root = await mount(`<siaf-button variant="filled">Continuar</siaf-button>`);
    await expectNoAxeViolations(root);
  });

  it('siaf-input con label', async () => {
    const root = await mount(
      `<siaf-input label="Año fiscal" helper-text="Ayuda" value="2026"></siaf-input>`,
    );
    await expectNoAxeViolations(root);
  });

  it('siaf-input error', async () => {
    const root = await mount(`<siaf-input label="Campo" error-text="Obligatorio"></siaf-input>`);
    await expectNoAxeViolations(root);
  });

  it('siaf-alert', async () => {
    const root = await mount(
      `<siaf-alert tone="info"><span slot="title">Info</span>Mensaje</siaf-alert>`,
    );
    await expectNoAxeViolations(root);
  });

  it('siaf-tag', async () => {
    const root = await mount(`<siaf-tag tone="success">Activo</siaf-tag>`);
    await expectNoAxeViolations(root);
  });

  it('siaf-table', async () => {
    const root = await mount(`
      <siaf-table
        caption="Ítems"
        columns='[{"key":"a","label":"Código"},{"key":"b","label":"Nombre"}]'
        rows='[{"a":"1","b":"Uno"}]'
      ></siaf-table>`);
    await expectNoAxeViolations(root);
  });

  it('siaf-pagination', async () => {
    const root = await mount(
      `<siaf-pagination total-items="40" page="1" page-size="10"></siaf-pagination>`,
    );
    await expectNoAxeViolations(root);
  });

  it('siaf-modal cerrado', async () => {
    const root = await mount(
      `<siaf-modal heading="Confirmar" confirm-actions>Contenido</siaf-modal>`,
    );
    await expectNoAxeViolations(root);
  });

  it('siaf-steps', async () => {
    const root = await mount(`
      <siaf-steps
        current="0"
        steps='[{"id":"a","label":"Datos"},{"id":"b","label":"Detalle"}]'
      ></siaf-steps>`);
    await expectNoAxeViolations(root);
  });

  it('siaf-icon', async () => {
    const root = await mount(`<siaf-icon name="search" aria-label="Buscar"></siaf-icon>`);
    await expectNoAxeViolations(root);
  });

  it('composición hub (button + alert + input)', async () => {
    const root = await mount(`
      <siaf-alert tone="info"><span slot="title">Piloto</span>OK</siaf-alert>
      <siaf-input label="Nombre" value="Demo"></siaf-input>
      <siaf-button variant="filled">Guardar</siaf-button>`);
    await expectNoAxeViolations(root);
    expect(root.querySelectorAll('siaf-button, siaf-input, siaf-alert').length).toBe(3);
  });
});
