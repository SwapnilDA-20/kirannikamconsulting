import Image from "next/image";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { whatsappLinks } from "@/lib/whatsapp";

export function ContactDetails() {
  const { consultant, address, contact, businessHours } = siteConfig;
  const row = "flex gap-4 border-b border-ivory/10 py-5";
  return (
    <div className="bg-navy p-8 text-ivory sm:p-10">
      <div className="flex items-center gap-5">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60">
          <Image src={consultant.photo.src} alt={consultant.photo.alt} fill sizes="80px" className="object-cover object-top" />
        </div>
        <div>
          <p className="font-serif text-2xl">{siteConfig.name}</p>
          <p className="mt-0.5 text-sm text-ivory/75">
            {consultant.name} · <span className="text-gold">{consultant.designation}</span>
          </p>
        </div>
      </div>
      <ul className="mt-8">
        <li className={row}>
          <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">Call</p>
            <a href={telHref} className="mt-1 block text-lg hover:text-gold">
              {contact.phoneDisplay}
            </a>
          </div>
        </li>
        <li className={row}>
          <WhatsAppIcon className="mt-1 size-4 shrink-0 text-gold" />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">WhatsApp</p>
            <a href={whatsappLinks.general()} target="_blank" rel="noopener noreferrer" className="mt-1 block text-lg hover:text-gold">
              Message {consultant.name}
            </a>
          </div>
        </li>
        <li className={row}>
          <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">Email</p>
            <a href={mailHref} className="mt-1 block text-lg break-all hover:text-gold">
              {contact.email}
            </a>
          </div>
        </li>
        <li className={row}>
          <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">Office</p>
            <address className="mt-1 leading-relaxed not-italic">{address.full}</address>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-light"
            >
              <Navigation className="size-3.5" aria-hidden /> Open in Google Maps
            </a>
          </div>
        </li>
        <li className="flex gap-4 py-5">
          <Clock className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/60">Business hours</p>
            {businessHours && businessHours.length > 0 ? (
              <ul className="mt-1 space-y-1">
                {businessHours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.hours}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 leading-relaxed text-ivory/85">Visits by appointment — please call or WhatsApp before visiting.</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
