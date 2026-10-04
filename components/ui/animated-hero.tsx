"use client";

import { useEffect, useMemo, useState } from "react";

import { motion } from "motion/react";

import { CalendarCheck, MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["brands", "websites", "web apps", "software"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start gap-8 py-20 lg:py-28">
          <div className="flex gap-4 flex-col">
            <h1 className="display-xl max-w-4xl">
              <span>Buk Digital builds custom</span>
              {/* The rotating word is masked by overflow-hidden, so this line needs a
              line box taller than the glyphs — the display scale's 1.05 leading
              clips their ascenders and descenders. */}
            <span className="relative flex w-full justify-start overflow-hidden leading-[1.3] pb-1 md:pb-2">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span>for growing businesses.</span>
            </h1>

            <p className="lead-text max-w-2xl">
              From client portals and booking systems to professionally
              designed business websites — we build the technology South
              African SMEs need to grow, without the enterprise price tag.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="gap-4" asChild>
              <Link href="/book">
                Book a Session <CalendarCheck className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4" variant="outline" asChild>
              <Link href="/pricing">
                View Pricing <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
