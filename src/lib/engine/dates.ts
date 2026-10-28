/**
 * Civil dates as whole days (UTC), no time zone: "2026-12-25" <-> day number since 1970-01-01.
 * Nothing here reads the clock: "today" is always passed in by the caller (hydration, RECETTE §17.5).
 */
export type Iso = string; // "YYYY-MM-DD"

export function dayNum(d: Iso): number {
  const [y, m, j] = d.split('-').map(Number);
  return Math.floor(Date.UTC(y, m - 1, j) / 86400000);
}
export function isoOf(n: number): Iso {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}
export const ymd = (y: number, m: number, d: number): Iso => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export const addDays = (d: Iso, n: number): Iso => isoOf(dayNum(d) + n);
export const yearOf = (d: Iso) => Number(d.slice(0, 4));
/** 0 = Sunday … 6 = Saturday. */
export const dow = (d: Iso) => (((dayNum(d) + 4) % 7) + 7) % 7;
export const isWeekend = (d: Iso) => dow(d) === 0 || dow(d) === 6;
export const daysBetween = (from: Iso, to: Iso) => dayNum(to) - dayNum(from);
export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const weekdayName = (d: Iso) => WEEKDAYS[dow(d)];

/**
 * The n-th given weekday of a month (n = 1…5), or the last one with n = -1.
 * Example: Thanksgiving = nthWeekday(y, 11, 4, 4), the fourth Thursday of November.
 */
export function nthWeekday(year: number, month: number, weekday: number, n: number): Iso {
  if (n > 0) {
    const first = ymd(year, month, 1);
    const shift = (weekday - dow(first) + 7) % 7;
    return addDays(first, shift + (n - 1) * 7);
  }
  const last = isoOf(dayNum(ymd(month === 12 ? year + 1 : year, month === 12 ? 1 : month + 1, 1)) - 1);
  return addDays(last, -((dow(last) - weekday + 7) % 7));
}

/**
 * Easter Sunday in the Gregorian calendar: the anonymous Gregorian algorithm (Meeus/Jones/Butcher),
 * exact for every year from 1583.
 */
export function easter(year: number): Iso {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return ymd(year, month, day);
}

/** Days from `from` to `to` counting Monday–Friday only, `to` included and `from` excluded, minus listed closures. */
export function businessDaysBetween(from: Iso, to: Iso, closed: Set<Iso> = new Set()): number {
  const a = dayNum(from), b = dayNum(to);
  if (b <= a) return 0;
  let n = 0;
  for (let x = a + 1; x <= b; x++) {
    const d = isoOf(x);
    if (!isWeekend(d) && !closed.has(d)) n++;
  }
  return n;
}
/** Complete Saturday–Sunday weekends strictly after `from` and strictly before `to`. */
export function weekendsBetween(from: Iso, to: Iso): number {
  const a = dayNum(from), b = dayNum(to);
  let n = 0;
  for (let x = a + 1; x < b - 1; x++) if (dow(isoOf(x)) === 6) n++;
  return n;
}
/** Saturdays and Sundays strictly between the two dates. */
export function weekendDaysBetween(from: Iso, to: Iso): number {
  const a = dayNum(from), b = dayNum(to);
  let n = 0;
  for (let x = a + 1; x < b; x++) if (isWeekend(isoOf(x))) n++;
  return n;
}
