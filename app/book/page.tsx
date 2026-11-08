import type { Metadata } from "next";
import { BookingForm } from "@/components/book/booking-form";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Book a free session with Buk Digital — scope your branding, website or custom software project. We'll confirm by email.",
};

export default function BookPage() {
  return (
    <div className="wrap grid gap-10 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
      <div>
        <h1 className="display-xl">Book a session</h1>
        <p className="lead-text mt-6 max-w-lg">
          Tell us about your project and pick a time that suits you. Sessions
          are free, roughly an hour, and completely obligation-free.
        </p>
      </div>

      <div className="surface-card">
        <BookingForm />
      </div>
    </div>
  );
}
