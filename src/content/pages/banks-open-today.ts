import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'banks-open-today',
  group: 'open',
  order: 52,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'banks' } },
  mini: { kind: 'mini:bankday' },
  related: ['bank-holidays-2026', 'bank-holidays-2027', 'stock-market-open-today', 'veterans-day-closures', 'business-days'],
  sources: ['fed', 'usc6103', 'opm'],
  en: {
    slug: 'banks-open-today',
    nav: 'Banks open today?',
    card: 'Whether banks are open on a date, based on the Federal Reserve payment calendar, and what it means for deposits and transfers.',
    title: 'Banks Open Today? Federal Reserve Holidays and Weekend Rules',
    description: 'Are banks open today? Check any date against the Federal Reserve holiday calendar, see why Saturday holidays keep banks open on Friday and when payments settle.',
    h1: 'Are banks open today?',
    intro: 'The checker uses today in your time zone. Enter another date to see whether the Federal Reserve Banks process payments that day and why.',
    resume: (h) => `Banks in the United States set their own branch hours, but nearly all of them close on the days the Federal Reserve Banks close, because checks, ACH transfers and wire payments do not settle on those days. The Federal Reserve observes the eleven federal holidays with one twist: when a holiday falls on a Saturday, the Reserve Banks stay open on the Friday before, while federal offices close that Friday. When a holiday falls on a Sunday, they close on the Monday after. In 2026 that rule matters once, for Independence Day: Friday, July 3 is a business day for payments. In 2027 it matters three times, for Juneteenth on Saturday, June 19, for Christmas on Saturday, December 25 and for New Year's Day 2028, which is also a Saturday. On ${h.dateW(h.fed(2027)[10].observed)}, federal offices and the stock market are closed but payments move. The checker above answers for any date and gives the reason.`,
    faqs: (h) => [
      { q: 'Why are banks open on the Friday before a Saturday holiday?', a: `Because the Federal Reserve Banks do not move a Saturday holiday. Its published schedule says that for holidays falling on a Saturday, the Reserve Banks will be open the preceding Friday. Payments therefore settle that Friday, and banks that follow the Federal Reserve calendar open. That is why ${h.dateW(h.fed(2027)[4].observed)} is a normal banking day although federal offices close.` },
      { q: 'Will my direct deposit arrive early because of a bank holiday?', a: 'Often, but it depends on your employer and your bank. When a payday falls on a day the Federal Reserve is closed, many payroll providers send the file so that the money settles on the business day before. Some banks also release incoming deposits as soon as they receive the payment file. Check the date with your employer if the payment is critical.' },
      { q: 'Are banks open on Veterans Day and Columbus Day?', a: `The Federal Reserve Banks close on both, so most banks close or offer limited service and transfers do not settle. Some banks choose to keep branches open on those two days because many businesses work, which is allowed. The stock market, on the other hand, is open on both. Veterans Day is ${h.ev('veterans', 2026)} this year.` },
      { q: 'Do online transfers work on a bank holiday?', a: 'You can usually initiate a transfer in your banking app at any time, but it is processed on the next business day of the Federal Reserve. Card payments and ATM withdrawals keep working because they run on separate networks. Instant payment services that settle around the clock can move money on holidays if both banks take part in them.' },
    ],
    body: (h) => `
<h2>Federal Reserve closing days, 2026 to 2028</h2>
<p>The ${h.src('fed', 'Federal Reserve Board publishes')} the holidays observed by the Federal Reserve System five years ahead. The program behind this page reproduces that list from the rules and the tests fail if a single day differs.</p>
${h.table(['Holiday', '2026', '2027', '2028'], h.fedBanks(2026).map((x, i) => { const c = (y: number) => { const b = h.fedBanks(y)[i]; return b.fedClosed ? h.dateS(b.fedClosed) : 'open (Saturday)'; }; return [x.name, c(2026), c(2027), c(2028)]; }), '"Open (Saturday)": the holiday falls on a Saturday and the Reserve Banks open on the Friday before.', ['l', 'r', 'r', 'r'])}
<p>Count the closing days: ten in 2026, nine in 2027 and nine in 2028. New Year's Day 2028 belongs to the 2028 column, and because it is a Saturday, Friday, December 31, 2027 stays a business day for payments.</p>

<h2>Bank branches, the Federal Reserve and the difference between them</h2>
<p>No federal law closes bank branches on holidays. Banks decide their own hours and are free to open on a federal holiday. What they cannot do is settle payments through the Federal Reserve on a day when it is closed, so most choose to close. Credit unions and online banks usually follow the same calendar. This page does not list the hours of any particular bank: those vary by institution and by branch, and only the bank can state them.</p>
<p>The weekend rule is where banks and federal offices part ways. The ${h.src('opm', 'Office of Personnel Management')} moves a Saturday holiday to Friday for federal workers, and the stock market does the same, but the Federal Reserve does not. On those Fridays the checker shows federal offices closed and banks open.</p>

<h2>What a bank holiday means for your money</h2>
<p>A check deposited on a bank holiday is treated as deposited on the next business day, which also delays the funds availability schedule by one day. An ACH transfer scheduled for a holiday usually settles the next business day. Bills with a due date on a holiday are often accepted the next business day without a late fee, but that depends on the creditor's terms, not on a general rule. Mortgage and loan payments set up as automatic debits normally move to the next business day as well.</p>
<p>Business days, as used in banking, are Monday to Friday excluding the Federal Reserve holidays. The ${h.a('business-days', 'business days counter')} counts them between two dates, and the mini-tool under the summary checks a single date with the state of the stock market alongside.</p>
<!--tool:holidays|{"cal":"fed","year":2026}-->

<h2>Days that look like holidays but are not</h2>
<p>Several days close some businesses without closing the Federal Reserve. Good Friday closes the stock market, not the Reserve Banks. The day after Thanksgiving, Christmas Eve and New Year's Eve are regular business days for payments, although some branches shorten their hours. Election Day is not a federal holiday either. State holidays, such as Cesar Chavez Day or Patriots' Day, may close state offices and sometimes local bank branches, while payments still settle. The year pages for ${h.a('bank-holidays-2026', '2026')} and ${h.a('bank-holidays-2027', '2027')} give the dates in full.</p>`,
  },
});
