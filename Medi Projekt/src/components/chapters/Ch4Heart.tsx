"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useSimulation } from "@/lib/state";
import { Section, SectionHeader, Pill } from "@/components/ui/primitives";
import { Scrolly } from "@/components/ui/Scrolly";
import { HeartRemodeling } from "@/components/viz/HeartRemodeling";
import { PVLoop } from "@/components/viz/PVLoop";
import { EchoPanel } from "@/components/viz/EchoPanel";
import { Term } from "@/components/ui/Term";
import { ChapterSources } from "@/components/ui/ChapterSources";

export function Ch4Heart({ dict }: { dict: Dictionary }) {
  const { ch4, common, glossary } = dict;
  const { isPe } = useSimulation();

  return (
    <Section id={ch4.id} className="bg-surface">
      <SectionHeader eyebrow={ch4.eyebrow} title={ch4.title} lead={ch4.lead} />

      <Scrolly
        steps={ch4.steps}
        stepLabel={common.stepOf}
        ofLabel={common.of}
        stageAside={
          <div className="card p-4">
            <div className="flex items-center gap-2">
              <Pill tone={isPe ? "pe" : "normal"}>
                {isPe ? ch4.geometry.peLabel : ch4.geometry.normalLabel}
              </Pill>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
              {isPe ? ch4.geometry.peCaption : ch4.geometry.normalCaption}
            </p>
          </div>
        }
      >
        {(active) => (
          <AnimatePresence mode="wait" initial={false}>
            {active <= 2 ? (
              <motion.div
                key="heart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-[420px]"
              >
                <HeartRemodeling step={active} geometry={ch4.geometry} />
              </motion.div>
            ) : active === 3 ? (
              <motion.div
                key="pvloop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-2 pb-1 text-sm font-semibold text-ink-soft">{ch4.pvloop.title}</div>
                <PVLoop labels={ch4.pvloop} />
              </motion.div>
            ) : (
              <motion.div
                key="echo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-1"
              >
                <EchoPanel echo={ch4.echo} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </Scrolly>

      <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="card p-6">
          <h3 className="text-lg font-semibold tracking-tight">{ch4.pvloop.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{ch4.pvloop.caption}</p>
          <div className="mt-4">
            <PVLoop labels={ch4.pvloop} />
          </div>
        </div>
        <motion.div
          key={isPe ? "pe" : "normal"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`h-fit self-start rounded-2xl border bg-surface p-4 shadow-[var(--shadow-soft)] ${
            isPe ? "border-pe/40" : "border-normal/40"
          }`}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
            {common.keyPoint}
          </span>
          <h4 className="mt-1.5 text-sm font-semibold tracking-tight">
            {isPe ? ch4.pvloop.explain.peTitle : ch4.pvloop.explain.normalTitle}
          </h4>
          <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-ink-soft">
            {isPe ? ch4.pvloop.explain.pe : ch4.pvloop.explain.normal}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-canvas px-5 py-4 text-sm text-ink-soft">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {common.keyPoint}
        </span>
        <Term {...glossary.gls} />
        <Term {...glossary.ee} />
        <Term {...glossary.lavi} />
        <Term {...glossary.ees} />
        <Term {...glossary.ea} />
        <Term {...glossary.hfpef} />
      </div>

      <ChapterSources dict={dict} ids={ch4.sources} />
    </Section>
  );
}
