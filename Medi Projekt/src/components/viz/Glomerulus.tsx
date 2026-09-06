"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

/** Glomerulaere Endotheliose: geschwollene Endothelzellen, Verlust der Filtrationsbarriere. */
export function Glomerulus({ caption }: { caption: string }) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 200 200" className="h-24 w-24 shrink-0" role="img" aria-label={caption}>
        <circle cx="100" cy="100" r="82" fill="var(--canvas)" stroke="var(--line)" strokeWidth="3" />
        {[0, 1, 2].map((index) => {
          const angle = (index / 3) * Math.PI * 2;
          const cx = 100 + Math.cos(angle) * 26;
          const cy = 100 + Math.sin(angle) * 26;
          return (
            <g key={index}>
              <circle cx={cx} cy={cy} r="30" fill="none" stroke="var(--accent)" strokeWidth="9" opacity="0.5" />
              <motion.circle
                cx={cx}
                cy={cy}
                r="30"
                fill="none"
                stroke="#a5b4fc"
                animate={{ strokeWidth: isPe ? 15 : 5, opacity: isPe ? 0.95 : 0.4 }}
                transition={{ duration: 0.6 }}
              />
            </g>
          );
        })}
        {Array.from({ length: 5 }).map((_, index) => {
          const angle = (index / 5) * Math.PI * 2 + 0.6;
          return (
            <motion.circle
              key={index}
              r="6"
              fill="#f59e0b"
              initial={false}
              animate={
                reduced
                  ? {
                      cx: 100 + Math.cos(angle) * 96,
                      cy: 100 + Math.sin(angle) * 96,
                      opacity: isPe ? 1 : 0,
                    }
                  : {
                      cx: [100 + Math.cos(angle) * 30, 100 + Math.cos(angle) * 104],
                      cy: [100 + Math.sin(angle) * 30, 100 + Math.sin(angle) * 104],
                      opacity: isPe ? [0, 1, 0] : 0,
                    }
              }
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.35 }}
            />
          );
        })}
      </svg>
      <p className="text-xs leading-relaxed text-ink-faint">{caption}</p>
    </div>
  );
}
