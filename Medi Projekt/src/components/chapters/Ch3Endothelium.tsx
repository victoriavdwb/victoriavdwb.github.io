"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useSimulation } from "@/lib/state";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { Scrolly } from "@/components/ui/Scrolly";
import { EndotheliumScene, type EndoFocus } from "@/components/viz/EndotheliumScene";
import { Glomerulus } from "@/components/viz/Glomerulus";
import { Term } from "@/components/ui/Term";
import { ChapterSources } from "@/components/ui/ChapterSources";

export function Ch3Endothelium({ dict }: { dict: Dictionary }) {
  const { ch3, common, glossary } = dict;
  const { isPe } = useSimulation();
  const [focus, setFocus] = useState<EndoFocus>("afterload");

  const selected = ch3.consequences.find((item) => item.id === focus) ?? ch3.consequences[0];

  return (
    <Section id={ch3.id}>
      <SectionHeader eyebrow={ch3.eyebrow} title={ch3.title} lead={ch3.lead} />

      <Scrolly
        steps={ch3.steps}
        stepLabel={common.stepOf}
        ofLabel={common.of}
        stageAside={
          <div className="card p-4">
            <div className="flex flex-wrap gap-2">
              {ch3.consequences.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={focus === item.id}
                  onClick={() => setFocus(item.id as EndoFocus)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    focus === item.id
                      ? "border-accent bg-accent-soft text-accent-ink"
                      : "border-line text-ink-soft hover:border-accent-line",
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {selected.metric}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{selected.text}</p>
              {selected.id === "permeability" ? (
                <div className="mt-3 border-t border-line pt-3">
                  <Glomerulus caption={dict.ch3.consequences[1].metric} />
                </div>
              ) : null}
            </motion.div>
          </div>
        }
      >
        {(active) => (
          <EndotheliumScene
            step={active}
            focus={active >= 3 ? focus : null}
            legend={ch3.legend}
            labels={ch3.labels}
          />
        )}
      </Scrolly>

      <ul className="mt-16 grid gap-4 md:grid-cols-3">
        {ch3.consequences.map((item, index) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            className={cn(
              "card p-6 transition-colors",
              isPe ? "border-pe/25" : "border-line",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <span className="rounded-full bg-canvas px-2.5 py-1 text-[11px] font-semibold text-ink-faint">
                {item.metric}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
          </motion.li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-canvas px-5 py-4 text-sm text-ink-soft">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
          {common.keyPoint}
        </span>
        <Term {...glossary.enos} />
        <Term {...glossary.svr} />
        <Term {...glossary.vegf} />
      </div>

      <ChapterSources dict={dict} ids={ch3.sources} />
    </Section>
  );
}
