---
name: ship-page
description: Rédige ou modifie une page d'elv8co.be à partir de son brief et prépare sa mise en ligne en toute sécurité. À utiliser après page-brief, ou pour toute réécriture de page.
---

1. Lire `seo/PROCESS.md` (règles et standards éditoriaux) et `seo/briefs/<slug>.md`.
2. Écrire la page dans `src/content/` en suivant les gabarits existants (`ServicePage`, `ZonePage`, articles de `conseils.ts`). Ne jamais inventer de mise en page.
3. Un seul H1 avec la requête principale. Title et meta du brief. Données structurées correspondant uniquement à ce qui est affiché.
4. Ajouter la page au registre `src/lib/routes.ts` si nécessaire (le sitemap suit automatiquement).
5. Ajouter au moins 5 liens vers la page dans le texte de pages proches (`[texte](/chemin)`), puis `npm run check:links`.
6. **Garde-fou « rien ne disparaît »** : comparer avec l'ancienne version (ou la page de référence) et lister tout élément absent de la nouvelle : vidéos, chiffres, tableaux, FAQ, formulaires, images, liens internes. Si la liste n'est pas vide, l'écrire en première ligne de la description de la PR.
7. `npm run build`, puis `npm run check:seo` sur le build local.
8. Branche + Pull Request. Jamais de commit direct sur `main`. Marcel vérifie le Deploy Preview Netlify et merge lui-même.
9. Après le merge : rappeler à Marcel de demander l'indexation de l'URL dans Search Console, et noter la page dans `seo/journal.md` (date, URL, requête visée).
