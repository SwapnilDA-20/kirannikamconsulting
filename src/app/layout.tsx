import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const cormorant = localFont({
  src: [
    { path: "../../public/fonts/Cormorant-var.woff2", style: "normal", weight: "300 700" },
    { path: "../../public/fonts/Cormorant-Italic-var.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const manrope = localFont({
  src: [{ path: "../../public/fonts/Manrope-var.woff2", style: "normal", weight: "200 800" }],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.consultant.name }],
  creator: siteConfig.name,
  formatDetection: { telephone: true, email: true, address: true },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#101C2C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
