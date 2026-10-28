/**
 * Every rule of the engine checked against the official lists read on 28 October 2026
 * (OPM, Federal Reserve, NYSE, GovHK, USPS memo) and against dates worked by hand.
 */
import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import { easter, nthWeekday, dow, businessDaysBetween, weekendsBetween, weekendDaysBetween } from '../src/lib/engine/dates';
import { federalHolidays, fedClosedHoliday, nyseHolidays, nyseEarlyCloses, nyseDay, uspsDay, eventDate, closures, federalBetween, nextOccurrence } from '../src/lib/engine/holidays';
import { seasonInstant, newMoonK, newMoonAfter, chineseNewYear, ramadanEstimate } from '../src/lib/engine/astro';

const min = (ms: number) => new Date(ms).toISOString().slice(0, 16);
const near = (ms: number, iso: string, minutes: number) => expect(Math.abs(ms - Date.parse(iso)) / 60000, `${min(ms)} vs ${iso}`).toBeLessThanOrEqual(minutes);

describe('calendar rules', () => {
  it('Easter (anonymous Gregorian algorithm)', () => {
    expect(easter(2024)).toBe('2024-03-31');
    expect(easter(2025)).toBe('2025-04-20');
    expect(easter(2026)).toBe('2026-04-05');
    expect(easter(2027)).toBe('2027-03-28');
    expect(easter(2028)).toBe('2028-04-16');
    expect(easter(2038)).toBe('2038-04-25');
    expect(easter(2285)).toBe('2285-03-22');
  });
  it('n-th weekday and last weekday', () => {
    expect(nthWeekday(2026, 11, 4, 4)).toBe('2026-11-26');
    expect(nthWeekday(2027, 5, 1, -1)).toBe('2027-05-31');
    expect(nthWeekday(2026, 5, 0, 2)).toBe('2026-05-10');
    expect(dow('2026-12-25')).toBe(5);
  });
  it('business days and weekends', () => {
    expect(businessDaysBetween('2026-12-21', '2026-12-25')).toBe(4);
    expect(businessDaysBetween('2026-12-21', '2026-12-25', new Set(['2026-12-25']))).toBe(3);
    expect(weekendsBetween('2026-10-28', '2026-12-25')).toBe(8);
    expect(weekendDaysBetween('2026-12-18', '2026-12-21')).toBe(2);
  });
});

describe('federal holidays = OPM tables', () => {
  for (const y of [2026, 2027, 2028] as const) {
    it(`${y}`, () => {
      const opm = (P.federal as Record<string, unknown>)[`opm${y}`] as string[];
      const got = federalHolidays(y).map((h) => h.observed);
      expect(got).toEqual(opm);
    });
  }
});

describe('Federal Reserve closings = Board table', () => {
  for (const y of [2026, 2027, 2028] as const) {
    it(`${y}`, () => {
      const want = (P.fed as Record<string, unknown>)[`closed${y}`] as string[];
      const got = federalHolidays(y).map((h) => fedClosedHoliday(h.observed) ? h.observed : null).filter(Boolean);
      expect(got).toEqual(want);
    });
  }
  it('Saturday holidays: Reserve Banks open the Friday', () => {
    for (const d of P.fed.saturdayOpenFridays) expect(fedClosedHoliday(d), d).toBeNull();
  });
});

describe('NYSE = published calendar', () => {
  for (const y of [2026, 2027, 2028] as const) {
    it(`${y} holidays`, () => {
      const want = (P.nyse as Record<string, unknown>)[`closed${y}`] as string[];
      expect(nyseHolidays(y).map((h) => h.date)).toEqual(want);
    });
  }
  it('early closes 2026–2028', () => {
    expect([2026, 2027, 2028].flatMap((y) => nyseEarlyCloses(y))).toEqual(P.nyse.earlyClose);
  });
  it('open on 31 December 2027, closed on Columbus Day? no: open', () => {
    expect(nyseDay('2027-12-31').open).toBe(true);
    expect(nyseDay('2026-10-12').open).toBe(true);
    expect(nyseDay('2026-11-11').open).toBe(true);
    expect(nyseDay('2026-04-03').open).toBe(false);
    expect(nyseDay('2026-11-27').early).toBe(true);
  });
});

describe('Postal Service', () => {
  it('4 July 2026 (Saturday): closed Saturday, open Friday (USPS memo of 22 June 2026)', () => {
    expect(uspsDay('2026-07-04').retail).toBe('closed');
    expect(uspsDay('2026-07-03').retail).toBe('open');
  });
  it('Sunday holiday moves to Monday: 5 July 2027 closed', () => {
    expect(uspsDay('2027-07-05').retail).toBe('closed');
    expect(uspsDay('2027-07-04').retail).toBe('sunday');
  });
  it('Columbus and Veterans Day closed but boxes collected; Black Friday and Christmas Eve open', () => {
    expect(uspsDay('2026-10-12').retail).toBe('closed');
    expect(uspsDay('2026-10-12').collection).toMatch(/still collected/);
    expect(uspsDay('2026-11-11').retail).toBe('closed');
    expect(uspsDay('2026-11-27').retail).toBe('open');
    expect(uspsDay('2026-12-24').retail).toBe('open');
    expect(uspsDay('2026-12-25').collection).toMatch(/No collection/);
  });
});

describe('observances', () => {
  it('2026–2028 dates', () => {
    expect(eventDate('thanksgiving', 2026)).toBe('2026-11-26');
    expect(eventDate('thanksgiving', 2027)).toBe('2027-11-25');
    expect(eventDate('blackfriday', 2026)).toBe('2026-11-27');
    expect(eventDate('cybermonday', 2026)).toBe('2026-11-30');
    expect(eventDate('mothers', 2027)).toBe('2027-05-09');
    expect(eventDate('fathers', 2027)).toBe('2027-06-20');
    expect(eventDate('memorial', 2027)).toBe('2027-05-31');
    expect(eventDate('labor', 2027)).toBe('2027-09-06');
    expect(eventDate('election', 2026)).toBe('2026-11-03');
    expect(eventDate('election', 2028)).toBe('2028-11-07');
    expect(eventDate('election', 2027)).toBeNull();
    expect(eventDate('superbowl', 2027)).toBe('2027-02-14');
    expect(eventDate('superbowl', 2028)).toBeNull();
    expect(eventDate('goodfriday', 2027)).toBe(P.hongKong2027.goodFriday);
  });
  it('next occurrence', () => {
    expect(nextOccurrence('christmas', '2026-10-28')).toBe('2026-12-25');
    expect(nextOccurrence('halloween', '2026-11-01')).toBe('2027-10-31');
  });
  it('closures table', () => {
    const c = closures('2026-07-03');
    expect(c.federal.open).toBe(false);
    expect(c.fedBanks.open).toBe(true);
    expect(c.market.open).toBe(false);
    expect(c.post.retail).toBe('open');
    expect(federalBetween('2026-11-01', '2026-12-31').map((h) => h.observed)).toEqual(['2026-11-11', '2026-11-26', '2026-12-25']);
  });
});

describe('astronomy (Meeus)', () => {
  it('equinoxes and solstices within 3 minutes of published times', () => {
    near(seasonInstant(2026, 'december'), '2026-12-21T20:50Z', 3);
    near(seasonInstant(2027, 'march'), '2027-03-20T20:25Z', 3);
    near(seasonInstant(2027, 'december'), '2027-12-22T02:42Z', 3);
    near(seasonInstant(2026, 'march'), '2026-03-20T14:46Z', 3);
    near(seasonInstant(2026, 'june'), '2026-06-21T08:24Z', 3);
  });
  it('new moons', () => {
    near(newMoonK(-283), '1977-02-18T03:37Z', 2); // Meeus example 49.a, 1977 Feb 18 3h37m (TD ≈ UT + 48 s)
    near(newMoonAfter(Date.UTC(2027, 1, 1)), '2027-02-06T15:56Z', 3);
  });
  it('Chinese New Year = gazetted / known dates', () => {
    expect(chineseNewYear(2024)).toBe('2024-02-10');
    expect(chineseNewYear(2025)).toBe('2025-01-29');
    expect(chineseNewYear(2026)).toBe('2026-02-17');
    expect(chineseNewYear(2027)).toBe(P.hongKong2027.lunarNewYear);
    expect(chineseNewYear(2028)).toBe('2028-01-26');
  });
  it('Ramadan estimate (first fast in North America)', () => {
    expect(ramadanEstimate(1446).firstFast).toBe('2025-03-01');
    expect(ramadanEstimate(1447).firstFast).toBe('2026-02-18');
    expect(ramadanEstimate(1448).firstFast).toBe('2027-02-08');
    expect(ramadanEstimate(1449).firstFast).toBe('2028-01-28');
    expect(eventDate('ramadan', 2027)).toBe('2027-02-08');
  });
});
