export interface TeamMember {
  index: string;
  name: string;
  role: string;
  /** Left empty until supplied — the page renders the card without a bio
   *  rather than showing invented copy about a real person. */
  bio?: string;
  focus: string[];
}

/** The three founders, as named in CloudWeb's own client agreement. Bios and
 *  photographs are pending; nothing here is written on their behalf. */
export const TEAM: TeamMember[] = [
  { index: "01", name: "Samir Shendre", role: "Founder", focus: ["Direction", "Product"] },
  { index: "02", name: "Parth Denge", role: "CTO & Co-founder", focus: ["Architecture", "Engineering"] },
  { index: "03", name: "Sarvesh Chonde", role: "Co-founder & Technical Lead", focus: ["Systems", "Delivery"] },
];
