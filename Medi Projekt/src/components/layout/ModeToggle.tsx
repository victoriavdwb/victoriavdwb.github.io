"use client";

import { motion } from "framer-motion";
import { useSimulation, type Mode } from "@/lib/state";
import { cn } from "@/lib/utils";

export function ModeToggle({
  labels,
  size = "md",
  idSuffix = "header",
}: {
  labels: { normal: string; pe: string };
  size?: "sm" | "md";
  idSuffix?: string;
}) {
  const { mode, setMode } = useSimulation();

  const options: Array<{ value: Mode; label: string; dot: string }> = [
    { value: "normal", label: labels.normal, dot: "bg-normal" },
    { value: "preeclampsia", label: labels.pe, dot: "bg-pe" },
  ];

  return (
    <div
      role="radiogroup"
      className={cn(
        "relative flex items-center rounded-full border border-line bg-canvas p-1",
        size === "sm" ? "text-xs" : "text-sm",
      )}
    >
      {options.map((option) => {
        const selected = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setMode(option.value)}
            className={cn(
              "relative z-10 flex items-center gap-2 rounded-full font-medium transition-colors",
              size === "sm" ? "px-3 py-1.5" : "px-4 py-2",
              selected ? "text-ink" : "text-ink-faint hover:text-ink-soft",
            )}
          >
            {selected ? (
              <motion.span
                layoutId={`mode-pill-${idSuffix}`}
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                className="absolute inset-0 -z-10 rounded-full bg-surface shadow-[0_1px_2px_rgb(11_18_32/0.08),0_8px_18px_-10px_rgb(11_18_32/0.35)]"
              />
            ) : null}
            <span className={cn("size-2 rounded-full", option.dot, !selected && "opacity-40")} />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
