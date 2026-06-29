# Maison Foébé — migration Astro, Phases A + B + C + D1

Version technique, SEO et éditoriale préparée avant la bascule de `migration-astro` vers `main`.

## État du projet

- Phase A : routes, canonicals, sitemap, redirections, données structurées, déploiement `dist`, performance structurelle et garde-fous techniques.
- Phase B : revue des pages, H1/H2, intentions de recherche, FAQ, champ lexical, maillage, CTA, images sociales et accessibilité.
- 30 fichiers HTML générés.
- 28 pages indexables.
- 1 FAQ générale transformée en centre d’orientation avec 29 questions, 6 sections et une seule prochaine étape par réponse.
- 131 fiches de Dictionnaire conservées et chargées à la demande.

## Commandes

```bash
npm ci
npm run dev
npm run validate
npm run deploy:preview
npm run deploy
```

- `npm run validate` génère le sitemap, construit le site puis exécute l’audit technique et éditorial.
- `npm run deploy:preview` valide puis charge une version Cloudflare sans l’envoyer au trafic de production.
- `npm run deploy` valide puis déploie la version de production.

## Architecture

- `src/pages/` : pages Astro.
- `src/components/GuidedFaq.astro` : mini-FAQ de guidage.
- `src/components/GuidedNextSteps.astro` : prochaines étapes contextuelles.
- `src/layouts/BaseLayout.astro` : SEO, polices, Umami, Shell et données structurées partagés.
- `src/layouts/ZoneLayout.astro` : configuration commune aux sept Zones.
- `src/styles/` : styles mutualisés, dont les ajouts de Phase B.
- `src/shell/` : sources lisibles du Shell et de ses styles ; elles sont minifiées automatiquement vers `public/`.
- `src/data/page-lastmod.json` : dates explicites du sitemap, à modifier uniquement lors d’un changement significatif de page.
- `public/scripts/` : scripts partagés et moteurs propres aux pages.
- `public/data/dictionnaire-corpus.html` : corpus interactif du Dictionnaire, chargé seulement à la demande.
- `scripts/build-shell.mjs` : produit le JavaScript minifié et le CSS externe du Shell.
- `scripts/generate-sitemap.mjs` : sitemap construit depuis les routes Astro indexables et les dates explicites.
- `scripts/audit-built-site.mjs` : garde-fous SEO, contenu, images, accessibilité, liens, routes, redirections et déploiement.

## Documents

- `RAPPORT-PHASE-A.md`
- `RAPPORT-PHASE-B.md`
- `MATRICE-PAGES-PHASE-B.md`
- `SECURITE-NPM.md`
- `CHECKLIST-PREVIEW-PHASE-B.md`
- `REGLAGES-CLOUDFLARE.md`
- `CHECKLIST-SEARCH-CONSOLE.md`
- `GUIDE-MIGRATION-ASTRO.md`
- `CORRECTIFS-VALIDATION-PHASE-B.md`
- `RAPPORT-PHASE-C.md`
- `RAPPORT-PHASE-D1.md`
- `MATRICE-FAQ-PHASE-D1.md`
- `CHECKLIST-PREVIEW-PHASE-D1.md`

Ne pas ajouter `dist/`, `node_modules/`, `.astro/` ou les anciens fichiers HTML à GitHub.

## Phase D1 — FAQ comme centre d’orientation

La D1 ajoute uniquement ce qui peut être publié sans attendre de données Search Console :

- 11 questions nouvelles, pour un total contenu de 29 ;
- six sections : comprendre, récupérer, s’orienter, cadre, autonomie et suite ;
- quatre portes d’entrée dans le héros ;
- une seule sortie guidée après chaque réponse ;
- aucune page Ressource ou Accompagnement vide ;
- aucun changement des moteurs Échelle, Zones, Boussole, Respiration ou Lexique.

Voir `RAPPORT-PHASE-D1.md`, `MATRICE-FAQ-PHASE-D1.md` et `CHECKLIST-PREVIEW-PHASE-D1.md`.

## Phase C — autorité sobre

La Phase C ajoute :

- `/cadre-editorial/` ;
- des références scientifiques vérifiables sur À propos ;
- une politique de sources, corrections et indépendance ;
- un positionnement public sans obligation de visage ou de personal branding ;
- `author`, `dateModified`, `publishingPrinciples` et credential dans le JSON-LD ;
- une checklist HAL/profils et une stratégie de backlinks à faible énergie.

Voir `RAPPORT-PHASE-C.md` et `PLAN-AUTORITE-SOBRE.md`.
