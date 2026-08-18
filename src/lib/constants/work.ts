export interface WorkItem {
  index: string;
  title: string;
  tags: string;
  description: string;
}

/** Conceptual projects — clearly labeled as such rather than fabricated
 *  clients, metrics or outcomes. Swap for real case studies once available. */
export const WORK_ITEMS: WorkItem[] = [
  {
    index: "01",
    title: "AUTONOMOUS SECURITY ENGINE",
    tags: "AI × SECURITY — CONCEPT",
    description: "An agent that watches system telemetry, isolates anomalies and verifies before acting — reasoning applied to defense.",
  },
  {
    index: "02",
    title: "ENTERPRISE AI AGENT",
    tags: "AI × AGENTS — CONCEPT",
    description: "A multi-step agent that plans across internal tools, executes and reports — built to be verified, not trusted blindly.",
  },
  {
    index: "03",
    title: "INTELLIGENT AUTOMATION SYSTEM",
    tags: "AUTOMATION — CONCEPT",
    description: "Workflow automation that decides, not just executes — routing exceptions to people instead of failing silently.",
  },
  {
    index: "04",
    title: "SECURE CLOUD PLATFORM",
    tags: "INFRASTRUCTURE — CONCEPT",
    description: "Distributed infrastructure designed for isolation and graceful degradation under real production load.",
  },
];
