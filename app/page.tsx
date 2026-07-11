import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home-hero";
import { ServicesBento } from "@/components/sections/services-bento";
import { ProcessSection } from "@/components/sections/process-section";
import { HomeTestimonials } from "@/components/sections/testimonials-section";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Buk Digital — Custom Web Apps, Software & Websites for SMEs",
  description:
    "Buk Digital builds custom web applications, software solutions and professionally designed websites for growing South African businesses. Book a free session today.",
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServicesBento />
      <ProcessSection />
      <HomeTestimonials />
      <CtaBand />
    </>
  );
}
