import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'stock-market-holidays',
  group: 'open',
  order: 59,
  demarche: true,
  tool: { kind: 'holidays', props: { cal: 'nyse', year: 2027 } },
  mini: { kind: 'mini:mktday' },
  related: ['stock-market-open-today', 'bank-holidays-2027', 'easter', 'black-friday', 'christmas-eve-closures'],
  sources: ['nyse', 'nasdaq', 'fed'],
  en: {
    slug: 'stock-market-holidays',
    nav: 'Stock market holidays',
    card: 'Every NYSE and Nasdaq holiday and 1:00 p.m. early close for 2026, 2027 and 2028, side by side, with a calendar file.',
    title: 'Stock Market Holidays 2026, 2027, 2028: NYSE and Nasdaq',
    description: 'Stock market holidays for 2026, 2027 and 2028: every NYSE and Nasdaq closing day and 1:00 p.m. early close, Good Friday dates, and the rules behind each shift.',
    h1: 'Stock market holidays 2026, 2027 and 2028',
    intro: 'The calendar opens on 2027 and highlights the next closing day. Switch the year, save the list to your calendar or print it.',
    resume: (h) => `The NYSE and Nasdaq close on ten days in 2026, ten in 2027 and nine in 2028, and close early at 1:00 p.m. Eastern time on two days in 2026, one in 2027 and two in 2028. The list is built from nine of the eleven federal holidays, leaving out Columbus Day and Veterans Day, plus Good Friday, which falls on ${h.dateW(h.addDays(h.easter(2026), -2))}, ${h.dateW(h.addDays(h.easter(2027), -2))} and ${h.dateW(h.addDays(h.easter(2028), -2))}. A holiday on a Saturday closes the market on the Friday before, which is why the market is shut on Friday, July 3, 2026, on Friday, June 18, 2027 and on Friday, December 24, 2027. A holiday on a Sunday closes it on the Monday after, as on Monday, July 5, 2027. The one exception concerns New Year's Day: when it falls on a Saturday, as in 2028, the exchanges do not close on December 31, so that the year does not end without a trading session. Every date here matches the calendars the two exchanges publish.`,
    faqs: (h) => [
      { q: 'Why does the stock market close on Good Friday?', a: 'By long tradition of the New York Stock Exchange, which has closed on Good Friday for most of its history, with only a handful of exceptions. Good Friday is not a federal holiday, so banks and federal offices stay open and some economic data, such as the monthly jobs report, can still be released that day while stocks do not trade.' },
      { q: 'How many trading days are there in 2027?', a: `${261 - h.nyse(2027).length}. The year has 261 weekdays, and the NYSE closes on ${h.nyse(2027).length} of them for holidays, which leaves ${261 - h.nyse(2027).length} sessions, one of them shortened by the 1:00 p.m. early close on the day after Thanksgiving. The figure matters for annualizing returns and for options that count trading days to expiry.` },
      { q: 'Do Nasdaq and the NYSE ever close on different days?', a: 'In practice no: both publish the same holiday and early-close schedule, and other US stock exchanges follow it too. Options exchanges and futures markets set their own hours, and the bond market follows recommendations of its trade association, which add early closes and a few full closures, such as Columbus Day and Veterans Day, when stocks still trade.' },
    ],
    body: (h) => `
<h2>Closing days, three years side by side</h2>
${h.table(['Holiday', '2026', '2027', '2028'], (() => { const names = ["New Year's Day", 'Martin Luther King Jr. Day', "Presidents' Day", 'Good Friday', 'Memorial Day', 'Juneteenth', 'Independence Day', 'Labor Day', 'Thanksgiving Day', 'Christmas Day']; const cell = (y: number, n: string) => { const x = h.nyse(y).find((e) => e.name === n); return x ? h.dateS(x.date) : 'no closure'; }; return names.map((n) => [n, cell(2026, n), cell(2027, n), cell(2028, n)]); })(), 'NYSE and Nasdaq. "No closure": New Year\'s Day 2028 falls on a Saturday and is not replaced.', ['l', 'r', 'r', 'r'])}
<p>The ${h.src('nyse', 'NYSE')} publishes this schedule three years ahead and the ${h.src('nasdaq', 'Nasdaq Trader calendar')} repeats it. The site computes each date from the rules and checks the result against both lists; the test suite stops the site from being published if one day differs.</p>

<h2>Early closes at 1:00 p.m. Eastern time</h2>
${h.table(['Year', 'Early closes'], [2026, 2027, 2028].map((y) => [String(y), h.nyseEarly(y).map((d) => h.dateW(d)).join('; ')]), 'Stocks close at 1:00 p.m. ET on these days instead of 4:00 p.m.', ['l', 'l'])}
<p>Three days can bring an early close: the day before Independence Day, the day after Thanksgiving and Christmas Eve. Each applies only when the day is a weekday and not itself a market holiday. In 2027, July 3 is a Saturday and December 24 is the observed Christmas holiday, so only the day after Thanksgiving remains. In 2028, July 3 is a Monday before a Tuesday holiday and gets the early close, while Christmas Eve is a Sunday.</p>

<h2>Trading days by year</h2>
${h.table(['Year', 'Weekdays', 'Holidays on weekdays', 'Trading sessions'], [2026, 2027, 2028].map((y) => { let wd = 0; for (let d = `${y}-01-01`; d <= `${y}-12-31`; d = h.addDays(d, 1)) { const w = h.weekday(d); if (w !== 'Saturday' && w !== 'Sunday') wd++; } const n = h.nyse(y).length; return [String(y), wd, n, wd - n]; }), 'Counted by the program from the calendar above.', ['l', 'r', 'r', 'r'])}

<h2>Where the market and the banks disagree</h2>
<p>Stocks settle one business day after the trade, and settlement needs the banks. On Columbus Day and Veterans Day the market trades but the ${h.src('fed', 'Federal Reserve')} is closed, so trades made that day settle a day later than usual. On Good Friday the reverse happens. On Fridays before a Saturday holiday, as in July 2026 and June and December 2027, both the market and federal offices close, but banks open. The ${h.a('bank-holidays-2027', 'bank holidays 2027 page')} shows the bank side of the same weeks, and the mini-tool under the summary checks any single date for both.</p>
<p>The exchanges can also close at short notice for a national day of mourning or an emergency, as they did for a day in January 2025 and for two days in 2012 during Hurricane Sandy. Those closures are added here when they are announced. For the trading status of today, use the ${h.a('stock-market-open-today', 'market checker')}.</p>`,
  },
});
