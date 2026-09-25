import type { ReactNode } from "react";
import { Footer } from "@/components/footer/footer";
import type { LegalBlock, LegalSection } from "@/lib/constants/legal";

/** Shared chrome for the legal routes. Long legal copy has different needs
 *  from the marketing page — a measured column, a contents list you can jump
 *  from, and no scroll-triggered reveals, because text you are trying to read
 *  should not be waiting on an animation. */
export function LegalPage({
  eyebrow,
  title,
  lede,
  meta,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* relative: the tick is absolutely positioned and would otherwise
          anchor to the viewport and land on top of the copy. */}
      <section className="relative cw-container pt-40 pb-16 md:pt-48">
        <span className="cw-tick absolute top-32 left-6 hidden lg:block" aria-hidden />

        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">{eyebrow}</p>

        <h1 className="font-display max-w-4xl text-[clamp(2.5rem,6.5vw,5rem)] leading-[0.98] font-semibold tracking-tight text-text">
          {title}
        </h1>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">{lede}</p>

        {meta && (
          <p className="mt-6 border-t border-border pt-6 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">{meta}</p>
        )}
      </section>

      <div className="cw-container pb-32">{children}</div>

      <Footer />
    </>
  );
}

/** A jump list for one document's sections. */
export function LegalContents({ sections, idPrefix, label }: { sections: LegalSection[]; idPrefix: string; label: string }) {
  return (
    <nav aria-label={label} className="mb-14 border-t border-border">
      <p className="py-5 font-mono text-[10px] tracking-[0.25em] text-text-secondary uppercase">Contents</p>
      <ol className="grid grid-cols-1 gap-x-10 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <li key={section.number}>
            {/* A plain anchor, not SmoothLink: these targets are on THIS page,
                and SmoothLink rewrites bare fragments to /#… for the shared
                nav, whose sections live on the home page. That rewrite would
                send every contents entry to the home page instead. */}
            <a
              href={`#${idPrefix}-${section.number}`}
              className="cw-focus-ring group flex gap-3 rounded py-2 font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-accent"
            >
              <span className="w-6 shrink-0 text-right opacity-60">{section.number}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        Array.isArray(block) ? (
          <ul key={i} className="mt-4 flex flex-col gap-2.5">
            {block.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                <span className="mt-[0.45rem] size-1 shrink-0 rounded-full bg-accent-dim" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p key={i} className="mt-4 text-sm leading-relaxed text-text-secondary first:mt-0">
            {block}
          </p>
        )
      )}
    </>
  );
}

/** One document: an optional preamble, then its numbered sections. */
export function LegalDocument({
  id,
  heading,
  version,
  intro,
  sections,
  idPrefix,
}: {
  id: string;
  heading: string;
  version?: string;
  intro?: LegalBlock[];
  sections: LegalSection[];
  idPrefix: string;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="border-t border-border pt-10">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-semibold tracking-tight text-text">{heading}</h2>
        {version && <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">{version}</p>}
      </div>

      {intro && (
        <div className="mt-8 max-w-2xl border-l border-border-strong pl-6">
          <Blocks blocks={intro} />
        </div>
      )}

      <div className="mt-14">
        <LegalContents sections={sections} idPrefix={idPrefix} label={`${heading} contents`} />

        <ol>
          {sections.map((section) => (
            <li key={section.number} id={`${idPrefix}-${section.number}`} className="scroll-mt-28 border-t border-border py-10">
              <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-[6rem_1fr]">
                <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{section.number}</p>
                <div className="mt-3 max-w-2xl lg:mt-0">
                  <h3 className="font-mono text-[11px] tracking-[0.2em] text-text uppercase">{section.title}</h3>
                  <div className="mt-4">
                    <Blocks blocks={section.blocks} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
