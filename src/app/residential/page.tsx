import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureList } from "@/components/shared/feature-list";
import { PropertyExplorerSection } from "@/components/properties/property-explorer-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { residentialFormats, residentialSupport } from "@/components/residential/residential-services";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Residential Property in Mumbai — Flats & Apartments",
  description:
    "Flats and apartments for sale and rent across Mumbai’s Western Suburbs — 1 BHK, 2 BHK, 3 BHK and premium residences — with guidance from Kiran Nikam Consulting, Kandivali East.",
  path: "/residential",
});

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential"
        title="Homes across Mumbai’s Western Suburbs."
        intro="Flats and apartments to buy or rent — from first homes to premium family residences — with personal guidance at every step."
        crumbs={[{ name: "Residential", path: "/residential" }]}
        image={{ src: "/images/illustrative/living-room-bright.webp", alt: "" }}
      >
        <Button asChild size="lg">
          <a href={whatsappLinks.residential()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Residential enquiry
          </a>
        </Button>
      </PageHero>

      <section className="on-light bg-ivory py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="What we help with" title="Every kind of home." intro={<p>Whatever stage of life you are in, we help you find a home that fits it.</p>} />
          <div className="mt-14">
            <FeatureList items={residentialFormats} />
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-24 text-ivory sm:py-28">
        <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
        <div className="container-luxe relative">
          <SectionHeading tone="dark" eyebrow="How we help" title="Buying, selling, renting and letting." />
          <div className="mt-14">
            <FeatureList items={residentialSupport} tone="dark" columns={4} />
          </div>
        </div>
      </section>

      <section className="on-light bg-ivory py-24 sm:py-28" aria-labelledby="res-listings">
        <div className="container-luxe">
          <SectionHeading eyebrow="Residential listings" title={<span id="res-listings">Verified residential properties.</span>} />
          <div className="mt-12">
            <PropertyExplorerSection locked={{ category: "residential" }} whatsappHref={whatsappLinks.residential()} />
          </div>
        </div>
      </section>

      <ContactCta title="Tell us about the home you’re looking for." whatsappHref={whatsappLinks.residential()} />
    </>
  );
}
