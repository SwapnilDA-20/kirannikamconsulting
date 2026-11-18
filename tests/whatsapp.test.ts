import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, whatsappLinks, whatsappMessages } from "@/lib/whatsapp";
import { siteConfig, telHref, mailHref } from "@/config/site";

describe("WhatsApp links", () => {
  it("uses the configured number", () => {
    expect(siteConfig.contact.whatsapp).toBe("919870947557");
    expect(buildWhatsAppUrl()).toBe("https://wa.me/919870947557");
  });
  it("URL-encodes messages", () => {
    const url = buildWhatsAppUrl("Hello & welcome? 2 BHK #1");
    expect(url).toBe("https://wa.me/919870947557?text=Hello%20%26%20welcome%3F%202%20BHK%20%231");
    expect(decodeURIComponent(new URL(url).searchParams.get("text")!)).toBe("Hello & welcome? 2 BHK #1");
  });
  it("property enquiries include title and reference ID", () => {
    const p = { title: "2 BHK in Thakur Village", referenceId: "KN-R-001", locality: "kandivali-east" };
    const text = new URL(whatsappLinks.property(p)).searchParams.get("text")!;
    expect(text).toContain("2 BHK in Thakur Village");
    expect(text).toContain("KN-R-001");
    expect(text).toContain("Kandivali East");
    expect(new URL(whatsappLinks.visit(p)).searchParams.get("text")).toContain("site visit");
  });
  it("every preset link is a valid wa.me URL with text", () => {
    for (const key of ["general", "residential", "commercial", "buy", "rent", "sell", "lease"] as const) {
      const u = new URL(whatsappLinks[key]());
      expect(u.origin + u.pathname).toBe("https://wa.me/919870947557");
      expect(u.searchParams.get("text")).toBe(whatsappMessages[key]());
    }
  });
  it("call and email links", () => {
    expect(telHref).toBe("tel:+919870947557");
    expect(mailHref).toBe("mailto:kirannikam5171@gmail.com");
  });
});
