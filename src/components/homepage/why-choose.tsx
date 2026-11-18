import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { pillars } from "@/data/content";
import { siteConfig } from "@/config/site";

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-32" aria-labelledby="why-heading">
      <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
      <div className="container-luxe relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow={`Why ${siteConfig.name}`}
          title={<span id="why-heading">A consultancy built on clarity and care.</span>}
        />
        <ul className="mt-16 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.title} className="bg-navy">
              <Reveal delay={i * 0.06} className="h-full p-8 sm:p-10">
                <span className="gold-rule" aria-hidden />
                <h3 className="mt-6 text-2xl text-ivory">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-ivory/70">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
