"use client";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useCanRender3D } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";
import { Section, SectionHeader } from "@/components/ui/primitives";
import { BodyFallback } from "./BodyFallback";
import { SceneBoundary } from "./SceneBoundary";

const BodyScene = dynamic(() => import("./BodyScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-canvas" />,
});

export function BodyStage({ dict }: { dict: Dictionary }) {
  const { body, nav } = dict;
  const can3D = useCanRender3D();
  const { isPe } = useSimulation();

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const fallback = (
    <div className="flex h-full items-center justify-center p-6">
      <BodyFallback onSelect={scrollTo} />
    </div>
  );

  return (
    <Section id="koerper" className="pt-4 md:pt-8">
      <SectionHeader eyebrow={body.eyebrow} title={body.title} lead={body.lead} />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10">
        <div className="card relative overflow-hidden">
          <div
            aria-hidden
            className="surface-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
          />
          <div className="relative h-[440px] sm:h-[540px]">
            {can3D ? (
              <SceneBoundary fallback={fallback}>
                <BodyScene hotspots={body.hotspots} onSelect={scrollTo} />
              </SceneBoundary>
            ) : (
              fallback
            )}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 text-xs text-ink-faint">
            <span>{can3D ? body.rotateHint : body.fallbackNote}</span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-accent mode-transition" />
              {isPe ? nav.modePe : nav.modeNormal}
            </span>
          </div>
        </div>

        <ul className="grid gap-4 self-start">
          {body.hotspots.map((hotspot, index) => (
            <motion.li
              key={hotspot.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <button
                type="button"
                onClick={() => scrollTo(hotspot.id)}
                className="card group w-full p-6 text-left transition-all hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-sm font-semibold text-accent-ink mode-transition">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{hotspot.title}</h3>
                  <span className="ml-auto text-ink-faint transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <AnimatePresence initial={false}>
                  {isPe ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="mt-3 block">{hotspot.text}</span>
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
