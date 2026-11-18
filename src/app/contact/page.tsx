import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactDetails } from "@/components/contact/contact-details";
import { RegulatoryInfo } from "@/components/contact/regulatory-info";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { localities } from "@/data/localities";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact Kiran Nikam Consulting — Kandivali East, Mumbai",
  description: `Call ${siteConfig.contact.phoneDisplay}, WhatsApp or email Kiran Nikam Consulting. Office: Thakur Complex, 90 Feet Road, Kandivali East, Mumbai 400101.`,
  path: "/contact",
});

export default function ContactPage() {
  const options = localities.map(({ slug, name }) => ({ slug, name }));
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start the conversation."
        intro={`Call, WhatsApp or email ${siteConfig.consultant.name} — or visit the office in Kandivali East.`}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="on-light bg-ivory py-20 sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Enquiry" title="Tell us what you’re looking for." intro={<p>Fill in a few details and continue on WhatsApp or email — your message is pre-written for you.</p>} />
            <div className="mt-10">
              <EnquiryForm localities={options} />
            </div>
          </div>
        </div>
      </section>
      <section className="on-light border-t border-line bg-white py-14" aria-labelledby="regulatory-heading">
        <div className="container-luxe">
          <h2 id="regulatory-heading" className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy">
            Regulatory information & disclaimers
          </h2>
          <RegulatoryInfo tone="light" className="mt-4 max-w-4xl" />
        </div>
      </section>
    </>
  );
}
