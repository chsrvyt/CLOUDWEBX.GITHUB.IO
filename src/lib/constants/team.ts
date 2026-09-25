export interface TeamMember {
  index: string;
  name: string;
  role: string;
  /** One entry per paragraph. */
  bio: string[];
  focus: string[];
  /** Awards and experience, set as a list under the bio. */
  highlights?: string[];
}

/** The three founders. Bios are the founders' own copy, reproduced as supplied
 *  — only markdown emphasis and emoji dropped, which the site's type system
 *  doesn't use. Photographs are still pending. */
export const TEAM: TeamMember[] = [
  {
    index: "01",
    name: "Samir Shendre",
    role: "Founder & CEO",
    bio: [
      "Samir Shendre is a young entrepreneur, technology enthusiast, and CEO & Founder of CloudWebX Technologies. He is currently pursuing B.Tech in Computer Science & Engineering at Symbiosis International University, Nagpur.",
      "He is building and managing three running startups — CloudWebX Technologies, Gleam Cosmetics, and Kalakriti Crochet Art. Through CloudWebX, he works on software development, AI, web/mobile applications, cloud solutions, and digital platforms, including the CloudWebX Campus platform for educational institutions.",
      "Samir has worked on multiple real-world client projects and gained industry experience as a Product Experience Intern at Kelicalix Technologies. He is passionate about technology, innovation, entrepreneurship, and building practical solutions.",
    ],
    focus: ["Entrepreneur", "Founder", "Developer", "Startup Builder", "Innovator"],
    highlights: [
      "1st Prize Winner — National-Level Startup Hackathon, SCMS",
      "1st Prize Winner — National-Level Startup Hackathon",
      "Product Experience Intern — Kelicalix Technologies",
    ],
  },
  {
    index: "02",
    name: "Parth Denge",
    role: "Co-Founder & CTO",
    bio: [
      "Parth Denge is the Co-Founder and CTO of CloudWebX, responsible for the company’s technical direction, system architecture, cybersecurity, and engineering strategy across its product portfolio. As Lead System Designer and Lead Security Engineer, he architects scalable distributed systems, secure infrastructure, and production-grade platforms while contributing directly to the design and development of multiple CloudWebX projects.",
      "His technical work spans backend engineering, cloud infrastructure, cybersecurity, AI/ML, system design, and secure application architecture. He has led the architecture and development of CloudWebX’s Campus LMS while also contributing to the company’s other technology initiatives, driving solutions from system architecture and security design through implementation and deployment.",
      "His focus is building robust technology at the architectural level—where scalability, security, performance, and reliability are engineered into the foundation.",
    ],
    focus: ["System Design", "Security Engineering", "Cloud Infrastructure", "AI/ML"],
    highlights: ["Lead System Designer", "Lead Security Engineer", "Led the architecture and development of Campus LMS"],
  },
  {
    index: "03",
    name: "Sarvesh Chonde",
    role: "Co-Founder & Full-Stack Engineer",
    bio: [
      "Sarvesh Chonde is a Computer Science & Engineering student at Symbiosis Institute of Technology, Nagpur (2026–29) and a technology builder specializing in Cybersecurity, AI, Full-Stack Development, and Product Engineering. As Co-Founder and Full-Stack Engineer at CloudWebX, he works on designing, developing, and deploying multi-professional technology platforms, including CloudWebX and Campus CloudWebX.",
      "He has built and contributed to 9+ projects across startups, businesses, and independent ventures, helping organizations strengthen their technical infrastructure, build digital products, and generate revenue. He has also helped Eklavya Vidyapeeth scale its technical and digital infrastructure through technology-driven solutions.",
      "His work spans full-stack development, AI, cybersecurity, cloud infrastructure, databases, automation, and product development. He has taken products from concept to deployment and commercial delivery, including successfully delivering a software application valued at ₹1 lakh+.",
      "His focus is on building secure, scalable, and commercially valuable technology that solves real-world problems.",
    ],
    focus: ["Cybersecurity", "AI", "Full-Stack Development", "Product Engineering"],
    highlights: ["9+ projects built and contributed to", "Software application delivered, valued at ₹1 lakh+"],
  },
];
