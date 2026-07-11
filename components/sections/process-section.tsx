"use client";

import { Search, Hammer, Rocket, LifeBuoy } from "lucide-react";
import RadialOrbitalTimeline, {
  TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const processData: TimelineItem[] = [
  {
    id: 1,
    title: "Discover",
    date: "Step 1",
    content:
      "We unpack your goals, workflows and pain points in a discovery session, then scope a solution that fits your budget.",
    category: "Discover",
    icon: Search,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Build",
    date: "Step 2",
    content:
      "We design and develop in short iterations, sharing progress as we go — no black-box development.",
    category: "Build",
    icon: Hammer,
    relatedIds: [1, 3],
    status: "completed",
    energy: 85,
  },
  {
    id: 3,
    title: "Launch",
    date: "Step 3",
    content:
      "We deploy, test on real devices, connect your domain and hand over everything you need to go live with confidence.",
    category: "Launch",
    icon: Rocket,
    relatedIds: [2, 4],
    status: "completed",
    energy: 70,
  },
  {
    id: 4,
    title: "Support",
    date: "Step 4",
    content:
      "Managed hosting, maintenance and improvements keep your solution fast, secure and up to date long after launch.",
    category: "Support",
    icon: LifeBuoy,
    relatedIds: [3],
    status: "completed",
    energy: 90,
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            How we work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple, transparent process from first conversation to long-term
            support.
          </p>
        </div>

        {/* Desktop: radial orbital timeline */}
        <div className="mt-6 hidden md:block">
          <RadialOrbitalTimeline timelineData={processData} />
        </div>

        {/* Mobile: simple vertical stepper */}
        <ol className="mx-auto mt-12 max-w-md space-y-0 md:hidden">
          {processData.map((step, index) => (
            <li key={step.id} className="relative flex gap-4 pb-10 last:pb-0">
              {index < processData.length - 1 && (
                <span
                  className="absolute left-5 top-10 h-full w-px bg-border"
                  aria-hidden="true"
                />
              )}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {step.date}
                </p>
                <h3 className="mt-1 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.content}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
