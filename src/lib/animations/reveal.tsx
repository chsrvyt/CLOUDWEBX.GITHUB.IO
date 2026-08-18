"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** The one shared "enters the viewport" interaction used across every editorial
 *  section, so motion stays consistent instead of each section inventing its own. */
const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

type RevealLine = string | { text: string; className?: string };

/** Line-by-line headline reveal — each child (typically one line of a heading)
 *  staggers in, used for the big editorial statements (Intro, Philosophy, Approach).
 *  A line may carry its own className (e.g. `.cw-outline-text`) instead of the
 *  uniform `lineClassName`, for headlines that mix a solid line with an outline one. */
export function RevealLines({ lines, className, lineClassName }: { lines: RevealLine[]; className?: string; lineClassName?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: 0.08 }}
    >
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const extraClassName = typeof line === "string" ? undefined : line.className;
        return (
          <div key={i} className="overflow-hidden">
            <motion.div
              className={[lineClassName, extraClassName].filter(Boolean).join(" ") || undefined}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {text}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
