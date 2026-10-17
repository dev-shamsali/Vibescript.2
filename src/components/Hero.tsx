import { motion, useReducedMotion } from "motion/react";
import { site } from "../data/site";

const PARTS = [
  { text: "VIBE", accent: false },
  { text: "SCRIPT", accent: true },
];

function Wordmark() {
  const reduce = useReducedMotion();
  let i = 0;
  return (
    <div
      aria-hidden="true"
      className="select-none overflow-hidden whitespace-nowrap px-[1.2vw] pt-[1.6vw] text-center text-[16.5vw] font-extrabold uppercase leading-[0.8] tracking-[-0.055em]"
    >
      {PARTS.map((part) => (
        <span key={part.text} className={part.accent ? "text-(--accent)" : "text-(--ink)"}>
          {part.text.split("").map((ch) => {
            const delay = i++ * 0.05;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export function HeroWordmark() {
  return (
    <section id="top" className="relative">
      <Wordmark />
    </section>
  );
}

export function HeroBody() {
  return (
    <div className="swiss-cols relative grid min-h-[calc(100dvh-30vw)] grid-cols-4 content-start gap-y-10 overflow-hidden pb-16 pt-16 md:min-h-[calc(100dvh-20vw)] md:grid-cols-8 md:gap-y-0 md:pt-24">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full text-(--line)"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      <p className="relative col-span-3 col-start-1 pl-4 text-[0.82rem] leading-snug text-(--mute) md:col-span-2 md:col-start-2 md:pl-3">
        {site.description}
      </p>

      <div className="relative col-span-4 col-start-1 px-4 md:col-span-4 md:col-start-5 md:px-0 md:pl-3">
        <h1 className="text-[clamp(2rem,4.2vw,4rem)] font-normal leading-[1.06] tracking-[-0.03em]">
          Code. Design.
          <br />
          Deliver. <span className="text-(--accent)">Automate</span>.
        </h1>
        <p className="mt-6 max-w-[44ch] text-[1rem] leading-relaxed text-(--mute)">
          We build web and mobile apps that bring clarity, speed, and reliability to the way your
          business runs online, and AI automation that keeps it running.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={`tel:${site.phoneHref}`} className="btn-primary px-6 py-3.5 text-[0.9rem] font-medium">
            Book 15-mins call
          </a>
          <a href="#automation" className="swiss-link text-[0.9rem]">
            See AI automation
          </a>
        </div>
      </div>
    </div>
  );
}
