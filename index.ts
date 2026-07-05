/*
 * vidien-brand — barrel exports
 *
 * Components and tokens for the Vidien design system. CSS files live at
 * `vidien-brand/tokens.css` and `vidien-brand/primitives.css` and must be
 * imported separately (they need to be processed by the consumer's CSS
 * pipeline — Next.js, Vite, etc.).
 */

export { RibbonWave } from "./components/RibbonWave";
export { RibbonBreak } from "./components/RibbonBreak";
export { RibbonDefs } from "./components/RibbonDefs";

export { colors, aura, ribbonStops, radii, fonts } from "./tokens";
