"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { SECURITY_PREVIEW } from "@/lib/constants/systems";

const GATEWAY = { x: 200, y: 66 };
const SERVICE_A = { x: 96, y: 152 };
const SERVICE_B = { x: 304, y: 152 };
const DATA = { x: 200, y: 234 };
const INTERNET_Y = 16;

/** The system's own topology diagram, with a toggleable threat state (doc
 *  §25): one node isolates, its boundary line breaks, and the allowed path
 *  reroutes around it — told visually rather than with cyber-cliché imagery. */
export function SecurityDiagram() {
  const reducedMotion = useReducedMotion();
  const [threat, setThreat] = useState(false);

  return (
    <div className="rounded-sm border border-border bg-surface/40 p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
          {threat ? "Anomaly isolated · path rerouted" : "Normal operation"}
        </p>
        <button
          type="button"
          onClick={() => setThreat((t) => !t)}
          data-cursor="view"
          className="cw-focus-ring rounded font-mono text-[10px] tracking-[0.15em] text-accent uppercase transition-opacity hover:opacity-70"
        >
          {threat ? "Reset" : "Simulate threat"} →
        </button>
      </div>

      <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label="Request path from the internet through a gateway and services to data — a simulated anomaly isolates one service and reroutes traffic around it.">
        <line x1={200} y1={INTERNET_Y} x2={GATEWAY.x} y2={GATEWAY.y - 18} stroke="var(--cw-border-strong)" strokeWidth="1" />
        <line x1={GATEWAY.x - 24} y1={GATEWAY.y + 12} x2={SERVICE_A.x + 20} y2={SERVICE_A.y - 14} stroke="var(--cw-border-strong)" strokeWidth="1" />
        <line
          x1={GATEWAY.x + 24}
          y1={GATEWAY.y + 12}
          x2={SERVICE_B.x - 20}
          y2={SERVICE_B.y - 14}
          stroke={threat ? "var(--cw-accent)" : "var(--cw-border-strong)"}
          strokeWidth="1"
          strokeDasharray={threat ? "3 3" : undefined}
        />
        <line x1={SERVICE_A.x + 10} y1={SERVICE_A.y + 14} x2={DATA.x - 40} y2={DATA.y - 12} stroke="var(--cw-border-strong)" strokeWidth="1" />
        <line
          x1={SERVICE_B.x - 10}
          y1={SERVICE_B.y + 14}
          x2={DATA.x + 40}
          y2={DATA.y - 12}
          stroke={threat ? "var(--cw-accent)" : "var(--cw-border-strong)"}
          strokeWidth="1"
          strokeDasharray={threat ? "3 3" : undefined}
        />

        <text x={200} y={12} textAnchor="middle" className="fill-[var(--cw-text-secondary)] font-mono text-[9px] tracking-[0.2em] uppercase">Internet</text>

        <rect x={GATEWAY.x - 42} y={GATEWAY.y - 18} width="84" height="36" rx="2" fill="var(--cw-surface)" stroke="var(--cw-border-strong)" />
        <text x={GATEWAY.x} y={GATEWAY.y + 4} textAnchor="middle" className="fill-[var(--cw-text)] font-mono text-[9px] tracking-[0.15em] uppercase">Gateway</text>

        <rect x={SERVICE_A.x - 46} y={SERVICE_A.y - 14} width="92" height="34" rx="2" fill="var(--cw-surface)" stroke="var(--cw-border-strong)" />
        <text x={SERVICE_A.x} y={SERVICE_A.y + 4} textAnchor="middle" className="fill-[var(--cw-text)] font-mono text-[9px] tracking-[0.15em] uppercase">Service</text>

        <rect
          x={SERVICE_B.x - 46}
          y={SERVICE_B.y - 14}
          width="92"
          height="34"
          rx="2"
          fill="var(--cw-surface)"
          stroke={threat ? "var(--cw-accent)" : "var(--cw-border-strong)"}
          strokeDasharray={threat ? "3 3" : undefined}
          opacity={threat ? 0.5 : 1}
        />
        <text x={SERVICE_B.x} y={SERVICE_B.y + 4} textAnchor="middle" className={threat ? "fill-[var(--cw-accent)] font-mono text-[9px] tracking-[0.15em] uppercase" : "fill-[var(--cw-text)] font-mono text-[9px] tracking-[0.15em] uppercase"}>
          {threat ? "Isolated" : "Service"}
        </text>

        <rect x={DATA.x - 42} y={DATA.y - 16} width="84" height="36" rx="2" fill="var(--cw-surface)" stroke="var(--cw-border-strong)" />
        <text x={DATA.x} y={DATA.y + 5} textAnchor="middle" className="fill-[var(--cw-text)] font-mono text-[9px] tracking-[0.15em] uppercase">Data</text>

        {!reducedMotion && !threat && (
          <motion.circle
            r={3}
            fill="var(--cw-accent)"
            animate={{
              cx: [200, GATEWAY.x, SERVICE_A.x, DATA.x],
              cy: [INTERNET_Y, GATEWAY.y, SERVICE_A.y, DATA.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.8, times: [0, 0.3, 0.65, 1], ease: "easeInOut" }}
          />
        )}
        {!reducedMotion && threat && (
          <motion.circle
            r={3}
            fill="var(--cw-accent)"
            animate={{
              cx: [200, GATEWAY.x, SERVICE_A.x, DATA.x],
              cy: [INTERNET_Y, GATEWAY.y, SERVICE_A.y, DATA.y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.3, 0.65, 1], ease: "easeInOut" }}
          />
        )}
      </svg>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border pt-6 sm:grid-cols-2">
        {SECURITY_PREVIEW.map((step, i) => (
          <div key={step.label} className="flex gap-3">
            <span className="font-mono text-[10px] text-text-secondary">{(i + 1).toString().padStart(2, "0")}</span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-text uppercase">{step.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
