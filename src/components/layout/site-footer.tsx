import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { RegulatoryInfo } from "@/components/contact/regulatory-info";
import { legalNav, mainNav, serviceNav } from "@/config/navigation";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { localities } from "@/data/localities";
import { whatsappLinks } from "@/lib/whatsapp";

export function SiteFooter() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => Boolean(url));
  return (
    <footer className="relative overflow-hidden bg-navy text-ivory">
      <div className="bg-blueprint absolute inset-0 opacity-40" aria-hidden />
      <div className="container-luxe relative">
        <div className="grid gap-12 border-b border-ivory/10 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${siteConfig.name} — Home`} className="inline-block">
              <Logo tone="light" className="h-14" />
            </Link>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-snug text-ivory/90 italic">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              {siteConfig.category} serving {siteConfig.primaryMarket}.
            </p>
            <a
              href={whatsappLinks.general()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 border border-gold/60 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy"
            >
              <WhatsAppIcon className="size-4" /> Message on WhatsApp
            </a>
          </div>

          <nav aria-label="Footer — explore" className="lg:col-span-2">
            <h2 className="eyebrow mb-5 font-sans text-gold">Explore</h2>
            <ul className="space-y-2.5 text-sm">
              {mainNav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-ivory/70 transition-colors hover:text-gold">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — services" className="lg:col-span-2">
            <h2 className="eyebrow mb-5 font-sans text-gold">Services</h2>
            <ul className="space-y-2.5 text-sm">
              {serviceNav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="text-ivory/70 transition-colors hover:text-gold">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow mb-5 font-sans text-gold">Visit the office</h2>
            <address className="space-y-4 text-sm not-italic">
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-ivory/75 transition-colors hover:text-gold"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
                <span>
                  {siteConfig.address.line1},<br />
                  {siteConfig.address.line2},<br />
                  {siteConfig.address.locality}, {siteConfig.address.city},<br />
                  {siteConfig.address.state} {siteConfig.address.postalCode}, {siteConfig.address.country}
                </span>
              </a>
              <a href={telHref} className="flex items-center gap-3 text-ivory/75 transition-colors hover:text-gold">
                <Phone className="size-4 text-gold" aria-hidden /> {siteConfig.contact.phoneDisplay}
              </a>
              <a href={mailHref} className="flex items-center gap-3 break-all text-ivory/75 transition-colors hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" aria-hidden /> {siteConfig.contact.email}
              </a>
            </address>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4 text-sm">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-ivory/70 hover:text-gold">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="border-b border-ivory/10 py-10">
          <h2 className="eyebrow mb-5 font-sans text-gold">Areas we serve</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            {localities.map((l) => (
              <li key={l.slug}>
                <Link href={`/areas/${l.slug}`} className="text-ivory/65 transition-colors hover:text-gold">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-10">
          <h2 className="sr-only">Regulatory information and disclaimers</h2>
          <RegulatoryInfo className="max-w-4xl" />
          <div className="mt-8 flex flex-col gap-4 text-xs text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              {legalNav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="hover:text-gold">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
