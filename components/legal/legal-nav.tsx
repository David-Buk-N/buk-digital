"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { legalPages } from "@/lib/legal";

export interface LegalTocItem {
  id: string;
  number: string;
  title: string;
}

/** Switches between the four policy documents. */
export function LegalTabs() {
  const pathname = usePathname();

  return (
    <nav aria-label="Legal documents" className="border-b border-border">
      {/* Scrolls sideways on a phone, where the four labels cannot share a line. */}
      <ul className="-mb-px flex gap-7 overflow-x-auto">
        {legalPages.map((page) => (
          <li key={page.href} className="shrink-0">
            <Link
              href={page.href}
              aria-current={pathname === page.href ? "page" : undefined}
              className={cn(
                "block border-b-2 py-3.5 text-[0.9375rem] font-medium transition-colors",
                pathname === page.href
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TocLinks({
  items,
  activeId,
  onNavigate,
}: {
  items: LegalTocItem[];
  activeId?: string;
  onNavigate?: () => void;
}) {
  return (
    <ol className="space-y-px">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={item.id === activeId ? "location" : undefined}
            className={cn(
              "grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline border-l-2 py-1.5 pl-3 text-sm leading-snug transition-colors",
              item.id === activeId
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="font-mono text-xs">{item.number}</span>
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/**
 * The clause index: a sticky column that tracks your place on desktop, and a
 * collapsed list above the document on smaller screens.
 */
export function LegalToc({ items }: { items: LegalTocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Fires as a heading crosses a band near the top of the viewport.
      { rootMargin: "-12% 0px -78% 0px" }
    );
    for (const item of items) {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <div className="surface-card !p-0 lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between px-5 py-4 text-[0.9375rem] font-semibold"
        >
          On this page
          <ChevronDown
            className={cn("size-4 transition-transform", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
        {open && (
          <div className="border-t border-border px-2 py-3">
            <TocLinks
              items={items}
              activeId={activeId}
              onNavigate={() => setOpen(false)}
            />
          </div>
        )}
      </div>

      <nav
        aria-label="On this page"
        className="hidden max-h-[calc(100dvh-7.5rem)] overflow-y-auto pr-2 lg:block"
      >
        <p className="eyebrow mb-3 pl-3.5 text-muted-foreground">On this page</p>
        <TocLinks items={items} activeId={activeId} />
      </nav>
    </>
  );
}
