import type { ReactNode } from "react";

/** Shared chrome for the site's system diagrams: one bordered panel, a status
 *  line, a caption under it, an optional action and an optional footer rail.
 *
 *  Extracted so Intelligence, Systems and Security read as one family rather
 *  than three visual dialects — the diagrams differ in what they show, not in
 *  how they are framed. */
export function DiagramPanel({
  status,
  caption,
  action,
  children,
  footer,
}: {
  status: string;
  caption?: string;
  action?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-sm border border-border bg-bg/60 p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p aria-live="polite" className="font-mono text-[10px] tracking-[0.15em] text-text uppercase">
            {status}
          </p>
          {caption && (
            <p className="mt-1.5 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-text-secondary uppercase">{caption}</p>
          )}
        </div>
        {action}
      </div>

      {children}

      {footer && <div className="mt-8 border-t border-border pt-6">{footer}</div>}
    </div>
  );
}

/** The label/detail rail used beneath several diagrams — a numbered list of the
 *  same stages the diagram draws, so the copy is readable without hovering. */
export function DiagramLegend({ items, activeIndex }: { items: { label: string; detail: string }[]; activeIndex?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={item.label} className="flex gap-3">
          <span className={`font-mono text-[10px] transition-colors duration-300 ${i === activeIndex ? "text-accent" : "text-text-secondary"}`}>
            {(i + 1).toString().padStart(2, "0")}
          </span>
          <div>
            <p
              className={`font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                i === activeIndex ? "text-accent" : "text-text"
              }`}
            >
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-text-secondary">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
