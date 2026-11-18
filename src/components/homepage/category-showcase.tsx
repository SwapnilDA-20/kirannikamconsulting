import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IllustrativeImage } from "@/components/shared/illustrative-image";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLinks } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const data = {
  residential: {
    eyebrow: "Residential",
    title: "Homes for every chapter of life.",
    body: "From compact 1 BHK apartments to spacious 3 BHK and larger family residences — for purchase or rent, ready to move or new.",
    formats: ["1 BHK, 2 BHK & 3 BHK flats", "Larger & premium residences", "Ready-to-move apartments", "Rental homes for families & professionals"],
    href: "/residential",
    image: { src: "/images/illustrative/living-room.webp", alt: "contemporary apartment living room" },
    wa: whatsappLinks.residential,
  },
  commercial: {
    eyebrow: "Commercial",
    title: "Premises that work as hard as you do.",
    body: "Office spaces, shops, retail units and business premises across the western suburbs — to buy, rent or lease.",
    formats: ["Office spaces & leasing", "Shops & high-street retail", "Commercial units & showrooms", "Commercial investment opportunities"],
    href: "/commercial",
    image: { src: "/images/illustrative/office-loft.webp", alt: "modern open-plan office interior" },
    wa: whatsappLinks.commercial,
  },
} as const;

export function CategoryPanel({ kind, reverse = false }: { kind: keyof typeof data; reverse?: boolean }) {
  const d = data[kind];
  return (
    <div className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", reverse && "lg:[&>*:first-child]:order-2")}>
      <Reveal className="relative aspect-[4/3] overflow-hidden">
        <IllustrativeImage src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" />
      </Reveal>
      <Reveal delay={0.1}>
        <SectionHeading eyebrow={d.eyebrow} title={d.title} intro={<p>{d.body}</p>} />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {d.formats.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[0.95rem] text-charcoal">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link href={d.href} className="group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy hover:text-gold-dark">
            Explore {d.eyebrow.toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <a href={d.wa()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-gold-dark hover:text-navy">
            <WhatsAppIcon className="size-4" /> {d.eyebrow} enquiry
          </a>
        </div>
      </Reveal>
    </div>
  );
}

export function CategoryShowcase() {
  return (
    <>
      <section className="on-light bg-white py-24 sm:py-32" aria-label="Residential properties">
        <div className="container-luxe">
          <CategoryPanel kind="residential" />
        </div>
      </section>
      <section className="on-light bg-ivory py-24 sm:py-32" aria-label="Commercial properties">
        <div className="container-luxe">
          <CategoryPanel kind="commercial" reverse />
        </div>
      </section>
    </>
  );
}
