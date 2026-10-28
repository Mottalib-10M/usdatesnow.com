import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'chinese-new-year',
  group: 'sky',
  order: 82,
  tool: { kind: 'countdown', props: { event: 'chinesenewyear' } },
  mini: { kind: 'mini:cny' },
  related: ['first-day-of-winter', 'ramadan', 'valentines-day', 'stock-market-open-today'],
  sources: ['hk2027', 'nws_seasons'],
  en: {
    slug: 'chinese-new-year',
    nav: 'Chinese New Year',
    card: 'Lunar New Year on February 6, 2027, the Year of the Goat, then January 26, 2028: a countdown and how the new moon sets the date.',
    title: 'Chinese New Year 2027: February 6 Countdown, Goat Year',
    description: 'Chinese New Year 2027 falls on Saturday, February 6, starting the Year of the Goat, and 2028 on January 26: a countdown, the new-moon rule and dates to 2032.',
    h1: 'Chinese New Year 2027: Saturday, February 6',
    intro: 'The countdown runs to the first day of the lunar year in your time zone. Choose 2028 to see the Year of the Monkey.',
    resume: (h) => `Chinese New Year, also called Lunar New Year or the Spring Festival, is the first day of the Chinese lunisolar calendar. It falls on ${h.ev('chinesenewyear', 2027)}, beginning the Year of the ${h.zodiac(2027)}, after the Year of the ${h.zodiac(2026)} that began on ${h.ev('chinesenewyear', 2026, 'l')}. In 2028 it comes on ${h.ev('chinesenewyear', 2028)}, for the Year of the ${h.zodiac(2028)}. The date is the day of a new moon, counted in China Standard Time, eight hours ahead of Universal Time, and in most years it is the second new moon after the winter solstice, which keeps it between January 21 and February 20. This site computes the new moons with standard astronomical formulas and checks the result against the published holiday calendar of Hong Kong, which lists Lunar New Year's Day 2027 on February 6. In the United States, the day is not a federal holiday: offices, banks, the stock market and post offices are open, while some states and school districts give the day off and many communities hold parades over the following weeks.`,
    faqs: (h) => [
      { q: 'What animal is 2027 in the Chinese zodiac?', a: `The ${h.zodiac(2027)}, sometimes translated as the Sheep or the Ram, from ${h.ev('chinesenewyear', 2027, 'l')} until the eve of the next lunar new year. Someone born in January 2027 belongs to the Year of the ${h.zodiac(2026)}, because the zodiac year starts at the lunar new year rather than on January 1. The twelve animals repeat in a fixed order, so the Goat returns in 2039.` },
      { q: 'Why does Chinese New Year change date every year?', a: 'Because it follows the Moon. A lunar month lasts about 29.5 days, so twelve months make about 354 days, eleven fewer than a solar year. The date therefore moves about eleven days earlier from one year to the next, until an extra month is added, roughly every three years, which pushes it back by about nineteen days. The winter solstice anchors the system.' },
      { q: 'Is Lunar New Year on the same day in the US as in China?', a: 'Communities in the United States celebrate on the date of the Chinese calendar, set by the new moon in Beijing time, even when the new moon itself happens on the previous evening in American time zones. The Vietnamese calendar uses Hanoi time, one hour behind, and in rare years the Vietnamese Tet differs by a day, as in 2007.' },
    ],
    body: (h) => `
<h2>Lunar New Year from 2026 to 2032</h2>
${h.table(['Year', 'Lunar New Year', 'Animal'], [2026, 2027, 2028, 2029, 2030, 2031, 2032].map((y) => [String(y), h.ev('chinesenewyear', y, 's'), h.zodiac(y)]), `New moon in China Standard Time, second after the winter solstice; 2027 checked against the ${h.src('hk2027', 'GovHK holiday list')}.`, ['l', 'r', 'l'])}
<p>The dates jump between late January and mid-February. The pattern follows the leap months of the Chinese calendar: in a year that contains a thirteenth month, the next new year comes late; in the years without one, it comes about eleven days earlier than the year before. The mini-tool under the summary gives the date and animal for any year from 2026 to 2032.</p>

<h2>The rule, in astronomical terms</h2>
<p>Each Chinese month begins on the day of a new moon, the moment the Moon passes between the Earth and the Sun, reckoned in the time zone of Beijing. The winter solstice, described on the ${h.a('first-day-of-winter', 'first day of winter')} page, must fall in the eleventh month. Counting forward from the month that contains the solstice, the new year starts with the second new moon after it, except in the rare years when a leap eleventh or twelfth month intervenes. In the years shown here, 2026 to 2032, that exception does not occur, so the two-new-moon rule gives every date in the table.</p>
<p>The program calculates new moons with the method of Jean Meeus, which is precise to within a minute for these years, converts each one to China Standard Time and takes its calendar day. A new moon that falls shortly before midnight in Beijing could in principle land on the wrong day with a cruder method; the dates here are checked against the published holiday lists for that reason.</p>

<h2>Lunar New Year in the United States</h2>
<p>The day is not one of the eleven federal holidays, so federal offices, banks and post offices work normally, and the New York Stock Exchange trades a full day. The 2027 new year falls on a Saturday in any case. Several states and large school districts with significant Asian American populations recognize the day, either as a school holiday or as an optional day off for state employees, and the rules vary; check your state or district calendar.</p>
<!--tool:open|{"focus":"banks","date":"2027-02-05"}-->
<p>Celebrations spread over about two weeks, from the new year's eve family dinner to the Lantern Festival on the fifteenth day of the first month, which in 2027 falls on February 20. Parades in large cities are often held on a weekend near that period rather than on the day itself.</p>

<h2>Other calendars around the same time</h2>
<p>Lunar New Year in 2027 falls two days before the estimated start of Ramadan, a month that also begins with a new moon but whose start depends on sighting the crescent; the ${h.a('ramadan', 'Ramadan page')} explains the difference. It also comes eight days before ${h.a('valentines-day', "Valentine's Day")}, which in 2027 falls on a Sunday.</p>`,
  },
});
