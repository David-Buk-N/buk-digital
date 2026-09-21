import { Search, Hammer, Rocket, LifeBuoy } from "lucide-react";

// A linear timeline, deliberately: the services section above owns the one
// radial diagram on this page, so repeating a circle here would read as the
// same device twice.
const steps = [
  {
    step: "Step 1",
    title: "Discover",
    content:
      "We unpack your goals, workflows and pain points in a discovery session, then scope a solution that fits your budget.",
    icon: Search,
  },
  {
    step: "Step 2",
    title: "Build",
    content:
      "We design and develop in short iterations, sharing progress as we go — no black-box development.",
    icon: Hammer,
  },
  {
    step: "Step 3",
    title: "Launch",
    content:
      "We deploy, test on real devices, connect your domain and hand over everything you need to go live with confidence.",
    icon: Rocket,
  },
  {
    step: "Step 4",
    title: "Support",
    content:
      "Managed hosting, maintenance and improvements keep your solution fast, secure and up to date long after launch.",
    icon: LifeBuoy,
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            How we work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple, transparent process from first conversation to long-term
            support.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
          {/* The rail that connects the steps: horizontal on desktop, vertical
              down the icon column on smaller screens. */}
          <span
            className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-border sm:block md:left-0 md:top-6 md:h-px md:w-full"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5 md:block">
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-card text-primary">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="md:mt-6">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {step.step}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.content}
                </p>
              </div>
              {/* Vertical rail for phones, where the shared rail is hidden. */}
              {index < steps.length - 1 && (
                <span
                  className="absolute left-6 top-12 h-[calc(100%+1.5rem)] w-px bg-border sm:hidden"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
