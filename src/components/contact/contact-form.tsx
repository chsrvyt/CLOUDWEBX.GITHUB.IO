"use client";

import { useState, type FormEvent } from "react";
import { CloudField, FieldLabel } from "@/components/cloud-field/cloud-field";
import { Magnetic } from "@/components/shared/magnetic";
import { RevealLines, Reveal } from "@/lib/animations/reveal";
import { SITE } from "@/lib/constants/nav";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "company", label: "Company", type: "text" },
] as const;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  /** There is no backend to post to, so the form hands the message to the
   *  visitor's own mail client already composed, rather than showing a
   *  "received" confirmation for a submission that went nowhere. Replace with
   *  a real endpoint when one exists; the fields already match. */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      "",
      "What they're building:",
      String(data.get("project") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Project enquiry — ${name}`
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-28 md:py-40">
      <div className="absolute inset-0 -z-10 opacity-40">
        <CloudField variant="converge" interactive={false} dense />
        <FieldLabel>Converge</FieldLabel>
      </div>
      <span className="cw-tick absolute top-10 right-6 hidden lg:block" aria-hidden />

      <div className="cw-container">
        <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] font-semibold tracking-tight text-text">
          <RevealLines lines={["Have a", "difficult", "problem?"]} />
        </h2>
        <Reveal delay={0.15}>
          <p className="font-display mt-4 text-[clamp(2rem,5vw,4rem)] leading-none font-semibold tracking-tight text-accent">Good.</p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">Let&apos;s build the system that solves it.</p>
        </Reveal>

        <div className="cw-grid mt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            {submitted ? (
              <Reveal>
                <div className="rounded-sm border border-accent/40 bg-surface/60 px-6 py-8">
                  <p className="font-mono text-sm text-text">Your mail client should have opened with the message ready to send.</p>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-text-secondary">
                    If nothing opened, write to{" "}
                    <a href={`mailto:${SITE.email}`} className="cw-focus-ring rounded text-accent underline decoration-accent/40 underline-offset-4">
                      {SITE.email}
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {FIELDS.map((field) => (
                  <label key={field.name} className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">{field.label}</span>
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      className="cw-focus-ring rounded-none border-b border-border bg-transparent py-2.5 text-text outline-none transition-colors focus:border-accent"
                    />
                  </label>
                ))}
                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">What are you building?</span>
                  <textarea
                    required
                    name="project"
                    rows={4}
                    className="cw-focus-ring resize-none rounded-none border-b border-border bg-transparent py-2.5 text-text outline-none transition-colors focus:border-accent"
                  />
                </label>
                <Magnetic strength={0.25} className="mt-4 w-fit">
                  <button
                    type="submit"
                    data-cursor="view"
                    className="cw-focus-ring group flex w-fit items-center gap-2 rounded font-mono text-[11px] font-medium tracking-[0.2em] text-text uppercase transition-colors hover:text-accent"
                  >
                    Send project
                    <span className="transition-transform duration-300 ease-[var(--cw-ease)] group-hover:translate-x-1">→</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

          {/* Three columns, not two: a real address is wider than the
              placeholder this column was sized for and spilled past its edge. */}
          <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Or write to</p>
            <a href={`mailto:${SITE.email}`} className="cw-focus-ring mt-2 block rounded font-mono text-sm text-text underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
