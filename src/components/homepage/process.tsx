import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { processSteps } from "@/data/content";

export function ConsultationProcess({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <section className="on-light bg-white py-24 sm:py-32" aria-labelledby="process-heading" data-tone={tone}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Our consultation process"
          title={<span id="process-heading">Five considered steps.</span>}
          intro={<p>A clear, unhurried process so you always know what happens next.</p>}
        />
        <ol className="mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.08}>
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl text-gold-dark">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-line" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl text-navy">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-dark">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
