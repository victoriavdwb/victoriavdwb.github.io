"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useSimulation } from "@/lib/state";
import { cn } from "@/lib/utils";

/** Relative Auslenkung der Marker – nur zur Veranschaulichung, keine Normwerte. */
const DEVIATION: Record<string, { normal: number; pe: number }> = {
  gls: { normal: 0.2, pe: 0.78 },
  ee: { normal: 0.18, pe: 0.72 },
  lavi: { normal: 0.24, pe: 0.68 },
  lvef: { normal: 0.12, pe: 0.26 },
};

export function EchoPanel({ echo }: { echo: Dictionary["ch4"]["echo"] }) {
  const { isPe } = useSimulation();

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between px-1">
        <h3 className="text-sm font-semibold text-ink-soft">{echo.title}</h3>
        <span className="text-xs text-ink-faint">
          {isPe ? echo.peCol : echo.normalCol}
        </span>
      </div>

      <ul className="mt-3 grid gap-2.5">
        {echo.items.map((item) => {
          const deviation = DEVIATION[item.key] ?? { normal: 0.2, pe: 0.6 };
          const width = (isPe ? deviation.pe : deviation.normal) * 100;
          return (
            <li key={item.key} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-base font-semibold tracking-tight">{item.label}</span>
                <span className="text-xs text-ink-faint">{item.full}</span>
                <motion.span
                  key={isPe ? "pe" : "normal"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "ml-auto rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums",
                    isPe ? "bg-pe-soft text-pe" : "bg-normal-soft text-normal",
                  )}
                >
                  {isPe ? item.pe : item.normal}
                </motion.span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-canvas">
                <motion.div
                  animate={{ width: `${width}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  className={cn("h-full rounded-full", isPe ? "bg-pe" : "bg-normal")}
                />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-faint">
                {isPe ? item.hintPe : item.hint}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
