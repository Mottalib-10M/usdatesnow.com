import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'fourth-of-july',
  group: 'countdown',
  order: 8,
  tool: { kind: 'countdown', props: { event: 'july4' } },
  mini: { kind: 'mini:observed', props: { h: 5 } },
  related: ['federal-holidays-2026', 'federal-holidays-2027', 'post-office-open-today', 'banks-open-today', 'stock-market-holidays'],
  sources: ['usc6103', 'usps_july4', 'fed', 'nyse', 'archives_decl'],
  en: {
    slug: 'fourth-of-july',
    nav: 'Fourth of July',
    card: 'Independence Day counted down live, with the observed day off in 2026 and 2027 and who closes on which day.',
    title: 'Fourth of July 2026: Countdown, Observed Friday and Closures',
    description: 'The Fourth of July 2026 is a Saturday, the 250th anniversary: live countdown, the Friday off for federal staff, how banks, markets and post offices handle it.',
    h1: 'Fourth of July 2026: how many days left?',
    intro: 'Independence Day counted down to midnight in your time zone. Pick 2027 or 2028 for the next ones.',
    resume: (h) => `Independence Day is July 4, one of the eleven legal public holidays of 5 U.S.C. 6103, and in 2026 it marks 250 years since the Declaration of Independence was adopted in 1776. It falls on ${h.ev('july4', 2026)}, and a Saturday holiday is handled differently by each institution. Federal offices close on ${h.dateW(h.fed(2026)[5].observed)}, the day before, under the weekend rule. The New York Stock Exchange and Nasdaq also close that Friday. The Federal Reserve Banks, however, do not shift a Saturday holiday, so banks process payments normally on the Friday. The Postal Service keeps the holiday on the Saturday itself: its operations memo for 2026 closes post offices and suspends regular delivery and collection on July 4, while the Friday is a normal day. In 2027 the Fourth is ${h.ev('july4', 2027)}, so everyone moves it to Monday, July 5, and in 2028 it is a Tuesday, with an early market close on the Monday before.`,
    faqs: (h) => [
      { q: 'Is Friday, July 3, 2026 a day off?', a: 'For federal employees, yes: when a holiday falls on a Saturday, the Office of Personnel Management gives the Friday before. The stock market closes too. Most banks open, because the Federal Reserve does not observe Saturday holidays on the Friday, and post offices open with normal delivery. Private employers decide for themselves; many follow the federal calendar.' },
      { q: 'Why is Independence Day on July 4 and not July 2?', a: 'The Continental Congress voted for independence on July 2, 1776, and John Adams expected that date to be celebrated. But the text of the Declaration was adopted on July 4, and that date was printed on it and on the copies sent to the colonies. Celebrations settled on the Fourth from the first anniversary in 1777.' },
      { q: 'Is the stock market open on July 3?', a: `It depends on the year. In 2026 the market is closed on Friday, July 3, the observed holiday. In 2027 July 3 is a Saturday. In 2028 the exchanges hold a shortened session ending at 1:00 p.m. Eastern time on ${h.date(h.nyseEarly(2028).find((d) => d.endsWith('-07-03'))!)}, the eve of a Tuesday holiday.` },
      { q: 'Is there mail on July 5, 2027?', a: 'No regular delivery. Independence Day 2027 falls on a Sunday, and the Postal Service, like federal offices and banks, observes a Sunday holiday on the Monday after. Post offices close and boxes are not collected that Monday, because the Fourth of July is one of the six widely observed postal holidays. Service resumes on Tuesday.' },
    ],
    body: (h) => `
<h2>Who closes on which day</h2>
${h.table(['', '2026 (Saturday)', '2027 (Sunday)', '2028 (Tuesday)'], [
  ['Federal offices', h.dateS(h.fed(2026)[5].observed), h.dateS(h.fed(2027)[5].observed), h.dateS(h.fed(2028)[5].observed)],
  ['Banks (Federal Reserve)', 'open Friday', h.dateS(h.fedBanks(2027)[5].fedClosed!), h.dateS(h.fedBanks(2028)[5].fedClosed!)],
  ['Stock market', h.dateS(h.nyse(2026).find((x) => x.name === 'Independence Day')!.date), h.dateS(h.nyse(2027).find((x) => x.name === 'Independence Day')!.date), `${h.dateS(h.nyse(2028).find((x) => x.name === 'Independence Day')!.date)}; 1 p.m. close on Mon`],
  ['Post offices', h.dateS(h.usps(2026)[5].uspsClosed), h.dateS(h.usps(2027)[5].uspsClosed), h.dateS(h.usps(2028)[5].uspsClosed)],
], 'Computed from 5 U.S.C. 6103 and the weekend rules of OPM, the Federal Reserve, NYSE and USPS; 2026 checked against the USPS memo of June 2026.', ['l', 'r', 'r', 'r'])}
<p>The year 2026 shows how far apart the rules can be. Federal staff and traders get Friday off. Bank customers see no change on Friday, as the ${h.src('fed', 'Federal Reserve schedule')} notes that its Banks stay open when a holiday falls on a Saturday. The ${h.src('usps_july4', 'Postal Service memo')} for the holiday closes retail units on Saturday, July 4, with no regular delivery and no collection, and treats Friday as a normal workday. The ${h.src('nyse', 'NYSE calendar')} lists Friday, July 3, 2026 as the market holiday.</p>
<!--tool:open|{"focus":"banks","date":"2026-07-03"}-->

<h2>The 250th anniversary</h2>
<p>On July 4, 1776, the Second Continental Congress adopted the final text of the Declaration of Independence, two days after voting for the break with Britain. The engrossed parchment, signed by most delegates on August 2, is kept at the ${h.src('archives_decl', 'National Archives')} in Washington. The year 2026 is therefore the semiquincentennial, and a federal commission has been preparing commemorations across the country. Two of the signers who later became president, John Adams and Thomas Jefferson, both died on July 4, 1826, the fiftieth anniversary.</p>
<p>Congress first made the Fourth a holiday for federal employees in the District of Columbia in 1870, together with New Year's Day, Thanksgiving and Christmas. Today it is listed in ${h.src('usc6103', '5 U.S.C. 6103')} and kept by every state.</p>

<h2>Long weekends and fireworks</h2>
<p>Because the date is fixed, the Fourth makes a long weekend only when it falls on a Friday, a Saturday, a Sunday or a Monday. In 2026 the long weekend runs Friday to Sunday for federal staff; in 2027 Saturday to Monday. A Tuesday or Thursday Fourth, as in 2028, tempts many people to take the day between as leave. Public fireworks are usually held on the evening of July 4 itself, whatever the weekday, but some cities move them to the nearest weekend: check your city's announcement.</p>
<p>The mini-tool under the summary shows the observed day of any federal holiday for 2026 to 2030, with the reason for the shift, and the ${h.a('federal-holidays-2026', 'federal holidays of 2026')} and ${h.a('federal-holidays-2027', '2027')} list all eleven.</p>
<h2>Mail, payments and deadlines around the Fourth</h2>
<p>A payment due on a day banks close is usually processed on the next business day. In 2026 the Friday is a normal banking day, so direct deposits scheduled for July 3 arrive on time, but brokerage accounts see no trading that day. In 2027 the closure moves to Monday, July 5, for banks, markets, federal offices and post offices alike, so anything due that Monday slides to Tuesday. For a delivery that must arrive before the holiday weekend, the business days line in the countdown above already leaves out the observed federal holiday; for any other range of dates, the ${h.a('business-days', 'business days counter')} does the same calculation.</p>`,
  },
});
