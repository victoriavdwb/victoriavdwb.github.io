"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/content";
import { useReducedMotion } from "@/lib/hooks";
import { useSimulation } from "@/lib/state";

const NO_COLOR = "#10b981";
const ROS_COLOR = "#ef4444";
const ALBUMIN = "#f59e0b";

const CENTER = 240;
const CELL_COUNT = 5;
const X0 = 40;
const X1 = 640;

export type EndoFocus = "afterload" | "permeability" | "coagulation" | null;

/**
 * Laengsschnitt durch ein Widerstandsgefaess.
 * step 0 VEGF-Signal · 1 eNOS/NO · 2 ROS · 3 Konsequenzen
 */
export function EndotheliumScene({
  step,
  focus,
  legend,
  labels,
}: {
  step: number;
  focus: EndoFocus;
  legend: Dictionary["ch3"]["legend"];
  labels: Dictionary["ch3"]["labels"];
}) {
  const { isPe } = useSimulation();
  const reduced = useReducedMotion();

  const half = isPe ? 58 : 96;
  const endo = 26;
  const muscle = isPe ? 56 : 40;

  const topEndoY = CENTER - half - endo;
  const topMuscleY = topEndoY - muscle;
  const bottomEndoY = CENTER + half;
  const bottomMuscleY = bottomEndoY + endo;

  const gap = isPe && step >= 3 ? 16 : 5;
  const cellWidth = (X1 - X0 - gap * (CELL_COUNT - 1)) / CELL_COUNT;
  const cellX = (index: number) => X0 + index * (cellWidth + gap);
  const junctionX = (index: number) => cellX(index) + cellWidth + gap / 2;

  const showLeak = isPe && step >= 3 && (focus === "permeability" || focus === null);
  const showPlatelets = isPe && step >= 3 && (focus === "coagulation" || focus === null);
  const highlightMuscle = focus === "afterload" && step >= 3;

  const spring = { type: "spring" as const, stiffness: 80, damping: 18 };

  return (
    <svg viewBox="0 0 680 470" className="h-auto w-full" role="img" aria-label={isPe ? labels.pe : labels.normal}>
      <rect x="0" y="0" width="680" height="470" fill="var(--surface)" />

      {/* Glatte Muskulatur */}
      {[
        { y: topMuscleY, key: "top" },
        { y: bottomMuscleY, key: "bottom" },
      ].map((band) => (
        <motion.g key={band.key} animate={{ y: 0 }}>
          <motion.rect
            x={X0}
            width={X1 - X0}
            rx="14"
            fill="#c7b9f5"
            animate={{
              y: band.y,
              height: muscle,
              opacity: highlightMuscle ? 0.95 : 0.55,
            }}
            transition={spring}
          />
          {Array.from({ length: 9 }).map((_, index) => (
            <motion.line
              key={index}
              x1={X0 + 30 + index * 66}
              x2={X0 + 30 + index * 66}
              stroke="#9d86e8"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ y1: band.y + 10, y2: band.y + muscle - 10, opacity: isPe ? 0.9 : 0.45 }}
              transition={spring}
            />
          ))}
        </motion.g>
      ))}

      {/* Endothelzellen */}
      {[
        { y: topEndoY, key: "top", dir: -1 },
        { y: bottomEndoY, key: "bottom", dir: 1 },
      ].map((row) =>
        Array.from({ length: CELL_COUNT }).map((_, index) => (
          <motion.rect
            key={`${row.key}-${index}`}
            height={endo}
            rx="9"
            fill="#dbe7ee"
            stroke="var(--ink-faint)"
            strokeWidth="1"
            initial={false}
            animate={{ x: cellX(index), width: cellWidth, y: row.y }}
            transition={spring}
          />
        )),
      )}

      {/* Zellkerne */}
      {Array.from({ length: CELL_COUNT }).map((_, index) => (
        <motion.ellipse
          key={`nucleus-${index}`}
          rx="10"
          ry="6"
          fill="#94a3b8"
          animate={{ cx: cellX(index) + cellWidth / 2, cy: topEndoY + endo / 2 }}
          transition={spring}
        />
      ))}

      {/* VEGF-Rezeptoren mit oder ohne Ligand */}
      {Array.from({ length: CELL_COUNT }).map((_, index) => {
        const cx = cellX(index) + cellWidth / 2;
        return (
          <motion.g key={`receptor-${index}`} animate={{ opacity: step >= 0 ? 1 : 0 }}>
            <motion.path
              d={`M${cx} ${topEndoY + endo} l-9 12 M${cx} ${topEndoY + endo} l9 12 M${cx} ${
                topEndoY + endo
              } v-6`}
              stroke="#64748b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{ y: 0 }}
            />
            <motion.circle
              cx={cx}
              r="8"
              fill={NO_COLOR}
              animate={{
                cy: topEndoY + endo + 18,
                opacity: isPe ? 0 : 1,
              }}
              transition={spring}
            />
          </motion.g>
        );
      })}

      {/* eNOS und NO-Diffusion in die Muskelschicht */}
      <motion.text
        x={X0 + 8}
        className="text-[12px] font-bold"
        animate={{ y: topEndoY - 8, fill: isPe ? "#94a3b8" : NO_COLOR }}
      >
        eNOS {isPe ? "↓" : "↑"}
      </motion.text>

      {step >= 1 &&
        Array.from({ length: 8 }).map((_, index) => {
          const cx = X0 + 70 + index * 72;
          return (
            <motion.circle
              key={`no-${index}`}
              cx={cx}
              r="5"
              fill={NO_COLOR}
              initial={false}
              animate={
                reduced
                  ? { cy: topEndoY - 12, opacity: isPe ? 0.15 : 0.9 }
                  : {
                      cy: [topEndoY + 4, topMuscleY + muscle / 2],
                      opacity: isPe ? [0.25, 0] : [0.95, 0.15],
                    }
              }
              transition={{ duration: isPe ? 1.4 : 2.2, repeat: Infinity, delay: index * 0.22 }}
            />
          );
        })}

      {/* ROS */}
      {step >= 2 &&
        Array.from({ length: 7 }).map((_, index) => {
          const cx = X0 + 54 + index * 84;
          return (
            <motion.text
              key={`ros-${index}`}
              x={cx}
              textAnchor="middle"
              className="text-[13px] font-bold"
              fill={ROS_COLOR}
              animate={
                reduced
                  ? { y: CENTER - half + 14, opacity: isPe ? 1 : 0.12 }
                  : {
                      y: CENTER - half + 14,
                      opacity: isPe ? [0.4, 1, 0.4] : [0.08, 0.16, 0.08],
                      scale: isPe ? [0.9, 1.15, 0.9] : 1,
                    }
              }
              transition={{ duration: 1.6, repeat: Infinity, delay: index * 0.18 }}
            >
              ✳
            </motion.text>
          );
        })}

      {/* Lumen mit Erythrozyten */}
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.ellipse
          key={`rbc-${index}`}
          rx="16"
          ry="9"
          fill="var(--accent)"
          opacity="0.55"
          className="mode-transition"
          initial={false}
          animate={
            reduced
              ? { cx: X0 + 60 + index * 100, cy: CENTER }
              : {
                  cx: [X0 - 20, X1 + 20],
                  cy: CENTER + Math.sin(index) * (half * 0.35),
                }
          }
          transition={{
            duration: isPe ? 5.2 : 3.2,
            repeat: Infinity,
            delay: index * (isPe ? 0.85 : 0.52),
            ease: "linear",
          }}
        />
      ))}

      {/* Kapillarleck durch geoeffnete Junctions */}
      {Array.from({ length: CELL_COUNT - 1 }).map((_, index) => (
        <motion.g key={`leak-${index}`} animate={{ opacity: showLeak ? 1 : 0 }} transition={{ duration: 0.4 }}>
          {Array.from({ length: 3 }).map((_, dot) => (
            <motion.circle
              key={dot}
              r="5"
              fill={ALBUMIN}
              initial={false}
              animate={
                reduced
                  ? { cx: junctionX(index), cy: topEndoY - 14 }
                  : {
                      cx: junctionX(index),
                      cy: [CENTER - half + 10, topMuscleY - 6],
                      opacity: [0, 1, 0],
                    }
              }
              transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4 + dot * 0.6 }}
            />
          ))}
        </motion.g>
      ))}

      {/* Thrombozytenadhaesion */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.g
          key={`platelet-${index}`}
          animate={{ opacity: showPlatelets ? 1 : 0 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
        >
          <motion.path
            d="M0 -7 L7 -2 L4 7 L-4 7 L-7 -2 Z"
            fill="#a855f7"
            animate={{ x: X0 + 90 + index * 110, y: bottomEndoY - 8 }}
            transition={spring}
          />
        </motion.g>
      ))}

      {/* Beschriftungen */}
      <motion.text
        x={X1 - 10}
        textAnchor="end"
        className="fill-[var(--ink-faint)] text-[12px] font-medium"
        animate={{ y: CENTER + 5 }}
      >
        {legend.lumen}
      </motion.text>
      <motion.text
        x={X1 - 10}
        textAnchor="end"
        className="fill-[var(--ink-faint)] text-[12px] font-medium"
        animate={{ y: bottomEndoY + 18 }}
      >
        {legend.endothel}
      </motion.text>
      <motion.text
        x={X1 - 10}
        textAnchor="end"
        className="fill-[var(--ink-faint)] text-[12px] font-medium"
        animate={{ y: bottomMuscleY + muscle - 12 }}
      >
        {legend.smc}
      </motion.text>

      <text x={X0} y="452" className="fill-[var(--ink-soft)] text-[12px] font-medium">
        {isPe ? labels.pe : labels.normal}
      </text>
    </svg>
  );
}
