import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "../data/site";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects", superscript: "5" },
  { label: "Contact", href: "#contact" },
];

function ConsultationButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="rounded-md border border-white/15 bg-black/50 px-4 py-2 text-xs shadow-lg shadow-black/40 backdrop-blur-md transition-colors duration-300 hover:bg-black/70 sm:px-5 sm:text-sm"
      >
        Get Free Consultation
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <a
            href={`tel:${site.phoneHref}`}
            className="flex items-center gap-3 px-4 py-3 text-sm text-white transition-colors duration-300 hover:bg-white/10"
          >
            <Phone size={16} strokeWidth={1.5} className="text-white/70" />
            <span>
              Call
              <span className="block text-xs text-white/50">{site.phone}</span>
            </span>
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border-t border-white/10 px-4 py-3 text-sm text-white transition-colors duration-300 hover:bg-white/10"
          >
            <MessageCircle size={16} strokeWidth={1.5} className="text-white/70" />
            <span>
              WhatsApp
              <span className="block text-xs text-white/50">{site.phone}</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/15 bg-black/10 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 md:px-12">
        <Reveal delay={0} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10 p-1.5 shadow-lg shadow-black/30 backdrop-blur-md">
            <img
              src="/logo-mark.png"
              alt="VibeScript"
              width={48}
              height={48}
              className="h-full w-full object-contain"
              decoding="async"
              fetchPriority="high"
            />
          </span>
          <span className="text-lg font-medium tracking-tight drop-shadow-md sm:text-xl">
            VibeScript
          </span>
        </Reveal>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV_LINKS.map((link, i) => (
            <Reveal key={link.label} delay={100 + i * 100} as="span">
              <a
                href={link.href}
                className="text-sm text-white/85 drop-shadow-md transition-colors duration-300 hover:text-white"
              >
                {link.label}
                {link.superscript && (
                  <sup className="ml-0.5 font-mono text-[10px] text-white/60">{link.superscript}</sup>
                )}
              </a>
            </Reveal>
          ))}
        </nav>

        <Reveal delay={500}>
          <ConsultationButton />
        </Reveal>
      </div>
    </header>
  );
}
