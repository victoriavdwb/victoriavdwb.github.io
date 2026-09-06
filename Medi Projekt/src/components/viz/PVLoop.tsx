"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useSimulation } from "@/lib/state";

const W = 560;
const H = 400;
const PAD = { top: 24, right: 24, bottom: 46, left: 54 };
const V_MAX = 180;
const P_MAX = 190;
const V0 = 0;

// Klinischer Schwellenwert fuer "near uncoupling" nach Li et al., Int J Cardiovasc Imaging 2024.
const COUPLING_CUTOFF = 0.8;

const EES_COLOR = "#0ea5e9";
const EA_COLOR = "#f97316";

const px = (volume: number) => PAD.left + (volume / V_MAX) * (W - PAD.left - PAD.right);
const py = (pressure: number) =>
  H - PAD.bottom - (pressure / P_MAX) * (H - PAD.top - PAD.bottom);

type LoopParams = { edv: number; esv: number; edp: number; dbp: number; esp: number };

// EF konsistent zur Echo-Tabelle: normal 62 % (88/142), Praeeklampsie 55 % (71/128).
// Praeeklampsie-Werte so gewaehlt, dass Ea/Ees = 0,8 ("near uncoupling", Li et al. 2024).
const PARAMS: Record<"normal" | "preeclampsia", LoopParams> = {
  normal: { edv: 142, esv: 54, edp: 8, dbp: 68, esp: 108 },
  preeclampsia: { edv: 128, esv: 57, edp: 19, dbp: 96, esp: 155 },
};

const loopPath = ({ edv, esv, edp, dbp, esp }: LoopParams) =>
  [
    `M${px(edv)} ${py(edp)}`,
    `L${px(edv)} ${py(dbp)}`,
    `C${px(edv - 12)} ${py(dbp + (esp - dbp) * 0.75)}, ${px(esv + 26)} ${py(esp)}, ${px(esv)} ${py(esp)}`,
    `L${px(esv)} ${py(edp + 4)}`,
    `C${px(esv + 24)} ${py(edp - 2)}, ${px(edv - 30)} ${py(edp - 2)}, ${px(edv)} ${py(edp)}`,
    "Z",
  ].join(" ");

const edpvrPath = (edv: number, edp: number) => {
  const points: string[] = [];
  for (let volume = V0; volume <= V_MAX; volume += 10) {
    const pressure = edp * Math.exp((volume - edv) * 0.028);
    points.push(`${volume === V0 ? "M" : "L"}${px(volume)} ${py(Math.min(pressure, P_MAX))}`);
  }
  return points.join(" ");
};

export function PVLoop({ labels }: { labels: Dictionary["ch4"]["pvloop"] }) {
  const { isPe, mode } = useSimulation();
  const params = PARAMS[mode];
  const other = PARAMS[isPe ? "normal" : "preeclampsia"];

  const ees = params.esp / (params.esv - V0);
  const ea = params.esp / (params.edv - params.esv);
  const coupling = ea / ees;

  const spring = { type: "spring" as const, stiffness: 60, damping: 18 };

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={labels.title}>
        {[0, 50, 100, 150].map((pressure) => (
          <g key={pressure}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={py(pressure)}
              y2={py(pressure)}
              stroke="var(--line)"
            />
            <text
              x={PAD.left - 10}
              y={py(pressure) + 4}
              textAnchor="end"
              className="fill-[var(--ink-faint)] text-[11px] tabular-nums"
            >
              {pressure}
            </text>
          </g>
        ))}
        {[0, 60, 120, 180].map((volume) => (
          <text
            key={volume}
            x={px(volume)}
            y={H - PAD.bottom + 18}
            textAnchor="middle"
            className="fill-[var(--ink-faint)] text-[11px] tabular-nums"
          >
            {volume}
          </text>
        ))}
        <text
          x={(W + PAD.left) / 2}
          y={H - 8}
          textAnchor="middle"
          className="fill-[var(--ink-soft)] text-[11px]"
        >
          {labels.volume}
        </text>
        <text
          x={16}
          y={PAD.top + 6}
          className="fill-[var(--ink-soft)] text-[11px]"
        >
          {labels.pressure}
        </text>

        {/* Vergleichsschleife des anderen Zustands */}
        <path d={loopPath(other)} fill="none" stroke="var(--ink-faint)" strokeWidth="1.4" strokeDasharray="5 5" opacity="0.5" />

        {/* Enddiastolische Druck-Volumen-Beziehung */}
        <motion.path
          initial={false}
          animate={{ d: edpvrPath(params.edv, params.edp) }}
          transition={spring}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.8"
        />

        {/* Ees */}
        <motion.line
          initial={false}
          animate={{ x1: px(V0), y1: py(0), x2: px(params.esv), y2: py(params.esp) }}
          transition={spring}
          stroke={EES_COLOR}
          strokeWidth="2.2"
        />
        {/* Ea */}
        <motion.line
          initial={false}
          animate={{ x1: px(params.edv), y1: py(0), x2: px(params.esv), y2: py(params.esp) }}
          transition={spring}
          stroke={EA_COLOR}
          strokeWidth="2.2"
        />

        <motion.path
          initial={false}
          animate={{ d: loopPath(params) }}
          transition={spring}
          fill="var(--accent)"
          fillOpacity="0.1"
          stroke="var(--accent)"
          strokeWidth="3"
          className="mode-transition"
        />

        <motion.circle
          initial={false}
          animate={{ cx: px(params.esv), cy: py(params.esp) }}
          transition={spring}
          r="5"
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />

        <motion.text
          initial={false}
          animate={{ x: px(params.esv) - 12, y: py(params.esp) - 12 }}
          transition={spring}
          textAnchor="end"
          className="text-[11px] font-semibold"
          fill={EES_COLOR}
        >
          {labels.ees}
        </motion.text>
        <motion.text
          initial={false}
          animate={{ x: px(params.edv) + 6, y: py(24) }}
          transition={spring}
          className="text-[11px] font-semibold"
          fill={EA_COLOR}
        >
          {labels.ea}
        </motion.text>
      </svg>

      <div className="mt-1 flex flex-wrap items-center gap-4 px-2 text-xs text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: EES_COLOR }} />
          {labels.ees}
          <span className="font-semibold tabular-nums text-ink">{ees.toFixed(1)}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 rounded-full" style={{ backgroundColor: EA_COLOR }} />
          {labels.ea}
          <span className="font-semibold tabular-nums text-ink">{ea.toFixed(1)}</span>
        </span>
        <span className="flex items-center gap-2">
          {labels.couplingLabel}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${
              coupling >= COUPLING_CUTOFF ? "bg-pe-soft text-pe" : "bg-normal-soft text-normal"
            }`}
          >
            {coupling.toFixed(2)}
          </span>
        </span>
        <span className="flex items-center gap-2">
          SV
          <span className="font-semibold tabular-nums text-ink">{params.edv - params.esv} ml</span>
        </span>
      </div>

      {labels.source ? (
        <figcaption className="mt-3 px-2 text-[11px] leading-relaxed text-ink-faint">
          {labels.source}
        </figcaption>
      ) : null}
    </figure>
  );
}
