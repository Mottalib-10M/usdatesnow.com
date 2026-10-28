import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'bank-holidays-2027',
  group: 'open',
  order: 58,
  demarche: true,
  tool: { kind: 'holidays', props: { cal: 'fed', year: 2027 } },
  mini: { kind: 'mini:holidaycount' },
  related: ['bank-holidays-2026', 'banks-open-today', 'federal-holidays-2027', 'stock-market-holidays', 'christmas-eve-closures'],
  sources: ['fed', 'usc6103', 'opm', 'nyse'],
  en: {
    slug: 'bank-holidays-2027',
    nav: 'Bank holidays 2027',
    card: 'Nine Federal Reserve closing days in 2027, three Saturday holidays that keep banks open on Friday, and the paydays they affect.',
    title: 'Bank Holidays 2027: Federal Reserve Dates and Saturday Rules',
    description: 'Bank holidays 2027: nine Federal Reserve closing days, why banks open on June 18, December 24 and December 31 while federal offices close, and long weekends.',
    h1: 'Bank holidays 2027',
    intro: 'The calendar lists the 2027 closing days of the Federal Reserve Banks with notes on the Saturday holidays. Save it to your calendar or compare with the federal or stock market lists.',
    resume: (h) => {
      const c = h.fedBanks(2027).filter((x) => x.fedClosed);
      return `The Federal Reserve Banks close on nine days in 2027: ${c.map((x) => h.dateS(x.fedClosed!)).join('; ')}. That is two fewer than the eleven federal holidays, because Juneteenth falls on Saturday, June 19 and Christmas on Saturday, December 25, and the Federal Reserve does not replace a Saturday holiday with the Friday before. A third Saturday holiday sits right after the year: New Year's Day 2028. Each of those three Fridays, June 18, December 24 and December 31, 2027, is a full business day for payments, while federal employees have the day off and the stock market is closed on the first two. Independence Day falls on a Sunday, so the banks close on Monday, July 5. Most banks follow this calendar because checks, ACH transfers and wires settle through the Reserve Banks. The table tool can switch to the federal or stock market calendar to compare the same weeks.`;
    },
    faqs: (h) => [
      { q: 'Are banks open on December 31, 2027?', a: 'Yes, for payments. New Year\'s Day 2028 falls on a Saturday, and the Federal Reserve Banks stay open on the Friday before a Saturday holiday. The stock market is also open that Friday, because the exchanges never take a New Year holiday on December 31. Federal offices, however, observe New Year\'s Day 2028 on Friday, December 31, 2027 and close.' },
      { q: 'How many bank holidays are there in 2027?', a: `Nine. The eleven federal holidays minus Juneteenth and Christmas, which fall on a Saturday. The first is New Year's Day on ${h.ev('newyear', 2027, 'l')} and the last is Thanksgiving on ${h.ev('thanksgiving', 2027, 'l')}. After Thanksgiving there is no further Federal Reserve closing day in 2027, which is unusual for the end of December.` },
      { q: 'Is my paycheck delayed by the 2027 holidays?', a: 'Rarely, because employers send payroll so that it settles before a closing day. The Fridays before Juneteenth and Christmas are business days for the Federal Reserve, so a Friday payday on June 18 or December 24, 2027 should settle normally even though federal offices are closed. A payday on Monday, July 5 usually moves to Friday, July 2.' },
    ],
    body: (h) => `
<h2>The 2027 Federal Reserve calendar</h2>
${h.table(['Holiday', 'Falls on', 'Banks closed', 'Federal offices closed'], h.fedBanks(2027).map((x, i) => [x.name, h.dateS(x.actual), x.fedClosed ? h.dateS(x.fedClosed) : 'none (Saturday)', h.dateS(h.fed(2027)[i].observed)]), 'Federal Reserve schedule and OPM observed dates for 2027.', ['l', 'r', 'r', 'r'])}
<p>The two right-hand columns show where the Federal Reserve and the ${h.src('opm', 'Office of Personnel Management')} part ways. On a Sunday holiday they agree on the Monday. On a Saturday holiday, OPM gives federal staff the Friday, while the ${h.src('fed', 'Federal Reserve')} keeps its Banks open that Friday and closes only its Board of Governors in Washington.</p>

<h2>Three Fridays that are business days for banks</h2>
${h.table(['Friday', 'Reason', 'Banks', 'Stock market', 'Federal offices'], [
  [h.dateS(h.fed(2027)[4].observed), 'Juneteenth on Saturday', 'open', 'closed', 'closed'],
  [h.dateS(h.fed(2027)[10].observed), 'Christmas on Saturday', 'open', 'closed', 'closed'],
  [h.dateS(h.fed(2028)[0].observed), "New Year's Day 2028 on Saturday", 'open', 'open', 'closed'],
], 'Federal Reserve, NYSE and OPM rules applied to the three Saturday holidays.', ['r', 'l', 'l', 'l', 'l'])}
<p>For a business that pays suppliers or staff, these Fridays matter. Payments move, so there is no need to send them a day early, but the ${h.src('nyse', 'stock market')} is shut on the first two, so securities trades do not execute. Federal agencies are closed on all three, which affects anything requiring a government office that day.</p>

<h2>Long banking weekends in 2027</h2>
<p>Seven closing days touch a weekend in 2027: New Year's Day on a Friday, Martin Luther King Jr. Day, Presidents' Day, Memorial Day, Labor Day and Columbus Day on Mondays, and Independence Day observed on Monday, July 5. That makes seven three-day banking weekends. Veterans Day falls on a Thursday and Thanksgiving on the Thursday two weeks later; the Friday after Thanksgiving is a normal business day. Christmas week, unusually, has no bank closing at all, because Christmas Day is a Saturday.</p>
<!--tool:holidays|{"cal":"federal","year":2027}-->

<h2>Planning deposits and transfers</h2>
<p>An ACH transfer started after the cut-off on the Thursday before a Monday closing settles on Tuesday. A wire request made on the holiday itself is executed on the next business day. When a bill falls due on a closing day, schedule it on the business day before to stay safe. Card payments, ATMs and instant payment networks that run around the clock are not affected by the calendar. The mini-tool under the summary counts how many federal holidays are left in any year, and the ${h.a('banks-open-today', 'banks checker')} answers for one date at a time.</p>
<p>Some banks open branches on Columbus Day or Veterans Day, or close for a state holiday; those choices are theirs to announce. The ${h.a('bank-holidays-2026', '2026 list')} is on its own page.</p>`,
  },
});
