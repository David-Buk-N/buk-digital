import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Buk Digital — Branding, Websites & Custom Software for SMEs",
  description:
    "Buk Digital builds custom web applications, software solutions and professionally designed websites for growing South African businesses. Book a free session today.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesSection />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
