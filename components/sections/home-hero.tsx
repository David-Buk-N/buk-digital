import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlanLedger, PlanPrice } from "@/components/sections/plan-parts";
import { basicPlan } from "@/lib/services";
import type { Currency } from "@/lib/currency";

const words = ["brands", "websites", "web apps", "software"];

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

export function HomeHero({ currency }: { currency: Currency }) {
  return (
    <section className="cobalt relative">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <HeroRings />
      </div>

      <div className="wrap relative grid gap-12 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] lg:gap-20 lg:pt-24">
        <div className="pb-2 lg:pb-28">
          <h1 className="display-xl rise max-w-[15ch]">
            <span className="sr-only">
              Buk Digital builds custom brands, websites, web apps and software
              for growing businesses.
            </span>
            <span aria-hidden="true">
              Buk Digital builds custom{" "}
              <span className="word-cycle text-highlight">
                {words.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>{" "}
              for growing businesses.
            </span>
          </h1>

          <p className="lead-text rise mt-7 max-w-2xl [animation-delay:90ms]">
            From client portals and booking systems to professionally designed
            business websites — we build the technology South African SMEs need
            to grow, without the enterprise price tag.
          </p>

          <div className="rise mt-9 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/book">
                Book a Session <CalendarCheck className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">
                View Pricing <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        {/* The Basic plan as a sheet of paper, overhanging into the next section. */}
        <aside
          aria-label={`${basicPlan.name} plan`}
          className="paper rise relative z-10 -mb-20 self-end rounded-[var(--radius)] border border-border bg-card p-7 shadow-[0_24px_60px_-20px_oklch(0.2_0.035_268/0.45)] [animation-delay:260ms] sm:p-8 lg:-mb-24"
        >
          <h2 className="eyebrow">{basicPlan.name} plan</h2>
          <PlanPrice plan={basicPlan} currency={currency} className="mt-5" />
          <div className="mt-6 border-t-2 border-foreground pt-2">
            <PlanLedger plan={basicPlan} />
          </div>
          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-border pt-4">
            <p className="text-[0.8125rem] text-muted-foreground">
              * For the first 12 months.
            </p>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Compare plans <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
