/**
 * Entry canónico para bundlers (Vite/Webpack/etc.).
 * Registra todos los custom elements sin depender del lazy loader de Stencil
 * (evita 404 de *.entry.js cuando Vite prebundlea deps).
 */
import { defineCustomElements } from './dist/components/index.js';

defineCustomElements();
