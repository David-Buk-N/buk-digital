"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="wrap flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow text-primary">500</p>
      <h1 className="display-xl mt-4">Something went wrong</h1>
      <p className="lead-text mt-5 max-w-lg">
        An unexpected error occurred. Please try again — or reach us on
        WhatsApp if it keeps happening.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={reset}>Try again</Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
