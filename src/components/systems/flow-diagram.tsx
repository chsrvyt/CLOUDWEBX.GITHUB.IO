"use client";

import { useId, useState } from "react";
import { motion } from "framer-motion";
import type { FlowStep } from "@/lib/constants/systems";
import { cn } from "@/lib/utils";

/**
 * Shared stepped-flow visualization — reused for AI, LLM, Agents and
 * Automation (Sections 16/17/18/22 of the brief share the same "sequence of
 * labeled stages" shape, just different data), instead of four bespoke diagrams.
 * One stage is always active (defaults to the first) so the detail copy isn't
 * fully hidden behind a hover nobody has triggered yet.
 */
export function FlowDiagram({ steps, direction = "vertical", loop = false }: { steps: FlowStep[]; direction?: "vertical" | "horizontal"; loop?: boolean }) {
  const [active, setActive] = useState(0);
  const idBase = useId();

  return (
    <div className={cn("relative", direction === "horizontal" && "overflow-x-auto")}>
      <ol className={cn(direction === "vertical" ? "flex flex-col" : "flex min-w-max flex-row gap-1")}>
        {steps.map((step, i) => {
          const isActive = active === i;
          return (
            <li key={step.label} className={cn(direction === "vertical" ? "relative border-l border-border pl-8" : "relative w-56 border-t border-border pt-6")}>
              {direction === "vertical" && (
                <span
                  className={cn(
                    "absolute top-1.5 -left-[5px] size-[9px] rounded-full border transition-colors duration-300",
                    isActive ? "border-accent bg-accent" : "border-border-strong bg-bg"
                  )}
                />
              )}
              <button
                type="button"
                aria-expanded={isActive}
                aria-controls={`${idBase}-${i}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="cw-focus-ring flex w-full items-baseline gap-4 rounded py-4 text-left"
              >
                <span className="font-mono text-[11px] text-text-secondary">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-300", isActive ? "text-accent" : "text-text")}>
                  {step.label}
                </span>
              </button>
              <motion.div
                id={`${idBase}-${i}`}
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="max-w-sm pb-5 text-sm leading-relaxed text-text-secondary">{step.detail}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
      {loop && (
        <p className="mt-4 pl-8 font-mono text-xs text-text-secondary" aria-hidden>
          ↺ back to {steps[0].label.toLowerCase()}
        </p>
      )}
    </div>
  );
}
