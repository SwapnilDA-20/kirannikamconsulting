import type { Metadata } from "next";
import { Hero } from "@/components/homepage/hero";
import { ConsultantIntro } from "@/components/homepage/consultant-intro";
import { CategoryShowcase } from "@/components/homepage/category-showcase";
import { FeaturedListings } from "@/components/homepage/featured-listings";
import { ExploreWesternMumbai } from "@/components/homepage/explore-western-mumbai";
import { WhyChoose } from "@/components/homepage/why-choose";
import { ConsultationProcess } from "@/components/homepage/process";
import { Testimonials } from "@/components/homepage/testimonials";
import { Faq } from "@/components/homepage/faq";
import { ContactCta } from "@/components/contact/contact-cta";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} | Real Estate Consultant in Mumbai’s Western Suburbs`,
  absoluteTitle: true,
  description:
    "Kiran Nikam Consulting — residential and commercial real estate consultant in Kandivali East, Mumbai. Flats for sale and rent, office spaces, shops and retail across the Western Suburbs.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ConsultantIntro />
      <CategoryShowcase />
      <FeaturedListings />
      <ExploreWesternMumbai />
      <WhyChoose />
      <ConsultationProcess />
      <Testimonials />
      <Faq />
      <ContactCta />
    </>
  );
}
