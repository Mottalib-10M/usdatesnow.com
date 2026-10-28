import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'fathers-day',
  group: 'countdown',
  order: 5,
  tool: { kind: 'countdown', props: { event: 'fathers' } },
  mini: { kind: 'mini:monthweek', props: { n: 3, w: 0, m: 6 } },
  related: ['mothers-day', 'federal-holidays-2027', 'fourth-of-july', 'memorial-day'],
  sources: ['fathers', 'opm', 'usc6103'],
  en: {
    slug: 'fathers-day',
    nav: "Father's Day",
    card: 'The third Sunday of June, counted down live, and how it lines up with Juneteenth and the solstice from 2026 to 2028.',
    title: "Father's Day 2026: Date, Live Countdown and June Weekends",
    description: "Father's Day is June 21, 2026, June 20, 2027 and June 18, 2028: live countdown, the 1972 law on the third Sunday of June and how it sits next to Juneteenth.",
    h1: "When is Father's Day 2026?",
    intro: "The clock counts to Father's Day morning at midnight in your time zone; switch to 2027 or 2028 in the year menu.",
    resume: (h) => `Father's Day is the third Sunday of June, so it always falls between June 15 and June 21. The date has been fixed by statute since 1972, when a law signed by Richard Nixon made the observance permanent; it is now section 109 of title 36 of the US Code, which also asks the President to proclaim the day each year. Like Mother's Day, it is an observance and not a federal holiday: no office, bank or market closes for it. What makes the date worth checking is its neighbor. Juneteenth, June 19, has been a federal holiday since 2021, and in some years it falls on the same weekend. In 2026 Father's Day is ${h.ev('fathers', 2026)}, two days after Juneteenth on a Friday. In 2027 it is ${h.ev('fathers', 2027)}, and federal workers have the Friday before off because Juneteenth falls on a Saturday. In 2028 it is ${h.ev('fathers', 2028)}, the eve of a Monday Juneteenth, which makes a three-day weekend.`,
    faqs: (h) => [
      { q: "Where did Father's Day begin?", a: "In Spokane, Washington, where Sonora Smart Dodd, raised by her widowed father, organized a celebration in June 1910. The idea spread slowly. Presidents Coolidge and Johnson encouraged it, Johnson proclaiming the third Sunday of June in 1966, but Congress fixed it permanently only in 1972, almost sixty years after Mother's Day." },
      { q: "Does Father's Day fall on the first day of summer?", a: `Sometimes on the same weekend. The June solstice comes on June 20 or 21 in the United States, and Father's Day can be the 21st at the latest. In 2026 the solstice comes at ${h.season('summer', 2026)}, on the day itself. The match is a coincidence of two different rules, one set by the sky and one by the calendar.` },
      { q: "Can Father's Day fall on Juneteenth?", a: `Yes, whenever June 19 is a Sunday, which last happened in 2022 and will happen next in ${[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039].find((y) => h.iso('fathers', y)!.endsWith('-06-19'))}. Federal employees then get Juneteenth on the Monday, June 20, under the Sunday rule of the Office of Personnel Management, so the weekend runs three days without anyone losing either day.` },
    ],
    body: (h) => `
<h2>Father's Day, Juneteenth and the June weekends</h2>
${h.table(['Year', "Father's Day", 'Juneteenth falls on', 'Federal day off for Juneteenth'], [2026, 2027, 2028, 2029, 2030].map((y) => { const j = h.fed(y)[4]; return [String(y), h.ev('fathers', y, 's'), h.dateS(j.actual), h.dateS(j.observed)]; }), "Third Sunday of June (36 U.S.C. 109); Juneteenth and its observed day under 5 U.S.C. 6103 and the OPM weekend rule.", ['l', 'r', 'r', 'r'])}
<p>Juneteenth National Independence Day marks June 19, 1865, when Union troops announced the end of slavery in Galveston, Texas. It is the newest of the eleven ${h.src('usc6103', 'legal public holidays')}, and the only fixed-date one in June, so it is the one that makes the Father's Day weekend longer or not. In 2028 federal workers get Monday, June 19, off right after Father's Day; banks close that Monday too, and post offices close, although mail is still collected from boxes because the Postal Service counts Juneteenth among the holidays that are not widely observed.</p>

<h2>The third-Sunday rule</h2>
<p>The law in ${h.src('fathers', '36 U.S.C. 109')} designates the third Sunday in June and requests a presidential proclamation; nothing more. The third Sunday is the Sunday that falls between the 15th and the 21st, so a simple check works for any year: find the first Sunday of June, then add fourteen days. The mini-tool under the summary does that for any month, weekday and year, and is useful for other days defined the same way, such as Mother's Day or Thanksgiving.</p>
<p>Because the rule counts Sundays, Father's Day comes five or six weeks after Mother's Day, and about two weeks before the Fourth of July. That spacing is fixed: the June date moves with the May one.</p>

<h2>Planning gifts and visits</h2>
<p>Sunday has no regular mail, so cards and parcels need to arrive by Saturday. Count from the business days line in the countdown: in mid-June there is rarely a holiday in the way, except Juneteenth itself, when post offices close and regular delivery stops. If Juneteenth falls on the Friday or the Monday next to Father's Day, expect one fewer delivery day that week, and send a day earlier than you would otherwise.</p>
<p>Travel is another reason people check the date. A three-day Father's Day weekend, as in 2028 for federal staff and many employers that follow the ${h.src('opm', 'OPM calendar')}, shifts road traffic to the Friday evening and the Monday. Long weekends for the whole year are counted on the ${h.a('federal-holidays-2027', 'federal holidays page')}.</p>

<h2>Outside the United States</h2>
<p>The third Sunday of June is shared by Canada, the United Kingdom, Ireland, France, India, Japan and many other countries. Australia and New Zealand keep the first Sunday of September; Germany celebrates on Ascension Day, a Thursday in May; Spain and Italy keep March 19, Saint Joseph's Day. A message abroad may therefore need a different countdown.</p>`,
  },
});
