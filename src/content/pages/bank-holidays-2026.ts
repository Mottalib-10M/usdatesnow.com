import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'bank-holidays-2026',
  group: 'open',
  order: 57,
  demarche: true,
  tool: { kind: 'holidays', props: { cal: 'fed', year: 2026 } },
  mini: { kind: 'mini:bankday' },
  related: ['bank-holidays-2027', 'banks-open-today', 'federal-holidays-2026', 'business-days', 'stock-market-holidays'],
  sources: ['fed', 'usc6103'],
  en: {
    slug: 'bank-holidays-2026',
    nav: 'Bank holidays 2026',
    card: 'The ten days in 2026 when the Federal Reserve closes and payments do not settle, with the three still to come.',
    title: 'Bank Holidays 2026: The 10 Federal Reserve Closing Days',
    description: 'Bank holidays 2026: the ten days the Federal Reserve Banks close, the July 3 exception, the dates left this year and how each one shifts deposits and transfers.',
    h1: 'Bank holidays 2026',
    intro: 'The calendar shows the Federal Reserve closing days of 2026 with the next one highlighted. Switch to 2027 or to another calendar, or save the list to your own calendar.',
    resume: (h) => {
      const left = h.fedBanks(2026).filter((x) => x.fedClosed && x.fedClosed >= '2026-10-28');
      return `In 2026 the Federal Reserve Banks close on ten days, one fewer than the eleven federal holidays, and banks that rely on them for check clearing and ACH transfers close on the same days. The missing day is Independence Day: it falls on Saturday, July 4, and the Federal Reserve does not move a Saturday holiday to Friday, so ${h.dateW(h.addDays(h.iso('july4', 2026)!, -1))} was a normal business day for payments even though federal offices and the stock market were closed. Every other holiday of 2026 fell on a weekday, so the bank closing day is the holiday itself: New Year's Day on a Thursday, four Mondays from January to May, Juneteenth on a Friday, Labor Day and Columbus Day on Mondays, Veterans Day on a Wednesday, Thanksgiving on a Thursday and Christmas on a Friday. From the end of October, ${h.plural(left.length, 'closing day')} remain: ${left.map((x) => h.dateS(x.fedClosed!)).join('; ')}. The calendar above highlights the next one and builds a calendar file in your browser.`;
    },
    faqs: (h) => [
      { q: 'How many bank holidays are there in 2026?', a: 'Ten on the Federal Reserve calendar. There are eleven federal holidays, but Independence Day 2026 falls on a Saturday, and the Reserve Banks stay open on the Friday before rather than closing. Banks may add their own closures, such as a state holiday, and that varies from one institution to another. Saturdays and Sundays are not counted as holidays because payments never settle on weekends.' },
      { q: 'Were banks open on July 3, 2026?', a: 'The Federal Reserve Banks were open, so payments settled and most banks opened their branches. Federal offices and the stock market were closed for the observed Independence Day holiday that Friday. The Postal Service was also open on the Friday and closed on Saturday, July 4. That Friday is a good example of how differently each institution handles a Saturday holiday.' },
      { q: 'Is the day after Thanksgiving a bank holiday?', a: `No. ${h.ev('blackfriday', 2026)} is a normal business day for the Federal Reserve, so payments settle and most branches open, sometimes with shorter hours. The stock market opens too but closes at 1:00 p.m. Eastern time. Only Thanksgiving Day itself, ${h.ev('thanksgiving', 2026, 'l')}, is a bank holiday.` },
    ],
    body: (h) => `
<h2>The 2026 list, holiday by holiday</h2>
${h.table(['Holiday', 'Date', 'Weekday', 'Federal Reserve'], h.fedBanks(2026).map((x) => [x.name, h.dateS(x.actual), h.weekday(x.actual), x.fedClosed ? 'closed' : 'open (holiday on Saturday)']), 'Holidays observed by the Federal Reserve System in 2026, as published by the Board of Governors.', ['l', 'r', 'l', 'l'])}
<p>The list matches the ${h.src('fed', 'Board of Governors schedule')} for 2026, which also notes in a footnote that the Reserve Banks will be open on Friday, July 3. It follows the eleven holidays of ${h.src('usc6103', '5 U.S.C. 6103')}, set by Congress for federal employees.</p>

<h2>Long weekends for banks in 2026</h2>
<p>Seven of the ten closing days are attached to a weekend. Martin Luther King Jr. Day, Presidents' Day, Memorial Day, Labor Day and Columbus Day are Mondays by law. Juneteenth and Christmas both fall on a Friday in 2026, so each makes a three-day banking weekend. New Year's Day, Veterans Day and Thanksgiving fall in midweek. For payment planning, a three-day weekend means a transfer started on Friday afternoon does not settle until Tuesday.</p>
${h.table(['Closed weekend', 'Last business day before', 'First business day after'], h.fedBanks(2026).filter((x) => x.fedClosed && ['Monday', 'Friday'].includes(h.weekday(x.fedClosed))).map((x) => { const d = x.fedClosed!; const mon = h.weekday(d) === 'Monday'; return [x.name, h.dateS(h.addDays(d, mon ? -3 : -1)), h.dateS(h.addDays(d, mon ? 1 : 3))]; }), 'Business days of the Federal Reserve around the 2026 long weekends.', ['l', 'r', 'r'])}

<h2>What a bank holiday changes for you</h2>
<p>A paycheck due on a bank holiday is usually paid on the business day before, because employers send payroll files ahead. Social Security and other federal benefits follow the same practice when their payment date is a holiday. A check deposited at an ATM on a holiday is posted as received on the next business day. Automatic bill payments set for a holiday tend to run the next business day; whether that is late depends on the contract, which is why many people schedule them a day earlier around long weekends. Card payments and ATM withdrawals keep working throughout.</p>
<p>Not every bank closes. Some branches open on Columbus Day and Veterans Day, and some in-store branches keep the hours of the store around them. Those are decisions of the bank, which only it can confirm. What is certain is the Federal Reserve calendar, which decides when money actually moves between banks.</p>

<h2>Checking a single date</h2>
<p>The mini-tool under the summary takes any date and says whether the Federal Reserve Banks are open, with the stock market status next to it, which is useful around Good Friday or the day after Thanksgiving. For the general checker with post offices and federal offices included, see ${h.a('banks-open-today', 'are banks open today')}. Next year's list, with its three Saturday holidays, is on the ${h.a('bank-holidays-2027', 'bank holidays 2027 page')}.</p>`,
  },
});
