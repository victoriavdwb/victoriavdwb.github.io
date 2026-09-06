"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

const VESSELS = [150, 340, 530];

const upperPath = (x: number) => `M${x} 252 C ${x - 18} 274, ${x + 18} 300, ${x} 330`;
const lowerPath = (x: number) =>
  `M${x} 330 C ${x - 22} 356, ${x + 22} 388, ${x - 6} 414 C ${x - 14} 428, ${x - 6} 438, ${x} 448`;

/**
 * Uteroplazentare Einheit im Laengsschnitt.
 * step 0 Invasion und Umbau · 1 Hypoxie · 2 Freisetzung von sFlt-1/sEng
 */
export function PlacentaScene({
  step,
  legend,
  labels,
}: {
  step: number;
  legend: Dictionary["ch2"]["legend"];
  labels: Dictionary["ch2"]["labels"];
}) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();

  const lumenUpper = isPe ? 9 : 20;
  const lumenLower = isPe ? 6 : 15;
  const mouth = isPe ? 16 : 52;
  const invasionDepth = isPe ? 2 : 5;

  return (
    <svg
      viewBox="0 0 680 470"
      className="h-auto w-full"
      role="img"
      aria-label={`${legend.spiral} – ${isPe ? labels.peVessel : labels.normalVessel}`}
    >
      <defs>
        <linearGradient id="placenta-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.07" />
        </linearGradient>
        <radialGradient id="hypoxia" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1e293b" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Intervilloeser Raum */}
      <rect x="36" y="52" width="608" height="200" rx="26" fill="url(#placenta-fill)" />
      <rect x="36" y="40" width="608" height="20" rx="10" fill="var(--accent)" opacity="0.35" />
      <text x="52" y="34" className="fill-[var(--ink-faint)] text-[12px] font-medium">
        {legend.villi}
      </text>

      {/* Zotten */}
      {[110, 215, 330, 445, 560].map((x, index) => (
        <g key={x} opacity={0.72}>
          <path
            d={`M${x} 60 C ${x - 6} 100, ${x + 8} 140, ${x} 186`}
            stroke="var(--accent)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          {[0, 1, 2].map((branch) => {
            const y = 96 + branch * 40;
            const dir = branch % 2 === 0 ? -1 : 1;
            return (
              <g key={branch}>
                <path
                  d={`M${x} ${y} q ${dir * 22} 8 ${dir * 30} 26`}
                  stroke="var(--accent)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <circle
                  cx={x + dir * 32}
                  cy={y + 28}
                  r="9"
                  fill="var(--accent)"
                  opacity={index % 2 === 0 ? 0.32 : 0.24}
                />
              </g>
            );
          })}
          <circle cx={x} cy="188" r="11" fill="var(--accent)" opacity="0.3" />
        </g>
      ))}

      {/* Hypoxie-Overlay */}
      <motion.rect
        x="36"
        y="52"
        width="608"
        height="200"
        rx="26"
        fill="url(#hypoxia)"
        animate={{ opacity: isPe && step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />
      <motion.g animate={{ opacity: isPe && step >= 1 ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <text x="330" y="120" textAnchor="middle" className="fill-white text-[15px] font-semibold">
          {legend.hypoxia}
        </text>
        {[150, 260, 400, 510].map((x, index) => (
          <motion.text
            key={x}
            x={x}
            y={160 + (index % 2) * 26}
            textAnchor="middle"
            className="fill-[#fca5a5] text-[11px] font-bold"
            animate={reduced ? undefined : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.3 }}
          >
            ROS
          </motion.text>
        ))}
      </motion.g>

      {/* Decidua und Myometrium */}
      <rect x="36" y="252" width="608" height="62" fill="#eef3f7" />
      <rect x="36" y="314" width="608" height="132" rx="0" fill="#e6edf3" />
      {[330, 356, 382, 408, 434].map((y) => (
        <line key={y} x1="36" x2="644" y1={y} y2={y} stroke="#d3dee7" strokeWidth="2" />
      ))}
      <text x="52" y="272" className="fill-[var(--ink-faint)] text-[12px] font-medium">
        {legend.decidua}
      </text>
      <text x="52" y="336" className="fill-[var(--ink-faint)] text-[12px] font-medium">
        {legend.myometrium}
      </text>

      {/* Spiralarterien */}
      {VESSELS.map((x, vesselIndex) => (
        <g key={x}>
          <motion.path
            d={`M${x - mouth / 2} 252 L${x - lumenUpper / 2} 268 L${x + lumenUpper / 2} 268 L${
              x + mouth / 2
            } 252 Z`}
            fill="var(--accent)"
            opacity="0.5"
            animate={{ opacity: 0.5 }}
            className="mode-transition"
          />

          {/* Muskelmantel: bleibt bei PE im myometrialen Segment erhalten */}
          <path
            d={lowerPath(x)}
            stroke="#c4b5fd"
            strokeWidth={lumenLower + (isPe ? 20 : 6)}
            fill="none"
            strokeLinecap="round"
            opacity={isPe ? 0.85 : 0.22}
            className="mode-transition"
            style={{ transition: "stroke-width 600ms cubic-bezier(0.22,1,0.36,1)" }}
          />
          <path
            d={upperPath(x)}
            stroke="#c4b5fd"
            strokeWidth={lumenUpper + 6}
            fill="none"
            strokeLinecap="round"
            opacity={isPe ? 0.5 : 0.14}
            className="mode-transition"
          />

          <path
            d={lowerPath(x)}
            stroke="var(--accent)"
            strokeWidth={lumenLower}
            fill="none"
            strokeLinecap="round"
            className="mode-transition"
            style={{ transition: "stroke-width 600ms cubic-bezier(0.22,1,0.36,1)" }}
          />
          <path
            d={upperPath(x)}
            stroke="var(--accent)"
            strokeWidth={lumenUpper}
            fill="none"
            strokeLinecap="round"
            className="mode-transition"
            style={{ transition: "stroke-width 600ms cubic-bezier(0.22,1,0.36,1)" }}
          />

          {/* Trophoblasteninvasion von oben nach unten */}
          {Array.from({ length: 5 }).map((_, index) => {
            const t = index / 4;
            const cy = 262 + t * 168;
            const cx = x + Math.sin(t * Math.PI * 1.6) * 12;
            const visible = step >= 0 && index < invasionDepth;
            return (
              <motion.g
                key={index}
                initial={false}
                animate={{ opacity: visible ? 1 : 0.12, scale: visible ? 1 : 0.7 }}
                transition={{ duration: 0.45, delay: visible ? index * 0.14 : 0 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r="7.5" fill="#f8fafc" stroke="var(--accent-ink)" strokeWidth="2" />
                <circle cx={cx} cy={cy} r="2.6" fill="var(--accent-ink)" />
              </motion.g>
            );
          })}

          {/* Perfusion in den intervilloesen Raum */}
          {!reduced &&
            Array.from({ length: 4 }).map((_, index) => (
              <motion.circle
                key={`flow-${index}`}
                r={isPe ? 4 : 5.5}
                fill="var(--accent)"
                opacity={0.75}
                initial={{ cx: x, cy: 250 }}
                animate={{
                  cx: [x, x + (index - 1.5) * (isPe ? 26 : 46)],
                  cy: [250, isPe ? 92 : 150],
                  opacity: [0.9, 0],
                }}
                transition={{
                  duration: isPe ? 0.85 : 1.9,
                  repeat: Infinity,
                  delay: (index * (isPe ? 0.5 : 0.42) + vesselIndex * 0.22) % 2,
                  ease: isPe ? "easeOut" : "linear",
                }}
              />
            ))}
        </g>
      ))}

      {/* Abgabe von sFlt-1 und sEng in den muetterlichen Kreislauf */}
      <motion.g animate={{ opacity: step >= 2 ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <rect x="600" y="40" width="44" height="212" rx="20" fill="#dbe7ee" opacity="0.9" />
        <text
          x="622"
          y="30"
          textAnchor="middle"
          className="fill-[var(--ink-faint)] text-[11px] font-medium"
        >
          {legend.sflt}
        </text>
        {Array.from({ length: 7 }).map((_, index) => (
          <motion.rect
            key={index}
            x={608 + (index % 3) * 11}
            width="9"
            height="9"
            rx="2"
            fill={isPe ? "var(--pe)" : "var(--normal)"}
            animate={
              reduced
                ? { y: 120, opacity: isPe ? 0.9 : 0.3 }
                : { y: [240, 40], opacity: isPe ? [0, 1, 1, 0] : [0, 0.35, 0.35, 0] }
            }
            transition={{ duration: isPe ? 2.2 : 3.6, repeat: Infinity, delay: index * 0.35 }}
          />
        ))}
      </motion.g>

      {/* Beschriftung des Zustands */}
      <text x="36" y="464" className="fill-[var(--ink-soft)] text-[12px] font-medium">
        {isPe ? labels.peVessel : labels.normalVessel} · {isPe ? labels.peFlow : labels.normalFlow}
      </text>
    </svg>
  );
}
