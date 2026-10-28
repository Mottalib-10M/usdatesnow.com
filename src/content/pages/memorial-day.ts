import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'memorial-day',
  group: 'federal',
  order: 34,
  tool: { kind: 'countdown', props: { event: 'memorial' } },
  mini: { kind: 'mini:longweekends' },
  related: ['labor-day', 'federal-holidays-2027', 'post-office-open-today', 'bank-holidays-2027', 'fourth-of-july'],
  sources: ['usc6103', 'opm', 'usps_pom', 'fed', 'nyse'],
  en: {
    slug: 'memorial-day',
    nav: 'Memorial Day',
    card: 'The last Monday of May counted down live, with the 3 p.m. moment of remembrance and what closes.',
    title: 'Memorial Day 2027: Date, Countdown and What Is Closed',
    description: 'Memorial Day is May 25, 2026 and May 31, 2027: live countdown, the last-Monday rule since 1971, the 3 p.m. moment of remembrance and what closes that day.',
    h1: 'When is Memorial Day 2027?',
    intro: 'The countdown runs to the start of Memorial Day in your time zone. The year menu shows 2026, 2027 and 2028.',
    resume: (h) => `Memorial Day honors the members of the armed forces who died in service. Since 1971 it has been the last Monday of May, under the Uniform Monday Holiday Act passed in 1968, and it appears with that wording in 5 U.S.C. 6103. The last Monday can fall from May 25 to May 31: ${h.ev('memorial', 2026)}, then ${h.ev('memorial', 2027)}, the latest possible date, and ${h.ev('memorial', 2028)}. Being a Monday, it never needs an observed day and always makes a three-day weekend, traditionally seen as the start of summer. Everything on a federal calendar closes. Federal offices close. The Federal Reserve Banks close, so payments due that day move to Tuesday. The stock exchanges close. Post offices close, and since the Postal Service counts Memorial Day among its six widely observed holidays, there is neither regular delivery nor collection from blue boxes. A national moment of remembrance, set by Congress in 2000, asks everyone to pause for one minute at 3:00 p.m. local time.`,
    faqs: (h) => [
      { q: 'What is the difference between Memorial Day and Veterans Day?', a: 'Memorial Day, in May, remembers those who died while serving in the armed forces. Veterans Day, on November 11, thanks all who served, living or dead. Both are federal holidays, but only Memorial Day is on a Monday by law; Veterans Day stays on November 11 whatever the weekday, and the Postal Service treats it as a holiday on which mail is still collected.' },
      { q: 'Why was Memorial Day once on May 30?', a: 'It began after the Civil War as Decoration Day, when graves were decorated with flowers. In 1868 General John Logan, head of a Union veterans organization, called for observances on May 30, and the date held for a century. The Uniform Monday Holiday Act moved it to the last Monday of May from 1971 to create a long weekend.' },
      { q: 'Should the flag fly at half-staff on Memorial Day?', a: 'Yes, but only in the morning. The Flag Code asks that the flag be flown at half-staff from sunrise until noon on Memorial Day, then raised to the top of the staff for the rest of the day. The morning honors those who died; raising it at noon stands for the resolve of the living to carry on.' },
      { q: 'Is there mail on the Saturday before Memorial Day?', a: `Yes. Saturday ${h.date(h.addDays(h.iso('memorial', 2027)!, -2))} is a normal postal day, with regular delivery and collection. The interruption is limited to Sunday, as every week, and to the Monday holiday itself. If you need a letter to arrive before the holiday weekend, mail it by Thursday; anything posted later is likely to be delivered from Tuesday onward.` },
    ],
    body: (h) => `
<h2>Memorial Day weekends, 2026 to 2030</h2>
${h.table(['Year', 'Memorial Day', 'Long weekend', 'Next federal holiday'], [2026, 2027, 2028, 2029, 2030].map((y) => { const j = h.fed(y)[4]; return [String(y), h.ev('memorial', y, 's'), `${h.dateS(h.addDays(h.iso('memorial', y)!, -2))} to ${h.dateS(h.iso('memorial', y)!)}`, `Juneteenth, ${h.dateS(j.observed)}`]; }), 'Last Monday of May (5 U.S.C. 6103); Juneteenth on its observed day under the OPM weekend rule.', ['l', 'r', 'r', 'r'])}
<p>The rule keeps Memorial Day within the last seven days of May. In 2027 it lands on May 31, the latest possible, so the long weekend closes the month; in 2026 it comes on May 25, the earliest. Since 2021 Juneteenth has filled the gap that used to run from Memorial Day to the Fourth of July.</p>

<h2>Closures, institution by institution</h2>
<p>Memorial Day is one of the simplest holidays to handle, because a Monday never shifts. The ${h.src('opm', 'OPM tables')} give federal employees the day itself. The ${h.src('fed', 'Federal Reserve')} closes its Banks, so automated clearing house payments and wires scheduled for that Monday settle on Tuesday. The ${h.src('nyse', 'stock exchanges')} close for the day. The Postal Service lists the day as a widely observed holiday in ${h.src('usps_pom', 'its Operations Manual')}: retail counters close, regular delivery stops and boxes are not emptied. The checker below confirms it for 2027.</p>
<!--tool:open|{"focus":"post","date":"2027-05-31"}-->

<h2>The national moment of remembrance</h2>
<p>A law passed in 2000 asks Americans to stop at 3:00 p.m. local time on Memorial Day for a minute of silence, to remember those who died in service. Some events, broadcasts and public transport systems mark the minute. On the same day, the President traditionally lays a wreath at the Tomb of the Unknown Soldier at Arlington National Cemetery, and the flag is flown at half-staff until noon.</p>

<h2>Three-day weekends through the year</h2>
<p>Memorial Day is one of the five federal holidays always set on a Monday, with Martin Luther King Jr. Day, Washington's Birthday, Labor Day and Columbus Day; the 1968 act moved three of them there and created the Monday Columbus Day. Each one makes a long weekend every year. The six fixed-date holidays add more only when they fall on a Friday or a Monday after the weekend shift. The mini-tool under the summary counts the long weekends of any year from 2026 to 2030; ${h.a('labor-day', 'Labor Day')} closes the summer that Memorial Day opens, and the ${h.a('federal-holidays-2027', 'federal holidays of 2027')} list the rest.</p>
<p>Under ${h.src('usc6103', '5 U.S.C. 6103')}, the holiday binds federal employees. Private employers are free to set their own schedules, but Memorial Day is one of the most widely given paid holidays in the private sector.</p>
<p>The countdown above counts down to midnight at the start of the Monday, with the business days left before the weekend; the year menu gives 2026, 2027 and 2028.</p>`,
  },
});
