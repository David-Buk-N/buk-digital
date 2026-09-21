import { AlertTriangle } from "lucide-react";
import { LEGAL_LAST_UPDATED, hasUnsetDetails } from "@/lib/legal";

/**
 * Shared shell for the policy pages: heading, effective date, and the prose
 * styling defined by .legal-prose in globals.css.
 *
 * While any business detail in lib/legal.ts is still a placeholder, a notice
 * marks the page as a draft rather than letting incomplete terms read as
 * final. Completing those details removes it.
 */
export function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{summary}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>

        {hasUnsetDetails && (
          <div className="mt-8 flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4">
            <AlertTriangle
              className="h-5 w-5 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <p className="text-sm text-destructive">
              <strong className="font-semibold">Draft — not yet in force.</strong>{" "}
              This document is being prepared and is incomplete. It does not
              currently form part of any agreement. Please contact us for the
              terms that apply to your project.
            </p>
          </div>
        )}

        <article className="legal-prose mt-10">{children}</article>
      </div>
    </div>
  );
}
