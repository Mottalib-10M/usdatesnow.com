/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Live countdowns to every US holiday and observance, with each date for 2026, 2027 and 2028 computed from its rule (5 U.S.C. 6103, 36 U.S.C. 109 and 117, 2 U.S.C. 7, Easter algorithm, astronomical seasons and lunar dates), the observed days of federal holidays, and what is closed on a given day: post offices, mail delivery, banks on the Federal Reserve calendar, the NYSE and Nasdaq. Independent site, not a government agency, bank, exchange or the Postal Service. Tools run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Rules read on GovInfo (United States Code), OPM, the Federal Reserve Board, NYSE, Nasdaq Trader and USPS pages, retrieved ${words(params.retrieved_at)}.`,
    '',
    `- [US holiday countdowns](${SITE_URL}${route('home', 'en')}): next holidays, live countdown and what is closed today`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
