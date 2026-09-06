import type { Dictionary } from "@/content";

export function ChapterSources({ dict, ids }: { dict: Dictionary; ids: number[] }) {
  const items = dict.references.items;
  const valid = ids.filter((id) => id >= 1 && id <= items.length);
  if (valid.length === 0) return null;

  return (
    <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-line pt-5 text-xs text-ink-faint">
      <span className="font-semibold uppercase tracking-[0.14em]">
        {dict.common.sourcesLabel}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {valid.map((id) => {
          const ref = items[id - 1];
          return (
            <a
              key={id}
              href="#quellen"
              title={`${ref.authors}. ${ref.title}. ${ref.source}.`}
              className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-line px-1.5 tabular-nums transition-colors hover:border-pe hover:text-pe"
            >
              {id}
            </a>
          );
        })}
      </div>
    </div>
  );
}
