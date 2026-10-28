import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'stock-market-open-today',
  group: 'open',
  order: 53,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'market' } },
  mini: { kind: 'mini:mktday' },
  related: ['stock-market-holidays', 'banks-open-today', 'christmas-eve-closures', 'black-friday', 'easter'],
  sources: ['nyse', 'nasdaq', 'fed'],
  en: {
    slug: 'stock-market-open-today',
    nav: 'Stock market open today?',
    card: 'Whether the NYSE and Nasdaq trade on a date, with the early 1:00 p.m. closes and the reason for each closure.',
    title: 'Stock Market Open Today? NYSE and Nasdaq Hours and Holidays',
    description: 'Is the stock market open today? Any date checked against the NYSE and Nasdaq holiday calendars, with Good Friday, the 1:00 p.m. early closes and weekend rules.',
    h1: 'Is the stock market open today?',
    intro: 'Today in your time zone is already filled in. Pick another date to see whether the NYSE and Nasdaq trade, close early or stay shut.',
    resume: (h) => `The New York Stock Exchange and Nasdaq trade from 9:30 a.m. to 4:00 p.m. Eastern time, Monday to Friday, and both follow the same holiday calendar. It is close to the federal one but not identical. The market stays open on Columbus Day and Veterans Day, when banks and federal offices close, and it closes on Good Friday, which is not a federal holiday, as on ${h.dateW(h.addDays(h.easter(2027), -2))}. A holiday that falls on a Saturday closes the market on the Friday before, and one on a Sunday closes it on the Monday after, with one exception written into the exchange rules: when New Year's Day is a Saturday, no holiday is taken on December 31, so the market trades on ${h.dateW(h.addDays(h.iso('newyear', 2028)!, -1))}. Three days a year can bring an early close at 1:00 p.m.: the day after Thanksgiving, Christmas Eve and the day before Independence Day, when they fall on a trading day. The checker gives the status for any date.`,
    faqs: (h) => [
      { q: 'Is the stock market open on Good Friday?', a: `No. The NYSE and Nasdaq close on Good Friday every year even though it is not a federal holiday, and banks stay open that day. Because it depends on Easter, its date moves: ${h.dateW(h.addDays(h.easter(2026), -2))} in 2026, ${h.dateW(h.addDays(h.easter(2027), -2))} in 2027 and ${h.dateW(h.addDays(h.easter(2028), -2))} in 2028.` },
      { q: 'What time does the market close on early-close days?', a: 'At 1:00 p.m. Eastern time for stocks, instead of 4:00 p.m. Some options and bond markets end at different times on those afternoons, set by their own rules. The early closes fall on the day after Thanksgiving every year, and on July 3 and December 24 when those days are trading days and not themselves holidays.' },
      { q: 'Can I trade before 9:30 a.m. or after 4:00 p.m.?', a: 'Many brokers offer pre-market and after-hours sessions on electronic systems, with lower volume and wider spreads. They follow the exchange holiday calendar, so they are closed on market holidays, and they are usually shortened on early-close days. Which hours are available depends on the broker, which publishes its own schedule.' },
    ],
    body: (h) => `
<h2>Market holidays and early closes, 2026 to 2028</h2>
<p>The exchanges publish their calendar three years ahead on the ${h.src('nyse', 'NYSE')} and ${h.src('nasdaq', 'Nasdaq Trader')} websites. The table is computed from the rules and matches those lists to the day.</p>
${h.table(['Year', 'Market closed', 'Early close at 1:00 p.m.'], [2026, 2027, 2028].map((y) => [String(y), h.plural(h.nyse(y).length, 'day'), h.nyseEarly(y).map((d) => h.dateS(d)).join('; ') || 'none']), 'NYSE and Nasdaq. Full lists on the stock market holidays page.', ['l', 'r', 'l'])}
<p>2026 has ten closed days, 2027 has ten, and 2028 has nine because New Year's Day falls on a Saturday and is not replaced. In 2027 the market closes on Friday, June 18 for Juneteenth and on Friday, December 24 for Christmas, so neither Christmas Eve nor the day before Independence Day brings an early close that year: the only one is the day after Thanksgiving.</p>

<h2>Where the market and the federal calendar differ</h2>
${h.table(['Day', 'Stock market', 'Banks', 'Federal offices'], [
  ['Good Friday', 'closed', 'open', 'open'],
  ['Columbus Day', 'open', 'closed', 'closed'],
  ['Veterans Day', 'open', 'closed', 'closed'],
  ['Holiday on a Saturday', 'closed Friday', 'open Friday', 'closed Friday'],
  ['New Year on a Saturday', 'open Dec 31', 'open Dec 31', 'closed Dec 31'],
  ['Day after Thanksgiving', 'closes 1:00 p.m.', 'open', 'open'],
], 'Rules of the NYSE, the Federal Reserve and OPM.', ['l', 'l', 'l', 'l'])}
<p>The difference matters for settlement. A trade executed on Columbus Day settles one business day later under the current cycle, but the settlement day must be a day the banks are open, so a Monday trade on that holiday settles on Tuesday. On Good Friday, when banks are open and the market is closed, nothing trades but payments move. The ${h.a('banks-open-today', 'banks page')} shows the Federal Reserve side of each date.</p>

<h2>Unscheduled closures</h2>
<p>Exchanges can also close for events that no calendar foresees. They closed for two days in October 2012 because of Hurricane Sandy, and for national days of mourning after the deaths of former presidents, most recently in January 2025. Those closings are announced a few days ahead at most. The checker cannot know about them in advance; when one is announced, it is added to the calendar used by the site. Trading halts on a single stock, or market-wide circuit breakers after a sharp fall, pause trading during a session without making it a holiday.</p>
<!--tool:holidays|{"cal":"nyse","year":2026}-->

<h2>How the checker decides</h2>
<p>For the date you choose, the program first checks the weekend, then the list of market holidays for that year, built from the federal holidays without Columbus Day and Veterans Day, plus Good Friday computed from Easter, with the Saturday and Sunday shifts and the New Year exception. If the date is open, it then checks the early-close list. The reason given under the answer names the rule that applied. For trading in your own time zone, convert the Eastern-time hours: the opening bell rings at 6:30 a.m. in California and the early close comes at 10:00 a.m. there. The full list of each year is on the ${h.a('stock-market-holidays', 'stock market holidays page')}.</p>`,
  },
});
