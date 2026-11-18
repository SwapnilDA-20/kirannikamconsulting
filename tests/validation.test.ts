import { describe, expect, it } from "vitest";
import { buildMailtoUrl, enquirySchema, formatEnquiryMessage } from "@/lib/validation";

const valid = {
  name: "  Asha   Patel ",
  phone: "98765 43210",
  email: "",
  interest: "rent",
  category: "residential",
  locality: "kandivali-east",
  message: "Need a 2 BHK",
  consent: true,
};

describe("enquiry form validation", () => {
  it("accepts a valid enquiry and normalises the name", () => {
    const r = enquirySchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.name).toBe("Asha Patel");
  });
  it.each(["9870947557", "+91 9870947557", "+91-98709-47557", "09870947557", "919870947557"])("accepts phone %s", (phone) => {
    expect(enquirySchema.safeParse({ ...valid, phone }).success).toBe(true);
  });
  it.each(["12345", "5870947557", "98709475570", "abcdefghij", ""])("rejects phone %s", (phone) => {
    expect(enquirySchema.safeParse({ ...valid, phone }).success).toBe(false);
  });
  it("rejects missing name, bad email, missing consent, unknown interest, long message", () => {
    expect(enquirySchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, interest: "hack" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...valid, message: "x".repeat(1001) }).success).toBe(false);
  });
  it("accepts a valid optional email", () => {
    expect(enquirySchema.safeParse({ ...valid, email: "asha@example.com" }).success).toBe(true);
  });
  it("formats the message for WhatsApp / email", () => {
    const d = enquirySchema.parse(valid);
    const msg = formatEnquiryMessage(d, "Kandivali East", "KN-R-001");
    expect(msg).toContain("Name: Asha Patel");
    expect(msg).toContain("Looking for: Renting a property");
    expect(msg).toContain("Preferred area: Kandivali East");
    expect(msg).toContain("Property reference: KN-R-001");
    expect(msg).not.toContain("Email:");
  });
  it("builds an encoded mailto URL", () => {
    const u = buildMailtoUrl("Hi & bye", "Line 1\nLine 2");
    expect(u).toBe("mailto:kirannikam5171@gmail.com?subject=Hi%20%26%20bye&body=Line%201%0ALine%202");
  });
});
