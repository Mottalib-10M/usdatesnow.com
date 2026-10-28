/**
 * Astronomical dates computed in the browser, no data to download (method page):
 * - equinoxes and solstices: J. Meeus, Astronomical Algorithms (2nd ed.), chapter 27, with the 24 periodic terms
 *   (accuracy about one minute for 1951–2050);
 * - new moons: chapter 49, with the planetary corrections A1–A14 (accuracy a few seconds);
 * - ΔT (Terrestrial Time minus Universal Time) taken as 69 s for 2025–2030.
 * Results are instants in milliseconds since 1970 (UTC); the tools show them in the visitor's time zone.
 */
import { isoOf } from './dates';

const RAD = Math.PI / 180;
const DELTA_T_DAYS = 69 / 86400;
const cosd = (x: number) => Math.cos(x * RAD);
const sind = (x: number) => Math.sin(x * RAD);
/** Julian Ephemeris Day (TT) → Unix milliseconds (UT). */
const jdeToMs = (jde: number) => (jde - DELTA_T_DAYS - 2440587.5) * 86400000;
const msToJd = (ms: number) => ms / 86400000 + 2440587.5;

export type Season = 'march' | 'june' | 'september' | 'december';
const SEASON0: Record<Season, number[]> = {
  march: [2451623.80984, 365242.37404, 0.05169, -0.00411, -0.00057],
  june: [2451716.56767, 365241.62603, 0.00325, 0.00888, -0.0003],
  september: [2451810.21715, 365242.01767, -0.11575, 0.00337, 0.00078],
  december: [2451900.05952, 365242.74049, -0.06223, -0.00823, 0.00032],
};
const PERIODIC: Array<[number, number, number]> = [
  [485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112],
  [156, 73.14, 45036.886], [136, 171.52, 22518.443], [77, 222.54, 65928.934], [74, 296.72, 3034.906],
  [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328],
  [17, 288.79, 4562.452], [16, 198.04, 62894.029], [14, 199.76, 31436.921], [12, 95.39, 14577.848],
  [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074],
];

/** Instant (UTC ms) of the equinox or solstice of that month and year. */
export function seasonInstant(year: number, s: Season): number {
  const Y = (year - 2000) / 1000;
  const c = SEASON0[s];
  const jde0 = c[0] + c[1] * Y + c[2] * Y ** 2 + c[3] * Y ** 3 + c[4] * Y ** 4;
  const T = (jde0 - 2451545.0) / 36525;
  const W = 35999.373 * T - 2.47;
  const dl = 1 + 0.0334 * cosd(W) + 0.0007 * cosd(2 * W);
  const S = PERIODIC.reduce((a, [A, B, C]) => a + A * cosd(B + C * T), 0);
  return jdeToMs(jde0 + (0.00001 * S) / dl);
}

/** Instant (UTC ms) of new moon number k (k = 0 near 6 January 2000). */
export function newMoonK(k: number): number {
  const T = k / 1236.85;
  let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T ** 2 - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const E = 1 - 0.002516 * T - 0.0000074 * T ** 2;
  const M = 2.5534 + 29.1053567 * k - 0.0000014 * T ** 2 - 0.00000011 * T ** 3;
  const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T ** 2 + 0.00001238 * T ** 3 - 0.000000058 * T ** 4;
  const F = 160.7108 + 390.67050284 * k - 0.0016118 * T ** 2 - 0.00000227 * T ** 3 + 0.000000011 * T ** 4;
  const O = 124.7746 - 1.56375588 * k + 0.0020672 * T ** 2 + 0.00000215 * T ** 3;
  jde += -0.4072 * sind(Mp) + 0.17241 * E * sind(M) + 0.01608 * sind(2 * Mp) + 0.01039 * sind(2 * F)
    + 0.00739 * E * sind(Mp - M) - 0.00514 * E * sind(Mp + M) + 0.00208 * E * E * sind(2 * M)
    - 0.00111 * sind(Mp - 2 * F) - 0.00057 * sind(Mp + 2 * F) + 0.00056 * E * sind(2 * Mp + M)
    - 0.00042 * sind(3 * Mp) + 0.00042 * E * sind(M + 2 * F) + 0.00038 * E * sind(M - 2 * F)
    - 0.00024 * E * sind(2 * Mp - M) - 0.00017 * sind(O) - 0.00007 * sind(Mp + 2 * M)
    + 0.00004 * sind(2 * Mp - 2 * F) + 0.00004 * sind(3 * M) + 0.00003 * sind(Mp + M - 2 * F)
    + 0.00003 * sind(2 * Mp + 2 * F) - 0.00003 * sind(Mp + M + 2 * F) + 0.00003 * sind(Mp - M + 2 * F)
    - 0.00002 * sind(Mp - M - 2 * F) - 0.00002 * sind(3 * Mp + M) + 0.00002 * sind(4 * Mp);
  const A = [
    [0.000325, 299.77 + 0.107408 * k - 0.009173 * T ** 2], [0.000165, 251.88 + 0.016321 * k], [0.000164, 251.83 + 26.651886 * k],
    [0.000126, 349.42 + 36.412478 * k], [0.00011, 84.66 + 18.206239 * k], [0.000062, 141.74 + 53.303771 * k],
    [0.00006, 207.14 + 2.453732 * k], [0.000056, 154.84 + 7.30686 * k], [0.000047, 34.52 + 27.261239 * k],
    [0.000042, 207.19 + 0.121824 * k], [0.00004, 291.34 + 1.844379 * k], [0.000037, 161.72 + 24.198154 * k],
    [0.000035, 239.56 + 25.513099 * k], [0.000023, 331.55 + 3.592518 * k],
  ];
  jde += A.reduce((a, [c, x]) => a + c * sind(x), 0);
  return jdeToMs(jde);
}
/** The first new moon at or after an instant. */
export function newMoonAfter(ms: number): number {
  const year = 2000 + (msToJd(ms) - 2451545) / 365.25;
  let k = Math.floor((year - 2000) * 12.3685) - 2;
  while (newMoonK(k) < ms) k++;
  return newMoonK(k);
}
export const LUNATION_MS = 29.530588861 * 86400000;
/** Calendar date of an instant in a fixed UTC offset (hours). */
export const dateAtOffset = (ms: number, hours: number) => isoOf(Math.floor((ms + hours * 3600000) / 86400000));

/**
 * Chinese (lunar) New Year: the second new moon after the winter solstice, dated in China Standard Time
 * (UTC+8). The new moon on or before the solstice opens the 11th month; two lunations later comes the
 * 1st month. Years with a leap 11th or 12th month (next one 2033) are outside this rule and refused.
 */
export function chineseNewYear(year: number): string {
  if (year < 1990 || year > 2032) throw new Error('chineseNewYear: 1990–2032 only');
  const sol = seasonInstant(year - 1, 'december');
  const solDate = dateAtOffset(sol, 8);
  let nm = newMoonAfter(sol - 40 * 86400000);
  let prev = nm;
  while (dateAtOffset(nm, 8) <= solDate) { prev = nm; nm = newMoonAfter(nm + 86400000); }
  const m11 = prev;
  const m12 = newMoonAfter(m11 + 86400000);
  const m1 = newMoonAfter(m12 + 86400000);
  return dateAtOffset(m1, 8);
}

/**
 * Expected first day of Ramadan in North America (an ESTIMATE): the first evening on which the moon is at
 * least 12 hours old at sunset on the Pacific coast (taken as 02:00 UTC the next day) starts the month, and
 * the first fast is the next day. Calendars based on local sighting may start one day later.
 * `hijri` = Islamic year (1447 began its Ramadan in February 2026).
 */
export function ramadanEstimate(hijri: number): { newMoon: number; firstFast: string; eid: string; eidNewMoon: number } {
  const base = newMoonAfter(Date.UTC(2026, 1, 10));
  const nm = newMoonAfter(base + (hijri - 1447) * 12 * LUNATION_MS - 5 * 86400000);
  const start = (conj: number) => {
    let d = dateAtOffset(conj, 0);
    for (;;) {
      const sunset = Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10) + 1, 2, 0);
      if (sunset - conj >= 12 * 3600000) return isoOf(Math.floor(sunset / 86400000));
      d = isoOf(Math.floor(sunset / 86400000));
    }
  };
  const next = newMoonAfter(nm + 86400000);
  return { newMoon: nm, firstFast: start(nm), eid: start(next), eidNewMoon: next };
}
