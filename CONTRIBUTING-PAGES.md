# US Dates : ajouter ou mettre à jour une page

Site anglais (en-US) de comptes à rebours et de calendriers de fermeture américains, édité par Radif Partners.
Port local : 5719 (`npm run dev`, `npm run preview`). Contrôle complet : `npm run check` (doit finir à 0 défaut).

## Une page = un fichier

`src/content/pages/<id>.ts`, `definePage({...})` (types dans `src/lib/guide-types.ts`), rendu par
`src/pages/en/[...slug].astro` → `ContentPage.astro`. Groupes : `countdown`, `federal`, `open`, `sky`.

- `tool` : `countdown` (props `event`, `year`, `lock`), `holidays` (`cal` = federal | fed | nyse | usps, `year`),
  `open` (`focus` = post | mail | banks | market | federal, `date`), `workdays` (`to`) ou `mini:<spec>` de `src/lib/mini-specs.ts`.
- Dans le corps : `<!--tool:open|{"focus":"post","date":"2026-12-24"}-->` insère un outil.
- Toute date passe par les helpers (`h.ev`, `h.fed`, `h.fedBanks`, `h.nyse`, `h.usps`, `h.season`, `h.ramadan`) :
  aucune date ISO dans le texte visible, aucune date tapée à la main.
- Règles vérifiées par `npx vitest run tests/pages.test.ts` : titre 50–60 caractères (terme clé d'abord, jamais
  « US », « How », « When »…), description 150–160, résumé ≥ 120 mots en un paragraphe, 3 à 5 FAQ de 42 à 88 mots
  uniques sur le site, résumé + corps ≥ 650 mots, ≥ 3 `<h2>`, ≥ 3 pages liées, ≥ 1 source, pas de tiret cadratin.
- Pages d'organisme (`open`) : `demarche: true` (ligne « site indépendant » sous le H1). Jamais de logo USPS ou de
  banque, jamais d'horaires de magasin ou d'agence non sourcés.

## Moteur et données

- `src/lib/engine/dates.ts` (jours, n-ième jour de semaine, Pâques, jours ouvrés), `holidays.ts` (11 jours fériés
  fédéraux, règles de report OPM / Federal Reserve / NYSE / USPS, événements), `astro.ts` (saisons Meeus ch. 27,
  nouvelles lunes ch. 49, Nouvel An chinois, estimation du Ramadan).
- `src/data/params-2026.json` : sources (URL officielles), listes publiées (OPM 2026–2028, Fed 2026–2028, NYSE
  2026–2028 et fermetures à 13 h, dates d'envoi USPS de Noël 2026, Super Bowl). `tests/engine.test.ts` vérifie que le
  moteur reproduit chaque liste au jour près.

## Mise à jour (manuelle, lue le 28 octobre 2026)

Chaque année, dès publication :
1. OPM : table de l'année N+2 → `federal.opmYYYY` ; décret présidentiel de jour chômé → `federal.extraDaysByOrder`.
2. Federal Reserve (k8) et NYSE : listes de l'année N+2, fermetures anticipées → `fed`, `nyse`.
3. USPS : dates recommandées d'envoi pour Noël (communiqué de septembre) → `usps.xmasMailBy<année>`.
4. NFL : date du Super Bowl dès son annonce (LXII 2028 : date non annoncée au 28 octobre 2026).
5. `retrieved_at`, puis `npm run check`.

## Droits

Textes et listes de l'administration fédérale (GovInfo, OPM, Federal Reserve Board, USPS, National Weather Service) :
œuvres du gouvernement fédéral, domaine public (17 U.S.C. 105). NYSE, Nasdaq, NFL, GovHK, Fiqh Council : seuls des
faits (dates) sont repris, avec lien vers la page source ; aucun texte copié. Les rédactions du site sont originales.

## SERP au 28 octobre 2026 (constat éditeur, ne pas publier)

Requêtes « days until christmas », « federal holidays 2027 », « is the post office open today » : premiers résultats
= horloges à mur de consentement ou écrans noirs, pages de compte à rebours chargées de publicité sans règle ni
année suivante, liste OPM brute sans report par organisme, pages « 2027 » encore vides chez certains éditeurs.
US Dates répond par : dates 2026–2028 calculées et testées contre les listes officielles, report de week-end
propre à chaque organisme (bureaux, Fed, NYSE, USPS), compte à rebours dans le fuseau du visiteur avec jours ouvrés
et week-ends, sans formulaire ni envoi de données.
