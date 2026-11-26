import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { serviceCategories, startingMonthly, type ServiceCategory } from "@/lib/services";
import { USD_REFERENCE, formatPrice, type Currency } from "@/lib/currency";

/**
 * How a service's price is shown: a starting price, a "quoted" line, or
 * nothing. The large size is the services page; the small one the home page.
 */
// No tabular-nums on prices: this font's tabular full stop is digit-wide,
// which opens a gap in "R499.99".
export function ServicePrice({
  service,
  currency,
  size = "sm",
  className,
}: {
  service: ServiceCategory;
  currency: Currency;
  size?: "sm" | "lg";
  className?: string;
}) {
  const { pricing } = service;
  if (!pricing) return null;

  if (pricing.kind === "quoted") {
    return (
      <p className={cn("max-w-lg text-[0.9375rem] font-semibold", className)}>
        {pricing.text}
      </p>
    );
  }

  const price = formatPrice(startingMonthly, currency);

  if (size === "sm") {
    return (
      <p className={cn("text-[0.9375rem]", className)}>
        From <span className="font-semibold">{price}/month</span>
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="flex items-baseline gap-2">
        <span className="eyebrow text-muted-foreground">From</span>
        <span className="text-4xl font-extrabold leading-none tracking-[-0.035em]">
          {price}
        </span>
        <span className="font-mono text-sm font-medium">/month</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Your scope and final price are agreed after your free consultation.
      </p>
    </div>
  );
}

/** The three service categories, each ending in a route to a consultation. */
export function ServiceBlocks({ currency }: { currency: Currency }) {
  return (
    <div className="wrap">
      {serviceCategories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`${category.id}-title`}
          className="grid scroll-mt-16 gap-8 border-t-2 border-foreground py-12 lg:grid-cols-2 lg:gap-24 lg:py-16"
        >
          <div>
            <h2 id={`${category.id}-title`} className="eyebrow text-primary">
              {category.number} — {category.name}
            </h2>
            <p className="display-md mt-4">{category.tagline}</p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {category.description}
            </p>
            <ServicePrice service={category} currency={currency} size="lg" className="mt-6" />
            <Button size="lg" className="mt-7" asChild>
              <Link href={category.cta.href}>
                {category.cta.label}
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

/**
 * Billing conditions for the one published price. Kept on the services page
 * because they are legitimate billing and cancellation terms, not packages.
 */
export function ServiceFinePrint({ currency }: { currency: Currency }) {
  const price = formatPrice(startingMonthly, currency);

  return (
    <div className="wrap">
      <div className="grid max-w-5xl gap-x-10 gap-y-3 border-t border-border pt-6 text-[0.8125rem] leading-relaxed text-muted-foreground md:grid-cols-2">
        <p>
          {currency === "ZAR" ? (
            "Prices in ZAR."
          ) : (
            <>
              Prices in USD; invoices are issued and collected in South African
              rand at the equivalent amount, so the final charge depends on your
              bank&apos;s rate on the day. Dollar prices were set on{" "}
              {USD_REFERENCE.setOn}.
            </>
          )}{" "}
          Every quote states whether VAT applies. Monthly fees are billed
          monthly in advance and can be cancelled at any time — see our{" "}
          <Link href="/refunds" className="underline underline-offset-2">
            Refund &amp; Cancellation Policy
          </Link>
          .
        </p>
        <p>
          {price}/month is a starting price, and not every service listed is
          included at that price. What your website includes, and its monthly
          price, are set out in your proposal after the consultation.
          Third-party costs — premium plugins, email plans, stock media,
          payment gateway or CRM fees — are quoted before purchase and billed
          separately.
        </p>
      </div>
    </div>
  );
}
