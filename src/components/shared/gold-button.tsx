"use client";

import type { CSSProperties, ReactNode } from "react";
import { Magnetic } from "@/components/shared/magnetic";
import { SmoothLink } from "@/components/shared/smooth-link";
import { cn } from "@/lib/utils";

/** The site's primary call-to-action button — reserved for the few links a
 *  visitor is most meant to follow: starting a project, opening Campus, the
 *  founders' profiles. Used sparingly on purpose; if every button shines,
 *  none of them do.
 *
 *  Motion, in three layers:
 *  - idle: a golden sheen crosses it every few seconds, then rests
 *    (.cw-sheen in globals.css);
 *  - hover and keyboard focus: pulls toward the pointer, the accent sweeps
 *    in from the left, and the icon and arrow move;
 *  - entrance (opt-in via `rise`): rises in as it scrolls into view — a CSS
 *    scroll-driven animation (.cw-rise), never a JS reveal, so the button is
 *    in the painted HTML from the start and can't be left invisible by a slow
 *    load or a background tab. Leave it off above the fold, where there is
 *    nothing to scroll into.
 *
 *  Under reduced motion the sheen and entrance are switched off in
 *  globals.css, and Magnetic falls back to static. */
export function GoldButton({
  href,
  children,
  icon,
  arrow = "→",
  external = false,
  ariaLabel,
  rise = false,
  order = 0,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  /** ↗ for a destination that leaves the page, → for one that stays. */
  arrow?: "↗" | "→";
  /** Opens in a new tab. Internal links go through SmoothLink instead, so
   *  on-page fragments still scroll through Lenis. */
  external?: boolean;
  ariaLabel?: string;
  rise?: boolean;
  /** Position within a group of rising buttons, for the entrance stagger. */
  order?: number;
}) {
  const className =
    "cw-focus-ring cw-sheen group relative inline-flex items-center gap-3 overflow-hidden rounded-sm border border-accent/50 bg-accent/[0.06] px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-bg focus-visible:border-accent focus-visible:text-bg";

  const content = (
    <>
      {/* Accent fill that sweeps in from the left. */}
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--cw-ease)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      {icon && (
        <span
          aria-hidden
          className="relative text-accent transition-[color,transform] duration-300 ease-[var(--cw-ease)] group-hover:scale-110 group-hover:text-bg group-focus-visible:text-bg"
        >
          {icon}
        </span>
      )}

      <span className="relative">{children}</span>

      <span
        aria-hidden
        className={cn(
          "relative transition-transform duration-300 ease-[var(--cw-ease)]",
          arrow === "↗"
            ? "group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
            : "group-hover:translate-x-1 group-focus-visible:translate-x-1"
        )}
      >
        {arrow}
      </span>
    </>
  );

  const button = (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="view" aria-label={ariaLabel} className={className}>
          {content}
        </a>
      ) : (
        <SmoothLink href={href} data-cursor="view" aria-label={ariaLabel} className={className}>
          {content}
        </SmoothLink>
      )}
    </Magnetic>
  );

  if (!rise) return button;

  return (
    <span className="cw-rise inline-block" style={{ "--cw-rise-order": order } as CSSProperties}>
      {button}
    </span>
  );
}
