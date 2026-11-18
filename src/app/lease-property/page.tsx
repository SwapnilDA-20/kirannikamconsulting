import type { Metadata } from "next";
import { ServicePage } from "@/components/shared/service-page";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Lease Commercial Property in Mumbai — Office Space & Shops",
  description:
    "Office space, shops and commercial premises for lease across Mumbai’s Western Suburbs. Kiran Nikam Consulting helps businesses and owners with commercial leasing.",
  path: "/lease-property",
});

export default function LeasePropertyPage() {
  return (
    <ServicePage
      slug="lease-property"
      eyebrow="Lease"
      title="Commercial leasing, made clear."
      intro="For businesses seeking premises and owners seeking tenants, we bring structure to commercial leasing — from the first brief to the signed lease."
      heroImage="/images/illustrative/towers-dusk.webp"
      whatsappHref={whatsappLinks.lease()}
      ctaLabel="Leasing enquiry"
      stepsTitle="How commercial leasing works with us."
      steps={[
        { title: "Business brief", body: "Team size or retail format, preferred micro-market, budget, fit-out needs and timeline." },
        { title: "Premises shortlist", body: "Offices, shops or units that fit the brief, with key details compared side by side." },
        { title: "Term discussions", body: "Rent, deposit, escalation, lock-in, fit-out period and maintenance — clarified early." },
        { title: "Agreement & handover", body: "Guidance through documentation, registration and handover of the premises." },
      ]}
      checklistTitle="Points to clarify before leasing."
      checklistIntro="Commercial leases have more moving parts than residential rentals. These are worth discussing early."
      checklist={[
        "Carpet area versus chargeable area",
        "Monthly rent, security deposit and escalation terms",
        "Lock-in period and notice period",
        "Rent-free fit-out period, if any",
        "Permitted use and any licence requirements for your business",
        "Maintenance, common-area charges and utilities",
        "Signage, parking and access rights",
        "Registration of the lease agreement",
      ]}
      transaction="lease"
      listingsTitle="Properties for lease."
      formInterest="lease"
      formTitle="Share your leasing requirement."
      closingTitle="Let’s find the right premises."
    />
  );
}
