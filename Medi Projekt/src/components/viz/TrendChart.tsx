"use client";

import { motion } from "framer-motion";
import {
  SERIES_COLORS,
  SERIES_ORDER,
  samples,
  valueAt,
  type SeriesKey,
} from "@/lib/hemodynamics";
import { useSimulation } from "@/lib/state";
import { smoothPath } from "@/lib/utils";
import { cn } from "@/lib/utils";

const W = 680;
const H = 380;
const PAD = { top: 26, right: 22, bottom: 44, left: 52 };
const Y_MIN = 55;
const Y_MAX = 155;

const x = (week: number) => PAD.left + (week / 40) * (W - PAD.left - PAD.right);
const y = (value: number) =>
  PAD.top + (1 - (value - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD.top - PAD.bottom);

export function TrendChart({
  week,
  emphasis,
  labels,
}: {
  week: number;
  emphasis: SeriesKey[];
  labels: {
    xLabel: string;
    yLabel: string;
    series: Record<SeriesKey, string>;
    trimester: string[];
    source?: string;
  };
}) {
  const { mode, isPe } = useSimulation();
  const otherMode = isPe ? "normal" : "preeclampsia";

  const trimesterBands = [
    { from: 0, to: 13, label: labels.trimester[0] },
    { from: 13, to: 27, label: labels.trimester[1] },
    { from: 27, to: 40, label: labels.trimester[2] },
  ];

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={labels.yLabel}>
        <defs>
          <clipPath id="chart-reveal">
            <motion.rect
              x={PAD.left}
              y={0}
              height={H}
              animate={{ width: Math.max(0, x(week) - PAD.left) }}
              transition={{ type: "spring", stiffness: 120, damping: 24 }}
            />
          </clipPath>
        </defs>

        {trimesterBands.map((band, index) => (
          <g key={band.label}>
            {index % 2 === 1 ? (
              <rect
                x={x(band.from)}
                y={PAD.top}
                width={x(band.to) - x(band.from)}
                height={H - PAD.top - PAD.bottom}
                fill="var(--canvas)"
              />
            ) : null}
            <text
              x={(x(band.from) + x(band.to)) / 2}
              y={PAD.top - 10}
              textAnchor="middle"
              className="fill-[var(--ink-faint)] text-[11px]"
            >
              {band.label}
            </text>
          </g>
        ))}

        {[60, 80, 100, 120, 140].map((value) => (
          <g key={value}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(value)}
              y2={y(value)}
              stroke={value === 100 ? "var(--ink-faint)" : "var(--line)"}
              strokeWidth={value === 100 ? 1.2 : 1}
              strokeDasharray={value === 100 ? "4 4" : undefined}
            />
            <text
              x={PAD.left - 10}
              y={y(value) + 4}
              textAnchor="end"
              className="fill-[var(--ink-faint)] text-[11px] tabular-nums"
            >
              {value}
            </text>
          </g>
        ))}

        {[0, 10, 20, 30, 40].map((tick) => (
          <text
            key={tick}
            x={x(tick)}
            y={H - PAD.bottom + 20}
            textAnchor="middle"
            className="fill-[var(--ink-faint)] text-[11px] tabular-nums"
          >
            {tick}
          </text>
        ))}
        <text
          x={(W + PAD.left) / 2}
          y={H - 8}
          textAnchor="middle"
          className="fill-[var(--ink-soft)] text-[11px]"
        >
          {labels.xLabel}
        </text>

        {/* Geisterkurven des jeweils anderen Zustands als Vergleich */}
        {SERIES_ORDER.map((key) => (
          <path
            key={`ghost-${key}`}
            d={smoothPath(samples(otherMode, key, 40).map(([w, v]) => [x(w), y(v)]))}
            fill="none"
            stroke={SERIES_COLORS[key]}
            strokeWidth={1.2}
            strokeDasharray="3 5"
            opacity={emphasis.includes(key) ? 0.35 : 0.12}
          />
        ))}

        <g clipPath="url(#chart-reveal)">
          {SERIES_ORDER.map((key) => {
            const active = emphasis.includes(key);
            return (
              <path
                key={key}
                d={smoothPath(samples(mode, key, 40).map(([w, v]) => [x(w), y(v)]))}
                fill="none"
                stroke={SERIES_COLORS[key]}
                strokeWidth={active ? 3.2 : 2}
                strokeLinecap="round"
                opacity={active ? 1 : 0.28}
                style={{ transition: "opacity 300ms ease, stroke-width 300ms ease" }}
              />
            );
          })}
        </g>

        <line
          x1={x(week)}
          x2={x(week)}
          y1={PAD.top}
          y2={H - PAD.bottom}
          stroke="var(--ink)"
          strokeWidth={1}
          opacity={0.35}
        />

        {SERIES_ORDER.map((key) => {
          const value = valueAt(mode, key, week);
          const active = emphasis.includes(key);
          return (
            <circle
              key={`dot-${key}`}
              cx={x(week)}
              cy={y(value)}
              r={active ? 5 : 3.2}
              fill="var(--surface)"
              stroke={SERIES_COLORS[key]}
              strokeWidth={active ? 3 : 2}
              opacity={active ? 1 : 0.4}
            />
          );
        })}
      </svg>

      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 px-2">
        {SERIES_ORDER.map((key) => {
          const active = emphasis.includes(key);
          const value = valueAt(mode, key, week);
          return (
            <li
              key={key}
              className={cn(
                "flex items-center gap-2 text-xs transition-opacity",
                active ? "opacity-100" : "opacity-45",
              )}
            >
              <span
                className="h-0.5 w-5 rounded-full"
                style={{ backgroundColor: SERIES_COLORS[key] }}
              />
              <span className="text-ink-soft">{labels.series[key]}</span>
              <span className="font-semibold tabular-nums text-ink">{Math.round(value)} %</span>
            </li>
          );
        })}
      </ul>

      {labels.source ? (
        <figcaption className="mt-3 px-2 text-[11px] leading-relaxed text-ink-faint">
          {labels.source}
        </figcaption>
      ) : null}
    </figure>
  );
}
