import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'black-friday',
  group: 'countdown',
  order: 10,
  tool: { kind: 'countdown', props: { event: 'blackfriday' } },
  mini: { kind: 'mini:monthweek' },
  related: ['thanksgiving', 'cyber-monday', 'stock-market-open-today', 'banks-open-today', 'days-until-christmas'],
  sources: ['nyse', 'fed', 'opm', 'usps_pom'],
  en: {
    slug: 'black-friday',
    nav: 'Black Friday',
    card: 'The day after Thanksgiving counted down live, and which offices, banks and markets work that Friday.',
    title: 'Black Friday 2026 Date: Countdown, Market Hours, Banks',
    description: 'Black Friday 2026 is November 27: live countdown, the 2027 and 2028 dates, the 1 p.m. stock market close and why banks, post offices and federal offices open.',
    h1: 'When is Black Friday 2026?',
    intro: 'The day after Thanksgiving, counted down to midnight where you are. Switch the year menu to 2027 or 2028.',
    resume: (h) => `Black Friday is not set by any law or company: it is simply the Friday after Thanksgiving, which is the fourth Thursday of November. It therefore falls between November 23 and November 29, on ${h.ev('blackfriday', 2026)}, then on ${h.ev('blackfriday', 2027)} and ${h.ev('blackfriday', 2028)}. For the official calendars it is a working day with one notable exception. The Federal Reserve Banks open, so payroll deposits, transfers and checks are processed. Post offices open with normal hours and the mail is delivered. Federal offices open too, since the day is not on the list of 5 U.S.C. 6103, although the President can grant it as an extra day off by executive order. The exception is the stock market: the New York Stock Exchange and Nasdaq close early, at 1:00 p.m. Eastern time, and the bond market usually ends its session early as well. Many private employers and several state governments give the day as paid leave, which is what makes the Thanksgiving weekend four days long for so many people.`,
    faqs: (h) => [
      { q: 'Why is it called Black Friday?', a: 'The name was first used by police officers in Philadelphia in the 1950s and 1960s to describe the crowds and traffic jams on the day after Thanksgiving, when shoppers and visitors for the Army-Navy football game filled the city. Retailers later popularized another explanation, the day when stores move from losses, in red ink, to profits, in black.' },
      { q: 'Is the stock market open on Black Friday?', a: `Yes, but only until 1:00 p.m. Eastern time. The NYSE and Nasdaq publish the early close every year; for the coming years it applies on ${h.date(h.iso('blackfriday', 2026)!)}, ${h.date(h.iso('blackfriday', 2027)!)} and ${h.date(h.iso('blackfriday', 2028)!)}. Before that hour, trading runs normally from the 9:30 a.m. opening bell.` },
      { q: 'Do I have to work on Black Friday?', a: 'No federal law makes it a day off. Federal employees work unless an executive order grants the day, and private employers set their own policy. Several states list the day after Thanksgiving as a holiday for state staff, and many companies give it as paid leave, but retail and delivery workers usually work longer hours that day.' },
    ],
    body: (h) => `
<h2>Black Friday dates and market hours, 2026 to 2030</h2>
${h.table(['Year', 'Thanksgiving', 'Black Friday', 'Stock market'], [2026, 2027, 2028, 2029, 2030].map((y) => [String(y), h.ev('thanksgiving', y, 's'), h.ev('blackfriday', y, 's'), h.nyseEarly(y).includes(h.iso('blackfriday', y)!) ? 'closes at 1:00 p.m. ET' : 'check calendar']), 'Day after the fourth Thursday of November; early closes from the NYSE calendar for 2026 to 2028, by the same rule after.', ['l', 'r', 'r', 'r'])}
<p>The Friday is always the 23rd to the 29th of November. When Thanksgiving is early, the shopping season up to Christmas is longer; a late Black Friday such as November 29 leaves only 26 days before December 25.</p>

<h2>Who works and who closes</h2>
<p>Each organization publishes its own calendar, and none of them lists Black Friday as a holiday. The ${h.src('opm', 'OPM holiday tables')} for federal employees go from Thanksgiving straight to Christmas. The ${h.src('fed', 'Federal Reserve schedule')} keeps its Banks open, which means wires and automated clearing house payments go through. The Postal Service, whose national holidays are listed in ${h.src('usps_pom', 'its Operations Manual')}, delivers and collects mail as usual. Only the ${h.src('nyse', 'stock exchange calendar')} sets a special schedule, with the 1:00 p.m. close.</p>
<!--tool:mini:bankday-->
<p>Branch hours remain each bank's choice: a branch inside a shopping mall may open longer, a small branch may close early. The Federal Reserve calendar tells you whether money moves, not whether the doors are open.</p>

<h2>Black Friday, then Cyber Monday</h2>
<p>The retail season is built on the Thursday rule. Black Friday is one day after Thanksgiving, Small Business Saturday the day after that, and ${h.a('cyber-monday', 'Cyber Monday')} four days after Thanksgiving. All of them move together each year. Sales often start earlier, sometimes at the beginning of November, but the calendar date of Black Friday is the one people count down to. This site does not track store opening hours or deals, which are decided by each retailer and change every year.</p>

<h2>Counting to the day</h2>
<p>The countdown reaches zero at midnight at the start of the Friday in your time zone. Under it, the business days line counts the working days left, leaving out Veterans Day and Thanksgiving when they fall in between, which helps for an order or a shipment that must arrive before the weekend. The mini-tool under the summary finds any n-th weekday of a month for any year; set to the fourth Thursday of November, it gives Thanksgiving, and the next day is Black Friday.</p>
<p>For payroll staff, Black Friday is an ordinary banking day: a pay date that falls on it does not need to move, unlike a pay date on Thanksgiving Day, when the Federal Reserve is closed and deposits are usually sent a day earlier. For anyone sending a parcel that week, the post office is open on Friday and Saturday, so a shipment can still leave before the weekend.</p>`,
  },
});
