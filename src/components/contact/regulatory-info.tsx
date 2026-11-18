import { siteConfig, isReraPublishable } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Regulatory information slot (footer + contact page).
 * Shows MahaRERA agent details ONLY when verified and approved for
 * publication in src/config/site.ts. Otherwise renders general
 * disclaimers only — it never claims or implies registration.
 */
export function RegulatoryInfo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const publishable = isReraPublishable();
  const { agent, portalUrl, disclosureText } = siteConfig.rera;
  const dark = tone === "dark";
  return (
    <div className={cn("text-xs leading-relaxed", dark ? "text-ivory/55" : "text-muted-dark", className)}>
      {publishable && (
        <p className={cn("mb-2", dark ? "text-ivory/80" : "text-navy")}>
          <span className="font-semibold">MahaRERA Agent Registration No.:</span> {agent.registrationNumber}
          {agent.validUntil && <> (valid until {new Date(agent.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })})</>}
          {" · "}
          <a href={portalUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-gold">
            Verify on MahaRERA
          </a>
        </p>
      )}
      {publishable && disclosureText && <p className="mb-2">{disclosureText}</p>}
      <p>{siteConfig.disclaimers.general}</p>
      <p className="mt-2">{siteConfig.disclaimers.illustrative}</p>
    </div>
  );
}
