import { definePage } from '../../lib/guide-types';

const YEARS = Array.from({ length: 75 }, (_, i) => 2026 + i);

export default definePage({
  id: 'easter',
  group: 'countdown',
  order: 3,
  tool: { kind: 'countdown', props: { event: 'easter' } },
  mini: { kind: 'mini:easteryear' },
  related: ['stock-market-holidays', 'mothers-day', 'first-day-of-spring', 'stock-market-open-today', 'bank-holidays-2027'],
  sources: ['nyse', 'fed', 'hk2027'],
  en: {
    slug: 'easter',
    nav: 'Easter',
    card: 'Easter Sunday for 2026 to 2028 from the church calculation, Good Friday and the market closure that goes with it.',
    title: 'Easter 2027 Date: Countdown, Good Friday and the Moon Rule',
    description: 'Easter is April 5, 2026 and March 28, 2027: live countdown, the dates to 2030, how the church full moon sets them and why the stock market shuts on Good Friday.',
    h1: 'When is Easter 2027?',
    intro: 'Easter Sunday, counted down to midnight in your time zone. The year menu shows 2026, 2027 and 2028.',
    resume: (h) => `Easter Sunday is the first Sunday after the ecclesiastical full moon that falls on or after March 21, the rule the Western churches have used since the Gregorian reform of 1582. The full moon in that rule is a calendar value from church tables, not the astronomical one, which is why Easter can differ from a moon chart by a day or two. The result always lies between March 22 and April 25. For the coming years it gives ${h.ev('easter', 2026)}, then ${h.ev('easter', 2027)}, one of the earlier dates, and ${h.ev('easter', 2028)}. Easter is not a federal holiday and, being a Sunday, closes nothing by itself. The date that matters for markets is the Friday before: Good Friday is not on the federal list, so offices, post offices and banks open as usual, but the New York Stock Exchange and Nasdaq close for the day. In 2027 that means no trading on ${h.ev('goodfriday', 2027)}, while payments keep moving through the Federal Reserve.`,
    faqs: (h) => [
      { q: 'Why is Easter so early in 2027?', a: `Because the church full moon after March 21 comes soon in 2027 and is followed quickly by a Sunday, giving ${h.ev('easter', 2027, 'l')}. The year before it was ${h.ev('easter', 2026, 'l')} and the year after it will be ${h.ev('easter', 2028, 'l')}. The full moon itself shifts by about eleven days each year, then jumps back by a lunar month.` },
      { q: 'What are the earliest and latest possible Easter dates?', a: `March 22 and April 25. Both are rare. The next Easter on April 25 comes in ${YEARS.find((y) => h.iso('easter', y)!.endsWith('-04-25'))}, and no Easter falls on March 22 for the rest of this century. Between 2026 and 2100, ${YEARS.filter((y) => h.iso('easter', y)!.slice(5, 7) === '03').length} of the 75 Easters fall in March and the rest in April.` },
      { q: 'Is Good Friday a stock market holiday?', a: 'Yes. The New York Stock Exchange and Nasdaq close on Good Friday every year, even though it is not a federal holiday. The Federal Reserve Banks stay open, so bank transfers settle, federal offices work and the Postal Service delivers mail. The bond market follows its own recommendations and often holds a short session or closes as well.' },
      { q: 'Do Orthodox churches celebrate Easter on the same day?', a: 'Often not. Orthodox churches apply the same principle to the older Julian calendar, which usually puts their Easter one to five weeks later, and sometimes on the same Sunday. The countdown on this page follows the Gregorian calculation used by Catholic and Protestant churches, which is also the one that sets the Good Friday market closure.' },
    ],
    body: (h) => `
<h2>Easter Sunday and the days around it, 2026 to 2030</h2>
${h.table(['Year', 'Ash Wednesday', 'Good Friday', 'Easter Sunday', 'Pentecost'], [2026, 2027, 2028, 2029, 2030].map((y) => { const e = h.iso('easter', y)!; return [String(y), h.dateS(h.addDays(e, -46)), h.dateS(h.addDays(e, -2)), h.dateS(e), h.dateS(h.addDays(e, 49))]; }), 'Gregorian computus: Lent begins 46 days before Easter; Pentecost is 49 days after.', ['l', 'r', 'r', 'r', 'r'])}
<p>Every date in the table hangs on Easter. Lent starts on Ash Wednesday, 46 days earlier; Palm Sunday is a week before; Pentecost comes seven weeks after. Mardi Gras, the Tuesday before Ash Wednesday, is a legal holiday in Louisiana parishes that celebrate it, but not anywhere at federal level.</p>

<h2>How the date is calculated</h2>
<p>The Council of Nicaea in 325 asked the churches to celebrate Easter on the same Sunday, after the spring full moon. Over the centuries this became a calculation, the computus, rather than an observation. The version used today fixes the spring equinox at March 21 and takes the full moon from a nineteen-year cycle, corrected for the Gregorian calendar. The program behind this site uses the standard algorithm published by Meeus, which reproduces the church tables for every year; the test suite checks it against known dates, among them the Good Friday holidays gazetted by ${h.src('hk2027', 'Hong Kong for 2027')}, which fall on ${h.dateS(h.P.hongKong2027.goodFriday)}.</p>
<p>Because the moon in the rule is a table value, it can disagree with the astronomical full moon. When the real full moon falls on a Saturday night and the table moon on Sunday, Easter moves a whole week later than a sky watcher would expect. That is why the astronomical seasons on the ${h.a('first-day-of-spring', 'first day of spring')} page and Easter are worked out separately.</p>

<h2>Good Friday: markets shut, everything else open</h2>
<p>Good Friday is the clearest case of a closure that has nothing to do with the federal calendar. The ${h.src('nyse', 'NYSE holiday schedule')} lists it every year next to the federal holidays, and Nasdaq follows the same calendar. The ${h.src('fed', 'Federal Reserve holiday list')} does not include it, so wires, direct deposits and checks are processed normally.</p>
<!--tool:open|{"focus":"market","date":"2027-03-26"}-->
<p>A handful of states and many school districts give Good Friday or the Monday after Easter off. Those are local choices and change between districts, so the site does not list them.</p>

<h2>Spring planning around Easter</h2>
<p>School spring breaks are often built around Easter, which is why the date shapes airline and hotel demand in March and April. An early Easter like 2027 can put the holiday before many breaks; a late one like ${h.ev('easter', 2028, 'md')} lines it up with April vacations. For family dates later in spring, the ${h.a('mothers-day', "Mother's Day page")} has its own countdown.</p>
<p>For those counting days, the countdown shows the weekends and business days before Easter Sunday; Good Friday is not removed from that business-day count, because it is not a federal holiday.</p>`,
  },
});
