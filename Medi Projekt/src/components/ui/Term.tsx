"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Term({ term, text, label }: { term: string; text: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
        className="cursor-help border-b border-dashed border-ink-faint font-medium text-ink decoration-dotted underline-offset-4 transition-colors hover:border-accent hover:text-accent-ink"
      >
        {label ?? term}
      </button>
      <AnimatePresence>
        {open ? (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-xl border border-line bg-surface p-3 text-left text-xs font-normal leading-relaxed text-ink-soft shadow-[var(--shadow-lift)]"
          >
            <strong className="block text-ink">{term}</strong>
            {text}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
