/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engine
 * (`lib/engine/holidays.ts`, `dates.ts`, `astro.ts`), never a second formula. Date inputs hold day numbers;
 * the example date of a date field is 28 October 2026 unless a page passes its own.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { dateW, dateS, dateL, formatNumberL, plural, instantL } from './format-l';
import { dayNum, isoOf, ymd, easter, addDays, daysBetween, weekendsBetween, weekendDaysBetween, businessDaysBetween, nthWeekday, dow, WEEKDAYS, MONTHS } from './engine/dates';
import { eventDate, nextOccurrence, observedFederal, federalHolidays, federalBetween, closures, nyseDay, uspsDay, fedClosedHoliday, seasonMs, zodiacOf, EVENTS, type EventId, type FedId } from './engine/holidays';
import { ramadanEstimate } from './engine/astro';

const EX = dayNum('2026-10-28');
const YEARS = [2026, 2027, 2028, 2029, 2030].map((y) => ({ value: String(y), label: String(y) }));
const yearIn = (def = 2027) => ({ id: 'y', label: 'Year', def, options: YEARS });
const dateIn = (label = 'From this date', def = EX) => ({ id: 'd', label, def, date: true });
const iso = (n: number | undefined) => isoOf(n ?? EX);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const FIXED: Array<{ id: EventId; label: string }> = [
  { id: 'newyear', label: "New Year's Day (Jan 1)" }, { id: 'valentines', label: "Valentine's Day (Feb 14)" }, { id: 'juneteenth', label: 'Juneteenth (June 19)' },
  { id: 'july4', label: 'Fourth of July' }, { id: 'halloween', label: 'Halloween (Oct 31)' }, { id: 'veterans', label: 'Veterans Day (Nov 11)' },
  { id: 'christmaseve', label: 'Christmas Eve' }, { id: 'christmas', label: 'Christmas Day' },
];
const evOpts = (ids: EventId[]) => ids.map((id, i) => ({ value: String(i), label: EVENTS.find((e) => e.id === id)!.name }));
const until = (from: string, to: string) => { const n = daysBetween(from, to); return n === 0 ? 'today' : n > 0 ? `in ${plural(n, 'day')}` : `${plural(-n, 'day')} ago`; };

const SPECS: Record<string, () => MiniSpec> = {
  weekends: () => ({
    title: 'Weekends left before Christmas', cta: 'Live Christmas countdown', ctaPage: 'days-until-christmas',
    inputs: [dateIn('Counting from')],
    run: (v) => {
      const from = iso(v.d); const x = nextOccurrence('christmas', from)!;
      const closed = new Set(federalBetween(from, x).map((h) => h.observed));
      return { head: ['Full weekends before Christmas', formatNumberL(weekendsBetween(from, x))], rows: [['Christmas Day', dateW(x)], ['Days to go', formatNumberL(daysBetween(from, x))], ['Saturdays and Sundays', formatNumberL(weekendDaysBetween(from, x))], ['Business days', formatNumberL(daysBetween(from, x) > 1 ? businessDaysBetween(from, addDays(x, -1), closed) : 0)]] };
    },
  }),
  mailby: () => ({
    title: 'Last day to mail for Christmas 2026', cta: 'Is the post office open?', ctaPage: 'post-office-open-today',
    inputs: [{ id: 's', label: 'USPS service', def: 0, options: [{ value: '0', label: 'Ground Advantage' }, { value: '1', label: 'First-Class Mail' }, { value: '2', label: 'Priority Mail' }, { value: '3', label: 'Priority Mail Express' }] }, dateIn('Today is')],
    run: (v) => {
      const k = (['groundAdvantage', 'firstClass', 'priority', 'priorityExpress'] as const)[clamp(v.s ?? 0, 0, 3)];
      const by = P.usps.xmasMailBy2026[k];
      return { head: ['Send by', dateW(by)], rows: [['That is', until(iso(v.d), by)], ['Delivery hoped by', dateW('2026-12-25')]], note: 'Dates recommended by USPS on 22 September 2026 for the lower 48 states; not a guarantee.' };
    },
  }),
  thanks: () => ({
    title: 'Thanksgiving week for any year', cta: 'Thanksgiving countdown', ctaPage: 'thanksgiving',
    inputs: [yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027; const t = nthWeekday(y, 11, 4, 4);
      return { head: [`Thanksgiving ${y}`, dateW(t)], rows: [['Black Friday', dateS(addDays(t, 1))], ['Cyber Monday', dateS(addDays(t, 4))], ['Earliest possible / latest possible', 'Nov 22 / Nov 28']] };
    },
  }),
  easteryear: () => ({
    title: 'Easter and the dates that hang on it', cta: 'Easter countdown', ctaPage: 'easter',
    inputs: [yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027; const e = easter(y);
      return { head: [`Easter ${y}`, dateW(e)], rows: [['Ash Wednesday', dateS(addDays(e, -46))], ['Palm Sunday', dateS(addDays(e, -7))], ['Good Friday (markets closed)', dateS(addDays(e, -2))], ['Pentecost', dateS(addDays(e, 49))]] };
    },
  }),
  sundays: () => ({
    title: "Mother's Day and Father's Day by year", cta: "Father's Day countdown", ctaPage: 'fathers-day',
    inputs: [yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027;
      return { head: [`Mother's Day ${y}`, dateW(nthWeekday(y, 5, 0, 2))], rows: [["Father's Day", dateW(nthWeekday(y, 6, 0, 3))], ['Weeks between the two', formatNumberL(daysBetween(nthWeekday(y, 5, 0, 2), nthWeekday(y, 6, 0, 3)) / 7)]] };
    },
  }),
  fixedday: () => ({
    title: 'Which weekday does it fall on?', cta: 'Every US date', ctaPage: 'home',
    inputs: [{ id: 'e', label: 'Date', def: 4, options: FIXED.map((f, i) => ({ value: String(i), label: f.label })) }, yearIn(2027)],
    run: (v) => {
      const f = FIXED[clamp(v.e ?? 0, 0, FIXED.length - 1)]; const y = v.y ?? 2027; const d = eventDate(f.id, y)!;
      const fed = ['newyear', 'juneteenth', 'july4', 'veterans', 'christmas'].includes(f.id);
      return { head: [`${f.label.replace(/ \(.*\)/, '')} ${y}`, WEEKDAYS[dow(d)]], rows: [['Date', dateL(d)], ['Day off for federal workers', fed ? dateW(observedFederal(d)) : 'not a federal holiday']] };
    },
  }),
  observed: () => ({
    title: 'Observed day of a federal holiday', cta: 'Federal holidays 2027', ctaPage: 'federal-holidays-2027',
    inputs: [{ id: 'h', label: 'Holiday', def: 5, options: federalHolidays(2027).map((h, i) => ({ value: String(i), label: h.name })) }, yearIn(2027)],
    run: (v) => {
      const h = federalHolidays(v.y ?? 2027)[clamp(v.h ?? 0, 0, 10)];
      return { head: ['Day off', dateW(h.observed)], rows: [['Legal date', dateW(h.actual)], ['Shift', h.observed === h.actual ? 'none' : dow(h.actual) === 6 ? 'Saturday, so the Friday before' : 'Sunday, so the Monday after'], ['Banks (Federal Reserve)', fedClosedHoliday(h.observed) ? 'closed' : 'open']] };
    },
  }),
  longweekends: () => ({
    title: 'Three-day weekends in a year', cta: 'Federal holidays 2027', ctaPage: 'federal-holidays-2027',
    inputs: [yearIn(2027)],
    run: (v) => {
      const hs = federalHolidays(v.y ?? 2027); const lw = hs.filter((h) => [1, 5].includes(dow(h.observed)));
      return { head: ['Long weekends', formatNumberL(lw.length)], rows: [['On a Monday', lw.filter((h) => dow(h.observed) === 1).map((h) => dateS(h.observed)).join(', ') || 'none'], ['On a Friday', lw.filter((h) => dow(h.observed) === 5).map((h) => dateS(h.observed)).join(', ') || 'none'], ['Midweek holidays', formatNumberL(hs.length - lw.length)]] };
    },
  }),
  holidaycount: () => ({
    title: 'Federal holidays left this year', cta: 'Federal holidays 2026', ctaPage: 'federal-holidays-2026',
    inputs: [dateIn('From this date')],
    run: (v) => {
      const d = iso(v.d); const y = Number(d.slice(0, 4)); const left = federalBetween(d, ymd(y, 12, 31));
      return { head: ['Holidays still to come', formatNumberL(left.length)], rows: [['Next', left[0] ? `${left[0].name}, ${dateS(left[0].observed)}` : 'none this year'], ['Then', left[1] ? `${left[1].name}, ${dateS(left[1].observed)}` : 'none']] };
    },
  }),
  nthrule: () => ({
    title: 'The Monday-holiday rule, any year', cta: 'Every federal holiday', ctaPage: 'federal-holidays-2027',
    inputs: [{ id: 'h', label: 'Holiday', def: 0, options: [{ value: '0', label: 'Memorial Day (last Monday of May)' }, { value: '1', label: 'Labor Day (first Monday of September)' }, { value: '2', label: 'MLK Day (third Monday of January)' }, { value: '3', label: "Presidents' Day (third Monday of February)" }, { value: '4', label: 'Columbus Day (second Monday of October)' }] }, yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027; const k = clamp(v.h ?? 0, 0, 4);
      const d = [nthWeekday(y, 5, 1, -1), nthWeekday(y, 9, 1, 1), nthWeekday(y, 1, 1, 3), nthWeekday(y, 2, 1, 3), nthWeekday(y, 10, 1, 2)][k];
      return { head: [`${y}`, dateW(d)], rows: [['Long weekend', `${dateS(addDays(d, -2))} to ${dateS(d)}`], ['Range of possible dates', ['May 25 to 31', 'Sep 1 to 7', 'Jan 15 to 21', 'Feb 15 to 21', 'Oct 8 to 14'][k]]] };
    },
  }),
  daysto: () => ({
    title: 'Days from a date to the holiday', cta: 'All countdowns', ctaPage: 'home',
    inputs: [dateIn('From this date'), { id: 'e', label: 'To', def: 0, options: evOpts(['halloween', 'thanksgiving', 'christmas', 'valentines', 'july4', 'superbowl', 'election']) }],
    run: (v) => {
      const ids: EventId[] = ['halloween', 'thanksgiving', 'christmas', 'valentines', 'july4', 'superbowl', 'election'];
      const from = iso(v.d); const id = ids[clamp(v.e ?? 0, 0, ids.length - 1)]; const x = nextOccurrence(id, from);
      if (!x) return { head: ['Not announced', '—'], rows: [] };
      return { head: [EVENTS.find((e) => e.id === id)!.name, plural(daysBetween(from, x), 'day')], rows: [['Date', dateW(x)], ['Weeks', formatNumberL(Math.floor(daysBetween(from, x) / 7))], ['Weekends before it', formatNumberL(weekendsBetween(from, x))]] };
    },
  }),
  season: () => ({
    title: 'The four seasons of a year (Eastern Time)', cta: 'First day of spring', ctaPage: 'first-day-of-spring',
    inputs: [yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027; const t = (s: 'spring' | 'summer' | 'fall' | 'winter') => instantL(seasonMs(s, y));
      return { head: [`Spring ${y} starts`, t('spring')], rows: [['Summer', t('summer')], ['Fall', t('fall')], ['Winter', t('winter')]] };
    },
  }),
  cny: () => ({
    title: 'Lunar New Year by year', cta: 'Chinese New Year countdown', ctaPage: 'chinese-new-year',
    inputs: [yearIn(2027)],
    run: (v) => {
      const y = v.y ?? 2027; const d = eventDate('chinesenewyear', y)!;
      return { head: [`Lunar New Year ${y}`, dateW(d)], rows: [['Year of the', zodiacOf(y)], ['Lantern Festival (15th day)', dateS(addDays(d, 14))], ['Date in the United States', 'same calendar day; the new moon is dated in China time']] };
    },
  }),
  ramadan: () => ({
    title: 'Ramadan and Eid al-Fitr, estimated', cta: 'Ramadan countdown', ctaPage: 'ramadan',
    inputs: [{ id: 'h', label: 'Islamic year', def: 1448, options: [1448, 1449, 1450].map((h) => ({ value: String(h), label: `${h} AH` })) }],
    run: (v) => {
      const r = ramadanEstimate(v.h ?? 1448);
      return { head: ['First fast (expected)', dateW(r.firstFast)], rows: [['New moon', instantL(r.newMoon)], ['Eid al-Fitr (expected)', dateW(r.eid)], ['Days of fasting', formatNumberL(daysBetween(r.firstFast, r.eid))]], note: 'Estimate: local moon sighting can move each date by one day.' };
    },
  }),
  election: () => ({
    title: 'Federal Election Day by year', cta: 'Election Day countdown', ctaPage: 'election-day',
    inputs: [{ id: 'y', label: 'Year', def: 2028, options: [2026, 2028, 2030, 2032].map((y) => ({ value: String(y), label: String(y) })) }],
    run: (v) => {
      const y = v.y ?? 2028; const d = eventDate('election', y)!;
      return { head: [`Election Day ${y}`, dateW(d)], rows: [['Rule', 'Tuesday after the first Monday in November'], ['Presidential year', y % 4 === 0 ? 'yes' : 'no, midterm'], ['Possible dates', 'November 2 to 8']] };
    },
  }),
  postday: () => ({
    title: 'Post office on a given day', cta: 'Post office holidays 2027', ctaPage: 'post-office-holidays-2027',
    inputs: [dateIn('Date', dayNum('2026-11-11'))],
    run: (v) => {
      const d = iso(v.d); const u = uspsDay(d);
      return { head: [dateW(d), u.retail === 'open' ? 'Open' : u.retail === 'sunday' ? 'Sunday' : 'Closed'], rows: [['Delivery', u.delivery], ['Collection', u.collection]] };
    },
  }),
  bankday: () => ({
    title: 'Are banks open on this date?', cta: 'Bank holidays 2027', ctaPage: 'bank-holidays-2027',
    inputs: [dateIn('Date', dayNum('2026-11-27'))],
    run: (v) => {
      const d = iso(v.d); const c = closures(d);
      return { head: [dateW(d), c.fedBanks.open ? 'Open' : 'Closed'], rows: [['Why', c.fedBanks.why], ['Stock market', c.market.open ? (c.market.early ? 'open, early close' : 'open') : 'closed']] };
    },
  }),
  mktday: () => ({
    title: 'Stock market on a given day', cta: 'Stock market holidays', ctaPage: 'stock-market-holidays',
    inputs: [dateIn('Date', dayNum('2026-11-27'))],
    run: (v) => {
      const d = iso(v.d); const m = nyseDay(d);
      return { head: [dateW(d), m.open ? (m.early ? 'Open until 1:00 p.m. ET' : 'Open') : 'Closed'], rows: [['Why', m.reason], ['Banks', closures(d).fedBanks.open ? 'open' : 'closed']] };
    },
  }),
  bizdays: () => ({
    title: 'Business days between two dates', cta: 'Full business day counter', ctaPage: 'business-days',
    inputs: [dateIn('Start (not counted)'), { id: 't', label: 'End (counted)', def: dayNum('2026-12-31'), date: true }],
    run: (v) => {
      const a = iso(v.d), b = iso(v.t); const hs = federalBetween(addDays(a, 1), b).filter((h) => dow(h.observed) % 6 !== 0);
      return { head: ['Business days', formatNumberL(businessDaysBetween(a, b, new Set(hs.map((h) => h.observed))))], rows: [['Calendar days', formatNumberL(Math.max(0, daysBetween(a, b)))], ['Federal holidays skipped', formatNumberL(daysBetween(a, b) > 0 ? hs.length : 0)]] };
    },
  }),
  superbowl: () => ({
    title: 'Super Bowl Sunday and the days around it', cta: 'Super Bowl countdown', ctaPage: 'super-bowl',
    inputs: [dateIn('From this date')],
    run: (v) => {
      const from = iso(v.d); const g = P.superBowl.games[1];
      return { head: [`Super Bowl ${g.number}`, until(from, g.date!)], rows: [['Date', dateW(g.date!)], ['Venue', g.venue], ['Next one', `${P.superBowl.games[2].number}, ${P.superBowl.games[2].venue}: ${P.superBowl.games[2].status}`]] };
    },
  }),
  monthweek: () => ({
    title: 'Any n-th weekday of a month', cta: 'How US dates are set', ctaPage: 'home',
    inputs: [{ id: 'n', label: 'Which', def: 4, options: [['1', 'First'], ['2', 'Second'], ['3', 'Third'], ['4', 'Fourth'], ['-1', 'Last']].map(([value, label]) => ({ value, label })) }, { id: 'w', label: 'Weekday', def: 4, options: WEEKDAYS.map((w, i) => ({ value: String(i), label: w })) }, { id: 'm', label: 'Month', def: 11, options: MONTHS.map((m, i) => ({ value: String(i + 1), label: m })) }, yearIn(2027)],
    run: (v) => {
      const d = nthWeekday(v.y ?? 2027, clamp(v.m ?? 11, 1, 12), clamp(v.w ?? 4, 0, 6), v.n ?? 4);
      return { head: ['Date', dateW(d)], rows: [['Day of the year', formatNumberL(daysBetween(ymd(v.y ?? 2027, 1, 1), d) + 1)]] };
    },
  }),
};

export const MINI_KINDS = Object.keys(SPECS);
export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export type { FedId };
