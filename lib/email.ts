import nodemailer from "nodemailer";

/**
 * SMTP email. Configure via environment variables:
 * - SMTP_HOST (default: smtp.gmail.com)
 * - SMTP_PORT (default: 587)
 * - SMTP_USER / SMTP_PASS (for Gmail, use an App Password)
 * - CONTACT_EMAIL (where owner notifications go; defaults to SMTP_USER)
 */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn("[email] SMTP not configured — email not sent.", {
      to: options.to,
      subject: options.subject,
    });
    return false;
  }

  await getTransport().sendMail({
    from: `"Buk Digital" <${process.env.SMTP_USER}>`,
    ...options,
  });
  return true;
}

export function ownerEmail(): string {
  return process.env.CONTACT_EMAIL ?? process.env.SMTP_USER ?? "";
}
