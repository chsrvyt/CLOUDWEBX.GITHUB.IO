import { PHILOSOPHY_POINTS } from "@/lib/constants/approach";
import { RevealLines, Reveal } from "@/lib/animations/reveal";

/** Pure typography, no visual (doc §28) — the one section with no
 *  CloudField, no tick marks, maximum whitespace; the small metadata list
 *  stays (locked decision) since it reinforces the site's big-type/tiny-
 *  metadata pairing rather than competing with the statement above it. */
export function Philosophy() {
  return (
    <section className="cw-container border-t border-border py-28 md:py-40">
      <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-semibold tracking-tight text-text">
        <RevealLines lines={["Complexity", "should exist", { text: "underneath.", className: "text-text-secondary" }]} />
      </h2>

      <Reveal delay={0.2}>
        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
          {PHILOSOPHY_POINTS.map((point) => (
            <li key={point.index} className="font-mono text-xs tracking-[0.2em] text-text-secondary uppercase">
              {point.index} / {point.title}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
