/**
 * LAB PAGE CONSTANTS
 * Professional engineering configuration
 */

// Z-INDEX SCALE
export const Z_INDEX = {
  base: 0,
  canvas: 10,
  vignette: 20,
  uiOverlay: 30,
  navigation: 40,
  introOverlay: 50,
} as const;

// COLOR PALETTE
export const COLORS = {
  amber: {
    400: '#CA8A04',
    500: '#EAB308',
    600: '#CA8A04',
  },
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    400: '#94A3B8',
    600: '#475569',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  cyan: {
    400: '#22D3EE',
    500: '#06B6D4',
  },
  alpha: {
    vignette: 'rgba(0,0,0,0.45)',
    vignetteStrong: 'rgba(0,0,0,0.82)',
    border: 'rgba(202,138,4,0.3)',
    borderStrong: 'rgba(202,138,4,0.4)',
    textDim: 'rgba(248,250,252,0.3)',
    textMuted: 'rgba(248,250,252,0.4)',
    textNormal: 'rgba(248,250,252,0.6)',
    white: 'rgba(248,250,252,0.15)',
  },
} as const;

// TYPOGRAPHY
export const TYPE_SCALE = {
  xs: { fontSize: '10px', letterSpacing: '0.5em' },
  sm: { fontSize: '11px', letterSpacing: '0.2em' },
  md: { fontSize: '14px', letterSpacing: '-0.01em' },
  lg: { fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.02em' },
} as const;

export const FONTS = {
  mono: '"JetBrains Mono", monospace',
  sans: '"IBM Plex Sans", sans-serif',
  display: '"Space Grotesk", sans-serif',
} as const;

// TIMING
export const TIMING = {
  intro: {
    fadeDelay: 2000,
    fadeDuration: 800,
    removeDelay: 2800,
  },
  scanLine: {
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  transition: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
    slower: '500ms ease',
  },
} as const;

// SPACING
export const SPACING = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
} as const;

// EFFECTS
export const EFFECTS = {
  glowAmber: '0 0 8px rgba(202,138,4,0.6)',
  glowAmberSubtle: '0 0 5px rgba(202,138,4,0.3)',
  glowCyan: '0 0 8px rgba(34,211,238,0.6)',
  shadowCard: '0 4px 24px rgba(0,0,0,0.5)',
} as const;

// PERFORMANCE
export const PERF = {
  dprCap: 1.5,
  baseSpeed: 0.07,
  jumpDuration: 2000,
  velocityThreshold: 1.5,
} as const;

// ACCESSIBILITY
export const A11Y = {
  reducedMotionQuery: '(prefers-reduced-motion: reduce)',
  focusOutline: '2px solid #CA8A04',
  focusOffset: '4px',
} as const;

// RESPONSIVE
export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;
