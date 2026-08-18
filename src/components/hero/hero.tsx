"use client";

import { motion } from "framer-motion";
import { GenerativeGlow } from "@/components/shared/generative-glow";
import { SmoothLink } from "@/components/shared/smooth-link";
import { Magnetic } from "@/components/shared/magnetic";
import { SectionProgress } from "@/components/hero/section-progress";
import { RevealLines } from "@/lib/animations/reveal";
import { ScrambleOnView } from "@/lib/animations/scramble-text";

/** Typographic cinematic hero (doc §09–§11) — no WebGL, no persistent node
 *  network. The whole reveal sequence (wordmark → metadata → headline →
 *  visual → CTA) settles in ~1s via staggered delays below, not a separate
 *  loading screen (removed) plus a second hero animation on top of it. */
export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-32 pb-16">
      <span className="cw-tick absolute top-24 left-6 hidden md:block" aria-hidden />

      <div className="cw-container relative z-10 w-full">
        <div className="cw-grid items-center">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase"
            >
              <ScrambleOnView text="AI / Software / Security" />
            </motion.p>

            <h1 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.94] font-semibold tracking-tight text-text">
              <RevealLines lines={["Intelligence,", { text: "engineered.", className: "text-text-secondary" }]} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.05em] text-text-secondary uppercase"
            >
              CloudWeb builds AI systems, software and secure infrastructure for organizations solving difficult problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <Magnetic strength={0.25}>
                <SmoothLink href="#contact" data-cursor="view" className="cw-focus-ring group flex items-center gap-2 rounded font-mono text-[11px] font-medium tracking-[0.15em] text-text uppercase">
                  Start a project
                  <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">↗</span>
                </SmoothLink>
              </Magnetic>
              <SmoothLink href="#capabilities" data-cursor="view" className="cw-focus-ring group flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-text">
                Explore capabilities
                <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-y-1">↓</span>
              </SmoothLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-4 col-start-1 row-start-1 mt-14 md:col-span-6 md:col-start-3 lg:col-span-4 lg:col-start-9 lg:row-start-auto lg:mt-0"
          >
            <GenerativeGlow variant="eclipse" className="w-full" />
          </motion.div>
        </div>
      </div>

      <div className="cw-container relative z-10 mt-14 flex items-end justify-between">
        <SmoothLink
          href="#capabilities"
          data-cursor="view"
          className="cw-focus-ring flex items-center gap-3 rounded-full border border-border-strong py-2 pr-5 pl-2 font-mono text-[10px] tracking-[0.25em] text-text-secondary uppercase transition-colors hover:border-accent hover:text-accent"
        >
          <span className="flex size-6 items-center justify-center rounded-full border border-border-strong text-[10px]">↓</span>
          Scroll
        </SmoothLink>
        <SectionProgress active={1} />
      </div>
    </section>
  );
}
