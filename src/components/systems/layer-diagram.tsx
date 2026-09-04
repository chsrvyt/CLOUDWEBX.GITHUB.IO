"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { DiagramPanel, DiagramLegend } from "@/components/diagram/diagram-panel";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SYSTEMS_PREVIEW } from "@/lib/constants/systems";

const BAND = { x: 96, width: 300, height: 48, gap: 18, top: 22 };
const RAIL_X = 62;

function bandY(i: number) {
  return BAND.top + i * (BAND.height + BAND.gap);
}

/** The Systems section's visual: the stack a request actually descends, drawn
 *  as layers rather than as another left-to-right arrow chain. "Complex
 *  underneath, simple above" is a statement about depth, so the diagram is
 *  vertical — the application sits on top, data at the bottom, and the rail on
 *  the left shows how far down a request has travelled. */
export function LayerDiagram() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  useEffect(() => {
    if (reducedMotion || pinned !== null) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SYSTEMS_PREVIEW.length), 2200);
    return () => window.clearInterval(id);
  }, [reducedMotion, pinned]);

  const shown = pinned ?? active;
  const layer = SYSTEMS_PREVIEW[shown];
  const height = bandY(SYSTEMS_PREVIEW.length - 1) + BAND.height + BAND.top;

  function handleKeyDown(e: KeyboardEvent<SVGGElement>, i: number) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setPinned((current) => (current === i ? null : i));
  }

  return (
    <DiagramPanel
      status={`Request depth · ${layer.label.toLowerCase()}`}
      caption={pinned !== null ? "Pinned — select again to resume." : "Simple above. Complex underneath."}
      footer={<DiagramLegend items={SYSTEMS_PREVIEW} activeIndex={shown} />}
    >
      <svg
        viewBox={`0 0 440 ${height}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={`A request descending the stack: ${SYSTEMS_PREVIEW.map((l) => l.label).join(", then ")}. Currently showing ${layer.label}.`}
      >
        {/* Descent rail — full depth in hairline, travelled depth in accent. */}
        <line x1={RAIL_X} y1={bandY(0) + BAND.height / 2} x2={RAIL_X} y2={bandY(SYSTEMS_PREVIEW.length - 1) + BAND.height / 2} stroke="var(--cw-border)" strokeWidth={1} />
        <line
          x1={RAIL_X}
          y1={bandY(0) + BAND.height / 2}
          x2={RAIL_X}
          y2={bandY(shown) + BAND.height / 2}
          stroke="var(--cw-accent)"
          strokeWidth={1.5}
          className="transition-all duration-500 ease-[var(--cw-ease)]"
        />

        {SYSTEMS_PREVIEW.map((item, i) => {
          const y = bandY(i);
          const isLive = i === shown;
          const isPinned = pinned === i;
          const midY = y + BAND.height / 2;

          return (
            <g
              key={item.label}
              role="button"
              tabIndex={0}
              aria-pressed={isPinned}
              aria-label={`${item.label}. ${item.detail}`}
              onPointerEnter={() => setPinned(i)}
              onPointerLeave={() => setPinned(null)}
              onFocus={() => setPinned(i)}
              onBlur={() => setPinned(null)}
              onClick={() => setPinned((c) => (c === i ? null : i))}
              onKeyDown={(e) => handleKeyDown(e, i)}
              data-cursor="view"
              className="cursor-pointer outline-none"
            >
              {/* Rail marker for this layer. */}
              <circle
                cx={RAIL_X}
                cy={midY}
                r={isLive ? 5 : 3.5}
                fill={i <= shown ? "var(--cw-accent)" : "var(--cw-bg)"}
                stroke={i <= shown ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                strokeWidth={1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />
              <line
                x1={RAIL_X + 8}
                y1={midY}
                x2={BAND.x - 8}
                y2={midY}
                stroke={isLive ? "var(--cw-accent)" : "var(--cw-border)"}
                strokeWidth={1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />

              <rect
                x={BAND.x}
                y={y}
                width={BAND.width}
                height={BAND.height}
                rx={2}
                fill={isLive ? "var(--cw-surface)" : "transparent"}
                stroke={isLive ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                strokeWidth={1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />

              <text
                x={BAND.x + 16}
                y={midY + 3}
                className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isLive ? "fill-[var(--cw-accent)]" : "fill-[var(--cw-text)]"
                }`}
              >
                {item.label}
              </text>

              <text
                x={BAND.x + BAND.width - 16}
                y={midY + 3}
                textAnchor="end"
                className="fill-[var(--cw-text-secondary)] font-mono text-[9px] tracking-[0.2em] uppercase"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
    </DiagramPanel>
  );
}
