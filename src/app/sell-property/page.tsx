import type { Metadata } from "next";
import { ServicePage } from "@/components/shared/service-page";
import { createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";

export const metadata: Metadata = createMetadata({
  title: "Sell Your Property in Mumbai",
  description:
    "Selling a flat, office or shop in Mumbai’s Western Suburbs? Kiran Nikam Consulting helps owners present their property well and connect with serious buyers.",
  path: "/sell-property",
});

export default function SellPropertyPage() {
  return (
    <ServicePage
      slug="sell-property"
      eyebrow="Sell"
      title="Sell your property, thoughtfully."
      intro="Selling is a significant decision. We help you understand your property’s position, present it well and connect with genuinely interested buyers."
      heroImage="/images/illustrative/apartment-balconies.webp"
      whatsappHref={whatsappLinks.sell()}
      ctaLabel="Discuss your property"
      stepsTitle="How we support sellers."
      steps={[
        { title: "Understand your property", body: "A conversation and visit to understand the property, your timeline and your expectations." },
        { title: "Prepare & present", body: "Genuine photographs, accurate details and a clear, honest listing — published only with your authorisation." },
        { title: "Qualified viewings", body: "Viewings arranged with buyers whose requirements genuinely match your property." },
        { title: "Negotiation to closing", body: "Support through offers, negotiation and the steps to completing the sale." },
      ]}
      checklistTitle="Documents sellers usually need."
      checklistIntro="Gathering these early helps avoid delays once you find a buyer."
      checklist={[
        "Sale deed / agreement for sale and chain of title documents",
        "Society share certificate and NOC (for flats in a housing society)",
        "Latest property tax and maintenance receipts",
        "Occupancy certificate, where applicable",
        "Loan closure letter, if the property was mortgaged",
        "Identity and PAN details of all owners",
        "Approved plan and carpet area details",
        "Any power of attorney, if someone is acting on your behalf",
      ]}
      formInterest="sell"
      formTitle="Tell us about your property."
      closingTitle="Thinking about selling?"
    />
  );
}
