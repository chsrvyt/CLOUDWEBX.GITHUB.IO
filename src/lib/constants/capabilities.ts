/** The 3 domains CloudWebX operates in — replaces the old flat 7-capability
 *  list (AI/LLM/Agents/Security/Software/Infrastructure/Automation) with a
 *  broader taxonomy per the revised IA: each domain is one large row, not
 *  a near-identical section of its own. */
export interface Domain {
  index: string;
  title: string;
  subItems: string[];
  href: string;
}

export const DOMAINS: Domain[] = [
  { index: "01", title: "Intelligence", subItems: ["AI", "LLM", "Agents", "Automation"], href: "#intelligence" },
  { index: "02", title: "Systems", subItems: ["Software", "Cloud", "Infrastructure", "Data"], href: "#systems" },
  { index: "03", title: "Security", subItems: ["Cybersecurity", "App Security", "Infrastructure Security", "Resilience"], href: "#security" },
];
