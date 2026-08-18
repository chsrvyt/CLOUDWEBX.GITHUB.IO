"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useLenis } from "@/lib/context/lenis-context";

/** Same-page anchor links (#capabilities, #contact, ...) route through Lenis's
 *  scrollTo instead of the browser's instant hash jump, so in-page navigation
 *  gets the same smooth motion as wheel scrolling. Falls back to a normal
 *  Link (and native jump) when Lenis isn't active — reduced motion, or before
 *  the provider has mounted. */
export function SmoothLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & { children: ReactNode }) {
  const lenis = useLenis();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e as never);
    const target = typeof href === "string" ? href : href.hash;
    if (lenis && typeof target === "string" && target.startsWith("#")) {
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.1 });
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
