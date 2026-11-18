import { siteConfig } from "@/config/site";
import type { Property } from "@/types/property";
import { getLocalityName } from "@/data/localities";

const WA_BASE = "https://wa.me/";

/** Build a wa.me link with a properly URL-encoded message. */
export function buildWhatsAppUrl(message?: string, number: string = siteConfig.contact.whatsapp): string {
  const digits = number.replace(/\D/g, "");
  const url = `${WA_BASE}${digits}`;
  return message && message.trim() ? `${url}?text=${encodeURIComponent(message.trim())}` : url;
}

export const whatsappMessages = {
  general: () => `Hello ${siteConfig.consultant.name}, I found ${siteConfig.name} online and would like to discuss a property requirement.`,
  residential: () =>
    `Hello ${siteConfig.consultant.name}, I am looking for a residential property in Mumbai. Could we discuss my requirement?`,
  commercial: () =>
    `Hello ${siteConfig.consultant.name}, I am looking for a commercial property (office / shop / retail) in Mumbai. Could we discuss my requirement?`,
  buy: () => `Hello ${siteConfig.consultant.name}, I would like help buying a property in Mumbai.`,
  rent: () => `Hello ${siteConfig.consultant.name}, I am looking for a property to rent in Mumbai.`,
  sell: () => `Hello ${siteConfig.consultant.name}, I would like to discuss selling my property.`,
  lease: () => `Hello ${siteConfig.consultant.name}, I would like to discuss leasing a commercial property.`,
  locality: (name: string) =>
    `Hello ${siteConfig.consultant.name}, I am interested in properties in ${name}. Could you share suitable options?`,
  property: (p: Pick<Property, "title" | "referenceId" | "locality">) =>
    `Hello ${siteConfig.consultant.name}, I am interested in "${p.title}" (Ref: ${p.referenceId}) in ${getLocalityName(p.locality)}. Please share more details.`,
  visit: (p: Pick<Property, "title" | "referenceId" | "locality">) =>
    `Hello ${siteConfig.consultant.name}, I would like to schedule a site visit for "${p.title}" (Ref: ${p.referenceId}) in ${getLocalityName(p.locality)}. Please let me know available times.`,
} as const;

export const whatsappLinks = {
  general: () => buildWhatsAppUrl(whatsappMessages.general()),
  residential: () => buildWhatsAppUrl(whatsappMessages.residential()),
  commercial: () => buildWhatsAppUrl(whatsappMessages.commercial()),
  buy: () => buildWhatsAppUrl(whatsappMessages.buy()),
  rent: () => buildWhatsAppUrl(whatsappMessages.rent()),
  sell: () => buildWhatsAppUrl(whatsappMessages.sell()),
  lease: () => buildWhatsAppUrl(whatsappMessages.lease()),
  locality: (name: string) => buildWhatsAppUrl(whatsappMessages.locality(name)),
  property: (p: Pick<Property, "title" | "referenceId" | "locality">) => buildWhatsAppUrl(whatsappMessages.property(p)),
  visit: (p: Pick<Property, "title" | "referenceId" | "locality">) => buildWhatsAppUrl(whatsappMessages.visit(p)),
};
