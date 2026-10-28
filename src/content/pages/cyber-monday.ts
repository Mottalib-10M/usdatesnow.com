import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cyber-monday',
  group: 'countdown',
  order: 11,
  tool: { kind: 'countdown', props: { event: 'cybermonday' } },
  mini: { kind: 'mini:daysto', props: { e: 2 } },
  related: ['black-friday', 'thanksgiving', 'days-until-christmas', 'business-days', 'mail-delivery-today'],
  sources: ['usps_xmas', 'usps_pom', 'fed'],
  en: {
    slug: 'cyber-monday',
    nav: 'Cyber Monday',
    card: 'The Monday after Thanksgiving counted down live, with the shipping days it leaves before Christmas.',
    title: 'Cyber Monday 2026: Date, Countdown and Shipping Days Left',
    description: 'Cyber Monday 2026 is November 30, then November 29, 2027: live countdown, how the date follows Thanksgiving and the business days left to ship for Christmas.',
    h1: 'When is Cyber Monday 2026?',
    intro: 'Counted down to midnight on the Monday after Thanksgiving, in your time zone. The year menu covers 2026 to 2028.',
    resume: (h) => `Cyber Monday is the Monday after Thanksgiving, four days after the fourth Thursday of November. It falls on ${h.ev('cybermonday', 2026)}, ${h.ev('cybermonday', 2027)} and ${h.ev('cybermonday', 2028)}, and can range from November 26 to December 2. The name was coined in 2005 by the online arm of the National Retail Federation, which had noticed that many people bought online on the first working day after the holiday weekend. It is a commercial label, not an observance: every office, bank, market and post office keeps its normal Monday schedule, and the day is an ordinary business day for any deadline. Its real use in planning is as a marker for the shipping season. From Cyber Monday 2026 to Christmas there are ${h.days(h.iso('cybermonday', 2026)!, h.iso('christmas', 2026)!)} calendar days, but fewer business days, and the Postal Service's recommended send-by dates for delivery before Christmas fall in the week of December 14 that year. The countdown above shows the days left in your own time zone, with the weekends and working days before the Monday.`,
    faqs: (h) => [
      { q: 'Is Cyber Monday always in November?', a: `No. When Thanksgiving is on November 28, the Monday after is December 2, as it will be in ${[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035].find((y) => h.iso('cybermonday', y)!.endsWith('-12-02'))}. The earliest possible date is November 26, when Thanksgiving falls on the 22nd. In 2026 it is November 30, one day before December begins.` },
      { q: 'Are banks and post offices open on Cyber Monday?', a: 'Yes. It is not a holiday on any official calendar. The Federal Reserve Banks process payments, post offices open and the mail is delivered and collected as on any Monday. The stock market keeps its regular hours from 9:30 a.m. to 4:00 p.m. Eastern time, with no early close.' },
      { q: 'How many shipping days are left after Cyber Monday?', a: `Count business days to the carrier's deadline, not to Christmas. In 2026 the Postal Service recommends mailing by ${h.date(h.P.usps.xmasMailBy2026.groundAdvantage)} for Ground Advantage and by ${h.date(h.P.usps.xmasMailBy2026.priority)} for Priority Mail, inside the lower 48 states. The counter on this page computes the business days between any two dates.` },
    ],
    body: (h) => `
<h2>The Monday that follows the Thursday</h2>
${h.table(['Year', 'Thanksgiving', 'Cyber Monday', 'Days left to Christmas'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('thanksgiving', y, 's'), h.ev('cybermonday', y, 's'), h.days(h.iso('cybermonday', y)!, h.iso('christmas', y)!)]), 'Monday after the fourth Thursday of November; days counted to December 25.', ['l', 'r', 'r', 'r'])}
<p>The gap to Christmas swings by six days depending on the year: 23 days when Cyber Monday falls on December 2, 29 when it falls on November 26. That swing is the whole reason retailers and shippers watch the date.</p>

<h2>Shipping deadlines after Cyber Monday</h2>
<p>For a gift bought online on Cyber Monday, what matters is the number of working days before the carrier's last recommended date. The ${h.src('usps_xmas', 'Postal Service release')} for 2026 sets ${h.dateW(h.P.usps.xmasMailBy2026.groundAdvantage)} for Ground Advantage and First-Class Mail, ${h.dateW(h.P.usps.xmasMailBy2026.priority)} for Priority Mail and ${h.dateW(h.P.usps.xmasMailBy2026.priorityExpress)} for Priority Mail Express. Between Cyber Monday and the first of these there is no federal holiday, so the count is simply Monday to Friday. Enter the dates in the counter below to see it.</p>
<!--tool:workdays|{"to":"2026-12-17"}-->
<p>Private carriers publish their own cut-offs each autumn. They are commercial dates that change without notice, so this site does not list them.</p>

<h2>A normal Monday for every institution</h2>
<p>No calendar treats Cyber Monday as special. Federal offices open. The ${h.src('fed', 'Federal Reserve')} settles payments, so a refund or a card payment moves on the usual timetable. Post offices open, and the Postal Service, whose holidays are listed in ${h.src('usps_pom', 'its Operations Manual')}, delivers and collects mail. The stock exchanges trade a full session. If a deadline falls on Cyber Monday, it is a business day like any other.</p>

<h2>Giving Tuesday and the days around it</h2>
<p>The day after Cyber Monday has its own name, Giving Tuesday, launched in 2012 to encourage donations to charities. For many nonprofits, it opens the year-end giving period that runs until December 31, the last day for a gift to count toward that tax year. The mini-tool under the summary counts the days from any date to Christmas, Thanksgiving or other holidays, and the ${h.a('days-until-christmas', 'Christmas countdown')} gives the weekends left as well.</p>
<h2>What the countdown and the counters show</h2>
<p>The countdown at the top runs to midnight at the start of Cyber Monday where you are, with the hours, minutes and seconds ticking once the page has loaded. Below it, the weekends line counts the full Saturday and Sunday pairs before the Monday, and the business days line counts Monday to Friday, leaving out Veterans Day and Thanksgiving when they fall in between, as they do from late October. The business days counter in the body of the page starts from today and ends on the Postal Service's Ground Advantage date for 2026; change either date to match a carrier, a return window or a delivery promise. Everything is computed in your browser, and the dates you enter are not sent anywhere.</p>`,
  },
});
