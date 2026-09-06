"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />

        <ul className="divide-y divide-line border-y border-line">
          {faq.items.map((item, index) => {
            const expanded = open === index;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full items-start gap-4 py-5 text-left"
                >
                  <span className="flex-1 text-base font-medium leading-snug text-ink">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-sm transition-all",
                      expanded
                        ? "rotate-45 border-accent bg-accent text-white"
                        : "border-line text-ink-faint",
                    )}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
