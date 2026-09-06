# Präeklampsie – Pathophysiologie interaktiv

Eine zweisprachige (Deutsch/Englisch), scroll-gesteuerte Lern-Website zur Pathophysiologie der Präeklampsie: von der hämodynamischen Adaptation der normalen Schwangerschaft über den anti-angiogenen Shift und die systemische endotheliale Dysfunktion bis zum kardiovaskulären Langzeitrisiko.

Ein einziger Schalter im Header wechselt zwischen **normaler Schwangerschaft** und **Präeklampsie** – und schaltet dabei jede Grafik der Seite gleichzeitig um. Der didaktische Effekt entsteht aus dem direkten Vergleich.

## Inhalt

| Kapitel | Thema | Interaktion |
| --- | --- | --- |
| 01 | Hämodynamische Adaptation und Demaskierung | SSW-Slider (0–40) steuert die Kurven für Plasmavolumen, HZV, SVR und MAP |
| 02 | Anti-angiogener Shift | Trophoblasteninvasion, Spiralarterienumbau, sFlt-1/sEng-Freisetzung, VEGF-Blockade, sFlt-1/PlGF-Quotient |
| 03 | Systemische endotheliale Dysfunktion | Gefäßquerschnitt mit eNOS, NO, ROS; klickbare Konsequenzen inkl. glomerulärer Endotheliose |
| 04 | Ventrikulo-arterielle Entkopplung | Herzgeometrie exzentrisch/konzentrisch, Druck-Volumen-Schleife mit Ees/Ea, Echo-Marker |
| 05 | Zwei-Säulen-Modell (Dual Hit) | Zeitstrahl, Shared Risk Factors vs. Vascular Scarring, relative Risiken |

## Technik

- **Next.js 16** (App Router) mit **TypeScript**
- **Tailwind CSS v4** mit zustandsabhängigen Design-Tokens (`--accent` wechselt mit dem Modus)
- **Framer Motion** für Scrollytelling und SVG-Animationen
- **react-three-fiber / three.js** für die 3D-Körperübersicht, mit SVG-Fallback bei fehlendem WebGL, kleinen Bildschirmen oder `prefers-reduced-motion`
- Zweisprachigkeit über das Route-Segment `src/app/[locale]` und typisierte Wörterbücher, ohne zusätzliche i18n-Bibliothek

## Lokal starten

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev
```

Die Seite läuft anschließend auf `http://localhost:3000/de` (englisch: `/en`). Im Produktions-Export leitet die Wurzel-URL automatisch auf die passende Sprache weiter.

```bash
npm run build   # statischer Export nach out/
```

## Projektstruktur

```
src/
  app/[locale]/       Layout und Onepager, statisch pro Sprache vorgerendert
  components/
    chapters/         Die fünf Kapitel
    viz/              SVG-Visualisierungen (Kurven, Plazenta, Endothel, Herz, PV-Schleife)
    stage/            3D-Körperszene, SVG-Fallback und Error Boundary
    layout/           Header, Footer, Modus- und Sprachumschalter
    ui/               Karten, Scrollytelling-Gerüst, Glossar-Tooltips
  content/            Inhalte auf Deutsch und Englisch (de.ts, en.ts)
  lib/                Zustand, Hooks, Kurvendaten
public/
  index.html          Sprachweiterleitung von / auf /de bzw. /en
  models/             3D-Basismodell (GLB)
```

Neue Inhalte werden ausschließlich in `src/content/de.ts` gepflegt; `en.ts` wird durch den Typ `Dictionary` erzwungen und schlägt beim Build fehl, wenn eine Übersetzung fehlt.

## Deployment

Die Seite wird als statischer Export (`output: "export"`) über GitHub Actions auf GitHub Pages veröffentlicht: jeder Push auf `main` löst den Workflow `.github/workflows/deploy.yml` aus.

Da Pages das Projekt in einem Unterordner ausliefert, setzt der Workflow `NEXT_PUBLIC_BASE_PATH` automatisch auf den Repository-Namen. Ein lokaler Build ohne diese Variable erzeugt eine Version für die Domain-Wurzel.

## Medizinischer Hinweis

Dieses Projekt dient ausschließlich der medizinischen Aus- und Weiterbildung. Alle Darstellungen sind didaktische Vereinfachungen, die Zahlenwerte typische Größenordnungen aus der Literatur und keine Grenzwerte für klinische Entscheidungen. Es ersetzt weder ärztliche Beratung noch Diagnose oder Behandlung.
