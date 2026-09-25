/** Legal copy for /terms and /privacy.
 *
 *  Taken from CloudWebX's own documents: the Campus Terms of Use & Privacy
 *  Policy (version 2026-09-24) and the Client Terms & Conditions and Software
 *  Development Agreement. The wording is reproduced rather than paraphrased —
 *  this is the text people have signed and accepted, and a friendlier summary
 *  of a legal clause is a different clause.
 *
 *  Deliberately NOT carried over from the source PDFs: the acceptance record
 *  wrapped around the Campus terms (a named student, their email, IP address,
 *  device, account id, college and batch) and the client signature block. None
 *  of that is publishable on a public page. */

export const LEGAL_ENTITY = {
  name: "CloudWebX Technologies",
  short: "CloudWebX",
  email: "hello@cloudweb.me",
  phone: "7387387616",
  instagram: "cloud_web",
  instagramUrl: "https://instagram.com/cloud_web",
} as const;

export const TERMS_VERSION = "2026-09-24";
export const TERMS_EFFECTIVE = "24 September 2026";

/** A paragraph, or a bullet list when it's an array. */
export type LegalBlock = string | string[];

export interface LegalSection {
  number: string;
  title: string;
  blocks: LegalBlock[];
}

export const CAMPUS_INTRO: LegalBlock[] = [
  'Campus is a learning, practice and assessment platform developed and operated by CloudWebX Technologies ("CloudWebX", "we", "us") and provided to you through your college or institute ("your institution").',
  'These terms apply to everyone who signs in to Campus: students, teachers and institute administrators ("you").',
  'By selecting "I agree" you confirm that you have read, understood and accepted these Terms of Use and the Privacy Policy below. If you do not agree, you cannot use Campus.',
];

/** The Campus document in full, with its original numbering. Sections 7–10 are
 *  the privacy half and are reused on /privacy — renumbering them would break
 *  the correspondence with the version users have already accepted. */
export const CAMPUS_TERMS: LegalSection[] = [
  {
    number: "1",
    title: "Your account",
    blocks: [
      "Your account is created by your institution, and your sign-in details are personal to you. Do not share your password or let anyone else use your account.",
      "You are responsible for keeping your password, account and access credentials confidential, and for all activity that happens under your account. Change any temporary password you are given, and tell your institution straight away if you think someone else has used your account.",
    ],
  },
  {
    number: "2",
    title: "Acceptable use",
    blocks: [
      "Use Campus only for the learning, teaching and assessment purposes your institution provides it for. You must not:",
      [
        "use Campus for illegal activities, fraud, harassment, or any activity prohibited by applicable law;",
        "access, or attempt to access, another person's account, data, test papers or answers;",
        "impersonate another person, or take a test or submit work on someone else's behalf;",
        "submit code or content intended to attack, overload or damage Campus, its code-execution sandbox or any other system;",
        "scrape, copy or bulk-download questions, tests or other content from Campus;",
        "interfere with the security, integrity or normal operation of the platform.",
      ],
    ],
  },
  {
    number: "3",
    title: "Tests and academic integrity",
    blocks: [
      "Tests on Campus run in a locked-down mode to keep them fair. While you take a test, Campus records:",
      [
        "switching tabs or windows, and leaving or exiting full-screen mode;",
        "attempts to paste into answers;",
        "snapshots of your code as you write it, and how you move between questions;",
        "when you started and submitted, and whether a test was submitted automatically.",
      ],
      "A test may be submitted automatically when its time runs out or when the rules above are broken. Attempts may be flagged for review, and your answers, scores, flags and this integrity information are visible to your teachers and institution. Each test allows one attempt unless your teacher decides otherwise. Using unauthorized help or sharing test questions is a breach of these terms and of your institution's rules.",
    ],
  },
  {
    number: "4",
    title: "Unauthorized access and security logging",
    blocks: [
      "Any unauthorized access, or any attempt to execute unauthorized commands on the system (including through the code editor or sandbox), is logged and recorded for security and auditing purposes.",
      "If such activity is recorded by the server administrator, appropriate legal action may be taken against the person responsible.",
    ],
  },
  {
    number: "5",
    title: "Intellectual property",
    blocks: [
      "Campus, including its software, source code, designs, lessons, question banks, tests, templates and documentation, is owned by CloudWebX or its licensors, or by your institution for content it provides.",
      "You must not copy, reproduce, resell, redistribute, publish, transfer, reverse engineer or commercially exploit any part of Campus or its content without prior written permission.",
      "The answers and code you submit remain your work. You allow CloudWebX and your institution to store, process and display them for teaching, assessment, integrity checks and record-keeping.",
    ],
  },
  {
    number: "6",
    title: "Content you submit",
    blocks: [
      "You are responsible for making sure that anything you upload or submit is your own work or that you are authorized to use it. CloudWebX is not responsible for copyright or intellectual-property claims arising from material you supply.",
    ],
  },
  {
    number: "7",
    title: "Privacy Policy: information we collect",
    blocks: [
      [
        "Account information: your name, email address, PRN or username, role, college and batch, provided by your institution.",
        "Learning and assessment information: your answers, code submissions, scores, progress, practice activity and interview-preparation responses.",
        "Test-integrity information: the events described in section 3.",
        "Technical information: your IP address, browser and device details, sign-in times and security logs.",
        "Your acceptance of these terms: the version you accepted, and when, from which IP address and on which device.",
      ],
    ],
  },
  {
    number: "8",
    title: "Privacy Policy: how we use it",
    blocks: [
      "We use this information to run Campus for your institution: to sign you in, deliver lessons and tests, grade your work, show progress to you and your teachers, keep tests fair, protect the platform against misuse and unauthorized access, fix problems and improve the service, and meet legal obligations.",
      "We do not sell your personal data, and we do not use it for advertising.",
    ],
  },
  {
    number: "9",
    title: "Privacy Policy: who can see it",
    blocks: [
      [
        "You can see your own work, results and progress.",
        "Your teachers and your institution's administrators can see the information of students in their college, including test results and integrity flags.",
        "CloudWebX's platform administrators can access information to operate, secure and support Campus.",
        "Service providers that host or run parts of Campus (such as servers and code-execution services) process data on our behalf and only for that purpose.",
        "We may disclose information where required by law, or to investigate misuse or unauthorized access.",
      ],
      "CloudWebX may show screenshots of Campus, general information about the platform and aggregated, non-identifying statistics in its portfolio and promotional material. It will never publish your personal data or your individual results in a way that identifies you.",
    ],
  },
  {
    number: "10",
    title: "Privacy Policy: storage, security and retention",
    blocks: [
      "CloudWebX takes reasonable technical measures to protect the data under its control. However, no internet-connected system can be guaranteed to be completely secure.",
      "Your information is kept while your account is active and for as long as your institution requires it. When your institution removes your account, your data is deleted, except for records of your acceptance of these terms and security logs, which we keep as evidence. Backups are overwritten over time.",
      "You can ask your institution, or CloudWebX at the address below, to access or correct your information, in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
    ],
  },
  {
    number: "11",
    title: "Confidentiality",
    blocks: [
      "Test questions, other users' information and any non-public information you see on Campus are confidential. Do not disclose them to anyone who is not authorized to see them, except where the law requires it.",
    ],
  },
  {
    number: "12",
    title: "Third-party services",
    blocks: [
      "Campus relies on third-party services such as hosting providers, cloud infrastructure, code-execution services, domain providers and email services. CloudWebX is not responsible for interruptions, policy changes, suspensions, failures or technical issues caused by those providers.",
    ],
  },
  {
    number: "13",
    title: "Availability and limitation of liability",
    blocks: [
      "We work to keep Campus available, but it may be interrupted for maintenance, updates or reasons outside our control.",
      "CloudWebX is not responsible for indirect, incidental, special or consequential losses arising from circumstances outside its reasonable control, including third-party service failures, server or hosting issues, internet or network failures, domain problems, API changes, or unauthorized actions by users or third parties.",
      "CloudWebX is not responsible for delays or failures caused by events beyond its reasonable control, including natural disasters, war, government restrictions, major internet outages, power failures, cyber incidents or other unforeseen events.",
    ],
  },
  {
    number: "14",
    title: "Suspension and termination",
    blocks: [
      "Your institution or CloudWebX may suspend or remove your access if you break these terms or your institution's rules, or when your institution's use of Campus ends. The obligations on confidentiality, intellectual property and misuse continue after your access ends.",
    ],
  },
  {
    number: "15",
    title: "Changes to these terms",
    blocks: [
      "We may update these terms from time to time. When we do, you will be asked to review and accept the new version the next time you sign in, and you cannot continue using Campus until you accept it.",
    ],
  },
  {
    number: "16",
    title: "Governing law and disputes",
    blocks: [
      "These terms are governed by the laws of India. Any dispute will first be addressed through mutual discussion. If it cannot be resolved that way, the parties may seek appropriate legal remedies under applicable law.",
    ],
  },
  {
    number: "17",
    title: "Contact",
    blocks: [
      `For questions about these terms or your data, contact ${LEGAL_ENTITY.name} at ${LEGAL_ENTITY.email} or ${LEGAL_ENTITY.phone}.`,
      "If any violation of the above terms and conditions is identified, noticed, logged or recorded, CloudWebX reserves the right to take appropriate legal action against the responsible person or party in accordance with applicable laws.",
    ],
  },
];

/** The section numbers that make up the privacy half of the Campus document. */
export const CAMPUS_PRIVACY_NUMBERS = ["7", "8", "9", "10"];

export const CLIENT_TERMS_INTRO: LegalBlock[] = [
  'This Agreement is entered into between CloudWebX ("Service Provider") and the Client ("Client") for the development, deployment, delivery, and support of software, websites, mobile applications, LMS platforms, management systems, and other digital solutions.',
  "By signing this Agreement, both parties agree to the following terms and conditions.",
];

export const CLIENT_TERMS: LegalSection[] = [
  {
    number: "1",
    title: "Project scope",
    blocks: [
      "CloudWebX will develop and deliver the project according to the mutually agreed requirements, features, scope of work, quotation, and timeline.",
      "Any feature, functionality, integration, or modification outside the agreed scope may be considered an additional requirement and may involve additional charges and development time.",
    ],
  },
  {
    number: "2",
    title: "Project requirements and changes",
    blocks: [
      "The Client must provide accurate requirements, content, information, credentials, approvals, and other materials required for development.",
      "Any major changes requested after development has started may affect the project timeline and cost.",
    ],
  },
  {
    number: "3",
    title: "Payment terms",
    blocks: [
      "The Client agrees to make payments according to the payment schedule mentioned in the quotation or mutually agreed terms.",
      "CloudWebX may temporarily suspend development, deployment, support, or access to certain services if agreed payments remain outstanding.",
    ],
  },
  {
    number: "4",
    title: "Additional features",
    blocks: [
      "Any additional feature, modification, redesign, integration, or functionality not included in the original project scope will be discussed with the Client and may be charged separately.",
    ],
  },
  {
    number: "5",
    title: "Delivery and deployment",
    blocks: [
      "CloudWebX will deliver and deploy the project according to the agreed scope and deployment arrangement.",
      "The project will be considered delivered once the agreed core functionality has been completed and made available to the Client.",
    ],
  },
  {
    number: "6",
    title: "Bug fixing and support",
    blocks: [
      "CloudWebX will provide bug-fixing and technical support according to the support period mentioned in the quotation or agreement.",
      "Bug fixing does not include new features, major changes, redesigns, or functionality requested after completion unless otherwise agreed.",
    ],
  },
  {
    number: "7",
    title: "Client-provided server or hosting",
    blocks: [
      "If the Client provides or arranges the server, hosting, cloud infrastructure, domain, or other third-party infrastructure, CloudWebX will not be responsible for any downtime, server failure, hosting issues, network outages, data-center problems, configuration issues, security incidents, data loss, or other problems arising from such infrastructure.",
      "CloudWebX may provide reasonable technical assistance where applicable; however, the Client remains responsible for the availability, maintenance, renewal, security, and operation of infrastructure provided by the Client.",
    ],
  },
  {
    number: "8",
    title: "Third-party services",
    blocks: [
      "The project may use third-party services such as hosting providers, APIs, payment gateways, cloud services, databases, domain providers, email services, or other external platforms.",
      "CloudWebX will not be responsible for service interruptions, policy changes, pricing changes, suspension, failures, or technical issues caused by such third-party providers.",
    ],
  },
  {
    number: "9",
    title: "Advertisement and promotional rights",
    blocks: [
      "CloudWebX may use screenshots, designs, general project information, or non-confidential portions of the completed project for its portfolio, website, social media, presentations, advertisements, and promotional purposes.",
      "CloudWebX will not intentionally disclose confidential information, passwords, sensitive personal data, or other confidential Client information.",
    ],
  },
  {
    number: "10",
    title: "Use of Client name and logo",
    blocks: [
      "CloudWebX may mention the Client's name, organization name, logo, and project name as a client or reference in its portfolio, website, presentations, proposals, social media, and marketing materials.",
      "Any restriction on such use should be communicated and mutually agreed in writing.",
    ],
  },
  {
    number: "11",
    title: "Intellectual property",
    blocks: [
      "Client-specific content, branding, business information, and materials provided by the Client remain the Client's property.",
      "CloudWebX retains ownership of its pre-existing code, reusable components, frameworks, libraries, templates, development tools, methodologies, and other proprietary technologies.",
      "Ownership or transfer of the final source code and project intellectual property will be subject to the terms specified in the quotation or separate written agreement.",
    ],
  },
  {
    number: "12",
    title: "Unauthorized copying and distribution",
    blocks: [
      "The Client shall not copy, reproduce, resell, redistribute, publish, transfer, reverse engineer, or commercially exploit CloudWebX's proprietary source code, templates, components, designs, frameworks, documentation, or other intellectual property without prior written permission, except where such rights have been expressly granted.",
    ],
  },
  {
    number: "13",
    title: "Client content and copyright",
    blocks: [
      "The Client is responsible for ensuring that all content, images, videos, documents, logos, trademarks, data, and other materials provided to CloudWebX are legally owned, licensed, or authorized for use.",
      "CloudWebX will not be responsible for copyright or intellectual-property claims arising from materials supplied by the Client.",
    ],
  },
  {
    number: "14",
    title: "Confidentiality",
    blocks: [
      "Both parties agree to keep confidential information received from the other party confidential and shall not disclose such information to unauthorized persons, except where disclosure is required by law or necessary for providing the agreed services.",
    ],
  },
  {
    number: "15",
    title: "Data and security",
    blocks: [
      "CloudWebX will take reasonable technical measures to protect project data under its control.",
      "However, no internet-connected system can be guaranteed to be completely secure. The Client is responsible for maintaining the confidentiality of its passwords, accounts, and access credentials.",
    ],
  },
  {
    number: "16",
    title: "Misuse of software",
    blocks: [
      "The Client shall not use the software or services for illegal activities, fraud, unauthorized access, malicious activities, infringement of third-party rights, or any activity prohibited by applicable law.",
    ],
  },
  {
    number: "17",
    title: "Limitation of liability",
    blocks: [
      "CloudWebX will not be responsible for indirect, incidental, special, or consequential losses arising from circumstances outside CloudWebX's reasonable control, including third-party service failures, server or hosting issues, internet or network failures, domain problems, API changes, payment gateway issues, or unauthorized actions by users or third parties.",
    ],
  },
  {
    number: "18",
    title: "Termination",
    blocks: [
      "Either party may terminate the agreement subject to the applicable payment, intellectual-property, confidentiality, and other outstanding obligations.",
      "Payments already made for completed work, third-party services, server or domain expenses, or other non-refundable costs may not be refundable unless otherwise agreed in writing.",
    ],
  },
  {
    number: "19",
    title: "Unauthorized access",
    blocks: [
      "Any unauthorized access or attempt to execute unauthorized commands on the system will be logged and recorded for security and auditing purposes.",
      "If any such unauthorized activity is recorded by the Server Administrator, appropriate legal action may be taken against the person responsible.",
    ],
  },
  {
    number: "20",
    title: "Force majeure",
    blocks: [
      "CloudWebX will not be responsible for delays or failure to perform caused by circumstances beyond its reasonable control, including natural disasters, war, government restrictions, major internet outages, power failures, cyber incidents, third-party service failures, or other unforeseen events.",
    ],
  },
  {
    number: "21",
    title: "Client approval",
    blocks: [
      "The Client is responsible for reviewing and approving the project, designs, features, content, and functionality during development.",
      "Once the Client provides approval for a specific stage or deliverable, changes requested later may be treated as additional work.",
    ],
  },
  {
    number: "22",
    title: "Maintenance and future updates",
    blocks: [
      "After the agreed support period, additional maintenance, updates, feature development, server management, or technical support may be provided under a separate maintenance agreement or additional charges.",
    ],
  },
  {
    number: "23",
    title: "Agreement modification",
    blocks: [
      "Any modification to this Agreement must be mutually agreed upon by both parties, preferably in written form.",
    ],
  },
  {
    number: "24",
    title: "Governing law and dispute resolution",
    blocks: [
      "This Agreement shall be governed by the applicable laws of India.",
      "Both parties shall first attempt to resolve any dispute through mutual discussion. If the dispute cannot be resolved mutually, the parties may seek appropriate legal remedies under applicable law.",
    ],
  },
  {
    number: "25",
    title: "Acceptance of agreement",
    blocks: [
      "By signing, the Client confirms that they have read, understood, and agreed to all the terms and conditions mentioned in this Agreement.",
      "This Agreement should be read together with the applicable project quotation, scope of work, and payment terms.",
      "If any violation of the above terms and conditions is identified, noticed, logged, or recorded, CloudWebX reserves the right to take appropriate legal action against the responsible person or party in accordance with applicable laws.",
    ],
  },
];

/** How this website itself handles data — separate from Campus, and short
 *  because the site genuinely does very little: no analytics, no cookies, and
 *  a contact form that composes mail locally instead of posting to a server.
 *  Every claim here is checkable against the source in this repository. */
export const SITE_PRIVACY: LegalSection[] = [
  {
    number: "A",
    title: "This website",
    blocks: [
      "This page covers cloudwebx.in, the CloudWebX company website. Campus, the learning platform at campus.cloudwebx.in, is covered by the Campus sections below.",
      "The website does not set cookies, does not run analytics or advertising trackers, and does not have accounts to sign in to.",
    ],
  },
  {
    number: "B",
    title: "The contact form",
    blocks: [
      "The contact form on this site does not submit anything to a server. When you send it, it opens your own email application with the message already written, and nothing is transmitted until you choose to send that email yourself.",
      "If you do send it, we receive what any email contains: your name, your email address, whatever you wrote, and the company name if you filled that field in. We use it only to reply to you and to discuss the work you asked about.",
    ],
  },
  {
    number: "C",
    title: "Hosting and third parties",
    blocks: [
      "The site is served by a hosting provider and loads fonts from Google Fonts. Those providers may record standard technical request information, such as your IP address, as part of delivering the page. CloudWebX does not control or retain that information.",
    ],
  },
  {
    number: "D",
    title: "Your rights and contact",
    blocks: [
      `To ask what information we hold about you, or to have it corrected or deleted, write to ${LEGAL_ENTITY.email} or call ${LEGAL_ENTITY.phone}. We handle these requests in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.`,
    ],
  },
];
