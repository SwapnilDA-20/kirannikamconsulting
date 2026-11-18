"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, NativeSelect, Textarea } from "@/components/ui/form-controls";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { siteConfig } from "@/config/site";
import {
  buildMailtoUrl,
  enquiryCategories,
  enquiryInterests,
  enquirySchema,
  formatEnquiryMessage,
  type EnquiryCategory,
  type EnquiryData,
  type EnquiryInput,
  type EnquiryInterest,
} from "@/lib/validation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Channel = "whatsapp" | "email";

export function EnquiryForm({
  localities,
  defaultInterest = "buy",
  defaultCategory = "either",
  defaultLocality = "",
  propertyRef,
}: {
  localities: { slug: string; name: string }[];
  defaultInterest?: EnquiryInterest;
  defaultCategory?: EnquiryCategory;
  defaultLocality?: string;
  propertyRef?: string;
}) {
  const id = useId();
  const [sentVia, setSentVia] = useState<Channel | null>(null);
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, EnquiryData>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: defaultInterest,
      category: defaultCategory,
      locality: defaultLocality,
      message: "",
      consent: false as unknown as true,
    },
  });

  const onSubmit = (data: EnquiryData) => {
    const localityName = localities.find((l) => l.slug === data.locality)?.name;
    const body = formatEnquiryMessage(data, localityName, propertyRef);
    if (channel === "whatsapp") {
      window.open(buildWhatsAppUrl(body), "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(buildMailtoUrl(`Property enquiry — ${data.name}`, body));
    }
    setSentVia(channel);
  };

  const f = (n: string) => `${id}-${n}`;
  const err = (n: keyof EnquiryInput) =>
    errors[n] ? { "aria-invalid": true as const, "aria-describedby": f(`${n}-error`) } : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="on-light grid gap-5" aria-describedby={f("disclosure")}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={f("name")}>Your name *</Label>
          <Input id={f("name")} autoComplete="name" {...register("name")} {...err("name")} />
          <FieldError id={f("name-error")} message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor={f("phone")}>Mobile number *</Label>
          <Input id={f("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" {...register("phone")} {...err("phone")} />
          <FieldError id={f("phone-error")} message={errors.phone?.message} />
        </div>
      </div>
      <div>
        <Label htmlFor={f("email")}>Email (optional)</Label>
        <Input id={f("email")} type="email" autoComplete="email" {...register("email")} {...err("email")} />
        <FieldError id={f("email-error")} message={errors.email?.message} />
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <Label htmlFor={f("interest")}>I am interested in *</Label>
          <NativeSelect id={f("interest")} {...register("interest")} {...err("interest")}>
            {(Object.entries(enquiryInterests) as [EnquiryInterest, string][]).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </NativeSelect>
          <FieldError id={f("interest-error")} message={errors.interest?.message} />
        </div>
        <div>
          <Label htmlFor={f("category")}>Property type</Label>
          <NativeSelect id={f("category")} {...register("category")}>
            {(Object.entries(enquiryCategories) as [EnquiryCategory, string][]).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div>
          <Label htmlFor={f("locality")}>Preferred area</Label>
          <NativeSelect id={f("locality")} {...register("locality")}>
            <option value="">Any / not sure</option>
            {localities.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>
      <div>
        <Label htmlFor={f("message")}>Your requirement</Label>
        <Textarea
          id={f("message")}
          placeholder="e.g. 2 BHK for my family, ready to move, near the Western Express Highway."
          maxLength={1000}
          {...register("message")}
          {...err("message")}
        />
        <FieldError id={f("message-error")} message={errors.message?.message} />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted-dark">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[var(--color-navy)]"
            {...register("consent")}
            {...err("consent")}
          />
          <span>
            I agree that {siteConfig.name} may contact me about this enquiry, as described in the{" "}
            <Link href="/privacy" className="text-gold-dark underline underline-offset-2">
              privacy policy
            </Link>
            . *
          </span>
        </label>
        <FieldError id={f("consent-error")} message={errors.consent?.message} />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button type="submit" variant="whatsapp" size="lg" disabled={isSubmitting} onClick={() => setChannel("whatsapp")}>
          <WhatsAppIcon /> Continue on WhatsApp
        </Button>
        <Button type="submit" variant="outline-dark" size="lg" disabled={isSubmitting} onClick={() => setChannel("email")}>
          <Mail /> Continue by email
        </Button>
      </div>

      <p id={f("disclosure")} className="flex gap-2 text-xs leading-relaxed text-muted-dark">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        {siteConfig.disclaimers.enquiry}
      </p>

      {sentVia && (
        <div role="status" className="border-l-2 border-gold bg-ivory-deep px-5 py-4 text-sm leading-relaxed text-navy">
          {sentVia === "whatsapp"
            ? "WhatsApp should now be open with your enquiry pre-filled. Your enquiry has not been sent yet — please press Send in WhatsApp to deliver it to Kiran."
            : "Your email app should now be open with your enquiry pre-filled. Please press Send in your email app to deliver it."}{" "}
          If nothing opened, call {siteConfig.contact.phoneDisplay} or email {siteConfig.contact.email}.
        </div>
      )}
    </form>
  );
}
