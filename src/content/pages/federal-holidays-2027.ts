import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'federal-holidays-2027',
  group: 'federal',
  order: 31,
  tool: { kind: 'holidays', props: { cal: 'federal', year: 2027 } },
  mini: { kind: 'mini:observed' },
  related: ['federal-holidays-2026', 'federal-holidays-2028', 'bank-holidays-2027', 'post-office-holidays-2027', 'stock-market-holidays'],
  sources: ['usc6103', 'opm', 'opm_inlieu', 'fed', 'nyse'],
  en: {
    slug: 'federal-holidays-2027',
    nav: 'Federal holidays 2027',
    card: 'Three holidays shift in 2027 and New Year 2028 is observed on December 31: every date as offices, banks and markets keep it.',
    title: 'Federal Holidays 2027: Dates, Weekdays and Observed Days',
    description: 'All federal holidays of 2027 with their weekdays and observed days: Juneteenth on June 18, July 5, Christmas on December 24 and New Year 2028 on December 31.',
    h1: 'Federal holidays 2027, with the observed days',
    intro: 'The table lists the eleven holidays of 2027 as federal offices observe them. Switch the calendar to compare with banks, the stock market and post offices, which shift differently.',
    resume: (h) => {
      const f = h.fed(2027);
      return `The eleven federal holidays of 2027 do not all fall on weekdays, and that is what makes this year's calendar worth checking twice. Juneteenth falls on a Saturday, so federal offices observe it on ${h.dateW(f[4].observed)}. Independence Day falls on a Sunday and is observed on ${h.dateW(f[5].observed)}. Christmas falls on a Saturday and is observed on ${h.dateW(f[10].observed)}. And New Year's Day 2028 is also a Saturday, so its observed day, ${h.dateW(h.fed(2028)[0].observed)}, lands in 2027: federal workers end up with twelve days off inside the 2027 calendar year. The other dates do not move: New Year's Day on ${h.dateS(f[0].observed)}, Martin Luther King Jr. Day on ${h.dateS(f[1].observed)}, Washington's Birthday on ${h.dateS(f[2].observed)}, Memorial Day on ${h.dateS(f[3].observed)}, Labor Day on ${h.dateS(f[6].observed)}, Columbus Day on ${h.dateS(f[7].observed)}, Veterans Day on ${h.dateS(f[8].observed)} and Thanksgiving on ${h.dateS(f[9].observed)}. Banks, the stock market and post offices apply their own versions of the weekend rule, set out below.`;
    },
    faqs: (h) => [
      { q: 'Why are there twelve federal days off in 2027?', a: `Because New Year's Day 2028 falls on a Saturday. The holiday belongs to 2028, but the observed day is the Friday before, ${h.dateW(h.fed(2028)[0].observed)}. Federal workers therefore get both January 1, 2027 and December 31, 2027 off, while the calendar year 2028 contains only ten observed holidays. Leave and payroll systems that count holidays per calendar year need to handle this.` },
      { q: 'Is Juneteenth observed on Friday, June 18, 2027?', a: `For federal employees, yes: ${h.dateW(h.fed(2027)[4].observed)} is the day off, because June 19 is a Saturday. The New York Stock Exchange also closes that Friday. The Federal Reserve Banks stay open on Friday, so payments settle, and post offices close on Saturday, June 19 itself. Juneteenth is one of the holidays on which mail collection continues.` },
      { q: 'What day is Independence Day observed in 2027?', a: `${h.dateW(h.fed(2027)[5].observed)}. July 4, 2027 is a Sunday, and a Sunday holiday moves to the next day under Executive Order 11582 as applied by OPM. On that Monday federal offices, banks, the stock market and post offices are all closed, so it is a simpler case than July 4, 2026, when Saturday split the closures.` },
      { q: 'Are banks closed on Christmas Eve 2027?', a: 'Banks that follow the Federal Reserve calendar are generally open on Friday, December 24, 2027, because the Reserve Banks do not move a Saturday holiday to Friday. Federal offices and the stock market are closed that day, since Christmas falls on Saturday. Post offices are open on Friday and closed on Saturday. Individual banks may still choose to close branches early.' },
    ],
    body: (h) => {
      const f = h.fed(2027), b = h.fedBanks(2027), n = h.nyse(2027), u = h.usps(2027);
      const nyseOn = (d: string) => n.some((x) => x.date === d);
      return `
<h2>Four calendars, one year</h2>
<p>The same eleven holidays produce four different calendars in 2027, because each organization treats weekends its own way. Federal offices follow ${h.src('opm', 'OPM')}: Saturday to Friday, Sunday to Monday. The ${h.src('fed', 'Federal Reserve Banks')} move a Sunday holiday to Monday but stay open on the Friday before a Saturday holiday. The ${h.src('nyse', 'New York Stock Exchange')} closes on the Friday before a Saturday holiday, except New Year's Day, and ignores Columbus Day and Veterans Day. Post offices close on the Saturday itself.</p>
${h.table(['Holiday', 'Federal offices', 'Banks', 'Stock market', 'Post offices'], f.map((x, i) => [x.name, h.dateS(x.observed), b[i].saturday ? 'open (Sat holiday)' : h.dateS(b[i].fedClosed!), x.id === 'columbus' || x.id === 'veterans' ? 'open' : nyseOn(x.observed) ? h.dateS(x.observed) : 'open', h.dateS(u[i].uspsClosed)]), 'Computed by the site, matched to the OPM, Federal Reserve and NYSE lists for 2027.', ['l', 'r', 'r', 'r', 'r'])}
<p>The NYSE also closes on Good Friday, ${h.ev('goodfriday', 2027)}, which is not a federal holiday, and closes early at 1:00 p.m. Eastern time on the day after Thanksgiving. New Year's Day 2028 is the exception to the market's Friday rule: the exchange stays open on December 31, 2027, because its rule does not move a Saturday holiday onto a Friday that ends a monthly or yearly accounting period.</p>

<h2>The weekend rule, step by step</h2>
<p>Subsection (b) of ${h.src('usc6103', '5 U.S.C. 6103')} says that a holiday falling on a Saturday is observed on the Friday before for employees on a Monday-to-Friday schedule. The Sunday case comes from Executive Order 11582, which places the observance on the following Monday. The mini-tool under the summary applies both rules to any holiday and any year from 2026 to 2030. For employees who work other schedules, the ${h.src('opm_inlieu', '"in lieu of" fact sheet')} moves the holiday to the workday before their day off.</p>

<h2>Long weekends of 2027</h2>
<p>The shifts are good news for anyone planning time off. The five Monday holidays produce long weekends as every year. The observed Juneteenth, Christmas and New Year 2028 add three Friday holidays, and the observed Independence Day adds a Monday. New Year's Day 2027 itself is a Friday. Thanksgiving, on Thursday, ${h.ev('thanksgiving', 2027, 'l')}, is a four-day weekend for the many employers who give the Friday after. Veterans Day is the only federal holiday of 2027 that sits in the middle of the week, on a Thursday.</p>
<p>That gives ten three-day weekends or longer anchored on federal holidays, two more than in 2026. Counted in business days, 2027 has fewer working days for federal staff than an ordinary year: the ${h.a('business-days', 'business days counter')} gives the exact figure between any two dates.</p>

<h2>Paydays and deadlines around the shifted days</h2>
<p>Payroll and payment dates often slide when they hit a holiday. When the Federal Reserve is closed, direct deposits and ACH payments do not settle that day, so many employers bring a payday that falls on Monday, July 5, 2027 forward to the Friday before. On Friday, December 24, 2027, by contrast, the Reserve Banks are open and payments move, even though federal offices are closed. Filing deadlines set by federal agencies generally roll to the next business day when they fall on a weekend or a federal holiday; the rules of each agency say which days count.</p>
<p>The ${h.a('federal-holidays-2026', '2026 calendar')} and the ${h.a('federal-holidays-2028', '2028 calendar')} have their own pages, and the bank and post office calendars for 2027 are on ${h.a('bank-holidays-2027', 'bank holidays 2027')} and ${h.a('post-office-holidays-2027', 'post office holidays 2027')}.</p>`;
    },
  },
});
