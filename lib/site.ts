export const siteConfig = {
  name: "Buk Digital",
  tagline: "Your digital partner. Built around your business.",
  description:
    "Your dedicated digital partner. Buk Digital provides business branding, web design, managed hosting and custom technology solutions to help businesses establish and grow their digital presence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bukdigital.co.za",
  phone: "+27 64 649 5045",
  phoneHref: "tel:+27646495045",
  email: "bukasa.get@gmail.com",
  emailHref: "mailto:bukasa.get@gmail.com",
  whatsappHref:
    "https://wa.me/27646495045?text=Hi%20Buk%20Digital%2C%20I%27d%20like%20to%20chat%20about%20a%20project.",
  location: "South Africa",
  /**
   * The free consultation, booked through Google Calendar appointment
   * scheduling. The link is public: it carries no credentials and shows only
   * free/busy slots, never the events in the calendar. If the appointment's
   * length changes in Google Calendar, change `minutes` to match.
   */
  consultation: {
    name: "Discovery Consultation",
    minutes: 60,
    bookingUrl:
      "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0x0MM3NgGoggHMHRxLNomvCcKShyTSjI_G-4s8p5xQoWI_rvu_SNzOh39r8iE037p4pa-7GTzX",
    timeZoneNote: "South African time (SAST, GMT+2)",
  },
  /**
   * Social profiles. Each icon is hidden until its URL is filled in, so the
   * footer never shows a link that goes nowhere.
   */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
  },
};
