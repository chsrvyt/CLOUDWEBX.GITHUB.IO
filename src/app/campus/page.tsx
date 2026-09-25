import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer/footer";
import { ProductMock } from "@/components/campus/product-mock";
import { Magnetic } from "@/components/shared/magnetic";
import { GoldButton } from "@/components/shared/gold-button";
import { Coverflow } from "@/components/shared/coverflow";
import {
  CAMPUS,
  CAMPUS_FEATURES,
  CAMPUS_JOURNEY,
  CAMPUS_LANGUAGES,
  CAMPUS_MODES,
  CAMPUS_MILESTONES,
  CAMPUS_ROLES,
  CAMPUS_SYMBIOSIS,
} from "@/lib/constants/campus";

export const metadata: Metadata = {
  title: "Campus — Learning platform for colleges",
  description:
    "Campus is CloudWeb's learning, practice and assessment platform: interactive lessons, real code execution, locked-down tests, an interview studio, aptitude practice and company prep.",
  alternates: { canonical: "/campus" },
};

/** The full Campus page. The home page carries a preview of the product; this
 *  is the whole case for it, for a visitor who followed that preview or came
 *  from the nav. It still ends at campus.cloudwebx.in — the product runs
 *  there, and nothing here tries to reimplement it. */
export default function CampusPage() {
  return (
    <>
      <section className="relative cw-container pt-40 pb-20 md:pt-48">
        <span className="cw-tick absolute top-32 left-6 hidden lg:block" aria-hidden />

        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-accent uppercase">Product / Campus</p>

        <h1 className="font-display max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.96] font-semibold tracking-tight text-text">
          Interactive learning,
          <span className="block text-text-secondary">not lecture videos.</span>
        </h1>

        <div className="cw-grid mt-16 items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">{CAMPUS.positioning}.</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary">{CAMPUS.summary}</p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic strength={0.2}>
                <a
                  href={CAMPUS.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="cw-focus-ring group inline-flex items-center gap-3 rounded border border-border-strong px-5 py-3 font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors duration-300 ease-[var(--cw-ease)] hover:border-accent hover:text-accent"
                >
                  {CAMPUS.domain}
                  <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </Magnetic>

              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {CAMPUS.status}
              </span>
            </div>
          </div>

          <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
            <ProductMock />
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">
              Every topic reflows into {CAMPUS_MODES.join(" · ")}
            </p>
          </div>
        </div>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">Capabilities</p>
        <h2 className="mb-16 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          Everything a placement cell needs.
        </h2>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {CAMPUS_FEATURES.map((feature) => (
            <li key={feature.index} className="border-t border-border pt-7">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{feature.index}</p>
              <h3 className="mt-4 font-mono text-[11px] tracking-[0.2em] text-text uppercase">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-border pt-8">
          <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Executes for real</span>
          {CAMPUS_LANGUAGES.map((language) => (
            <span
              key={language}
              className="rounded-sm border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] text-text uppercase"
            >
              {language}
            </span>
          ))}
        </div>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">In the field</p>
        <h2 className="mb-16 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          Final year test performed on our platform.
          <span className="mt-2 block text-text-secondary">Symbiosis Institute of Technology, Nagpur.</span>
        </h2>

        <Coverflow items={CAMPUS_SYMBIOSIS} label="Final year test at Symbiosis Institute of Technology, Nagpur" />
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">Milestones</p>
        <h2 className="mb-16 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          A partner signed.
          <span className="mt-2 block text-text-secondary">The platform under load.</span>
        </h2>

        <Coverflow items={CAMPUS_MILESTONES} label="CloudWeb milestones: the Softronix partnership and Campus under load" />
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">The arc</p>
        <h2 className="mb-16 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          Learn. Practice. Prove.
        </h2>

        <ol className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
          {CAMPUS_JOURNEY.map((step) => (
            <li key={step.index} className="border-t border-border pt-7">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">{step.index}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <p className="mb-6 font-mono text-[11px] tracking-[0.3em] text-text-secondary uppercase">Built for the whole campus</p>
        <h2 className="mb-16 max-w-2xl text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-tight text-text">
          Four roles, one product.
        </h2>

        <ul className="border-t border-border">
          {CAMPUS_ROLES.map((role, i) => (
            <li
              key={role.name}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border py-7 md:grid-cols-[4rem_14rem_1fr]"
            >
              <span className="font-mono text-sm text-text-secondary">{(i + 1).toString().padStart(2, "0")}</span>
              <span className="text-xl font-medium tracking-tight text-text md:text-2xl">{role.name}</span>
              <span className="col-span-2 text-sm leading-relaxed text-text-secondary md:col-span-1">{role.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="cw-container border-t border-border py-20 md:py-28">
        <div className="cw-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-semibold tracking-tight text-text">
              Bring Campus to your college.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
              Campus is running in colleges now. Sign in with a college account, or talk to us about setting it up for
              your institution.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <GoldButton href={CAMPUS.href} external arrow="↗" rise>
                Open Campus
              </GoldButton>

              <Link
                href="/#contact"
                data-cursor="view"
                className="cw-focus-ring group inline-flex items-center gap-2 rounded font-mono text-[11px] tracking-[0.15em] text-text uppercase transition-colors hover:text-accent"
              >
                Talk to us
                <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Using Campus</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link href="/terms#campus" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-accent">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy#campus-privacy" className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-accent">
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
