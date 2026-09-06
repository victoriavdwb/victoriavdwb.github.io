"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

/**
 * Statische Koerperansicht fuer Mobile und prefers-reduced-motion.
 * Bewusst schematisch: Silhouette, Herz, grosse Gefaesse, Uterus mit Plazenta.
 */
export function BodyFallback({ onSelect }: { onSelect?: (id: string) => void }) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();
  const tint = "var(--accent)";
  const vesselWidth = isPe ? 3.4 : 5.4;

  return (
    <svg
      viewBox="0 0 240 480"
      className="h-full w-full"
      role="img"
      aria-label="Schematische Körperansicht mit Herz, Gefäßsystem und Uterus"
    >
      <defs>
        <linearGradient id="bodyFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="organGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={tint} stopOpacity="0.35" />
          <stop offset="100%" stopColor={tint} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="mode-transition" stroke="var(--accent-line)" strokeWidth="1.5">
        <circle cx="120" cy="46" r="28" fill="url(#bodyFill)" />
        <path d="M112 72 h16 v22 h-16 z" fill="url(#bodyFill)" stroke="none" />
        <path
          d="M100 92 C76 98 64 116 62 146 C60 176 64 200 70 222 C74 238 76 246 76 252 L164 252 C164 246 166 238 170 222 C176 200 180 176 178 146 C176 116 164 98 140 92 Z"
          fill="url(#bodyFill)"
        />
        <rect x="70" y="244" width="100" height="62" rx="28" fill="url(#bodyFill)" />
        <g fill="none" strokeLinecap="round" strokeWidth="22" stroke="var(--accent-soft)">
          <path d="M70 116 C50 150 46 186 50 244" />
          <path d="M170 116 C190 150 194 186 190 244" />
          <path d="M99 300 C95 360 96 410 97 450" strokeWidth="28" />
          <path d="M141 300 C145 360 144 410 143 450" strokeWidth="28" />
        </g>
      </g>

      {/* Grosse Gefaesse */}
      <g
        className="mode-transition"
        fill="none"
        stroke={tint}
        strokeWidth={vesselWidth}
        strokeLinecap="round"
        opacity="0.9"
      >
        <path d="M126 168 C124 196 121 214 119 240" />
        <path d="M119 240 C112 258 104 276 100 300" />
        <path d="M119 240 C128 258 136 276 140 300" />
        <path d="M124 124 C122 108 122 100 122 88" />
        <path d="M112 122 C100 116 86 118 74 126" />
        <path d="M140 122 C152 116 166 118 178 126" />
        <path d="M74 126 C56 156 52 190 56 240" strokeWidth={vesselWidth * 0.72} />
        <path d="M178 126 C196 156 200 190 196 240" strokeWidth={vesselWidth * 0.72} />
        <path d="M100 300 C97 356 98 404 99 442" strokeWidth={vesselWidth * 0.8} />
        <path d="M140 300 C143 356 142 404 141 442" strokeWidth={vesselWidth * 0.8} />
      </g>

      {/* Herz */}
      <g>
        <circle cx="132" cy="146" r="42" fill="url(#organGlow)" />
        <motion.g
          animate={reduced ? undefined : { scale: [1, isPe ? 1.03 : 1.06, 1] }}
          transition={{ duration: isPe ? 0.9 : 1.05, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "132px 146px" }}
        >
          <path
            d="M132 170 C112 154 106 142 108 132 C110 122 122 118 128 126 C130 129 131 131 132 134 C133 131 134 129 136 126 C142 118 154 122 156 132 C158 142 152 154 132 170 Z"
            fill={tint}
            className="mode-transition"
            opacity="0.92"
          />
        </motion.g>
      </g>

      {/* Uterus mit Plazenta und Embryo */}
      <g>
        <circle cx="120" cy="272" r="38" fill="url(#organGlow)" />
        <path
          d="M100 252 C94 262 94 280 104 290 C112 298 128 298 136 290 C146 280 146 262 140 252 C132 246 108 246 100 252 Z"
          fill={tint}
          opacity="0.22"
          stroke={tint}
          strokeWidth="1.6"
          className="mode-transition"
        />
        <path
          d="M101 254 C110 248 130 248 139 254 C134 260 106 260 101 254 Z"
          fill={tint}
          opacity={isPe ? 0.85 : 0.6}
          className="mode-transition"
        />
        <circle cx="120" cy="278" r="8" fill="#ffffff" opacity="0.92" />
        <path
          d="M120 270 C126 272 127 280 122 284"
          fill="none"
          stroke={tint}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>

      {onSelect ? (
        <g>
          <FallbackHotspot x={132} y={146} onSelect={() => onSelect("herz")} label="Herz" />
          <FallbackHotspot x={190} y={200} onSelect={() => onSelect("endothel")} label="Gefäße" />
          <FallbackHotspot x={120} y={272} onSelect={() => onSelect("plazenta")} label="Plazenta" />
        </g>
      ) : null}
    </svg>
  );
}

function FallbackHotspot({
  x,
  y,
  onSelect,
  label,
}: {
  x: number;
  y: number;
  onSelect: () => void;
  label: string;
}) {
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className="cursor-pointer"
    >
      <circle cx={x} cy={y} r="13" fill="var(--accent)" opacity="0.14" />
      <circle cx={x} cy={y} r="7" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={x} cy={y} r="2.5" fill="var(--accent)" />
    </g>
  );
}
