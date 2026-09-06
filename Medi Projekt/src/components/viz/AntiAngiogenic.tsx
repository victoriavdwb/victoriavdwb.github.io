"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

const VEGF_COLOR = "#0d9488";
const SFLT_COLOR = "#e11d48";

/** Maternale Zirkulation: sFlt-1 faengt VEGF/PlGF ab, bevor sie den Rezeptor erreichen. */
export function AntiAngiogenic({ legend }: { legend: Dictionary["ch2"]["legend"] }) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();

  const capture = 360;

  return (
    <svg viewBox="0 0 680 470" className="h-auto w-full" role="img" aria-label={legend.sflt}>
      <defs>
        <linearGradient id="blood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#e8eef4" />
        </linearGradient>
      </defs>

      {/* Plazenta als Quelle */}
      <rect x="24" y="90" width="86" height="290" rx="26" fill="var(--accent)" opacity="0.18" />
      <text x="67" y="72" textAnchor="middle" className="fill-[var(--ink-soft)] text-[12px] font-semibold">
        {legend.placenta}
      </text>

      {/* Blutstrom */}
      <rect x="110" y="120" width="470" height="230" rx="34" fill="url(#blood)" />
      <text x="345" y="106" textAnchor="middle" className="fill-[var(--ink-faint)] text-[12px]">
        {legend.maternal}
      </text>

      {/* Endothel mit VEGF-Rezeptor 2 */}
      <rect x="580" y="120" width="76" height="230" rx="26" fill="#dbe7ee" />
      <text x="618" y="106" textAnchor="middle" className="fill-[var(--ink-soft)] text-[12px] font-semibold">
        {legend.endothelium}
      </text>
      {[168, 235, 302].map((y, index) => (
        <g key={y}>
          <path
            d={`M580 ${y} l-16 -13 M580 ${y} l-16 13 M580 ${y} h16`}
            stroke="#64748b"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <motion.circle
            cx="558"
            cy={y}
            r="9"
            fill={VEGF_COLOR}
            animate={
              reduced
                ? { opacity: isPe ? 0 : 1 }
                : { opacity: isPe ? 0 : [0, 1, 1, 0], scale: isPe ? 0.6 : [0.7, 1, 1, 0.7] }
            }
            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.7 }}
          />
        </g>
      ))}
      <motion.text
        x="618"
        y="380"
        textAnchor="middle"
        className="text-[13px] font-bold"
        animate={{ fill: isPe ? "#94a3b8" : VEGF_COLOR }}
      >
        eNOS {isPe ? "↓" : "↑"}
      </motion.text>

      {/* VEGF / PlGF */}
      {Array.from({ length: 6 }).map((_, index) => {
        const y = 158 + (index % 3) * 62;
        const target = isPe ? capture : 548;
        return (
          <motion.g key={`vegf-${index}`}>
            <motion.circle
              r="11"
              fill={VEGF_COLOR}
              cy={y}
              animate={
                reduced
                  ? { cx: isPe ? capture : 540, opacity: 0.9 }
                  : { cx: [130, target], opacity: [0, 1, 1, isPe ? 0 : 0.2] }
              }
              transition={{
                duration: isPe ? 2.6 : 4,
                repeat: Infinity,
                delay: index * 0.55,
                ease: "linear",
              }}
            />
          </motion.g>
        );
      })}

      {/* sFlt-1 / sEng als Faenger */}
      {Array.from({ length: 5 }).map((_, index) => {
        const y = 146 + (index % 3) * 62 + (index > 2 ? 26 : 0);
        return (
          <motion.g
            key={`sflt-${index}`}
            animate={
              reduced
                ? { opacity: isPe ? 1 : 0.25 }
                : { opacity: isPe ? [0, 1, 1] : [0, 0.28, 0.28] }
            }
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
          >
            <motion.path
              d="M0 -15 A15 15 0 1 0 0 15 L0 6 A6 6 0 1 1 0 -6 Z"
              fill={SFLT_COLOR}
              animate={
                reduced
                  ? { x: isPe ? capture + 20 : 300, y }
                  : { x: [isPe ? 520 : 470, capture + 18], y }
              }
              transition={{ duration: isPe ? 2.6 : 4, repeat: Infinity, delay: index * 0.5 }}
            />
          </motion.g>
        );
      })}

      <motion.g animate={{ opacity: isPe ? 1 : 0 }} transition={{ duration: 0.4 }}>
        <line
          x1={capture + 44}
          x2={capture + 44}
          y1="130"
          y2="340"
          stroke={SFLT_COLOR}
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.6"
        />
        <text
          x={capture + 54}
          y="150"
          className="fill-[var(--pe)] text-[12px] font-semibold"
        >
          {legend.capture}
        </text>
      </motion.g>

      <g>
        <circle cx="150" cy="424" r="9" fill={VEGF_COLOR} />
        <text x="168" y="429" className="fill-[var(--ink-soft)] text-[12px]">
          {legend.vegf}
        </text>
        <path
          d="M330 424 m0 -13 A13 13 0 1 0 330 437 L330 429 A5 5 0 1 1 330 419 Z"
          fill={SFLT_COLOR}
        />
        <text x="352" y="429" className="fill-[var(--ink-soft)] text-[12px]">
          {legend.sflt}
        </text>
      </g>
    </svg>
  );
}
