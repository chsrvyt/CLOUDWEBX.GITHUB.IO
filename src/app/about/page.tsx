import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { GoldButton } from "@/components/shared/gold-button";
import { ProfileLink } from "@/components/about/profile-link";
import { TEAM } from "@/lib/constants/team";
import { PILLARS } from "@/lib/constants/nav";
import { LEGAL_ENTITY } from "@/lib/constants/legal";
import { CAMPUS } from "@/lib/constants/campus";

export const metadata: Metadata = {
  title: "About",
  description:
    "CloudWeb Technologies is an engineering-focused company working across AI, software, cybersecurity and infrastructure — and the team behind Campus.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative cw-container pt-40 pb-20 md:pt-48">
        <span className="cw-tick absolute top-32 left-6 hidden lg:block" aria-hidden />

        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">About / CloudWeb</p>

        <h1 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.96] font-semibold tracking-tight text-text">
          We build what
          <span className="block text-text-secondary">should exist next.</span>
        </h1>

        <div className="cw-grid mt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              {LEGAL_ENTITY.name} is an engineering-focused technology company working across artificial intelligence,
              software engineering, cybersecurity and infrastructure. We design and deliver software, websites, mobile
              applications, LMS platforms and management systems — and we build our own products alongside client work.
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-text-secondary">
              The clearest example is{" "}
              <a
                href={CAMPUS.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-focus-ring rounded text-accent underline decoration-accent/40 underline-offset-4"
              >
                Campus
              </a>
              , a learning, practice and assessment platform now running in colleges — the same engineering we bring to
              client systems, pointed at a problem we chose ourselves.
            </p>
          </div>

          <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <ul className="flex flex-col gap-3 border-t border-border pt-6">
              {PILLARS.map((pillar, i) => (
                <li key={pillar} className="flex items-baseline gap-3 font-mono text-sm tracking-[0.15em] text-text uppercase">
                  <span className="text-[10px] text-text-secondary">{(i + 1).toString().padStart(2, "0")}</span>
                  {pillar}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">Team</p>
        <h2 className="mb-16 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          The people behind it.
        </h2>

        {/* One full-width row per founder rather than three cards: the bios run
            three and four paragraphs, which a third of the page can't hold
            without becoming a column of text. The identity column sticks while
            the bio beside it scrolls. */}
        <ul className="border-t border-border">
          {TEAM.map((member) => (
            <li key={member.name} className="border-b border-border py-14 md:py-16">
              <div className="cw-grid items-start">
                <div className="col-span-4 md:col-span-3 lg:sticky lg:top-28 lg:col-span-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{member.index}</p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-text md:text-4xl">{member.name}</h3>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-text-secondary uppercase">{member.role}</p>

                  {/* Directly under name and role — the profile links are the
                      most useful thing in the row, so they come before the
                      tags rather than trailing after them. */}
                  <ul className="mt-7 flex flex-wrap gap-3">
                    {member.links.map((link, i) => (
                      <li key={link.href}>
                        <ProfileLink kind={link.kind} label={link.label} href={link.href} owner={member.name} order={i} />
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {member.focus.map((area) => (
                      <li
                        key={area}
                        className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-4 mt-10 md:col-span-5 md:mt-0 lg:col-span-7 lg:col-start-6">
                  {member.bio.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="mt-5 max-w-2xl text-sm leading-relaxed text-text-secondary first:mt-0 md:text-base">
                      {paragraph}
                    </p>
                  ))}

                  {member.highlights && (
                    <ul className="mt-10 flex max-w-2xl flex-col gap-3 border-t border-border pt-6">
                      {member.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-text uppercase">
                          <span className="text-accent" aria-hidden>
                            —
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <div className="cw-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">Contact</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-semibold tracking-tight text-text">
              Start a conversation.
            </h2>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <GoldButton href="#contact" rise>
                Start a project
              </GoldButton>

              <a
                href={`mailto:${LEGAL_ENTITY.email}`}
                className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-accent"
              >
                {LEGAL_ENTITY.email}
              </a>

              <a
                href={LEGAL_ENTITY.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cw-focus-ring group inline-flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase transition-colors hover:text-accent"
              >
                @{LEGAL_ENTITY.instagram}
                <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </div>

          <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Legal</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/terms" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-accent">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
