import { google } from "googleapis";

export interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  start: Date;
  end: Date;
  brief: string;
}

/**
 * Creates the booking event on Google Calendar.
 *
 * Two auth modes — configure ONE of them via environment variables:
 *
 * 1. Service account (recommended, no user interaction):
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL: the service account's client_email
 *    - GOOGLE_PRIVATE_KEY: the service account's private_key
 *      (paste as-is; literal \n sequences are handled)
 *    - GOOGLE_CALENDAR_ID: the calendar to book into. Share your Google
 *      Calendar with the service account email (with "Make changes to
 *      events" permission) and use your calendar's ID here.
 *
 * 2. OAuth2 (books directly on your own calendar as you):
 *    - GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET
 *    - GOOGLE_OAUTH_REFRESH_TOKEN
 *    - GOOGLE_CALENDAR_ID (optional, defaults to "primary")
 */
export function isCalendarConfigured(): boolean {
  return Boolean(
    (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY) ||
      (process.env.GOOGLE_OAUTH_CLIENT_ID &&
        process.env.GOOGLE_OAUTH_CLIENT_SECRET &&
        process.env.GOOGLE_OAUTH_REFRESH_TOKEN)
  );
}

function getAuth() {
  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_OAUTH_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET,
    GOOGLE_OAUTH_REFRESH_TOKEN,
  } = process.env;

  if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY) {
    return new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
  }

  if (
    GOOGLE_OAUTH_CLIENT_ID &&
    GOOGLE_OAUTH_CLIENT_SECRET &&
    GOOGLE_OAUTH_REFRESH_TOKEN
  ) {
    const oauth2 = new google.auth.OAuth2(
      GOOGLE_OAUTH_CLIENT_ID,
      GOOGLE_OAUTH_CLIENT_SECRET
    );
    oauth2.setCredentials({ refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN });
    return oauth2;
  }

  return null;
}

export async function createBookingEvent(
  booking: BookingDetails
): Promise<{ created: boolean; eventLink?: string }> {
  const auth = getAuth();
  if (!auth) {
    console.warn(
      "[booking] Google Calendar credentials not configured — event not created."
    );
    return { created: false };
  }

  const calendar = google.calendar({ version: "v3", auth });
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  // All client details live in the description so each booking is
  // self-contained.
  const description = [
    "New session booking via bukdigital website",
    "",
    `Name: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Company: ${booking.company || "—"}`,
    `Service: ${booking.service}`,
    "",
    "Project brief:",
    booking.brief,
  ].join("\n");

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Buk Digital session — ${booking.name} (${booking.service})`,
      description,
      start: {
        dateTime: booking.start.toISOString(),
        timeZone: "Africa/Johannesburg",
      },
      end: {
        dateTime: booking.end.toISOString(),
        timeZone: "Africa/Johannesburg",
      },
    },
  });

  return { created: true, eventLink: res.data.htmlLink ?? undefined };
}
