"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { DiagramPanel, DiagramLegend } from "@/components/diagram/diagram-panel";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { AGENT_LOOP } from "@/lib/constants/systems";

const CENTER = { x: 220, y: 152 };
const RADIUS = 92;

/** Four stages on a circle, starting at the top and running clockwise. The
 *  loop is drawn as an actual closed cycle rather than a list with a "back to
 *  observe" note underneath it — the point of an agent loop is that it has no
 *  last step, and a straight list cannot say that (doc §23). */
const ANGLES = [-90, 0, 90, 180];

function pointAt(angleDeg: number, radius = RADIUS) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER.x + radius * Math.cos(rad), y: CENTER.y + radius * Math.sin(rad) };
}

/** Arc along the circle from one stage to the next, clockwise. */
function arcBetween(fromAngle: number, toAngle: number) {
  const from = pointAt(fromAngle);
  const to = pointAt(toAngle);
  return `M ${from.x} ${from.y} A ${RADIUS} ${RADIUS} 0 0 1 ${to.x} ${to.y}`;
}

const LABEL_ANCHOR = ["middle", "start", "middle", "end"] as const;
const LABEL_RADIUS = RADIUS + 30;

export function AgentLoopDiagram() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);

  /** The loop advances on its own so the cycle is legible at a glance, and
   *  parks wherever the visitor points — driven by a timer rather than a
   *  frame loop, since nothing here is animated per-frame. */
  useEffect(() => {
    if (reducedMotion || pinned !== null) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % AGENT_LOOP.length), 2400);
    return () => window.clearInterval(id);
  }, [reducedMotion, pinned]);

  const shown = pinned ?? active;
  const step = AGENT_LOOP[shown];

  function handleKeyDown(e: KeyboardEvent<SVGGElement>, i: number) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setPinned((current) => (current === i ? null : i));
  }

  return (
    <DiagramPanel
      status={`Agent loop · ${step.label.toLowerCase()}`}
      caption={pinned !== null ? "Pinned — select again to resume." : "A closed cycle. No last step."}
      footer={<DiagramLegend items={AGENT_LOOP} activeIndex={shown} />}
    >
      <svg
        viewBox="0 0 440 300"
        className="w-full overflow-visible"
        role="img"
        aria-label={`Agent loop: ${AGENT_LOOP.map((s) => s.label).join(", then ")}, then back to ${AGENT_LOOP[0].label}. Currently showing ${step.label}.`}
      >
        <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="none" stroke="var(--cw-border)" strokeWidth={1} />

        {ANGLES.map((angle, i) => {
          const next = ANGLES[(i + 1) % ANGLES.length];
          const isLive = i === shown;
          const midAngle = angle + 45;
          const head = pointAt(midAngle);
          return (
            <g key={`arc-${i}`}>
              <path
                d={arcBetween(angle, next)}
                fill="none"
                stroke={isLive ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                strokeWidth={isLive ? 1.5 : 1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />
              {/* Direction marker at the arc's midpoint, turned along the tangent. */}
              <path
                d="M -4 -3.5 L 4 0 L -4 3.5 Z"
                fill={isLive ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                transform={`translate(${head.x} ${head.y}) rotate(${midAngle + 90})`}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />
            </g>
          );
        })}

        {ANGLES.map((angle, i) => {
          const node = pointAt(angle);
          const label = pointAt(angle, LABEL_RADIUS);
          const isLive = i === shown;
          const isPinned = pinned === i;
          return (
            <g
              key={AGENT_LOOP[i].label}
              role="button"
              tabIndex={0}
              aria-pressed={isPinned}
              aria-label={`${AGENT_LOOP[i].label}. ${AGENT_LOOP[i].detail}`}
              onPointerEnter={() => setPinned(i)}
              onPointerLeave={() => setPinned(null)}
              onFocus={() => setPinned(i)}
              onBlur={() => setPinned(null)}
              onClick={() => setPinned((c) => (c === i ? null : i))}
              onKeyDown={(e) => handleKeyDown(e, i)}
              data-cursor="view"
              className="cursor-pointer outline-none"
            >
              <circle cx={node.x} cy={node.y} r={24} fill="transparent" />
              {isLive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={13}
                  fill="none"
                  stroke="var(--cw-accent-dim)"
                  strokeWidth={1}
                  className="transition-all duration-500 ease-[var(--cw-ease)]"
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill={isLive ? "var(--cw-accent)" : "var(--cw-bg)"}
                stroke={isLive ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                strokeWidth={1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />
              <text
                x={label.x}
                y={label.y + 3}
                textAnchor={LABEL_ANCHOR[i]}
                className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isLive ? "fill-[var(--cw-accent)]" : "fill-[var(--cw-text-secondary)]"
                }`}
              >
                {AGENT_LOOP[i].label}
              </text>
            </g>
          );
        })}

        <text
          x={CENTER.x}
          y={CENTER.y + 4}
          textAnchor="middle"
          className="fill-[var(--cw-text-secondary)] font-mono text-[9px] tracking-[0.25em] uppercase"
        >
          {String(shown + 1).padStart(2, "0")} / {String(AGENT_LOOP.length).padStart(2, "0")}
        </text>
      </svg>
    </DiagramPanel>
  );
}
