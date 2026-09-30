import { Reveal } from "./Reveal";
import { site, process } from "../data/site";

export function SectionAbout() {
  return (
    <section id="about" className="px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
        <Reveal delay={0} className="max-w-lg">
          <h2 className="text-4xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Built by builders.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 drop-shadow-md sm:text-base">
            {site.description}
          </p>
        </Reveal>

        <div className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {process.map((step, i) => (
            <Reveal key={step.verb} delay={150 + i * 110}>
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-medium text-white drop-shadow-md">{step.verb}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
