import { describe, it, expect } from 'vitest';
import { getFocusable, siafId, trapFocus } from './a11y';

describe('a11y helpers', () => {
  it('siafId generates unique prefixes', () => {
    const a = siafId('t');
    const b = siafId('t');
    expect(a).not.toBe(b);
    expect(a.startsWith('t-')).toBe(true);
  });

  it('getFocusable skips disabled controls', () => {
    const root = document.createElement('div');
    root.innerHTML = `
      <button>ok</button>
      <button disabled>no</button>
      <a href="#">link</a>
      <input disabled />
    `;
    document.body.appendChild(root);
    const list = getFocusable(root);
    expect(list).toHaveLength(2);
    root.remove();
  });

  it('trapFocus cycles Tab on last element', () => {
    const root = document.createElement('div');
    root.innerHTML = `<button id="a">A</button><button id="b">B</button>`;
    document.body.appendChild(root);
    const b = root.querySelector('#b') as HTMLButtonElement;
    b.focus();
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    Object.defineProperty(document, 'activeElement', { configurable: true, get: () => b });
    trapFocus(root, ev);
    expect(ev.defaultPrevented).toBe(true);
    root.remove();
  });
});
