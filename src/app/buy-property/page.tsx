import type { Metadata } from "next";
import { ServicePage } from "@/components/shared/service-page";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Buy Property in Mumbai — Flats, Offices & Shops for Sale",
  description:
    "Buying a flat, apartment, office or shop in Mumbai’s Western Suburbs? Kiran Nikam Consulting guides you from shortlist to site visits, negotiation and documentation.",
  path: "/buy-property",
});

export default function BuyPropertyPage() {
  return (
    <ServicePage
      slug="buy-property"
      eyebrow="Buy"
      title="Buy with confidence."
      intro="Whether it is your first home, a larger family residence or premises for your business, we help you buy with clarity — and without pressure."
      heroImage="/images/illustrative/residential-facade.webp"
      whatsappHref={whatsappLinks.buy()}
      ctaLabel="Start your search"
      stepsTitle="From requirement to registration."
      steps={[
        { title: "Define your brief", body: "Location, budget, configuration, possession timeline and the non-negotiables for your family or business." },
        { title: "Shortlist & visit", body: "A focused shortlist of properties that genuinely match, with site visits planned around your schedule." },
        { title: "Evaluate & negotiate", body: "Compare options clearly, understand what is included, and approach negotiation with the right information." },
        { title: "Documentation & handover", body: "Support in understanding the paperwork through to registration and possession." },
      ]}
      checklistTitle="Before you buy."
      checklistIntro="A few things worth preparing or checking — we will help you work through them."
      checklist={[
        "Your budget, including stamp duty, registration and other one-time costs",
        "Home loan eligibility and pre-approval, if you are financing",
        "Title and ownership documents of the property",
        "Society NOC and share certificate (for resale flats)",
        "MahaRERA project registration for new / under-construction projects",
        "Carpet area as stated in the agreement",
        "Approved plans and occupancy certificate, where applicable",
        "Maintenance charges and any outstanding dues",
      ]}
      transaction="sale"
      listingsTitle="Properties for sale."
      closingTitle="Ready to start looking?"
    />
  );
}
