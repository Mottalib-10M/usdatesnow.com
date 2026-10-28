import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'post-office-holidays-2027',
  group: 'open',
  order: 60,
  demarche: true,
  tool: { kind: 'holidays', props: { cal: 'usps', year: 2027 } },
  mini: { kind: 'mini:mailby' },
  related: ['post-office-open-today', 'mail-delivery-today', 'federal-holidays-2027', 'bank-holidays-2027', 'days-until-christmas'],
  sources: ['usps_pom', 'usps_july4', 'usps_juneteenth', 'usps_xmas', 'opm'],
  en: {
    slug: 'post-office-holidays-2027',
    nav: 'Post office holidays 2027',
    card: 'The eleven days post offices close in 2027, including two Saturdays, with collection and delivery for each.',
    title: 'Post Office Holidays 2027: Closures, Delivery and Collection',
    description: 'Post office holidays 2027: the 11 days counters close, Saturday closures for Juneteenth and Christmas, Monday, July 5, and when blue boxes are still collected.',
    h1: 'Post office holidays 2027',
    intro: 'The calendar shows the 2027 postal closing days with the next one first. Download them as a calendar file or switch to 2026 or 2028.',
    resume: (h) => {
      const u = h.usps(2027);
      return `Post offices close on eleven days in 2027, one for each federal holiday, but not always on the same day as federal offices. The Postal Service keeps a Saturday holiday on the Saturday, so its counters close on ${h.dateW(u[4].uspsClosed)} for Juneteenth and on ${h.dateW(u[10].uspsClosed)} for Christmas, while the Fridays before are normal business days with delivery and collection. Independence Day falls on a Sunday and is observed on ${h.dateW(u[5].uspsClosed)}, the same day as for everyone else. The other eight closures are weekdays: New Year's Day on a Friday, Martin Luther King Jr. Day, Presidents' Day, Memorial Day, Labor Day and Columbus Day on Mondays, Veterans Day and Thanksgiving on Thursdays. On six of the eleven days nothing is collected from blue boxes; on Martin Luther King Jr. Day, Presidents' Day, Juneteenth, Columbus Day and Veterans Day, carriers still empty them. New Year's Day 2028, a Saturday, closes post offices on January 1, 2028, not on December 31.`;
    },
    faqs: (h) => [
      { q: 'Is the post office open on Friday, December 24, 2027?', a: 'Yes. Christmas 2027 falls on a Saturday, and the Postal Service observes it that Saturday, so Christmas Eve is a regular Friday for counters, delivery and collection, apart from any early closing decided locally. Federal offices and the stock market are closed that Friday for the observed holiday, which is why many calendars wrongly show the post office as closed.' },
      { q: 'Is mail delivered on Saturday, June 19, 2027?', a: 'No regular delivery. Juneteenth is a postal holiday and, falling on a Saturday, it is observed on that Saturday. Because Juneteenth is not one of the widely observed holidays in the Postal Operations Manual, collection boxes are still emptied. Friday, June 18 is a full delivery day, even though federal employees elsewhere have it off.' },
      { q: 'Are post offices closed on New Year\'s Eve 2027?', a: 'No. Friday, December 31, 2027 is a normal postal business day. New Year\'s Day 2028 falls on Saturday, January 1 and is observed by the Postal Service on that Saturday, with no delivery and no collection. Federal offices close on the Friday instead, and banks and the stock market stay open on that Friday.' },
    ],
    body: (h) => `
<h2>The eleven postal closures of 2027</h2>
${h.table(['Holiday', 'Post offices closed', 'Weekday', 'Blue boxes', 'Federal offices'], h.usps(2027).map((x, i) => [x.name, h.dateS(x.uspsClosed), h.weekday(x.uspsClosed), x.wide ? 'not emptied' : 'emptied', h.dateS(h.fed(2027)[i].observed)]), 'Postal Service closing days computed from its Saturday and Sunday rules; last column from OPM.', ['l', 'r', 'l', 'l', 'r'])}
<p>The last column shows the federal observed day for comparison. The two calendars agree on nine holidays and differ on Juneteenth and Christmas, where federal offices close on Friday and post offices on Saturday. The ${h.src('usps_july4', 'Postal Service memo for July 4, 2026')} applied the same Saturday rule in 2026, and the ${h.src('usps_pom', 'Postal Operations Manual')} sets which holidays are widely observed.</p>

<h2>Delivery days in 2027</h2>
<p>Mail is delivered six days a week, so every postal holiday removes one delivery day, including the two Saturdays. Counting from the calendar, 2027 has ${(() => { let n = 0; for (let d = '2027-01-01'; d <= '2027-12-31'; d = h.addDays(d, 1)) if (h.weekday(d) !== 'Sunday') n++; return n - 11; })()} regular delivery days once Sundays and the eleven holidays are taken out. Around the three-day weekends of January, February, May, July, September and October, letters posted on a Friday can take a day longer than usual; around the Thursday holidays of November, the Friday after is a full day of delivery.</p>

<h2>The holiday mailing season of 2027</h2>
<p>The Postal Service publishes its recommended send-by dates for Christmas each autumn. The 2027 list is not out yet; the ${h.src('usps_xmas', '2026 dates')} were ${h.dateMD(h.P.usps.xmasMailBy2026.groundAdvantage)} for Ground Advantage and First-Class Mail, ${h.dateMD(h.P.usps.xmasMailBy2026.priority)} for Priority Mail and ${h.dateMD(h.P.usps.xmasMailBy2026.priorityExpress)} for Priority Mail Express, and the mini-tool under the summary works from them. In 2027 Christmas is a Saturday, so the last delivery day before it is Friday, December 24, a full delivery day for cards and parcels already in the mail.</p>
<!--tool:open|{"focus":"post","date":"2027-12-24"}-->

<h2>Using the calendar file</h2>
<p>The button under the table builds an .ics file inside your browser, with each closing day as an all-day event and a note saying whether boxes are collected. It opens in most calendar apps. Nothing is sent to a server, and the file does not update itself: if the Postal Service announces an unscheduled closure, such as a day of national mourning, add it by hand. The same tool shows the federal, bank and stock market calendars, so a business that mails invoices and receives payments can line up the ${h.a('bank-holidays-2027', 'bank holidays of 2027')} with the postal ones. For a single date, use the ${h.a('post-office-open-today', 'post office checker')}; for what the carrier brings on a holiday, the ${h.a('mail-delivery-today', 'mail delivery page')}.</p>
<p>This site is not affiliated with the Postal Service. Local office hours, which can be shorter on the days around holidays, are posted by each office.</p>`,
  },
});
