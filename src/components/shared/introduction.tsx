import { Reveal, RevealLines } from "@/lib/animations/reveal";

/** The "Statement" beat right after Hero (doc §49, position 02) — a brief
 *  bridge, not a numbered chapter of its own; no eyebrow, matching the
 *  reference layout where the next visible numbered section is Capabilities. */
export function Introduction() {
  return (
    <section className="cw-container py-28 md:py-36">
      <div className="cw-grid">
        <div className="col-span-4 md:col-span-8 md:col-start-1 lg:col-span-8">
          <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] font-semibold tracking-tight text-text">
            <RevealLines lines={["We turn complex problems", { text: "into intelligent systems.", className: "text-text-secondary" }]} />
          </h2>
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-3 lg:col-start-10">
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[11px] leading-relaxed tracking-[0.05em] text-text-secondary uppercase md:mt-0">
              From AI agents to cybersecurity and infrastructure, CloudWebX designs and engineers systems built for real-world complexity.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
