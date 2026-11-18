import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building, House, Route, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { PropertyExplorerSection } from "@/components/properties/property-explorer-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { getLocality, localities } from "@/data/localities";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";
import { propertiesHref } from "@/lib/property-utils";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return localities.map((l) => ({ slug: l.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocality(slug);
  if (!l) return {};
  return createMetadata({
    title: `Property Consultant in ${l.name}, Mumbai — Flats, Offices & Shops`,
    description: `${l.tagline} Residential and commercial property to buy, rent or lease in ${l.name} with ${siteConfig.name}.`,
    path: `/areas/${l.slug}`,
  });
}

export default async function LocalityPage({ params }: Props) {
  const { slug } = await params;
  const l = getLocality(slug);
  if (!l) notFound();
  const nearby = l.nearby.map(getLocality).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <PageHero
        eyebrow={`Areas we serve · ${l.name}`}
        title={`Property in ${l.name}.`}
        intro={l.tagline}
        crumbs={[
          { name: "Areas We Serve", path: "/areas" },
          { name: l.name, path: `/areas/${l.slug}` },
        ]}
      >
        <Button asChild size="lg">
          <a href={whatsappLinks.locality(l.name)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Ask about {l.name}
          </a>
        </Button>
      </PageHero>

      <section className="on-light bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Overview" title={`Getting to know ${l.name}`} />
            <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-charcoal">
              <p>{l.overview}</p>
              <p>{l.character}</p>
            </div>
            <div className="mt-10 border-l-2 border-gold bg-white px-6 py-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-dark">How we help in {l.name}</p>
              <p className="mt-2 leading-relaxed text-navy">{l.consultingNote}</p>
            </div>
          </div>
          <aside className="space-y-8 lg:col-span-5" aria-label={`${l.name} at a glance`}>
            <div className="bg-white p-7">
              <h2 className="flex items-center gap-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy">
                <Route className="size-4 text-gold-dark" aria-hidden /> Connectivity
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-charcoal">
                {l.connectivity.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-gold" aria-hidden /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-7">
              <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy">Neighbourhoods & landmarks</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {l.neighbourhoods.map((n) => (
                  <li key={n} className="border border-line px-3 py-1.5 text-sm text-navy">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-7">
              <h2 className="flex items-center gap-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy">
                <Users className="size-4 text-gold-dark" aria-hidden /> Often considered by
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-charcoal">
                {l.suitedTo.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 shrink-0 bg-gold" aria-hidden /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative bg-navy py-20 text-ivory sm:py-28">
        <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
        <div className="container-luxe relative">
          <SectionHeading tone="dark" eyebrow="Property landscape" title={`What you’ll find in ${l.name}`} />
          <div className="mt-12 grid gap-px bg-ivory/10 md:grid-cols-2">
            {([
              ["Residential", l.propertyLandscape.residential, House, "residential"],
              ["Commercial", l.propertyLandscape.commercial, Building, "commercial"],
            ] as const).map(([label, text, Icon, category]) => (
              <div key={label} className="bg-navy p-8 sm:p-10">
                <Icon className="size-6 text-gold" aria-hidden />
                <h3 className="mt-5 text-3xl">{label}</h3>
                <p className="mt-4 leading-relaxed text-ivory/75">{text}</p>
                <Link
                  href={propertiesHref({ category, locality: l.slug })}
                  className="group mt-7 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold"
                >
                  {label} listings in {l.name} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="on-light bg-ivory py-20 sm:py-28" aria-labelledby="area-listings">
        <div className="container-luxe">
          <SectionHeading eyebrow="Listings" title={<span id="area-listings">Verified properties in {l.name}</span>} />
          <div className="mt-12">
            <PropertyExplorerSection locked={{ locality: l.slug }} whatsappHref={whatsappLinks.locality(l.name)} />
          </div>
          {nearby.length > 0 && (
            <div className="mt-16 border-t border-line pt-10">
              <h2 className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy">Nearby areas</h2>
              <ul className="mt-5 flex flex-wrap gap-3">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/areas/${n.slug}`} className="inline-flex items-center gap-2 border border-navy/20 px-5 py-3 font-serif text-xl text-navy transition-colors hover:border-gold hover:text-gold-dark">
                      {n.name} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-10 text-xs text-muted-dark">
            Locality information is general orientation only and may change. Please verify details independently.
          </p>
        </div>
      </section>

      <ContactCta title={`Looking for property in ${l.name}?`} whatsappHref={whatsappLinks.locality(l.name)} />
    </>
  );
}
