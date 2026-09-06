"use client";

import { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Dictionary, Locale } from "@/content";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { LocaleSwitch } from "./LocaleSwitch";
import { ModeToggle } from "./ModeToggle";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { nav } = dict;
  const ids = useMemo(() => nav.chapters.map((chapter) => chapter.id), [nav.chapters]);
  const active = useActiveSection(ids);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex size-8 items-center justify-center rounded-xl bg-accent mode-transition">
            <span className="size-3 rounded-full bg-white/90" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/25" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">{nav.brand}</span>
            <span className="hidden text-[11px] text-ink-faint sm:block">{nav.brandSub}</span>
          </span>
        </a>

        <nav className="ml-4 hidden flex-1 items-center gap-1 xl:flex" aria-label={nav.menu}>
          {nav.chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={active === chapter.id ? "true" : undefined}
              className={cn(
                "group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
                active === chapter.id
                  ? "bg-accent-soft text-accent-ink"
                  : "text-ink-soft hover:bg-canvas hover:text-ink",
              )}
            >
              <span className="text-[10px] font-semibold tabular-nums text-ink-faint group-hover:text-ink-soft">
                {chapter.short}
              </span>
              {chapter.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <ModeToggle labels={{ normal: nav.modeNormalShort, pe: nav.modePeShort }} size="sm" />
          </div>
          <LocaleSwitch locale={locale} label={nav.langLabel} />
        </div>
      </div>

      <div className="border-t border-line/70 px-5 py-2 sm:hidden">
        <ModeToggle
          labels={{ normal: nav.modeNormalShort, pe: nav.modePeShort }}
          size="sm"
          idSuffix="mobile"
        />
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-accent mode-transition"
        aria-hidden
      />
    </header>
  );
}
