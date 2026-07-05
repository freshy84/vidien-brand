/*
 * vidien-brand — JS/TS-accessible design tokens
 *
 * Mirrors the CSS variables in tokens.css for places that need numeric
 * access — RibbonWave's color stops, theme configs in apps that don't use
 * CSS variables, etc. Keep in sync with tokens.css by hand.
 */

export const colors = {
  bg: "#0d0d0f",
  surface: "#1c1c20",
  surface2: "#25252a",

  fg: "#e8e8ea",
  fgMuted: "#c5c5c8",
  fgSubtle: "#9a9a9e",
  fgFaint: "#777",

  border: "#2e2e34",
  borderStrong: "#3a3a42",
  borderFaint: "#1c1c20",

  accent: "#f5a83d",
  accentHover: "#fab656",
  accentFg: "#1b1306",
} as const;

export const aura = {
  mint: "#7ee5b7",
  sky: "#5b9cf2",
  lavender: "#a78bfa",
} as const;

/**
 * The spectral ribbon's primary stops + amber loop-back. Use these to build
 * inline gradients (CSS or SVG) that match the brand's other gradients.
 */
export const ribbonStops = [
  { offset: "0%", color: "#fbbf24" },
  { offset: "22%", color: "#fb7185" },
  { offset: "44%", color: "#c084fc" },
  { offset: "64%", color: "#60a5fa" },
  { offset: "84%", color: "#34d399" },
  { offset: "100%", color: "#fbbf24" },
] as const;

export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
} as const;

export const fonts = {
  serif: `"Iowan Old Style", "Apple Garamond", Garamond, Georgia, serif`,
  sansFallback: `-apple-system, "SF Pro Text", system-ui, sans-serif`,
  mono: `ui-monospace, Menlo, monospace`,
} as const;
