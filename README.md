# SIAF-RP Design System

Librería de **design tokens** y **Web Components** (Stencil) del Design System SIAF-RP (MEF), para consumo multi-equipo.

| Paquete | Descripción |
|---|---|
| `@siaf-rp/tokens` | CSS custom properties (`--sys-*`) y tipografía |
| `@siaf-rp/components` | Componentes `siaf-*` (Shadow DOM) |

Diseño de referencia: [UI KIT SIAF - RP](https://www.figma.com/design/mJrG11d0rWf7BjPuE2ApPZ) · [Componentes Transversales](https://www.figma.com/design/E0MKPKww1YykvQKp82pEUH).

## Estructura

```
packages/
  tokens/        # @siaf-rp/tokens
  components/    # @siaf-rp/components
apps/
  playground/    # Demo HTML local
```

## Requisitos

- Node.js 20+

## Desarrollo local

```bash
npm install
npm run build
npm run playground    # http://localhost:4173
npm run storybook     # http://localhost:6006
npm test
```

## Instalación (consumidores)

```bash
npm install @siaf-rp/components @siaf-rp/tokens
```

### Con bundler (Vite, etc.)

```js
import '@siaf-rp/components';
import '@siaf-rp/tokens/siaf-tokens.css';
import '@siaf-rp/tokens/siaf-tokens.layout.css';
```

```html
<siaf-button variant="filled" color="primary">Continuar</siaf-button>
```

### Sin bundler

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="node_modules/@siaf-rp/tokens/dist/siaf-tokens.css" />
<link rel="stylesheet" href="node_modules/@siaf-rp/tokens/dist/siaf-tokens.layout.css" />
<script type="module" src="node_modules/@siaf-rp/components/register.js"></script>

<siaf-button variant="filled" color="primary">Continuar</siaf-button>
```

Tipografía de producto: **Inter**. Alternativa sin Google Fonts:

```html
<link rel="stylesheet" href="node_modules/@siaf-rp/tokens/dist/siaf-fonts.css" />
<link rel="stylesheet" href="node_modules/@siaf-rp/tokens/dist/siaf-tokens.css" />
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run build` | Compila tokens y componentes |
| `npm run dev` | Servidor de desarrollo Stencil |
| `npm run playground` | Demo HTML |
| `npm run storybook` | Catálogo Storybook |
| `npm test` | Tests Vitest |
| `npm run sync:tokens` | Regenera CSS de tokens desde snapshot |
