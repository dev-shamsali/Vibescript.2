import { useState } from "react";
import { site } from "../data/site";

const LINKS = [
  { href: "#services", label: "Services", col: "lg:col-start-2" },
  { href: "#automation", label: "AI Automation", col: "lg:col-start-3" },
  { href: "#process", label: "Process", col: "lg:col-start-4" },
  { href: "#work", label: "Work", col: "lg:col-start-5" },
  { href: "#contact", label: "Contact", col: "lg:col-start-6" },
];

const cell =
  "relative hidden h-full items-center whitespace-nowrap pl-3 text-[0.8rem] transition-colors hover:text-(--accent) lg:flex after:absolute after:bottom-0 after:left-0 after:h-2 after:w-px after:bg-(--ink)";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-(--paper) text-(--ink)">
      <nav
        aria-label="Primary"
        className="swiss-cols grid h-[52px] grid-cols-4 border-b border-(--line) md:grid-cols-8"
      >
        <a href="#top" className="flex h-full items-center pl-4" aria-label="VibeScript Solutions home">
          <img src="/logo-mark.png" alt="" width={30} height={30} className="h-[30px] w-[30px]" />
        </a>

        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className={`${cell} ${l.col}`}>
            {l.label}
          </a>
        ))}

        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={`${cell} lg:col-start-7`}>
          WhatsApp
        </a>
        <a href={`tel:${site.phoneHref}`} className={`${cell} font-medium lg:col-start-8`}>
          Free consultation
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu"
          className="col-start-4 flex h-full items-center justify-end pr-4 text-[0.8rem] md:col-start-8 lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="menu"
          className="absolute inset-x-0 top-[52px] border-b border-(--line) bg-(--paper) px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="divide-y divide-(--line)">
            {[...LINKS, { href: `tel:${site.phoneHref}`, label: "Free consultation" }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-[1.5rem] font-medium tracking-tight"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
