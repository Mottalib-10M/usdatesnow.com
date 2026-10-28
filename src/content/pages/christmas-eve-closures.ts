import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'christmas-eve-closures',
  group: 'open',
  order: 56,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'market', date: '2026-12-24' } },
  mini: { kind: 'mini:weekends' },
  related: ['days-until-christmas', 'stock-market-holidays', 'post-office-open-today', 'banks-open-today', 'federal-holidays-2027'],
  sources: ['nyse', 'fed', 'opm', 'eo2025', 'usps_xmas'],
  en: {
    slug: 'christmas-eve-closures',
    nav: 'Christmas Eve: what is open',
    card: 'The 1:00 p.m. market close, banks, post offices and federal offices on December 24, and why 2027 is a special case.',
    title: 'Christmas Eve 2026 Hours: Stock Market, Banks, Post Office',
    description: 'Christmas Eve, Thursday, December 24, 2026: the market closes at 1:00 p.m. ET, banks and post offices open, federal offices open unless an order says otherwise.',
    h1: 'What is open on Christmas Eve 2026?',
    intro: 'The checker opens on December 24, 2026. Move to December 24, 2027 to see the very different picture of next year.',
    resume: (h) => `Christmas Eve is not a federal holiday. On ${h.ev('christmaseve', 2026)}, federal offices, banks and post offices therefore open as on any Thursday, and the stock market trades but closes early, at 1:00 p.m. Eastern time, as it does every year when December 24 is a trading day. Some branches and post offices shorten their hours by local decision, which is common but not set by any national rule. The exception comes from the President, who can close federal agencies by executive order: Executive Order 14371 gave federal employees December 24 and December 26, 2025 off, and earlier presidents did the same in several years. No order covers 2026 at the time of writing. In 2027 the picture changes completely because Christmas falls on a Saturday: federal offices and the stock market close on ${h.ev('christmaseve', 2027)} for the observed holiday, while banks stay open under the Federal Reserve rule and post offices keep normal hours, closing instead on Saturday.`,
    faqs: (h) => [
      { q: 'Is Christmas Eve a federal holiday?', a: 'No. Section 6103 of title 5 lists Christmas Day only. Christmas Eve becomes a day off for federal employees in two cases: when it is the observed day of a Saturday Christmas, as in 2027, or when the President closes agencies by executive order, as was done for 2025. Private employers decide for themselves, and many give a half day or a full day.' },
      { q: 'What time does the stock market close on Christmas Eve 2026?', a: `At 1:00 p.m. Eastern time, which is 10:00 a.m. in California. ${h.dateW(h.nyseEarly(2026).find((d) => d.endsWith('12-24'))!)} is one of the two early closes of 2026 on the NYSE calendar, with the day after Thanksgiving. The market is then closed on Christmas Day and reopens on Monday, December 28.` },
      { q: 'Are banks open on Christmas Eve 2027?', a: `Payments settle and most banks open. Christmas 2027 is a Saturday, and the Federal Reserve Banks do not move a Saturday holiday to Friday, so ${h.dateW(h.iso('christmaseve', 2027)!)} is a business day for them. Federal offices and the stock market, by contrast, are closed that Friday. Branch hours remain the choice of each bank.` },
    ],
    body: (h) => `
<h2>December 24 in 2026, 2027 and 2028</h2>
${h.table(['', '2026', '2027', '2028'], [
  ['Weekday', h.ev('christmaseve', 2026, 'wd'), h.ev('christmaseve', 2027, 'wd'), h.ev('christmaseve', 2028, 'wd')],
  ['Stock market', 'closes 1:00 p.m.', 'closed (Christmas observed)', 'closed (Sunday)'],
  ['Banks (Federal Reserve)', 'open', 'open', 'closed (Sunday)'],
  ['Federal offices', 'open', 'closed (Christmas observed)', 'closed (Sunday)'],
  ['Post offices', 'open', 'open', 'mostly closed (Sunday)'],
], 'Computed from the NYSE calendar, the Federal Reserve schedule, the OPM weekend rule and the Postal Service Saturday rule.', ['l', 'r', 'r', 'r'])}
<p>Each of the three years shows a different case. In 2026 the only national change is the early close of the market. In 2027 the observed federal holiday lands on Christmas Eve, so it is the day off for federal workers and traders, but not for banks or postal workers. In 2028 Christmas Eve is a Sunday, and Christmas on Monday closes everything the next day.</p>

<h2>The early close of the stock market</h2>
<p>The ${h.src('nyse', 'NYSE calendar')} lists Christmas Eve as an early close at 1:00 p.m. when it falls on a trading day and is not itself a holiday. The same applies to Nasdaq. Volume is usually low and many desks are thinly staffed. Bond markets follow their own recommended early close, typically at 2:00 p.m. Eastern time. The checker above shows the market status for any date, and the ${h.a('stock-market-holidays', 'stock market holidays page')} lists every early close through 2028.</p>

<h2>Federal offices and executive orders</h2>
<p>Federal employees work on Christmas Eve unless it is the observed holiday or an executive order closes agencies. Such orders have been signed in a number of recent years, usually a few weeks before, and sometimes cover the day after Christmas as well; the most recent, ${h.src('eo2025', 'Executive Order 14371')}, closed agencies on December 24 and 26, 2025. Essential services keep operating under those orders, and the ${h.src('opm', 'Office of Personnel Management')} publishes guidance when one is signed. This site adds such a day to its calendar on the day the order is published and does not guess in advance.</p>
<!--tool:countdown|{"event":"christmaseve"}-->

<h2>Post offices and last mailing dates</h2>
<p>Post offices open on Christmas Eve, often with crowds, and some close early locally. Mail is delivered and collected as usual. For a card or parcel to reach someone before Christmas Day, the recommended dates have already passed by then: the ${h.src('usps_xmas', 'Postal Service list for 2026')} gives ${h.dateW(h.P.usps.xmasMailBy2026.priorityExpress)} as the last day for Priority Mail Express within the contiguous states. Christmas Day itself is a widely observed postal holiday, with no delivery and no collection. In 2027 the post office closes on Saturday, December 25, not on Friday.</p>

<h2>Shops, restaurants and other services</h2>
<p>Store, restaurant and pharmacy hours on Christmas Eve are set by each business and often change from year to year, so this site does not list them. Public transit systems usually run a modified schedule announced locally, and parking rules in many cities follow the holiday timetable only on Christmas Day itself. For the time left before the holiday itself, the ${h.a('days-until-christmas', 'Christmas countdown')} runs live in your time zone, and the mini-tool under the summary counts the weekends left from any date.</p>`,
  },
});
