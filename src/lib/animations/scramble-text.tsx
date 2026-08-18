"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const CHARSET = "!<>-_\\/[]{}—=+*^?#$%&";

/** Classic "decode" scramble — characters resolve left-to-right, unresolved
 *  ones re-roll every frame (the lisa.locomotive.ca loader effect). Runs once
 *  per `text` change; reduced motion renders the final text immediately. */
function useScramble(text: string, active: boolean) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(active && !reducedMotion ? "" : text);

  useEffect(() => {
    if (!active || reducedMotion) return;

    let frame = 0;
    let rafId = 0;
    const totalFrames = Math.max(18, text.length * 3);

    function tick() {
      const revealed = Math.floor((frame / totalFrames) * text.length);
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealed || text[i] === " ") output += text[i];
        else output += CHARSET[Math.floor(Math.random() * CHARSET.length)];
      }
      setDisplay(output);
      frame++;
      if (frame <= totalFrames) rafId = requestAnimationFrame(tick);
      else setDisplay(text);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [text, active, reducedMotion]);

  return reducedMotion ? text : display;
}

/** Scrambles in on mount — for content that's already decided to render
 *  (loading screens, cycling ticker words). */
export function ScrambleText({ text, className, active = true }: { text: string; className?: string; active?: boolean }) {
  const display = useScramble(text, active);
  return <span className={className}>{display || " "}</span>;
}

/** Scrambles in once, the first time it scrolls into view — the in-page
 *  equivalent (eyebrows, labels) using the same viewport-margin convention
 *  as Reveal/RevealLines. */
export function ScrambleOnView({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const display = useScramble(text, inView);
  return (
    <span ref={ref} className={className}>
      {display || " "}
    </span>
  );
}
