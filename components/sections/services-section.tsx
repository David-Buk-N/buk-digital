"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Check,
  Globe,
  Lightbulb,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    node: "Web Apps",
    title: "Custom Web Applications",
    description:
      "Client portals, dashboards, booking systems and internal tools, built around how your business actually works.",
    icon: AppWindow,
    cta: { href: "/book", label: "Book a Session" },
  },
  {
    node: "Software",
    title: "Software Solutions",
    description:
      "Automation and integrations that remove repetitive admin and connect the tools you already use.",
    icon: Workflow,
    cta: { href: "/book", label: "Book a Session" },
  },
  {
    node: "Advisory",
    title: "Consultations",
    description:
      "Strategy sessions, digital audits and solution scoping — a clear roadmap before you spend a rand.",
    icon: Lightbulb,
    cta: { href: "/book", label: "Book a Session" },
  },
  {
    node: "Websites",
    title: "Website Design & Hosting",
    description:
      "Professionally designed business websites with managed hosting, maintenance and ongoing support.",
    icon: Globe,
    cta: { href: "/pricing", label: "View Packages" },
  },
];

const capabilities = [
  "Client portals",
  "Dashboards & reporting",
  "Booking systems",
  "CRM & automation",
  "Business websites",
  "Managed hosting",
];

// Ring geometry. The SVG uses a 520 viewBox with r=200, so the nodes sit at
// 200/520 ≈ 38.46% from the centre of the square container. Positions are
// computed here rather than with CSS cos()/sin() so they render identically
// everywhere, including in the statically prerendered HTML.
const VIEWBOX = 520;
const RADIUS = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const NODE_RADIUS_PCT = (RADIUS / VIEWBOX) * 100;
const STEP_DEG = 360 / services.length;
const AUTO_ADVANCE_MS = 6000;

/** Position of node `i` as percentages, starting at the top, going clockwise. */
function nodePosition(i: number) {
  const radians = ((i * STEP_DEG - 90) * Math.PI) / 180;
  return {
    left: `${50 + NODE_RADIUS_PCT * Math.cos(radians)}%`,
    top: `${50 + NODE_RADIUS_PCT * Math.sin(radians)}%`,
  };
}

/**
 * The ring and the stacked list are both in the DOM, with one hidden per
 * breakpoint, so each variant needs its own ids and its own focus targets.
 */
type Variant = "ring" | "stack";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Reads the OS motion preference as external state, so it stays in sync. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION_QUERY);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false // no preference known while prerendering
  );
}

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const refs = useRef<Record<Variant, Array<HTMLButtonElement | null>>>({
    ring: [],
    stack: [],
  });

  // Cycle on its own, unless the visitor is interacting with the selector or
  // has asked for reduced motion.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % services.length),
      AUTO_ADVANCE_MS
    );
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const selectRelative = useCallback((offset: number, variant: Variant) => {
    setActive((current) => {
      const next = (current + offset + services.length) % services.length;
      refs.current[variant][next]?.focus();
      return next;
    });
  }, []);

  const onKeyDown = (event: React.KeyboardEvent, variant: Variant) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectRelative(1, variant);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectRelative(-1, variant);
    }
  };

  const current = services[active];
  const ActiveIcon = current.icon;

  const renderPill = (index: number, variant: Variant, extra?: string) => {
    const service = services[index];
    const isActive = index === active;
    return (
      <button
        key={service.node}
        ref={(element) => {
          refs.current[variant][index] = element;
        }}
        type="button"
        role="tab"
        id={`service-tab-${variant}-${index}`}
        aria-selected={isActive}
        aria-controls={`service-panel-${variant}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActive(index)}
        onKeyDown={(event) => onKeyDown(event, variant)}
        className={cn(
          "cursor-pointer rounded-full bg-card px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] transition duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isActive
            ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
            : "text-foreground ring-1 ring-border hover:ring-primary",
          extra
        )}
      >
        {service.node}
      </button>
    );
  };

  const renderPanel = (variant: Variant) => (
    <div
      id={`service-panel-${variant}`}
      role="tabpanel"
      aria-labelledby={`service-tab-${variant}-${active}`}
      aria-live="polite"
      className={cn(
        "text-center",
        variant === "ring"
          ? "absolute inset-[20%] grid place-content-center"
          : "mt-6 rounded-xl border border-border bg-card p-6"
      )}
    >
      <ActiveIcon className="mx-auto size-7 text-primary" aria-hidden="true" />
      <p className="mt-3 font-mono text-xs tracking-[0.16em] text-primary">
        {String(active + 1).padStart(2, "0")} /{" "}
        {String(services.length).padStart(2, "0")}
      </p>
      <h3 className="mt-2 text-balance text-xl font-semibold tracking-tight sm:text-2xl">
        {current.title}
      </h3>
      <p className="mx-auto mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
        {current.description}
      </p>
      <Link
        href={current.cta.href}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        {current.cta.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        {/* Editorial column */}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            Services
          </p>
          <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold tracking-tight sm:text-5xl">
            What we build.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Four ways Buk Digital helps your business run smoother, look
            sharper and grow faster.
          </p>

          <ul className="mt-10 grid border-t border-border sm:grid-cols-2 sm:gap-x-8">
            {capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-center gap-3 border-b border-border py-4 text-sm font-medium"
              >
                <Check
                  className="size-5 shrink-0 rounded-full bg-primary/15 p-1 text-primary"
                  aria-hidden="true"
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>

        {/* Radial selector — tablet and up */}
        <div
          className="relative mx-auto hidden aspect-square w-full max-w-[540px] sm:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <svg
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            className="size-full overflow-visible"
            aria-hidden="true"
          >
            <circle
              cx="260"
              cy="260"
              r={RADIUS}
              fill="none"
              className="stroke-border"
              strokeWidth="1.5"
            />
            <circle
              cx="260"
              cy="260"
              r={RADIUS}
              fill="none"
              className="stroke-primary/10"
              strokeWidth="22"
            />
            <circle
              cx="260"
              cy="260"
              r={RADIUS}
              fill="none"
              className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(-90 260 260)"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={
                CIRCUMFERENCE * (1 - (active + 1) / services.length)
              }
            />
            <circle
              cx="260"
              cy="260"
              r="150"
              fill="none"
              className="stroke-border/60"
              strokeDasharray="2 8"
            />
            <g
              className="transition-transform duration-700 ease-out"
              style={{
                transformBox: "view-box",
                transformOrigin: "260px 260px",
                transform: `rotate(${active * STEP_DEG}deg)`,
              }}
            >
              <circle cx="260" cy="60" r="16" className="fill-primary/20" />
              <circle cx="260" cy="60" r="7" className="fill-primary" />
            </g>
          </svg>

          {renderPanel("ring")}

          <div role="tablist" aria-label="Services" className="absolute inset-0">
            {services.map((service, index) => (
              <span
                key={service.node}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={nodePosition(index)}
              >
                {renderPill(index, "ring")}
              </span>
            ))}
          </div>
        </div>

        {/* Stacked selector — phones, where pills on a small ring would collide */}
        <div className="sm:hidden">
          <div
            role="tablist"
            aria-label="Services"
            className="grid grid-cols-2 gap-2"
          >
            {services.map((_, index) => renderPill(index, "stack", "w-full"))}
          </div>
          {renderPanel("stack")}
        </div>
      </div>
    </section>
  );
}
