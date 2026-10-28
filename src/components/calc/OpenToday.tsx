/**
 * "Is it open today?" Date → post offices, mail delivery, blue-box collection, banks (Federal Reserve
 * calendar), the stock market and federal offices, each with the rule that decides it. `focus` puts one
 * service in large type. First render = build day; today's date is applied after mount (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import { DateField, PRIVACY } from './fields';
import { closures } from '../../lib/engine/holidays';
import { type Iso } from '../../lib/engine/dates';
import { dateW } from '../../lib/format-l';

declare const __BUILD_DAY__: string;
export type Focus = 'post' | 'mail' | 'banks' | 'market' | 'federal';
interface Props { focus?: Focus; date?: string; idPrefix?: string; primary?: boolean }
const localDay = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export default function OpenToday({ focus = 'post', date, idPrefix = 'op', primary = true }: Props) {
  const [d, setD] = useState<Iso>(date ?? __BUILD_DAY__);
  const [touched, setTouched] = useState(!!date);
  const [today, setToday] = useState<Iso>(__BUILD_DAY__);
  useEffect(() => { const t = localDay(); setToday(t); if (!touched) setD(t); }, []);
  const c = useMemo(() => closures(d), [d]);
  const post = c.post.retail === 'open' ? 'Open' : c.post.retail === 'sunday' ? 'Mostly closed (Sunday)' : 'Closed';
  const rows: Array<{ k: Focus | 'collect'; label: string; state: string; why: string }> = [
    { k: 'post', label: 'Post offices (retail counters)', state: post, why: c.post.holiday ? c.post.holiday.name : c.post.retail === 'sunday' ? 'most offices have no Sunday hours' : 'normal day' },
    { k: 'mail', label: 'Mail delivery', state: c.post.retail === 'open' ? 'Yes' : 'Limited', why: c.post.delivery },
    { k: 'collect', label: 'Blue collection boxes', state: /No collection/.test(c.post.collection) ? 'Not collected' : 'Collected', why: c.post.collection },
    { k: 'banks', label: 'Banks (Federal Reserve calendar)', state: c.fedBanks.open ? 'Open' : 'Closed', why: c.fedBanks.why },
    { k: 'market', label: 'Stock market (NYSE, Nasdaq)', state: c.market.open ? (c.market.early ? 'Open, closes early' : 'Open') : 'Closed', why: c.market.reason },
    { k: 'federal', label: 'Federal offices', state: c.federal.open ? 'Open' : 'Closed', why: c.federal.why },
  ];
  const main = rows.find((r) => r.k === focus)!;
  const id = (s: string) => `${idPrefix}-${s}`;
  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-open-today>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-y-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <DateField id={id('d')} label="Date to check" value={d} onChange={(x) => { setTouched(true); setD(x); }} help={d === today ? 'Today in your time zone' : undefined} />
          <p className="text-xs text-navy-600">Local branches can keep shorter hours: this is the national rule of each organization. {PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{main.label}, {dateW(d)}</p>
          <p className="mt-1 text-3xl font-bold text-navy-900">{main.state}</p>
          <p className="text-sm text-navy-700">{main.why}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            {rows.filter((r) => r.k !== focus).map((r) => (
              <tr key={r.k}><td className="py-1.5 pr-2"><span className="font-medium text-navy-900">{r.label}</span><span className="block text-xs text-navy-600">{r.why}</span></td><td className="py-1.5 text-right align-top font-medium text-navy-900">{r.state}</td></tr>
            ))}
          </tbody></table>
        </div>
      </div>
    </div>
  );
}
