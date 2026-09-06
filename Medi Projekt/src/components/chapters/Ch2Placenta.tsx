"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Scrolly } from "@/components/ui/Scrolly";
import { PlacentaScene } from "@/components/viz/PlacentaScene";
import { AntiAngiogenic } from "@/components/viz/AntiAngiogenic";
import { RatioGauge } from "@/components/viz/RatioGauge";
import { Term } from "@/components/ui/Term";
import { ChapterSources } from "@/components/ui/ChapterSources";

export function Ch2Placenta({ dict }: { dict: Dictionary }) {
  const { ch2, common, glossary } = dict;

  return (
    <Section id={ch2.id} className="bg-surface">
      <SectionHeader eyebrow={ch2.eyebrow} title={ch2.title} lead={ch2.lead} />

      <Scrolly
        steps={ch2.steps}
        stepLabel={common.stepOf}
        ofLabel={common.of}
        stageAside={
          <RatioGauge
            title={ch2.gauge.title}
            caption={ch2.gauge.caption}
            normalLabel={ch2.gauge.normalLabel}
            peLabel={ch2.gauge.peLabel}
            clinical={ch2.gauge.clinical}
          />
        }
      >
        {(active) => (
          <AnimatePresence mode="wait" initial={false}>
            {active >= 3 ? (
              <motion.div
                key="molecular"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AntiAngiogenic legend={ch2.legend} />
              </motion.div>
            ) : (
              <motion.div
                key="placenta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PlacentaScene step={active} legend={ch2.legend} labels={ch2.labels} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Scrolly>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="mt-16 overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-ink text-white"
      >
        <div className="grid gap-8 p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:p-12">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              {ch2.analogy.eyebrow}
            </span>
            <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight balance md:text-3xl">
              {ch2.analogy.title}
            </h3>
          </div>
          <div>
            <p className="text-base leading-relaxed text-white/80">{ch2.analogy.text}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
              {ch2.analogy.tags.map((item) => (
                <span key={item} className="rounded-full border border-white/20 px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-canvas px-5 py-4 text-sm text-ink-soft">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {common.keyPoint}
        </span>
        <Term {...glossary.sflt} />
        <Term {...glossary.seng} />
        <Term {...glossary.vegf} />
        <Term {...glossary.plgf} />
      </div>

      <ChapterSources dict={dict} ids={ch2.sources} />
    </Section>
  );
}
