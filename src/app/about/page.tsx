import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ConsultationProcess } from "@/components/homepage/process";
import { ContactCta } from "@/components/contact/contact-cta";
import { pillars } from "@/data/content";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "About Kiran Nikam — Real Estate Consultant, Mumbai",
  description:
    "Meet Kiran Nikam, Real Estate Consultant at Kiran Nikam Consulting — a Mumbai-based residential and commercial real estate consultancy in Kandivali East.",
  path: "/about",
  image: { src: siteConfig.consultant.photo.src, alt: siteConfig.consultant.photo.alt, width: 960, height: 1200 },
});

export default function AboutPage() {
  const { consultant } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Meet Kiran Nikam."
        intro={`${consultant.designation}, ${siteConfig.name}`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="on-light bg-ivory py-20 sm:py-28" aria-label="Consultant profile">
        <div className="container-luxe grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <figure className="relative mx-auto max-w-md">
              <div className="absolute -top-5 -left-5 h-full w-full border border-gold/60" aria-hidden />
              <div className="relative aspect-[4/5] overflow-hidden bg-navy">
                <Image src={consultant.photo.src} alt={consultant.photo.alt} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover object-top" />
              </div>
              <figcaption className="mt-6 pl-1">
                <p className="font-serif text-3xl text-navy">{consultant.name}</p>
                <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold-dark">{consultant.designation}</p>
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold-dark">{siteConfig.tagline}</p>
            <h2 className="section-title mt-5 text-navy">A consultancy built around you.</h2>
            <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-charcoal">
              <p>
                {siteConfig.name} is a Mumbai-based real estate consultancy helping individuals, families and businesses
                explore residential and commercial property opportunities.
              </p>
              <p>
                Led by {consultant.name}, the consultancy works from its office in {siteConfig.address.line2},{" "}
                {siteConfig.address.locality}, and focuses on the neighbourhoods of Mumbai’s Western Suburbs — from
                Bandra to Borivali.
              </p>
              <p>
                Clients range from families searching for their next home and professionals looking to rent, to property
                owners preparing to sell and businesses seeking offices, shops and retail premises. Whatever the
                requirement, the approach is the same: listen carefully, share honest information and guide each step
                with care.
              </p>
            </div>
            <dl className="mt-10 grid gap-5 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-dark">Specialisation</dt>
                <dd className="mt-1.5 text-navy">{siteConfig.category}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-dark">Primary market</dt>
                <dd className="mt-1.5 text-navy">{siteConfig.primaryMarket}</dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-dark">Phone</dt>
                <dd className="mt-1.5">
                  <a href={telHref} className="inline-flex items-center gap-2 text-navy hover:text-gold-dark">
                    <Phone className="size-4 text-gold-dark" aria-hidden /> {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-dark">Email</dt>
                <dd className="mt-1.5">
                  <a href={mailHref} className="inline-flex items-center gap-2 break-all text-navy hover:text-gold-dark">
                    <Mail className="size-4 shrink-0 text-gold-dark" aria-hidden /> {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-ivory sm:py-28">
        <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
        <div className="container-luxe relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading tone="dark" eyebrow="Our approach" title="What you can expect." />
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {pillars.slice(0, 4).map((p) => (
                <li key={p.title}>
                  <span className="gold-rule" aria-hidden />
                  <h3 className="mt-5 text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/70">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden">
              <Image src={consultant.secondaryPhoto.src} alt={consultant.secondaryPhoto.alt} fill sizes="(min-width: 1024px) 33vw, 80vw" className="object-cover" />
            </figure>
            <p className="mt-5 flex items-start justify-center gap-2 text-sm text-ivory/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
              <a href={siteConfig.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Visit us at {siteConfig.address.line1}, {siteConfig.address.locality}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <ConsultationProcess />

      <section className="on-light bg-ivory py-16">
        <div className="container-luxe flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="font-serif text-3xl text-navy">Explore the areas Kiran serves.</p>
          <Link href="/areas" className="group inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy hover:text-gold-dark">
            Areas we serve <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </section>

      <ContactCta title="Speak with Kiran directly." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: consultant.name,
            jobTitle: consultant.designation,
            image: absoluteUrl(consultant.photo.src),
            worksFor: { "@id": absoluteUrl("/#organization") },
            telephone: siteConfig.contact.phoneE164,
            email: siteConfig.contact.email,
          },
        }}
      />
    </>
  );
}
