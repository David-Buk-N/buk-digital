"use client";

import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { FloatingPaths } from "@/components/kokonutui/background-paths";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <FloatingPaths position={1} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Ready to build something that grows your business?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Book a free session and let&apos;s scope the right solution — no
          jargon, no obligation.
        </p>
        <div className="mt-8">
          <Button size="lg" className="gap-3" asChild>
            <Link href="/book">
              Book a Session <CalendarCheck className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
