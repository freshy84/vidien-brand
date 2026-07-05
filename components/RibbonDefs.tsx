/**
 * Hidden SVG defs for the brand's reusable linearGradients. Mount once near
 * the top of the root layout's <body> so the gradient IDs are available to
 * any icon/element that references them via CSS (e.g. `fill: url(#…)`).
 *
 * Provides:
 *   - #brand-ribbon-gradient            — static diagonal sweep, used by
 *                                         the `.ribbon-icon` class at rest
 *   - #brand-ribbon-gradient-animated   — SMIL-animated horizontal slide,
 *                                         used by `.ribbon-icon` on hover
 *
 * Pure server component — no client JS, no state. Just a static <svg>.
 */
export function RibbonDefs() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <defs>
        {/* Static — used by .ribbon-icon at rest. Diagonal sweep. */}
        <linearGradient id="brand-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="22%" stopColor="#fb7185" />
          <stop offset="44%" stopColor="#c084fc" />
          <stop offset="64%" stopColor="#60a5fa" />
          <stop offset="84%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* Animated — used by .ribbon-icon on hover. */}
        <linearGradient
          id="brand-ribbon-gradient-animated"
          x1="0"
          y1="0"
          x2="256"
          y2="0"
          gradientUnits="userSpaceOnUse"
          spreadMethod="repeat"
        >
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="22%" stopColor="#fb7185" />
          <stop offset="44%" stopColor="#c084fc" />
          <stop offset="64%" stopColor="#60a5fa" />
          <stop offset="84%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#fbbf24" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="0 0"
            to="256 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
