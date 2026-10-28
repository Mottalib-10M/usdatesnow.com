import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'super-bowl',
  group: 'countdown',
  order: 9,
  tool: { kind: 'countdown', props: { event: 'superbowl' } },
  mini: { kind: 'mini:superbowl' },
  related: ['valentines-day', 'federal-holidays-2027', 'chinese-new-year', 'business-days'],
  sources: ['nfl_sb'],
  en: {
    slug: 'super-bowl',
    nav: 'Super Bowl',
    card: 'Super Bowl LXI on February 14, 2027 counted down live, with the venue and what is known about LXII.',
    title: 'Super Bowl 2027 Countdown: Date, Venue and Days to Kickoff',
    description: 'Super Bowl LXI is set for Sunday, February 14, 2027 at SoFi Stadium: live countdown in your time zone, the weekend it shares and why 2028 has no date yet.',
    h1: 'When is the next Super Bowl?',
    intro: 'Days, hours and minutes to Super Bowl Sunday in your time zone. The clock counts to the start of the day; kickoff time is set by the broadcaster.',
    resume: (h) => `Unlike a holiday, the Super Bowl has no rule in law: the National Football League sets the date and the stadium, years in advance for the venue and closer to the season for the day. The next game, Super Bowl ${h.P.superBowl.games[1].number}, is scheduled for ${h.dateW(h.P.superBowl.games[1].date!)}, at ${h.P.superBowl.games[1].venue}, the second time that stadium hosts the final. It falls on Valentine's Day and the day before Presidents' Day, the federal holiday of the third Monday of February, which gives many fans a long weekend to recover. The previous game, ${h.P.superBowl.games[0].number}, was played on ${h.date(h.P.superBowl.games[0].date!)} at ${h.P.superBowl.games[0].venue}. Super Bowl ${h.P.superBowl.games[2].number} has been awarded to ${h.P.superBowl.games[2].venue}, but its date has not been announced; this page will show it once the league publishes it, and until then it shows no countdown for 2028 rather than a guess. The countdown runs to midnight at the start of game day in your time zone.`,
    faqs: (h) => [
      { q: 'Why is the Super Bowl in mid-February now?', a: 'Because the season got longer. From 2021 the regular season grew from sixteen to seventeen games over eighteen weeks, which pushed the playoffs and the final one week later. Since then the game has been played on the second Sunday of February, after decades in late January or the first days of February.' },
      { q: 'What time does the Super Bowl kick off?', a: 'The kickoff time is set by the league and its broadcaster for each game and announced ahead of the season. Recent finals have started in the early evening on the East Coast, in the afternoon in the West. This page counts down to the start of the day because the date is official well before the minute is.' },
      { q: 'Is the Monday after the Super Bowl a holiday?', a: `No, there is no legal holiday for the game. In 2027 it happens that the next day is ${h.ev('presidents', 2027, 'l')}, Washington's Birthday, so federal offices, banks and post offices are closed anyway. In most years the Monday is a normal working day, and requests for leave go through each employer.` },
      { q: 'How are Super Bowl numbers counted?', a: `Each game takes a Roman numeral counting from the first one, played in January 1967 in Los Angeles. LX is the sixtieth, LXI the sixty-first and LXII the sixty-second. The numeral belongs to the season that ended, so ${h.P.superBowl.games[1].number}, in February 2027, closes the 2026 season.` },
    ],
    body: (h) => `
<h2>The next three finals</h2>
${h.table(['Game', 'Season', 'Date', 'Stadium', 'Status'], h.P.superBowl.games.map((g, i) => [g.number, String(2025 + i), g.date ? h.dateS(g.date) : 'not announced', g.venue, g.status]), 'Dates and venues as announced by the National Football League.', ['l', 'l', 'r', 'l', 'l'])}
<p>The table comes from the league's own announcements; the site does not estimate a date the league has not published. Venues are awarded years ahead, as with the ${h.src('nfl_sb', 'NFL announcement')} that placed the 2030 game in Nashville and confirmed the games before it. The day itself has followed a regular pattern lately, but a pattern is not a schedule.</p>

<h2>A February 2027 weekend with three dates</h2>
<p>Super Bowl ${h.P.superBowl.games[1].number} falls on Sunday, February 14, 2027. That is Valentine's Day, and the Monday after is Presidents' Day, a federal holiday under the third-Monday rule. The combination matters for anyone planning around the weekend: restaurants face a game night and a date night on the same evening, and banks and post offices are closed that Monday, so a payment due on Monday, February 15 is in practice processed on Tuesday.</p>
<!--tool:open|{"focus":"banks","date":"2027-02-15"}-->
<p>Lunar New Year falls eight days before, on ${h.ev('chinesenewyear', 2027, 'md')}, and with an early Easter, Ash Wednesday comes only ${h.days(h.addDays(h.iso('easter', 2027)!, -46), h.P.superBowl.games[1].date!)} days before the game, on ${h.dateMD(h.addDays(h.iso('easter', 2027)!, -46))}.</p>

<h2>What the countdown counts</h2>
<p>The clock above counts the days, hours, minutes and seconds to midnight at the start of game day in your own time zone, as reported by your browser. That is the moment the date is reached, not the kickoff. For the kickoff, add the announced start time in your zone once it is published. Under the clock you also see the number of weekends and of business days before the game, a figure useful for watch parties, travel or leave requests. If the year menu shows no date for 2028, it is because the league has not set one.</p>

<h2>Practical planning</h2>
<p>For a party, the mini-tool under the summary gives the days left from any starting date along with the venue. For deliveries in the week before the game, count business days rather than calendar days, using the ${h.a('business-days', 'business days counter')}, and remember the Monday holiday in 2027. Retail promotions and broadcaster schedules are commercial decisions this site does not track.</p>
<h2>Why the date is published so late</h2>
<p>The league awards host cities several years ahead, because a stadium, hotels and security need long preparation. The calendar day, however, depends on the shape of the season: the number of regular-season weeks, the bye week before the final and the start date of the following season. Those are fixed when the schedule is released, which is why a venue can be public long before its date. When the date of Super Bowl LXII in Atlanta is published, it will be added to the parameter file of the site and the countdown for 2028 will appear automatically, with the same weekends and business days lines as for the 2027 game.</p>
<p>Fans who travel to the game usually book well ahead of the conference championships, a week or two before the final; those who watch at home need nothing more than the date and the kickoff time in their own zone.</p>`,
  },
});
