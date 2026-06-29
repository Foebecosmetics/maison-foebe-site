# Maison Foébé — Rapport de Phase B

Date de validation : 29 juin 2026  
Périmètre : contenu, intention de recherche, hiérarchie H1/H2, maillage, CTA, FAQ, images, métadonnées sociales et accessibilité des pages publiques Astro.

## Résultat

La Phase B est intégrée dans le projet Astro sans modifier les moteurs fonctionnels du site. Le build produit 30 fichiers HTML, dont 28 pages indexables, une page 404 et les mentions légales en `noindex`.

Les objectifs retenus ont été :

1. rendre chaque page compréhensible par une personne et par un moteur de recherche ;
2. guider sans créer de mur de texte pour un public déjà fatigué ;
3. enrichir le vocabulaire dans les pages appropriées, sans bourrer les Zones de mots-clés ;
4. préserver une part de découverte et de personnalisation pour les futurs accompagnements ;
5. ne pas altérer les questionnaires, la Boussole, la Respiration, le Lexique, le Dictionnaire ou les sept Zones.

## 1. Nouvelle FAQ générale

Une route autonome `/faq/` a été ajoutée avec 16 questions réparties en quatre parcours courts :

- comprendre ce qu’est Maison Foébé ;
- utiliser le site sans se surcharger ;
- comprendre le cadre et les limites ;
- connaître l’évolution future et les accompagnements prévus.

La page rassure sur le positionnement, le public, la gratuité actuelle, le cadre non clinique et la préparation des premières ouvertures pour octobre 2026. Les réponses restent repliées par défaut afin de ne pas imposer toute la lecture.

La FAQ possède une balise `FAQPage`, mais sa valeur principale est l’orientation, la réassurance et la couverture des intentions de recherche. Elle ne doit pas être considérée comme une promesse d’affichage enrichi dans Google.

## 2. H1, titres et intentions de recherche

Les H1 ambigus ont été précisés sans uniformiser la personnalité du site.

Exemples :

- `Comprendre son self-care. Des repères Foébé pour mieux te situer.`
- `Échelle Foébé : comment tu prends soin de toi, vraiment ?`
- `Respiration guidée. Reviens à toi en quelques souffles.`
- `Lexique du self-care et de l’épuisement fonctionnel`
- `À propos de Maison Foébé. La recherche comme socle. Le vécu comme point de départ.`

Les sept Zones conservent volontairement leurs H1 courts (`Corps`, `Énergie`, etc.). Leur sujet est déjà explicité dans le title, la description, l’introduction et les H2. Cette décision évite d’alourdir leur expérience.

Les titres et descriptions des répertoires du Dictionnaire ont été rendus explicites : skincare, haircare, bodycare, récupération, surcharge, actifs, routines, types et états de peau.

## 3. Champ lexical

Le vocabulaire utile a été ajouté de manière naturelle dans la FAQ, le Lexique, le Dictionnaire, les titles, les descriptions et les mini-FAQ :

- surcharge mentale ;
- fatigue persistante ;
- récupération ;
- équilibre ;
- bien-être ;
- santé mentale ;
- prévention ;
- régulation émotionnelle ;
- habitudes ;
- hygiène de vie ;
- capacité d’action ;
- épuisement fonctionnel.

Le terme « fatigue chronique » est utilisé avec prudence et accompagné d’une invitation à demander un avis médical lorsqu’une fatigue dure, s’aggrave ou inquiète. Il n’est pas utilisé comme diagnostic ou comme synonyme automatique d’épuisement fonctionnel.

## 4. FAQ ciblées sans surproduction

Des mini-FAQ courtes ont été ajoutées uniquement aux pages où elles améliorent réellement l’orientation :

- Comprendre ;
- Méthode ;
- Pratiquer ;
- hub des 7 Zones ;
- Dictionnaire.

Aucune mini-FAQ répétitive n’a été ajoutée aux sept pages Zones ni au moteur de la Boussole. Ces pages restent centrées sur l’expérience. Leur maillage contextuel mène déjà vers l’Échelle, la Respiration, le Dictionnaire et la Boussole selon le besoin.

Les mini-FAQ ne reçoivent pas de balisage `FAQPage` séparé afin de garder une structure claire : la FAQ générale est la page de référence.

## 5. Maillage interne et parcours

Le Lexique n’est plus orphelin. Il reçoit des liens depuis l’accueil, Comprendre et le Dictionnaire.

Des blocs de prochaines étapes guidées ont été ajoutés aux pages pertinentes. Ils proposent deux ou trois sorties maximum afin de préserver le sentiment d’accompagnement :

- comprendre le cadre ;
- choisir un outil gratuit ;
- ouvrir le Lexique ou le Dictionnaire ;
- faire l’Échelle ;
- lire la FAQ ;
- découvrir la fondatrice ;
- laisser son email pour les futures ouvertures.

L’objectif de conversion reste doux : le contenu gratuit permet de comprendre et de commencer, tandis que les futurs accompagnements sont présentés comme un espace de profondeur, de personnalisation et de continuité. Les pages publiques ne livrent pas un protocole complet qui rendrait les accompagnements inutiles.

## 6. Images et cartes sociales

Les 28 pages indexables possèdent :

- un `og:title` ;
- une `og:description` ;
- une `og:image` locale ;
- un `og:image:alt` ;
- les équivalents Twitter Card ;
- une URL sociale alignée avec la canonical.

Toutes les images sociales vérifiées mesurent 1200 × 630 px.

Trois fichiers trop génériques ont été renommés :

- `og-foebe.jpg` → `og-maison-foebe-self-care.jpg` ;
- `og-test.png` → `og-echelle-foebe.png` ;
- `og-story.jpg` → `og-lexique-self-care.jpg`.

Des redirections permanentes conservent la compatibilité avec les anciens partages.

Il n’existe pas d’image de contenu significative sans texte alternatif dans les pages générées. Les illustrations d’ambiance sont principalement décoratives et rendues en CSS ; elles n’ont donc pas à être annoncées comme du contenu aux technologies d’assistance.

## 7. Données structurées

Le layout commun centralise :

- `Organization` ;
- `WebSite` ;
- `Person` ;
- `WebPage`, `CollectionPage` ou `ProfilePage` selon la page ;
- `BreadcrumbList` ;
- `FAQPage` sur la FAQ générale.

`SearchAction` n’a pas été ajouté : il n’existe pas de moteur de recherche global du site à déclarer, et ce balisage ne doit pas être utilisé comme artifice SEO.

Le nom public exact de la fondatrice n’a pas été inventé. Le schéma `Person` reste volontairement générique jusqu’à la Phase C, qui définira les informations d’autorité réellement publiables.

## 8. Accessibilité

Les contrôles suivants sont intégrés à l’audit automatique :

- exactement un H1 par page ;
- aucun heading vide ;
- noms accessibles pour boutons et champs de formulaire ;
- accordéons FAQ natifs au clavier ;
- liens d’évitement et cibles valides ;
- alternatives textuelles des images sociales ;
- focus visible ;
- respect de `prefers-reduced-motion` ;
- absence de débordement horizontal sur les pages mobiles testées.

## 9. Préservation du fonctionnement d’origine

Les scripts des moteurs de page ont été conservés. Les tests fonctionnels confirment :

- formulaire email présent sur l’accueil ;
- une seule flèche globale du Shell ;
- 16 questions FAQ et accordéons fonctionnels ;
- Dictionnaire chargé à la demande avec ses 131 fiches ;
- recherche du Dictionnaire disponible ;
- Échelle menée jusqu’à l’écran de résultats ;
- mini-test Zone Corps mené jusqu’au résultat ;
- Boussole, Respiration et Lexique chargés sans erreur JavaScript ;
- aucun débordement horizontal sur les pages mobiles contrôlées.

Le test automatisé a exécuté 37 contrôles d’interface sans erreur.

## 10. Performance : ce qui est validé et ce qui reste à mesurer

La structure est optimisée : CSS et JavaScript externes, Dictionnaire différé, polices harmonisées, images sociales dimensionnées, déploiement limité à `dist` et DOM initial du Dictionnaire fortement réduit.

Mesures de build sur les pages clés :

| Page | HTML initial | Éléments DOM initiaux |
|---|---:|---:|
| Accueil | environ 23 Ko | 279 |
| FAQ | environ 25 Ko | 233 |
| Dictionnaire | environ 50 Ko | 626 |
| Échelle | environ 28 Ko | 288 |
| Zone Corps | environ 47 Ko | 408 |

Le corpus de 131 fiches du Dictionnaire pèse environ 379 Ko, mais il n’est chargé qu’à la demande.

Les vrais LCP, CLS et INP ne doivent pas être inventés depuis les fichiers locaux. Ils seront mesurés sur la prochaine URL de preview avec PageSpeed Insights, puis confirmés après publication grâce aux données de terrain de Search Console. Le rapport de preview doit porter au minimum sur l’accueil, la FAQ, le Dictionnaire, l’Échelle et une Zone.

## 11. Alertes npm de niveau faible

`npm audit` signale deux entrées de niveau faible, toutes deux liées à la même chaîne : Astro dépend d’une version d’esbuild concernée par un scénario de lecture arbitraire de fichiers lors de l’utilisation du serveur de développement sous Windows.

État exact :

- 0 critique ;
- 0 élevée ;
- 0 modérée ;
- 2 faibles ;
- score CVSS de l’avis esbuild : 2,5 ;
- attaque locale, complexe, nécessitant un accès limité à la machine de développement ;
- le site public est statique et ne publie ni `node_modules` ni le serveur de développement.

La correction automatique proposée impose Astro 7, une mise à niveau majeure. Elle n’est pas forcée avant le lancement afin de ne pas introduire une régression. Une note séparée `SECURITE-NPM.md` documente la décision.

## 12. Validation automatisée finale

```text
30 fichiers HTML générés
28 pages indexables
1 page FAQ générale
16 questions FAQ
131 fiches de Dictionnaire conservées
0 canonical contradictoire
0 URL locale cassée
0 JSON-LD invalide
0 heading vide
0 image sociale manquante ou mal dimensionnée
0 page indexable absente du sitemap
0 ancienne flèche locale
37 contrôles d’interface réussis
```

## Limite de la Phase B

Cette phase optimise le site lui-même. Elle ne remplace pas la Phase C : la page À propos pose déjà le socle de crédibilité, mais l’autorité externe, les publications, les profils professionnels cohérents, les citations, les backlinks et les mentions dans des médias ou newsletters nécessitent un chantier séparé.


## 13. Correctifs de validation ajoutés avant preview

Les derniers contrôles ont ajouté :

- un contrôle strict du nœud JSON-LD de la FAQ : un seul `FAQPage`, sans doublon `WebPage`, et 16 couples `Question`/`Answer` ;
- un `<lastmod>` explicite et stable pour chacune des 28 URL indexables, géré dans `src/data/page-lastmod.json` ;
- une 404 en `noindex, follow` reliée à l’accueil, Comprendre, la FAQ et les outils ;
- la validation automatique de la présence de la FAQ dans le menu principal et le footer ;
- l’extraction complète des styles du Shell hors du JavaScript ;
- la minification automatique du Shell au build.

Le fichier `foebe-shell.js` passe d’environ 99 Ko à 31,8 Ko (environ 9 Ko gzip). Les styles du Shell sont servis dans une feuille externe d’environ 34,5 Ko (environ 5,7 Ko gzip). Ce correctif réduit le JavaScript à analyser et à exécuter, mais les Core Web Vitals définitifs restent à mesurer sur la preview puis en données terrain.

Le détail est consigné dans `CORRECTIFS-VALIDATION-PHASE-B.md`.
