"use client";

import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useSimulation } from "@/lib/state";
import { clamp } from "@/lib/utils";
import { cn } from "@/lib/utils";

const MIN = 4;
const MAX = 400;
const PIVOT = { x: 120, y: 116 };
const NEEDLE = 68;
const TIP = 12;

const toAngle = (value: number) => {
  const t = (Math.log(clamp(value, MIN, MAX)) - Math.log(MIN)) / (Math.log(MAX) - Math.log(MIN));
  return -90 + t * 180;
};

const arcPoint = (angle: number, radius: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [PIVOT.x + Math.cos(rad) * radius, PIVOT.y + Math.sin(rad) * radius] as const;
};

const arc = (from: number, to: number, radius: number) => {
  const [x1, y1] = arcPoint(from, radius);
  const [x2, y2] = arcPoint(to, radius);
  return `M${x1} ${y1} A${radius} ${radius} 0 0 1 ${x2} ${y2}`;
};

const needleGeometry = (angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  const [shaftX, shaftY] = arcPoint(angle, NEEDLE);
  const [tipX, tipY] = arcPoint(angle, NEEDLE + TIP);
  const nx = -Math.sin(rad) * 6;
  const ny = Math.cos(rad) * 6;
  return {
    shaftX,
    shaftY,
    points: `${tipX},${tipY} ${shaftX + nx},${shaftY + ny} ${shaftX - nx},${shaftY - ny}`,
  };
};

type ClinicalItem = {
  label: string;
  text: string;
  tone: "normal" | "warn" | "pe";
};

export function RatioGauge({
  normalLabel,
  peLabel,
  clinical,
}: {
  title: string;
  caption: string;
  normalLabel: string;
  peLabel: string;
  clinical: {
    title: string;
    lead: string;
    items: ClinicalItem[];
  };
}) {
  const { isPe } = useSimulation();
  const value = isPe ? 120 : 12;
  const angle = toAngle(value);
  const angleSpring = useSpring(angle, { stiffness: 70, damping: 11, mass: 0.7 });

  useEffect(() => {
    angleSpring.set(angle);
  }, [angle, angleSpring]);

  const shaftX = useTransform(angleSpring, (current) => needleGeometry(current).shaftX);
  const shaftY = useTransform(angleSpring, (current) => needleGeometry(current).shaftY);
  const points = useTransform(angleSpring, (current) => needleGeometry(current).points);

  return (
    <div className={cn("card p-5", isPe ? "border-pe/20" : "border-normal/20")}>
      <h3 className="text-sm font-semibold text-ink-soft">{clinical.title}</h3>
      <div className="mt-1 flex items-end gap-4">
        <svg viewBox="0 0 240 140" className="h-auto w-[190px] shrink-0">
          <path d={arc(-90, toAngle(38), 82)} stroke="#34d399" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={arc(toAngle(38), toAngle(85), 82)} stroke="#fbbf24" strokeWidth="14" fill="none" />
          <path d={arc(toAngle(85), 90, 82)} stroke="#f43f5e" strokeWidth="14" fill="none" strokeLinecap="round" />

          {[38, 85].map((tick) => {
            const [x1, y1] = arcPoint(toAngle(tick), 68);
            const [x2, y2] = arcPoint(toAngle(tick), 92);
            return (
              <g key={tick}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--surface)" strokeWidth="2" />
                <text
                  x={arcPoint(toAngle(tick), 104)[0]}
                  y={arcPoint(toAngle(tick), 104)[1]}
                  textAnchor="middle"
                  className="fill-[var(--ink-faint)] text-[10px] tabular-nums"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <motion.line
            x1={PIVOT.x}
            y1={PIVOT.y}
            x2={shaftX}
            y2={shaftY}
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <motion.polygon points={points} fill="var(--ink)" />
        </svg>

        <div className="pb-2">
          <motion.p
            key={value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold tabular-nums text-accent mode-transition"
          >
            {value}
          </motion.p>
          <p className="mt-1 text-xs font-medium text-ink-soft">{isPe ? peLabel : normalLabel}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-xs leading-relaxed text-ink-soft">{clinical.lead}</p>
        <ul className="space-y-2">
          {clinical.items.map((item) => {
            const belongsToNormal = item.tone === "normal";
            const active = belongsToNormal ? !isPe : isPe && item.tone === "pe";

            return (
              <li
                key={item.label}
                className={cn(
                  "flex gap-2.5 rounded-xl px-2.5 py-2 transition-colors",
                  belongsToNormal && !isPe && "bg-normal-soft ring-1 ring-normal/30",
                  item.tone === "pe" && isPe && "bg-pe-soft ring-1 ring-pe/25",
                  !active && "opacity-70",
                )}
              >
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    item.tone === "normal" && "bg-normal",
                    item.tone === "warn" && "bg-warn",
                    item.tone === "pe" && "bg-pe",
                  )}
                />
                <p className="text-xs leading-relaxed text-ink-soft">
                  <span className="font-semibold text-ink">{item.label}</span>
                  {belongsToNormal ? (
                    <span className="ml-1.5 inline-flex translate-y-[-1px] rounded-full bg-normal px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      {normalLabel}
                    </span>
                  ) : null}
                  <span>: {item.text}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
