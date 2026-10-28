import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'valentines-day',
  group: 'countdown',
  order: 6,
  tool: { kind: 'countdown', props: { event: 'valentines' } },
  mini: { kind: 'mini:fixedday', props: { e: 1 } },
  related: ['super-bowl', 'federal-holidays-2027', 'chinese-new-year', 'mothers-day'],
  sources: ['nfl_sb', 'usc6103', 'usps_pom'],
  en: {
    slug: 'valentines-day',
    nav: "Valentine's Day",
    card: 'February 14 counted down live, the weekday it lands on through 2028 and the busy weekend it shares in 2027.',
    title: "Valentine's Day 2027: Countdown, Weekday and Busy Weekend",
    description: "Valentine's Day 2027 is a Sunday, the day of Super Bowl LXI and the eve of Presidents' Day: live countdown, weekdays to 2030 and when to mail a card in time.",
    h1: "How long until Valentine's Day?",
    intro: "February 14, counted down to midnight in your time zone. The menu switches between 2026, 2027 and 2028.",
    resume: (h) => `Valentine's Day is always February 14, so the only thing that changes is the weekday, and that is what decides how the day is spent. It falls on ${h.ev('valentines', 2026)}, then on ${h.ev('valentines', 2027)} and on ${h.ev('valentines', 2028)}; the leap day of 2028 then makes it skip Tuesday and land on a Wednesday in 2029. It is not a public holiday anywhere in the United States: offices, banks, schools and the stock market keep their usual schedule, and there is regular mail delivery whenever February 14 is a weekday or a Saturday. In 2027 the calendar is unusually crowded. The National Football League has set Super Bowl LXI for that same Sunday, February 14, at SoFi Stadium in Inglewood, California, and the next day is Presidents' Day, the federal holiday set on the third Monday of February, when banks and post offices close. Anyone mailing a card for 2027 should aim for delivery on Saturday, February 13, since there is no regular delivery on the Sunday or the Monday that follow.`,
    faqs: (h) => [
      { q: "What day of the week is Valentine's Day 2026?", a: `A Saturday: ${h.ev('valentines', 2026, 'l')}. Mail is delivered as usual that day, and the federal holiday for Washington's Birthday follows on ${h.ev('presidents', 2026, 'l')}, two days later. In 2027 the date moves to a Sunday, then to a Monday in 2028 after the extra leap day.` },
      { q: "Is Valentine's Day ever on the same day as the Super Bowl?", a: `It is in 2027. The league has scheduled Super Bowl LXI for Sunday, February 14, 2027. Since the regular season grew to seventeen games in 2021, the championship game has moved into the second week of February, which makes the overlap possible whenever the 14th is a Sunday. The 2028 game in Atlanta has no announced date yet.` },
      { q: "When should I mail a Valentine's card so it arrives on time?", a: "Count back from the last delivery day before February 14. When the 14th is a weekday or a Saturday, that is the day itself; when it is a Sunday, as in 2027, it is the Saturday before. First-Class Mail usually takes one to five days, so mailing a full week ahead covers most distances. Presidents' Day, the following Monday in 2027, adds no delivery." },
    ],
    body: (h) => `
<h2>February 14 through the weekdays</h2>
${h.table(['Year', "Valentine's Day", "Presidents' Day", 'Super Bowl'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('valentines', y, 's'), h.ev('presidents', y, 's'), h.iso('superbowl', y) ? h.dateS(h.iso('superbowl', y)!) : 'not announced']), "February 14; Presidents' Day is the third Monday of February (5 U.S.C. 6103); Super Bowl dates as announced by the NFL.", ['l', 'r', 'r', 'r'])}
<p>A fixed date moves one weekday each year, two after February 29. Valentine's Day 2028 comes before that leap day, so it still advances by one: from a Sunday in 2027 to a Monday in 2028. The skip shows in 2029, when it jumps to a Wednesday.</p>

<h2>A crowded weekend in February 2027</h2>
<p>Three dates meet in mid-February 2027. Valentine's Day is the Sunday. The ${h.src('nfl_sb', 'NFL')} has placed Super Bowl LXI on that same Sunday at SoFi Stadium. Washington's Birthday, which most people call Presidents' Day, falls on Monday, February 15, under the third-Monday rule of ${h.src('usc6103', '5 U.S.C. 6103')}. The result is a three-day weekend for federal workers, banks closed on Monday, and post offices closed on Monday with collection boxes still emptied, because the Postal Service lists Washington's Birthday among its holidays that are not widely observed in ${h.src('usps_pom', 'its Operations Manual')}.</p>
<p>For restaurants, florists and anyone planning a dinner, it means demand split between a game night and a date night on the same evening, and a long weekend for many travelers. The Lunar New Year falls about a week earlier that year, on ${h.ev('chinesenewyear', 2027, 'md')}, adding one more celebration to the month.</p>

<h2>From saints to printed cards</h2>
<p>The day takes its name from one or more early Christian martyrs called Valentine, whose feast was kept on February 14. The link with romantic love appears in English and French poetry of the late Middle Ages, and exchanging handwritten notes was common in England by the eighteenth century. In the United States, mass-produced cards took off in the 1840s, when Esther Howland of Worcester, Massachusetts, began selling decorated valentines made with lace and colored paper. Cheaper postage later turned the exchange of cards into a habit across the country.</p>

<h2>Counting the days that matter</h2>
<p>The countdown above runs to midnight at the start of February 14 where you are, and shows the business days left. For a delivery, those business days are what count, not calendar days. Two quick checks: if February 14 is a Monday, as in 2028, the last regular delivery before it is the Saturday; if it is a Sunday, Saturday again. The ${h.a('super-bowl', 'Super Bowl page')} and the ${h.a('federal-holidays-2027', 'federal holidays of 2027')} give the rest of the February calendar.</p>
<p>Schools and offices make no change for the day itself. When February 14 falls on a weekday, the evening is what changes: restaurant bookings, flower deliveries during working hours, and in schools, the exchange of cards in class that many families prepare a week ahead.</p>`,
  },
});
