"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import type { SeriesKey } from "@/lib/hemodynamics";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { MAX_WEEK, useSimulation } from "@/lib/state";
import { Section, SectionHeader, Pill } from "@/components/ui/primitives";
import { ChapterSources } from "@/components/ui/ChapterSources";
import { Scrolly } from "@/components/ui/Scrolly";
import { TrendChart } from "@/components/viz/TrendChart";
import { VesselTone } from "@/components/viz/VesselTone";

const EMPHASIS: SeriesKey[][] = [
  ["plasma", "co"],
  ["svr"],
  ["map"],
  ["svr", "map"],
];

export function Ch1Hemodynamics({ dict }: { dict: Dictionary }) {
  const { ch1, common } = dict;
  const { week, setWeek, isPe } = useSimulation();
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const started = useRef(false);
  const weekRef = useRef(week);
  weekRef.current = week;

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (reduced) {
      setWeek(MAX_WEEK);
      return;
    }
    setWeek(0);
    setPlaying(true);
  }, [inView, reduced, setWeek]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setWeek(Math.min(MAX_WEEK, weekRef.current + delta * 9));
      if (weekRef.current >= MAX_WEEK) {
        setPlaying(false);
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, setWeek]);

  return (
    <Section id={ch1.id}>
      <div ref={ref}>
        <SectionHeader eyebrow={ch1.eyebrow} title={ch1.title} lead={ch1.lead} />
      </div>

      <Scrolly steps={ch1.steps} stepLabel={common.stepOf} ofLabel={common.of} stageAside={
        <div className="card flex flex-wrap items-center gap-4 p-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs uppercase tracking-wide text-ink-faint">
              {ch1.chart.weekLabel}
            </span>
            <span className="text-2xl font-semibold tabular-nums">{Math.round(week)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={MAX_WEEK}
            step={0.5}
            value={week}
            aria-label={ch1.chart.xLabel}
            onChange={(event) => {
              setPlaying(false);
              setWeek(Number(event.target.value));
            }}
            className="h-1.5 min-w-[160px] flex-1 cursor-pointer appearance-none rounded-full bg-line accent-[var(--accent)]"
            style={{
              background: `linear-gradient(to right, var(--accent) ${(week / MAX_WEEK) * 100}%, var(--line) ${
                (week / MAX_WEEK) * 100
              }%)`,
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (week >= MAX_WEEK) setWeek(0);
              setPlaying((value) => !value);
            }}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold transition-colors hover:border-accent hover:text-accent-ink"
          >
            {playing ? ch1.chart.pauseLabel : ch1.chart.playLabel}
          </button>
        </div>
      }>
        {(active) => (
          <div>
            <div className="flex items-center justify-between px-2 pb-1">
              <h3 className="text-sm font-semibold text-ink-soft">{ch1.chart.title}</h3>
              <Pill tone={isPe ? "pe" : "normal"}>{isPe ? common.pe : common.normal}</Pill>
            </div>
            <TrendChart
              week={week}
              emphasis={EMPHASIS[Math.min(active, EMPHASIS.length - 1)]}
              labels={ch1.chart}
            />
          </div>
        )}
      </Scrolly>

      <div className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="card flex flex-col items-center justify-center gap-3 p-6">
          <div className="w-full max-w-[220px]">
            <VesselTone />
          </div>
          <p className="text-center text-xs text-ink-faint">
            {isPe ? dict.ch3.labels.pe : dict.ch3.labels.normal}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="card p-6">
            <h3 className="text-lg font-semibold tracking-tight">{ch1.mediators.title}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {ch1.mediators.items.map((item) => (
                <li
                  key={item.abbr}
                  className={`rounded-2xl border p-4 transition-opacity ${
                    isPe ? "border-line opacity-55" : "border-normal/30 bg-normal-soft/40"
                  }`}
                >
                  <span className="text-sm font-semibold text-ink">{item.abbr}</span>
                  <span className="mt-0.5 block text-xs font-medium text-ink-soft">{item.name}</span>
                  <p className="mt-2 text-xs leading-relaxed text-ink-faint">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            key={isPe ? "pe" : "normal"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`rounded-3xl border bg-surface p-6 shadow-[var(--shadow-soft)] ${
              isPe ? "border-pe/40" : "border-normal/40"
            }`}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
              {common.keyPoint}
            </span>
            <h4 className="mt-2 text-lg font-semibold tracking-tight">{ch1.callout.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {isPe ? ch1.callout.pe : ch1.callout.normal}
            </p>
          </motion.div>
        </div>
      </div>

      <ChapterSources dict={dict} ids={ch1.sources} />
    </Section>
  );
}
