import type { Mode } from "./state";

export type SeriesKey = "plasma" | "co" | "svr" | "map";

type ControlPoints = Array<[week: number, value: number]>;

/**
 * Stützpunkte in Prozent des präkonzeptionellen Ausgangswerts (100 % = vor der
 * Schwangerschaft). Die Kurven sind didaktisch geglättet, ihre Extrempunkte
 * (Peak/Nadir) und deren zeitliche Lage sind jedoch an konkret publizierte
 * Größenordnungen gekoppelt:
 *
 *  - NORMAL: Sanghavi M, Rutherford JD. Cardiovascular Physiology of Pregnancy.
 *    Circulation. 2014;130(12):1003–1008. Der dort beschriebene serielle Verlauf
 *    stützt sich auf Robson SC et al. Am J Physiol. 1989;256:H1060–H1065.
 *  - PRÄEKLAMPSIE: Melchiorre K, Sharma R, Thilaganathan B. Cardiovascular
 *    Implications in Preeclampsia. Circulation. 2014;130(8):703–714, inkl. des
 *    mid-gestationalen „high-resistance / low-volume"-Profils (Melchiorre K et al.
 *    BJOG. 2012;120(4):496–504).
 */
const CURVES: Record<Mode, Record<SeriesKey, ControlPoints>> = {
  normal: {
    // Plasma-/Blutvolumen: progressiver Anstieg auf ~+45–50 %, Plateau ab ~32. SSW
    // (Sanghavi 2014: Blutvolumen „usually close to 45%", Plasmavolumen bis ~50 %).
    plasma: [
      [0, 100],
      [8, 106],
      [16, 122],
      [24, 140],
      [32, 148],
      [40, 150],
    ],
    // Herzminutenvolumen: +30–50 %, Anstieg ab 1. Trimenon, Maximum Ende 2./frühes
    // 3. Trimenon, danach leichter Abfall zum Termin (Sanghavi 2014).
    co: [
      [0, 100],
      [8, 114],
      [16, 130],
      [24, 141],
      [32, 139],
      [40, 133],
    ],
    // Systemischer Widerstand: Abfall ab ~5. SSW, Nadir im 2. Trimenon (~−30 bis
    // −34 %), danach langsamer Wiederanstieg bis zum Termin (Sanghavi 2014).
    svr: [
      [0, 100],
      [8, 84],
      [16, 70],
      [24, 66],
      [32, 70],
      [40, 76],
    ],
    // Mittlerer arterieller Druck: Abfall auf Nadir zur Zyklusmitte (−5 bis
    // −10 mmHg ≈ −8 %), anschließend Rückkehr Richtung Ausgangswert (Sanghavi 2014).
    map: [
      [0, 100],
      [8, 96],
      [16, 92],
      [24, 92],
      [32, 96],
      [40, 100],
    ],
  },
  preeclampsia: {
    // Gedämpfte Volumenexpansion / relative Hämokonzentration – das „low-volume"-
    // Element des Präeklampsie-Profils (Melchiorre 2014).
    plasma: [
      [0, 100],
      [8, 104],
      [16, 114],
      [24, 122],
      [32, 124],
      [40, 122],
    ],
    // Nur mäßiger früher HZV-Anstieg, dann Abfall – „low cardiac output"-Phänotyp
    // v. a. der early-onset Präeklampsie (Melchiorre 2014).
    co: [
      [0, 100],
      [8, 112],
      [16, 126],
      [24, 124],
      [32, 116],
      [40, 108],
    ],
    // Unzureichender Widerstandsabfall mit anschließendem Anstieg über den
    // Ausgangswert – der „high-resistance"-Zustand (Melchiorre 2014).
    svr: [
      [0, 100],
      [8, 88],
      [16, 80],
      [24, 96],
      [32, 118],
      [40, 134],
    ],
    // Blutdruckanstieg in der 2. Schwangerschaftshälfte (Hypertonie als
    // Leitbefund der Präeklampsie; Melchiorre 2014).
    map: [
      [0, 100],
      [8, 97],
      [16, 95],
      [24, 104],
      [32, 116],
      [40, 126],
    ],
  },
};

export function valueAt(mode: Mode, key: SeriesKey, week: number) {
  const points = CURVES[mode][key];
  if (week <= points[0][0]) return points[0][1];
  const last = points[points.length - 1];
  if (week >= last[0]) return last[1];

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (week >= x0 && week <= x1) {
      const t = (week - x0) / (x1 - x0);
      const eased = t * t * (3 - 2 * t);
      return y0 + (y1 - y0) * eased;
    }
  }
  return last[1];
}

export function samples(mode: Mode, key: SeriesKey, maxWeek: number, resolution = 2) {
  const points: Array<[number, number]> = [];
  for (let week = 0; week <= maxWeek; week += resolution) {
    points.push([week, valueAt(mode, key, week)]);
  }
  if (points[points.length - 1][0] !== maxWeek) {
    points.push([maxWeek, valueAt(mode, key, maxWeek)]);
  }
  return points;
}

export const SERIES_COLORS: Record<SeriesKey, string> = {
  plasma: "#6366f1",
  co: "#0ea5e9",
  svr: "#f97316",
  map: "#0b1220",
};

export const SERIES_ORDER: SeriesKey[] = ["plasma", "co", "svr", "map"];

export const SERIES_UNITS: Record<SeriesKey, string> = {
  plasma: "%",
  co: "%",
  svr: "%",
  map: "%",
};
