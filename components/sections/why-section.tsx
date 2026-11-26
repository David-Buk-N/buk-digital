import { cn } from "@/lib/utils";

const reasons = [
  {
    title: "One dedicated digital partner",
    body: "Manage your branding, website and technology needs through one relationship.",
  },
  {
    title: "Solutions built around your business",
    body: "Recommendations based on your actual requirements, not a one-size-fits-all solution.",
  },
  {
    title: "Focus on what you do best",
    body: "Spend less time managing technology and more time growing your business.",
  },
  {
    title: "Built for growth",
    body: "Digital solutions that can evolve as your company expands.",
  },
  {
    title: "Ongoing support",
    body: "A partnership that continues well beyond the initial launch.",
  },
  {
    title: "Transparent communication",
    body: "Clear expectations, honest recommendations and project scopes in plain language.",
  },
];

/**
 * The benefits of a dedicated digital partner. Paper on the home page, where
 * the dark process band follows it; dark on the services page.
 */
export function WhyBukDigital({ tone = "dark" }: { tone?: "dark" | "paper" }) {
  return (
    <section className={cn(tone === "dark" ? "dark py-16 sm:py-24" : "pb-20 sm:pb-28")}>
      <div className="wrap">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-24">
          <h2 className="display-lg">Why partner with Buk Digital?</h2>
          <p className="lead-text max-w-xl">
            One partner who understands your business, so you can get on with
            running it.
          </p>
        </div>
        <div className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="border-t border-border pt-5 pb-9">
              <h3 className="text-xl font-bold tracking-[-0.015em]">
                {reason.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-muted-foreground">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
