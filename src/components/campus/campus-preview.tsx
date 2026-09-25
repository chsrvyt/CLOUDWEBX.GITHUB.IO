"use client";

import Link from "next/link";
import { CAMPUS, CAMPUS_FEATURES, CAMPUS_JOURNEY, CAMPUS_ROLES } from "@/lib/constants/campus";
import { ProductMock } from "@/components/campus/product-mock";
import { Reveal, RevealLines } from "@/lib/animations/reveal";
import { ScrambleOnView } from "@/lib/animations/scramble-text";
import { Magnetic } from "@/components/shared/magnetic";

/** Flagship product preview — an information panel plus a referral link out to
 *  campus.cloudwebx.in, not an embed of it. Takes section "01", the one number
 *  the existing sequence never used (Capabilities starts at 02), so the live
 *  product reads as the first chapter without renumbering everything below it.
 *
 *  Placed directly after the Introduction statement so a visitor meets a real
 *  shipped product before any service copy (doc §17 — prove what you build
 *  first), and composed as one strong visual + one strong message (doc §21)
 *  rather than another dense multi-block section. */
export function CampusPreview() {
  return (
    <section id="campus" className="cw-container border-t border-border py-24 md:py-32">
      <div className="cw-grid items-start">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
              <ScrambleOnView text="01 / Flagship Product" />
            </p>
          </Reveal>

          <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] font-semibold tracking-tight text-text">
            <RevealLines lines={[CAMPUS.name, { text: "Learning by doing.", className: "text-text-secondary" }]} />
          </h2>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">{CAMPUS.summary}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic strength={0.2}>
                <a
                  href={CAMPUS.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="cw-focus-ring group inline-flex items-center gap-3 rounded border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-accent"
                >
                  {CAMPUS.domain}
                  <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </Magnetic>

              <Link
                href="/campus"
                data-cursor="view"
                className="cw-focus-ring group inline-flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent"
              >
                Full overview
                <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">→</span>
              </Link>

              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {CAMPUS.status}
              </span>
            </div>
          </Reveal>
        </div>

        <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
          <Reveal delay={0.15}>
            <ProductMock />
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
        {CAMPUS_FEATURES.map((feature, i) => (
          <Reveal key={feature.index} delay={0.05 * i}>
            <div className="flex gap-4">
              <span className="mt-0.5 font-mono text-[10px] text-text-secondary">{feature.index}</span>
              <div>
                <h3 className="font-mono text-[11px] tracking-[0.2em] text-text uppercase">{feature.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">{feature.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">
            {CAMPUS_JOURNEY.map((step, i) => (
              <span key={step.index} className="flex items-center gap-3">
                {i > 0 && <span className="text-accent">→</span>}
                <span className="text-text">{step.title}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">{CAMPUS_ROLES.map((r) => r.name).join(" · ")}</p>
        </Reveal>
      </div>
    </section>
  );
}
