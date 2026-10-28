import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mothers-day',
  group: 'countdown',
  order: 4,
  tool: { kind: 'countdown', props: { event: 'mothers' } },
  mini: { kind: 'mini:sundays' },
  related: ['fathers-day', 'easter', 'memorial-day', 'valentines-day'],
  sources: ['mothers', 'usagov_holidays'],
  en: {
    slug: 'mothers-day',
    nav: "Mother's Day",
    card: 'The second Sunday of May under 36 U.S.C. 117, counted down live, with the dates for 2026, 2027 and 2028.',
    title: "Mother's Day 2027: Date, Countdown and the Second-Sunday Law",
    description: "Mother's Day is May 10, 2026 and May 9, 2027: live countdown in your time zone, dates to 2030, the 1914 law behind the second Sunday of May and when to order.",
    h1: "When is Mother's Day 2027?",
    intro: "A live count of the days, hours and minutes to Mother's Day where you are. Pick 2026, 2027 or 2028.",
    resume: (h) => `Mother's Day in the United States is the second Sunday of May. The rule comes from a joint resolution signed by Woodrow Wilson in May 1914 and is now codified at 36 U.S.C. 117, in the part of the Code that lists patriotic and national observances. That section designates the day and asks the President to call for the flag to be displayed on government buildings and homes; it does not create a day off, and as a Sunday it closes nothing that is not already closed. The second Sunday can only fall between May 8 and May 14. For the next three years it gives ${h.ev('mothers', 2026)}, ${h.ev('mothers', 2027)} and ${h.ev('mothers', 2028)}. Many other countries keep a different day: the United Kingdom celebrates Mothering Sunday in Lent, three weeks before Easter, and Mexico keeps May 10 whatever the weekday, so a card sent abroad may need a different deadline from one sent across town.`,
    faqs: (h) => [
      { q: "Who started Mother's Day in the United States?", a: "Anna Jarvis is credited with it. After her mother died in 1905, she campaigned for a day to honor mothers, and the first church services were held in Grafton, West Virginia, and Philadelphia in May 1908. States adopted the idea one by one until Congress passed its joint resolution in 1914. Jarvis later fought the commercial side of the holiday she had created." },
      { q: "Is Mother's Day always in the same week as Memorial Day?", a: `No, they are about two to three weeks apart. Mother's Day is the second Sunday of May, Memorial Day the last Monday. In 2027 the gap is ${h.days(h.iso('mothers', 2027)!, h.iso('memorial', 2027)!)} days, from ${h.ev('mothers', 2027, 'md')} to ${h.ev('memorial', 2027, 'md')}; in 2026 it is ${h.days(h.iso('mothers', 2026)!, h.iso('memorial', 2026)!)} days. The weekday rule keeps both moving within a fixed band.` },
      { q: "When should I order flowers or a gift for Mother's Day?", a: `Count back from the Sunday. Most deliveries happen on Friday and Saturday, because many florists and carriers deliver less or not at all on Sunday. For ${h.ev('mothers', 2027, 'l')}, the Saturday before is ${h.date(h.addDays(h.iso('mothers', 2027)!, -1))}. The countdown above gives the business days left, which is what most shipping options count.` },
    ],
    body: (h) => `
<h2>The second Sunday of May, year by year</h2>
${h.table(['Year', "Mother's Day", "Father's Day", 'Weeks apart'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('mothers', y, 's'), h.ev('fathers', y, 's'), h.days(h.iso('mothers', y)!, h.iso('fathers', y)!) / 7]), 'Second Sunday of May (36 U.S.C. 117) and third Sunday of June (36 U.S.C. 109).', ['l', 'r', 'r', 'r'])}
<p>The two parents' days are always five or six weeks apart, because both are counted in Sundays. When May 1 is a Sunday, Mother's Day falls on the 8th, its earliest; when May 1 is a Monday, it falls on the 14th, its latest. The year menu of the countdown lets you check any of the three years the site covers.</p>

<h2>What the law says, and what it does not</h2>
<p>The text of ${h.src('mothers', '36 U.S.C. 117')} is short. It names the second Sunday in May as Mother's Day and asks the President to issue a proclamation each year calling on government officials to display the flag on government buildings and inviting people to display it at their homes. That is the whole legal content. Unlike the eleven days in 5 U.S.C. 6103, Mother's Day gives no paid leave to anyone, changes no deadline and closes no office. Federal holiday lists published by the government, such as ${h.src('usagov_holidays', 'the USAGov page')}, do not include it for that reason.</p>
<p>Its place in title 36 puts it next to other designated observances such as Flag Day and Father's Day. A few states have their own statutes, which add nothing to the date.</p>

<h2>A Sunday that still moves the calendar</h2>
<p>Mother's Day closes nothing, but it shapes the week before it. Post offices are closed on Sunday anyway, so a card mailed for delivery on the day itself has to arrive on Saturday at the latest; in practice, mailing a card in the first days of that week leaves room for the standard delivery times. Restaurants and florists plan around it as one of their busiest days of the year; reservations open weeks ahead in many cities.</p>
<p>The weekday rule also means Mother's Day never collides with a federal holiday. The nearest ones are Memorial Day, two or three weeks later, and nothing at all in April or early May. For those who also count down to the June date, the ${h.a('fathers-day', "Father's Day page")} works the same way.</p>

<h2>Mother's Day around the world</h2>
<p>The American date has spread: Canada, Australia, Japan, Germany, Italy, Brazil and many other countries also keep the second Sunday of May. Others keep their own dates. Mexico and much of Central America celebrate on May 10, the United Kingdom and Ireland on Mothering Sunday in Lent, France on the last Sunday of May unless it coincides with Pentecost. If you send a card abroad, check the local date before counting days.</p>
<p>The countdown above reads the date from the same second-Sunday rule, so it is correct for any year without anyone updating it, and the year menu shows the next two dates in advance.</p>`,
  },
});
