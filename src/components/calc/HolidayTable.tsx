/**
 * Holiday calendar of one year, as each institution applies it: federal offices (OPM), Federal Reserve Banks,
 * NYSE and Nasdaq, Postal Service. Year + calendar → every date with weekday, the day actually off and how
 * many days are left, the next one in large type, and an .ics file built in the browser.
 * First render = build day (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { PRIVACY } from './fields';
import { federalHolidays, fedHolidays, nyseHolidays, nyseEarlyCloses, uspsHolidays } from '../../lib/engine/holidays';
import { daysBetween, addDays, type Iso } from '../../lib/engine/dates';
import { dateW, dateS, plural } from '../../lib/format-l';

declare const __BUILD_DAY__: string;
export type Cal = 'federal' | 'fed' | 'nyse' | 'usps';
interface Props { cal?: Cal; year?: number; idPrefix?: string; primary?: boolean }
interface Row { date: Iso | null; name: string; note: string }
const CALS: Array<{ value: Cal; label: string }> = [
  { value: 'federal', label: 'Federal holidays (government offices)' },
  { value: 'fed', label: 'Bank holidays (Federal Reserve)' },
  { value: 'nyse', label: 'Stock market (NYSE and Nasdaq)' },
  { value: 'usps', label: 'Post office closures (USPS)' },
];

function rows(cal: Cal, y: number): Row[] {
  if (cal === 'federal') return federalHolidays(y).map((h) => ({ date: h.observed, name: h.name, note: h.observed !== h.actual ? `falls on ${dateS(h.actual)}, observed this day` : '' }));
  if (cal === 'fed') return fedHolidays(y).map((h) => ({ date: h.fedClosed, name: h.name, note: h.saturday ? `falls on Saturday ${dateS(h.actual)}: Reserve Banks open the Friday` : h.fedClosed !== h.actual ? `falls on ${dateS(h.actual)}, closed this day` : '' }));
  if (cal === 'nyse') {
    const out: Row[] = nyseHolidays(y).map((h) => ({ date: h.date, name: h.name, note: 'market closed' }));
    for (const d of nyseEarlyCloses(y)) out.push({ date: d, name: d.endsWith('-12-24') ? 'Christmas Eve' : d.endsWith('-07-03') ? 'Day before Independence Day' : 'Day after Thanksgiving', note: 'early close, 1:00 p.m. ET' });
    return out.sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  }
  return uspsHolidays(y).map((h) => ({ date: h.uspsClosed, name: h.name, note: `${h.uspsClosed !== h.actual ? `falls on Sunday, closed Monday · ` : ''}${h.wide ? 'no collection' : 'boxes collected'}` }));
}
function ics(list: Row[], title: string) {
  const d = (x: string) => x.replace(/-/g, '');
  const ev = list.filter((r) => r.date).map((r, i) => ['BEGIN:VEVENT', `UID:${d(r.date!)}-${i}@usdatesnow.com`, `DTSTAMP:${d(r.date!)}T000000Z`, `DTSTART;VALUE=DATE:${d(r.date!)}`, `DTEND;VALUE=DATE:${d(addDays(r.date!, 1))}`, `SUMMARY:${r.name}${r.note ? ` (${r.note})` : ''}`.replace(/[,;]/g, (m) => `\\${m}`), 'END:VEVENT'].join('\r\n'));
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', `PRODID:-//Radif Partners//${title}//EN`, 'CALSCALE:GREGORIAN', ...ev, 'END:VCALENDAR'].join('\r\n');
}

export default function HolidayTable({ cal: c0 = 'federal', year: y0 = 2027, idPrefix = 'ht', primary = true }: Props) {
  const [today, setToday] = useState<Iso>(__BUILD_DAY__);
  const [cal, setCal] = useState<Cal>(c0);
  const [year, setYear] = useState(String(y0));
  useEffect(() => { const d = new Date(); setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`); }, []);
  const list = useMemo(() => rows(cal, Number(year)), [cal, year]);
  const next = list.find((r) => r.date && r.date >= today);
  const label = CALS.find((x) => x.value === cal)!.label;
  const href = useMemo(() => `data:text/calendar;charset=utf-8,${encodeURIComponent(ics(list, `${label} ${year}`))}`, [list, label, year]);
  const id = (s: string) => `${idPrefix}-${s}`;
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-holidays>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('cal')} label="Calendar" value={cal} onChange={(x) => setCal(x as Cal)} options={CALS} />
          <SelectField id={id('y')} label="Year" value={year} onChange={setYear} options={[2026, 2027, 2028].map((y) => ({ value: String(y), label: String(y) }))} />
          <p className="text-xs text-navy-600">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{next ? `Next: ${next.name}` : `${label} ${year}`}</p>
          <p className="tabular-nums mt-1 text-2xl font-bold text-navy-900">{next?.date ? dateW(next.date) : `${list.filter((r) => r.date).length} dates in ${year}`}</p>
          {next?.date && <p className="text-sm text-navy-700">{daysBetween(today, next.date) === 0 ? 'Today' : `in ${plural(daysBetween(today, next.date), 'day')}`}</p>}
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {list.map((r) => (
              <tr key={`${r.name}-${r.date}`} className={r.date && r.date < today ? 'text-navy-500' : 'text-navy-900'}>
                <td className="py-1.5 pr-2"><span className="font-medium">{r.name}</span>{r.note && <span className="block text-xs text-navy-600">{r.note}</span>}</td>
                <td className="tabular-nums whitespace-nowrap py-1.5 text-right align-top">{r.date ? dateS(r.date) : 'open'}</td>
              </tr>
            ))}
          </tbody></table>
          <div className="mt-3 flex flex-wrap gap-2 print:hidden">
            <a href={href} download={`${cal}-holidays-${year}.ics`} className="inline-flex h-10 items-center rounded-lg bg-accent-600 px-4 text-sm font-medium text-white hover:bg-accent-700">Add to my calendar (.ics)</a>
            <button type="button" onClick={() => window.print()} className="h-10 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-white">Print</button>
          </div>
        </div>
      </div>
    </div>
  );
}
