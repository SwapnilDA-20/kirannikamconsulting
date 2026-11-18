import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig, telHref } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Shown whenever there are no verified listings to display.
 * Never replaced with sample or placeholder listings.
 */
export function PropertyEmptyState({
  title = "Verified listings are being curated.",
  body,
  whatsappHref,
  tone = "light",
  showBrowseLink = false,
  titleAs: Title = "h3",
  className,
}: {
  titleAs?: "h1" | "h2" | "h3";
  title?: string;
  body?: string;
  whatsappHref: string;
  tone?: "light" | "dark";
  showBrowseLink?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "relative overflow-hidden border px-6 py-14 text-center sm:px-12 sm:py-20",
        dark ? "border-gold/25 bg-navy-deep text-ivory" : "border-line bg-white text-charcoal",
        className,
      )}
    >
      <div className={cn("bg-blueprint absolute inset-0", dark ? "opacity-60" : "opacity-30")} aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <svg viewBox="0 0 48 60" className="mx-auto h-14 w-auto" aria-hidden>
          <path d="M1.5 1.5H46.5V58.5H1.5Z M8 53H40" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" />
          <path d="M14 46V22L24 14L34 22V46 M20 46V34H28V46" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" />
        </svg>
        <Title className={cn("mt-8 font-serif text-3xl sm:text-4xl", dark ? "text-ivory" : "text-navy")}>{title}</Title>
        <p className={cn("mt-5 leading-relaxed", dark ? "text-ivory/70" : "text-muted-dark")}>
          {body ??
            `We publish a listing only after its details, pricing and photographs have been verified with the owner. Tell ${siteConfig.consultant.name} what you are looking for and he will share suitable options that are genuinely available right now.`}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Share your requirement
            </a>
          </Button>
          <Button asChild variant={dark ? "outline-light" : "outline-dark"}>
            <a href={telHref}>
              <Phone /> Call {siteConfig.contact.phoneDisplay}
            </a>
          </Button>
        </div>
        {showBrowseLink && (
          <p className="mt-6 text-sm">
            <Link href="/contact" className={cn("underline underline-offset-4", dark ? "text-gold" : "text-gold-dark")}>
              Or send a detailed enquiry
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
