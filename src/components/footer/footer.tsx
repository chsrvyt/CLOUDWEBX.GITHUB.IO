import { SmoothLink } from "@/components/shared/smooth-link";
import { LogoMark } from "@/components/shared/logo-mark";
import { NAV_LINKS, CONTACT_LINK, SITE, PILLARS } from "@/lib/constants/nav";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="cw-container">
        <div className="cw-grid">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2.5">
              <LogoMark className="size-5 text-text" />
              <span className="font-mono text-[13px] tracking-[0.28em] text-text uppercase">CloudWeb</span>
            </div>
            <ul className="mt-6 flex flex-col gap-1.5">
              {PILLARS.map((p) => (
                <li key={p} className="font-mono text-[11px] tracking-[0.15em] text-text-secondary uppercase">{p}</li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 mt-10 md:col-span-2 md:mt-0">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Navigate</p>
            <ul className="flex flex-col gap-2">
              {[...NAV_LINKS, CONTACT_LINK].map((link) => (
                <li key={link.href}>
                  <SmoothLink href={link.href} className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-text">
                    {link.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 mt-10 md:col-span-3 md:mt-0">
            <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-text-secondary uppercase">Contact</p>
            <a href={`mailto:${SITE.email}`} className="cw-focus-ring rounded font-mono text-[11px] tracking-[0.1em] text-text-secondary uppercase transition-colors hover:text-text">
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">© {SITE.year} CloudWeb</p>
          <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-text-secondary uppercase">
            <span className="size-1.5 rounded-full bg-accent-bright" />
            Systems online
          </p>
        </div>
      </div>
    </footer>
  );
}
