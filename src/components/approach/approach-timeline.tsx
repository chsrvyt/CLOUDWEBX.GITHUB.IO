"use client";

import { useState } from "react";
import { APPROACH_STEPS } from "@/lib/constants/approach";
import { Reveal, RevealLines } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

/** Approach as a process diagram at desktop, a stacked list on mobile (doc
 *  §27) — two renderings of the same data rather than one layout awkwardly
 *  reflowing between breakpoints.
 *
 *  The desktop rendering draws the rail the steps actually sit on, and closes
 *  it: the last step is "Evolve", so the diagram returns to the first rather
 *  than stopping at a sixth dot and implying the work ends there. */
export function ApproachTimeline() {
  const [active, setActive] = useState(APPROACH_STEPS.length - 1);

  const progress = ((active + 0.5) / APPROACH_STEPS.length) * 100;

  return (
    <section id="approach" className="relative cw-container border-t border-border py-24 md:py-32">
      <span className="cw-tick absolute top-8 right-6 hidden lg:block" aria-hidden />

      <Reveal>
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">07 / Approach</p>
      </Reveal>
      <h2 className="mb-14 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-semibold tracking-tight text-text md:mb-16">
        <RevealLines lines={["Think first.", { text: "Build second.", className: "text-text-secondary" }]} />
      </h2>

      {/* Desktop: the rail, its nodes, and the return arc that closes it. */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Rail — full span in hairline, travelled span in accent. */}
          <div className="absolute inset-x-0 top-0 h-px bg-border" aria-hidden />
          <div
            className="absolute top-0 left-0 h-px bg-accent transition-[width] duration-500 ease-[var(--cw-ease)]"
            style={{ width: `${progress}%` }}
            aria-hidden
          />

          <ol className="flex items-start">
            {APPROACH_STEPS.map((step, i) => {
              const reached = i <= active;
              return (
                <li key={step.index} className="relative flex-1">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={i === active}
                    data-cursor="view"
                    className="cw-focus-ring block w-full rounded pt-8 pr-6 text-left"
                  >
                    {/* Node sitting on the rail. */}
                    <span
                      className={cn(
                        "absolute top-0 left-0 block size-[9px] -translate-y-1/2 rounded-full border transition-all duration-500 ease-[var(--cw-ease)]",
                        reached ? "border-accent bg-accent" : "border-border-strong bg-bg",
                        i === active && "scale-125"
                      )}
                      aria-hidden
                    />
                    <span className={cn("font-mono text-xs transition-colors duration-300", i === active ? "text-accent" : "text-text-secondary")}>
                      {step.index}
                    </span>
                    <span className={cn("mt-2 block text-base font-semibold transition-colors duration-300", i === active ? "text-accent" : "text-text")}>
                      {step.title}
                    </span>
                    <span className="mt-2 block max-w-[18ch] text-xs leading-relaxed text-text-secondary">{step.description}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* The return arc: Evolve feeds back into Understand. Drawn edge to
            edge under the row so it reads as one continuous process. */}
        <div className="relative mt-8 h-14" aria-hidden>
          <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M 1190 0 L 1190 34 Q 1190 48 1176 48 L 24 48 Q 10 48 10 34 L 10 0"
              fill="none"
              stroke="var(--cw-border-strong)"
              strokeWidth={1}
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="absolute inset-x-0 bottom-0 translate-y-1/2 text-center">
            <span className="bg-bg px-3 font-mono text-[10px] tracking-[0.25em] text-text-secondary uppercase">Iterate</span>
          </span>
        </div>
      </div>

      {/* Mobile/tablet: vertical stacked list. */}
      <ol className="lg:hidden">
        {APPROACH_STEPS.map((step, i) => (
          <li key={step.index} className={i > 0 ? "border-t border-border" : undefined}>
            <Reveal delay={i * 0.05}>
              <div className="group flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-8">
                <span className="font-mono text-xs text-accent md:w-10">{step.index}</span>
                <span className="text-lg font-semibold text-text md:w-40">{step.title}</span>
                <p className="max-w-md text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
