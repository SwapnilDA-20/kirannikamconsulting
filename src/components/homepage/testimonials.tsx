import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/data/testimonials";

/** Renders ONLY genuine, consented testimonials. Hidden when none exist. */
export function Testimonials() {
  const items = testimonials.filter((t) => t.consentReceivedOn && t.quote.trim());
  if (items.length === 0) return null;
  return (
    <section className="on-light bg-ivory py-24 sm:py-32" aria-labelledby="testimonials-heading">
      <div className="container-luxe">
        <SectionHeading eyebrow="Client words" title={<span id="testimonials-heading">In their own words.</span>} />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.name + t.quote.slice(0, 12)} className="flex flex-col bg-white p-8">
              <Quote className="size-7 text-gold" aria-hidden />
              <blockquote className="mt-5 flex-1 font-serif text-xl leading-relaxed text-navy">“{t.quote}”</blockquote>
              <p className="mt-6 text-sm font-semibold text-navy">{t.name}</p>
              {t.context && <p className="text-sm text-muted-dark">{t.context}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
