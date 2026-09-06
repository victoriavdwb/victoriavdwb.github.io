"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Scrollytelling: der Schritt, der sich im mittleren Drittel des Viewports
 * befindet, gilt als aktiv und steuert die zugehoerige Grafik.
 */
export function useScrollSteps(count: number) {
  const [active, setActive] = useState(0);
  const nodes = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      nodes.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const observed = nodes.current.slice(0, count).filter(Boolean) as HTMLElement[];
    if (observed.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stepIndex);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    observed.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  return { active, setRef };
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return reduced;
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

/** Die 3D-Szene laeuft nur auf ausreichend grossen Geraeten mit WebGL und ohne Motion-Praeferenz. */
export function useCanRender3D() {
  const [wideEnough, setWideEnough] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setWebgl(hasWebGL());
    const check = () => setWideEnough(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return wideEnough && webgl && !reduced;
}

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options ?? { rootMargin: "-10% 0px", threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
