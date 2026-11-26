import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceBlocks, ServiceFinePrint } from "@/components/sections/service-blocks";
import { WhyBukDigital } from "@/components/sections/why-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ServicesCta } from "@/components/sections/cta-band";
import { detectCurrency } from "@/lib/currency-server";
import { formatPrice } from "@/lib/currency";
import { siteConfig } from "@/lib/site";
import { startingMonthly } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

// Renders per request for currency, so the description quotes the same
// currency the visitor sees rather than advertising dollars to a South
// African searcher.
export async function generateMetadata(): Promise<Metadata> {
  const currency = await detectCurrency();
  const monthly = formatPrice(startingMonthly, currency);

  return pageMetadata({
    title: "Services",
    description: `Company branding and setup, web design and hosting from ${monthly}/month, and custom technology solutions quoted to your needs. Book a free consultation with Buk Digital.`,
    path: "/services",
  });
}

export default async function ServicesPage() {
  const currency = await detectCurrency();

  return (
    <>
      <section className="wrap grid gap-8 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h1 className="display-xl">
          Your digital partner. Built around your{" "}
          <span className="text-primary">business</span>.
        </h1>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From establishing your brand to building your digital presence and
            developing custom technology solutions, Buk Digital helps your
            business navigate the digital world with confidence. We work
            alongside you to understand your goals and deliver solutions that
            support your growth.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" asChild>
              <Link href="/book">
                Book a Free Consultation
                <CalendarCheck className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Free, {siteConfig.consultation.minutes} minutes, no obligation.
            </p>
          </div>
        </div>
      </section>

      <ServiceBlocks currency={currency} />
      <ServiceFinePrint currency={currency} />

      <div className="mt-16">
        <WhyBukDigital />
      </div>

      <FaqSection currency={currency} />

      <ServicesCta />
    </>
  );
}
