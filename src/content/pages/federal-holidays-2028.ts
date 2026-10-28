import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'federal-holidays-2028',
  group: 'federal',
  order: 32,
  tool: { kind: 'holidays', props: { cal: 'federal', year: 2028 } },
  mini: { kind: 'mini:longweekends' },
  related: ['federal-holidays-2027', 'election-day', 'veterans-day-closures', 'stock-market-holidays', 'business-days'],
  sources: ['usc6103', 'opm', 'fed', 'nyse', 'election'],
  en: {
    slug: 'federal-holidays-2028',
    nav: 'Federal holidays 2028',
    card: 'A leap and election year with only ten observed days inside it: the 2028 dates, Veterans Day on a Friday and the long weekends.',
    title: 'Federal Holidays 2028: Dates, Long Weekends and Shifts',
    description: 'Federal holidays of 2028 with weekdays and observed days: New Year observed in 2027, Veterans Day on Friday, November 10, the long weekends and Election Day.',
    h1: 'Federal holidays 2028: dates and long weekends',
    intro: 'The 2028 table as federal offices will observe it, published early by OPM. Change the calendar to see the bank, market and post office versions.',
    resume: (h) => {
      const f = h.fed(2028);
      return `The Office of Personnel Management has already published the federal holidays of 2028, and the program behind this page reproduces its table to the day. Two holidays fall on a Saturday. New Year's Day 2028 is observed on ${h.dateW(f[0].observed)}, so it sits in the previous calendar year, and Veterans Day is observed on ${h.dateW(f[8].observed)}. Everything else lands on a weekday: Martin Luther King Jr. Day on ${h.dateS(f[1].observed)}, Washington's Birthday on ${h.dateS(f[2].observed)}, Memorial Day on ${h.dateS(f[3].observed)}, Juneteenth on ${h.dateW(f[4].observed)}, Independence Day on ${h.dateW(f[5].observed)}, Labor Day on ${h.dateS(f[6].observed)}, Columbus Day on ${h.dateS(f[7].observed)}, Thanksgiving on ${h.dateS(f[9].observed)} and Christmas on ${h.dateW(f[10].observed)}. The year 2028 therefore contains ten observed federal holidays rather than eleven. It is also a leap year, with a February 29, and a presidential election year: Election Day, set by 2 U.S.C. 7, falls on ${h.ev('election', 2028)}, which is not a federal holiday.`;
    },
    faqs: (h) => [
      { q: 'Why does 2028 have only ten federal holidays?', a: `Because the observed day of New Year's Day 2028 is ${h.dateW(h.fed(2028)[0].observed)}, in the previous year, and New Year's Day 2029 falls on a Monday, so it stays in 2029. The eleven holidays all happen, but only ten observed days fall between January 1 and December 31, 2028. In exchange, 2027 has twelve.` },
      { q: 'Is Veterans Day 2028 observed on Friday?', a: `Yes. November 11, 2028 is a Saturday, so federal offices close on ${h.dateW(h.fed(2028)[8].observed)}. Most banks stay open that Friday, since the Federal Reserve Banks do not move Saturday holidays, and the stock market is open on Veterans Day in any case. Post offices close on Saturday, November 11, and collection boxes are still emptied.` },
      { q: 'Is Election Day 2028 a day off?', a: `Not for federal workers in general. Election Day is set by statute for federal elections but is not one of the holidays in 5 U.S.C. 6103. Several states make it a state holiday or require employers to give time off to vote, and federal agencies grant limited time off to vote when polling hours conflict with work. The date is ${h.ev('election', 2028)}.` },
      { q: 'How many long weekends will there be in 2028?', a: 'Eight three-day weekends inside the year: the five Monday holidays fixed by law, Juneteenth and Christmas, which both fall on a Monday, and Veterans Day, observed on Friday, November 10. The Friday observance of New Year\'s Day 2028 falls in December 2027. Independence Day is a Tuesday, which many people bridge by taking the Monday off; the stock market closes early that Monday.' },
    ],
    body: (h) => {
      const f = h.fed(2028);
      return `
<h2>The 2028 dates and their rule</h2>
${h.table(['Holiday', 'Falls on', 'Observed by federal offices'], f.map((x) => [x.name, h.dateS(x.actual), x.observed !== x.actual ? `<strong>${h.dateS(x.observed)}</strong>` : 'same day']), `5 U.S.C. 6103, matched to the ${h.src('opm', 'OPM 2028 table')}. New Year's Day: observed date in December 2027.`, ['l', 'r', 'r'])}
<p>The weekday holidays sit on their usual Mondays and on the fourth Thursday of November. Memorial Day, the last Monday of May, can fall anywhere from May 25 to May 31; in 2028 it is May 29. Labor Day, the first Monday of September, can fall from September 1 to 7 and lands on September 4.</p>

<h2>A calendar that favors Mondays</h2>
<p>Because 2028 is a leap year, every fixed date after February moves forward two weekdays compared with 2027. Juneteenth and Christmas move from Saturday to Monday, Independence Day from Sunday to Tuesday. The result is a year with no shifted summer holiday and an unusual number of Monday closures: seven of the eleven holidays are observed on a Monday. The mini-tool under the summary lists every three-day weekend of a year, so you can compare 2028 with any year to 2030.</p>
<p>The Tuesday of July 4 is the awkward one. The ${h.src('nyse', 'New York Stock Exchange')} schedules an early close at 1:00 p.m. Eastern time on Monday, July 3, 2028, and many employers either give the Monday as a floating day or expect people to take leave. Federal offices are open that Monday unless an executive order closes them.</p>

<h2>Banks, markets and the post office in 2028</h2>
<p>The two Saturday holidays split the calendars. On Friday, November 10, federal offices close for Veterans Day but the ${h.src('fed', 'Federal Reserve Banks')} are open, so banks generally work and payments settle; the stock market is open as on every Veterans Day; post offices are open on Friday and closed on Saturday. On Friday, December 31, 2027, federal offices close for New Year's Day 2028, the Reserve Banks open, and the stock market also stays open, because its rule does not move a New Year's Day that falls on a Saturday. Good Friday, ${h.ev('goodfriday', 2028)}, closes the stock market but nothing federal.</p>
<!--tool:open|{"focus":"banks","date":"2028-11-10"}-->

<h2>Election Day and Inauguration Day</h2>
<p>The presidential election of 2028 takes place on the Tuesday after the first Monday of November, fixed by ${h.src('election', '2 U.S.C. 7')}: ${h.ev('election', 2028)}. The countdown and rule are on the ${h.a('election-day', 'Election Day page')}. Inauguration Day, January 20, 2029, is a holiday only for federal employees in the Washington area under subsection (c) of section 6103, and falls in 2029, so it is outside this table.</p>
<p>The earlier years are on the ${h.a('federal-holidays-2027', '2027 page')} and the ${h.a('federal-holidays-2026', '2026 page')}; to count the working days between two 2028 dates, use the ${h.a('business-days', 'business days counter')}.</p>`;
    },
  },
});
