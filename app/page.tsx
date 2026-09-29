import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaBand } from "@/components/sections/cta-band";
import { detectCurrency } from "@/lib/currency-server";

export const metadata: Metadata = {
  title: "Buk Digital — Branding, Websites & Custom Software for SMEs",
  description:
    "Buk Digital builds brands, business websites and custom software for growing South African businesses — branding from R5,000, website packages with managed hosting, and custom solutions quoted per project. Book a free session today.",
};

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
