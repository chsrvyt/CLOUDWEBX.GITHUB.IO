/** Numbered editorial nav — the index is part of the identity (doc §12), not
 *  a decorative afterthought, so it's carried as data rather than derived
 *  from array position in three different places. */
/** Campus and About us are real routes; the rest are sections of the home
 *  page. SmoothLink handles both — it scrolls through Lenis for fragments and
 *  navigates normally for paths, and rewrites a fragment to /#section when the
 *  visitor is on one of the routes rather than the home page. */
/** `featured` marks the two pages the site most wants visited — the live
 *  product and the people behind it. The navbar sets those in gold; the rest
 *  stay plain so the two stand out rather than competing with every link. */
export const NAV_LINKS = [
  { index: "01", label: "Campus", href: "/campus", featured: true },
  { index: "02", label: "Work", href: "#work", featured: false },
  { index: "03", label: "Capabilities", href: "#capabilities", featured: false },
  { index: "04", label: "Approach", href: "#approach", featured: false },
  { index: "05", label: "About us", href: "/about", featured: true },
] as const;

export const CONTACT_LINK = { index: "06", label: "Contact", href: "#contact" } as const;

/** Real routes rather than on-page anchors — the About page and the two legal
 *  documents. Kept separate from NAV_LINKS because those are all sections of
 *  the home page and route through Lenis; these are ordinary navigations. */
export const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
] as const;

export const SITE = {
  name: "CloudWeb",
  tagline: "AI / SOFTWARE / SECURITY / SYSTEMS",
  email: "cloudwebtech7@gmail.com",
  year: new Date().getFullYear(),
} as const;

/** The four pillars, spelled the same way everywhere they're listed (About, Footer). */
export const PILLARS = ["AI", "Software", "Security", "Infrastructure"] as const;
