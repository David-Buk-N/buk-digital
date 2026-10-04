import { cn } from "@/lib/utils";

/**
 * Decorative product mockup for the hero: a browser window with an abstract
 * site inside it and a phone overlapping the corner. Drawn with the site's own
 * tokens rather than an image, so it stays crisp, follows the theme and costs
 * nothing to load.
 *
 * Deliberately abstract — bars and blocks, never invented numbers, metrics or
 * client names. It suggests the kind of thing we build without pretending to be
 * a particular project.
 */

/** A line of placeholder text. */
function Bar({ className }: { className?: string }) {
  return <div className={cn("h-1.5 rounded-full bg-muted-foreground/25", className)} />;
}

export function HeroMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden="true">
      {/* Glow behind the window, tying it into the hero's aurora. */}
      <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />

      {/* Browser window */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <div className="ml-2 flex h-5 flex-1 items-center rounded-full bg-background px-3">
            <span className="font-mono text-[9px] text-muted-foreground">
              bukdigital.co.za
            </span>
          </div>
        </div>

        {/* Abstract page inside */}
        <div className="space-y-4 p-5">
          {/* Site nav */}
          <div className="flex items-center gap-3">
            <span className="size-3 rounded-full border-2 border-primary" />
            <Bar className="w-10" />
            <Bar className="w-8" />
            <Bar className="w-9" />
            <div className="ml-auto h-4 w-16 rounded-full bg-primary/80" />
          </div>

          {/* Page hero */}
          <div className="space-y-2 pt-2">
            <div className="h-3 w-4/5 rounded-full bg-foreground/70" />
            <div className="h-3 w-2/5 rounded-full bg-primary/70" />
            <Bar className="mt-3 w-3/4" />
            <Bar className="w-2/3" />
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((card) => (
              <div
                key={card}
                className="space-y-2 rounded-lg border border-border bg-background/60 p-2.5"
              >
                <span className="block size-3 rounded-md bg-primary/50" />
                <Bar className="w-full" />
                <Bar className="w-3/4" />
              </div>
            ))}
          </div>

          {/* A dashboard strip: bars only, no figures to misread */}
          <div className="flex items-end gap-1.5 rounded-lg border border-border bg-background/60 p-3">
            {[40, 65, 50, 80, 60, 95, 72].map((height, index) => (
              <div
                key={index}
                style={{ height: `${height * 0.32}px` }}
                className={cn(
                  "flex-1 rounded-sm",
                  index === 5 ? "bg-primary" : "bg-primary/25"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phone, overlapping the window's corner */}
      {/* Below lg the mockup spans the full container, so a negative left
          offset escapes it and gets cut by the hero's overflow-hidden. Sit it
          inside the window there, and let it overlap only once there is room. */}
      <div className="absolute -bottom-6 left-3 w-28 overflow-hidden rounded-[20px] border border-border bg-card p-2 sm:w-32 lg:-bottom-8 lg:-left-8">
        <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-muted-foreground/30" />
        <div className="space-y-1.5 rounded-xl bg-background/60 p-2">
          <div className="h-2 w-3/4 rounded-full bg-foreground/60" />
          <div className="h-2 w-1/2 rounded-full bg-primary/70" />
          <Bar className="w-full" />
          <Bar className="w-5/6" />
          <div className="mt-2 h-3 w-14 rounded-full bg-primary/80" />
          <div className="grid grid-cols-2 gap-1 pt-1">
            <div className="h-6 rounded-md border border-border bg-card" />
            <div className="h-6 rounded-md border border-border bg-card" />
          </div>
        </div>
      </div>
    </div>
  );
}
