import type { Locale } from './routes';
const en = {
  updatedOn: 'Rules and calendars checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Dates computed and checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Common questions', relatedCalculators: 'Related dates', sourcesTitle: 'Where these dates come from', writtenBy: 'Written by',
  asOf: 'US holiday calendars', lastUpdated: 'read on OPM, Federal Reserve, NYSE and USPS pages, last checked on',
  footerValidated: 'Every date is computed from its rule and checked against the official list where one is published',
  footerBrowser: 'Countdowns run in your browser · nothing you type is sent or stored · free, no account',
  footerDisclaimer: 'US Dates Now is an independent site published by Radif Partners. It is not a government agency, the Postal Service, a bank, the Federal Reserve or a stock exchange. Opening hours of a local branch can differ from the national calendar: check with the branch before a trip. Estimated dates (Ramadan) are labeled as estimates. Everything here is for guidance and does not replace the announcement of the office, bank or exchange concerned.',
  footerPopular: 'Countdowns',
  notFound: 'There is no page at this address. Every countdown is listed on the home page.',
  readMore: 'Read more', back: 'Home',
  independent: 'Independent site, not the Postal Service, a bank or an exchange. Local hours can differ: check your own branch.',
};
export function t(_lang: Locale = 'en') { return en; }
