/** The small "01–05" index list down the Hero's right edge — a static
 *  position marker (Hero is section 01), not a full scroll-spy across the
 *  whole page; a decorative structural cue, matching the reference layout,
 *  not a functional in-page nav (that's the Navbar's job). */
export function SectionProgress({ active = 1, total = 5 }: { active?: number; total?: number }) {
  return (
    <div className="hidden flex-col items-end gap-4 lg:flex" aria-hidden>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span className={n === active ? "h-px w-3 bg-text" : "h-px w-3 bg-border-strong"} />
          <span className={n === active ? "font-mono text-[11px] text-text" : "font-mono text-[11px] text-text-secondary/50"}>
            {n.toString().padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
