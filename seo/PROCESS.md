# Process SEO — à lire avant chaque page

Ce fichier est lu par Claude avant de créer ou modifier une page du site. Il traduit pour elv8co.be la méthode « SEO avec l'IA » (Nicholas Dulait, octobre 2026) : choisir les mots-clés qui rapportent, faire mieux que les 3 premiers, gagner des liens, être cité par d'autres, et répéter chaque semaine, sans accélérer.

## Ce que Claude sait faire, et ce qu'il ne sait pas

- Claude **ne connaît ni les volumes de recherche, ni les positions** du site. Tout chiffre de ce type vient de Search Console, de Google Keyword Planner ou d'une recherche manuelle. Sinon on écrit `n/a`. Jamais de chiffre plausible inventé.
- Claude écrit, structure, relie les pages, rédige les données structurées et refait les mêmes vérifications chaque semaine.
- Marcel valide tout ce qui part en ligne (Pull Request → Deploy Preview Netlify → Merge).

## Règles pour chaque nouvelle page

1. **Une requête, une page.** Avant de créer une page, vérifier dans Search Console (Performances → filtrer la requête → onglet Pages) si une page existante reçoit déjà des impressions. Si oui : on améliore cette page, on n'en crée pas une deuxième (sinon les deux se concurrencent).
2. **Intention commerciale d'abord.** Taper la requête dans Google : si les 3 premiers sont des pages de service ou d'agence, c'est une cible. Si ce sont des articles de blog, c'est secondaire pour l'instant.
3. **Le titre porte la page.** Mot-clé principal + ville dans le `title` (moins de 60 caractères) et dans le H1. La meta description sert à donner envie de cliquer.
4. **Un élément que les autres n'ont pas**, sinon on ne publie pas : vraie vidéo ELV8co, chiffres réels (AKP Kustom uniquement, voir `src/content/realisations/akp-kustom.ts`), vraies photos, exemple concret, outil ou checklist. Rien d'inventé.
5. **Pages par commune ou par métier : jamais un copier-coller avec un autre nom.** Chaque variante doit dire quelque chose que seule elle peut dire (contexte local réel, client réel de la zone, exemples propres). Sinon c'est une « page satellite » au sens des règles anti-spam de Google.
6. **Au moins 5 liens internes vers chaque nouvelle page**, placés dans le texte de pages proches (syntaxe `[texte](/chemin)` dans `src/content`). Le texte du lien décrit la page cible. Vérifier avec `npm run check:links`.
7. **Données structurées** : uniquement ce qui est réellement affiché sur la page (FAQ visible → `FAQPage`, article → `Article` avec dates réelles). Voir `src/lib/seo.ts`.
8. **Sitemap** : automatique. Toute page ajoutée au registre `src/lib/routes.ts` y apparaît. Les articles portent leur vraie date (`date`, `updated`).
9. **Après la mise en ligne** : demander l'indexation de l'URL dans Search Console (Inspection de l'URL → Demander une indexation).
10. **Contrôles avant la PR** : `npm run build`, `npm run check:links`, puis `npm run check:seo` sur le build local.

## Garde-fou « rien ne disparaît » (avant chaque PR)

Lister tout ce qui était présent dans l'ancienne version et absent de la nouvelle : vidéos, chiffres, tableaux, FAQ, formulaires, images, liens internes. Si la liste n'est pas vide, l'écrire en première ligne de la description de la PR. Jamais de mise en ligne directe : toujours une branche et un Deploy Preview.

## Rythme

- **1 nouvelle page par semaine**, tenue dans la durée (le mardi, par exemple). Jamais 10 pages d'un coup puis plus rien : Google lit la régularité.
- **Ne pas toucher une page modifiée depuis moins de 60 jours.** Une baisse après une modification est normale ; on attend jusqu'à deux mois avant de conclure.
- **Site jeune (en ligne depuis octobre 2026)** : compter environ 6 mois avant des résultats nets. Ne supprimer aucune page avant 90 jours de données.

## Ce que l'agent peut faire

| Autorisé | Avec l'accord de Marcel | Interdit |
| --- | --- | --- |
| Lire les exports Search Console, rédiger des brouillons et des briefs, ouvrir une branche et une PR | Publier ou modifier une page en ligne (merge) | Supprimer une page |
| Écrire dans `seo/journal.md` | Changer le titre d'une page qui reçoit des clics | Modifier `robots.ts` ou les balises canonical sans demande explicite |
| | Ajouter ou changer une redirection | Toucher aux DNS chez one.com (MX, TXT, DKIM) |
| | | Envoyer un e-mail ou un message à l'extérieur |
| | | Acheter quoi que ce soit (liens, outils) |

## Ce qu'on ne fait pas

- Pas de `llms.txt` à rallonge ni de balisage « spécial IA » : Google indique qu'aucune optimisation particulière n'est nécessaire pour ses réponses IA. Le fichier existant suffit.
- Pas de liens achetés « dofollow ». Pas d'échanges de liens en masse.
- Pas de classement où ELV8co se met lui-même premier.

## Standards éditoriaux (complétés à chaque refus)

Quand Marcel refuse ou corrige une proposition, la raison est ajoutée ici et relue avant chaque brouillon.

- Ne rien inventer : chiffres arrondis vers le bas, vérifiables sur le site ou chez le client.
- Chiffres publiables : uniquement ceux déjà présents dans `src/content/realisations/*.ts` (fournis par Marcel). Aucun nouveau chiffre sans source.
- Contact : WhatsApp 0470 35 43 90 uniquement.
- Petites entreprises locales uniquement (pas de chaînes ni franchises) dans les exemples.
