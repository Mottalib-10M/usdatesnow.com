import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'post-office-open-today',
  group: 'open',
  order: 50,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'post' } },
  mini: { kind: 'mini:postday' },
  related: ['mail-delivery-today', 'post-office-holidays-2027', 'banks-open-today', 'columbus-day-closures', 'days-until-christmas'],
  sources: ['usps_pom', 'usps_july4', 'usps_columbus', 'usps_juneteenth', 'usc6103'],
  en: {
    slug: 'post-office-open-today',
    nav: 'Post office open today?',
    card: 'Whether post office counters open on a given day, with the holiday rule behind the answer and what happens to mail and blue boxes.',
    title: 'Post Office Open Today? Holiday Closures for 2026 and 2027',
    description: 'Check if post offices are open today or on any date: the 11 Postal Service holidays, the Saturday and Sunday rules, and what happens to delivery and blue boxes.',
    h1: 'Is the post office open today?',
    intro: 'The date is set to today in your time zone. Change it to check a holiday, a Saturday or a day in 2027: the answer gives the national rule and the reason.',
    resume: (h) => `Post office counters close on the eleven federal holidays and stay open on every other weekday, with Saturday hours at most locations and no Sunday hours at most of them. The Postal Service does not shift a Saturday holiday the way federal offices do: when Independence Day fell on Saturday, July 4, 2026, its own memo kept Friday, July 3 as a normal day and closed the offices on the Saturday. A holiday that falls on a Sunday is observed on the Monday after, so post offices close on ${h.dateW(h.usps(2027)[5].uspsClosed)}. The checker above applies those two rules to any date and adds what happens to delivery and to the blue collection boxes, which depends on whether the holiday is widely observed. It gives the national rule only: a particular office can keep shorter hours, close for a local reason or open later, so the hours posted at your branch always take precedence. This site is independent of the Postal Service.`,
    faqs: (h) => [
      { q: 'Are post offices open on Saturday?', a: 'Most are, with shorter hours than on weekdays, often a morning or early afternoon window. Some small offices close on Saturday and some large ones stay open later. The only Saturdays when counters close nationwide are federal holidays that fall on a Saturday, such as Juneteenth and Christmas in 2027, because the Postal Service observes those holidays on the day itself.' },
      { q: 'Is the post office open the Friday before a Saturday holiday?', a: `Yes. Unlike federal offices, which take the Friday off, the Postal Service keeps that Friday as a normal business day and closes on the Saturday. For Independence Day 2026 its operations memo said so in writing. The same will apply on ${h.dateW(h.fed(2027)[10].observed)}, when federal offices close for Christmas but post offices open as usual.` },
      { q: 'Do post offices close early on Christmas Eve or New Year\'s Eve?', a: 'There is no national early-closing rule for those days, which are not federal holidays. Many offices keep their normal hours, while some close earlier by local decision, often announced on the door a few days before. When it matters, check the hours of the specific office shortly before you go, and allow for long queues in the last days before Christmas.' },
    ],
    body: (h) => `
<h2>Post office closures in 2026 and 2027</h2>
<p>The table lists the days counters close for each holiday, after applying the Postal Service rule: a Saturday holiday stays on Saturday, a Sunday holiday moves to Monday. The last column says whether blue boxes are emptied, which follows the two lists of the ${h.src('usps_pom', 'Postal Operations Manual')}.</p>
${h.table(['Holiday', 'Closed in 2026', 'Closed in 2027', 'Collection'], h.usps(2026).map((x, i) => { const y = h.usps(2027)[i]; return [x.name, h.dateS(x.uspsClosed), h.dateS(y.uspsClosed), x.wide ? 'none' : 'boxes emptied']; }), 'Computed from 5 U.S.C. 6103 and the Saturday and Sunday rules of the Postal Service; compared with its 2026 holiday memos.', ['l', 'r', 'r', 'l'])}
<p>Three days of 2027 differ from the federal calendar. Juneteenth and Christmas fall on a Saturday, so post offices close that Saturday while their Friday is a normal day. New Year's Day 2028 is also a Saturday: counters are open on Friday, December 31, 2027 and closed the next day.</p>

<h2>The Saturday rule, explained with July 4, 2026</h2>
<p>For federal employees on a Monday to Friday schedule, a holiday that lands on a Saturday is moved to the Friday so that they do not lose it. The Postal Service delivers mail six days a week, so moving the holiday would close a working day and leave the Saturday open. Its ${h.src('usps_july4', 'memorandum for Independence Day 2026')} spells out the result: Friday, July 3 was a regular business day for retail and delivery, and Saturday, July 4 was the holiday, with no regular delivery and no collection.</p>
<p>For a Sunday holiday the logic runs the other way. Counters are already closed on Sunday at most offices, so the holiday is observed on the Monday after, as with Independence Day 2027 on ${h.dateW(h.usps(2027)[5].uspsClosed)}. On that Monday, offices close and mail does not move except for the services that always run.</p>

<h2>Widely observed or not: why some boxes are still emptied</h2>
<p>The manual sorts the eleven holidays into two groups. Six are widely observed: New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving and Christmas. On those days almost every business closes too, so collection boxes are not emptied and no letters are processed. The five others, Martin Luther King Jr. Day, Presidents' Day, Juneteenth, Columbus Day and Veterans Day, are holidays for the Postal Service but not for much of the economy. Offices still close and regular delivery still stops, but carriers empty collection boxes so that mail posted by businesses keeps moving. The ${h.src('usps_columbus', 'Columbus Day memo')} and the ${h.src('usps_juneteenth', 'Juneteenth memo')} describe that pattern.</p>
<!--tool:holidays|{"cal":"usps","year":2027}-->

<h2>Sundays, evenings and self-service kiosks</h2>
<p>Most post offices have no Sunday counter hours, which the checker shows as mostly closed. Some large city offices and airport facilities keep limited hours, and self-service kiosks inside many lobbies sell postage and accept packages when the lobby is open, sometimes around the clock. Packages delivered by the Postal Service for large retailers can arrive on Sunday in many areas, but letters are not delivered. The ${h.a('mail-delivery-today', 'mail delivery page')} explains what moves on those days.</p>

<h2>Planning around a closure</h2>
<p>Before a long weekend, count the days a letter will sit in the system. A letter posted on the Friday before Labor Day is not collected again until Tuesday morning, while one posted on the Friday before Columbus Day can still be picked up on the Monday. For a deadline that depends on a postmark, such as a tax return, the date on the postmark is what counts, so avoid relying on a holiday collection. The ${h.a('business-days', 'business days counter')} gives the number of working days between two dates without federal holidays, and the ${h.a('post-office-holidays-2027', 'post office holidays 2027 page')} lists every closure of next year in one place.</p>`,
  },
});
