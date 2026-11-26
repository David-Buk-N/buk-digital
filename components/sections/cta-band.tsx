import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="marigold py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h2 className="display-xl">
          Ready to build something that{" "}
          <span className="underline decoration-[0.08em] underline-offset-[0.12em]">
            grows
          </span>{" "}
          your business?
        </h2>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Book a free consultation and we&apos;ll help you find the right
            solution — no jargon, no pressure, no obligation.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">
              Book a Free Consultation <CalendarCheck className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** The services page's closing band. */
export function ServicesCta() {
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
              <Link href="/book">
                Book a Free Consultation
                <CalendarCheck className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-foreground/10" asChild>
              <Link href="/contact">
                Talk to Our Team <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
