import type { Dictionary } from "@/content";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line bg-surface px-5 py-14 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-warn/25 bg-warn-soft/60 p-5">
          <h2 className="text-sm font-semibold text-warn">{dict.footer.disclaimerTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dict.footer.disclaimer}</p>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-xl bg-accent mode-transition">
              <span className="size-3 rounded-full bg-white/90" />
            </span>
            <span className="text-sm font-semibold">{dict.nav.brand}</span>
          </div>
          <p className="text-sm text-ink-faint">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
