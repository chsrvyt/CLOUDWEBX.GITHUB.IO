import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalDocument } from "@/components/legal/legal-page";
import {
  CAMPUS_PRIVACY_NUMBERS,
  CAMPUS_TERMS,
  LEGAL_ENTITY,
  SITE_PRIVACY,
  TERMS_EFFECTIVE,
  TERMS_VERSION,
} from "@/lib/constants/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How CloudWebX handles information on cloudwebx.in and in Campus — what is collected, how it is used, who can see it and how long it is kept.",
  alternates: { canonical: "/privacy" },
};

/** The Campus privacy clauses keep their original numbers (7–10) here rather
 *  than being renumbered 1–4: they are part of the Campus terms that users
 *  have already accepted by version, and the numbering has to match. */
const CAMPUS_PRIVACY = CAMPUS_TERMS.filter((section) => CAMPUS_PRIVACY_NUMBERS.includes(section.number));

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Privacy"
      title="Privacy Policy."
      lede="What we collect, why, who can see it and how long we keep it — stated separately for this website and for Campus, because the two handle very different amounts of information."
      meta={`${LEGAL_ENTITY.name} · Campus terms version ${TERMS_VERSION} · Effective ${TERMS_EFFECTIVE}`}
    >
      <nav aria-label="Sections on this page" className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-8">
        <a href="#site" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent">
          This website →
        </a>
        <a href="#campus-privacy" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent">
          Campus →
        </a>
        <Link href="/terms" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-accent">
          Terms of Use ↗
        </Link>
      </nav>

      <LegalDocument
        id="site"
        idPrefix="site"
        heading="cloudwebx.in — this website"
        sections={SITE_PRIVACY}
      />

      <div className="mt-24">
        <LegalDocument
          id="campus-privacy"
          idPrefix="campus-privacy"
          heading="Campus — the learning platform"
          version={`Sections 7–10 of the Campus Terms of Use & Privacy Policy, version ${TERMS_VERSION}`}
          intro={[
            "Campus is used through a college or institute, and handles considerably more information than this website does. The clauses below are reproduced from the Campus Terms of Use & Privacy Policy, keeping their original section numbers.",
          ]}
          sections={CAMPUS_PRIVACY}
        />

        <p className="mt-12 max-w-2xl border-l border-border-strong pl-6 text-sm leading-relaxed text-text-secondary">
          The full Campus agreement, including the terms of use those privacy clauses sit inside, is on the{" "}
          <Link href="/terms#campus" className="cw-focus-ring rounded text-accent underline decoration-accent/40 underline-offset-4">
            Terms of Use
          </Link>{" "}
          page. For access, correction or deletion requests, write to{" "}
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="cw-focus-ring rounded text-accent underline decoration-accent/40 underline-offset-4">
            {LEGAL_ENTITY.email}
          </a>
          .
        </p>
      </div>
    </LegalPage>
  );
}
