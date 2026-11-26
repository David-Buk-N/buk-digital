import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The word that cycles in the headline. The CSS cycle (globals.css) is built
 * for exactly four words, and the first is the one shown with reduced motion.
 * Each carries its own full stop so a shorter word never leaves a gap before it.
 */
const words = ["business.", "brand.", "website.", "systems."];

/** The logo's ring and dot, opened out into the hero's one graphic. */
function HeroRings() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      fill="none"
      className="absolute -right-[32rem] -top-[14rem] size-[64rem] text-white opacity-45 sm:-right-[22rem] lg:-right-[12rem] lg:-top-[10rem] lg:opacity-100"
    >
      {[150, 250, 350, 450].map((radius) => (
        <circle key={radius} cx="500" cy="500" r={radius} stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
      ))}
      <circle
        cx="500"
        cy="500"
        r="350"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="2 14"
        strokeLinecap="round"
        className="spin-slow"
      />
      <circle cx="500" cy="500" r="56" fill="currentColor" fillOpacity="0.14" />
    </svg>
  );
}

export function HomeHero() {
  return (
    <section className="cobalt relative">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <HeroRings />
      </div>

      <div className="wrap relative grid gap-12 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] lg:gap-20 lg:pt-24">
        <div className="pb-16 sm:pb-20 lg:pb-28">
          <p className="eyebrow rise text-highlight">
            Your Digital Consulting &amp; Solutions Partner
          </p>

          <h1 className="display-xl rise mt-6 max-w-[15ch] [animation-delay:40ms]">
            <span className="sr-only">Your business. Digitally empowered.</span>
            <span aria-hidden="true">
              Your{" "}
              <span className="word-cycle text-highlight">
                {words.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>{" "}
              Digitally empowered.
            </span>
          </h1>

          <p className="lead-text rise mt-7 max-w-2xl [animation-delay:90ms]">
            We help businesses build their brands, establish their online
            presence and solve complex challenges through technology. One
            digital partner, built around your business.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book">
                Book a Free Consultation <CalendarCheck className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">
                Explore Our Services <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
