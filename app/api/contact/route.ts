import { NextRequest, NextResponse } from "next/server";
import { ownerEmail, sendMail } from "@/lib/email";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, message } = payload;

  const errors: Record<string, string> = {};
  if (!name?.trim()) errors.name = "Name is required";
  if (!email?.trim() || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = "A valid email address is required";
  if (!phone?.trim()) errors.phone = "Phone number is required";
  if (!message?.trim()) errors.message = "Message is required";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  console.log(
    "[contact] New inquiry:",
    JSON.stringify({ name, email, phone, message })
  );

  try {
    if (ownerEmail()) {
      await sendMail({
        to: ownerEmail(),
        subject: `New inquiry from ${name}`,
        replyTo: email,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          "",
          "Message:",
          message!,
        ].join("\n"),
      });
    }
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
  }

  return NextResponse.json({
    success: true,
    message: "Thank you for your inquiry. We will contact you soon.",
  });
}
