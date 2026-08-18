export interface FlowStep {
  label: string;
  detail: string;
}

/** The full Intelligence section's interactive loop (doc §23) — a closed
 *  cycle, so this is intentionally a distinct, richer dataset from the tiny
 *  4-step Capabilities-row preview below, not the same data reused twice. */
export const AGENT_LOOP: FlowStep[] = [
  { label: "OBSERVE", detail: "Collect context from systems, data and environment." },
  { label: "REASON", detail: "Determine what the observation actually means." },
  { label: "ACT", detail: "Execute a step against a real tool or system." },
  { label: "VERIFY", detail: "Check the result before treating it as done — then loop." },
];

/** Minimal 4-step flows (doc §16) — shown as bare labels in the Capabilities
 *  row hover-preview, and reused with their full detail copy as the one
 *  diagram inside each of the three full domain sections below. */
export const INTELLIGENCE_PREVIEW: FlowStep[] = [
  { label: "MODEL", detail: "The model that interprets input against learned patterns." },
  { label: "REASONING", detail: "Context weighed, ambiguity resolved, a plan formed." },
  { label: "TOOLS", detail: "The system reaches into real systems for real answers." },
  { label: "ACTION", detail: "A decision becomes a concrete, observable output." },
];

export const SYSTEMS_PREVIEW: FlowStep[] = [
  { label: "APPLICATION", detail: "The interface and logic that shapes the experience." },
  { label: "API", detail: "The contract between application and service." },
  { label: "SERVICES", detail: "The business logic that does the real work." },
  { label: "DATA", detail: "Where state lives, and how it stays consistent." },
];

export const SECURITY_PREVIEW: FlowStep[] = [
  { label: "IDENTITY", detail: "Every request is authenticated before it's trusted." },
  { label: "POLICY", detail: "Access is granted by explicit rule, never by default." },
  { label: "SYSTEM", detail: "Services stay isolated so one failure stays contained." },
  { label: "DEFENSE", detail: "Anomalies are caught and stopped before they spread." },
];
