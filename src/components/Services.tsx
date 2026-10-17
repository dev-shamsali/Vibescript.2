import { motion, useReducedMotion } from "motion/react";
import { capabilities } from "../data/site";

export function Services() {
  const reduce = useReducedMotion();
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, delay: Math.min(i * 0.05, 0.2), ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="services" className="swiss-cols relative scroll-mt-14 py-24 md:py-36">
      <div className="grid grid-cols-4 md:grid-cols-8">
        <motion.h2
          {...rise(0)}
          className="col-span-4 col-start-1 px-4 text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-6 md:col-start-2 md:px-0 md:pl-3"
        >
          Reliable code, shipped fast.
        </motion.h2>
        <motion.p
          {...rise(1)}
          className="col-span-4 col-start-1 mt-6 max-w-[48ch] px-4 text-[1rem] leading-relaxed text-(--mute) md:col-span-3 md:col-start-2 md:px-0 md:pl-3"
        >
          We don&apos;t just write code. We engineer products that scale with your business, from the first wireframe to the final deploy.
        </motion.p>
      </div>

      <div className="mt-16 md:mt-24">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.title}
            {...rise(i)}
            className="group grid grid-cols-4 gap-y-3 border-t border-(--line) py-8 transition-colors hover:bg-(--ink)/[0.03] md:grid-cols-8 md:py-10"
          >
            <span className="col-span-4 px-4 font-mono text-[0.75rem] text-(--mute) md:col-span-1 md:px-0 md:pl-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-4 px-4 text-[1.25rem] font-medium tracking-[-0.02em] md:col-span-3 md:col-start-2 md:px-0 md:pl-3 md:text-[1.5rem]">
              {c.title}
              {c.title === "AI Automation" && <span className="ml-3 align-middle text-[0.7rem] font-medium text-(--accent)">NEW</span>}
            </h3>
            <p className="col-span-4 max-w-[46ch] px-4 text-[1rem] leading-relaxed text-(--mute) md:col-span-4 md:col-start-5 md:px-0 md:pl-3">
              {c.description}
            </p>
          </motion.div>
        ))}
        <div className="border-t border-(--line)" />
        <div className="mt-10 px-4 md:pl-[calc(12.5%+0.75rem)] md:px-0">
          <a href="#work" className="swiss-link text-[0.9rem]">See our work</a>
        </div>
      </div>
    </section>
  );
}
