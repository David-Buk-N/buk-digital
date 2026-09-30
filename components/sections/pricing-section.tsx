import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  categoryPrice,
  categoryRecurring,
  serviceCategories,
  type ServiceCategory,
} from "@/lib/services";
import {
  USD_REFERENCE,
  formatMonthly,
  formatPrice,
  type Currency,
  type Price,
} from "@/lib/currency";

/**
 * Once-off and monthly always appear in the same arrangement, so a visitor can
 * tell at a glance what they pay now and what recurs. Each view shows a single
 * currency: rand in South Africa, dollars everywhere else.
 */
function PriceBlock({
  once,
  onceLabel,
  onceNote,
  monthly,
  monthlyLabel,
  monthlyNote,
  currency,
}: {
  once: Price | null;
  /** Used instead of a figure when quote-based. */
  onceLabel?: string;
  onceNote: string;
  monthly: Price | null;
  monthlyLabel?: string;
  monthlyNote?: string;
  currency: Currency;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight">
          {once ? formatPrice(once, currency) : onceLabel}
        </span>
        <span className="text-sm text-muted-foreground">{onceNote}</span>
      </div>
      <div className="mt-3 border-t border-border pt-3">
        {monthly || monthlyLabel ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold">
                {monthly ? formatMonthly(monthly, currency) : monthlyLabel}
              </span>
              <span className="text-sm text-muted-foreground">
                {monthlyNote ?? "hosting, maintenance & support"}
              </span>
            </div>
          </>
        ) : (
          <span className="text-sm text-muted-foreground">No monthly fee</span>
        )}
      </div>
    </div>
  );
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3">
      {features.map((feature) => (
        <li key={feature} className="flex gap-3 text-sm">
          <Check
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

function CategoryHeading({ category }: { category: ServiceCategory }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
        {category.number} — {category.name}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {category.tagline}
      </h2>
      <p className="mt-3 text-muted-foreground">{category.description}</p>
    </div>
  );
}

export function PricingSection({ currency }: { currency: Currency }) {
  const showingDollars = currency === "USD";

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* At a glance: the whole billing structure in three rows. */}
        <div className="border-t border-border">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr] gap-4 border-b border-border py-3 sm:grid">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Category
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Once-off
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Monthly
            </span>
          </div>
          {serviceCategories.map((category) => {
            const recurring = categoryRecurring(category, currency);
            return (
              <div
                key={category.id}
                className="grid gap-1 border-b border-border py-4 sm:grid-cols-[1.5fr_1fr_1fr] sm:items-center sm:gap-4"
              >
                <Link
                  href={`#${category.id}`}
                  className="font-medium hover:text-primary"
                >
                  {category.name}
                </Link>
                <span className="text-sm sm:text-base">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground sm:hidden">
                    Once-off:{" "}
                  </span>
                  {categoryPrice(category, currency)}
                </span>
                <span className="text-sm sm:text-base">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground sm:hidden">
                    Monthly:{" "}
                  </span>
                  {recurring ?? "—"}
                  {!category.fromMonthly && category.recurringNote && (
                    <span className="text-muted-foreground">
                      {" "}
                      {category.recurringNote}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* One block per category, in the order clients move through them. */}
        <div className="mt-20 space-y-20">
          {serviceCategories.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <CategoryHeading category={category} />

              {category.packages ? (
                <>
                  <div className="mt-8">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      Every package includes
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted-foreground">
                      {category.includes.map((item, index) => (
                        <li key={item}>
                          {item}
                          {index < category.includes.length - 1 && (
                            <span className="ml-2 text-border">·</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
                    {category.packages.map((pkg) => (
                      <Card
                        key={pkg.name}
                        className={cn(
                          // overflow-visible: the base Card clips children,
                          // which would cut the floating badge in half
                          "relative flex flex-col overflow-visible",
                          pkg.highlighted &&
                            "ring-primary shadow-lg shadow-primary/10"
                        )}
                      >
                        {pkg.highlighted && (
                          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                            Most Popular
                          </Badge>
                        )}
                        <CardHeader>
                          <CardTitle className="text-xl">{pkg.name}</CardTitle>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {pkg.description}
                          </p>
                          <div className="mt-4">
                            <PriceBlock
                              once={pkg.onceOff}
                              onceNote="once-off"
                              monthly={pkg.monthly}
                              currency={currency}
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <FeatureList features={pkg.features} />
                        </CardContent>
                        <CardFooter>
                          <Button
                            className="w-full"
                            variant={pkg.highlighted ? "default" : "outline"}
                            asChild
                          >
                            <Link href={category.cta.href}>
                              {category.cta.label}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="mt-8 flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="lg:max-w-xs">
                    <PriceBlock
                      once={category.from}
                      onceLabel={category.quoteLabel}
                      onceNote={category.priceNote}
                      monthly={category.fromMonthly}
                      monthlyLabel={category.recurringLabel}
                      monthlyNote={category.recurringNote}
                      currency={currency}
                    />
                    <Button className="mt-6 w-full" asChild>
                      <Link href={category.cta.href}>{category.cta.label}</Link>
                    </Button>
                  </div>
                  <div className="lg:flex-1">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      What this covers
                    </p>
                    <div className="mt-4 sm:columns-2 sm:gap-8">
                      <FeatureList features={category.includes} />
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-2 text-center text-xs text-muted-foreground">
          {showingDollars ? (
            <p>
              All prices in USD. Invoices are issued and collected in South
              African rand at the equivalent amount, so the final charge
              depends on your bank&apos;s exchange rate on the day. Dollar
              prices were set on {USD_REFERENCE.setOn} and are reviewed
              periodically.
            </p>
          ) : (
            <p>All prices in ZAR.</p>
          )}
          <p>
            Every quote states whether VAT applies. Monthly hosting,
            maintenance and support is billed monthly in advance and can be
            cancelled at any time — see our{" "}
            <Link href="/refunds" className="underline">
              Refund &amp; Cancellation Policy
            </Link>
            .
          </p>
          <p>
            One standard domain registration is included for the first 12
            months, subject to availability and registry rules. Renewal fees
            apply from the second year. Premium domains and transfers may be
            charged separately.
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
