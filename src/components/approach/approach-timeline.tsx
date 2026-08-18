import { APPROACH_STEPS } from "@/lib/constants/approach";
import { Reveal, RevealLines } from "@/lib/animations/reveal";

/** Horizontal timeline at desktop, vertical stacked list on mobile (doc
 *  §27) — two renderings of the same data rather than one layout
 *  awkwardly reflowing between breakpoints. */
export function ApproachTimeline() {
  return (
    <section id="approach" className="relative cw-container border-t border-border py-24 md:py-32">
      <span className="cw-tick absolute top-8 right-6 hidden lg:block" aria-hidden />

      <Reveal>
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">07 / Approach</p>
      </Reveal>
      <h2 className="mb-14 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] font-semibold tracking-tight text-text md:mb-16">
        <RevealLines lines={["Think first.", { text: "Build second.", className: "text-text-secondary" }]} />
      </h2>

      {/* Desktop: horizontal, index + dashed connector + title only. */}
      <ol className="hidden lg:flex lg:items-start">
        {APPROACH_STEPS.map((step, i) => (
          <li key={step.index} className={i > 0 ? "flex-1 border-t border-dashed border-border pt-6" : "flex-1 border-t border-border pt-6"}>
            <Reveal delay={i * 0.05}>
              <div className="pr-6">
                <span className="font-mono text-xs text-accent">{step.index}</span>
                <p className="mt-2 text-base font-semibold text-text">{step.title}</p>
                <p className="mt-2 max-w-[16ch] text-xs leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

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
