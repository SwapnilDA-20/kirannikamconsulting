import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { whatsappLinks } from "@/lib/whatsapp";

export function ContactCta({
  title = "Let’s talk about your next property.",
  body = `Share your requirement with ${siteConfig.consultant.name} — on WhatsApp, by phone or by email.`,
  whatsappHref = whatsappLinks.general(),
}: {
  title?: string;
  body?: string;
  whatsappHref?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-ivory sm:py-32" aria-labelledby="cta-heading">
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="container-luxe text-center">
        <p className="eyebrow justify-center text-gold">{siteConfig.tagline}</p>
        <h2 id="cta-heading" className="section-title mx-auto mt-6 max-w-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ivory/70">{body}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp Kiran
            </a>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={telHref}>
              <Phone /> {siteConfig.contact.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={mailHref}>
              <Mail /> Email
            </a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-ivory/55">
          Prefer to write in detail?{" "}
          <Link href="/contact" className="text-gold underline underline-offset-4">
            Use the enquiry form
          </Link>
        </p>
      </div>
    </section>
  );
}
