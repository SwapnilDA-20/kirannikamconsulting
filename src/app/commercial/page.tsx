import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureList } from "@/components/shared/feature-list";
import { PropertyExplorerSection } from "@/components/properties/property-explorer-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { commercialFormats, commercialSupport } from "@/components/commercial/commercial-services";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Commercial Property in Mumbai — Offices, Shops & Retail",
  description:
    "Office space, shops, retail units and commercial premises to buy, rent or lease across Mumbai’s Western Suburbs, with guidance from Kiran Nikam Consulting.",
  path: "/commercial",
});

export default function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Business premises with the right address."
        intro="Offices, shops, retail units and commercial spaces across the western suburbs — to buy, rent or lease."
        crumbs={[{ name: "Commercial", path: "/commercial" }]}
        image={{ src: "/images/illustrative/office-corridor.webp", alt: "" }}
      >
        <Button asChild size="lg">
          <a href={whatsappLinks.commercial()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Commercial enquiry
          </a>
        </Button>
      </PageHero>

      <section className="on-light bg-ivory py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="What we help with" title="Every kind of commercial space." intro={<p>Premises chosen around how your business actually works — footfall, team size, access and budget.</p>} />
          <div className="mt-14">
            <FeatureList items={commercialFormats} />
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-24 text-ivory sm:py-28">
        <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
        <div className="container-luxe relative">
          <SectionHeading tone="dark" eyebrow="How we help" title="Leasing, sales and owner representation." />
          <div className="mt-14">
            <FeatureList items={commercialSupport} tone="dark" columns={4} />
          </div>
        </div>
      </section>

      <section className="on-light bg-ivory py-24 sm:py-28" aria-labelledby="com-listings">
        <div className="container-luxe">
          <SectionHeading eyebrow="Commercial listings" title={<span id="com-listings">Verified commercial properties.</span>} />
          <div className="mt-12">
            <PropertyExplorerSection locked={{ category: "commercial" }} whatsappHref={whatsappLinks.commercial()} />
          </div>
        </div>
      </section>

      <ContactCta title="Tell us what your business needs." whatsappHref={whatsappLinks.commercial()} />
    </>
  );
}
