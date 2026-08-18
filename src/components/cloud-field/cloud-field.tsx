"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useIsTouchDevice } from "@/lib/hooks/use-is-touch-device";
import { cn } from "@/lib/utils";

export type FieldVariant = "hero" | "ai" | "llm" | "agents" | "security" | "software" | "infrastructure" | "converge";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  radius: number;
}

const VARIANT_CONFIG: Record<FieldVariant, { count: number; radius: number; speed: number; connectDistance: number }> = {
  hero: { count: 36, radius: 900, speed: 0.08, connectDistance: 150 },
  ai: { count: 30, radius: 260, speed: 0.07, connectDistance: 160 },
  llm: { count: 26, radius: 320, speed: 0.1, connectDistance: 130 },
  agents: { count: 24, radius: 320, speed: 0.14, connectDistance: 180 },
  security: { count: 26, radius: 240, speed: 0.04, connectDistance: 140 },
  software: { count: 30, radius: 320, speed: 0.03, connectDistance: 120 },
  infrastructure: { count: 20, radius: 340, speed: 0.05, connectDistance: 210 },
  converge: { count: 34, radius: 320, speed: 0.2, connectDistance: 150 },
};

/**
 * The CloudWeb Field — a restrained generative background, now used in only
 * a couple of spots (Intelligence, Contact) rather than behind every
 * section, per the "low visual density" direction — most sections should
 * breathe instead of always carrying a node-network texture. Canvas 2D, not
 * WebGL: cheap enough that a GPU scene would be unjustified weight for what's
 * meant to read as a quiet accent, not a visual centerpiece.
 */
export function CloudField({
  variant,
  className,
  interactive = true,
  dense = false,
}: {
  variant: FieldVariant;
  className?: string;
  interactive?: boolean;
  dense?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = VARIANT_CONFIG[variant];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999, active: false };

    function seedNodes() {
      const base = dense ? config.count * 1.6 : config.count;
      const count = isTouch ? Math.round(base * 0.55) : Math.round(base);
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return { x, y, vx: (Math.random() - 0.5) * config.speed, vy: (Math.random() - 0.5) * config.speed, targetX: width / 2, targetY: height / 2, radius: 1.2 + Math.random() * 2.2 };
      });
    }

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        if (variant === "converge") {
          node.x += (width / 2 - node.x) * 0.008;
          node.y += (height / 2 - node.y) * 0.008;
        } else {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        if (interactive && pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0.01) {
            const force = (140 - dist) / 140;
            node.x += (dx / dist) * force * 0.6;
            node.y += (dy / dist) * force * 0.6;
          }
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < config.connectDistance) {
            const alpha = (1 - dist / config.connectDistance) * 0.32;
            ctx.strokeStyle = `rgba(232, 166, 113, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232, 166, 113, 0.4)";
        ctx.fill();
        if (node.radius > 2.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(232, 166, 113, 0.2)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (visible && !reducedMotion) rafId = requestAnimationFrame(step);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    step();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion) rafId = requestAnimationFrame(step);
    });
    intersectionObserver.observe(canvas);

    if (interactive && !isTouch) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    if (reducedMotion) step(); // draw one static frame, no rAF loop

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [variant, interactive, reducedMotion, isTouch, dense]);

  return <canvas ref={canvasRef} aria-hidden className={cn("h-full w-full", className)} />;
}

export function FieldLabel({ children }: { children: string }) {
  return (
    <span className="pointer-events-none absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.25em] text-text-secondary/60 uppercase">
      {children}
    </span>
  );
}
