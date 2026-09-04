/** Numbered editorial nav — the index is part of the identity (doc §12), not
 *  a decorative afterthought, so it's carried as data rather than derived
 *  from array position in three different places. */
export const NAV_LINKS = [
  { index: "01", label: "Campus", href: "#campus" },
  { index: "02", label: "Work", href: "#work" },
  { index: "03", label: "Capabilities", href: "#capabilities" },
  { index: "04", label: "Approach", href: "#approach" },
  { index: "05", label: "About", href: "#about" },
] as const;

export const CONTACT_LINK = { index: "06", label: "Contact", href: "#contact" } as const;

export const SITE = {
  name: "CloudWeb",
  tagline: "AI / SOFTWARE / SECURITY / SYSTEMS",
  email: "hello@cloudweb.example",
  year: new Date().getFullYear(),
} as const;

/** The four pillars, spelled the same way everywhere they're listed (About, Footer). */
export const PILLARS = ["AI", "Software", "Security", "Infrastructure"] as const;
