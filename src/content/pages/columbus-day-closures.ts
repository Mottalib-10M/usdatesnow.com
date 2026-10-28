import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'columbus-day-closures',
  group: 'open',
  order: 55,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'mail', date: '2027-10-11' } },
  mini: { kind: 'mini:nthrule', props: { h: 4 } },
  related: ['mail-delivery-today', 'banks-open-today', 'veterans-day-closures', 'federal-holidays-2027', 'stock-market-holidays'],
  sources: ['usc6103', 'usps_columbus', 'fed', 'nyse'],
  en: {
    slug: 'columbus-day-closures',
    nav: "Columbus Day: what is closed",
    card: "Mail, post offices, banks and the market on the second Monday of October, also observed as Indigenous Peoples' Day.",
    title: 'Columbus Day 2027 Closures: Mail, Banks, Post Office, Market',
    description: "Columbus Day 2027 is Monday, October 11: no mail delivery, post offices and banks closed, boxes still collected, stock market open. The rule and 2026 to 2030.",
    h1: "What is closed on Columbus Day 2027?",
    intro: 'The checker opens on Monday, October 11, 2027. Change the date to look at Columbus Day 2026 or 2028 or at the days around it.',
    resume: (h) => `Columbus Day is the second Monday of October, so it always makes a three-day weekend: ${h.ev('columbus', 2027)} next year, after ${h.ev('columbus', 2026)} this year. It has been fixed on that Monday since 1971, and many states, cities and schools now observe the same Monday as Indigenous Peoples' Day, which was also proclaimed by the President each year from 2021 to 2024. The federal statute still calls the day Columbus Day. Federal offices close. The Federal Reserve Banks close, so most banks close and transfers do not settle. Post offices close and there is no regular delivery, but Columbus Day is one of the holidays the Postal Service does not treat as widely observed, so blue collection boxes are emptied and the mail keeps moving. The stock market is open with normal hours. Many private employers, and a growing number of states, do not give the day off, one reason this holiday causes more questions than most.`,
    faqs: (h) => [
      { q: 'Is Columbus Day the same as Indigenous Peoples\' Day?', a: 'They fall on the same Monday. The federal holiday in the statute is Columbus Day. Since 2021 presidents have issued proclamations for both, and many states and cities have renamed or added a holiday as Indigenous Peoples\' Day, with or without closing offices. Federal closures do not change with the name: federal offices, banks and post offices close either way.' },
      { q: 'Is there mail on Columbus Day?', a: `No regular delivery: it is a postal holiday and carriers do not run their routes. Collection is different. The Postal Service operations memo for the holiday keeps collections going because many businesses work, so a letter posted in a blue box on ${h.ev('columbus', 2027, 'l')} is picked up that day and starts moving. Delivery resumes on Tuesday.` },
      { q: 'Which states do not observe Columbus Day?', a: 'State law varies and changes often. Several states have no state holiday that day, some observe Indigenous Peoples\' Day instead, and others keep Columbus Day. A state closure affects state offices and often public schools, not federal offices or the Postal Service, which follow the federal calendar wherever they are. The official calendar of your state government gives the current answer.' },
    ],
    body: (h) => `
<h2>Columbus Day dates and closures, 2026 to 2030</h2>
${h.table(['Year', 'Columbus Day', 'Post offices', 'Banks', 'Stock market'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('columbus', y, 's'), 'closed, boxes emptied', 'closed', 'open']), 'Second Monday of October under 5 U.S.C. 6103. Possible dates run from October 8 to 14.', ['l', 'r', 'l', 'l', 'l'])}
<p>Because the holiday is defined as a Monday, it never moves for a weekend and never needs an observed day. The mini-tool under the summary applies the same kind of rule to the other Monday holidays for any year.</p>

<h2>Mail on Columbus Day: delivery stops, collection runs</h2>
<p>Columbus Day is a postal holiday, so counters are closed and letters are not delivered. The ${h.src('usps_columbus', 'Postal Service operations memo for the holiday')} nonetheless keeps collection going: the manual counts Columbus Day among the national holidays that are not widely observed, because a large share of businesses work that day and keep posting mail. Collected mail is processed so that it can be delivered from Tuesday.</p>
<p>The practical effect on timing is smaller than on a widely observed holiday. A letter dropped in a box on the Friday evening before the long weekend is picked up on Saturday or Monday rather than waiting until Tuesday, as it would before Labor Day. Priority Mail Express is delivered on the holiday as on every day of the year.</p>

<h2>Banks, payments and the stock market</h2>
<p>The ${h.src('fed', 'Federal Reserve')} observes Columbus Day, so ACH transfers and checks do not settle on the Monday. Some banks keep branches open because many customers work, but the payment does not move until Tuesday. The ${h.src('nyse', 'NYSE and Nasdaq')} remain open with regular hours, which makes Columbus Day one of the two Mondays a year when stocks trade while banks are closed. A trade made that day settles on Tuesday, the next day the banks are open.</p>
<!--tool:holidays|{"cal":"usps","year":2026}-->

<h2>Schools, state offices and employers</h2>
<p>Federal law sets holidays for federal employees and, by extension, the institutions that follow the federal calendar. State offices, public schools and private businesses follow their own rules. In practice, Columbus Day is the federal holiday least often given by private employers, along with Veterans Day. If you are not sure whether your office, your child's school or a local government counter is open, the calendar published by that employer, district or state is the reference. The ${h.a('federal-holidays-2027', 'federal holidays 2027 page')} shows Columbus Day among the other ten, and the ${h.a('veterans-day-closures', 'Veterans Day page')} covers the next postal holiday of the same kind a month later.</p>

<h2>A holiday with two names</h2>
<p>Columbus Day has been a federal holiday since 1937, after a first national celebration proclaimed for the 400th anniversary in 1892, and it became a Monday holiday in 1971 under the Uniform Monday Holiday Act. Since then the name has been debated, and presidential proclamations from 2021 to 2024 also marked the same date as Indigenous Peoples' Day. This site uses both names for the second Monday of October and keeps the statute's title where the law is quoted.</p>`,
  },
});
