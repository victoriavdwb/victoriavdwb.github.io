"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

const CX = 210;

/** Linksventrikel im Laengsschnitt: exzentrisches gegen konzentrisches Remodeling. */
const chamber = (halfWidth: number, top: number, apex: number) =>
  `M${CX - halfWidth} ${top} L${CX - halfWidth} ${apex - 90} Q${CX - halfWidth} ${apex} ${CX} ${apex} Q${
    CX + halfWidth
  } ${apex} ${CX + halfWidth} ${apex - 90} L${CX + halfWidth} ${top} Z`;

export function HeartRemodeling({
  step,
  geometry,
}: {
  step: number;
  geometry: Dictionary["ch4"]["geometry"];
}) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();

  const outer = isPe ? 98 : 104;
  const wall = isPe ? 34 : 19;
  const inner = outer - wall;
  const apex = 430;
  const top = 168;
  const atriumRx = isPe ? 74 : 58;

  // Konzentrisch remodellierte Ventrikel bewegen sich in der Systole weniger.
  const ejection = isPe ? 0.9 : 0.78;

  return (
    <svg viewBox="0 0 420 470" className="h-auto w-full" role="img" aria-label={isPe ? geometry.peLabel : geometry.normalLabel}>
      {/* Linker Vorhof – waechst mit dem Fuellungsdruck */}
      <motion.ellipse
        cx={CX}
        cy="104"
        ry="42"
        fill="var(--accent)"
        opacity="0.2"
        className="mode-transition"
        animate={{ rx: atriumRx }}
        transition={{ type: "spring", stiffness: 70, damping: 16 }}
      />
      <motion.text
        y="108"
        textAnchor="middle"
        className="fill-[var(--ink-faint)] text-[12px] font-medium"
        animate={{ x: CX }}
      >
        LA
      </motion.text>

      {/* Rechter Ventrikel als Sichel */}
      <path
        d={`M${CX - outer - 6} ${top + 20} C${CX - outer - 62} ${top + 90}, ${CX - outer - 52} ${
          apex - 90
        }, ${CX - 30} ${apex - 6} L${CX - outer + 6} ${apex - 40} C${CX - outer - 20} ${apex - 120}, ${
          CX - outer - 20
        } ${top + 100}, ${CX - outer + 2} ${top + 26} Z`}
        fill="#cbd5e1"
        opacity="0.5"
      />
      <text x={CX - outer - 40} y={apex - 150} className="fill-[var(--ink-faint)] text-[12px]">
        RV
      </text>

      {/* Myokard */}
      <motion.path
        fill="var(--accent)"
        className="mode-transition"
        initial={false}
        animate={{ d: chamber(outer, top, apex), opacity: isPe ? 0.85 : 0.72 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
      />

      {/* Kavitaet mit Kontraktion */}
      <motion.g
        animate={
          reduced ? { scaleX: 1, scaleY: 1 } : { scaleX: [1, ejection, 1], scaleY: [1, ejection + 0.06, 1] }
        }
        transition={{ duration: isPe ? 1.05 : 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${CX}px ${top + 40}px` }}
      >
        <motion.path
          fill="var(--surface)"
          initial={false}
          animate={{ d: chamber(inner, top + 6, apex - 22) }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
      </motion.g>

      {/* Wanddicke */}
      <motion.g animate={{ opacity: step >= 2 ? 1 : 0.35 }} transition={{ duration: 0.4 }}>
        <motion.line
          y1="300"
          y2="300"
          stroke="var(--ink)"
          strokeWidth="2"
          animate={{ x1: CX + inner, x2: CX + outer }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
        <motion.text
          y="292"
          className="fill-[var(--ink)] text-[11px] font-semibold"
          animate={{ x: CX + outer + 8 }}
        >
          {geometry.wall}
        </motion.text>
        <motion.line
          y1="250"
          y2="250"
          stroke="var(--ink-faint)"
          strokeWidth="2"
          strokeDasharray="4 4"
          animate={{ x1: CX - inner, x2: CX + inner }}
          transition={{ type: "spring", stiffness: 70, damping: 18 }}
        />
        <text x={CX} y="242" textAnchor="middle" className="fill-[var(--ink-faint)] text-[11px]">
          {geometry.cavity}
        </text>
      </motion.g>

      {/* Nachlast-Pfeile bei erhoehter arterieller Elastance */}
      <motion.g animate={{ opacity: isPe && step >= 1 ? 1 : 0 }} transition={{ duration: 0.4 }}>
        {[0, 1, 2].map((index) => (
          <motion.path
            key={index}
            d={`M${CX + 130 + index * 22} ${196 + index * 14} l-22 0 m0 0 l7 -6 m-7 6 l7 6`}
            stroke="var(--pe)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
        <text x={CX + 108} y="176" className="fill-[var(--pe)] text-[12px] font-semibold">
          {geometry.afterload}
        </text>
      </motion.g>

      <text x="16" y="452" className="fill-[var(--ink-soft)] text-[12px] font-medium">
        {isPe ? geometry.peLabel : geometry.normalLabel}
      </text>
    </svg>
  );
}
