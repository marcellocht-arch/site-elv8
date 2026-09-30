# ELV8co — site de l'agence

Site multi-pages de l'agence **ELV8co** (Liège) : personal branding, contenu vidéo vertical, publicité Meta & LinkedIn, et services complémentaires (sites web, community management) réalisés avec un réseau de freelances.

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**, pages générées en statique (SSG), prêt pour **Vercel**
- Animations : **GSAP** (ScrollTrigger, SplitText), **Lenis** (défilement fluide), **OGL** (effet WebGL du hero de l'accueil)
- Respect de « réduire les animations » (`prefers-reduced-motion`) sur tout le site
- Formulaire de contact : route API Next.js + **Nodemailer** via le SMTP one.com
- SEO local : métadonnées par page, données structurées JSON-LD, sitemap, robots, images Open Graph générées automatiquement

Résultats Lighthouse mesurés en local (mobile, build de production) : **90–93** en performance, **100** en accessibilité, bonnes pratiques et SEO. En production sur Vercel (CDN, HTTP/2, compression Brotli), les scores sont généralement un peu meilleurs.

---

## Sommaire

1. [Démarrer en local](#1-démarrer-en-local)
2. [Organisation du projet](#2-organisation-du-projet)
3. [Modifier les textes](#3-modifier-les-textes)
4. [Modifier les couleurs et les polices](#4-modifier-les-couleurs-et-les-polices)
5. [Ajouter vos vidéos et photos](#5-ajouter-vos-vidéos-et-photos)
6. [Configurer les variables d'environnement](#6-configurer-les-variables-denvironnement)
7. [Déployer sur Vercel](#7-déployer-sur-vercel)
8. [Relier le domaine elv8co.be (DNS chez one.com)](#8-relier-le-domaine-elv8cobe-dns-chez-onecom)
9. [Déclarer le site dans Google Search Console](#9-déclarer-le-site-dans-google-search-console)
10. [Créer la fiche Google Business Profile](#10-créer-la-fiche-google-business-profile)
11. [Mesure d'audience et cookies (optionnel)](#11-mesure-daudience-et-cookies-optionnel)
12. [Animations : ce qu'il faut savoir](#12-animations--ce-quil-faut-savoir)
13. [Commandes utiles](#13-commandes-utiles)

---

## 1. Démarrer en local

Prérequis : **Node.js 20.9 ou plus récent** (22 recommandé).

```bash
npm install
cp .env.example .env.local   # puis renseignez SMTP_PASS (voir section 6)
npm run dev                  # http://localhost:3000
```

Pour tester la version de production :

```bash
npm run build
npm start
```

## 2. Organisation du projet

```
src/
├── app/                    Pages (une par URL) et routes techniques
│   ├── page.tsx            Accueil
│   ├── personal-branding/  … un dossier par page service
│   ├── realisations/       Hub + [slug] (études de cas)
│   ├── zones/              Hub + [slug] (pages villes)
│   ├── api/contact/        Envoi du formulaire (Nodemailer)
│   ├── og/[slug]/          Images Open Graph générées automatiquement
│   ├── sitemap.ts          sitemap.xml
│   └── robots.ts           robots.txt
├── content/                ⇦ TOUS LES TEXTES DU SITE (un fichier par page)
├── components/             Composants réutilisables (layout, animations, sections…)
├── lib/                    SEO, e-mails, validation du formulaire, GSAP
├── styles/theme.css        ⇦ Couleurs, polices, rayons (Tailwind)
├── theme/tokens.ts         ⇦ Les mêmes couleurs pour les e-mails et images OG
└── assets/fonts/           Polices auto-hébergées (Instrument Serif, Inter)
public/
├── videos/                 ⇦ Vos vidéos (MP4)
└── images/                 ⇦ Vos photos et aperçus de vidéos
```

## 3. Modifier les textes

Tous les textes sont dans `src/content/`, **un fichier par page** :

| Page | Fichier |
| --- | --- |
| Accueil `/` | `src/content/home.ts` |
| Personal branding | `src/content/services/personal-branding.ts` |
| Contenu vidéo | `src/content/services/contenu-video.ts` |
| Publicité Meta & LinkedIn | `src/content/services/publicite-meta-linkedin.ts` |
| Création de sites web | `src/content/services/creation-site-web.ts` |
| Community management | `src/content/services/community-management.ts` |
| Réalisations (hub) | `src/content/realisations/index.ts` |
| Études de cas | `src/content/realisations/solidas.ts`, `akp-kustom.ts`, `dessy-immo.ts` |
| Zones (hub) | `src/content/zones/index.ts` |
| Pages villes | `src/content/zones/liege.ts`, `namur.ts`, `verviers.ts`, `province-de-luxembourg.ts` |
| À propos | `src/content/a-propos.ts` |
| Contact | `src/content/contact.ts` |
| Mentions légales / Confidentialité | `src/content/legal/mentions-legales.ts`, `confidentialite.ts` |
| Page 404 | `src/content/not-found.ts` |
| Coordonnées, menu, pied de page, options du formulaire | `src/content/site.ts` |

Règles simples :

- Modifiez uniquement le texte **entre guillemets**. Gardez les virgules et les accolades.
- Si votre texte contient un guillemet droit `"`, utilisez plutôt les guillemets français « … ».
- `*mot*` met un mot en valeur (cuivre, italique). Exemple : `"Devenez *visible*."`
- Dans les grands titres, un `/` isolé force un retour à la ligne sur tablette et ordinateur.
- `[À COMPLÉTER : …]` s'affiche comme une pastille à remplacer. La liste complète est dans **`A-COMPLETER.md`** (`npm run todos` la met à jour).
- Les espaces insécables françaises (avant `?`, `:`, `€`…) et les apostrophes typographiques sont ajoutées automatiquement.

**SEO** : chaque fichier contient un bloc `seo` avec `title` (moins de 60 caractères), `description` (moins de 155) et les mots-clés visés. Après modification, vérifiez les longueurs avec `npm run check:seo` (voir section 13).

> Ajouter une étude de cas ou une zone : dupliquez un fichier existant, changez le `slug`, puis ajoutez-le à la liste dans `src/content/realisations/index.ts` ou `src/content/zones/index.ts`. La page, le sitemap et l'image Open Graph sont créés automatiquement.

## 4. Modifier les couleurs et les polices

- **`src/styles/theme.css`** : couleurs et polices utilisées par Tailwind (`bg-night`, `text-copper-light`…).
- **`src/theme/tokens.ts`** : les mêmes couleurs pour les e-mails, les images Open Graph et le navigateur. Gardez les deux fichiers identiques.
- Polices : Instrument Serif (titres) et Inter (texte), auto-hébergées dans `src/assets/fonts/` et chargées dans `src/app/layout.tsx` (aucun appel à Google Fonts, pas de blocage de l'affichage).

## 5. Ajouter vos vidéos et photos

### Vidéos des études de cas (cadres 9:16)

1. Exportez chaque vidéo en **MP4 (H.264)**, format vertical **1080 × 1920**, idéalement **moins de 8 Mo** (15–30 s). Un outil gratuit comme HandBrake suffit (préréglage « Fast 1080p30 », qualité RF 26–28).
2. Exportez une image d'aperçu (**JPG ou WebP**, 1080 × 1920) pour chaque vidéo.
3. Placez les fichiers dans `public/videos/` et `public/images/`, par exemple :
   - `public/videos/akp-kustom-1.mp4`
   - `public/images/akp-kustom-1.jpg`
4. Dans le fichier de l'étude de cas (ex. `src/content/realisations/akp-kustom.ts`), complétez le bloc `videos` :

```ts
videos: [
  { title: "Vidéo à 24 900 vues", src: "/videos/akp-kustom-1.mp4", poster: "/images/akp-kustom-1.jpg", caption: "La vidéo organique la plus vue." },
],
```

Les vidéos ne se chargent qu'à l'approche de l'écran, jouent sans le son et en boucle, et se mettent en pause hors de l'écran : elles ne ralentissent pas la page.

> Vidéos lourdes ou nombreuses : préférez un hébergement dédié (Vercel Blob, Bunny Stream, Cloudflare Stream…) et indiquez l'URL complète dans `src`.

### Photos

Déposez vos photos dans `public/images/` et affichez-les avec le composant `next/image` (conversion automatique en AVIF/WebP, dimensions adaptées à l'écran) :

```tsx
import Image from "next/image";

<Image src="/images/portrait.jpg" alt="Portrait de [prénom], fondateur d'ELV8co, dans l'atelier d'un client à Liège" width={1200} height={1500} sizes="(min-width: 1024px) 40vw, 100vw" />
```

Rédigez toujours un texte `alt` **descriptif** (qui, quoi, où) : c'est utile pour l'accessibilité et pour le référencement.
L'emplacement de la photo du fondateur est prévu sur la page À propos (`src/app/a-propos/page.tsx`, bloc « [À COMPLÉTER : photo du fondateur] »).

## 6. Configurer les variables d'environnement

Les identifiants ne sont **jamais** écrits dans le code. Ils sont lus depuis des variables d'environnement (modèle : `.env.example`).

| Variable | Valeur |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://elv8co.be` |
| `SMTP_HOST` | `send.one.com` |
| `SMTP_PORT` | `465` (SSL) |
| `SMTP_USER` | l'adresse e-mail one.com qui envoie, ex. `contact@elv8co.be` |
| `SMTP_PASS` | le mot de passe de cette boîte e-mail one.com |
| `CONTACT_TO` | l'adresse qui reçoit les demandes, ex. `contact@elv8co.be` |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | vide par défaut (voir section 11) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | optionnel (voir section 9) |

- **En local** : dans `.env.local` (ce fichier est ignoré par Git).
- **Sur Vercel** : Project → Settings → Environment Variables. Ajoutez-les pour « Production » (et « Preview » si vous voulez tester), puis redéployez.

Fonctionnement du formulaire (`src/app/api/contact/route.ts`) :

- validation côté serveur de tous les champs, consentement RGPD obligatoire ;
- anti-spam : champ piège invisible (honeypot), délai minimal de remplissage, contrôle de l'origine, limite de 5 envois par adresse IP sur 10 minutes ;
- un e-mail vous est envoyé (répondre = répondre au prospect), puis un **e-mail de confirmation aux couleurs de la marque** part vers le prospect ;
- si l'envoi échoue, le visiteur voit un message d'erreur avec vos coordonnées directes.

> La limite de fréquence est gardée en mémoire par le serveur : elle freine efficacement les abus courants. Si un jour le formulaire est ciblé par du spam massif, ajoutez un service comme Cloudflare Turnstile ou Upstash Rate Limit.

## 7. Déployer sur Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) (connexion avec GitHub).
2. **Add New → Project**, importez le dépôt GitHub `site-elv8`.
3. Vercel détecte Next.js automatiquement : ne changez rien aux réglages de build.
4. Avant de cliquer sur **Deploy**, ouvrez **Environment Variables** et ajoutez les variables de la section 6.
5. Cliquez sur **Deploy**. Le site est en ligne sur une adresse `…vercel.app` en une à deux minutes.
6. Chaque `git push` sur la branche principale redéploie automatiquement le site.

## 8. Relier le domaine elv8co.be (DNS chez one.com)

Le domaine reste chez one.com, **ainsi que vos e-mails**. On ne modifie que les enregistrements qui concernent le site web.

1. Dans Vercel : Project → **Settings → Domains** → ajoutez `elv8co.be` puis `www.elv8co.be`. Choisissez que `www.elv8co.be` redirige vers `elv8co.be` (ou l'inverse, au choix).
2. Vercel affiche les enregistrements DNS à créer. En général :

| Type | Nom / hôte | Valeur |
| --- | --- | --- |
| `A` | `@` (elv8co.be) | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

   **Utilisez en priorité les valeurs exactes affichées par Vercel** : elles peuvent être propres à votre projet.
3. Dans le panneau one.com : **DNS settings / Paramètres DNS** du domaine `elv8co.be` :
   - modifiez (ou remplacez) l'enregistrement `A` de `@` existant par la valeur Vercel ;
   - créez ou modifiez le `CNAME` `www` ;
   - **ne touchez pas aux enregistrements `MX`** ni à ceux qui concernent la messagerie : vos e-mails continuent de fonctionner chez one.com.
4. Attendez la propagation (de quelques minutes à quelques heures). Vercel affiche « Valid Configuration » et génère automatiquement le certificat HTTPS.
5. Délivrabilité des e-mails du formulaire (recommandé) : vérifiez dans one.com que l'enregistrement **SPF** autorise one.com (ex. `v=spf1 include:_custspf.one.com ~all`, valeur à confirmer dans l'aide one.com), activez **DKIM** si one.com le propose, puis ajoutez un enregistrement **DMARC** simple (`_dmarc` → `v=DMARC1; p=none; rua=mailto:contact@elv8co.be`).

## 9. Déclarer le site dans Google Search Console

1. Rendez-vous sur [search.google.com/search-console](https://search.google.com/search-console) avec le compte Google de l'agence.
2. **Ajouter une propriété → Domaine** → saisissez `elv8co.be`.
3. Google fournit un enregistrement **TXT** (`google-site-verification=…`) : ajoutez-le dans les DNS one.com (hôte `@`), puis cliquez sur **Vérifier** (la propagation peut prendre un peu de temps).
   - Alternative : propriété « Préfixe d'URL » avec la balise HTML ; copiez alors uniquement le code dans la variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` sur Vercel et redéployez.
4. Menu **Sitemaps** → ajoutez `https://elv8co.be/sitemap.xml` → **Envoyer**. Le sitemap contient automatiquement toutes les pages.
5. Menu **Inspection de l'URL** → testez l'accueil et les pages principales → **Demander une indexation**.
6. Revenez après quelques semaines : rapports « Pages » (indexation) et « Performances » (requêtes, clics). Surveillez notamment les requêtes locales (« personal branding Liège », « publicité Facebook Verviers »…).

## 10. Créer la fiche Google Business Profile

La fiche Google (Maps et résultats locaux) est souvent **la première source de clients locaux**.

1. Allez sur [business.google.com](https://business.google.com) → **Gérer maintenant**, nom : **ELV8co**.
2. Catégorie principale : par exemple « Agence de marketing » ; catégories secondaires possibles : « Service de marketing internet », « Service de production vidéo », « Consultant en marketing ».
3. Vous recevez vos clients chez eux et ne les accueillez pas à une adresse publique : choisissez **établissement de services de proximité**. Indiquez votre adresse (elle reste masquée) puis les **zones desservies** : Liège, Namur, Verviers, Province de Luxembourg (et, si vous le souhaitez, Arlon, Marche-en-Famenne, Bastogne, Libramont).
4. Coordonnées **identiques au site** (même nom, même téléphone +32 470 35 43 90, même site `https://elv8co.be`) : cette cohérence compte pour le référencement local.
5. Validez la fiche (Google propose une vérification par vidéo, SMS, e-mail ou courrier selon les cas).
6. Complétez-la à 100 % : description (reprenez le positionnement « Seuls, ils fonctionnent. Ensemble, ils changent tout. »), horaires, **services** (les 5 services avec une courte description), photos et vidéos (tournages, équipe), lien de réservation vers `https://elv8co.be/contact`.
7. Faites vivre la fiche : publiez régulièrement des « Posts » (vos vidéos verticales s'y prêtent très bien) et **demandez un avis à chaque client satisfait** (Google fournit un lien court à partager). Répondez à tous les avis.
8. Ajoutez ensuite le lien de la fiche et de vos réseaux dans `src/content/site.ts` (`social`) : ils sont repris dans les données structurées.

## 11. Mesure d'audience et cookies (optionnel)

Par défaut, **aucun outil de mesure, aucun cookie de suivi, aucun bandeau**.

Pour activer une mesure d'audience, ajoutez sur Vercel :

- **Plausible** (sans cookie, simple, respectueux de la vie privée) :
  `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` et `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=elv8co.be`
- **Google Analytics 4** :
  `NEXT_PUBLIC_ANALYTICS_PROVIDER=ga` et `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

Dès qu'un outil est configuré, un **bandeau de consentement** apparaît et le script n'est chargé qu'après acceptation. Un lien « Gérer les cookies » s'ajoute dans le pied de page. Code : `src/components/layout/ConsentBanner.tsx`.
Pensez alors à mettre à jour la section 7 de la politique de confidentialité.

## 12. Animations : ce qu'il faut savoir

- **Intro** : le logo « ELV8. » se construit puis révèle la page. Animation 100 % CSS (elle ne bloque jamais l'affichage), jouée une seule fois par visite.
- **Hero de l'accueil** : dégradé liquide cuivre en WebGL qui suit la souris. Il n'est chargé que sur ordinateur (écran ≥ 768 px avec souris), après l'affichage du contenu, et désactivé si l'appareil n'a pas d'accélération graphique : sur mobile, un dégradé CSS animé prend le relais.
- **Titres** révélés mot par mot (CSS), **textes** ligne par ligne au scroll (SplitText), **compteurs** animés, **services** en défilement horizontal épinglé (ordinateur), **fusion** des 3 piliers, **boutons magnétiques**, **curseur personnalisé** (souris uniquement), **cartes** avec profondeur, **transitions** de page (rideau).
- Chaque page a son animation signature : mot « Confiance » qui se remplit, éventail de vidéos verticales, courbe 20 € → 780 €, site qui s'assemble, conversation animée, nom de ville géant, manifeste qui s'allume, point « 404 » qui s'échappe…
- Si le visiteur a activé « réduire les animations » dans son système, tout le contenu s'affiche directement, sans mouvement.

## 13. Commandes utiles

```bash
npm run dev          # développement
npm run build        # build de production (vérifie aussi TypeScript)
npm start            # sert le build de production
npm run typecheck    # vérification TypeScript seule
npm run todos        # met à jour la liste des [À COMPLÉTER] dans A-COMPLETER.md
npm run check:seo    # avec « npm start » lancé : vérifie title, description, H1, canonical et sitemap de chaque page
```
