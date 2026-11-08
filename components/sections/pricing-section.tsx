import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlanCards, PlanFinePrint } from "@/components/sections/plan-parts";
import { serviceCategories } from "@/lib/services";
import type { Currency } from "@/lib/currency";

/** The three packages with their conditions. Used on the home and pricing pages. */
export function PricingSection({ currency }: { currency: Currency }) {
  return (
    <section id="pricing" className="pb-20 sm:pb-28">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-24">
          <h2 className="display-lg">
            Simple pricing. Built around your{" "}
            <span className="text-primary">needs</span>.
          </h2>
          <p className="lead-text max-w-xl">
            Every business is different. Tell us what you need and we&apos;ll
            recommend the right solution.
          </p>
        </div>
        <div className="mt-12">
          <PlanCards currency={currency} />
          <PlanFinePrint currency={currency} />
        </div>
      </div>
    </section>
  );
}

/** The three service categories, each ending in a route to a quote. */
export function ServiceBlocks() {
  return (
    <div className="wrap">
      {serviceCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="grid gap-8 border-t-2 border-foreground py-12 lg:grid-cols-2 lg:gap-24 lg:py-16"
        >
          <div>
            <p className="eyebrow text-primary">
              {category.number} — {category.name}
            </p>
            <h2 className="display-md mt-4">{category.tagline}</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {category.description}
            </p>
            <Button size="lg" className="mt-7" asChild>
              <Link href={category.quoteCta.href}>
                {category.quoteCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <ul className="hairline-list self-start sm:grid-cols-2 sm:gap-x-8">
            {category.includes.map((item) => (
              <li key={item}>
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const reasons = [
  {
    title: "Tailored solutions",
    body: "Start on a plan, or have something scoped around what your business actually needs.",
  },
  {
    title: "One partner",
    body: "Branding, website, domain, email, hosting and custom software from the same team.",
  },
  {
    title: "Built to scale",
    body: "Start with what you need now and add capability as the business grows.",
  },
  {
    title: "Ongoing support",
    body: "Managed hosting, maintenance and a real person to reach when something breaks.",
  },
];

export function WhyBukDigital() {
  return (
    <section className="dark py-16 sm:py-24">
      <div className="wrap">
        <h2 className="display-lg">Why Buk Digital</h2>
        <div className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="border-t border-border pt-5 pb-9 lg:pb-0">
              <h3 className="text-xl font-bold tracking-[-0.015em]">
                {reason.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuoteCta() {
  return (
    <section className="marigold py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h2 className="display-xl">
          Let&apos;s build something that{" "}
          <span className="underline decoration-[0.08em] underline-offset-[0.12em]">
            works
          </span>
          .
        </h2>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Not sure which service you need? Tell us what you&apos;re trying to
            achieve and we&apos;ll help you find the right solution.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Your Quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-foreground/10" asChild>
              <Link href="/book">Talk to Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
