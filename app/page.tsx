import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyBukDigital } from "@/components/sections/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { detectCurrency } from "@/lib/currency-server";
import { siteConfig } from "@/lib/site";
import { homeTitle, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: homeTitle,
  description: siteConfig.description,
  path: "/",
});

// Renders per request: the services section and FAQ show the starting price in
// the visitor's currency.
export default async function HomePage() {
  const currency = await detectCurrency();

  return (
    <>
      <HomeHero />
      <ServicesSection currency={currency} />
      <WhyBukDigital tone="paper" />
      <ProcessSection />
      <FaqSection currency={currency} />
      <CtaBand />
    </>
  );
}
