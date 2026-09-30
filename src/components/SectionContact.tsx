import { Mail, Phone, MapPin, MessageCircle, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

const CONTACT_ROWS = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: MapPin, label: "Location", value: site.locationShort, href: undefined },
  { icon: MessageCircle, label: "WhatsApp", value: "Message us", href: site.whatsapp },
];

export function SectionContact() {
  return (
    <section id="contact" className="px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal delay={0} className="max-w-xl">
          <h2 className="text-4xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Let&apos;s build
            <br />
            something.
          </h2>
          <p className="mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base">
            {site.name} takes on a limited number of projects at a time. Reach out and tell us
            what you&apos;re building.
          </p>
        </Reveal>

        <Reveal delay={180} className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-black/50 px-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:px-6">
            {CONTACT_ROWS.map((row, i) => {
              const Icon = row.icon;
              const content = (
                <div
                  className={`group flex items-center gap-4 py-5 transition-colors duration-300 hover:bg-white/5 ${
                    i < CONTACT_ROWS.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Icon size={16} strokeWidth={1.5} className="text-white/80" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                      {row.label}
                    </span>
                    <span className="block truncate text-sm text-white">{row.value}</span>
                  </div>
                  {row.href && (
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  )}
                </div>
              );

              return row.href ? (
                <a
                  key={row.label}
                  href={row.href}
                  target={row.href.startsWith("http") ? "_blank" : undefined}
                  rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={row.label}>{content}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
