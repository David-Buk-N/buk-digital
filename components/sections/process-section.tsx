const steps = [
  {
    step: "Step 1",
    title: "Discover",
    content:
      "We unpack your goals, workflows and pain points in a discovery session, then scope a solution that fits your budget.",
  },
  {
    step: "Step 2",
    title: "Build",
    content:
      "We design and develop in short iterations, sharing progress as we go — no black-box development.",
  },
  {
    step: "Step 3",
    title: "Launch",
    content:
      "We deploy, test on real devices, connect your domain and hand over everything you need to go live with confidence.",
  },
  {
    step: "Step 4",
    title: "Support",
    content:
      "Managed hosting, maintenance and improvements keep your solution fast, secure and up to date long after launch.",
  },
];

export function ProcessSection() {
  return (
    <section className="dark py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow text-highlight">Process</p>
            <h2 className="display-lg mt-4">How we work</h2>
          </div>
          <p className="lead-text max-w-xl">
            A simple, transparent process from first conversation to long-term
            support.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.title} className="border-t border-border pt-5 pb-10 lg:pb-0">
              <p className="eyebrow text-highlight">{step.step}</p>
              <h3 className="mt-8 text-3xl font-bold tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.content}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
