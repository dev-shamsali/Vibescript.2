import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useStaticMotion } from "../hooks/useStaticMotion";

const LINES = [
  { text: "Websites that load fast", offset: "md:ml-[25%]", range: [0.02, 0.22] },
  { text: "Apps people keep", offset: "md:ml-[37.5%]", range: [0.24, 0.44] },
  { text: "AI that does the busywork", offset: "md:ml-[12.5%]", range: [0.46, 0.66] },
  { text: "Shipped and maintained", offset: "md:ml-[25%]", range: [0.68, 0.88] },
] as const;

function Line({
  text,
  offset,
  range,
  progress,
  reduce,
}: {
  text: string;
  offset: string;
  range: readonly [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const r = [...range];
  const opacity = useTransform(progress, r, [0.16, 1]);
  const y = useTransform(progress, r, [28, 0]);
  return (
    <motion.p
      style={reduce ? undefined : { opacity, y }}
      className={`px-4 text-[clamp(2.2rem,7.4vw,7rem)] font-medium leading-[0.98] tracking-[-0.045em] md:px-0 ${offset}`}
    >
      {text}
    </motion.p>
  );
}

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useStaticMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className={`swiss-flip swiss-cols relative ${reduce ? "" : "h-[min(300vh,2600px)]"}`}>
      <div
        className={`flex flex-col justify-center gap-3 py-24 md:gap-5 ${
          reduce ? "" : "sticky top-[52px] h-[min(calc(100dvh-52px),900px)] overflow-hidden py-0"
        }`}
      >
        {LINES.map((l) => (
          <Line key={l.text} {...l} progress={scrollYProgress} reduce={reduce} />
        ))}
      </div>
    </section>
  );
}
