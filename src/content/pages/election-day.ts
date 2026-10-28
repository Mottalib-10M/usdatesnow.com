import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'election-day',
  group: 'federal',
  order: 36,
  tool: { kind: 'countdown', props: { event: 'election' } },
  mini: { kind: 'mini:election' },
  related: ['federal-holidays-2028', 'veterans-day-closures', 'post-office-open-today', 'business-days'],
  sources: ['election', 'usagov_election', 'usc6103'],
  en: {
    slug: 'election-day',
    nav: 'Election Day',
    card: 'The Tuesday after the first Monday of November: the 2026 midterm and 2028 presidential dates, with a countdown and the rule.',
    title: 'Election Day 2026: November 3 Countdown and the Rule',
    description: 'Election Day 2026 is Tuesday, November 3, and the 2028 presidential election falls on November 7: a live countdown, the rule of 2 U.S.C. 7 and what stays open.',
    h1: 'Election Day 2026: Tuesday, November 3',
    intro: 'The countdown runs to the next federal Election Day in your time zone. Federal elections happen only in even years; switch to 2028 for the presidential election.',
    resume: (h) => `Federal elections in the United States are held on the Tuesday next after the first Monday in November of even-numbered years, a rule written in 2 U.S.C. 7 for the House of Representatives and applied to Senate and presidential elections as well. The 2026 midterm elections therefore take place on ${h.ev('election', 2026)}, and the presidential election of 2028 on ${h.ev('election', 2028)}. The wording "after the first Monday" matters: it keeps Election Day off November 1, so the date always falls between November 2 and November 8. In 2026 November begins on a Sunday, which gives the earliest possible date but one; in 2028 it begins on a Wednesday, which pushes the vote to November 7. Election Day is not one of the eleven federal holidays of 5 U.S.C. 6103: federal offices, banks, the stock market and post offices are open as on any Tuesday, and time off to vote depends on state law. Polling hours, early voting and mail ballot deadlines are set by each state, so check your state election office for those.`,
    faqs: (h) => [
      { q: 'Why is Election Day on a Tuesday?', a: 'When Congress set a single date for choosing presidential electors in 1845, most voters were farmers who might need a full day to reach the county seat. The usual explanation is that Monday kept travel off the Sunday of worship, and Tuesday left Wednesday free for market day. November came after the harvest and before winter roads closed. The rule has stayed although the reasons have faded.' },
      { q: 'Can Election Day ever fall on November 1?', a: `No. The law says the Tuesday next after the first Monday, so when November starts on a Tuesday, the vote moves to the following week, November 8. The earliest possible date is November 2, when November begins on a Monday, as it will in 2032. The 2026 vote, ${h.ev('election', 2026, 'l')}, is one day later than that minimum.` },
      { q: 'Is the post office open on Election Day?', a: 'Yes. Election Day is not a postal holiday, so post offices keep their usual Tuesday hours and mail is delivered and collected. If you vote by mail, ballots usually need to be postmarked or received by a deadline your state sets, and the Postal Service recommends mailing well before the day rather than counting on the last collection.' },
      { q: 'Do employers have to give time off to vote?', a: 'Federal law does not require it for private employers. Many states do, with rules on how many hours, whether they are paid and how much notice the employee must give. Federal agencies grant limited excused absence when polls are not open long enough outside working hours. Check the labor office of your state for the rule that applies to you.' },
    ],
    body: (h) => `
<h2>Election Days from 2026 to 2036</h2>
${h.table(['Year', 'Election Day', 'Type of federal election'], [2026, 2028, 2030, 2032, 2034, 2036].map((y) => [String(y), h.ev('election', y, 's'), y % 4 === 0 ? 'Presidential, House, one third of the Senate' : 'Midterm: House, one third of the Senate']), 'Tuesday after the first Monday of November, 2 U.S.C. 7.', ['l', 'r', 'l'])}
<p>The pattern is the same as for any weekday rule: the date steps back one or two days each cycle and jumps forward when the first Monday returns to the top of the month. Many states hold their own elections on the same day to save costs, and some hold local elections in odd years, which are not covered by the federal statute. The mini-tool under the summary gives the date for any federal election year.</p>

<h2>Where the date comes from</h2>
<p>In the early decades of the republic, states chose presidential electors on different days over a span of several weeks. An act of 1845 set one day for the whole country, the Tuesday next after the first Monday in November, and in 1872 Congress applied the same day to elections for the House. The rule now sits in ${h.src('election', 'section 7 of title 2')} of the US Code; senators have been elected on the same day since direct election began under the Seventeenth Amendment. Changing the date would take an act of Congress.</p>
<p>The ${h.src('usagov_election', 'USAGov Election Day page')} gives the official date together with links to state election offices, which set registration deadlines, polling hours and the rules for early and absentee voting. Those rules differ widely, so this page does not list them.</p>

<h2>Open as usual: offices, banks, markets and mail</h2>
<p>Election Day has never been added to the list of ${h.src('usc6103', 'federal holidays')}, despite regular proposals. Federal offices open, the Federal Reserve Banks process payments, the New York Stock Exchange trades normal hours and post offices deliver and collect mail. Some states and cities close their own offices or schools, often because schools serve as polling places. The checker below confirms the national picture for November 3, 2026.</p>
<!--tool:open|{"focus":"federal","date":"2026-11-03"}-->
<p>A week later comes Veterans Day, which is a federal holiday; the ${h.a('veterans-day-closures', 'Veterans Day page')} shows what closes then. In 2028 the two dates are only four days apart, Tuesday, November 7 and Friday, November 10, the observed day of a Veterans Day that falls on Saturday.</p>

<h2>Counting down to results and transition dates</h2>
<p>The countdown on this page stops at the start of Election Day in your time zone, not at poll closing, which varies from state to state and across time zones. After a presidential election, later steps follow fixed dates set by federal law: the meeting of electors in December, the counting of electoral votes in Congress on January 6 and the inauguration on January 20. For a count of working days between any of these dates, use the ${h.a('business-days', 'business days counter')}.</p>`,
  },
});
