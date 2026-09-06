"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Mode = "normal" | "preeclampsia";

type SimulationValue = {
  mode: Mode;
  isPe: boolean;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  week: number;
  setWeek: (week: number) => void;
};

const SimulationContext = createContext<SimulationValue | null>(null);

export const MAX_WEEK = 40;

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("normal");
  const [week, setWeek] = useState(MAX_WEEK);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((current) => (current === "normal" ? "preeclampsia" : "normal"));
  }, []);

  const value = useMemo<SimulationValue>(
    () => ({ mode, isPe: mode === "preeclampsia", setMode, toggleMode, week, setWeek }),
    [mode, toggleMode, week],
  );

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used inside SimulationProvider");
  }
  return context;
}
