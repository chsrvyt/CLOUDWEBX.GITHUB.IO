"use client";

import { useState } from "react";
import { SmoothLink } from "@/components/shared/smooth-link";
import { DOMAINS } from "@/lib/constants/capabilities";
import { INTELLIGENCE_PREVIEW, SYSTEMS_PREVIEW, SECURITY_PREVIEW, type FlowStep } from "@/lib/constants/systems";
import { Reveal, RevealLines } from "@/lib/animations/reveal";
import { cn } from "@/lib/utils";

const PREVIEWS: FlowStep[][] = [INTELLIGENCE_PREVIEW, SYSTEMS_PREVIEW, SECURITY_PREVIEW];

/** Three large rows, one per domain (doc §14–§16) — replaces the old flat
 *  7-item list and its horizontal marquee. Hovering/focusing a row reveals
 *  a tiny inline flow preview beneath it rather than a side panel — the
 *  side-panel treatment is reserved for Selected Work instead. */
export function CapabilitiesList() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="capabilities" className="cw-container py-24 md:py-32">
      <div className="cw-grid">
        <div className="col-span-4 md:col-span-5">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">02 / Capabilities</p>
          </Reveal>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight">
            <RevealLines lines={["Three domains.", { text: "Endless possibilities.", className: "text-text-secondary" }]} />
          </h2>
        </div>

        <div className="col-span-4 mt-8 md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-3 lg:col-start-10">
          <Reveal delay={0.15}>
            <p className="font-mono text-[11px] leading-relaxed tracking-[0.05em] text-text-secondary uppercase">
              We design and engineer intelligent systems that combine AI, software and security to create real impact.
            </p>
            <SmoothLink href="#work" data-cursor="view" className="cw-focus-ring group mt-4 inline-flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase">
              Explore all
              <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">↗</span>
            </SmoothLink>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 border-t border-border md:mt-16">
        {DOMAINS.map((domain, i) => {
          const isActive = active === i;
          return (
            <div key={domain.href} className="border-b border-border">
              <SmoothLink
                href={domain.href}
                data-cursor="view"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="cw-focus-ring group grid grid-cols-[3rem_1fr_auto] items-center gap-4 rounded py-7 transition-colors duration-300 ease-[var(--cw-ease)] md:grid-cols-[4rem_1fr_20rem_auto] md:py-8"
              >
                <span className="font-mono text-sm text-text-secondary">{domain.index}</span>
                <span
                  className={cn(
                    "text-2xl font-medium tracking-tight text-text transition-transform duration-300 ease-[var(--cw-ease)] md:text-3xl",
                    isActive && "translate-x-2"
                  )}
                >
                  {domain.title}
                </span>
                <span className="col-span-3 hidden font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase md:col-span-1 md:block">
                  {domain.subItems.join(" / ")}
                </span>
                <span className={cn("font-mono text-sm text-text-secondary transition-all duration-300 ease-[var(--cw-ease)]", isActive && "translate-x-1 text-accent")}>↗</span>
              </SmoothLink>

              <div className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--cw-ease)]" style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}>
                <div className="min-h-0">
                  <div className="flex flex-wrap items-center gap-3 pb-7 pl-0 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase md:pl-20">
                    {PREVIEWS[i].map((step, j) => (
                      <span key={step.label} className="flex items-center gap-3">
                        {j > 0 && <span className="text-accent">→</span>}
                        {step.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
