import { RevealLines, Reveal } from "@/lib/animations/reveal";
import { PILLARS } from "@/lib/constants/nav";

export function About() {
  return (
    <section id="about" className="relative cw-container border-t border-border py-24 md:py-32">
      <span className="cw-tick absolute top-8 right-6 hidden lg:block" aria-hidden />
      <div className="cw-grid">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Reveal>
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">09 / About</p>
          </Reveal>
          <h2 className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-tight text-text">
            <RevealLines lines={["We build what", { text: "should exist next.", className: "text-text-secondary" }]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
              CloudWebX is an engineering-focused technology company working across artificial intelligence, software engineering, cybersecurity and infrastructure.
            </p>
          </Reveal>
        </div>

        <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-3 lg:col-start-9 lg:mt-0">
          <Reveal delay={0.3}>
            <ul className="flex flex-col gap-3 border-t border-border pt-6">
              {PILLARS.map((p, i) => (
                <li key={p} className="flex items-baseline gap-3 font-mono text-sm tracking-[0.15em] text-text uppercase">
                  <span className="text-[10px] text-text-secondary">{(i + 1).toString().padStart(2, "0")}</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
