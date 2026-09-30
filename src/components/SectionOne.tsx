import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { site, founder } from "../data/site";

const SERVICES = ["/ WEB DEVELOPMENT", "/ APP DEVELOPMENT", "/ SAAS PRODUCTS"];

const PORTRAIT_SRC = "/shamsali.jpeg";

export function SectionOne() {
  return (
    <section className="flex min-h-screen min-h-[100svh] flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md">
                {service}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="max-w-xs sm:text-right">
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            We build web and mobile apps that bring clarity, speed, and reliability to the way
            your business runs online.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal delay={150}>
            <span className="mb-5 inline-block border-l-2 border-white bg-black/50 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] shadow-lg shadow-black/40 backdrop-blur-md">
              We&apos;ve Shipped 100+ Products
            </span>
          </Reveal>
          <Reveal delay={280}>
            <h1 className="text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
              Code. Design.
              <br />
              Deliver.
            </h1>
          </Reveal>
        </div>

        <Reveal delay={420}>
          <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/50 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <img
              src={PORTRAIT_SRC}
              alt={`${founder.name}, ${founder.role}`}
              width={80}
              height={96}
              className="h-24 w-20 rounded-lg object-cover"
              decoding="async"
              fetchPriority="high"
            />
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white">Talk with {founder.firstName}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                {founder.role}
              </span>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-1.5 flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
              >
                Book 15-mins call
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
