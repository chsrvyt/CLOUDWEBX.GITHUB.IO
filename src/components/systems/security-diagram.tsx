"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { motion } from "framer-motion";
import { DiagramPanel, DiagramLegend } from "@/components/diagram/diagram-panel";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";
import { SECURITY_PREVIEW } from "@/lib/constants/systems";
import {
  SECURITY_EDGES,
  SECURITY_ENTRY,
  SECURITY_EXIT,
  SECURITY_NODES,
  SECURITY_VIEWBOX,
} from "@/lib/constants/security";

const NODE_BY_ID = new Map(SECURITY_NODES.map((n) => [n.id, n]));

/** The containment ring is drawn by animating its dash offset over an explicit
 *  circumference rather than Framer Motion's `pathLength`, which normalises the
 *  circle to one user unit and leaves a dasharray that renders half a ring. */
const RING_RADIUS = 18;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

/** Breadth-first walk of the mesh, skipping any isolated node. Returns the
 *  ids along the route, or an empty array when the graph admits none.
 *  Deliberately a real traversal: the reroute shown when a node is isolated
 *  is whatever the topology actually allows, not a second hardcoded path. */
function route(isolated: string | null): string[] {
  const blocked = (id: string) => id === isolated;
  const adjacency = new Map<string, string[]>();
  for (const [a, b] of SECURITY_EDGES) {
    if (!adjacency.has(a)) adjacency.set(a, []);
    if (!adjacency.has(b)) adjacency.set(b, []);
    adjacency.get(a)!.push(b);
    adjacency.get(b)!.push(a);
  }

  const cameFrom = new Map<string, string | null>([[SECURITY_ENTRY, null]]);
  const queue = [SECURITY_ENTRY];

  while (queue.length) {
    const current = queue.shift()!;
    if (current === SECURITY_EXIT) {
      const path: string[] = [];
      for (let at: string | null = current; at; at = cameFrom.get(at) ?? null) path.unshift(at);
      return path;
    }
    for (const next of adjacency.get(current) ?? []) {
      if (cameFrom.has(next) || blocked(next)) continue;
      cameFrom.set(next, current);
      queue.push(next);
    }
  }
  return [];
}

/** True when the edge joins two consecutive stops on the route — used to pick
 *  out the live path rather than styling every edge the same. */
function onRoute(path: string[], a: string, b: string) {
  for (let i = 0; i < path.length - 1; i++) {
    if ((path[i] === a && path[i + 1] === b) || (path[i] === b && path[i + 1] === a)) return true;
  }
  return false;
}

/** The system's own topology, and the section's one visual (doc §24–§25).
 *
 *  Three behaviours carry the "security is architecture" idea instead of
 *  cyber-cliché imagery: the mesh answers the pointer as it moves across it,
 *  isolating a node closes a boundary around it, and the request path is
 *  recomputed from the graph — so containment either reroutes traffic or
 *  visibly doesn't, and both are true outcomes rather than a scripted demo. */
export function SecurityDiagram() {
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const svgRef = useRef<SVGSVGElement>(null);
  const [isolated, setIsolated] = useState<string | null>(null);
  const [probed, setProbed] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const path = useMemo(() => route(isolated), [isolated]);
  const restingPath = useMemo(() => route(null), []);
  const rerouted = isolated !== null && path.join() !== restingPath.join();

  const isolatedNode = isolated ? NODE_BY_ID.get(isolated) : null;
  const probedNode = probed ? NODE_BY_ID.get(probed) : null;

  const status = !isolatedNode
    ? "Normal operation"
    : `${isolatedNode.label} isolated · path ${rerouted ? "rerouted" : "unaffected"}`;

  const caption = probedNode?.caption ?? isolatedNode?.caption ?? "Select a node to isolate it.";

  /** Nearest-node probe. The doc asks for a topology that responds to
   *  movement, so the mesh tracks the pointer rather than waiting for a
   *  click — skipped on touch, where there is no hover to respond to. */
  function handlePointerMove(e: ReactPointerEvent<SVGSVGElement>) {
    if (isTouch) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * SECURITY_VIEWBOX.width;
    const y = ((e.clientY - rect.top) / rect.height) * SECURITY_VIEWBOX.height;

    let nearest: string | null = null;
    let best = 60; // viewBox units — beyond this the pointer isn't near anything
    for (const node of SECURITY_NODES) {
      const distance = Math.hypot(node.x - x, node.y - y);
      if (distance < best) {
        best = distance;
        nearest = node.id;
      }
    }
    setProbed(nearest);
  }

  function toggle(id: string) {
    const node = NODE_BY_ID.get(id);
    if (!node || node.fixed) return;
    setIsolated((current) => (current === id ? null : id));
  }

  function handleKeyDown(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    toggle(id);
  }

  return (
    <DiagramPanel
      status={status}
      caption={caption}
      action={
        isolated ? (
          <button
            type="button"
            onClick={() => setIsolated(null)}
            data-cursor="view"
            className="cw-focus-ring shrink-0 rounded font-mono text-[10px] tracking-[0.15em] text-accent uppercase transition-opacity hover:opacity-70"
          >
            Restore →
          </button>
        ) : undefined
      }
      footer={<DiagramLegend items={SECURITY_PREVIEW} />}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SECURITY_VIEWBOX.width} ${SECURITY_VIEWBOX.height}`}
        className="w-full overflow-visible"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setProbed(null)}
        role="img"
        aria-label={`Request topology from ingress to data. ${status}. Route: ${path.map((id) => NODE_BY_ID.get(id)?.label).join(" to ")}.`}
      >
        {SECURITY_EDGES.map(([a, b]) => {
          const from = NODE_BY_ID.get(a)!;
          const to = NODE_BY_ID.get(b)!;
          const severed = a === isolated || b === isolated;
          const live = onRoute(path, a, b);
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={severed ? "var(--cw-accent-dim)" : live ? "var(--cw-accent)" : "var(--cw-border)"}
              strokeWidth={live ? 1.5 : 1}
              strokeDasharray={severed ? "2 4" : undefined}
              className="transition-all duration-500 ease-[var(--cw-ease)]"
            />
          );
        })}

        {SECURITY_NODES.map((node) => {
          const isIsolated = node.id === isolated;
          const isProbed = node.id === probed && !isIsolated;
          const isFocused = node.id === focused;
          const isLive = path.includes(node.id);
          const interactive = !node.fixed;

          return (
            <g
              key={node.id}
              role={interactive ? "button" : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-pressed={interactive ? isIsolated : undefined}
              aria-label={interactive ? `${node.label}. ${node.caption} ${isIsolated ? "Isolated." : "Active."}` : undefined}
              onClick={interactive ? () => toggle(node.id) : undefined}
              onKeyDown={interactive ? (e) => handleKeyDown(e, node.id) : undefined}
              onFocus={interactive ? () => setFocused(node.id) : undefined}
              onBlur={interactive ? () => setFocused(null) : undefined}
              data-cursor={interactive ? "view" : undefined}
              /* No CSS outline: a rectangle around a dot in a hairline diagram
                 reads as damage. The accent ring above is the focus indicator. */
              className={interactive ? "cursor-pointer outline-none" : undefined}
            >
              {/* Generous invisible hit area — the visible dot is far smaller
                  than a comfortable target, on a pointer or a fingertip. */}
              <circle cx={node.x} cy={node.y} r={26} fill="transparent" />

              {/* The boundary closing around an isolated node. */}
              {isIsolated && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={RING_RADIUS}
                  fill="none"
                  stroke="var(--cw-accent)"
                  strokeWidth={1}
                  strokeDasharray={RING_CIRCUMFERENCE}
                  initial={reducedMotion ? false : { strokeDashoffset: RING_CIRCUMFERENCE, opacity: 0 }}
                  animate={{ strokeDashoffset: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              )}

              {/* The pointer's own read on the mesh — and, when the node is
                  reached by keyboard, its focus indicator, in the accent so it
                  is unmistakably stronger than a passing hover. */}
              {(isProbed || isFocused) && !isIsolated && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={13}
                  fill="none"
                  stroke={isFocused ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                  strokeWidth={isFocused ? 1.5 : 1}
                  initial={reducedMotion ? false : { scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={isIsolated ? 4 : 6}
                fill={isIsolated ? "var(--cw-bg)" : isLive ? "var(--cw-accent)" : "var(--cw-bg)"}
                stroke={isIsolated ? "var(--cw-accent)" : isLive ? "var(--cw-accent)" : "var(--cw-border-strong)"}
                strokeWidth={1}
                className="transition-all duration-500 ease-[var(--cw-ease)]"
              />

              <text
                x={node.x}
                y={node.labelY}
                textAnchor="middle"
                className={`font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isIsolated ? "fill-[var(--cw-accent)]" : isProbed || isLive ? "fill-[var(--cw-text)]" : "fill-[var(--cw-text-secondary)]"
                }`}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* The request itself, walking whichever route the graph currently
            allows. Keyed on the route so it restarts when one is recomputed. */}
        {!reducedMotion && path.length > 1 && (
          <motion.circle
            key={path.join("-")}
            r={3}
            fill="var(--cw-accent)"
            /* Framer Motion owns cx/cy once it animates them, and renders both
               as "undefined" until the first frame unless given an explicit
               initial — a plain attribute is not enough. */
            initial={{ cx: NODE_BY_ID.get(path[0])!.x, cy: NODE_BY_ID.get(path[0])!.y, opacity: 0 }}
            animate={{
              cx: path.map((id) => NODE_BY_ID.get(id)!.x),
              cy: path.map((id) => NODE_BY_ID.get(id)!.y),
              opacity: path.map((_, i) => (i === 0 || i === path.length - 1 ? 0 : 1)),
            }}
            transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" }}
          />
        )}
      </svg>
    </DiagramPanel>
  );
}
