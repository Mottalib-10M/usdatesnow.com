import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'veterans-day-closures',
  group: 'open',
  order: 54,
  demarche: true,
  tool: { kind: 'open', props: { focus: 'banks', date: '2026-11-11' } },
  mini: { kind: 'mini:fixedday', props: { e: 5 } },
  related: ['banks-open-today', 'mail-delivery-today', 'stock-market-open-today', 'federal-holidays-2026', 'columbus-day-closures'],
  sources: ['usc6103', 'fed', 'nyse', 'usps_pom', 'opm'],
  en: {
    slug: 'veterans-day-closures',
    nav: 'Veterans Day: what is closed',
    card: 'Banks, post offices, mail, the stock market and federal offices on November 11, for 2026, 2027 and 2028.',
    title: 'Veterans Day 2026 Closures: Banks, Mail, Post Office, Market',
    description: 'What is closed on Veterans Day, Wednesday, November 11, 2026: banks, post offices, mail delivery and federal offices, while the stock market stays open.',
    h1: 'What is closed on Veterans Day 2026?',
    intro: 'The checker opens on November 11, 2026. Change the date to see Veterans Day 2027 or 2028, or the days around it.',
    resume: (h) => `Veterans Day is always November 11, the date of the 1918 armistice, and it is one of the eleven federal holidays in 5 U.S.C. 6103. In 2026 it falls on ${h.ev('veterans', 2026)}, in the middle of the week, so there is no long weekend. Federal offices close and the Federal Reserve Banks do not process payments, so most banks close too. Post offices close and regular mail is not delivered, but because the Postal Service lists Veterans Day among the holidays that are not widely observed, carriers still empty the blue collection boxes. The New York Stock Exchange and Nasdaq stay open with normal hours, as they do every Veterans Day. Schools, state offices and private employers decide for themselves, and many stay open. In 2027 the holiday falls on a Thursday and in 2028 on a Saturday, which moves the federal day off to Friday, November 10, 2028, while banks stay open that Friday and post offices close on the Saturday.`,
    faqs: (h) => [
      { q: 'Is Veterans Day always on November 11?', a: 'Yes, since 1978. From 1971 to 1977 it was moved to the fourth Monday of October under the Uniform Monday Holiday Act, which proved unpopular with veterans groups, and Congress restored the November 11 date. Unlike Memorial Day or Labor Day, it can therefore fall on any day of the week, and a weekend date moves only the observed day off.' },
      { q: 'Is mail picked up on Veterans Day?', a: 'Yes. Veterans Day is one of the five holidays the Postal Service does not count as widely observed, so collection boxes are emptied as on a normal weekday, although post offices close and carriers do not deliver regular mail. Letters posted that day are processed and move toward delivery, which resumes on the next delivery day.' },
      { q: 'Do schools close on Veterans Day?', a: 'It depends on the state and the district. Some states make it a school holiday by law, others leave it to districts, and many schools stay open and hold assemblies or lessons about veterans instead. Federal law sets the holiday for federal employees only. Check the calendar published by your school district for the year.' },
      { q: 'Is it Veteran\'s Day or Veterans Day?', a: 'Veterans Day, with no apostrophe, is the form used in the law and by the Department of Veterans Affairs. The day honors all veterans rather than belonging to one veteran, so the plural is used as a description, not as a possessive. Memorial Day honors those who died in service, while Veterans Day honors everyone who served.' },
    ],
    body: (h) => `
<h2>Veterans Day closures at a glance</h2>
${h.table(['', '2026', '2027', '2028'], [
  ['Date', h.ev('veterans', 2026, 's'), h.ev('veterans', 2027, 's'), h.ev('veterans', 2028, 's')],
  ['Federal offices', `closed ${h.dateS(h.fed(2026)[8].observed)}`, `closed ${h.dateS(h.fed(2027)[8].observed)}`, `closed ${h.dateS(h.fed(2028)[8].observed)}`],
  ['Banks (Federal Reserve)', 'closed', 'closed', 'open Friday'],
  ['Post offices', `closed ${h.dateS(h.usps(2026)[8].uspsClosed)}`, `closed ${h.dateS(h.usps(2027)[8].uspsClosed)}`, `closed ${h.dateS(h.usps(2028)[8].uspsClosed)}`],
  ['Collection boxes', 'emptied', 'emptied', 'emptied'],
  ['Stock market', 'open', 'open', 'closed (Saturday)'],
], 'Computed from 5 U.S.C. 6103, the Federal Reserve schedule, the NYSE calendar and the Postal Operations Manual.', ['l', 'r', 'r', 'r'])}

<h2>Why the stock market ignores Veterans Day</h2>
<p>The ${h.src('nyse', 'NYSE holiday calendar')} has never included Veterans Day. Exchanges close on the holidays most of the economy observes, and Veterans Day is one on which most private businesses work. The bond market is a different matter: bond trading groups usually recommend a full close on Veterans Day, so stocks trade while Treasury trading is thin or closed. Settlement waits for the banks: a stock trade made on Wednesday, November 11, 2026 settles on Thursday, the next day the Federal Reserve is open.</p>

<h2>Banks and payments</h2>
<p>The ${h.src('fed', 'Federal Reserve schedule')} includes Veterans Day, so checks and ACH transfers do not settle on November 11 when it is a weekday. Some banks open their branches anyway, because many customers are working; others close. Either way, a deposit made that day is credited as of the next business day. In 2028 Veterans Day is a Saturday: under the Federal Reserve rule the Reserve Banks open on Friday, November 10, so payments settle normally that Friday, while federal employees have the day off.</p>
<!--tool:open|{"focus":"federal","date":"2028-11-10"}-->

<h2>Post offices and mail</h2>
<p>The ${h.src('usps_pom', 'Postal Operations Manual')} places Veterans Day in its list of national holidays that are not widely observed. The practical result: retail counters close, there is no regular city or rural delivery, but collections run so that the mail of working businesses keeps moving. Priority Mail Express is still delivered. In 2028, when the holiday is a Saturday, the Postal Service keeps it on that Saturday instead of moving it to Friday, so Friday, November 10, 2028 is a normal mail day.</p>

<h2>From Armistice Day to Veterans Day</h2>
<p>The day began as Armistice Day, marking the end of fighting in the First World War at the eleventh hour of the eleventh day of the eleventh month of 1918. Congress made it a legal holiday in 1938 and renamed it Veterans Day in 1954 to honor veterans of all wars. Its brief move to a Monday in the 1970s explains why older calendars sometimes show it in October. Many communities still hold a ceremony at 11 a.m., and a national ceremony takes place at the Tomb of the Unknown Soldier in Arlington National Cemetery. Some private employers that do not close on the day give veterans on their staff time off or flexible hours, a choice left to each employer. The ${h.a('federal-holidays-2026', 'federal holidays 2026 page')} places it among the other ten, and the mini-tool under the summary shows its weekday in any year from 2026 to 2030.</p>`,
  },
});
