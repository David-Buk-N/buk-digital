import type { Metadata } from "next";
import { BookingForm } from "@/components/book/booking-form";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a free session with Buk Digital — scope your branding, website or custom software project. We'll confirm by email.",
};

export default function BookPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div>
          <h1 className="display-lg">Book a session</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your project and pick a time that suits you. Sessions
            are free, roughly an hour, and completely obligation-free.
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
