/**
 * US dates and closures, computed from the rule that sets each one (sources in data/params-2026.json):
 * - federal holidays: 5 U.S.C. 6103(a); observed day: Saturday → Friday (6103(b)), Sunday → Monday (E.O. 11582);
 * - Federal Reserve: Saturday holiday → Reserve Banks open the Friday; Sunday holiday → closed Monday;
 * - NYSE / Nasdaq: the federal list minus Columbus and Veterans Day, plus Good Friday; Saturday → Friday
 *   except New Year's Day (no holiday observed); 1:00 p.m. close the day after Thanksgiving and on a
 *   weekday 24 December or 3 July that is not itself a holiday;
 * - Postal Service: closed on the holiday itself when it falls on a Saturday, Monday when on a Sunday
 *   (Postal Operations Manual 125.22, memo of 22 June 2026).
 * Every function is pure: "today" is always passed in.
 */
import { type Iso, ymd, addDays, dow, nthWeekday, easter, isWeekend, yearOf, dayNum, isoOf } from './dates';
import { seasonInstant, chineseNewYear, ramadanEstimate, dateAtOffset, type Season } from './astro';
import P from '../../data/params-2026.json';

export type FedId = 'newyear' | 'mlk' | 'presidents' | 'memorial' | 'juneteenth' | 'july4' | 'labor' | 'columbus' | 'veterans' | 'thanksgiving' | 'christmas';
export const FEDERAL: Array<{ id: FedId; name: string; legal: string; rule: string; date: (y: number) => Iso }> = [
  { id: 'newyear', name: "New Year's Day", legal: "New Year's Day", rule: 'January 1', date: (y) => ymd(y, 1, 1) },
  { id: 'mlk', name: 'Martin Luther King Jr. Day', legal: 'Birthday of Martin Luther King, Jr.', rule: 'third Monday in January', date: (y) => nthWeekday(y, 1, 1, 3) },
  { id: 'presidents', name: "Presidents' Day", legal: "Washington's Birthday", rule: 'third Monday in February', date: (y) => nthWeekday(y, 2, 1, 3) },
  { id: 'memorial', name: 'Memorial Day', legal: 'Memorial Day', rule: 'last Monday in May', date: (y) => nthWeekday(y, 5, 1, -1) },
  { id: 'juneteenth', name: 'Juneteenth', legal: 'Juneteenth National Independence Day', rule: 'June 19', date: (y) => ymd(y, 6, 19) },
  { id: 'july4', name: 'Independence Day', legal: 'Independence Day', rule: 'July 4', date: (y) => ymd(y, 7, 4) },
  { id: 'labor', name: 'Labor Day', legal: 'Labor Day', rule: 'first Monday in September', date: (y) => nthWeekday(y, 9, 1, 1) },
  { id: 'columbus', name: "Columbus Day (Indigenous Peoples' Day)", legal: 'Columbus Day', rule: 'second Monday in October', date: (y) => nthWeekday(y, 10, 1, 2) },
  { id: 'veterans', name: 'Veterans Day', legal: 'Veterans Day', rule: 'November 11', date: (y) => ymd(y, 11, 11) },
  { id: 'thanksgiving', name: 'Thanksgiving Day', legal: 'Thanksgiving Day', rule: 'fourth Thursday in November', date: (y) => nthWeekday(y, 11, 4, 4) },
  { id: 'christmas', name: 'Christmas Day', legal: 'Christmas Day', rule: 'December 25', date: (y) => ymd(y, 12, 25) },
];
export const fedById = (id: FedId) => FEDERAL.find((f) => f.id === id)!;

/** Observed day for federal employees on a Monday–Friday week. */
export const observedFederal = (d: Iso): Iso => (dow(d) === 6 ? addDays(d, -1) : dow(d) === 0 ? addDays(d, 1) : d);

export interface Holiday { id: FedId; name: string; actual: Iso; observed: Iso }
/** The eleven holidays of a year, as OPM lists them: each holiday of that year with its observed day (New Year's Day can be observed on 31 December of the year before). */
export function federalHolidays(year: number): Holiday[] {
  return FEDERAL.map((f) => { const a = f.date(year); return { id: f.id, name: f.name, actual: a, observed: observedFederal(a) }; });
}
/** Federal holidays whose observed day falls on this date (federal offices closed). */
export function federalOn(d: Iso): Holiday | null {
  const y = yearOf(d);
  for (const yy of [y, y + 1]) for (const h of federalHolidays(yy)) if (h.observed === d) return h;
  return null;
}
/** Holiday falling on that calendar date, observed or not. */
export function federalActualOn(d: Iso): Holiday | null {
  return federalHolidays(yearOf(d)).find((h) => h.actual === d) ?? null;
}

/* ---------- Federal Reserve Banks (and the banks that follow their calendar) ---------- */
export function fedClosedHoliday(d: Iso): Holiday | null {
  const y = yearOf(d);
  for (const yy of [y - 1, y, y + 1]) for (const h of federalHolidays(yy)) {
    if (dow(h.actual) === 6) continue; // Saturday: Reserve Banks open the Friday before
    if (h.observed === d) return h;
  }
  return null;
}
/** Business days of the Fed: Monday–Friday, not a Fed holiday. */
export const fedOpen = (d: Iso) => !isWeekend(d) && !fedClosedHoliday(d);
export function fedHolidays(year: number) {
  return federalHolidays(year).map((h) => ({ ...h, fedClosed: dow(h.actual) === 6 ? null : h.observed, saturday: dow(h.actual) === 6 }));
}

/* ---------- NYSE and Nasdaq ---------- */
export interface MarketDay { open: boolean; early: boolean; reason: string }
function nyseHolidayDates(year: number): Array<{ date: Iso; name: string }> {
  const out: Array<{ date: Iso; name: string }> = [];
  for (const f of FEDERAL) {
    if (f.id === 'columbus' || f.id === 'veterans') continue;
    const a = f.date(year);
    if (f.id === 'newyear' && dow(a) === 6) continue; // no New Year's holiday observed on 31 December
    out.push({ date: observedFederal(a), name: f.name });
  }
  out.push({ date: addDays(easter(year), -2), name: 'Good Friday' });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}
export const nyseHolidays = (year: number) => nyseHolidayDates(year);
export function nyseEarlyCloses(year: number): Iso[] {
  const closed = new Set(nyseHolidayDates(year).map((h) => h.date));
  const cand = [ymd(year, 7, 3), addDays(FEDERAL[9].date(year), 1), ymd(year, 12, 24)];
  return cand.filter((d) => !isWeekend(d) && !closed.has(d)).sort();
}
export function nyseDay(d: Iso): MarketDay {
  if (isWeekend(d)) return { open: false, early: false, reason: dow(d) === 6 ? 'Saturday' : 'Sunday' };
  const h = nyseHolidayDates(yearOf(d)).find((x) => x.date === d);
  if (h) return { open: false, early: false, reason: h.name };
  if (nyseEarlyCloses(yearOf(d)).includes(d)) return { open: true, early: true, reason: `early close at ${P.nyse.earlyCloseTime}` };
  return { open: true, early: false, reason: `regular hours, ${P.nyse.hours}` };
}

/* ---------- Postal Service ---------- */
const WIDE = new Set<string>(P.usps.widelyObserved);
export function uspsHoliday(d: Iso): Holiday | null {
  const y = yearOf(d);
  for (const yy of [y - 1, y, y + 1]) for (const h of federalHolidays(yy)) {
    const day = dow(h.actual) === 0 ? addDays(h.actual, 1) : h.actual; // Saturday kept, Sunday → Monday
    if (day === d) return { ...h, observed: day };
  }
  return null;
}
export const uspsWidelyObserved = (id: FedId) => WIDE.has(id);
export interface PostDay { retail: 'open' | 'closed' | 'sunday'; delivery: string; collection: string; holiday: Holiday | null }
export function uspsDay(d: Iso): PostDay {
  const h = uspsHoliday(d);
  if (h) {
    const wide = WIDE.has(h.id);
    return {
      retail: 'closed', holiday: h,
      delivery: 'No regular mail delivery; Priority Mail Express and some same-day packages can still arrive',
      collection: wide ? 'No collection from blue boxes (widely observed holiday)' : 'Boxes are still collected (holiday not widely observed)',
    };
  }
  if (dow(d) === 0) return { retail: 'sunday', holiday: null, delivery: 'No letter mail; packages (Amazon, Priority Mail Express) in many areas', collection: 'No collection' };
  return { retail: 'open', holiday: null, delivery: dow(d) === 6 ? 'Regular Saturday delivery' : 'Regular delivery', collection: 'Normal collection times' };
}
export function uspsHolidays(year: number) {
  return federalHolidays(year).map((h) => ({ ...h, uspsClosed: dow(h.actual) === 0 ? addDays(h.actual, 1) : h.actual, wide: WIDE.has(h.id) }));
}

/* ---------- Observances and other dates ---------- */
export type EventId =
  | FedId | 'valentines' | 'easter' | 'goodfriday' | 'mothers' | 'fathers' | 'halloween' | 'blackfriday' | 'cybermonday'
  | 'christmaseve' | 'newyearseve' | 'election' | 'superbowl' | 'chinesenewyear' | 'ramadan' | 'spring' | 'summer' | 'fall' | 'winter';

const SEASON_OF: Record<string, Season> = { spring: 'march', summer: 'june', fall: 'september', winter: 'december' };
/** Date (ET calendar day for solstices) of an event in a year, or null if there is none that year / not yet announced. */
export function eventDate(id: EventId, y: number): Iso | null {
  const f = FEDERAL.find((x) => x.id === id);
  if (f) return f.date(y);
  switch (id) {
    case 'valentines': return ymd(y, 2, 14);
    case 'easter': return easter(y);
    case 'goodfriday': return addDays(easter(y), -2);
    case 'mothers': return nthWeekday(y, 5, 0, 2);
    case 'fathers': return nthWeekday(y, 6, 0, 3);
    case 'halloween': return ymd(y, 10, 31);
    case 'blackfriday': return addDays(nthWeekday(y, 11, 4, 4), 1);
    case 'cybermonday': return addDays(nthWeekday(y, 11, 4, 4), 4);
    case 'christmaseve': return ymd(y, 12, 24);
    case 'newyearseve': return ymd(y, 12, 31);
    case 'election': return y % 2 === 0 ? addDays(nthWeekday(y, 11, 1, 1), 1) : null;
    case 'superbowl': return P.superBowl.games.find((g) => g.date?.startsWith(String(y)))?.date ?? null;
    case 'chinesenewyear': return chineseNewYear(y);
    case 'ramadan': { const r = ramadanEstimate(Math.round((y - 2026) * 1.0307) + 1447); return r.firstFast.startsWith(String(y)) ? r.firstFast : null; }
    case 'spring': case 'summer': case 'fall': case 'winter': return dateAtOffset(seasonInstant(y, SEASON_OF[id]), etOffset(y, SEASON_OF[id]));
  }
  return null;
}
/** Eastern Time offset at the season's instant: daylight time from the second Sunday of March to the first Sunday of November. */
export function etOffset(y: number, s: Season): number {
  const ms = seasonInstant(y, s);
  const start = Date.UTC(y, 2, 8 + ((7 - dow(ymd(y, 3, 8))) % 7), 7);
  const end = Date.UTC(y, 10, 1 + ((7 - dow(ymd(y, 11, 1))) % 7), 6);
  return ms >= start && ms < end ? -4 : -5;
}
/** Instant (UTC ms) of a season start, for the countdown to the minute. */
export const seasonMs = (id: 'spring' | 'summer' | 'fall' | 'winter', y: number) => seasonInstant(y, SEASON_OF[id]);

/** The next occurrence on or after `today` (searching this year and the next two). */
export function nextOccurrence(id: EventId, today: Iso): Iso | null {
  const y = yearOf(today);
  for (const yy of [y, y + 1, y + 2]) { const d = eventDate(id, yy); if (d && d >= today) return d; }
  return null;
}

/** Everything that is closed or changed on a date: the "what is open" table. */
export function closures(d: Iso) {
  const fed = federalOn(d);
  const order = P.federal.extraDaysByOrder.find((o) => o.dates.includes(d));
  const res = fedClosedHoliday(d);
  const post = uspsDay(d);
  const mkt = nyseDay(d);
  const weekend = isWeekend(d);
  return {
    date: d,
    weekend,
    federal: weekend ? { open: false, why: 'weekend' } : fed ? { open: false, why: `${fed.name}${fed.observed !== fed.actual ? ' (observed)' : ''}` } : order ? { open: false, why: order.order } : { open: true, why: 'regular workday' },
    fedBanks: weekend ? { open: false, why: 'weekend' } : res ? { open: false, why: `${res.name}${res.observed !== res.actual ? ' (observed)' : ''}` } : { open: true, why: federalActualOn(addDays(d, 1)) && dow(addDays(d, 1)) === 6 ? 'open: the holiday falls on Saturday' : 'business day' },
    post,
    market: mkt,
  };
}

/** Federal holidays (observed) between two dates, both included. */
export function federalBetween(from: Iso, to: Iso): Holiday[] {
  const out: Holiday[] = [];
  for (let y = yearOf(from) - 1; y <= yearOf(to) + 1; y++) for (const h of federalHolidays(y)) if (h.observed >= from && h.observed <= to) out.push(h);
  return out.sort((a, b) => a.observed.localeCompare(b.observed));
}
export const dayAfter = (d: Iso) => isoOf(dayNum(d) + 1);

/** Names shown by the tools, in calendar order. `exact`: the countdown runs to an instant, not to midnight. */
export const EVENTS: Array<{ id: EventId; name: string; exact?: boolean }> = [
  { id: 'newyear', name: "New Year's Day" }, { id: 'mlk', name: 'Martin Luther King Jr. Day' }, { id: 'chinesenewyear', name: 'Chinese New Year' },
  { id: 'ramadan', name: 'Ramadan (first fast, estimate)' }, { id: 'superbowl', name: 'Super Bowl Sunday' }, { id: 'valentines', name: "Valentine's Day" },
  { id: 'presidents', name: "Presidents' Day" }, { id: 'spring', name: 'First day of spring (equinox)', exact: true }, { id: 'goodfriday', name: 'Good Friday' },
  { id: 'easter', name: 'Easter Sunday' }, { id: 'mothers', name: "Mother's Day" }, { id: 'memorial', name: 'Memorial Day' },
  { id: 'fathers', name: "Father's Day" }, { id: 'juneteenth', name: 'Juneteenth' }, { id: 'summer', name: 'First day of summer (solstice)', exact: true },
  { id: 'july4', name: 'Fourth of July' }, { id: 'labor', name: 'Labor Day' }, { id: 'fall', name: 'First day of fall (equinox)', exact: true },
  { id: 'columbus', name: "Columbus Day / Indigenous Peoples' Day" }, { id: 'halloween', name: 'Halloween' }, { id: 'election', name: 'Election Day' },
  { id: 'veterans', name: 'Veterans Day' }, { id: 'thanksgiving', name: 'Thanksgiving' }, { id: 'blackfriday', name: 'Black Friday' },
  { id: 'cybermonday', name: 'Cyber Monday' }, { id: 'winter', name: 'First day of winter (solstice)', exact: true }, { id: 'christmaseve', name: 'Christmas Eve' },
  { id: 'christmas', name: 'Christmas Day' }, { id: 'newyearseve', name: "New Year's Eve" },
];
export const eventName = (id: EventId) => EVENTS.find((e) => e.id === id)?.name ?? id;
/** Every event on or after `today`, soonest first (the home countdown list). */
export function upcoming(today: Iso, n = 8): Array<{ id: EventId; name: string; date: Iso }> {
  return EVENTS.map((e) => ({ id: e.id, name: e.name, date: nextOccurrence(e.id, today) }))
    .filter((e): e is { id: EventId; name: string; date: Iso } => !!e.date)
    .sort((a, b) => a.date.localeCompare(b.date)).slice(0, n);
}
export const ZODIAC = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
export const zodiacOf = (year: number) => ZODIAC[(((year - 4) % 12) + 12) % 12];
