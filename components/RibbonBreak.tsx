"use client";

import { RibbonWave } from "./RibbonWave";

/**
 * Spectral section break — a single wavy ribbon flowing across the boundary
 * between two sections. Stroke mode (default) paints a thin spectral ribbon
 * over the boundary; color-split mode (pass `bgAbove` + `bgBelow`) makes the
 * wave the literal boundary between two section background colors.
 *
 *   <section className="relative">…<RibbonBreak seed="hero" /></section>
 */
export function RibbonBreak({
  seed,
  bgAbove,
  bgBelow,
}: {
  seed: string;
  bgAbove?: string;
  bgBelow?: string;
}) {
  const colorSplit = bgAbove != null && bgBelow != null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 bottom-0 h-0 z-10"
    >
      <RibbonWave
        seed={seed}
        amplitude={colorSplit ? 18 : 10}
        cycles={2.5}
        strokeWidth={2.5}
        duration="18s"
        opacity={0.75}
        yCenter={0}
        bgAbove={bgAbove}
        bgBelow={bgBelow}
      />
    </div>
  );
}
