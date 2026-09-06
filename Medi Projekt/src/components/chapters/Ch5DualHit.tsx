"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { ChapterSources } from "@/components/ui/ChapterSources";
import { cn } from "@/lib/utils";

const MAX_FACTOR = 4.6;

export function Ch5DualHit({ dict }: { dict: Dictionary }) {
  const { ch5 } = dict;

  return (
    <Section id={ch5.id}>
      <SectionHeader eyebrow={ch5.eyebrow} title={ch5.title} lead={ch5.lead} />

      {/* Zeitstrahl */}
      <div className="relative mt-14">
        <div className="absolute left-4 top-4 hidden h-px w-[calc(100%-2rem)] bg-line md:block" />
        <ol className="grid gap-6 md:grid-cols-4">
          {ch5.timeline.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              <span
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full border-2 bg-surface text-xs font-semibold",
                  index === ch5.timeline.length - 1
                    ? "border-pe text-pe"
                    : "border-accent text-accent-ink mode-transition",
                )}
              >
                {index + 1}
              </span>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {entry.label}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{entry.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Die zwei Saeulen */}
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {ch5.pillars.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "card relative overflow-hidden p-7",
              index === 0 ? "border-normal/30" : "border-pe/30",
            )}
          >
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-1",
                index === 0 ? "bg-normal" : "bg-pe",
              )}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              {pillar.label}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight balance">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pillar.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium",
                    index === 0 ? "bg-normal-soft text-normal" : "bg-pe-soft text-pe",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Zusammenfuehrung */}
      <div className="relative mt-4 flex justify-center" aria-hidden>
        <svg viewBox="0 0 240 60" className="h-14 w-60">
          <path
            d="M20 4 C20 34 110 26 118 52"
            fill="none"
            stroke="var(--line)"
            strokeWidth="2"
          />
          <path
            d="M220 4 C220 34 130 26 122 52"
            fill="none"
            stroke="var(--line)"
            strokeWidth="2"
          />
          <path d="M120 58 l-6 -9 h12 z" fill="var(--ink-faint)" />
        </svg>
      </div>

      {/* Risiko */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="card p-7 md:p-9"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">{ch5.risks.title}</h3>
          <p className="text-xs text-ink-faint">{ch5.risks.caption}</p>
        </div>

        <ul className="mt-7 grid gap-5">
          {ch5.risks.items.map((risk, index) => (
            <li key={risk.label} className="grid gap-2">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">{risk.label}</span>
                <span className="font-semibold tabular-nums text-pe">{risk.factor.toFixed(1)}×</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-canvas">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(risk.factor / MAX_FACTOR) * 100}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-warn to-pe"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-line bg-canvas p-6">
          <h4 className="text-base font-semibold tracking-tight">{ch5.outro.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{ch5.outro.text}</p>
        </div>
      </motion.div>

      <ChapterSources dict={dict} ids={ch5.sources} />
    </Section>
  );
}
