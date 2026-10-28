/**
 * Live countdown to a US date. Event + year → the date and weekday computed from its rule, days left,
 * then hours, minutes and seconds ticking in the visitor's own time zone (to local midnight, or to the
 * exact instant for an equinox or solstice), weekends and business days before it, and the same date in
 * the next years. First render = build day (RECETTE §17.5); the clock starts after mount. Nothing is sent.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { PRIVACY } from './fields';
import { EVENTS, eventDate, nextOccurrence, seasonMs, federalBetween, type EventId } from '../../lib/engine/holidays';
import { addDays, daysBetween, businessDaysBetween, weekendsBetween, yearOf, type Iso } from '../../lib/engine/dates';
import { dateW, formatNumberL, plural, instantL } from '../../lib/format-l';

declare const __BUILD_DAY__: string;
interface Props { event?: EventId; year?: number; idPrefix?: string; primary?: boolean; lock?: boolean }
const YEARS = [2026, 2027, 2028];
const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export default function Countdown({ event = 'christmas', year, idPrefix = 'cd', primary = true, lock = false }: Props) {
  const [today, setToday] = useState<Iso>(__BUILD_DAY__);
  const [now, setNow] = useState<number | null>(null);
  const [tz, setTz] = useState('America/New_York');
  const [ev, setEv] = useState<EventId>(event);
  const [ysel, setYsel] = useState(year ? String(year) : 'next');
  useEffect(() => {
    setToday(localDay()); setNow(Date.now());
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'); } catch { /* keep ET */ }
    const t = setInterval(() => { setNow(Date.now()); setToday(localDay()); }, 1000);
    return () => clearInterval(t);
  }, []);
  const meta = EVENTS.find((e) => e.id === ev)!;
  const target = useMemo(() => (ysel === 'next' ? nextOccurrence(ev, today) : eventDate(ev, Number(ysel))), [ev, ysel, today]);
  const exactMs = meta.exact && target ? seasonMs(ev as 'spring', yearOf(target)) : null;
  const res = useMemo(() => {
    if (!target) return null;
    const days = daysBetween(today, target);
    const closed = new Set(federalBetween(today, target).map((h) => h.observed));
    return { days, weekends: days > 0 ? weekendsBetween(today, target) : 0, biz: days > 1 ? businessDaysBetween(today, addDays(target, -1), closed) : 0, weeks: Math.floor(Math.abs(days) / 7), rest: Math.abs(days) % 7 };
  }, [target, today]);
  let live = '';
  if (now !== null && target) {
    const [y, m, d] = target.split('-').map(Number);
    const ms = (exactMs ?? new Date(y, m - 1, d).getTime()) - now;
    if (ms > 0) {
      const s = Math.floor(ms / 1000);
      live = `${formatNumberL(Math.floor(s / 86400))} d ${String(Math.floor((s % 86400) / 3600)).padStart(2, '0')} h ${String(Math.floor((s % 3600) / 60)).padStart(2, '0')} min ${String(s % 60).padStart(2, '0')} s`;
    }
  }
  const id = (s: string) => `${idPrefix}-${s}`;
  const name = meta.name.replace(' (first fast, estimate)', '');
  const head = !res ? 'Not set yet' : res.days > 1 ? plural(res.days, 'day') : res.days === 1 ? 'Tomorrow' : res.days === 0 ? 'Today' : `${plural(-res.days, 'day')} ago`;
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-countdown>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('ev')} label="Count down to" value={ev} onChange={(x) => setEv(x as EventId)} options={(lock ? EVENTS.filter((e) => e.id === event) : EVENTS).map((e) => ({ value: e.id, label: e.name }))} />
          <SelectField id={id('y')} label="Which year" value={ysel} onChange={setYsel} options={[{ value: 'next', label: 'Next one' }, ...YEARS.map((y) => ({ value: String(y), label: String(y) }))]} />
          <p className="text-xs text-navy-600 sm:col-span-2">Times are counted to midnight in your own time zone ({tz}){meta.exact ? ', or to the exact minute of the equinox or solstice' : ''}. {PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{target ? `${name} ${yearOf(target)}` : name}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{head}</p>
          {live && <p className="tabular-nums text-sm font-medium text-accent-700" data-live>{live}</p>}
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {target ? <>
              <tr><td className="py-1.5 pr-3 text-navy-600">Date</td><td className="py-1.5 text-right text-navy-900">{dateW(target)}</td></tr>
              {exactMs !== null && <tr><td className="py-1.5 pr-3 text-navy-600">Exact moment</td><td className="py-1.5 text-right text-navy-900">{instantL(exactMs, tz)}</td></tr>}
              {res && res.days > 0 && <>
                <tr><td className="py-1.5 pr-3 text-navy-600">Weeks</td><td className="tabular-nums py-1.5 text-right text-navy-900">{plural(res.weeks, 'week')}{res.rest ? `, ${plural(res.rest, 'day')}` : ''}</td></tr>
                <tr><td className="py-1.5 pr-3 text-navy-600">Weekends before it</td><td className="tabular-nums py-1.5 text-right text-navy-900">{formatNumberL(res.weekends)}</td></tr>
                <tr><td className="py-1.5 pr-3 text-navy-600">Business days (federal holidays off)</td><td className="tabular-nums py-1.5 text-right text-navy-900">{formatNumberL(res.biz)}</td></tr>
              </>}
            </> : <tr><td className="py-1.5 text-navy-700">{ev === 'election' ? 'No federal general election that year: choose an even year.' : 'The organizer has not announced this date yet.'}</td></tr>}
            {YEARS.map((y) => { const d = eventDate(ev, y); return <tr key={y}><td className="py-1.5 pr-3 text-navy-600">{name} {y}</td><td className="py-1.5 text-right text-navy-900">{d ? dateW(d) : 'not set'}</td></tr>; })}
          </tbody></table>
        </div>
      </div>
    </div>
  );
}
