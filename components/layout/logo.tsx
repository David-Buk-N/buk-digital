import { cn } from "@/lib/utils";

/** The ring-and-dot mark. Takes its colour from the surrounding text colour. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-7", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}
