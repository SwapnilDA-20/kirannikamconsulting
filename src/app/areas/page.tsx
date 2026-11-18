import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LocalityGrid } from "@/components/localities/locality-grid";
import { ContactCta } from "@/components/contact/contact-cta";
import { localities } from "@/data/localities";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Areas We Serve — Mumbai Western Suburbs",
  description:
    "Property consultant for Mumbai’s Western Suburbs: Kandivali, Borivali, Malad, Goregaon, Jogeshwari, Andheri, Juhu, Vile Parle, Santacruz and Bandra.",
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas we serve"
        title="Fifteen neighbourhoods. One trusted consultant."
        intro="From our office in Kandivali East, we serve residential and commercial clients across Mumbai’s Western Suburbs — from Bandra in the south to Borivali in the north."
        crumbs={[{ name: "Areas We Serve", path: "/areas" }]}
        image={{ src: "/images/illustrative/apartment-balconies.webp", alt: "" }}
      />
      <section className="on-light bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <LocalityGrid items={localities} />
          <p className="mt-8 text-xs text-muted-dark">
            Locality descriptions are general orientation only. Please verify specific details such as transport links and
            civic projects independently.
          </p>
        </div>
      </section>
      <ContactCta title="Not sure which area suits you?" body="Tell Kiran how you live or work, and he will help you compare neighbourhoods." />
    </>
  );
}
