import { founder, site } from "../data/site";

export function Founder() {
  return (
    <section id="about" className="swiss-flip swiss-cols relative scroll-mt-14 py-24 md:py-36">
      <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8">
        <div className="col-span-3 col-start-1 px-4 md:col-span-2 md:col-start-2 md:px-0 md:pl-3">
          <img
            src="/shamsali.jpeg"
            alt={`${founder.name}, ${founder.role}`}
            width={512}
            height={640}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover grayscale"
          />
        </div>
        <div className="col-span-4 col-start-1 px-4 md:col-span-4 md:col-start-5 md:px-0 md:pl-3">
          <h2 className="text-[clamp(2.4rem,5.4vw,5rem)] font-medium leading-[1] tracking-[-0.045em]">{founder.name}</h2>
          <p className="mt-3 text-[0.95rem] text-(--mute)">{founder.role}</p>
          <p className="mt-8 max-w-[52ch] text-[1.05rem] leading-relaxed">{site.description}</p>
          <p className="mt-4 max-w-[52ch] text-[0.92rem] leading-relaxed text-(--mute)">
            We&apos;ve shipped 100+ products. Talk with {founder.firstName} directly about your project.
          </p>
          <a
            href={`tel:${site.phoneHref}`}
            className="mt-8 inline-block bg-(--ink) px-6 py-3.5 text-[0.9rem] font-medium text-(--paper) transition-colors hover:bg-(--accent) hover:text-white"
          >
            Book 15-mins call
          </a>
        </div>
      </div>
    </section>
  );
}
