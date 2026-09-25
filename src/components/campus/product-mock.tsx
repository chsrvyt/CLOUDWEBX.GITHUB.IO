"use client";

import { useEffect, useState } from "react";
import { CAMPUS_MODES, CAMPUS_SNIPPET, CAMPUS_SNIPPET_NOTE } from "@/lib/constants/campus";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

/** A still of Campus's own lesson view — the mode strip and the step-through
 *  debugger, which are the product's signature — rather than a generic glow
 *  panel, so a preview shows what the visitor would actually be clicking
 *  through to. Shared by the home-page preview and the Campus page.
 *
 *  Decorative: the real thing is one link away, so it's hidden from assistive
 *  tech instead of being announced as a fake code sample. */
export function ProductMock() {
  const reducedMotion = useReducedMotion();
  const [activeLine, setActiveLine] = useState(2);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setActiveLine((line) => (line % CAMPUS_SNIPPET.length) + 1);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div aria-hidden className="overflow-hidden rounded-sm border border-border bg-surface/40">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
        <span>campus · While Loop</span>
        <span className="text-accent">Try</span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-border px-4 py-3 font-mono text-[10px] tracking-[0.15em] uppercase">
        {CAMPUS_MODES.map((mode) => (
          <span key={mode} className={cn(mode === "Try" ? "text-text" : "text-text-secondary/70")}>
            {mode}
          </span>
        ))}
      </div>

      <div className="px-4 py-5 font-mono text-[12px] leading-relaxed md:text-[13px]">
        {CAMPUS_SNIPPET.map((row) => {
          const isActive = row.line === activeLine;
          return (
            <div
              key={row.line}
              className={cn(
                "flex gap-4 border-l-2 px-2 py-1 transition-colors duration-500 ease-[var(--cw-ease)]",
                isActive ? "border-accent bg-accent-dim/25 text-text" : "border-transparent text-text-secondary"
              )}
            >
              <span className={cn("w-3 shrink-0 text-right", isActive ? "text-accent" : "text-text-secondary/60")}>{row.line}</span>
              <span className="whitespace-pre">{row.code}</span>
            </div>
          );
        })}
      </div>

      <p className="border-t border-border px-4 py-4 text-xs leading-relaxed text-text-secondary">{CAMPUS_SNIPPET_NOTE}</p>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
        <span className="size-1.5 rounded-full bg-accent" />
        2 / 2 sample tests passed
      </div>
    </div>
  );
}
