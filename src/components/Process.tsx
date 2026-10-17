import { motion, useReducedMotion } from "motion/react";
import { process } from "../data/site";

const STARTS = ["md:col-start-2", "md:col-start-3", "md:col-start-5", "md:col-start-7"];

export function Process() {
  const reduce = useReducedMotion();
  return (
    <section id="process" className="swiss-cols relative scroll-mt-14 py-24 md:py-36">
      <div className="grid grid-cols-4 md:grid-cols-8">
        <h2 className="col-span-4 col-start-1 px-4 text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em] md:col-span-6 md:col-start-2 md:px-0 md:pl-3">
          Built by builders.
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-4 gap-y-14 md:mt-24 md:grid-cols-8 md:gap-y-0">
        {process.map((step, i) => (
          <motion.div
            key={step.verb}
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`col-span-4 border-t border-(--line) px-4 pt-6 md:col-span-2 md:px-0 md:pl-3 ${STARTS[i]}`}
          >
            <span className="font-mono text-[0.75rem] text-(--mute)">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              {step.verb}
            </h3>
            <p className="mt-4 max-w-[30ch] text-[0.95rem] leading-relaxed text-(--mute)">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
