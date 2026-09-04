/** A project's shape, drawn beside it (see work/work-sketch.tsx). Every entry
 *  is the same primitive — a chain of stages with one branch off it — because
 *  the interesting difference between these systems is *where* the branch is
 *  and what it does, not four unrelated illustrations. */
export interface WorkSketch {
  /** Stages down the spine, top to bottom. */
  nodes: string[];
  /** The stage the branch leaves from, and where it goes. */
  branch: { from: number; label: string };
}

export interface WorkItem {
  index: string;
  title: string;
  tags: string;
  description: string;
  sketch: WorkSketch;
}

/** Conceptual projects — clearly labeled as such rather than fabricated
 *  clients, metrics or outcomes. Swap for real case studies once available. */
export const WORK_ITEMS: WorkItem[] = [
  {
    index: "01",
    title: "AUTONOMOUS SECURITY ENGINE",
    tags: "AI × SECURITY — CONCEPT",
    description: "An agent that watches system telemetry, isolates anomalies and verifies before acting — reasoning applied to defense.",
    sketch: { nodes: ["Telemetry", "Anomaly", "Verify", "Act"], branch: { from: 2, label: "Isolate" } },
  },
  {
    index: "02",
    title: "ENTERPRISE AI AGENT",
    tags: "AI × AGENTS — CONCEPT",
    description: "A multi-step agent that plans across internal tools, executes and reports — built to be verified, not trusted blindly.",
    sketch: { nodes: ["Plan", "Tools", "Execute", "Report"], branch: { from: 1, label: "Retry" } },
  },
  {
    index: "03",
    title: "INTELLIGENT AUTOMATION SYSTEM",
    tags: "AUTOMATION — CONCEPT",
    description: "Workflow automation that decides, not just executes — routing exceptions to people instead of failing silently.",
    sketch: { nodes: ["Intake", "Decide", "Route", "Complete"], branch: { from: 1, label: "To a person" } },
  },
  {
    index: "04",
    title: "SECURE CLOUD PLATFORM",
    tags: "INFRASTRUCTURE — CONCEPT",
    description: "Distributed infrastructure designed for isolation and graceful degradation under real production load.",
    sketch: { nodes: ["Edge", "Region", "Service", "State"], branch: { from: 2, label: "Degrade" } },
  },
];
