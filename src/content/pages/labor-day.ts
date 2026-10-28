import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'labor-day',
  group: 'federal',
  order: 35,
  tool: { kind: 'countdown', props: { event: 'labor' } },
  mini: { kind: 'mini:nthrule' },
  related: ['memorial-day', 'federal-holidays-2027', 'post-office-open-today', 'stock-market-open-today', 'first-day-of-winter'],
  sources: ['usc6103', 'opm', 'usps_pom', 'nyse'],
  en: {
    slug: 'labor-day',
    nav: 'Labor Day',
    card: 'The first Monday of September: the 2027 and 2028 dates, a live countdown and what closes on the last long weekend of summer.',
    title: 'Labor Day 2027: Date, Countdown and What Is Closed',
    description: 'Labor Day falls on Monday, September 6, 2027 and September 4, 2028: a live countdown, the first-Monday rule, its 1894 origin and which offices and markets shut.',
    h1: 'When is Labor Day 2027?',
    intro: 'The countdown shows the next Labor Day; switch the year to compare. The day is always the first Monday of September, so it moves between September 1 and 7.',
    resume: (h) => `Labor Day is the first Monday in September under 5 U.S.C. 6103, which makes it one of the five federal holidays that always produce a three-day weekend. It fell on ${h.ev('labor', 2026)}, and it comes next on ${h.ev('labor', 2027)}, then on ${h.ev('labor', 2028)}. Because the rule picks a weekday rather than a date, the holiday can only land between September 1 and September 7: the earliest case happens when September begins on a Monday, the latest when September begins on a Tuesday. Congress made the day a national holiday in 1894, after several states had already adopted it to honor working people. On Labor Day, federal offices close, the Federal Reserve Banks close so most banks do not process payments, the New York Stock Exchange and Nasdaq do not trade, and post offices close with no regular delivery and no collection from blue boxes, since the Postal Service counts Labor Day among its six widely observed holidays. The weekend is commonly treated as the end of summer.`,
    faqs: (h) => [
      { q: 'What is the earliest and latest date Labor Day can fall on?', a: `September 1 at the earliest and September 7 at the latest. The first Monday of a month always falls in its first seven days. Labor Day ${h.ev('labor', 2028, 'l')} is near the early end; the next time it falls on September 1 is in 2031, and the next September 7 after 2026 is in 2037. The mini-tool shows the date for any year.` },
      { q: 'Is the mail delivered on Labor Day?', a: 'No regular delivery and no pickups from blue collection boxes: Labor Day is one of the six holidays the Postal Service lists as widely observed, on which offices close and collection is suspended. Priority Mail Express and some package services can still be delivered. Normal service resumes on Tuesday, when the backlog from Monday is usually cleared within a day.' },
      { q: 'Does the stock market trade on Labor Day?', a: 'No. The New York Stock Exchange and Nasdaq are closed all day, and the bond market follows the same calendar. There is no early close on the Friday before Labor Day in the exchange rules, unlike the day after Thanksgiving. Trades made on the Friday settle on Tuesday, since Monday is not a business day for clearing.' },
      { q: 'Why is Labor Day in September and not on May 1?', a: 'The United States set its day for workers before May 1 became International Workers\' Day elsewhere, and the September date already existed in state laws when Congress acted in 1894. A first Monday also ensured a long weekend. Canada shares the first Monday of September, while most of the world marks May 1.' },
    ],
    body: (h) => `
<h2>Labor Day from 2026 to 2032</h2>
${h.table(['Year', 'Labor Day', 'Days before the fall equinox'], [2026, 2027, 2028, 2029, 2030, 2031, 2032].map((y) => [String(y), h.ev('labor', y, 's'), h.days(h.iso('labor', y)!, h.iso('fall', y)!)]), 'First Monday of September, 5 U.S.C. 6103.', ['l', 'r', 'r'])}
<p>The column on the right shows how much of astronomical summer is left after the holiday: Labor Day comes about two to three weeks before the fall equinox, so the long weekend is treated as the unofficial close of summer while the season itself runs on until late September.</p>

<h2>The first-Monday rule</h2>
<p>Section 6103 of title 5 lists the holiday as "Labor Day, the first Monday in September". Since a Monday holiday cannot fall on a weekend, Labor Day never moves for federal workers and never splits the calendars of banks, markets and post offices: all of them close on the same Monday. The mini-tool under the summary applies the same kind of rule to the other Monday holidays, so you can check Labor Day against Memorial Day or Columbus Day for any year.</p>
<p>The earliest possible date, September 1, occurs when September starts on a Monday, as in 2025 and again in 2031. The latest, September 7, occurs when September starts on a Tuesday, as in 2026. Between them the date steps back one day each ordinary year and two days after a leap year, then jumps forward a week.</p>

<h2>What closes on Labor Day</h2>
<p>Labor Day closes everything that runs on the federal calendar. Federal offices and courts close. The Federal Reserve Banks close, so wire transfers, direct deposits and ACH payments scheduled for the Monday move to Tuesday. The ${h.src('nyse', 'New York Stock Exchange')} and Nasdaq close. For the Postal Service, Labor Day is in the list of widely observed holidays of the ${h.src('usps_pom', 'Postal Operations Manual')}: retail counters close, there is no regular delivery and the blue boxes are not collected.</p>
<!--tool:open|{"focus":"post","date":"2027-09-06"}-->
<p>Most state and local government offices and public schools close as well; private employers decide for themselves. Retail stores and restaurants generally open, often with sales, but their hours vary by store and this site does not list them.</p>

<h2>A holiday older than most</h2>
<p>Workers' parades in New York in the early 1880s gave rise to the idea, and Oregon passed the first state law recognizing Labor Day in 1887. By 1894 about two dozen states observed it, and Congress made it a holiday for federal employees in an act signed on June 28 of that year. The date has never changed since: Labor Day was already on a Monday long before the Uniform Monday Holiday Act moved other holidays there in 1971.</p>
<p>The next Monday holiday after Labor Day is Columbus Day in October; the one before it is Memorial Day, covered on the ${h.a('memorial-day', 'Memorial Day page')}. The full list for the coming year is on ${h.a('federal-holidays-2027', 'federal holidays 2027')}.</p>`,
  },
});
