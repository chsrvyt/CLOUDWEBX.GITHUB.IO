"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface CoverflowItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const DEPTH = 220;
const ROTATION = 38;
/** Horizontal step between slides, as a percentage of the slide's own width
 *  rather than fixed pixels: slides are 260px on phones and 460px on desktop,
 *  and a fixed 300px step flung the side slides off a phone screen and made the
 *  whole page scroll sideways. 65% of 460px is the original desktop spacing. */
const SPACING_PCT = 65;
const SCALE_STEP = 0.14;
const MIN_SCALE = 0.55;
const MAX_VISIBLE = 2;
const AUTOPLAY_MS = 5000;
const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 500;

/** A coverflow carousel in the site's own language.
 *
 *  Built on the framer-motion already in the project rather than adding the
 *  `motion` package (the same library under its newer name — installing both
 *  would ship two copies), and styled with the site's tokens instead of
 *  pulling in a shadcn button, Radix Slot, cva and tw-animate-css for one
 *  widget. The interaction is the same: 3D perspective, drag to swipe, arrow
 *  keys, autoplay that pauses on hover, focus and tab-away.
 *
 *  Slides are announced through a live region, and every off-centre slide is
 *  hidden from assistive tech so a screen reader gets one image, not five. */
export function Coverflow({ items, label, className }: { items: CoverflowItem[]; label: string; className?: string }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  /** Functional updates throughout: the drag and keyboard handlers close over
   *  whatever `active` was when they were created, and a step relative to the
   *  previous value is always correct. */
  const goBy = useCallback(
    (delta: number) => setActive((prev) => ((prev + delta) % total + total) % total),
    [total]
  );

  useEffect(() => {
    if (reducedMotion || paused || total <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, total]);

  /** Don't keep cycling in a tab nobody is looking at. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBy(-1);
    }
  }

  function onDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) goBy(1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) goBy(-1);
  }

  const current = items[active];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      // overflow-x-clip, not hidden: it trims the peeking side slides at the
      // edge without making this a scroll container or clipping vertically.
      className={cn("cw-focus-ring relative w-full overflow-x-clip rounded select-none", className)}
      style={{ perspective: reducedMotion ? undefined : 1400 }}
    >
      <motion.div
        className="relative mx-auto flex h-[260px] items-center justify-center sm:h-[340px] lg:h-[420px]"
        drag={total > 1 && !reducedMotion ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((item, i) => {
          const offset = i - active;
          if (Math.abs(offset) > MAX_VISIBLE) return null;

          const isActive = offset === 0;
          const scale = Math.max(1 - Math.abs(offset) * SCALE_STEP, MIN_SCALE);

          return (
            <motion.figure
              key={item.id}
              aria-hidden={!isActive}
              className={cn(
                "absolute aspect-[4/3] w-[260px] overflow-hidden rounded-sm border bg-surface/40 sm:w-[360px] lg:w-[460px]",
                isActive ? "border-accent/50" : "border-border"
              )}
              style={{ transformStyle: "preserve-3d", zIndex: total - Math.abs(offset) }}
              animate={
                reducedMotion
                  ? { opacity: isActive ? 1 : 0, x: 0 }
                  : {
                      opacity: isActive ? 1 : 0.4,
                      rotateY: -offset * ROTATION,
                      scale,
                      x: `${offset * SPACING_PCT}%`,
                      z: -Math.abs(offset) * DEPTH,
                    }
              }
              transition={reducedMotion ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.12 }}
            >
              <Image
                src={item.src}
                alt={isActive ? item.alt : ""}
                fill
                draggable={false}
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 460px"
                className="object-cover"
                priority={i === 0}
              />
            </motion.figure>
          );
        })}
      </motion.div>

      <div className="mt-10 flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p aria-live="polite" className="font-mono text-[11px] tracking-[0.2em] text-text uppercase">
            {current.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{current.caption}</p>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <div className="flex gap-2">
            <CoverflowButton label="Previous slide" onClick={() => goBy(-1)}>
              ←
            </CoverflowButton>
            <CoverflowButton label="Next slide" onClick={() => goBy(1)}>
              →
            </CoverflowButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverflowButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      data-cursor="view"
      className="cw-focus-ring flex size-9 items-center justify-center rounded-sm border border-border-strong font-mono text-sm text-text-secondary transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-accent"
    >
      {children}
    </button>
  );
}
