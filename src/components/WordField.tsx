import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useStaticMotion } from "../hooks/useStaticMotion";

const WORDS: [string, number, number, number][] = [
  ["Web", 8, 10, -300], ["Apps", 52, 6, -80], ["SaaS", 78, 14, -420], ["Design", 24, 24, -160],
  ["AI", 64, 28, -260], ["Agents", 6, 36, -480], ["Fast", 40, 38, -40], ["Social", 86, 40, -140],
  ["Deploy", 18, 50, -360], ["Workflows", 56, 52, -200], ["Scale", 80, 60, -460], ["Tested", 32, 64, -90],
  ["Automate", 8, 70, -240], ["Clean", 68, 74, -60], ["Remote", 44, 80, -380], ["Code", 22, 86, -140],
  ["Ship", 84, 88, -300], ["Support", 56, 92, -500], ["Posts", 4, 92, -120], ["Leads", 36, 14, -540],
];

/** Product vocabulary hung in 3D; scroll tilts the field toward you. */
export function WordField() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useStaticMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [46, 12]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-22, 8]);
  const z = useTransform(scrollYProgress, [0, 1], [-520, 260]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className={`swiss-flip swiss-cols relative ${reduce ? "h-[min(80vh,720px)]" : "h-[min(260vh,2400px)]"}`}
    >
      <div
        className={`overflow-hidden ${reduce ? "h-full" : "sticky top-[52px] h-[min(calc(100dvh-52px),900px)]"}`}
        style={{ perspective: "1100px" }}
      >
        <motion.div
          className="absolute inset-[-10%]"
          style={reduce ? { transformStyle: "preserve-3d" } : { rotateX, rotateZ, z, transformStyle: "preserve-3d" }}
        >
          {WORDS.map(([word, x, y, depth]) => (
            <span
              key={word}
              className="absolute whitespace-nowrap text-[clamp(1.6rem,5vw,5.5rem)] font-medium tracking-[-0.04em]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translateZ(${depth}px)`,
                opacity: 0.35 + ((depth + 540) / 540) * 0.6,
              }}
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
