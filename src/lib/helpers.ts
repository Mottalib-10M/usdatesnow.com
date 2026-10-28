/** Writing helpers handed to every page: links, dates computed by the engine, published lists of params-2026.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, dateL, dateW, dateS, dateMD, weekdayL, instantL, plural } from './format-l';
import { eventDate, federalHolidays, fedHolidays, nyseHolidays, nyseEarlyCloses, uspsHolidays, seasonMs, zodiacOf, type EventId } from './engine/holidays';
import { daysBetween, weekendsBetween, easter, addDays } from './engine/dates';
import { ramadanEstimate } from './engine/astro';
import P from '../data/params-2026.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/** Every page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED = [
  'days-until-christmas', 'thanksgiving', 'easter', 'mothers-day', 'fathers-day', 'valentines-day', 'halloween', 'fourth-of-july', 'super-bowl', 'black-friday', 'cyber-monday',
  'federal-holidays-2026', 'federal-holidays-2027', 'federal-holidays-2028', 'memorial-day', 'labor-day', 'election-day',
  'post-office-open-today', 'banks-open-today', 'stock-market-open-today', 'mail-delivery-today', 'veterans-day-closures', 'columbus-day-closures', 'christmas-eve-closures',
  'bank-holidays-2026', 'bank-holidays-2027', 'stock-market-holidays', 'post-office-holidays-2027', 'business-days',
  'first-day-of-winter', 'first-day-of-spring', 'chinese-new-year', 'ramadan',
];
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  /** Date of an event in a year, written out: ev('thanksgiving', 2027) → "Thursday, November 25, 2027". */
  const ev = (id: EventId, y: number, style: 'w' | 'l' | 's' | 'md' | 'wd' = 'w') => {
    const d = eventDate(id, y);
    if (!d) return 'not set';
    return { w: dateW, l: dateL, s: dateS, md: dateMD, wd: weekdayL }[style](d);
  };
  return {
    lang, a, ext, src, P, num, ev, plural,
    iso: eventDate,
    date: (iso: string) => dateL(iso), dateW, dateS, dateMD, weekday: weekdayL,
    instant: (ms: number, tz?: string) => instantL(ms, tz),
    season: (s: 'spring' | 'summer' | 'fall' | 'winter', y: number, tz?: string) => instantL(seasonMs(s, y), tz),
    seasonMs,
    days: daysBetween, weekends: weekendsBetween, easter, addDays,
    fed: federalHolidays, fedBanks: fedHolidays, nyse: nyseHolidays, nyseEarly: nyseEarlyCloses, usps: uspsHolidays,
    ramadan: ramadanEstimate, zodiac: zodiacOf,
    /** Day the site's figures were last read, written out. */
    read: dateL(P.retrieved_at),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
