import type { Dictionary } from "@/content";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/primitives";

export function Closing({ dict }: { dict: Dictionary }) {
  const glossary = Object.values(dict.glossary);

  return (
    <Section id="quellen">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Eyebrow>{dict.references.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight balance">
            {dict.references.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{dict.references.note}</p>
          <ol className="mt-6 grid gap-3">
            {dict.references.items.map((item, index) => (
              <li key={item.url} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <span className="shrink-0 tabular-nums text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  {item.authors}{" "}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline decoration-line underline-offset-2 transition-colors hover:text-pe hover:decoration-pe"
                  >
                    {item.title}
                  </a>
                  . <span className="text-ink-faint">{item.source}</span>.
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <SectionHeader title={dict.references.glossaryTitle} />
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {glossary.map((entry) => (
              <div key={entry.term} className="rounded-2xl border border-line bg-surface p-4">
                <dt className="text-sm font-semibold text-ink">{entry.term}</dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-ink-soft">{entry.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
