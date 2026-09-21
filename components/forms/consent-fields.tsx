"use client";

import Link from "next/link";

/**
 * Consent block shared by the booking and contact forms.
 *
 * POPIA section 69 treats direct marketing as a separate purpose from the
 * enquiry itself, so the marketing checkbox is optional and starts unticked.
 * Submitting an enquiry is never conditional on accepting marketing.
 */
export function ConsentFields({
  marketingOptIn,
  onMarketingChange,
  action,
}: {
  marketingOptIn: boolean;
  onMarketingChange: (value: boolean) => void;
  /** Completes the sentence "By …, you acknowledge…", e.g. "sending this message". */
  action: string;
}) {
  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => onMarketingChange(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-border accent-primary"
        />
        <span className="text-sm text-muted-foreground">
          I&apos;d like to receive occasional updates and offers from Buk
          Digital. (Optional — you can unsubscribe at any time.)
        </span>
      </label>

      <p className="text-sm text-muted-foreground">
        By {action}, you acknowledge that you have read our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
