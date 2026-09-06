"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useSimulation } from "@/lib/state";
import { Eyebrow } from "@/components/ui/primitives";
import { ModeToggle } from "@/components/layout/ModeToggle";

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, nav } = dict;
  const { isPe } = useSimulation();

  // Das kardiovaskulaere Langzeitrisiko (letzte Kachel) betrifft nur die Praeeklampsie.
  const stats = isPe ? hero.stats : hero.stats.slice(0, -1);

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] bg-[radial-gradient(60%_60%_at_50%_40%,var(--accent-soft),transparent_70%)] opacity-90 mode-transition"
      />
      <div
        aria-hidden
        className="surface-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] [mask-image:radial-gradient(50%_50%_at_50%_30%,black,transparent)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.06] tracking-tight balance sm:text-5xl md:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">{hero.lead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#haemodynamik"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#langzeit"
              className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-ink"
            >
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <ModeToggle
              labels={{ normal: nav.modeNormal, pe: nav.modePe }}
              idSuffix="hero"
            />
            <p className="text-sm text-ink-faint">{hero.hint}</p>
          </div>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className={`mt-14 grid gap-4 ${isPe ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          <AnimatePresence initial={false}>
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="card p-6"
              >
                <dt className="text-3xl font-semibold tracking-tight text-accent mode-transition">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{stat.label}</dd>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.dl>
      </div>
    </section>
  );
}
