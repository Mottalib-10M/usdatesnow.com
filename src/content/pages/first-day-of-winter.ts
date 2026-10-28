import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'first-day-of-winter',
  group: 'sky',
  order: 80,
  tool: { kind: 'countdown', props: { event: 'winter' } },
  mini: { kind: 'mini:season' },
  related: ['first-day-of-spring', 'days-until-christmas', 'chinese-new-year', 'labor-day'],
  sources: ['nws_seasons'],
  en: {
    slug: 'first-day-of-winter',
    nav: 'First day of winter',
    card: 'The winter solstice to the minute in your time zone: December 21, 2026 at 3:50 p.m. Eastern, then 2027 and 2028.',
    title: 'First Day of Winter 2026: Solstice Time and Countdown',
    description: 'Winter begins with the solstice on December 21, 2026 at 3:50 p.m. Eastern: a countdown to the minute in your time zone, the 2027 and 2028 times and the method.',
    h1: 'First day of winter 2026: the solstice, to the minute',
    intro: 'The clock counts down to the exact moment of the December solstice, converted to your time zone. Switch the year to see the 2027 and 2028 solstices.',
    resume: (h) => `Astronomical winter in the Northern Hemisphere begins at the December solstice, the moment the Sun reaches its southernmost point in the sky as seen from Earth. In 2026 that moment comes at ${h.season('winter', 2026)}, which is ${h.season('winter', 2026, 'America/Los_Angeles')} on the Pacific coast. In 2027 it comes at ${h.season('winter', 2027)}, and in 2028 at ${h.season('winter', 2028)}. Because the solstice is an instant and not a whole day, its calendar date can differ by time zone: in 2027 it is still December 21 across the United States but already December 22 in Europe and Asia. The countdown above runs to that exact instant in your own time zone and keeps going to the second. The solstice brings the shortest day and the longest night of the year everywhere north of the equator; after it, days lengthen again, slowly at first. Meteorologists, for their statistics, start winter on December 1 instead, so the two definitions differ by about three weeks.`,
    faqs: (h) => [
      { q: 'Is the winter solstice always on December 21?', a: 'In Universal Time it falls on December 21 or 22 in this century, and in US time zones, which are behind, it is December 21 in the continental states every year from 2026 to 2030. Hawaii is the exception in 2028, when the solstice comes on the evening of December 20 local time. Leap years pull the moment back; the years between push it forward.' },
      { q: 'What is the shortest day of the year in 2026?', a: `The day of the solstice, ${h.ev('winter', 2026, 'l')}, has the least daylight of the year in the Northern Hemisphere, although the difference with the days on either side is only seconds. The exact length depends on latitude: far more hours of darkness in Alaska than in Florida. The earliest sunset, however, comes in early December and the latest sunrise in early January.` },
      { q: 'Why do meteorologists say winter starts on December 1?', a: 'Meteorological seasons are blocks of three whole months, December to February for winter, which makes temperature records easier to compare from year to year. They follow the annual temperature cycle rather than the position of the Sun. The astronomical season starts at the solstice, about three weeks later, which is why calendars print December 21.' },
    ],
    body: (h) => `
<h2>Winter solstice times, 2026 to 2030</h2>
${h.table(['Year', 'Eastern Time', 'Central Time', 'Pacific Time', 'Hawaii'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.season('winter', y), h.season('winter', y, 'America/Chicago').replace(/, \d{4}.*?at /, ' at '), h.season('winter', y, 'America/Los_Angeles').replace(/, \d{4}.*?at /, ' at '), h.season('winter', y, 'Pacific/Honolulu').replace(/, \d{4}.*?at /, ' at ')]), 'Computed with the algorithms of Jean Meeus, Astronomical Algorithms, chapter 27; accurate to about a minute.', ['l', 'r', 'r', 'r', 'r'])}
<p>The time moves about six hours later each year, because a calendar year of 365 days is roughly a quarter of a day shorter than the year of the seasons, then jumps back after the leap day of February. That rhythm explains why the solstice slides from afternoon to evening to night across 2026, 2027 and 2028 before coming back.</p>

<h2>How the moment is calculated</h2>
<p>The site uses the method published by the Belgian astronomer Jean Meeus, which first estimates the instant of the solstice from a polynomial in time, then corrects it with a series of periodic terms for the pull of the Moon and planets on the Earth's orbit. The result is in Terrestrial Time; subtracting about 69 seconds converts it to the Universal Time used by clocks. The program has been tested against published solstice and equinox times and agrees to within a couple of minutes, which is the precision shown here. The conversion to your time zone is done by your browser.</p>
<p>The ${h.src('nws_seasons', 'National Weather Service page on the seasons')} explains the geometry: the Earth's axis is tilted by about 23.4 degrees, so through the year each hemisphere leans toward or away from the Sun. At the December solstice the Northern Hemisphere leans farthest away, the Sun is overhead at noon along the Tropic of Capricorn, and the Southern Hemisphere starts its summer.</p>

<h2>Shortest day, earliest sunset, latest sunrise</h2>
<p>The solstice gives the least total daylight, but it is not the day of the earliest sunset or of the latest sunrise. Because the Earth moves fastest in its orbit in early January and the solar day is then slightly longer than 24 hours, sunsets start getting later in mid-December while sunrises keep getting later until early January. The exact dates depend on latitude; in most of the lower 48 states the earliest sunset falls in the first half of December.</p>
<p>The mini-tool under the summary lists all four seasons of a year in Eastern Time, so you can see how long winter lasts: about 89 days, the shortest astronomical season, because the Earth is nearest the Sun in early January and moves fastest then.</p>

<h2>Winter dates around the solstice</h2>
<p>Christmas comes four or so days after the solstice, and the ${h.a('days-until-christmas', 'Christmas countdown')} gives the time left to both. The ${h.a('chinese-new-year', 'Lunar New Year')} is set by the second new moon after the winter solstice, so the solstice is the starting point of its calculation. Winter ends at the March equinox: the ${h.a('first-day-of-spring', 'first day of spring')} page has the 2027 and 2028 times.</p>`,
  },
});
