import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalDocument } from "@/components/legal/legal-page";
import {
  CAMPUS_INTRO,
  CAMPUS_TERMS,
  CLIENT_TERMS,
  CLIENT_TERMS_INTRO,
  LEGAL_ENTITY,
  TERMS_EFFECTIVE,
  TERMS_VERSION,
} from "@/lib/constants/legal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The Campus Terms of Use and the CloudWeb Client Terms & Conditions and Software Development Agreement.",
  alternates: { canonical: "/terms" },
};

/** Two separate agreements live here because CloudWeb has two kinds of
 *  counterparty — people who sign in to Campus, and clients who commission
 *  software — and conflating them would leave each reading clauses that do
 *  not apply to them. */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal / Terms"
      title="Terms of Use."
      lede="Two agreements: one for everyone who signs in to Campus, and one for clients commissioning software from CloudWeb. Read the one that applies to you."
      meta={`${LEGAL_ENTITY.name} · Campus terms version ${TERMS_VERSION} · Effective ${TERMS_EFFECTIVE}`}
    >
      <nav aria-label="Agreements on this page" className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-8">
        <a href="#campus" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent">
          Campus — Terms of Use →
        </a>
        <a href="#client" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent">
          Client Services Agreement →
        </a>
        <Link href="/privacy" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-accent">
          Privacy Policy ↗
        </Link>
      </nav>

      <LegalDocument
        id="campus"
        idPrefix="campus"
        heading="Campus — Terms of Use & Privacy Policy"
        version={`Version ${TERMS_VERSION} · Effective ${TERMS_EFFECTIVE}`}
        intro={CAMPUS_INTRO}
        sections={CAMPUS_TERMS}
      />

      <div className="mt-24">
        <LegalDocument
          id="client"
          idPrefix="client"
          heading="Client Terms & Conditions and Software Development Agreement"
          intro={CLIENT_TERMS_INTRO}
          sections={CLIENT_TERMS}
        />
      </div>
    </LegalPage>
  );
}
