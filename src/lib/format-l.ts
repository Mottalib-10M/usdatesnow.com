/** Formatting for the en-US pages (RECETTE §4: one locale). Dates are civil days: always formatted in UTC so a day never shifts. */
export type L = 'en';
const TAG = 'en-US';
export const langTag = (_lang: L = 'en') => TAG;
const cache = new Map<string, Intl.NumberFormat>();
function nf(o: Intl.NumberFormatOptions) {
  const k = JSON.stringify(o);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(TAG, o));
  return cache.get(k)!;
}
export const formatNumberL = (v: number, _lang: L = 'en', d = 0) => nf({ minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
export const pct = (v: number, _lang: L = 'en', d = 0) => `${formatNumberL(v * 100, 'en', d)}%`;
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) => new Date(`${iso}T00:00:00Z`).toLocaleDateString(TAG, { ...o, timeZone: 'UTC' });
/** "2026-12-25" → "December 25, 2026". */
export const dateL = (iso: string, _lang: L = 'en') => fmt(iso, { month: 'long', day: 'numeric', year: 'numeric' });
/** "2026-12-25" → "Friday, December 25, 2026". */
export const dateW = (iso: string) => fmt(iso, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
/** "2026-12-25" → "Fri, Dec 25". */
export const dateS = (iso: string) => fmt(iso, { weekday: 'short', month: 'short', day: 'numeric' });
/** "2026-12-25" → "December 25". */
export const dateMD = (iso: string) => fmt(iso, { month: 'long', day: 'numeric' });
/** "2026-12-25" → "Friday". */
export const weekdayL = (iso: string) => fmt(iso, { weekday: 'long' });
/** An instant in a given IANA time zone: "December 21, 2026, 3:50 PM EST". */
export const instantL = (ms: number, tz = 'America/New_York') => new Date(ms).toLocaleString(TAG, { timeZone: tz, month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
export const plural = (n: number, w: string, ws = `${w}s`) => `${formatNumberL(n)} ${n === 1 ? w : ws}`;
