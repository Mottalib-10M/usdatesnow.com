import { definePage } from '../../lib/guide-types';

/** Daylight saving time ends on the first Sunday of November (15 U.S.C. 260a, as amended in 2005). */
const dstEnd = (y: number) => { for (let d = 1; d <= 7; d++) { const iso = `${y}-11-0${d}`; if (new Date(`${iso}T00:00:00Z`).getUTCDay() === 0) return iso; } return `${y}-11-01`; };

export default definePage({
  id: 'halloween',
  group: 'countdown',
  order: 7,
  tool: { kind: 'countdown', props: { event: 'halloween' } },
  mini: { kind: 'mini:daysto', props: { e: 0 } },
  related: ['thanksgiving', 'election-day', 'days-until-christmas', 'veterans-day-closures'],
  sources: ['usps_pom', 'fed', 'usagov_holidays'],
  en: {
    slug: 'halloween',
    nav: 'Halloween',
    card: 'October 31 counted down live, its weekday through 2030 and the clock change that follows it.',
    title: 'Halloween 2026 Countdown: Weekday, Clock Change, What Opens',
    description: 'Halloween 2026 falls on a Saturday, with clocks going back the next night: live countdown, the weekday each year to 2030 and why banks and mail run as usual.',
    h1: 'How many days until Halloween?',
    intro: 'October 31, counted down to midnight in your time zone. Choose 2027 or 2028 to plan the next ones.',
    resume: (h) => `Halloween is October 31 every year, the eve of All Saints' Day, and it is not a public holiday: no federal, state or bank closure is attached to it. What changes is the weekday. In 2026 it falls on ${h.ev('halloween', 2026)}, the best case for trick-or-treaters, followed by ${h.ev('halloween', 2027)} and ${h.ev('halloween', 2028)}. The weekday matters because the evening activities are set locally: many towns announce official trick-or-treat hours, and some move them when the 31st falls on a Sunday or a school night, so the city or county website is the place to check. A second date hangs on Halloween. Daylight saving time ends on the first Sunday of November, which in 2026 is ${h.dateW(dstEnd(2026))}, the very night after Halloween: clocks go back one hour at 2 a.m., giving an extra hour of sleep after the party. In 2027 the change comes a week later, on ${h.dateW(dstEnd(2027))}.`,
    faqs: (h) => [
      { q: 'Is Halloween a holiday for banks or the post office?', a: 'No. Banks follow the Federal Reserve calendar, and October 31 is not on it, so they open on weekdays as usual. Post offices open and the mail is delivered, including on a Saturday Halloween. Schools stay open unless a district decides otherwise. The nearest federal holidays are Columbus Day in mid-October and Veterans Day on November 11.' },
      { q: 'What time does trick-or-treating start?', a: 'There is no national rule. Most children go out from late afternoon until about 8 or 9 p.m., but many towns publish official hours, and a few move the evening when Halloween falls on a Sunday or in bad weather. Look for the announcement of your city, police department or county a week or two before October 31.' },
      { q: 'When do the clocks fall back after Halloween?', a: `On the first Sunday of November at 2 a.m. local time, when clocks return to 1 a.m. In 2026 that is ${h.date(dstEnd(2026))}, the night after Halloween; in 2027 it is ${h.date(dstEnd(2027))}; in 2028 it is ${h.date(dstEnd(2028))}. Hawaii and most of Arizona keep standard time all year and do not change their clocks.` },
    ],
    body: (h) => `
<h2>Halloween and the end of daylight saving time, 2026 to 2030</h2>
${h.table(['Year', 'Halloween', 'Clocks fall back', 'Days to Thanksgiving'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('halloween', y, 's'), h.dateS(dstEnd(y)), h.days(h.iso('halloween', y)!, h.iso('thanksgiving', y)!)]), 'October 31; daylight saving time ends on the first Sunday of November at 2 a.m. (15 U.S.C. 260a); Thanksgiving is the fourth Thursday of November.', ['l', 'r', 'r', 'r'])}
<p>Before 2007 daylight saving time ended on the last Sunday of October, so the clocks had always gone back by Halloween. The Energy Policy Act of 2005 moved the end to the first Sunday of November: Halloween evening now always falls on daylight time, with sunset an hour later than under the old rule.</p>

<h2>From All Hallows' Eve to the American Halloween</h2>
<p>The name is a contraction of All Hallows' Eve, the evening before All Saints' Day on November 1. Its customs mix that Christian feast with older Celtic traditions around Samhain, the end of the harvest season in Ireland and Scotland. Irish and Scottish immigrants brought the night's customs to the United States in the nineteenth century, where they became a community celebration and, from the mid-twentieth century, the house-to-house trick-or-treating familiar today. The carved pumpkin replaced the turnip lanterns of the old country.</p>

<h2>A normal working day</h2>
<p>For every official calendar, October 31 is an ordinary date. The ${h.src('fed', 'Federal Reserve holiday list')} does not include it, so payments, direct deposits and transfers move as on any weekday. The Postal Service's list of national holidays in ${h.src('usps_pom', 'its Operations Manual')} does not mention it either: counters open and carriers deliver, including on a Saturday Halloween like 2026. Federal offices follow the ${h.src('usagov_holidays', 'list of federal holidays')}, which also leaves it out. The checker below confirms it for any date.</p>
<!--tool:open|{"focus":"banks","date":"2026-10-30"}-->

<h2>Counting down to the evening</h2>
<p>The countdown reaches zero at midnight at the start of October 31 in your time zone. If you are counting to the evening rather than the date, add the hours to dusk: about 6 p.m. in much of the country at the end of October, later in the west of each time zone. The mini-tool under the summary counts from any date, for a costume order or a party invitation, and gives the weekends left. After Halloween the autumn calendar moves quickly: ${h.a('election-day', 'Election Day')} in even years falls in the first week of November, and ${h.a('thanksgiving', 'Thanksgiving')} three to four weeks later.</p>
<h2>Trick-or-treat on a Sunday or a school night</h2>
<p>When October 31 falls on a Sunday, as in 2027, some towns keep the date and others hold the evening on Saturday the 30th; the choice belongs to each municipality, and some announce it only in October. On a Tuesday, as in 2028, the evening competes with homework and work the next morning, and many families keep the outing shorter. Parades and school events are often held on the nearest weekend whatever the date. If your town publishes official hours, they are the reference for the evening; the countdown here only follows the calendar date.</p>`,
  },
});
