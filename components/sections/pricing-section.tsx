import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceCategories, pricingModel } from "@/lib/services";
import { USD_REFERENCE, formatPrice, type Currency } from "@/lib/currency";

/**
 * The pricing page leads with what we do and introduces price afterwards, so
 * these are service sections rather than plan-comparison cards. There is one
 * pricing model for the whole site (a monthly fee from a floor, plus a
 * one-time setup), quoted per client.
 *
 * Layout follows the reference design system: a left-aligned content column,
 * display-weight headlines with tight negative tracking and a single tinted
 * word, hairline rules instead of boxes, flat 28px-radius cards with 28px
 * padding, and full-pill buttons. Applied in the site's existing dark palette
 * rather than the reference's white canvas.
 */

/** Shared radius/padding for the page's cards, per the reference. */
const CARD = "surface-card";

/** The three service blocks, each ending in a route to a quote. */
export function ServiceBlocks() {
  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6">
      {serviceCategories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 text-primary">
                  <category.icon className="size-4" aria-hidden="true" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  {category.number} — {category.name}
                </p>
              </div>
              <h2 className="display-md mt-4">
                {category.tagline}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {category.description}
              </p>
              <Button className="mt-6 rounded-full" asChild>
                <Link href={category.quoteCta.href}>
                  {category.quoteCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <ul className="hairline-list self-start sm:grid-cols-2 sm:gap-x-8">
              {category.includes.map((item) => (
                <li key={item}>
                  <Check
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Price, after the services. The monthly figure leads at display size; the
 * setup fee is stated plainly but sized so it does not compete with it.
 */
export function PricingSection({ currency }: { currency: Currency }) {
  const monthly = formatPrice(pricingModel.fromMonthly, currency);
  const setup = formatPrice(pricingModel.setup, currency);

  return (
    <section id="pricing" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="display-lg">
            Simple pricing. Built around your{" "}
            <span className="text-primary">needs</span>.
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Every business is different. Tell us what you need and we&apos;ll
            recommend the right solution.
          </p>
        </div>

        <div className={`${CARD} mt-8 sm:p-10`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="display-xl md:text-6xl">
                From {monthly}
                <span className="text-2xl text-muted-foreground sm:text-3xl">
                  /month
                </span>
              </p>
              <p className="mt-3 max-w-md text-muted-foreground">
                Get a tailored quote based on the services your business needs.
              </p>
            </div>
            <Button size="lg" className="shrink-0 rounded-full" asChild>
              <Link href="/contact">
                Get Your Quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="mt-7 border-t border-border pt-5">
            <p className="text-sm">
              <span className="font-medium">Setup fee: {setup}</span>{" "}
              <span className="text-muted-foreground">
                — one-time implementation and initial setup. Final pricing
                depends on the scope of your project.
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6 max-w-3xl space-y-1.5 text-xs text-muted-foreground">
          <p>
            {currency === "ZAR" ? (
              "All prices in ZAR."
            ) : (
              <>
                All prices in USD; invoices are issued and collected in South
                African rand at the equivalent amount, so the final charge
                depends on your bank&apos;s rate on the day. Dollar prices were
                set on {USD_REFERENCE.setOn}.
              </>
            )}{" "}
            Every quote states whether VAT applies. Monthly fees are billed
            monthly in advance and can be cancelled at any time — see our{" "}
            <Link href="/refunds" className="underline">
              Refund &amp; Cancellation Policy
            </Link>
            .
          </p>
          <p>
            Where a package includes a domain, one standard registration covers
            the first 12 months, subject to availability and registry rules;
            renewal fees apply from the second year. Third-party costs — premium
            plugins, email plans, stock media, payment gateway or CRM fees — are
            quoted before purchase and billed separately.
          </p>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    title: "Tailored solutions",
    body: "We scope around what your business actually needs, rather than fitting you into a fixed package.",
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
    <section className="border-y border-border/60 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="display-md">Why Buk Digital</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <h3 className="text-sm font-semibold">{reason.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`${CARD} sm:p-10`}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 className="display-lg">
                Let&apos;s build something that{" "}
                <span className="text-primary">works</span>.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Not sure which service you need? Tell us what you&apos;re
                trying to achieve and we&apos;ll help you find the right
                solution.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/contact">
                  Get Your Quote
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="/book">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
