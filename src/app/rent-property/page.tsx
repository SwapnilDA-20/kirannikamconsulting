import type { Metadata } from "next";
import { ServicePage } from "@/components/shared/service-page";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Rent Property in Mumbai — Flats & Shops for Rent",
  description:
    "Looking for a flat or shop to rent in Kandivali, Malad, Goregaon, Andheri, Borivali or elsewhere in Mumbai’s Western Suburbs? Speak with Kiran Nikam Consulting.",
  path: "/rent-property",
});

export default function RentPropertyPage() {
  return (
    <ServicePage
      slug="rent-property"
      eyebrow="Rent"
      title="Rent the right home."
      intro="Rental homes move quickly in Mumbai. We help tenants focus on suitable options and help landlords find the right tenants — with clarity on terms from the start."
      heroImage="/images/illustrative/bedroom.webp"
      whatsappHref={whatsappLinks.rent()}
      ctaLabel="Find a rental"
      stepsTitle="A smoother way to rent."
      steps={[
        { title: "Share your needs", body: "Area, budget, configuration, furnishing, move-in date and any preferences such as pets or parking." },
        { title: "View suitable homes", body: "Visits to homes that fit your brief, so you can decide quickly when the right one appears." },
        { title: "Agree the terms", body: "Clarity on rent, deposit, maintenance, lock-in and notice period before anything is signed." },
        { title: "Agreement & move-in", body: "Guidance on the leave-and-licence agreement, registration and police verification." },
      ]}
      checklistTitle="Before you rent."
      checklistIntro="Having these ready helps you secure a good home faster."
      checklist={[
        "Identity and address proof for all adult occupants",
        "Employment or business proof, if requested by the owner",
        "Your budget for rent, deposit and maintenance",
        "Preferred move-in date and duration of stay",
        "Registered leave-and-licence agreement",
        "Tenant police verification",
        "A record of the home’s condition and inventory at move-in",
        "Clear terms on lock-in period and notice",
      ]}
      transaction="rent"
      listingsTitle="Properties for rent."
      closingTitle="Looking for a home to rent?"
    />
  );
}
