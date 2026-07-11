"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/animated-hero";

// The ONE heavy animated background on the site — lazy-loaded, client-only.
const AuroraBackground = dynamic(
  () =>
    import("@/components/ui/aurora-background").then(
      (m) => m.AuroraBackground
    ),
  { ssr: false }
);

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <AuroraBackground className="h-full bg-background dark:bg-background" />
      </div>
      <div className="relative z-10">
        <Hero />
      </div>
    </section>
  );
}
