import type { WorkSketch } from "@/lib/constants/work";

const SPINE_X = 104;
const BRANCH_X = 214;
const TOP = 44;
const STEP = 78;

/** The small schematic beside Selected Work — the shape of the system being
 *  described, drawn from the project's own data rather than a decorative
 *  gradient. One primitive covers all four: a spine of stages with a single
 *  branch, which is the part that actually differs between them.
 *
 *  Static and presentational; the interaction lives in the list beside it. */
export function WorkSketch({ sketch, title }: { sketch: WorkSketch; title: string }) {
  const { nodes, branch } = sketch;
  const height = TOP + (nodes.length - 1) * STEP + TOP;
  const branchY = TOP + branch.from * STEP;

  return (
    <svg
      viewBox={`0 0 320 ${height}`}
      className="h-full w-full"
      role="img"
      aria-label={`${title}: ${nodes.join(", then ")}, with a branch from ${nodes[branch.from]} to ${branch.label}.`}
    >
      {/* Spine. */}
      <line x1={SPINE_X} y1={TOP} x2={SPINE_X} y2={TOP + (nodes.length - 1) * STEP} stroke="var(--cw-border-strong)" strokeWidth={1} />

      {/* The branch: out from its stage, then down one step. */}
      <path
        d={`M ${SPINE_X} ${branchY} L ${BRANCH_X - 14} ${branchY} Q ${BRANCH_X} ${branchY} ${BRANCH_X} ${branchY + 14} L ${BRANCH_X} ${branchY + STEP - 10}`}
        fill="none"
        stroke="var(--cw-accent-dim)"
        strokeWidth={1}
        strokeDasharray="3 4"
      />
      <circle cx={BRANCH_X} cy={branchY + STEP - 4} r={4} fill="var(--cw-bg)" stroke="var(--cw-accent)" strokeWidth={1} />
      <text
        x={BRANCH_X + 12}
        y={branchY + STEP - 1}
        className="fill-[var(--cw-accent)] font-mono text-[9px] tracking-[0.15em] uppercase"
      >
        {branch.label}
      </text>

      {nodes.map((node, i) => {
        const y = TOP + i * STEP;
        const isBranchPoint = i === branch.from;
        return (
          <g key={node}>
            <circle
              cx={SPINE_X}
              cy={y}
              r={isBranchPoint ? 6 : 4.5}
              fill={isBranchPoint ? "var(--cw-accent)" : "var(--cw-bg)"}
              stroke={isBranchPoint ? "var(--cw-accent)" : "var(--cw-border-strong)"}
              strokeWidth={1}
            />
            <text x={SPINE_X - 16} y={y + 3} textAnchor="end" className="fill-[var(--cw-text)] font-mono text-[9px] tracking-[0.15em] uppercase">
              {node}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
