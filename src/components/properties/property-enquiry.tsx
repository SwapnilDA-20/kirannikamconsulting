import Image from "next/image";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig, telHref } from "@/config/site";
import { buildMailtoUrl } from "@/lib/validation";
import { whatsappLinks, whatsappMessages } from "@/lib/whatsapp";
import type { Property } from "@/types/property";

/** Sticky enquiry panel on a property page — every CTA carries the title and reference ID. */
export function PropertyEnquiry({ property }: { property: Property }) {
  const { consultant } = siteConfig;
  return (
    <aside aria-label="Enquire about this property" className="bg-navy p-7 text-ivory lg:sticky lg:top-28">
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60">
          <Image src={consultant.photo.src} alt={consultant.photo.alt} fill sizes="64px" className="object-cover object-top" />
        </div>
        <div>
          <p className="font-serif text-xl">{consultant.name}</p>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold">{consultant.designation}</p>
        </div>
      </div>
      <p className="mt-6 text-sm text-ivory/70">
        Enquire about <span className="text-ivory">{property.title}</span> — Ref <span className="text-gold">{property.referenceId}</span>
      </p>
      <div className="mt-6 grid gap-3">
        <Button asChild variant="whatsapp">
          <a href={whatsappLinks.property(property)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> Enquire on WhatsApp
          </a>
        </Button>
        <Button asChild>
          <a href={whatsappLinks.visit(property)} target="_blank" rel="noopener noreferrer">
            <CalendarDays /> Request a site visit
          </a>
        </Button>
        <Button asChild variant="outline-light">
          <a href={telHref}>
            <Phone /> {siteConfig.contact.phoneDisplay}
          </a>
        </Button>
        <Button asChild variant="outline-light">
          <a href={buildMailtoUrl(`Enquiry: ${property.title} (Ref ${property.referenceId})`, whatsappMessages.property(property))}>
            <Mail /> Email enquiry
          </a>
        </Button>
      </div>
    </aside>
  );
}
