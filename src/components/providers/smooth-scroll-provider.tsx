"use client";

import { useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { LenisContext } from "@/lib/context/lenis-context";

gsap.registerPlugin(ScrollTrigger);

/** Lenis drives smooth scroll (and anchor-link scrollTo, via LenisContext);
 *  GSAP's ticker drives Lenis's raf loop, and Lenis's own "scroll" event
 *  drives ScrollTrigger.update — the standard Lenis+GSAP wiring, so any
 *  ScrollTrigger-based scrub/pin elsewhere (see capabilities-list.tsx) stays
 *  in sync with Lenis's eased position instead of the raw native scroll.
 *  Skipped entirely under reduced motion — native scroll is the more
 *  predictable, more accessible default there. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    // Lenis can only be constructed here (client-only, touches the DOM) and
    // consumers (SmoothLink) need the instance itself, not a derived value —
    // this is exposing an external system's handle, not computable state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    function onTick(time: number) {
      instance.raf(time * 1000);
    }
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisContext value={lenis}>{children}</LenisContext>;
}
