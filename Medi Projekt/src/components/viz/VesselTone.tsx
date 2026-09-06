"use client";

import { motion } from "framer-motion";
import { useSimulation } from "@/lib/state";
import { useReducedMotion } from "@/lib/hooks";

/** Gefaessquerschnitt: Lumenweite und NO-Verfuegbarkeit haengen am Modus. */
export function VesselTone({ labels }: { labels?: { lumen: string; smc: string; no: string } }) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();
  const lumen = isPe ? 26 : 46;

  const noDots = Array.from({ length: 10 }).map((_, index) => {
    const angle = (index / 10) * Math.PI * 2;
    return { x: 100 + Math.cos(angle) * 58, y: 100 + Math.sin(angle) * 58, delay: index * 0.18 };
  });

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={labels?.lumen}>
      <circle cx="100" cy="100" r="82" fill="var(--canvas)" />
      <motion.circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="var(--accent)"
        className="mode-transition"
        animate={{ strokeWidth: isPe ? 22 : 14, opacity: isPe ? 0.32 : 0.2 }}
        transition={{ duration: 0.6 }}
      />
      <circle cx="100" cy="100" r="56" fill="none" stroke="var(--line)" strokeWidth="6" />
      <motion.circle
        cx="100"
        cy="100"
        r={lumen}
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
        className="mode-transition"
        animate={{ r: lumen }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      />

      {noDots.map((dot, index) => (
        <motion.circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r="3.2"
          fill="var(--normal)"
          animate={
            reduced
              ? { opacity: isPe ? 0.12 : 0.8 }
              : {
                  opacity: isPe ? [0.1, 0.16, 0.1] : [0.35, 0.95, 0.35],
                  scale: isPe ? 0.7 : [0.8, 1.15, 0.8],
                }
          }
          transition={{ duration: 2.4, repeat: Infinity, delay: dot.delay }}
        />
      ))}

      <motion.g animate={{ opacity: isPe ? 1 : 0 }} transition={{ duration: 0.4 }}>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index / 6) * Math.PI * 2 + 0.4;
          return (
            <text
              key={index}
              x={100 + Math.cos(angle) * 40}
              y={100 + Math.sin(angle) * 40}
              textAnchor="middle"
              className="fill-[var(--pe)] text-[10px] font-semibold"
            >
              ROS
            </text>
          );
        })}
      </motion.g>
    </svg>
  );
}
