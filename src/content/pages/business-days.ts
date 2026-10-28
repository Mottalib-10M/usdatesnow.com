import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'business-days',
  group: 'federal',
  order: 37,
  tool: { kind: 'workdays' },
  mini: { kind: 'mini:bizdays' },
  related: ['federal-holidays-2027', 'bank-holidays-2027', 'days-until-christmas', 'stock-market-holidays'],
  sources: ['frcp6', 'usc6103', 'opm', 'fed'],
  en: {
    slug: 'business-days',
    nav: 'Business days counter',
    card: 'Count the working days between two dates, Monday to Friday, without weekends and federal holidays, and see which holidays were skipped.',
    title: 'Business Days Between Two Dates: 2026 and 2027 Counter',
    description: 'Count business days between two dates, without weekends and the federal holidays of 2026 to 2028, with the skipped holidays listed and the court deadline rule.',
    h1: 'Business days between two dates',
    intro: 'Pick a start date and an end date. The start date is not counted and the end date is, which is how most deadlines are read; switch off holidays to count weekdays only.',
    resume: (h) => {
      const y26 = h.days('2025-12-31', '2026-12-31'), y27 = h.days('2026-12-31', '2027-12-31');
      return `A business day, in the ordinary US sense, is a day from Monday to Friday that is not a federal holiday. The counter above takes two dates, leaves out the start date, counts the end date, removes Saturdays and Sundays, then removes the federal holidays on the days they are observed, which in 2026 means Friday, July 3 rather than Saturday, July 4. It lists the holidays it skipped, so you can check the result or remove one your employer does not observe. Across a whole year the figures are stable: the ${y26} days of 2026 contain 261 weekdays and 250 business days once the eleven holidays are taken out, while the ${y27} days of 2027 contain 261 weekdays but only 249 business days, because the observed New Year's Day of 2028 falls on Friday, December 31, 2027. Courts read deadlines differently: under Rule 6 of the Federal Rules of Civil Procedure a period stated in days counts every calendar day, and only the last day moves off a weekend or holiday.`;
    },
    faqs: (h) => [
      { q: 'Is the first day counted when counting business days?', a: 'Usually not. Most rules, from court deadlines to shipping estimates, start counting the day after the event: a package sent on Monday with a three-business-day service is due Thursday. The counter follows that convention, excluding the start date and including the end date. To count both ends, set the start one day earlier.' },
      { q: 'How many business days are there in 2027?', a: `Two hundred forty-nine for a federal employee: 261 weekdays minus the twelve federal holidays observed inside 2027, which include New Year's Day 2028 observed on Friday, December 31. Someone whose employer gives only six or seven holidays will have more, and the counter lets you switch holidays off to see the weekday total of ${h.num(261)}.` },
      { q: 'Are banks open on every business day?', a: 'Not quite. The Federal Reserve Banks follow the federal list but stay open on the Friday before a holiday that falls on a Saturday, so for payments those Fridays are business days although federal offices are closed. Some banks also open branches on Saturday; for settlement purposes, Saturday is still not a business day.' },
      { q: 'How do courts count a deadline that ends on a holiday?', a: 'Under Rule 6(a) of the Federal Rules of Civil Procedure, you exclude the day of the event, count every day including weekends and holidays, and include the last day; if the last day is a Saturday, Sunday or legal holiday, the period runs to the end of the next day that is none of those. State courts have similar but not identical rules.' },
    ],
    body: (h) => {
      const rows = [2026, 2027, 2028].map((y) => {
        const a = `${y - 1}-12-31`, b = `${y}-12-31`;
        const wk = h.days(a, b) - [...Array(h.days(a, b)).keys()].filter((i) => { const d = new Date(`${h.addDays(a, i + 1)}T00:00:00Z`).getUTCDay(); return d === 0 || d === 6; }).length;
        const obs = [...h.fed(y), ...h.fed(y + 1)].filter((x) => x.observed.startsWith(String(y)));
        return [String(y), h.days(a, b), wk, obs.length, wk - obs.length];
      });
      return `
<h2>Business days in 2026, 2027 and 2028</h2>
${h.table(['Year', 'Calendar days', 'Weekdays', 'Federal holidays observed', 'Business days'], rows, 'Monday to Friday minus the federal holidays on their observed dates (OPM). Computed by the site.', ['l', 'r', 'r', 'r', 'r'])}
<p>The number of weekdays in a year is 260, 261 or 262 depending on the weekday of January 1 and on leap years. The number of federal holidays observed inside the year is usually eleven, but it is twelve in 2027 and ten in 2028, because New Year's Day 2028 is a Saturday and its observed Friday falls on December 31, 2027. Payroll, leave accrual and service-level agreements that assume a fixed count will be one day off in those years.</p>

<h2>What counts as a holiday</h2>
<p>The counter uses the eleven holidays of ${h.src('usc6103', '5 U.S.C. 6103')} on the days ${h.src('opm', 'OPM')} lists as observed. That is the right reference for federal agencies and, through Rule 6(a)(6), for federal court deadlines, which also treat as legal holidays any day declared a holiday by the President or Congress and, for deadlines running in a state, that state's own holidays. For a private contract, read its definition: many say "a day on which banks are open for business in New York", which follows the ${h.src('fed', 'Federal Reserve schedule')} rather than OPM.</p>
<p>The difference shows on Fridays before a Saturday holiday. On Friday, July 3, 2026, federal offices close but the Reserve Banks open; a bank business day count includes it, a federal one does not. The mini-tool under the summary counts with or without holidays from any date, so you can see the effect directly.</p>

<h2>Calendar days, court days and business days</h2>
<p>US rules use three different units, and mixing them is the commonest counting error. Calendar days count every day. ${h.src('frcp6', 'Rule 6 of the Federal Rules of Civil Procedure')} counts calendar days, including weekends and holidays in the middle, but extends the period when the last day is a Saturday, Sunday or legal holiday. Business days skip every weekend day and holiday, which is how most shipping times, bank transfers and consumer notices are expressed.</p>
<p>A worked example: a notice received on Wednesday, November 25, 2026 gives 10 calendar days to respond. Day ten is Saturday, December 5, so a court-style deadline moves to Monday, December 7. Had the notice said ten business days, the count would skip Thanksgiving, both weekends and land on Thursday, December 10.</p>

<h2>Practical uses</h2>
<p>Counting business days helps check a delivery promise, a refund window, a notice period in an employment contract or a project schedule. It also explains why year-end runs short: between Thanksgiving and New Year's Day, two federal holidays and several weekends take out about a week of working days. To see how many are left before December 25 from today, use the ${h.a('days-until-christmas', 'Christmas countdown')}, which shows the business days next to the clock. The holiday calendars used here are on ${h.a('federal-holidays-2027', 'federal holidays 2027')} and ${h.a('bank-holidays-2027', 'bank holidays 2027')}.</p>`;
    },
  },
});
