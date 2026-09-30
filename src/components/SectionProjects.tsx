import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { projects } from "../data/site";

export function SectionProjects() {
  return (
    <section id="projects" className="px-5 py-16 sm:px-8 md:px-12 md:py-24">
      <Reveal delay={0}>
        <h2 className="max-w-2xl text-4xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          Selected work.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => {
          const number = String(i + 1).padStart(2, "0");

          const card = (
            <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl transition-colors duration-300 hover:bg-black/40 sm:p-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-[7rem] font-medium leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-white/[0.09] sm:text-[8rem]"
              >
                {number}
              </span>

              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  {number}
                </span>
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <span className="rounded-full border border-white/25 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-black">
                      New
                    </span>
                  )}
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                    {project.tag}
                  </span>
                </div>
              </div>

              <div className="relative mt-10 flex flex-1 flex-col justify-end">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-medium text-white sm:text-3xl">{project.title}</h3>
                  {project.href && (
                    <ArrowUpRight
                      size={20}
                      className="shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                    />
                  )}
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>
              </div>
            </div>
          );

          return (
            <Reveal
              key={project.title}
              delay={150 + i * 110}
              className={`h-full ${project.featured ? "md:col-span-2" : ""}`}
            >
              {project.href ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
