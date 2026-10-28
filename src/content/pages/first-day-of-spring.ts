import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'first-day-of-spring',
  group: 'sky',
  order: 81,
  tool: { kind: 'countdown', props: { event: 'spring' } },
  mini: { kind: 'mini:season' },
  related: ['first-day-of-winter', 'easter', 'ramadan', 'chinese-new-year'],
  sources: ['nws_seasons'],
  en: {
    slug: 'first-day-of-spring',
    nav: 'First day of spring',
    card: 'The March equinox to the minute: March 20, 2027 in the afternoon, then March 19, 2028 in the evening, Eastern Time.',
    title: 'First Day of Spring 2027: Equinox Time and Countdown',
    description: 'Spring 2027 starts with the equinox on March 20 at 4:24 p.m. Eastern Time, and on March 19 in 2028: a live countdown in your time zone and why the date moves.',
    h1: 'First day of spring 2027: the March equinox',
    intro: 'The countdown runs to the exact instant of the March equinox in your own time zone. Set the year to 2028 to see a March 19 spring.',
    resume: (h) => `Spring begins, astronomically, at the March equinox: the instant the Sun crosses the celestial equator heading north. In 2027 that happens at ${h.season('spring', 2027)}, which is ${h.season('spring', 2027, 'America/Los_Angeles')} in California. In 2028 it comes earlier in the calendar, at ${h.season('spring', 2028)}, so most of the United States starts spring on March 19, a date that surprises people who learned that spring begins on March 21. That older date belongs to the twentieth century: since the Gregorian leap-year pattern makes 2000 a leap year, the equinox has crept earlier and now falls on March 19 or 20 in US time zones. The countdown above runs to the exact minute where you are. After the equinox, days are longer than nights across the Northern Hemisphere until the autumn equinox in September. Meteorological spring, used for weather statistics, starts on March 1 regardless of the Sun.`,
    faqs: (h) => [
      { q: 'Why does spring start on March 19 in 2028?', a: `Because the equinox comes at ${h.season('spring', 2028)}, before midnight in every US time zone. Leap years such as 2028 move it about eighteen hours earlier than in the year before, and the century leap year 2000 added to the drift. Spring began on March 19 in 2020 and 2024 too, and will again in 2032 in most of the country.` },
      { q: 'Are day and night equal on the equinox?', a: 'Nearly but not exactly. Sunrise and sunset are measured from the top edge of the Sun, and the atmosphere bends its light so it is visible a few minutes before it rises geometrically. The result is that daylight already exceeds twelve hours on the equinox at US latitudes. The day with twelve hours each of light and dark comes a few days earlier, in mid-March.' },
      { q: 'Is the first day of spring the same date as Easter calculations use?', a: `No. Church rules fix the spring equinox on March 21 for computing Easter, whatever the real equinox does. Easter is the first Sunday after the first ecclesiastical full moon on or after that date, which gives ${h.ev('easter', 2027, 'l')}, then ${h.ev('easter', 2028, 'l')}. The astronomical equinox plays no direct part.` },
    ],
    body: (h) => `
<h2>March equinox times, 2026 to 2030</h2>
${h.table(['Year', 'Eastern Time', 'Mountain Time', 'Pacific Time', 'Universal Time'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.season('spring', y), h.season('spring', y, 'America/Denver').replace(/, \d{4}.*?at /, ' at '), h.season('spring', y, 'America/Los_Angeles').replace(/, \d{4}.*?at /, ' at '), h.season('spring', y, 'UTC').replace(/, \d{4}.*?at /, ' at ')]), 'Computed with Jean Meeus, Astronomical Algorithms, chapter 27; precision about one minute. Daylight saving time applies on these dates.', ['l', 'r', 'r', 'r', 'r'])}
<p>Daylight saving time has already started by the equinox every year, since clocks move forward on the second Sunday of March, so the US times above are in daylight time. Arizona, except the Navajo Nation, and Hawaii do not change their clocks: in Phoenix the equinox comes one hour earlier on the clock than in Denver.</p>

<h2>Why the date drifts back</h2>
<p>A year of the seasons lasts about 365 days, 5 hours and 49 minutes. Each ordinary year the equinox therefore arrives almost six hours later on the clock, and each leap year, by adding a day, pulls it back by about eighteen hours net. The Gregorian calendar keeps the drift in check over four centuries by skipping three leap years, in 1700, 1800 and 1900, then 2100, 2200 and 2300. The year 2000 was a leap year and did not skip, so the whole twenty-first century runs early. The equinox keeps drifting earlier through the century, to the point of falling on March 19 even in Universal Time from 2044, and the skipped leap day of 2100 will push it back.</p>
<p>The ${h.src('nws_seasons', 'National Weather Service')} page on the seasons explains the astronomy: at the equinox the Earth's axis is tilted neither toward nor away from the Sun, which stands over the equator at noon.</p>

<h2>How the countdown is computed</h2>
<p>The program follows Jean Meeus, whose method gives the equinox from a mean value corrected by 24 periodic terms, then converts Terrestrial Time to Universal Time by subtracting about 69 seconds. Your browser then expresses the moment in your time zone. The figures agree with published astronomical tables within a couple of minutes. The mini-tool under the summary gives the four seasons of any year from 2026 to 2030.</p>
<!--tool:countdown|{"event":"summer","year":2027}-->

<h2>Spring dates that follow the equinox</h2>
<p>Several dates of the spring calendar depend on the equinox, directly or by convention. Easter follows the church equinox of March 21; the ${h.a('easter', 'Easter page')} explains the rule. Ramadan does not depend on the seasons at all, but in 2027 and 2028 it falls in February and January, before spring; the ${h.a('ramadan', 'Ramadan page')} has the estimates. Spring lasts about 92 days and 18 hours, until the June solstice, the first day of summer, which the countdown just above shows for 2027.</p>`,
  },
});
