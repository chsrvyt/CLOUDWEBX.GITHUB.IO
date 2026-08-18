"use client";

import { useState } from "react";
import { WORK_ITEMS } from "@/lib/constants/work";
import { GenerativeGlow } from "@/components/shared/generative-glow";
import { Reveal, RevealLines } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

/** Selected Work, moved up to position 04 right after Capabilities (doc
 *  §17–§19) — a numbered accordion list beside one large shared visual
 *  panel, rather than per-item cards or per-item preview swapping. Still
 *  explicitly labeled conceptual (see lib/constants/work.ts) — no
 *  fabricated client work. */
export function WorkList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="work" className="cw-container border-t border-border py-24 md:py-32">
      <div className="cw-grid">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">03 / Selected Work</p>
          </Reveal>
          <h2 className="mb-14 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight md:mb-16">
            <RevealLines lines={["Real systems.", { text: "Real impact.", className: "text-text-secondary" }]} />
          </h2>

          <div className="border-t border-border">
            {WORK_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.index} className="border-b border-border">
                  <button
                    type="button"
                    data-cursor="view"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="cw-focus-ring group flex w-full items-start gap-5 rounded py-7 text-left transition-colors md:py-8"
                  >
                    <span className={cn("mt-1 font-mono text-xs text-text-secondary transition-colors", isOpen && "text-accent")}>{item.index} —</span>
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">{item.tags}</span>
                      <span
                        className={cn(
                          "mt-1 block text-xl font-semibold tracking-tight text-text transition-colors md:text-2xl",
                          isOpen && "text-accent"
                        )}
                      >
                        {item.title}
                      </span>
                      <div className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--cw-ease)]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                        <div className="min-h-0">
                          <p className="max-w-md pt-4 pb-1 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                          <span className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-text uppercase">
                            View project
                            <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">↗</span>
                          </span>
                        </div>
                      </div>
                    </span>
                    <span
                      className={cn(
                        "mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-xs text-text-secondary transition-transform duration-300 ease-[var(--cw-ease)]",
                        isOpen && "rotate-45 border-accent text-accent"
                      )}
                    >
                      +
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-4 mt-14 hidden md:col-span-8 md:block lg:col-span-4 lg:col-start-9 lg:mt-0">
          <div className="sticky top-32 aspect-[4/5] overflow-hidden rounded-sm border border-border bg-surface/40">
            <GenerativeGlow variant="nebula" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
