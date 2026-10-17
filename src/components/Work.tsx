import { motion, useReducedMotion } from "motion/react";
import { projects } from "../data/site";

export function Work() {
  const reduce = useReducedMotion();
  return (
    <section id="work" className="swiss-cols relative scroll-mt-14 py-24 md:py-36">
      <div className="grid grid-cols-4 md:grid-cols-8">
        <h2 className="col-span-4 col-start-1 px-4 text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-6 md:col-start-2 md:px-0 md:pl-3">
          Selected work.
        </h2>
      </div>

      <div className="mt-16 md:mt-24">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-4 gap-y-2 border-t border-(--line) py-7 transition-colors hover:bg-(--ink) hover:text-(--paper) md:grid-cols-8 md:py-9"
          >
            <span className="col-span-4 px-4 font-mono text-[0.75rem] opacity-60 md:col-span-1 md:px-0 md:pl-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="col-span-4 px-4 text-[clamp(1.5rem,3vw,2.6rem)] font-medium leading-none tracking-[-0.035em] md:col-span-3 md:col-start-2 md:px-0 md:pl-3">
              {p.title}
              {p.featured && <span className="ml-3 align-middle text-[0.7rem] font-medium text-(--accent) group-hover:text-inherit">NEW</span>}
              <span aria-hidden="true" className="ml-3 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </h3>
            <p className="col-span-4 px-4 text-[0.95rem] leading-relaxed opacity-60 md:col-span-3 md:col-start-5 md:px-0 md:pl-3">
              {p.description}
            </p>
            <span className="col-span-4 px-4 text-[0.8rem] opacity-60 md:col-span-1 md:col-start-8 md:px-0 md:pl-3">{p.tag}</span>
          </motion.a>
        ))}
        <div className="border-t border-(--line)" />
      </div>
    </section>
  );
}
