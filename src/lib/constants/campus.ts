/** Campus LMS — CloudWeb's flagship product and the company's live MVP,
 *  running at campus.cloudwebx.in. Unlike WORK_ITEMS (deliberately labeled
 *  conceptual), everything here is real and shipped, so it carries a live
 *  URL and is presented as proof rather than as a proposal. Content mirrors
 *  the product site; keep the two in sync when Campus's own copy changes. */

export const CAMPUS = {
  name: "Campus",
  fullName: "Campus LMS",
  href: "https://campus.cloudwebx.in",
  /** Shown as the link's visible label — the domain is the credential here. */
  domain: "campus.cloudwebx.in",
  status: "Live",
  positioning: "Text-first, hands-on learning for colleges",
  summary:
    "Lessons, a real coding playground, locked-down tests, aptitude drills and an interview studio in one product — so students learn by doing, and placement cells see exactly where every batch stands.",
} as const;

export interface CampusFeature {
  index: string;
  title: string;
  description: string;
}

/** The six things Campus actually does — the offer, stated plainly. */
export const CAMPUS_FEATURES: CampusFeature[] = [
  {
    index: "01",
    title: "Interactive lessons",
    description: "Every topic reflows into Understand, Visualize, Try and Apply — animated diagrams and a step-through debugger, not lecture videos.",
  },
  {
    index: "02",
    title: "Real code execution",
    description: "Python, C, C++, Java and JavaScript run against a real sandbox — actual pass/fail on hidden tests, never a keyword match.",
  },
  {
    index: "03",
    title: "Locked-down tests",
    description: "Fullscreen, copy-paste blocked, tab-switch grace timer, refresh-safe resume and auto-submit, in a timed one-attempt window.",
  },
  {
    index: "04",
    title: "Interview Studio",
    description: "Quick Fire, Deep Dive, HR Round, Mock Interview with personas, Project Defense and Code Interview — every answer scored, readiness tracked.",
  },
  {
    index: "05",
    title: "Aptitude practice",
    description: "Thousands of quantitative, logical and verbal questions across a 19-topic taxonomy, with worked solutions and per-topic progress.",
  },
  {
    index: "06",
    title: "Company Prep",
    description: "Company- and role-targeted readiness — subject weighting, interview-round pipelines, weak-area callouts and a prep roadmap.",
  },
];

/** The product's own three-beat arc, reused as the section's closing rhythm. */
export const CAMPUS_JOURNEY = [
  { index: "01", title: "Learn", description: "Read, watch the diagram animate, step through the example line by line." },
  { index: "02", title: "Practice", description: "MCQs and coding exercises with instant feedback — unlimited retries, no answer reveal." },
  { index: "03", title: "Prove", description: "Sit a locked-down test or a mock interview, and see exactly where you stand." },
] as const;

/** Who signs in — the four roles Campus ships with, evidence that it covers a
 *  whole institution rather than a single classroom. */
export const CAMPUS_ROLES = [
  { name: "Students", description: "Learn, practice, and take assessments." },
  { name: "Teachers", description: "Author content, build tests, track batches." },
  { name: "Institute Admins", description: "Manage a college's teachers, students and batches." },
  { name: "Super Admins", description: "Oversee colleges, modules and the question bank." },
] as const;

/** The languages the playground and coding questions execute for real. */
export const CAMPUS_LANGUAGES = ["Python", "C", "C++", "Java", "JavaScript"] as const;

/** Photographs of Campus outside the demo. Captions stay to what the pictures
 *  actually show — no cohort sizes or uptime figures, which aren't ours to
 *  assert. Files live in public/campus/.
 *
 *  Two sets, because they record different things: the final-year test at
 *  Symbiosis is one event with its own heading, and the partnership and the
 *  load test are separate milestones that would misread as part of it. */
export interface CampusProofItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

/** The final-year test at Symbiosis Institute of Technology, Nagpur. */
export const CAMPUS_SYMBIOSIS: CampusProofItem[] = [
  {
    id: "symbiosis-hall",
    src: "/campus/symbiosis-nagpur-hall.jpg",
    alt: "A tiered lecture hall at Symbiosis Institute of Technology, Nagpur, filled with students working on laptops during a session on Campus.",
    title: "Symbiosis Institute of Technology, Nagpur",
    caption: "A full hall on Campus at once — the platform run with a real cohort in a real classroom, not a demo.",
  },
  {
    id: "symbiosis-cohort",
    src: "/campus/symbiosis-nagpur-cohort.jpg",
    alt: "Students seated across the tiered desks of the Symbiosis Institute of Technology lecture hall, laptops open, staff standing at the front.",
    title: "A cohort at work",
    caption: "Every seat signed in and working through the same session, supervised from the front of the room.",
  },
  {
    id: "symbiosis-tested",
    src: "/campus/symbiosis-nagpur-tested.jpg",
    alt: "Final year students at Symbiosis Institute of Technology, Nagpur taking a test on laptops while two CloudWeb staff observe, under a banner reading 'Final year test performed on our platform' and a panel giving the date, 23 September 2026.",
    title: "Tested on site",
    caption: "23 September 2026, Nagpur — final year students sitting a live, locked-down test on Campus, with the CloudWeb team in the room.",
  },
];

/** Milestones outside that event. */
export const CAMPUS_MILESTONES: CampusProofItem[] = [
  {
    id: "softronix",
    src: "/campus/softronix-partnership.jpg",
    alt: "Representatives of CloudWeb and Softronix standing together at the Softronix office, holding the signed partnership agreement, under a 'Partnership secured' banner.",
    title: "Softronix partnership",
    caption: "Agreement signed with Softronix, extending Campus to their training and placement programmes.",
  },
  {
    id: "load-test",
    src: "/campus/campus-load-test.jpg",
    alt: "Three laptops side by side: Campus open at the assigned tests page, a monitoring dashboard showing CPU usage and requests per second, and a sign-in screen.",
    title: "Under load",
    caption: "Campus beside its own monitoring — CPU and request throughput watched while the platform is stress-tested.",
  },
];

/** The lesson-view mode strip, mirrored in the product mock. */
export const CAMPUS_MODES = ["Understand", "Visualize", "Try", "Apply"] as const;

/** The exact snippet the product's own landing page steps through, reused so
 *  the mock shows real product UI instead of invented filler code. */
export const CAMPUS_SNIPPET = [
  { line: 1, code: "total = 0" },
  { line: 2, code: "while n > 0:" },
  { line: 3, code: "    total += n" },
  { line: 4, code: "    n -= 1" },
] as const;

export const CAMPUS_SNIPPET_NOTE =
  "Line 2 — checks the condition before each iteration. n is 3, so the loop body runs.";
