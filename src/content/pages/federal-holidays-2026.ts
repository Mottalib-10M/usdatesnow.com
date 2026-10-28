import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'federal-holidays-2026',
  group: 'federal',
  order: 30,
  tool: { kind: 'holidays', props: { cal: 'federal', year: 2026 } },
  mini: { kind: 'mini:holidaycount' },
  related: ['federal-holidays-2027', 'bank-holidays-2026', 'fourth-of-july', 'business-days', 'veterans-day-closures'],
  sources: ['usc6103', 'opm', 'opm_inlieu', 'archives_decl'],
  en: {
    slug: 'federal-holidays-2026',
    nav: 'Federal holidays 2026',
    card: 'The eleven days of 2026 with their weekday, the one that moves (July 4) and the holidays still to come.',
    title: 'Federal Holidays 2026: All 11 Dates and the Ones Left',
    description: 'The eleven federal holidays of 2026 with their weekdays, the July 3 observed day for the 250th Fourth of July, the ones still ahead and a calendar to download.',
    h1: 'Federal holidays 2026: the eleven dates',
    intro: 'The next holiday is in large type; the table lists the whole year as federal offices observe it. Switch the calendar to see banks, the stock market or post offices.',
    resume: (h) => {
      const f = h.fed(2026);
      return `The United States has eleven federal holidays in 2026, all set by 5 U.S.C. 6103 and published by the Office of Personnel Management. Five fall on a fixed date: New Year's Day on ${h.dateW(f[0].actual)}, Juneteenth on ${h.dateW(f[4].actual)}, Independence Day on ${h.dateW(f[5].actual)}, Veterans Day on ${h.dateW(f[8].actual)} and Christmas on ${h.dateW(f[10].actual)}. Six are tied to a weekday of the month: Martin Luther King Jr. Day on ${h.dateS(f[1].observed)}, Washington's Birthday on ${h.dateS(f[2].observed)}, Memorial Day on ${h.dateS(f[3].observed)}, Labor Day on ${h.dateS(f[6].observed)} and Columbus Day on ${h.dateS(f[7].observed)} and Thanksgiving on ${h.dateW(f[9].observed)}. Only one holiday changes day for federal workers this year: July 4, the 250th anniversary of the Declaration of Independence, is a Saturday, so the day off is ${h.dateW(f[5].observed)}. Every other holiday is a weekday, which gives eight three-day weekends: five Mondays and three Fridays, with Juneteenth, July 3 and Christmas.`;
    },
    faqs: (h) => [
      { q: 'Which federal holiday is observed on a different day in 2026?', a: `Only Independence Day. July 4, 2026 is a Saturday, so employees on a Monday-to-Friday schedule take ${h.dateW(h.fed(2026)[5].observed)} instead, as 5 U.S.C. 6103(b) provides. The stock market also closes on that Friday. Post offices open normally on Friday and close on Saturday, July 4, and the Federal Reserve Banks stay open both days because they never move a Saturday holiday.` },
      { q: 'How many three-day weekends are there in 2026?', a: 'Eight if you count every holiday that sits next to a weekend: the five Monday holidays, plus Juneteenth, the July 3 observance of Independence Day and Christmas, which all fall on a Friday. New Year\'s Day and Thanksgiving are Thursdays and Veterans Day a Wednesday, so they make a long weekend only if an employer adds the Friday.' },
      { q: 'Do private employers have to give federal holidays off in 2026?', a: 'No. Section 6103 governs federal employees and the federal government\'s own offices. Private employers decide which days to give, whether they are paid and whether working them earns extra pay, unless a contract, a union agreement or a state law says otherwise. Most large employers follow six or seven of the eleven days, usually the widely observed ones.' },
      { q: 'Could an extra federal holiday be added in 2026?', a: 'A new permanent holiday needs an act of Congress, as Juneteenth did in 2021. The President can, however, close executive departments for a day by executive order, which has happened around Christmas in several years, most recently on December 24 and 26, 2025. Such an order gives a day off but does not create a legal holiday; this page adds it when one is signed.' },
    ],
    body: (h) => {
      const f = h.fed(2026);
      return `
<h2>The 2026 calendar of federal holidays</h2>
${h.table(['Holiday', 'Date', 'Rule'], f.map((x, i) => [x.name, x.observed !== x.actual ? `${h.dateS(x.observed)} (falls ${h.dateS(x.actual)})` : h.dateS(x.observed), ['January 1', 'third Monday of January', 'third Monday of February', 'last Monday of May', 'June 19', 'July 4', 'first Monday of September', 'second Monday of October', 'November 11', 'fourth Thursday of November', 'December 25'][i]]), `5 U.S.C. 6103; dates identical to the ${h.src('opm', 'OPM table for 2026')}.`, ['l', 'r', 'l'])}
<p>The calendar of 2026 is unusually regular. Three of the five fixed-date holidays fall on a Thursday or a Friday, and the weekday holidays are all where the Uniform Monday Holiday Act of 1968 put them. The year opens on a Thursday, so the first full working week starts on January 5.</p>

<h2>July 3, 2026 and the 250th anniversary</h2>
<p>The Declaration of Independence, adopted on July 4, 1776, turns 250 in 2026. The date of the holiday does not change for the anniversary, but its weekday matters: July 4 is a Saturday. Under the rule in subsection (b) of ${h.src('usc6103', 'section 6103')}, when a holiday falls on a Saturday, the Friday before is treated as the holiday for pay and leave purposes. ${h.src('opm', 'OPM')} therefore lists Independence Day 2026 as observed on ${h.dateW(f[5].observed)}.</p>
<p>The other calendars do not all follow. The ${h.a('stock-market-holidays', 'stock market')} closes on Friday, July 3. The Federal Reserve Banks stay open on Friday because they never observe a Saturday holiday on the day before, so ${h.a('bank-holidays-2026', 'bank payments')} move as usual. Post offices work normally on the Friday and close on Saturday, July 4, according to the Postal Service operations memo for the holiday. A worker paid by a private employer gets whatever day the employer chooses, often the Friday.</p>
<!--tool:open|{"focus":"federal","date":"2026-07-03"}-->

<h2>Holidays left after today</h2>
<p>The mini-tool under the summary counts the federal holidays still ahead from any date, and the table above greys out those already past. By late October 2026, three remain: Veterans Day on a Wednesday, Thanksgiving on November 26 and Christmas on a Friday. The ${h.a('business-days', 'business days counter')} removes them from any count of working days, which matters for year-end deadlines expressed in business days.</p>

<h2>Workers who are not on a Monday-to-Friday week</h2>
<p>The Saturday and Sunday rule is written for employees whose basic week runs Monday to Friday. For others, the ${h.src('opm_inlieu', 'OPM "in lieu of" fact sheet')} explains how the holiday moves: when it falls on one of their regular days off, the workday immediately before becomes the holiday, or, if it falls on a Sunday non-workday, the next workday. These rules govern federal pay; state and private schedules have their own.</p>

<h2>Where to look beyond 2026</h2>
<p>The observed dates for the next years are on the ${h.a('federal-holidays-2027', '2027 page')}, which has three weekend shifts and a New Year's Day observed in December, and on the ${h.a('federal-holidays-2028', '2028 page')}. The list of holidays itself has not changed since Juneteenth was added on June 17, 2021.</p>`;
    },
  },
});
