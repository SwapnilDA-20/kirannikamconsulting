import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { mailHref, siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions",
  description: `Terms of use for the ${siteConfig.name} website, including property information, illustrative imagery and enquiries.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms" updated="19 November 2026">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the website.
      </p>

      <h2>About this website</h2>
      <p>
        This website is operated by {siteConfig.name}, {siteConfig.address.full}. It provides general information about
        our {siteConfig.category.toLowerCase()} services in {siteConfig.primaryMarket}.
      </p>

      <h2>Property information</h2>
      <ul>
        <li>{siteConfig.disclaimers.general}</li>
        <li>Prices, availability, carpet areas and specifications can change without notice.</li>
        <li>
          Nothing on this website is an offer, a contract, or legal, tax or financial advice. Please obtain independent
          professional advice before entering into any property transaction.
        </li>
        <li>
          You are responsible for carrying out your own due diligence, including checking title, approvals and — where
          applicable — MahaRERA registration of any project on the official MahaRERA portal.
        </li>
      </ul>

      <h2>Images</h2>
      <p>{siteConfig.disclaimers.illustrative}</p>

      <h2>Enquiries</h2>
      <p>
        {siteConfig.disclaimers.enquiry} An enquiry does not create any obligation on you or on us. Any fees or terms
        for our services will be discussed and agreed with you directly before you proceed.
      </p>

      <h2>Locality information</h2>
      <p>
        Area guides are general orientation only. Transport links, civic projects and neighbourhood details may change
        and should be verified independently.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {siteConfig.name} name, logo, text and design of this website may not be copied or reused without
        permission. Third-party images are used under their respective licences.
      </p>

      <h2>External links</h2>
      <p>Links to third-party websites (such as WhatsApp, Google Maps or MahaRERA) are provided for convenience. We are not responsible for their content.</p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {siteConfig.name} is not liable for any loss arising from reliance on information
        on this website without independent verification.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and courts in Mumbai, Maharashtra shall have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={mailHref}>{siteConfig.contact.email}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
