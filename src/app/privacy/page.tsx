import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles personal information shared through this website, WhatsApp, phone and email.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="19 November 2026">
      <p>
        This policy explains how {siteConfig.name} (“we”, “us”) handles personal information when you use this website
        or contact us. We aim to collect only what we need to respond to your property enquiry.
      </p>

      <h2>What this website collects</h2>
      <p>
        This website is a static website. It does <strong>not</strong> use a database, does not store enquiry form
        submissions, and does not set advertising or analytics cookies.
      </p>
      <p>
        When you use the enquiry form, the details you type are used only inside your own browser to prepare a message.
        Nothing is sent to us until you choose to send that message yourself through WhatsApp or your email app.
      </p>

      <h2>Information you share with us</h2>
      <p>When you contact us by WhatsApp, phone or email, we may receive:</p>
      <ul>
        <li>your name, phone number and email address;</li>
        <li>details of your property requirement, budget, preferred areas and timelines;</li>
        <li>details of a property you own, if you ask us to help sell or let it.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>to respond to your enquiry and discuss suitable properties;</li>
        <li>to arrange site visits and follow up on your requirement;</li>
        <li>to share relevant property information with you, where you have asked us to.</li>
      </ul>
      <p>
        We do not sell your personal information. We share it with property owners, buyers, tenants or other parties only
        where needed for your transaction and with your knowledge.
      </p>

      <h2>Third-party services</h2>
      <p>
        Messages sent via WhatsApp are handled under WhatsApp’s own terms and privacy policy. Emails are handled by your
        and our email providers. The “Open in Google Maps” link takes you to Google Maps, which is governed by Google’s
        privacy policy. Our website host may keep standard technical server logs (such as IP addresses) for security
        and reliability.
      </p>

      <h2>Retention and your choices</h2>
      <p>
        We keep enquiry conversations only for as long as reasonably needed to assist you. You can ask us at any time to
        stop contacting you, or to correct or delete the information you have shared with us, subject to any legal
        obligations to retain records.
      </p>

      <h2>Contact</h2>
      <p>
        For any privacy question, contact {siteConfig.consultant.name} at <a href={mailHref}>{siteConfig.contact.email}</a>{" "}
        or <a href={telHref}>{siteConfig.contact.phoneDisplay}</a>, or write to us at {siteConfig.address.full}.
      </p>
      <p>
        See also our <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
