import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-5", dark ? "text-gold" : "text-gold-dark", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      )}
      <Tag className={cn("section-title", dark ? "text-ivory" : "text-navy")}>{title}</Tag>
      {intro && (
        <div className={cn("mt-6 text-[1.05rem] leading-relaxed", dark ? "text-ivory/75" : "text-muted-dark")}>
          {intro}
        </div>
      )}
    </div>
  );
}
