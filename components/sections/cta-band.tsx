import Link from "next/link";
import { CalendarCheck } from "lucide-react";
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
            Book a free session and let&apos;s scope the right solution — no
            jargon, no obligation.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/book">
              Book a Session <CalendarCheck className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
