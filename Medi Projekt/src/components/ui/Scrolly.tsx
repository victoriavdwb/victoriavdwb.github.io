"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollSteps } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";
import { cn } from "@/lib/utils";

export type Step = {
  id: string;
  title: string;
  text: string;
  /** Optionaler Pathologie-Titel; ohne ihn bleibt die Normal-Überschrift. */
  titlePe?: string;
  /** Optionaler Pathologie-Text; ohne ihn bleibt der Schritt im Normal-Text. */
  textPe?: string;
  /** Sperrt die Schrittnummer auf Grün (Physiologie) oder Rot (PE), unabhängig vom Modus. */
  tone?: "normal" | "pe";
};

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    const bold = /^\*\*(.+)\*\*$/.exec(part);
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {bold[1]}
        </strong>
      );
    }
    return part;
  });
}

function StepBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  return (
    <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-soft">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInline(paragraph)}</p>
      ))}
    </div>
  );
}

function badgeClass(tone: Step["tone"], active: boolean) {
  if (tone === "normal") {
    return active
      ? "border-normal bg-normal text-white"
      : "border-normal/40 bg-normal-soft text-normal";
  }
  if (tone === "pe") {
    return active
      ? "border-pe bg-pe text-white"
      : "border-pe/40 bg-pe-soft text-pe";
  }
  return active
    ? "border-accent bg-accent text-white"
    : "border-line bg-canvas text-ink-faint";
}

export function Scrolly({
  steps,
  children,
  stageAside,
  stepLabel,
  ofLabel,
}: {
  steps: Step[];
  children: (active: number) => ReactNode;
  stageAside?: ReactNode;
  stepLabel: string;
  ofLabel: string;
}) {
  const { active, setRef } = useScrollSteps(steps.length);
  const { isPe } = useSimulation();

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
      <div className="lg:order-1">
        <div className="sticky top-[112px] z-10 sm:top-20 lg:top-24">
          <div className="card overflow-hidden p-3 sm:p-4">
            <div className="relative">{children(active)}</div>
          </div>
          {stageAside ? <div className="mt-4">{stageAside}</div> : null}
        </div>
      </div>

      <ol className="lg:order-2">
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={setRef(index)}
            data-step-index={index}
            className="flex min-h-[62vh] flex-col justify-center py-6 first:min-h-[46vh] first:pt-0 lg:min-h-[72vh]"
          >
            <motion.div
              animate={{
                opacity: active === index ? 1 : 0.42,
                filter: active === index ? "blur(0px)" : "blur(0.4px)",
              }}
              transition={{ duration: 0.35 }}
              className={cn(
                "rounded-3xl border p-6 transition-colors sm:p-7",
                active === index
                  ? "border-accent-line bg-surface shadow-[var(--shadow-soft)]"
                  : "border-transparent bg-transparent",
              )}
            >
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border text-xs mode-transition",
                    badgeClass(step.tone, active === index),
                  )}
                >
                  {index + 1}
                </span>
                <span>
                  {stepLabel} {index + 1} {ofLabel} {steps.length}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isPe && (step.textPe || step.titlePe) ? `${step.id}-pe` : `${step.id}-normal`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                    {isPe && step.titlePe ? step.titlePe : step.title}
                  </h3>
                  <StepBody text={isPe && step.textPe ? step.textPe : step.text} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}
