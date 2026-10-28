import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mail-delivery-today',
  group: 'open',
  order: 51,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'mail' } },
  mini: { kind: 'mini:observed' },
  related: ['post-office-open-today', 'post-office-holidays-2027', 'veterans-day-closures', 'columbus-day-closures', 'business-days'],
  sources: ['usps_pom', 'usps_july4', 'usps_columbus', 'usps_juneteenth'],
  en: {
    slug: 'mail-delivery-today',
    nav: 'Mail delivery today?',
    card: 'Whether letters and packages are delivered on a holiday, a Saturday or a Sunday, and whether your mailbox letters are picked up.',
    title: 'Mail Delivery Today: Holidays, Saturdays and Sundays Rules',
    description: 'Is there mail today? Letter and package delivery on holidays, Saturdays and Sundays, which blue boxes are emptied, and the delay a long weekend adds to letters.',
    h1: 'Is there mail delivery today?',
    intro: 'The checker opens on today in your time zone. Pick any date to see whether letters are delivered, whether packages may still come and whether boxes are collected.',
    resume: (h) => `Regular mail is delivered Monday to Saturday and stops on the eleven federal holidays. On those days letter carriers stay home, but some items still move: Priority Mail Express, which the Postal Service delivers every day of the year, and in many areas packages for large retailers that are handled on Sunday routes. On Sunday there is no letter delivery at all. The question that changes from one holiday to the next is whether the mail you post is picked up. On the six widely observed holidays, New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving and Christmas, blue boxes are not emptied. On Martin Luther King Jr. Day, Presidents' Day, Juneteenth, Columbus Day and Veterans Day they are, even though nothing is delivered. When a holiday falls on a Saturday, as Christmas does on ${h.ev('christmas', 2027)}, the Postal Service observes it on that Saturday, so mail is delivered as usual the day before.`,
    faqs: (h) => [
      { q: 'Is mail delivered on Saturday?', a: 'Yes. Letters and packages are delivered on Saturday on regular routes across the country, and collection boxes are emptied on Saturday too, usually earlier in the day than on weekdays. The only Saturdays without regular delivery are federal holidays that fall on a Saturday, which the Postal Service observes on the day itself instead of moving them to Friday.' },
      { q: 'Do packages come on Sunday?', a: 'In many areas, yes, but not letters. The Postal Service runs Sunday routes for packages, mostly for a few large shippers, and delivers Priority Mail Express every day. Whether your address gets a Sunday package depends on the shipper and the local delivery unit, so a tracking page is the only reliable answer for a specific parcel.' },
      { q: 'Is mail delivered the day after Thanksgiving?', a: `Yes. The Friday after Thanksgiving, ${h.ev('blackfriday', 2026)} this year, is not a holiday for the Postal Service. Offices open, carriers deliver and boxes are collected as on any Friday. It is often one of the busiest days of the year for packages, so expect longer queues at the counter rather than a closure.` },
      { q: 'Will a letter posted on a holiday be postmarked that day?', a: 'Not usually. On a widely observed holiday nothing is collected, so a letter dropped in a box is picked up and postmarked on the next business day. On a holiday that is not widely observed, boxes are emptied, but processing can be lighter. When a postmark date matters, post the item over the counter on a working day and ask for a receipt.' },
    ],
    body: (h) => `
<h2>What moves and what stops, by type of day</h2>
<p>The Postal Service treats a holiday differently from a Sunday, and a widely observed holiday differently from the others. The table sums up the national rule set by the ${h.src('usps_pom', 'Postal Operations Manual')} and the holiday memos.</p>
${h.table(['Day', 'Letters', 'Packages', 'Blue boxes'], [
  ['Monday to Friday', 'delivered', 'delivered', 'emptied'],
  ['Saturday', 'delivered', 'delivered', 'emptied, earlier pickup'],
  ['Sunday', 'not delivered', 'some areas', 'not emptied'],
  ['Widely observed holiday', 'not delivered', 'Express only', 'not emptied'],
  ['Other federal holiday', 'not delivered', 'Express only', 'emptied'],
], 'Priority Mail Express is delivered 365 days a year. Local times vary.', ['l', 'l', 'l', 'l'])}

<h2>Days without letter delivery, 2026 and 2027</h2>
<p>Holidays fall on different weekdays each year, so the number of delivery days lost changes too. A holiday on a Sunday adds a Monday without mail; a holiday on a Saturday removes a Saturday delivery that would otherwise have happened.</p>
${h.table(['Holiday', '2026', '2027', 'Kind'], h.usps(2026).map((x, i) => [x.name, h.dateS(x.uspsClosed), h.dateS(h.usps(2027)[i].uspsClosed), x.wide ? 'widely observed' : 'not widely observed']), 'No regular delivery on these days. Computed from the Postal Service weekend rules.', ['l', 'r', 'r', 'l'])}
<p>In 2027, Juneteenth on Saturday, June 19 and Christmas on Saturday, December 25 are both days without regular delivery, and the Fridays before them are normal days. Independence Day falls on a Sunday, so the Monday after is the day without mail. The mini-tool under the summary shows the federal observed day for comparison, which is often a different day.</p>

<h2>How many days a long weekend adds</h2>
<p>A letter posted after the last pickup on the Friday before Memorial Day waits until Tuesday to be collected, because Saturday collection has already passed, Sunday has none and Monday is widely observed. Posted at the same time before Columbus Day, it is picked up on the Monday and starts moving a day earlier, though it is not delivered until Tuesday. The ${h.src('usps_columbus', 'Columbus Day operations memo')} describes collections running on the holiday while retail and delivery stop.</p>
<p>For anything time sensitive, think in delivery days rather than calendar days. A First-Class letter with a two-to-five-day standard does not count Sundays or holidays, so a letter sent on a Thursday before a Monday holiday can easily arrive the following Thursday. The ${h.a('business-days', 'business days counter')} helps lay out those days.</p>

<h2>Mailbox questions people ask on a holiday</h2>
<p>Raising the flag on a residential mailbox on a holiday does nothing until the next delivery day, since the carrier is not on the route. Mail left in a box at the post office is handled with the collection rule of that holiday. Packages already on a truck before the holiday are usually delivered on the next business day, and tracking may show no movement for a day or two. For counter hours on the same day, see the ${h.a('post-office-open-today', 'post office checker')}; for the full year ahead, the ${h.a('post-office-holidays-2027', 'post office holidays of 2027')}.</p>
<p>This page gives the national rules. Rural routes, contract delivery units and offices affected by weather or local events can run differently, and the Postal Service announces those changes locally.</p>`,
  },
});
