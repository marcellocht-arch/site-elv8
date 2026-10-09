---
name: weekly-seo
description: Revue SEO hebdomadaire d'elv8co.be à partir d'un export Search Console. À utiliser chaque lundi ou quand Marcel demande où en est le référencement.
---

1. Demander à Marcel l'export Search Console : Performances → comparer les 28 derniers jours aux 28 précédents → Exporter (onglets Requêtes et Pages). Utiliser uniquement les chiffres du fichier.
2. Pages qui ont perdu des clics : la position a-t-elle baissé, ou seulement le taux de clic ?
   - Position en baisse → la page doit être meilleure (brief `page-brief`).
   - Même position mais moins de clics → titre à rendre plus attirant, ou réponse IA de Google au-dessus du résultat. Jamais la même correction pour les deux cas.
3. Requêtes en position 8 à 15 avec des impressions : les plus faciles à faire monter. Les mettre en file pour `page-brief`.
4. Pages dont la page qui reçoit les impressions n'est pas celle prévue pour la requête : signaler (risque de doublon).
5. Pages modifiées depuis moins de 60 jours (voir `seo/journal.md`) : marquer « attendre », ne rien y changer.
6. Écrire `seo/revues/<AAAA-MM-JJ>.md` et proposer 5 actions classées par intérêt commercial (demandes de clients possibles), pas par trafic.
7. Premier lundi du mois : rappeler à Marcel le test manuel des 10 requêtes IA (`seo/STRATEGIE.md`, section 4) et comparer avec le mois précédent.
