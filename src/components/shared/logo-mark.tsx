/**
 * Abstract CloudWeb mark — three independent nodes converging on one point,
 * standing in for AI / Software / Security resolving into a single engineered
 * system (see the site's closing "convergence" motif). Deliberately not a
 * cloud glyph. currentColor so it inherits context; the convergence point
 * alone carries the accent.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <line x1="6" y1="7" x2="16" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="26" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="7" y1="25" x2="16" y2="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="6" cy="7" r="2.25" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="26" cy="8" r="2.25" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="7" cy="25" r="2.25" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="16" cy="16" r="2.75" fill="var(--cw-accent)" />
    </svg>
  );
}
