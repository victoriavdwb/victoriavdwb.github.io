"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/content";
import { cn } from "@/lib/utils";

export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) => {
    const segments = (pathname ?? `/${locale}`).split("/");
    segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <div className="flex items-center rounded-full border border-line bg-canvas p-1" aria-label={label}>
      {locales.map((option) => (
        <Link
          key={option}
          href={hrefFor(option)}
          hrefLang={option}
          aria-current={option === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors",
            option === locale
              ? "bg-surface text-ink shadow-[0_1px_2px_rgb(11_18_32/0.08)]"
              : "text-ink-faint hover:text-ink-soft",
          )}
        >
          {option}
        </Link>
      ))}
    </div>
  );
}
