"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SmoothLink } from "@/components/shared/smooth-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { Magnetic } from "@/components/shared/magnetic";
import { NAV_LINKS, CONTACT_LINK, SITE } from "@/lib/constants/nav";
import { cn } from "@/lib/utils";

/** Editorial numbered nav (doc §12) — "01 WORK" resting, arrow appears on
 *  hover rather than an underline, matching the doc's literal example. No
 *  theme toggle: theming is content-driven now, not visitor-controlled. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-500 ease-[var(--cw-ease)]",
          scrolled ? "border-b border-border bg-bg/80 py-3 backdrop-blur-md" : "border-b border-transparent py-6"
        )}
      >
        <nav className="cw-container flex items-center justify-between">
          <SmoothLink href="#top" className="cw-focus-ring flex items-center gap-2.5 rounded" data-cursor="view">
            <LogoMark className="size-5 text-text" />
            <span className="font-mono text-[13px] tracking-[0.28em] text-text uppercase">CloudWeb</span>
          </SmoothLink>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.href} strength={0.25}>
                <SmoothLink
                  href={link.href}
                  className="cw-focus-ring group flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-text"
                >
                  <span className="text-[10px] opacity-60">{link.index}</span>
                  {link.label}
                  <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 ease-[var(--cw-ease)] group-hover:w-3 group-hover:opacity-100">↗</span>
                </SmoothLink>
              </Magnetic>
            ))}
          </div>

          <div className="hidden items-center lg:flex">
            <Magnetic strength={0.25}>
              <SmoothLink
                href={CONTACT_LINK.href}
                data-cursor="view"
                className="cw-focus-ring group flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase"
              >
                Start
                <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">→</span>
              </SmoothLink>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="cw-focus-ring flex flex-col gap-1.5 rounded p-1 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="h-px w-6 bg-text" />
            <span className="h-px w-6 bg-text" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="cw-container flex items-center justify-between py-6">
              <span className="font-mono text-[13px] tracking-[0.28em] text-text uppercase">CloudWeb</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="cw-focus-ring rounded p-1 font-mono text-xs tracking-widest text-text-secondary uppercase" aria-label="Close menu">
                Close
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-5 px-8">
              {[...NAV_LINKS, CONTACT_LINK].map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-text-secondary">{link.index}</span>
                  <SmoothLink href={link.href} onClick={() => setMenuOpen(false)} className="cw-focus-ring block rounded text-5xl font-medium tracking-tight text-text">
                    {link.label}
                  </SmoothLink>
                </motion.div>
              ))}
            </div>
            <div className="cw-container flex items-center justify-between py-6 font-mono text-[10px] tracking-widest text-text-secondary uppercase">
              <span>{SITE.tagline}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
