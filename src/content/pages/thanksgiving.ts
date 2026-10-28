import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'thanksgiving',
  group: 'countdown',
  order: 2,
  tool: { kind: 'countdown', props: { event: 'thanksgiving' } },
  mini: { kind: 'mini:thanks' },
  related: ['black-friday', 'cyber-monday', 'days-until-christmas', 'federal-holidays-2027', 'post-office-open-today'],
  sources: ['usc6103', 'opm', 'nyse', 'usps_pom'],
  en: {
    slug: 'thanksgiving',
    nav: 'Thanksgiving',
    card: 'The fourth Thursday of November for 2026 to 2028, with a live countdown and what closes that week.',
    title: 'Thanksgiving 2026 Date: Countdown and Fourth-Thursday Rule',
    description: 'Thanksgiving 2026 falls on Thursday, November 26: live countdown, the 2027 and 2028 dates, why it moves each year and what is closed on the Thursday and Friday.',
    h1: 'When is Thanksgiving 2026?',
    intro: 'The counter runs to the start of Thanksgiving Day in your time zone. Change the year to plan 2027 or 2028 travel.',
    resume: (h) => `Thanksgiving Day is the fourth Thursday of November, the rule written into 5 U.S.C. 6103 since a joint resolution of 1941. It therefore lands between November 22 and November 28 and never on the same date two years running: ${h.ev('thanksgiving', 2026)}, then ${h.ev('thanksgiving', 2027)} and ${h.ev('thanksgiving', 2028)}. Because it is always a Thursday, it never needs an observed day. Federal offices, post offices, banks that follow the Federal Reserve and the stock markets all close on the Thursday. The Friday after, known as Black Friday, is a normal working day for the federal government, the Reserve Banks and the Postal Service, while the New York Stock Exchange and Nasdaq trade only until 1:00 p.m. Eastern time. Many employers and several states give that Friday off as well, which turns the holiday into a four-day weekend for a large share of workers. The countdown above shows the days, the weekends and the business days left before the holiday in your own time zone.`,
    faqs: (h) => [
      { q: 'Why is Thanksgiving on a different date every year?', a: `Because the law fixes a weekday, not a day of the month. The fourth Thursday of November can fall anywhere from the 22nd to the 28th. The earliest possible date comes next in ${[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].find((y) => h.iso('thanksgiving', y)!.endsWith('-22'))}, the latest in ${[2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033].find((y) => h.iso('thanksgiving', y)!.endsWith('-28'))}, so the holiday season between Thanksgiving and Christmas changes length from year to year.` },
      { q: 'What was Franksgiving?', a: 'In 1939 President Franklin Roosevelt moved Thanksgiving from the last Thursday of November to the one before, to give retailers a longer season before Christmas. November had five Thursdays that year. States split over which date to follow, and in December 1941 Congress settled the question by fixing the fourth Thursday, which applies to this day.' },
      { q: 'Is the Friday after Thanksgiving a federal holiday?', a: 'No. Section 6103 lists only the Thursday. Federal offices open on Friday unless the President grants an extra day by executive order, and the Federal Reserve Banks process payments as usual. Some states make the day after Thanksgiving a holiday for their own employees, and many private employers give it as a paid day off by company policy.' },
      { q: 'Does the mail come on Thanksgiving Day?', a: 'No regular delivery and no collection from blue boxes: Thanksgiving is one of the six holidays the Postal Service treats as widely observed, so retail counters close too. Priority Mail Express can still be delivered. On the Friday after, post offices reopen with normal hours and regular delivery resumes.' },
    ],
    body: (h) => `
<h2>Thanksgiving dates, 2026 to 2030</h2>
${h.table(['Year', 'Thanksgiving', 'Black Friday', 'Days from Thanksgiving to Christmas'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('thanksgiving', y, 's'), h.ev('blackfriday', y, 's'), h.days(h.iso('thanksgiving', y)!, h.iso('christmas', y)!)]), 'Fourth Thursday of November, 5 U.S.C. 6103; the gap to December 25 runs from 27 to 33 days.', ['l', 'r', 'r', 'r'])}
<p>The last column matters to anyone planning shipping, inventory or end-of-year work: a late Thanksgiving, as in ${[2026, 2027, 2028, 2029, 2030].find((y) => h.iso('thanksgiving', y)!.endsWith('-28'))}, leaves less than four weeks before Christmas, while an early one gives almost five.</p>

<h2>From proclamations to a fixed rule</h2>
<p>For most of the nineteenth century there was no national date: each governor proclaimed a day of thanks. In 1863 Abraham Lincoln called for a national Thanksgiving on the last Thursday of November, and his successors kept issuing a proclamation every autumn. Congress made the day a paid holiday for federal workers in the District of Columbia in 1870. The modern rule dates from the dispute of 1939 to 1941: since then the date has been the fourth Thursday, set by statute and repeated today in ${h.src('usc6103', 'section 6103 of title 5')}. Presidents still issue a Thanksgiving proclamation each year, but it no longer chooses the day.</p>

<h2>What closes on Thursday, and what reopens on Friday</h2>
<p>On the Thursday nearly every public service stops. The ${h.src('opm', 'Office of Personnel Management')} lists it as a holiday for all federal employees; the Federal Reserve Banks close, so bank transfers and checks wait until Friday; post offices close and mail is not collected, under the Postal Service's list of widely observed holidays in ${h.src('usps_pom', 'its Operations Manual')}; and the ${h.src('nyse', 'stock exchanges')} do not open.</p>
<p>Friday is a working day with exceptions. Banks are open on the Federal Reserve calendar, though branches can choose their hours. Post offices open normally. The equity markets hold a shortened session ending at 1:00 p.m. Eastern time, and the bond market usually closes early as well. Check any date in the tool below.</p>
<!--tool:open|{"focus":"market","date":"2026-11-27"}-->

<h2>Planning around the long weekend</h2>
<p>The days just before Thanksgiving are among the busiest of the year for road and air travel, and the Sunday after is often the busiest for returns. If you count working days for a deadline that crosses the holiday, remember that the Thursday drops out of any federal business-day count but the Friday stays in: a three-business-day service sent on a Tuesday arrives on Monday, not on Friday. The ${h.a('business-days', 'business days counter')} makes that count for any two dates.</p>
<p>For those cooking, the countdown gives the time left to midnight; for the shopping season, the dates of ${h.a('black-friday', 'Black Friday')} and ${h.a('cyber-monday', 'Cyber Monday')} follow the same Thursday, one and four days later.</p>
<h2>Thanksgiving for schools and employers</h2>
<p>School districts set their own breaks, but most close on the Thursday and Friday, and some for the whole week. Employers that follow the federal list give only the Thursday; a second paid day on Friday is a company or union decision. For shift workers, check whether the holiday premium applies to the calendar day or to the shift that starts on it.</p>`,
  },
});
