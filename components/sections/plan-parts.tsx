import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { plans, type Plan } from "@/lib/services";
import { USD_REFERENCE, formatPrice, type Currency } from "@/lib/currency";

/** A plan's contents as an itemised list: label, dotted leader, value. */
export function PlanLedger({ plan }: { plan: Plan }) {
  return (
    <dl>
      {plan.rows.map((row) => (
        <div key={row.label} className="ledger-row">
          <dt>{row.label}</dt>
          <span className="ledger-leader" aria-hidden="true" />
          <dd>
            <span className={cn(row.free && "ledger-free")}>
              {row.value}
              {row.footnote && "*"}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The plan's price at display size, in the visitor's currency. */
export function PlanPrice({
  plan,
  currency,
  className,
}: {
  plan: Plan;
  currency: Currency;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-baseline gap-1.5 text-[3.75rem] font-extrabold leading-none tracking-[-0.04em] tabular-nums",
        className
      )}
    >
      {plan.monthly ? (
        <>
          {formatPrice(plan.monthly, currency)}
          <span className="font-mono text-sm font-medium tracking-normal">
            /month
          </span>
        </>
      ) : (
        "Quoted"
      )}
    </p>
  );
}

/** The three packages, as one continuous band of colour blocks. */
export function PlanCards({ currency }: { currency: Currency }) {
  return (
    <ul className="grid overflow-hidden rounded-[var(--radius)] border border-border lg:grid-cols-3">
      {plans.map((plan) => (
        <li
          key={plan.id}
          id={plan.id}
          className={cn(
            plan.surface,
            plan.surface === "paper" && "bg-card",
            "flex scroll-mt-24 flex-col p-7 sm:p-9"
          )}
        >
          <h3 className="eyebrow">{plan.name}</h3>
          <PlanPrice plan={plan} currency={currency} className="mt-6" />
          <div className="mt-8 flex-1 border-t border-current/25 pt-3 pb-9">
            <PlanLedger plan={plan} />
          </div>
          <Button size="lg" className="w-full" asChild>
            <Link href={plan.cta.href}>
              {plan.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}

/** The conditions that sit under any full list of plans. */
export function PlanFinePrint({ currency }: { currency: Currency }) {
  return (
    <div className="mt-6 grid max-w-5xl gap-x-10 gap-y-3 text-[0.8125rem] leading-relaxed text-muted-foreground md:grid-cols-2">
      <p>
        {currency === "ZAR" ? (
          "All prices in ZAR."
        ) : (
          <>
            All prices in USD; invoices are issued and collected in South
            African rand at the equivalent amount, so the final charge depends
            on your bank&apos;s rate on the day. Dollar prices were set on{" "}
            {USD_REFERENCE.setOn}.
          </>
        )}{" "}
        Every quote states whether VAT applies. Monthly fees are billed monthly
        in advance and can be cancelled at any time — see our{" "}
        <Link href="/refunds" className="underline underline-offset-2">
          Refund &amp; Cancellation Policy
        </Link>
        .
      </p>
      <p>
        * Where a package includes a domain, one standard registration covers
        the first 12 months, subject to availability and registry rules; renewal
        fees apply from the second year. Third-party costs — premium plugins,
        email plans, stock media, payment gateway or CRM fees — are quoted
        before purchase and billed separately.
      </p>
    </div>
  );
}
