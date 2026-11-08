"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/layout/logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background print:hidden">
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LogoMark className="text-primary" />
          <span className="text-lg font-bold tracking-[-0.02em]">Buk Digital</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.9375rem] font-medium underline-offset-[6px] transition-colors hover:text-primary hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="/book">Book a Session</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border pb-5 md:hidden">
          <div className="wrap flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border py-3.5 font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button size="lg" className="mt-4 w-full" asChild>
              <Link href="/book" onClick={() => setOpen(false)}>
                Book a Session
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
