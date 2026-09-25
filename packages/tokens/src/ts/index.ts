/**
 * Public token helpers for consumers that need JS access.
 * Visual values live in CSS — do not duplicate hex here.
 */

export const TOKEN_CSS_HREF = './siaf-tokens.css';
export const FONTS_CSS_HREF = './siaf-fonts.css';

/** Google Fonts URL for Inter (SIAF-RP product typeface) */
export const INTER_GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';

/** Namespace used by SIAF-RP CSS custom properties */
export const TOKEN_PREFIX = {
  sys: '--sys-',
  figma: '--figma-',
} as const;

export type SiafColorRole =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral';
