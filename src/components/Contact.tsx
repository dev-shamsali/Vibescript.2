import { site } from "../data/site";

const ROWS = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { label: "WhatsApp", value: "Message us", href: site.whatsapp },
  { label: "Location", value: site.locationShort, href: undefined },
];

export function Contact() {
  return (
    <section id="contact" className="swiss-cols relative scroll-mt-14 py-24 md:py-40">
      <div className="grid grid-cols-4 md:grid-cols-8">
        <h2 className="col-span-4 col-start-1 px-4 text-[clamp(2.6rem,7.4vw,7rem)] font-medium leading-[0.98] tracking-[-0.05em] md:col-span-7 md:col-start-2 md:px-0 md:pl-3">
          Let&apos;s build something.
        </h2>
        <p className="col-span-4 col-start-1 mt-8 max-w-[44ch] px-4 text-[1rem] leading-relaxed text-(--mute) md:col-span-3 md:col-start-2 md:px-0 md:pl-3">
          {site.name} takes on a limited number of projects at a time. Reach out and tell us what you&apos;re building or what you want automated.
        </p>
        <ul className="col-span-4 col-start-1 mt-10 border-b border-(--line) md:col-span-4 md:col-start-5 md:mt-8">
          {ROWS.map((r) => {
            const inner = (
              <>
                <span className="text-[0.8rem] text-(--mute)">{r.label}</span>
                <span className="truncate text-[1.05rem] font-medium">{r.value}</span>
              </>
            );
            return (
              <li key={r.label} className="border-t border-(--line)">
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="grid grid-cols-[6rem_1fr] gap-4 px-4 py-4 transition-colors hover:text-(--accent) md:px-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="grid grid-cols-[6rem_1fr] gap-4 px-4 py-4 md:px-3">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
