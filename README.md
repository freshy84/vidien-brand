# vidien-brand

Shared design tokens, primitives, and components for `vidien.ai` (marketing site) and `app.vidien.ai` (product app). One source of truth for the spectral ribbon, aura, colour palette, typography, wordmark, and the reusable React components built on top of them.

## Install

Published from GitHub (not npm). Both consuming projects pin to it like this:

```bash
npm install github:freshy84/vidien-brand
```

Pin a specific commit in production so brand updates don't silently bump:

```bash
npm install github:freshy84/vidien-brand#<commit-sha>
```

## Next.js consumers

The package ships raw `.tsx` (no build step) so consumers transpile it on demand. In `next.config`:

```ts
const nextConfig = {
  transpilePackages: ["vidien-brand"],
};
```

### CSS — `@import` from your Tailwind stylesheet

With Tailwind v4, `@import` the brand CSS **inside** your global Tailwind stylesheet (not via JS) so the `@theme inline` blocks are processed in the same context, and add `@source` so Tailwind scans the package for class usage:

```css
/* app/globals.css */
@import "tailwindcss";

/* CRITICAL — without this, Tailwind drops classes used inside the brand
 * components (e.g. RibbonBreak's absolute/bottom-0/left-0/right-0). */
@source "../node_modules/vidien-brand";

@import "vidien-brand/tokens.css";
@import "vidien-brand/primitives.css";
```

The `@source` path is relative to the CSS file — adjust the depth if `globals.css` isn't one level above `node_modules`.

### Mount `<RibbonDefs />` once in the root layout

```tsx
import { RibbonDefs } from "vidien-brand";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RibbonDefs />
        {children}
      </body>
    </html>
  );
}
```

### Use components + tokens

```tsx
import { RibbonBreak } from "vidien-brand";

<section className="relative">…<RibbonBreak seed="hero" /></section>;

<h1 className="display text-5xl">
  Product videos that <span className="italic text-ribbon">don&apos;t suck</span>.
</h1>;
```

```ts
import { colors, ribbonStops, fonts } from "vidien-brand";
```

## What's in the box

| Path | Purpose |
|---|---|
| `tokens.css` | CSS variables: `--color-*`, `--ribbon-h/v`, `--aura-*`, `--font-*`, `--radius-*`, plus a Tailwind v4 `@theme inline` bridge. |
| `primitives.css` | Utility classes: `.text-ribbon`, `.ribbon-icon`, `.ribbon-icon-outline`, `.menu-label`, `.card-ribbon`, `.card-soft`, `.pill-ribbon`, `.btn-ribbon-outline`, `.btn-ribbon-secondary`, `.divider-ribbon`, `.spine-ribbon`, `.underline-ribbon`, `.display`, `.aura`, `.aura-halo`, `.pulse-dot`, `.pulse-ring`, plus keyframes + a `prefers-reduced-motion` block. |
| `tokens.ts` | JS/TS exports of the same values (`colors`, `aura`, `ribbonStops`, `fonts`, `radii`). |
| `components/RibbonWave.tsx` | A single animated spectral wave. |
| `components/RibbonBreak.tsx` | Stacked `RibbonWave`(s) with seeded per-section variation — animated section dividers. |
| `components/RibbonDefs.tsx` | The `<linearGradient>` defs (`#brand-ribbon-gradient` + `-animated`) that `.ribbon-icon` references. |
| `assets/wordmark.png` | The rainbow "Vidien" script wordmark (1091×306 RGBA). |

## Versioning

- Breaking change (renamed class, removed export) → bump `version` in `package.json` and tag the commit so consumers can pin.
- Additive → just commit; consumers pull on next `npm install`.

## Local development

```bash
# in vidien-brand/
npm link
# in the consuming app/
npm link vidien-brand
# undo: npm unlink vidien-brand && npm install
```
