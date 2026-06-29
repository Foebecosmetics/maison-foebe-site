# Rapport Phase A — Maison Foébé

Date : 29 juin 2026  
Branche cible : `migration-astro`

## Résultat

La Phase A technique et SEO est intégrée dans le projet Astro. La refonte éditoriale de l’accueil et la future page Accompagnements restent volontairement séparées.

## Lot A1 — critique : terminé

- Une seule architecture d’URL, avec slash final.
- Canonicals propres et identiques aux URL publiques.
- `og:url` et JSON-LD alignés.
- Sitemap généré automatiquement depuis les routes Astro indexables.
- Liens internes convertis vers les routes propres.
- 40 redirections 301 historiques, notamment depuis tous les `.html`.
- 404 personnalisée.
- Déploiement Cloudflare limité à `dist/`.
- Umami conservé une seule fois sur chaque page avec l’identifiant fourni.

## Lot A2 — performance : terminé

- CSS sorti des anciens fichiers HTML et mutualisé par famille de pages.
- JavaScript partagé extrait et mis en cache.
- Polices Google regroupées dans une seule requête commune.
- Anciennes copies HTML, images en double et manifestes obsolètes retirés.
- Dictionnaire principal réduit d’environ 423 Ko et près de 5 000 éléments DOM à environ 47 Ko et moins de 700 éléments au chargement réel avec le Shell.
- Les 131 fiches restent disponibles : six répertoires crawlables, deux sous-répertoires skincare et chargement interactif complet à la demande.
- Tests mobiles effectués sur l’accueil, le Dictionnaire, l’Échelle et Zone Corps.

## Lot A3 — compréhension Google : terminé dans le code

- `Organization`, `WebSite` et `Person` centralisés.
- `ProfilePage` sur À propos.
- `BreadcrumbList` sur les pages hiérarchiques.
- Open Graph et Twitter Cards centralisés et réparés, notamment Zone Relations.
- Lexique relié depuis l’accueil, Comprendre et le Dictionnaire.
- Pratiquer, À propos et Boussole Scénarios mieux reliés.
- Mentions légales et 404 en `noindex`.
- Corpus technique du Dictionnaire bloqué dans `robots.txt`, tandis que ses pages de contenu restent indexables.

L’audit Search Console réel est préparé dans `CHECKLIST-SEARCH-CONSOLE.md`. Il devra être exécuté après publication, car Google ne peut pas fournir de données sur la version non encore servie par `maisonfoebe.fr`.

## Validation automatique

```text
29 pages HTML générées
27 pages indexables dans le sitemap
40 redirections 301
0 canonical incohérente
0 lien local cassé
0 JSON-LD invalide
0 ressource manifeste manquante
0 ancienne page HTML à la racine
0 script public avec erreur de syntaxe
```

## Validation navigateur

Viewport mobile : 390 × 844 px.  
Viewport desktop : 1440 × 900 px.

```text
Accueil : aucun débordement, Shell chargé, liens Lexique et Pratiquer présents
Dictionnaire : 691 éléments initiaux, 6 313 après chargement des 131 fiches
Échelle : moteur accessible, 5 choix de réponse affichés
Zone Corps : mini-test complété jusqu’au score 5/5
Flèche Shell : exactement 1
Ancienne flèche locale : 0
Erreur JavaScript sur les vues testées : 0
```

## Validation Cloudflare locale

```text
28 routes publiques testées en HTTP 200
Anciennes URL testées en HTTP 301
URL inconnue en HTTP 404
/package.json : 404
/wrangler.jsonc : 404
/src/pages/index.astro : 404
/node_modules/... : 404
/.git/config : 404
Wrangler dry-run : 119 ressources lues depuis dist/
```

## Point de vigilance non bloquant

`npm audit` signale deux vulnérabilités de niveau faible dans la chaîne de développement. La correction forcée provoquerait une montée majeure de dépendances ; elle n’a pas été appliquée à l’aveugle. Le site statique publié n’expose ni `node_modules` ni les fichiers du projet.
