"use client";

import { cn } from "@/lib/utils";

/** The site's one recurring "big abstract visual" — pure CSS (no canvas, no
 *  WebGL), so it's cheap and crisp at any size. Two variants for two jobs:
 *  `eclipse` is a single glowing-rim circle (Hero — one strong visual per
 *  the Genesis-style "one visual + one statement" rule); `nebula` is a
 *  looser cluster of drifting warm blobs (Work's shared preview panel).
 *  Both freeze under reduced motion via the global CSS rule rather than
 *  needing their own check — nothing here reads scroll or the pointer. */
export function GenerativeGlow({ variant, className }: { variant: "eclipse" | "nebula"; className?: string }) {
  if (variant === "eclipse") {
    return (
      <div className={cn("relative aspect-square", className)}>
        <div className="cw-glow-halo absolute inset-[-20%] rounded-full" />
        <div className="cw-glow-disk absolute inset-0 rounded-full" />
        <div className="cw-glow-rim absolute inset-0 rounded-full" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="cw-nebula-blob cw-nebula-blob--a absolute rounded-full" />
      <div className="cw-nebula-blob cw-nebula-blob--b absolute rounded-full" />
      <div className="cw-nebula-blob cw-nebula-blob--c absolute rounded-full" />
    </div>
  );
}
