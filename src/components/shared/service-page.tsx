import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureList, type Feature } from "@/components/shared/feature-list";
import { PropertyExplorerSection } from "@/components/properties/property-explorer-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { localities } from "@/data/localities";
import type { EnquiryInterest } from "@/lib/validation";
import type { TransactionType } from "@/types/property";

export interface ServicePageProps {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  whatsappHref: string;
  ctaLabel: string;
  stepsTitle: string;
  steps: Feature[];
  checklistTitle: string;
  checklistIntro: string;
  checklist: string[];
  /** Show live listings for this transaction type */
  transaction?: TransactionType;
  listingsTitle?: string;
  /** Show an enquiry form (e.g. for owners) */
  formInterest?: EnquiryInterest;
  formTitle?: string;
  closingTitle: string;
}

export function ServicePage(p: ServicePageProps) {
  const options = localities.map(({ slug, name }) => ({ slug, name }));
  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.title}
        intro={p.intro}
        crumbs={[{ name: p.eyebrow, path: `/${p.slug}` }]}
        image={{ src: p.heroImage, alt: "" }}
      >
        <Button asChild size="lg">
          <a href={p.whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> {p.ctaLabel}
          </a>
        </Button>
      </PageHero>

      <section className="on-light bg-ivory py-24 sm:py-28">
        <div className="container-luxe">
          <SectionHeading eyebrow="How it works" title={p.stepsTitle} />
          <div className="mt-14">
            <FeatureList items={p.steps} columns={p.steps.length === 4 ? 4 : 3} />
          </div>
        </div>
      </section>

      <section className="relative bg-navy py-24 text-ivory sm:py-28">
        <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
        <div className="container-luxe relative grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="dark" eyebrow="Be prepared" title={p.checklistTitle} intro={<p>{p.checklistIntro}</p>} />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {p.checklist.map((c) => (
              <li key={c} className="flex gap-3 border-t border-ivory/10 pt-4 text-ivory/85">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs leading-relaxed text-ivory/50 lg:col-span-12">
            This checklist is general guidance only and is not legal, tax or financial advice. Please consult a qualified
            professional for advice on your specific situation.
          </p>
        </div>
      </section>

      {p.transaction && (
        <section className="on-light bg-ivory py-24 sm:py-28" aria-labelledby={`${p.slug}-listings`}>
          <div className="container-luxe">
            <SectionHeading eyebrow="Listings" title={<span id={`${p.slug}-listings`}>{p.listingsTitle}</span>} />
            <div className="mt-12">
              <PropertyExplorerSection locked={{ transaction: p.transaction }} whatsappHref={p.whatsappHref} />
            </div>
          </div>
        </section>
      )}

      {p.formInterest && (
        <section className="on-light bg-white py-24 sm:py-28" aria-labelledby={`${p.slug}-form`}>
          <div className="container-luxe grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Get started" title={<span id={`${p.slug}-form`}>{p.formTitle}</span>} />
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm localities={options} defaultInterest={p.formInterest} />
            </div>
          </div>
        </section>
      )}

      <ContactCta title={p.closingTitle} whatsappHref={p.whatsappHref} />
    </>
  );
}
