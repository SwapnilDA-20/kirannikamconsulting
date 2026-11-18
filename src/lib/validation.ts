import { z } from "zod";
import { siteConfig } from "@/config/site";

/** Indian mobile number: optional +91 / 91 / 0 prefix, 10 digits starting 6–9. */
export const INDIAN_MOBILE = /^(?:\+?91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}$/;

export const enquiryInterests = {
  buy: "Buying a property",
  rent: "Renting a property",
  sell: "Selling my property",
  lease: "Leasing (commercial)",
  "let-out": "Letting out my property",
  other: "Something else",
} as const;

export const enquiryCategories = {
  residential: "Residential",
  commercial: "Commercial",
  either: "Not sure yet",
} as const;

export type EnquiryInterest = keyof typeof enquiryInterests;
export type EnquiryCategory = keyof typeof enquiryCategories;

const clean = (s: string) => s.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();

export const enquirySchema = z.object({
  name: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Please enter your name").max(80, "Name is too long")),
  phone: z
    .string()
    .trim()
    .regex(INDIAN_MOBILE, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((v) => v === "" || z.email().safeParse(v).success, "Please enter a valid email address"),
  interest: z.enum(Object.keys(enquiryInterests) as [EnquiryInterest, ...EnquiryInterest[]], {
    message: "Please choose what you are looking for",
  }),
  category: z.enum(Object.keys(enquiryCategories) as [EnquiryCategory, ...EnquiryCategory[]]),
  locality: z.string().max(60),
  message: z
    .string()
    .max(1000, "Please keep your message under 1,000 characters")
    .transform((v) => v.trim()),
  consent: z.literal(true, { message: "Please confirm to continue" }),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;

/** Plain-text enquiry used for both WhatsApp and email. */
export function formatEnquiryMessage(d: EnquiryData, localityName?: string, propertyRef?: string): string {
  const lines = [
    `Hello ${siteConfig.consultant.name}, I would like to make an enquiry via your website.`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : null,
    `Looking for: ${enquiryInterests[d.interest]}`,
    `Property type: ${enquiryCategories[d.category]}`,
    localityName ? `Preferred area: ${localityName}` : null,
    propertyRef ? `Property reference: ${propertyRef}` : null,
    d.message ? "" : null,
    d.message ? d.message : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}

export function buildMailtoUrl(subject: string, body: string, to: string = siteConfig.contact.email): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
