import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useStaticMotion } from "../hooks/useStaticMotion";
import { automations } from "../data/site";

const STEP_MS = 1300;
const HOLD_MS = 2600;
const LABELS = ["Trigger", "AI", "Action"] as const;

export function AiAutomation() {
  const reduce = useStaticMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(reduce ? 3 : 0); // 0..3: how many stages have fired
  const [pinned, setPinned] = useState(false);

  // Fire the stages one by one, hold, then move to the next automation.
  useEffect(() => {
    if (reduce || !inView) return;
    if (step < 3) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    if (pinned) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % automations.length);
      setStep(0);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [step, active, inView, reduce, pinned]);

  const pick = (i: number) => {
    setActive(i);
    setStep(reduce ? 3 : 0);
    setPinned(true);
  };

  const a = automations[active];
  const stages = [a.trigger, a.ai, a.action];

  return (
    <section
      ref={ref}
      id="automation"
      className="swiss-flip swiss-cols relative scroll-mt-14 py-24 md:py-36"
    >
      <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8">
        <div className="col-span-4 col-start-1 px-4 md:col-span-6 md:col-start-2 md:px-0 md:pl-3">
          <p className="font-mono text-[0.75rem] text-(--accent)">AI AUTOMATION</p>
          <h2 className="mt-4 text-[clamp(2.4rem,6vw,5.5rem)] font-medium leading-[1] tracking-[-0.045em]">
            Let AI do the repetitive work.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-(--mute)">
            We also build AI automation. We find the tasks that eat your team&apos;s day, connect an AI step to your tools, and run it reliably with a human in the loop where it matters.
          </p>
        </div>

        <ul className="col-span-4 col-start-1 border-b border-(--line) md:col-span-2 md:col-start-2">
          {automations.map((x, i) => (
            <li key={x.name} className="border-t border-(--line)">
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={active === i}
                className={`relative flex w-full items-center justify-between px-4 py-4 text-left text-[1rem] transition-colors md:px-3 ${
                  active === i ? "font-medium text-(--ink)" : "text-(--mute) hover:text-(--ink)"
                }`}
              >
                {x.name}
                <span aria-hidden="true" className="font-mono text-[0.8rem]">
                  {active === i ? "→" : String(i + 1).padStart(2, "0")}
                </span>
                {active === i && (
                  <motion.span
                    layoutId="auto-tick"
                    className="absolute inset-y-0 left-0 w-[2px] bg-(--accent)"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="col-span-4 col-start-1 px-4 md:col-span-4 md:col-start-5 md:px-0 md:pl-3">
          <div className="border border-(--line)">
            {LABELS.map((label, i) => {
              const lit = step > i;
              const current = step === i && !reduce && inView;
              return (
                <div key={label} className="relative border-b border-(--line) p-5 last:border-b-0">
                  <div className="flex items-center gap-3 font-mono text-[0.72rem]">
                    <motion.span
                      animate={{
                        backgroundColor: lit ? "var(--accent)" : "rgba(0,0,0,0)",
                        scale: current ? [1, 1.4, 1] : 1,
                      }}
                      transition={{ duration: 0.5, repeat: current ? Infinity : 0 }}
                      className="h-2 w-2 rounded-full border border-(--accent)"
                    />
                    <span className={lit ? "text-(--ink)" : "text-(--mute)"}>
                      {String(i + 1).padStart(2, "0")} {label.toUpperCase()}
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${active}-${i}`}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: lit ? 1 : 0.3, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-3 text-[1.1rem] font-medium leading-snug tracking-[-0.015em] md:text-[1.25rem]"
                    >
                      {stages[i]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="border-t border-(--line) bg-(--ink)/[0.04] p-5 font-mono text-[0.75rem] leading-relaxed text-(--mute)" aria-hidden="true">
              {a.log.map((line, i) => (
                <motion.div
                  key={`${active}-${line}`}
                  initial={false}
                  animate={{ opacity: step > Math.min(i, 2) || (i === 3 && step >= 3) ? 1 : 0.15 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-(--accent)">$</span> {line}
                </motion.div>
              ))}
              <span className="caret inline-block h-3 w-1.5 translate-y-0.5 bg-(--ink)" />
            </div>
          </div>
          <p className="mt-4 text-[0.8rem] text-(--mute)">
            Example flows. Every automation is built around your own tools and rules.
          </p>
        </div>
      </div>
    </section>
  );
}
