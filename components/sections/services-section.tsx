import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { serviceCategories, startingMonthly } from "@/lib/services";
import { formatPrice, type Currency } from "@/lib/currency";

const capabilities = [
  "Branding & identity",
  "Logo design",
  "Business websites",
  "Domains & email",
  "CRM & automation",
  "Custom dashboards",
];

export function ServicesSection({ currency }: { currency: Currency }) {
  return (
    <section id="services" className="pt-36 pb-20 sm:pb-28 lg:pt-44">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-24">
        <div>
          <p className="eyebrow text-primary">Services</p>
          <h2 className="display-lg mt-4">What we build.</h2>
          <p className="lead-text mt-6 max-w-xl">
            Three ways Buk Digital helps your business look credible, get found
            and run smoother.
          </p>
          <p className="mt-4 text-[0.9375rem] text-muted-foreground">
            Plans from{" "}
            <span className="font-semibold text-foreground">
              {formatPrice(startingMonthly, currency)}/month
            </span>
            , or quoted for custom work.{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              See pricing
            </Link>
          </p>

          <ul className="hairline-list mt-9 sm:grid-cols-2 sm:gap-x-8">
            {capabilities.map((capability) => (
              <li key={capability}>
                <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        <ol className="border-t-2 border-foreground">
          {serviceCategories.map((service) => (
            <li
              key={service.id}
              className="grid gap-x-8 gap-y-3 border-b border-border py-9 first:lg:pt-10 sm:grid-cols-[5.5rem_minmax(0,1fr)]"
            >
              <span className="text-5xl font-extrabold leading-none tracking-[-0.04em] text-primary tabular-nums sm:text-6xl">
                {service.number}
              </span>
              <div>
                <h3 className="display-md">{service.name}</h3>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  {service.tagline}
                </p>
                <Link
                  href={service.cta.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {service.cta.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
