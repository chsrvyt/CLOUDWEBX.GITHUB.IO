import type { ReactNode } from "react";
import { CloudField, FieldLabel, type FieldVariant } from "@/components/cloud-field/cloud-field";
import { Reveal, RevealLines } from "@/lib/animations/reveal";
import { ScrambleOnView } from "@/lib/animations/scramble-text";
import { cn } from "@/lib/utils";

/** Shared shell for the 3 domain sections (Intelligence/Systems/Security) —
 *  slimmed from the old 7-instance version: no giant numeral watermark, and
 *  the background field is opt-in (`fieldVariant`) rather than always-on,
 *  since most sections should breathe per the "low visual density" rule. */
export function SystemSection({
  id,
  eyebrow,
  headline,
  copy,
  fieldVariant,
  fieldLabel,
  reverse = false,
  children,
}: {
  id: string;
  eyebrow: string;
  headline: string[];
  copy: string;
  fieldVariant?: FieldVariant;
  fieldLabel?: string;
  reverse?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative overflow-hidden border-t border-border py-24 md:py-32">
      {fieldVariant && (
        <div className="absolute inset-0 -z-10 opacity-30">
          <CloudField variant={fieldVariant} interactive={false} />
        </div>
      )}

      <span className="cw-tick absolute top-8 left-6 hidden lg:block" aria-hidden />

      <div className="cw-container">
        <div className="cw-grid">
          <div className={cn("relative col-span-4 md:col-span-8 lg:col-span-5", reverse && "lg:order-2 lg:col-start-8")}>
            <Reveal>
              <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
                <ScrambleOnView text={eyebrow} />
              </p>
            </Reveal>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] font-semibold tracking-tight text-text">
              <RevealLines lines={headline} />
            </h2>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">{copy}</p>
            </Reveal>
            {fieldLabel && <FieldLabel>{fieldLabel}</FieldLabel>}
          </div>

          <div className={cn("col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:mt-0", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
