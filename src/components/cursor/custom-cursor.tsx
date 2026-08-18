"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";

/** A small dot cursor plus a barely-visible lagging ring, toned down per
 *  doc §32 — never the visual centerpiece it was before. Label text is
 *  opt-in via data-cursor="<state>" (not inferred from a hover heuristic),
 *  looked up here so call sites can stay terse (e.g. data-cursor="open"). */
const CURSOR_LABELS: Record<string, string> = {
  view: "View",
  open: "Open",
  drag: "Drag",
  go: "Go ↗",
};

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.2 });
  const ringX = useSpring(x, { damping: 26, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(y, { damping: 26, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (isTouch) return;
    document.documentElement.classList.add("cw-cursor-active");

    function onMove(e: PointerEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const state = target?.dataset.cursor;
      setLabel(state ? (CURSOR_LABELS[state] ?? "View") : null);
    }

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("cw-cursor-active");
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1 rounded-full bg-text mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full border border-text/25"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: label ? 40 : 18, height: label ? 40 : 18, opacity: label ? 0.9 : 0.3 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && <span className="font-mono text-[8px] tracking-widest text-text uppercase">{label}</span>}
      </motion.div>
    </>
  );
}
