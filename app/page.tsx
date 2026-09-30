import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaBand } from "@/components/sections/cta-band";
import { detectCurrency } from "@/lib/currency-server";
import { formatPrice } from "@/lib/currency";
import { serviceCategories } from "@/lib/services";

// Renders per request for currency, so the description quotes the same
// currency the visitor sees on the page.
export async function generateMetadata(): Promise<Metadata> {
  const currency = await detectCurrency();
  const from = formatPrice(serviceCategories[0].from!, currency);

  return {
    title: "Buk Digital — Branding, Websites & Custom Software for SMEs",
    description: `Buk Digital builds brands, business websites and custom software for growing businesses — branding from ${from}, website packages with managed hosting, and custom solutions quoted per project. Book a free session today.`,
  };
}

export default async function HomePage() {
  const currency = await detectCurrency();

  return (
    <>
      <HomeHero />
      <ServicesSection currency={currency} />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
