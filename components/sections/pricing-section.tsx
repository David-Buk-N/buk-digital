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
 */

/** The three service blocks, each ending in a route to a quote. */
export function ServiceBlocks() {
  return (
    <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6">
      {serviceCategories.map((category) => (
        <section key={category.id} id={category.id} className="scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                  <category.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  {category.number} — {category.name}
                </p>
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                {category.tagline}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {category.description}
              </p>
              <Button className="mt-8" asChild>
                <Link href={category.quoteCta.href}>
                  {category.quoteCta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                What this can include
              </p>
              <ul className="mt-4 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
                {category.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-b border-border py-3 text-sm"
                  >
                    <Check
                      className="size-5 shrink-0 rounded-full bg-primary/15 p-1 text-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * Price, after the services. The monthly figure leads; the setup fee is stated
 * plainly but sized so it does not compete with it.
 */
export function PricingSection({ currency }: { currency: Currency }) {
  const monthly = formatPrice(pricingModel.fromMonthly, currency);
  const setup = formatPrice(pricingModel.setup, currency);

  return (
    <section id="pricing" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Simple pricing. Built around your needs.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Every business is different. Tell us what you need and we&apos;ll
          recommend the right solution.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 sm:p-10">
          <p className="text-5xl font-semibold tracking-tight sm:text-6xl">
            From {monthly}
            <span className="text-2xl text-muted-foreground sm:text-3xl">
              /month
            </span>
          </p>
          <p className="mt-4 text-muted-foreground">
            Get a tailored quote based on the services your business needs.
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm font-medium">Setup fee: {setup}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              One-time implementation and initial setup. Final pricing depends
              on the scope of your project.
            </p>
          </div>

          <Button size="lg" className="mt-8 w-full sm:w-auto" asChild>
            <Link href="/contact">
              Get Your Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 space-y-2 text-left text-xs text-muted-foreground">
          <p>
            {currency === "ZAR" ? (
              "All prices in ZAR."
            ) : (
              <>
                All prices in USD. Invoices are issued and collected in South
                African rand at the equivalent amount, so the final charge
                depends on your bank&apos;s exchange rate on the day. Dollar
                prices were set on {USD_REFERENCE.setOn} and are reviewed
                periodically.
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
            Where a package includes a domain, one standard registration is
            included for the first 12 months, subject to availability and
            registry rules. Renewal fees apply from the second year. Premium
            domains and transfers may be charged separately.
          </p>
          <p>
            Third-party costs — premium plugins, email plans, stock media,
            payment gateway or CRM fees — are quoted before purchase and billed
            separately.
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
    <section className="border-y border-border/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Why Buk Digital
        </h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <h3 className="font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Let&apos;s build something that works for your business.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Not sure which service you need? Tell us what you&apos;re trying to
          achieve and we&apos;ll help you find the right solution.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/contact">
              Get Your Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/book">Talk to Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
