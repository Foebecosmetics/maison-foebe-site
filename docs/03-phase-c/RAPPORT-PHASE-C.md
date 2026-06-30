# Maison Foébé — Rapport Phase C : autorité sobre

Date : 29 juin 2026  
Périmètre : E-E-A-T, preuves vérifiables, identité éditoriale, profils externes et stratégie de liens.

## Principe directeur

La crédibilité de Maison Foébé ne doit pas dépendre de l’exposition du visage, du corps, de la voix ou de la vie privée de sa fondatrice. Elle repose sur quatre éléments :

1. un parcours professionnel vérifiable ;
2. des travaux et sources consultables ;
3. une méthode éditoriale explicite ;
4. des contenus qui renforcent l’autonomie plutôt que la dépendance.

## Corrections intégrées au site

### Page À propos

- retrait des mentions publiques non encore documentées : revue PTO, chapitre L’Harmattan, revue AFNOR ;
- remplacement par trois références vérifiables :
  - thèse de doctorat 2019, HAL et theses.fr ;
  - article de conférence InPACT 2021, texte officiel ;
  - poster AIPTLF 2018, livre officiel des résumés ;
- ajout d’un bloc « Une présence sobre, par choix » ;
- ajout d’un lien vers le cadre éditorial.

### Nouvelle page `/cadre-editorial/`

La page explique :

- la hiérarchie des sources ;
- la différence entre connaissances documentées et cadre Foébé ;
- le processus de correction et de mise à jour ;
- les limites cliniques et médicales ;
- l’indépendance éditoriale ;
- l’usage possible d’outils numériques ;
- le choix d’une présence publique sobre ;
- l’engagement à soutenir l’autonomie.

### FAQ

Deux réponses ont été ajoutées :

- qui conçoit et vérifie les contenus ;
- pourquoi la fondatrice ne se met pas davantage en avant.

### Données structurées

- `author` et `creator` reliés à la fondatrice sur les pages indexables ;
- `dateModified` relié aux dates explicites du sitemap ;
- `publishingPrinciples` relié à `/cadre-editorial/` ;
- `EducationalOccupationalCredential` pour le doctorat ;
- domaines d’expertise structurés avec `knowsAbout` ;
- trois travaux scientifiques décrits par des nœuds `CreativeWork` ou `ScholarlyArticle`.

### Mentions légales

- ancien hébergeur Netlify retiré ;
- Cloudflare, Inc. et Cloudflare Workers indiqués ;
- nature du site mise à jour avec FAQ, Dictionnaire et cadre éditorial.

### Navigation

La page Cadre éditorial est présente dans :

- le menu principal ;
- le footer ;
- la page À propos ;
- la FAQ ;
- les données structurées de toutes les pages indexables.

## Stratégie externe retenue

### Maintenant, après mise en production

1. ajouter `https://maisonfoebe.fr` au profil/CV HAL pour la cohérence et la traçabilité, sans le présenter comme un backlink suivi garanti ;
2. harmoniser le lien et la présentation courte des profils Maison Foébé ;
3. soumettre le sitemap à Search Console ;
4. vérifier l’indexation avant toute campagne de liens.

### Ensuite, sans prospection épuisante

- poursuivre l’échange déjà ouvert autour d’AFNOR et de Parcours Croisés ;
- demander ce qui serait réellement utile à leur ligne éditoriale, sans imposer un sujet ;
- solliciter au maximum quelques liens chauds issus de pairs, collègues ou ressources thématiques ;
- préférer une page « ressources utiles » ou une citation éditoriale à un article invité générique.

### Exclu

- achat de liens ;
- annuaires SEO généralistes ;
- échanges massifs de liens ;
- commentaires de forums avec lien optimisé ;
- campagne intensive d’articles invités ;
- obligation de montrer son visage ou sa vie privée.

## Arbitrage identité publique

La version livrée conserve l’identification publique « Fondatrice de Maison Foébé » dans le site et le JSON-LD. Le nom civil n’a pas été ajouté au code. Les références scientifiques restent consultables et permettent de vérifier le parcours, mais ce choix limite volontairement le niveau de désambiguïsation que Google pourrait obtenir avec un nom public explicite.

Un « mode nominatif » pourra être activé plus tard, uniquement sur décision consciente de la fondatrice. Il n’est pas nécessaire pour lancer la migration. Un commentaire `TODO identité publique` est placé directement à côté du `<meta name="author">` dans `BaseLayout.astro` afin de retrouver immédiatement le point de bascule et d’aligner alors le JSON-LD.

## Validation

- 31 pages HTML générées ;
- 29 pages indexables ;
- audit A+B+C réussi ;
- 29 URL dans le sitemap avec `lastmod` ;
- 48 redirections valides ;
- nouvelle page servie en HTTP 200 ;
- 404 servie en HTTP 404 ;
- moteurs Échelle, Zones, Boussole, Respiration et Lexique identiques bit à bit à la Phase B ;
- déploiement Cloudflare limité à `dist` ;
- 126 ressources préparées par Wrangler.

## Étapes impossibles avant publication

Ces éléments sont volontairement documentés comme non réalisés : ils dépendent d’interfaces externes, de données de production ou de décisions de tiers. Aucun résultat n’est simulé ni présenté comme acquis.


- ajout effectif du lien dans HAL, car cela nécessite la connexion de la fondatrice ;
- validation Search Console ;
- confirmation des Core Web Vitals réels ;
- obtention de backlinks éditoriaux ;
- validation des profils sociaux depuis leurs interfaces respectives.
