export interface ApproachStep {
  index: string;
  title: string;
  description: string;
}

export const APPROACH_STEPS: ApproachStep[] = [
  { index: "01", title: "Understand", description: "Before any architecture — what is the problem, actually, and why hasn't it been solved yet." },
  { index: "02", title: "Architect", description: "Design the system boundaries, data flow and failure modes before writing production code." },
  { index: "03", title: "Build", description: "Build the system, layer by layer, with the difficult work happening beneath the surface." },
  { index: "04", title: "Test", description: "Verify against real conditions, not the happy path — the same discipline as adversaries would apply." },
  { index: "05", title: "Deploy", description: "Ship deliberately, with rollback and observability in place before the first real user." },
  { index: "06", title: "Evolve", description: "A system that stops changing has stopped being maintained. We keep engineering it." },
];

export interface PhilosophyPoint {
  index: string;
  title: string;
}

export const PHILOSOPHY_POINTS: PhilosophyPoint[] = [
  { index: "01", title: "Clarity" },
  { index: "02", title: "Precision" },
  { index: "03", title: "Intelligence" },
  { index: "04", title: "Security" },
  { index: "05", title: "Performance" },
];
