/** The security section's topology (doc §25) — a real mesh, laid out as the
 *  doc's own sketch: three columns, two rows, joined horizontally and by
 *  three verticals.
 *
 *      ●────●────●
 *      │    │    │
 *      ●────●────●
 *
 *  The graph is data rather than hand-drawn lines because the diagram
 *  computes its route through it (see security-diagram.tsx) instead of
 *  animating a path someone hardcoded — isolate a node and the reroute that
 *  appears is the one the graph actually admits. */

export interface SecurityNode {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Label baseline — above for the top row, below for the bottom. */
  labelY: number;
  /** Entry and exit are the request's endpoints, so they can't be isolated:
   *  removing one wouldn't demonstrate containment, only a dead diagram. */
  fixed?: boolean;
  caption: string;
}

export const SECURITY_VIEWBOX = { width: 440, height: 300 } as const;

export const SECURITY_NODES: SecurityNode[] = [
  { id: "ingress", label: "Ingress", x: 70, y: 96, labelY: 64, fixed: true, caption: "Where every request arrives." },
  { id: "identity", label: "Identity", x: 220, y: 96, labelY: 64, caption: "Authenticated before it is trusted." },
  { id: "policy", label: "Policy", x: 370, y: 96, labelY: 64, caption: "Granted by explicit rule, never by default." },
  { id: "service", label: "Service", x: 70, y: 216, labelY: 248, caption: "Isolated so one failure stays contained." },
  { id: "runtime", label: "Runtime", x: 220, y: 216, labelY: 248, caption: "Watched while it executes, not only at the door." },
  { id: "data", label: "Data", x: 370, y: 216, labelY: 248, fixed: true, caption: "The thing all of it exists to protect." },
];

/** Undirected. Order matters: the traversal is breadth-first and settles ties
 *  in edge order, so listing the top row first makes the identity/policy plane
 *  the resting route and the lower plane the fallback. */
export const SECURITY_EDGES: [string, string][] = [
  ["ingress", "identity"],
  ["identity", "policy"],
  ["policy", "data"],
  ["ingress", "service"],
  ["service", "runtime"],
  ["runtime", "data"],
  ["identity", "runtime"],
];

export const SECURITY_ENTRY = "ingress";
export const SECURITY_EXIT = "data";
