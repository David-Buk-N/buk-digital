import { NextRequest, NextResponse } from "next/server";
import {
  createBookingEvent,
  isCalendarConfigured,
} from "@/lib/google-calendar";
import { isEmailConfigured, ownerEmail, sendMail } from "@/lib/email";

const SERVICES = ["Custom Web App", "Software Solution", "Consultation"];
const SESSION_MINUTES = 60;

interface BookingPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  dateTime?: string;
  brief?: string;
}

export async function POST(request: NextRequest) {
  let payload: BookingPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, company = "", service, dateTime, brief } =
    payload;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Full name is required";
  if (!email?.trim() || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = "A valid email address is required";
  if (!phone?.trim()) errors.phone = "Phone number is required";
  if (!service || !SERVICES.includes(service))
    errors.service = "Please choose a service";
  if (!brief?.trim()) errors.brief = "Please tell us a little about your project";

  const start = dateTime ? new Date(dateTime) : null;
  if (!start || isNaN(start.getTime())) {
    errors.dateTime = "Please choose a preferred date and time";
  } else if (start.getTime() < Date.now()) {
    errors.dateTime = "Please choose a date in the future";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const booking = {
    name: name!.trim(),
    email: email!.trim(),
    phone: phone!.trim(),
    company: company.trim(),
    service: service!,
    start: start!,
    end: new Date(start!.getTime() + SESSION_MINUTES * 60 * 1000),
    brief: brief!.trim(),
  };

  // Always log the full booking server-side so nothing is ever lost, even
  // before calendar/email credentials are configured.
  console.log("[booking] New session booking:", JSON.stringify(booking));

  let calendarCreated = false;
  try {
    const result = await createBookingEvent(booking);
    calendarCreated = result.created;
  } catch (err) {
    console.error("[booking] Failed to create calendar event:", err);
  }

  let emailSent = false;
  try {
    const when = booking.start.toLocaleString("en-ZA", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Johannesburg",
    });

    emailSent = await sendMail({
      to: booking.email,
      subject: "Your session with Buk Digital is booked",
      replyTo: ownerEmail() || undefined,
      text: [
        `Hi ${booking.name},`,
        "",
        `Thanks for booking a session with Buk Digital. Here are your details:`,
        "",
        `Service: ${booking.service}`,
        `Preferred date & time: ${when} (SAST)`,
        "",
        "We'll confirm the exact time with you shortly. If you need to change anything,",
        `just reply to this email or WhatsApp us on +27 64 649 5045.`,
        "",
        "Talk soon,",
        "Buk Digital",
      ].join("\n"),
    });

    if (isEmailConfigured() && ownerEmail()) {
      await sendMail({
        to: ownerEmail(),
        subject: `New session booking — ${booking.name} (${booking.service})`,
        replyTo: booking.email,
        text: [
          `Name: ${booking.name}`,
          `Email: ${booking.email}`,
          `Phone: ${booking.phone}`,
          `Company: ${booking.company || "—"}`,
          `Service: ${booking.service}`,
          `Preferred date & time: ${when} (SAST)`,
          "",
          "Project brief:",
          booking.brief,
          "",
          calendarCreated
            ? "A calendar event has been created."
            : "NOTE: Google Calendar is not configured — add this to your calendar manually.",
        ].join("\n"),
      });
    }
  } catch (err) {
    console.error("[booking] Failed to send confirmation email:", err);
  }

  if (!isCalendarConfigured() && !isEmailConfigured()) {
    console.warn(
      "[booking] Neither Google Calendar nor SMTP is configured. " +
        "The booking above is only recorded in the server logs."
    );
  }

  return NextResponse.json({
    success: true,
    message:
      "Your session is booked. Check your inbox for a confirmation email — we'll be in touch shortly.",
    calendarCreated,
    emailSent,
  });
}
