import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="wrap flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow text-primary">404</p>
      <h1 className="display-xl mt-4">Page not found</h1>
      <p className="lead-text mt-5 max-w-lg">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <Link href="/">Back to home</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
