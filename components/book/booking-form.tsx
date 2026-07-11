"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarCheck, CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = ["Custom Web App", "Software Solution", "Consultation"];

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  dateTime?: string;
  brief?: string;
  submit?: string;
}

export function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("");
  const [brief, setBrief] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (!phone.trim()) next.phone = "Please enter your phone number.";
    if (!service) next.service = "Please choose a service.";
    if (!date || !time)
      next.dateTime = "Please choose a preferred date and time.";
    if (!brief.trim())
      next.brief = "Please tell us a little about your project.";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = new Date(date!);
    dateTime.setHours(hours, minutes, 0, 0);

    setSubmitting(true);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service,
          dateTime: dateTime.toISOString(),
          brief,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(
          data.errors ?? {
            submit: data.error ?? "Something went wrong. Please try again.",
          }
        );
        return;
      }

      setSuccessMessage(data.message);
      setSubmitted(true);
    } catch {
      setErrors({
        submit:
          "We couldn't reach the server. Please try again, or WhatsApp us on +27 64 649 5045.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-primary"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-2xl font-semibold">Session booked!</h2>
        <p className="mt-2 text-muted-foreground">{successMessage}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {date && time && (
            <>
              {format(date, "EEEE, d MMMM yyyy")} at {time} (SAST) —{" "}
              {service}
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.co.za"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+27 60 123 4567"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your business name (optional)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service of interest *</Label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger id="service" aria-invalid={Boolean(errors.service)}>
            <SelectValue placeholder="Choose a service" />
          </SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-sm text-destructive">{errors.service}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Preferred date &amp; time *</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                aria-invalid={Boolean(errors.dateTime)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                {date ? format(date, "EEE, d MMM yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(day) =>
                  day < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  day.getDay() === 0
                }
              />
            </PopoverContent>
          </Popover>

          <Select value={time} onValueChange={setTime}>
            <SelectTrigger aria-label="Preferred time">
              <SelectValue placeholder="Pick a time (SAST)" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {errors.dateTime && (
          <p className="text-sm text-destructive">{errors.dateTime}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="brief">Project brief *</Label>
        <Textarea
          id="brief"
          rows={5}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Tell us about your business, what you'd like to build, and any deadlines or budget in mind."
          aria-invalid={Boolean(errors.brief)}
        />
        {errors.brief && (
          <p className="text-sm text-destructive">{errors.brief}</p>
        )}
      </div>

      {errors.submit && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {errors.submit}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full gap-3" disabled={submitting}>
        {submitting ? (
          <>
            Booking your session…{" "}
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
            Book a Session <CalendarCheck className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        By submitting this form you consent to Buk Digital processing your
        details to respond to your booking, in line with POPIA. We never share
        your information.
      </p>
    </form>
  );
}
