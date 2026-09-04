import type { Metadata } from "next";
import { SmoothLink } from "@/components/shared/smooth-link";
import { NAV_LINKS, CONTACT_LINK, SITE } from "@/lib/constants/nav";
import { CAMPUS } from "@/lib/constants/campus";

export const metadata: Metadata = {
  // The root layout's template appends "| CloudWeb" — don't repeat it here.
  title: "404 — Page not found",
  description: "That page doesn't exist. Everything CloudWeb builds is one level up.",
};

/** Custom 404. Written in the site's own language — the mono status line, the
 *  numbered index, the oversized headline — rather than a stock error page,
 *  and it does the one useful thing an error page can: hand back every route
 *  that does exist instead of a lone "go home" button. */
export default function NotFound() {
  return (
    <section className="cw-container flex min-h-screen flex-col justify-center py-32">
      <span className="cw-tick absolute top-28 left-6 hidden lg:block" aria-hidden />

      <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">Error / 404</p>

      <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.94] font-semibold tracking-tight text-text">
        No route
        <span className="block text-text-secondary">to that page.</span>
      </h1>

      <p className="mt-8 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.05em] text-text-secondary uppercase">
        The address resolved, the page did not. Everything CloudWeb builds is listed below.
      </p>

      <nav aria-label="Site sections" className="mt-16 border-t border-border">
        {[...NAV_LINKS, CONTACT_LINK].map((link) => (
          <SmoothLink
            key={link.href}
            href={link.href}
            data-cursor="view"
            className="cw-focus-ring group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors duration-300 ease-[var(--cw-ease)] hover:bg-surface/40"
          >
            <span className="font-mono text-sm text-text-secondary">{link.index}</span>
            <span className="text-xl font-medium tracking-tight text-text transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-2 md:text-2xl">
              {link.label}
            </span>
            <span className="font-mono text-sm text-text-secondary transition-all duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:text-accent">
              →
            </span>
          </SmoothLink>
        ))}
      </nav>

      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <a
          href={CAMPUS.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="cw-focus-ring group inline-flex items-center gap-3 rounded border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-accent"
        >
          {CAMPUS.domain}
          <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </a>

        <a
          href={`mailto:${SITE.email}`}
          className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-accent"
        >
          {SITE.email}
        </a>
      </div>
    </section>
  );
}
