import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ramadan',
  group: 'sky',
  order: 83,
  tool: { kind: 'countdown', props: { event: 'ramadan' } },
  mini: { kind: 'mini:ramadan' },
  related: ['chinese-new-year', 'first-day-of-spring', 'business-days', 'home'],
  sources: ['fcna', 'nws_seasons'],
  en: {
    slug: 'ramadan',
    nav: 'Ramadan',
    card: 'Ramadan 2027 is expected to begin around February 8 and Eid al-Fitr around March 9: estimates from the new moon, with the method.',
    title: 'Ramadan 2027: Expected Start Date, Countdown and Eid',
    description: 'Ramadan 2027 should begin around Monday, February 8, with Eid al-Fitr around March 9: estimates from the new moon, a countdown and why sighting moves a day.',
    h1: 'Ramadan 2027: expected start and Eid al-Fitr',
    intro: 'The countdown runs to the expected first day of fasting. It is an astronomical estimate: the date announced by your community can differ by a day.',
    resume: (h) => {
      const r = h.ramadan(1448), r2 = h.ramadan(1449);
      return `Ramadan, the ninth month of the Islamic calendar, begins with the new crescent Moon, so its date moves about eleven days earlier each year in the Gregorian calendar. For the year 1448 of the Hijri calendar, the new moon occurs at ${h.instant(r.newMoon)}, and the crescent should be visible across the Americas the following evening, which makes ${h.dateW(r.firstFast)} the expected first day of fasting, with the first night prayers the evening before. Eid al-Fitr, which ends the month, is expected on ${h.dateW(r.eid)}. In 2028 the month moves into January: Ramadan 1449 is expected to begin on ${h.dateW(r2.firstFast)}, with Eid around ${h.date(r2.eid)}. These dates are estimates. Some communities follow a calculation announced months ahead, others wait to see the crescent locally or follow a sighting in another country, and the actual start can therefore differ by one day from one mosque to the next. The countdown is a planning aid; the announcement of your own community is what counts.`;
    },
    faqs: (h) => [
      { q: 'Why can Ramadan start on different days in the same city?', a: 'Because communities use different methods to decide when the month begins. Some rely on an astronomical calculation fixed in advance, some require the crescent to be seen with the naked eye locally, and some follow the announcement of another country. A crescent that is barely visible on one evening can be seen in one region and not another, which separates the methods by a day.' },
      { q: 'How long is Ramadan in 2027?', a: `Twenty-nine or thirty days, depending on when the next crescent is seen. The estimate on this page gives ${h.plural(h.days(h.ramadan(1448).firstFast, h.ramadan(1448).eid), 'day')} of fasting before Eid. Islamic months follow the lunar cycle of about 29.5 days, so no month has a fixed length; the end is confirmed only near the end of the month.` },
      { q: 'Will Ramadan be in winter for the next few years?', a: `Yes. Because the lunar year is about eleven days shorter than the solar year, Ramadan moves backwards through the seasons over about 33 years. It begins in February in 2027 and in January in 2028, so the fasting days in North America are among the shortest of the cycle, roughly eleven hours between dawn and sunset at mid latitudes.` },
      { q: 'Is Eid al-Fitr a holiday in the United States?', a: 'It is not a federal holiday, so federal offices, banks and post offices open as usual. A number of large school districts close for Eid, and federal employees can use annual leave. Employers must reasonably accommodate religious observance under federal anti-discrimination law unless it causes undue hardship, which in practice often means approving leave or a schedule change.' },
    ],
    body: (h) => {
      const rows = [1447, 1448, 1449, 1450].map((y) => { const r = h.ramadan(y); return [`${y} AH`, h.instant(r.newMoon).replace(/ at .*/, ''), h.dateS(r.firstFast), h.dateS(r.eid)]; });
      return `
<h2>Expected dates, 1447 to 1450 AH</h2>
${h.table(['Hijri year', 'New moon (Eastern Time)', 'First day of fasting', 'Eid al-Fitr'], rows, 'Estimates by the site: first evening when the crescent is about 12 hours old or more over the Americas. Local announcements prevail.', ['l', 'r', 'r', 'r'])}
<p>Ramadan 1447 is shown for reference: it began in February 2026. The dates of 1448 to 1450 are projections. The difference between successive years is ten or eleven days, which is the gap between twelve lunar months and a solar year.</p>

<h2>How the estimate is made</h2>
<p>The program first computes the astronomical new moon, the moment the Moon passes between the Earth and the Sun, with the method of Jean Meeus. A new moon cannot be seen: the thin crescent appears only after the Moon has moved far enough from the Sun, generally when it is at least 12 to 15 hours old and sets well after the Sun. The program therefore looks for the first evening when the Moon is old enough over the Americas, and places the first fast on the following day. Eid al-Fitr is estimated the same way from the next new moon.</p>
<p>This criterion is a simplification. Visibility depends on the angle between the Sun and Moon, the altitude of the Moon at sunset, the clarity of the sky and the observer's latitude. Organizations that fix the calendar by calculation, such as the ${h.src('fcna', 'Fiqh Council of North America')}, apply their own criterion and publish dates ahead of time; committees that rely on sighting announce on the evening itself. In most years they agree; in some they differ by one day.</p>

<h2>Fasting hours in February 2027</h2>
<p>The daily fast runs from dawn to sunset. In early February, at the latitude of New York, the interval is about eleven and a half hours, and it lengthens by one to two minutes each day as the days grow longer toward the ${h.a('first-day-of-spring', 'spring equinox')}. Farther south the change is smaller; in Alaska, the hours lengthen faster. Exact dawn and sunset times depend on your location and on the twilight angle your community uses for dawn, so this site does not publish a timetable.</p>
<p>For work and school planning, the business days of the month can be counted with the ${h.a('business-days', 'business days counter')}: from the estimated first fast of 1448 to the day before Eid, the month covers four full working weeks, with one federal holiday inside it, Washington's Birthday on ${h.ev('presidents', 2027, 'l')}.</p>

<h2>Ramadan and the other moon calendars</h2>
<p>Ramadan 1448 begins two days after the ${h.a('chinese-new-year', 'Lunar New Year')} of 2027. Both calendars start their months near the new moon, but the Chinese calendar adds a leap month every two or three years to stay with the seasons, while the Islamic calendar never does: it is purely lunar. That is why the Lunar New Year always stays in late January or February while Ramadan travels through the whole solar year.</p>`;
    },
  },
});
