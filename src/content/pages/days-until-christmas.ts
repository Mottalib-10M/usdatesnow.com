import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'days-until-christmas',
  group: 'countdown',
  order: 1,
  tool: { kind: 'countdown', props: { event: 'christmas' } },
  mini: { kind: 'mini:weekends' },
  related: ['christmas-eve-closures', 'post-office-holidays-2027', 'black-friday', 'federal-holidays-2027', 'business-days'],
  sources: ['usc6103', 'usps_xmas', 'opm', 'nyse'],
  en: {
    slug: 'days-until-christmas',
    nav: 'Days until Christmas',
    card: 'A live clock to December 25 in your time zone, with the weekends, business days and mailing deadlines left.',
    title: 'Days Until Christmas 2026: Live Countdown and Weekends Left',
    description: 'Days until Christmas 2026, live to the second in your time zone, with the weekends and business days left, the USPS mailing deadlines and the 2027 date.',
    h1: 'How many days until Christmas 2026?',
    intro: 'The clock runs to midnight on December 25 where you are. Switch the year to see Christmas 2027 or 2028, or pick another holiday.',
    resume: (h) => `Christmas Day is fixed on December 25, so only its weekday moves: it falls on ${h.ev('christmas', 2026)}, then on ${h.ev('christmas', 2027)} and on ${h.ev('christmas', 2028)}. The countdown above counts down to midnight at the very start of that day in your own time zone, which your browser gives to the page without sending it anywhere, so New York reaches zero three hours before Los Angeles. Under it you get the number of full weekends left, the Saturdays and Sundays, and the business days, leaving out Thanksgiving and any other federal holiday on the way. Christmas is one of the eleven federal holidays listed in 5 U.S.C. 6103. In 2026 it is a Friday, so federal offices, banks, the stock market and post offices all close that Friday, and the weekend runs three days. In 2027 it is a Saturday: federal workers get Friday, December 24 off, the stock market closes that Friday too, but banks following the Federal Reserve calendar stay open.`,
    faqs: (h) => [
      { q: 'What day of the week is Christmas 2026?', a: `A Friday: ${h.ev('christmas', 2026)}. That makes a three-day weekend for most people, from Friday to Sunday, December 27. Christmas Eve is the Thursday before; it is not a federal holiday, but the stock market closes early that afternoon, at 1:00 p.m. Eastern time. In 2027 Christmas moves to a Saturday and in 2028 to a Monday.` },
      { q: 'Is the countdown to midnight or to Christmas morning?', a: 'To midnight at the start of December 25, the moment the date changes on your device. The page reads your time zone from the browser, so the clock is right wherever you are, including Hawaii, Alaska or abroad. If you want the time to opening presents at, say, 7 a.m., add seven hours to what the clock shows. Nothing you see here is sent to a server.' },
      { q: 'When is Christmas observed in 2027?', a: `Christmas 2027 falls on a Saturday, so federal employees have their holiday on ${h.dateW(h.fed(2027)[10].observed)}, under the weekend rule of the Office of Personnel Management. The New York Stock Exchange also closes that Friday. The Federal Reserve Banks, however, do not move a Saturday holiday, so most banks are open that Friday; post offices close on Saturday, December 25 itself.` },
      { q: 'What is the last day to mail Christmas cards and parcels?', a: `For delivery inside the lower 48 states before Christmas 2026, the Postal Service recommends sending by ${h.dateMD(h.P.usps.xmasMailBy2026.groundAdvantage)} for Ground Advantage and First-Class Mail, ${h.dateMD(h.P.usps.xmasMailBy2026.priority)} for Priority Mail and ${h.dateMD(h.P.usps.xmasMailBy2026.priorityExpress)} for Priority Mail Express. These are recommended dates, not guarantees, and Alaska, Hawaii and military addresses have earlier ones.` },
    ],
    body: (h) => `
<h2>Christmas Day on the calendar, 2026 to 2030</h2>
<p>December 25 moves forward one weekday each year and two after a leap year. That small shift changes the shape of the holidays: a Friday or a Monday gives a long weekend to almost everyone, a Saturday or a Sunday moves the day off for federal workers and splits the closures between organizations.</p>
${h.table(['Year', 'Christmas Day', 'Federal day off', 'Banks (Federal Reserve)'], [2026, 2027, 2028, 2029, 2030].map((y) => { const f = h.fed(y)[10]; const b = h.fedBanks(y)[10]; return [String(y), h.ev('christmas', y, 's'), h.dateS(f.observed), b.saturday ? 'open Friday, closed Saturday' : h.dateS(b.fedClosed!)]; }), 'Computed from 5 U.S.C. 6103, the OPM weekend rule and the Federal Reserve holiday schedule.', ['l', 'r', 'r', 'r'])}
<p>The pattern repeats on a 28-year cycle as long as no century year breaks the leap-year rhythm, which will not happen before 2100. Christmas 2026 has the same weekday layout as 2037, and Christmas 2027 as 2032.</p>

<h2>How the countdown is worked out</h2>
<p>The page knows the date of Christmas for any year, so it never needs updating. When it loads, it reads today's date and your time zone from your browser, then counts the whole days to December 25 and ticks the hours, minutes and seconds left until local midnight. Once Christmas is over, the clock moves on to the next one by itself. The weekends line counts the Saturday and Sunday pairs that fall entirely before Christmas; the business days line counts Monday to Friday up to and including Christmas Eve, without the federal holidays observed on the way, which in late October means Veterans Day and Thanksgiving.</p>
<p>The mini-tool under the summary does the same count from any starting date: useful to plan a delivery, a project milestone or simply the number of Saturdays left for shopping.</p>

<h2>What is open on Christmas Eve and Christmas Day</h2>
<p>Christmas Day closes nearly everything that follows a federal calendar. Post offices close and there is no regular mail delivery or collection, because Christmas is one of the six holidays the Postal Service treats as widely observed. Banks close because the Federal Reserve Banks do not process payments. The ${h.src('nyse', 'New York Stock Exchange')} and Nasdaq close for the full day.</p>
<p>Christmas Eve is different. It is not a legal holiday, so federal offices open unless the President grants an extra day off by executive order, as happened on December 24, 2025. The stock market closes early, at 1:00 p.m. Eastern time, when December 24 is a weekday. Post offices usually open with normal hours and may close early locally. The ${h.a('christmas-eve-closures', 'Christmas Eve page')} gives the details for 2026 and 2027.</p>
<!--tool:open|{"focus":"post","date":"2026-12-24"}-->

<h2>Mailing before Christmas</h2>
<p>The Postal Service publishes recommended send-by dates each autumn. For 2026, ${h.src('usps_xmas', 'its list')} gives ${h.dateW(h.P.usps.xmasMailBy2026.groundAdvantage)} for USPS Ground Advantage and First-Class Mail, ${h.dateW(h.P.usps.xmasMailBy2026.priority)} for Priority Mail and ${h.dateW(h.P.usps.xmasMailBy2026.priorityExpress)} for Priority Mail Express, for delivery within the contiguous United States. Earlier dates apply to Alaska, Hawaii and military mail overseas. Private carriers set their own cut-offs, which this site does not list because they change from year to year without an official text.</p>
<p>For anything sent in the last week, count business days rather than calendar days: the ${h.a('business-days', 'business days counter')} removes weekends and federal holidays so that a two- or three-day service can be checked against the calendar.</p>

<h2>Why Christmas is a federal holiday</h2>
<p>Congress made Christmas a holiday for federal workers in the District of Columbia in 1870, in the same act that created New Year's Day, Independence Day and Thanksgiving holidays. It is listed today in ${h.src('usc6103', 'section 6103 of title 5')} alongside the ten others. That statute covers federal employees only: no federal law obliges private employers to give the day off or to pay a premium for working it, although most do through their own policies or union contracts. States have their own lists, and all of them include Christmas.</p>`,
  },
});
