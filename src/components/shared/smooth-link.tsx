"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useLenis } from "@/lib/context/lenis-context";

/** Same-page anchor links (#capabilities, #contact, ...) route through Lenis's
 *  scrollTo instead of the browser's instant hash jump, so in-page navigation
 *  gets the same smooth motion as wheel scrolling. Falls back to a normal
 *  Link (and native jump) when Lenis isn't active — reduced motion, or before
 *  the provider has mounted.
 *
 *  Off the home page — the 404, or any route added later — a bare "#work" would
 *  only set a hash on the current URL and go nowhere, since the target section
 *  isn't on that page. There it is rewritten to "/#work" so the shared Navbar
 *  and Footer keep working from anywhere. */
export function SmoothLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & { children: ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();

  const target = typeof href === "string" ? href : href.hash;
  const isAnchor = typeof target === "string" && target.startsWith("#");
  const onHome = pathname === "/";
  const resolvedHref = isAnchor && !onHome ? `/${target}` : href;

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e as never);
    // Only hijack the scroll when the target is actually on this page.
    if (lenis && isAnchor && onHome) {
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.1 });
    }
  }

  return (
    <Link href={resolvedHref} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
