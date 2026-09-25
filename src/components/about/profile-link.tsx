"use client";

import type { CSSProperties } from "react";
import { Magnetic } from "@/components/shared/magnetic";

export type ProfileLinkKind = "linkedin" | "portfolio";

/** A founder's outbound profile, set as a button rather than a text link —
 *  these are the page's main calls to action for a visitor who wants to know
 *  who they'd be working with.
 *
 *  Motion, in three layers:
 *  - entrance: rises in as it scrolls into view, staggered by `order` — a CSS
 *    scroll-driven animation (.cw-rise in globals.css), not a JS reveal. A JS
 *    reveal starts the button at opacity 0 and waits on script and animation
 *    frames, so a slow load or a background tab leaves the page's main calls
 *    to action invisible. This one is in the painted HTML from the start,
 *    and a browser without scroll timelines just shows it, unanimated;
 *  - idle: a slow sheen crosses it every few seconds, so it reads as live
 *    without a hover (CSS only — see .cw-sheen in globals.css);
 *  - hover and keyboard focus: pulls toward the pointer, fills with the
 *    accent from the left, and the icon and arrow move.
 *
 *  Under reduced motion the entrance and sheen are switched off in
 *  globals.css, and Magnetic falls back to static. */
export function ProfileLink({
  kind,
  label,
  href,
  owner,
  order = 0,
}: {
  kind: ProfileLinkKind;
  label: string;
  href: string;
  /** Whose profile this is, for the accessible name — the visible label alone
   *  repeats across the page. */
  owner: string;
  /** Position within its row, for the entrance stagger. */
  order?: number;
}) {
  return (
    <span className="cw-rise inline-block" style={{ "--cw-rise-order": order } as CSSProperties}>
      <Magnetic strength={0.25}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          aria-label={`${owner} — ${label}`}
          className="cw-focus-ring cw-sheen group relative inline-flex items-center gap-3 overflow-hidden rounded-sm border border-accent/50 bg-accent/[0.06] px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-bg focus-visible:border-accent focus-visible:text-bg"
        >
          {/* Accent fill that sweeps in from the left. */}
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--cw-ease)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
          />

          <span
            aria-hidden
            className="relative text-accent transition-[color,transform] duration-300 ease-[var(--cw-ease)] group-hover:scale-110 group-hover:text-bg group-focus-visible:text-bg"
          >
            {kind === "linkedin" ? <LinkedInIcon /> : <GlobeIcon />}
          </span>

          <span className="relative">{label}</span>

          <span
            aria-hidden
            className="relative transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
          >
            ↗
          </span>
        </a>
      </Magnetic>
    </span>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20" />
    </svg>
  );
}
