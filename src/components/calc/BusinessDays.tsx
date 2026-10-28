/**
 * Business days between two dates: Monday to Friday, with or without the federal holidays (observed days),
 * plus calendar days, weekend days and the holidays that fall in between. First render = build day.
 */
import { useEffect, useMemo, useState } from 'react';
import Toggle from '../ui/Toggle';
import { DateField, PRIVACY } from './fields';
import { federalBetween, nextOccurrence } from '../../lib/engine/holidays';
import { businessDaysBetween, daysBetween, weekendDaysBetween, addDays, type Iso } from '../../lib/engine/dates';
import { dateS, formatNumberL, plural } from '../../lib/format-l';

declare const __BUILD_DAY__: string;
interface Props { idPrefix?: string; primary?: boolean; to?: string }
const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export default function BusinessDays({ idPrefix = 'bd', primary = true, to: to0 }: Props) {
  const [from, setFrom] = useState<Iso>(__BUILD_DAY__);
  const [to, setTo] = useState<Iso>(to0 ?? nextOccurrence('christmas', __BUILD_DAY__)!);
  const [touched, setTouched] = useState(false);
  const [hol, setHol] = useState('yes');
  useEffect(() => { const t = localDay(); if (!touched) { setFrom(t); if (!to0) setTo(nextOccurrence('christmas', t)!); } }, []);
  const r = useMemo(() => {
    const [a, b] = from <= to ? [from, to] : [to, from];
    const hs = federalBetween(addDays(a, 1), b).filter((h) => { const w = new Date(`${h.observed}T00:00:00Z`).getUTCDay(); return w > 0 && w < 6; });
    const closed = new Set(hol === 'yes' ? hs.map((h) => h.observed) : []);
    return { biz: businessDaysBetween(a, b, closed), cal: daysBetween(a, b), wk: weekendDaysBetween(a, addDays(b, 1)), hs };
  }, [from, to, hol]);
  const id = (s: string) => `${idPrefix}-${s}`;
  const t = <T,>(f: (v: T) => void) => (v: T) => { setTouched(true); f(v); };
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-business-days>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <DateField id={id('from')} label="Start date (not counted)" value={from} onChange={t(setFrom)} />
          <DateField id={id('to')} label="End date (counted)" value={to} onChange={t(setTo)} />
          <Toggle id={id('hol')} label="Skip federal holidays" value={hol} onChange={setHol} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Business days</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{formatNumberL(r.biz)}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">Calendar days</td><td className="tabular-nums py-1.5 text-right text-navy-900">{formatNumberL(r.cal)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Saturdays and Sundays</td><td className="tabular-nums py-1.5 text-right text-navy-900">{formatNumberL(r.wk)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Federal holidays on weekdays</td><td className="tabular-nums py-1.5 text-right text-navy-900">{r.hs.length ? r.hs.map((h) => `${h.name.replace(/ \(.*\)/, '')} (${dateS(h.observed)})`).join(', ') : 'none'}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">{hol === 'yes' ? `${plural(r.hs.length, 'holiday')} taken off the count.` : 'Holidays counted as working days.'}</p>
        </div>
      </div>
    </div>
  );
}
