import { site, founder } from "../data/site";

export function Footer() {
  return (
    <footer className="swiss-cols relative border-t border-(--line) pb-20 pt-10 md:pb-16">
      <div className="grid grid-cols-4 gap-y-8 text-[0.85rem] md:grid-cols-8">
        <p className="col-span-4 col-start-1 max-w-[40ch] px-4 leading-relaxed text-(--mute) md:col-span-3 md:col-start-2 md:px-0 md:pl-3">
          {site.name}: AI automation and web app development agency in Mumbai. Founded by {founder.name}.
        </p>
        <ul className="col-span-2 col-start-1 space-y-2 px-4 md:col-span-1 md:col-start-5 md:px-0 md:pl-3">
          <li><a href="#services" className="swiss-link">Services</a></li>
          <li><a href="#automation" className="swiss-link">AI Automation</a></li>
        </ul>
        <ul className="col-span-2 space-y-2 px-4 md:col-span-1 md:col-start-6 md:px-0 md:pl-3">
          <li><a href="#work" className="swiss-link">Work</a></li>
          <li><a href="#faq" className="swiss-link">FAQ</a></li>
          <li><a href="#contact" className="swiss-link">Contact</a></li>
        </ul>
        <ul className="col-span-4 col-start-1 flex flex-wrap gap-x-6 gap-y-2 px-4 md:col-span-2 md:col-start-7 md:block md:space-y-2 md:px-0 md:pl-3">
          <li><a href={`mailto:${site.email}`} className="swiss-link">Email</a></li>
          <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="swiss-link">WhatsApp</a></li>
        </ul>
      </div>
    </footer>
  );
}
