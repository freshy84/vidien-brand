"use client";

import { useEffect, useId, useState } from "react";

/**
 * Spectral wave divider. Two modes:
 *
 *   1. Stroke mode (default): a smooth wavy line stroked with the brand
 *      gradient, painted over whatever bg sits underneath via
 *      mix-blend-mode: screen. Used between sections of the same bg color.
 *
 *   2. Color-split mode (when `bgAbove` and `bgBelow` are set): the wave IS
 *      the boundary between two section background colors — the SVG paints
 *      above the wave path with `bgAbove` and below with `bgBelow`.
 *
 * Per-wave variation via the `seed` prop: a deterministic string→PRNG hash
 * drives jitter on amplitude, cycles, duration, yCenter and lopsidedness.
 * Same seed → identical render (no hydration mismatch).
 */

interface RibbonWaveProps {
  amplitude?: number;
  cycles?: number;
  strokeWidth?: number;
  duration?: string;
  reverse?: boolean;
  opacity?: number;
  yCenter?: number;
  seed?: string;
  bgAbove?: string;
  bgBelow?: string;
  mixBlendMode?: React.CSSProperties["mixBlendMode"];
}

/** String → seeded PRNG (mulberry32 over an fnv1a hash). Deterministic. */
function makePRNG(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function parseDuration(d: string): number {
  const m = d.trim().match(/^([\d.]+)\s*s$/i);
  return m ? parseFloat(m[1]) : 12;
}

export function RibbonWave({
  amplitude = 8,
  cycles = 2.5,
  strokeWidth = 2,
  duration = "12s",
  reverse = false,
  opacity = 0.7,
  yCenter = 8,
  seed,
  bgAbove,
  bgBelow,
  mixBlendMode,
}: RibbonWaveProps) {
  const gradientId = `rw-${useId().replace(/:/g, "")}`;

  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  const colorSplit = bgAbove != null && bgBelow != null;
  const effectiveBlend: React.CSSProperties["mixBlendMode"] =
    mixBlendMode ?? (colorSplit ? "normal" : "screen");
  const effectiveOpacity = colorSplit ? 1 : opacity;

  const rand = seed ? makePRNG(seed) : null;
  const jit = (spread: number) => (rand ? 1 + (rand() - 0.5) * spread : 1);
  const offset = (range: number) => (rand ? (rand() - 0.5) * range : 0);

  const jAmplitude = amplitude * jit(0.3);
  const jCycles = cycles * jit(0.25);
  const jDurationSec = parseDuration(duration) * jit(0.3);
  const jYCenter = yCenter + offset(4);

  const upPeakMult = rand ? 0.78 + rand() * 0.44 : 1;
  const downPeakMult = rand ? 0.78 + rand() * 0.44 : 1;

  const w = 1200;
  const pad = strokeWidth + 2;
  const maxPeak = jAmplitude * Math.max(upPeakMult, downPeakMult);
  const h = maxPeak * 2 + pad * 2;
  const cy = h / 2;

  const cycleWidth = w / jCycles;
  const halfCycle = cycleWidth / 2;

  const pathStartX = -cycleWidth;
  const pathEndX = w + cycleWidth;
  const pathHalves = Math.round((pathEndX - pathStartX) / halfCycle);

  let waveD = `M ${pathStartX} ${cy}`;
  for (let i = 0; i < pathHalves; i++) {
    const endX = pathStartX + (i + 1) * halfCycle;
    const peakX = endX - halfCycle / 2;
    const isUp = i % 2 === 0;
    const mult = isUp ? upPeakMult : downPeakMult;
    const peakY = cy + (isUp ? -1 : 1) * jAmplitude * mult;
    const controlY = 2 * peakY - cy;
    waveD += ` Q ${peakX} ${controlY}, ${endX} ${cy}`;
  }

  const topRegionD = `${waveD} L ${pathEndX} 0 L ${pathStartX} 0 Z`;
  const bottomRegionD = `${waveD} L ${pathEndX} ${h} L ${pathStartX} ${h} Z`;

  const jDuration = `${jDurationSec.toFixed(2)}s`;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: jYCenter - cy,
        width: "100%",
        height: h,
        opacity: effectiveOpacity,
        mixBlendMode: effectiveBlend,
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          x2={cycleWidth}
          y1="0"
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
          {animate && (
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from={reverse ? `${cycleWidth} 0` : "0 0"}
              to={reverse ? "0 0" : `${cycleWidth} 0`}
              dur={jDuration}
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>

      <g>
        {colorSplit && (
          <>
            <path d={topRegionD} fill={bgAbove} />
            <path d={bottomRegionD} fill={bgBelow} />
          </>
        )}
        <path
          d={waveD}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to={reverse ? `${-cycleWidth} 0` : `${cycleWidth} 0`}
            dur={jDuration}
            repeatCount="indefinite"
            additive="replace"
          />
        )}
      </g>
    </svg>
  );
}
