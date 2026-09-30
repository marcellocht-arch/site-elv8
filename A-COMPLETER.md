# À compléter — ELV8co

Tous les emplacements marqués **[À COMPLÉTER …]** s'affichent sur le site sous forme de pastille cuivre hachurée, pour être repérés facilement à la relecture. Ils ne sont **jamais** repris dans les données structurées envoyées à Google.

Après chaque modification, régénérez la liste détaillée (en bas de ce fichier) avec :

```bash
npm run todos
```

## 1. Priorité haute (légal et confiance)

| Information | Où la modifier |
| --- | --- |
| Dénomination légale, forme juridique | `src/content/site.ts` (bloc `legal`) + `src/content/legal/mentions-legales.ts` + `src/content/legal/confidentialite.ts` |
| Numéro BCE, numéro de TVA | mêmes fichiers |
| Adresse du siège (rue, code postal) | `src/content/site.ts` + pages légales + `src/content/contact.ts` |
| Responsable de la publication | `src/content/legal/mentions-legales.ts` |
| Dates de mise à jour des pages légales | `src/content/legal/*.ts` (champ `updated`) |
| Prestataire one.com exact (dénomination, adresse) | pages légales |
| Durée de conservation des demandes de contact | `src/content/legal/confidentialite.ts` |
| Accord écrit des clients pour publier leurs vidéos | à vérifier, puis retirer la mention dans `mentions-legales.ts` |

## 2. Études de cas (ne rien inventer)

- **AKP Kustom** — chiffres réels déjà intégrés (24 900 vues organiques ; 20 € → 780 € de CA, 2 clients signés, 39×). À compléter : situation de départ, objectif chiffré éventuel, vidéos, témoignage.
- **Solidas** — ville, présentation, canaux de diffusion, résultats vérifiables, vidéos (dont « Comment déclarer un sinistre »), témoignage.
- **Dessy Immo** — tout est à compléter : ville, services réalisés (champ `services`), objectif, actions, résultats, vidéos, témoignage. Aucun chiffre n'est affiché tant qu'il n'est pas fourni.

Fichiers : `src/content/realisations/*.ts`. Vidéos : voir README, section « Ajouter vos vidéos ».

## 3. Agence et offre

- Histoire de l'agence, fondateur (nom, fonction, bio, photo) : `src/content/a-propos.ts` + photo dans `public/images/`.
- Origine du nom « ELV8 » (proposition : « elevate ») : `src/content/a-propos.ts`.
- Tarifs indicatifs ou mention « sur devis » : FAQ de l'accueil (`src/content/home.ts`) et de `personal-branding.ts`.
- Honoraires de gestion publicitaire : `src/content/services/publicite-meta-linkedin.ts`.
- Conditions de cession des droits sur les vidéos : `src/content/services/contenu-video.ts`.
- Délai indicatif de création d'un site : `src/content/services/creation-site-web.ts`.
- Prise en charge des contenus en allemand (Verviers) : `src/content/zones/verviers.ts`.
- Adresse / quartier à Liège : `src/content/zones/liege.ts`.
- Horaires de disponibilité : `src/content/contact.ts`.

## 4. Réglages hors contenu

- Lien de prise de rendez-vous en ligne (Calendly, Cal.com…) : `src/content/site.ts` → `contact.bookingUrl` (sinon, le bouton renvoie vers le formulaire).
- Réseaux sociaux (Instagram, LinkedIn, Facebook, TikTok) : `src/content/site.ts` → `social` (ils s'ajoutent automatiquement aux données structurées).
- Variables d'environnement SMTP (`SMTP_USER`, `SMTP_PASS`) dans Vercel : voir README.
- Vidéos et images : `public/videos/`, `public/images/`.

## 5. Liste détaillée (générée automatiquement)

<!-- DÉBUT LISTE AUTOMATIQUE (npm run todos) -->

**27 emplacements** trouvés dans le code.

### `src/app/a-propos/page.tsx`

- [ ] ligne 43 — [À COMPLÉTER : photo du fondateur]

### `src/components/templates/CaseStudyPage.tsx`

- [ ] ligne 72 — [À COMPLÉTER : services réalisés]

### `src/components/ui/RichText.tsx`

- [ ] ligne 3 — [À COMPLÉTER[^\]
- [ ] ligne 16 — [À COMPLÉTER …]

### `src/components/ui/VideoFrame.tsx`

- [ ] ligne 63 — [À COMPLÉTER : vidéo 9:16]

### `src/content/legal/confidentialite.ts`

- [ ] ligne 19 — [À COMPLÉTER : dénomination légale et forme juridique]
- [ ] ligne 20 — [À COMPLÉTER : adresse du siège]
- [ ] ligne 21 — [À COMPLÉTER : numéro BCE]
- [ ] ligne 51 — [À COMPLÉTER : vérifier la dénomination exacte du prestataire]

### `src/content/legal/mentions-legales.ts`

- [ ] ligne 20 — [À COMPLÉTER : dénomination légale]
- [ ] ligne 21 — [À COMPLÉTER : forme juridique (SRL, personne physique…)]
- [ ] ligne 22 — [À COMPLÉTER : adresse complète]
- [ ] ligne 23 — [À COMPLÉTER : numéro BCE]
- [ ] ligne 24 — [À COMPLÉTER : numéro de TVA]
- [ ] ligne 34 — [À COMPLÉTER : vérifier la dénomination et l'adresse exactes du prestataire one.com figurant sur votre contrat]

### `src/content/realisations/dessy-immo.ts`

- [ ] ligne 8 — [À COMPLÉTER : ville]

### `src/content/realisations/solidas.ts`

- [ ] ligne 8 — [À COMPLÉTER : ville]

### `src/content/realisations/volt-aqua.ts`

- [ ] ligne 8 — [À COMPLÉTER : ville]

### `src/content/site.ts`

- [ ] ligne 27 — [À COMPLÉTER : dénomination légale]
- [ ] ligne 28 — [À COMPLÉTER : forme juridique]
- [ ] ligne 29 — [À COMPLÉTER : numéro BCE]
- [ ] ligne 30 — [À COMPLÉTER : numéro de TVA]
- [ ] ligne 31 — [À COMPLÉTER : rue et numéro]
- [ ] ligne 32 — [À COMPLÉTER : code postal]

### `src/content/types.ts`

- [ ] ligne 6 — [À COMPLÉTER …]

### `src/lib/seo.ts`

- [ ] ligne 9 — [À COMPLÉTER …]
- [ ] ligne 12 — [À COMPLÉTER[^\]

<!-- FIN LISTE AUTOMATIQUE -->
