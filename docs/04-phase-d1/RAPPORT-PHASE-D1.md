# Maison Foébé — Rapport Phase D1

Date : 29 juin 2026  
Périmètre : FAQ comme centre d’orientation avant déploiement.  
Hors périmètre : hub Accompagnements, rubrique Ressources et nouveaux articles/pages SEO. Ces éléments relèvent de D2 et D3 après publication et observation des données réelles.

## Décision éditoriale

Maison Foébé ne lance pas un blog par principe. La FAQ devient le premier centre d’orientation : une personne part d’une question concrète, reçoit une réponse courte, puis une seule prochaine étape.

La page reste limitée à 29 questions, dans la fourchette volontaire de 25 à 30. Les réponses sont repliées afin de ne pas imposer un mur de texte aux personnes en épuisement fonctionnel.

## Structure finale

1. Comprendre Maison Foébé — 5 questions ;
2. Épuisement et récupération — 4 questions ;
3. S’orienter dans le site — 6 questions ;
4. Cadre et sécurité — 7 questions ;
5. Autonomie et limites du gratuit — 3 questions ;
6. Évolution et accompagnements — 4 questions.

Total : 29 questions.

## Onze questions ajoutées

- Qu’est-ce que l’épuisement fonctionnel dans Foébé ?
- Pourquoi puis-je continuer à fonctionner tout en me sentant épuisé·e ?
- Pourquoi le repos ne suffit-il pas toujours à récupérer ?
- Comment reconnaître une surcharge avant de craquer ?
- Faut-il aller très mal pour utiliser Foébé ?
- Comment choisir entre l’Échelle et la Boussole ?
- Que faire si un outil me semble déjà trop lourd ?
- Les outils enregistrent-ils mes réponses ?
- Que peuvent m’apporter les outils gratuits ?
- Comment savoir quand un outil gratuit ne suffit plus ?
- Foébé cherche-t-elle à me rendre dépendant·e de la fondatrice ?

## Règle de lecture

Chaque accordéon contient :

1. une réponse autonome et courte ;
2. un seul lien de sortie ;
3. aucun enchaînement obligatoire.

Les liens conduisent uniquement vers des pages déjà prêtes : Comprendre, Méthode, Échelle, Zones, Zone Énergie, Pratiquer, Respiration, Lexique, Dictionnaire, À propos, Cadre éditorial, Mentions légales ou la liste d’ouverture de l’accueil.

## Équilibre gratuit / futurs accompagnements

La FAQ clarifie ce que le gratuit peut offrir : nommer, relier, se situer et choisir un premier geste. Elle expose également sa limite : elle ne connaît pas tout le contexte, ne personnalise pas les arbitrages et n’assure pas une continuité dans la durée.

Elle ne révèle ni le contenu détaillé de l’Atelier, ni la structure de N1, N2 ou N3. Le passage vers les futures ouvertures reste sobre et volontaire.

## SEO et données structurées

- type de page : `FAQPage` ;
- 29 `Question` et 29 `Answer` dans le JSON-LD ;
- un seul nœud `#webpage`, typé uniquement `FAQPage` ;
- title, description, Open Graph et sujet de page mis à jour ;
- `/faq/` reste dans le sitemap avec un `lastmod` explicite ;
- aucun nouveau chemin vide n’est publié.

## Garde-fous automatiques ajoutés

Le build échoue désormais si :

- la FAQ contient moins de 25 ou plus de 30 questions ;
- elle ne comporte pas six sections ;
- le héros ne propose pas quatre portes d’entrée ;
- une réponse ne possède pas exactement une prochaine étape ;
- le nombre de questions visibles diverge du JSON-LD ;
- le nœud FAQPage est dupliqué ou mal typé.

## Non-régression

Les fichiers moteurs suivants ont été comparés à la Phase C corrigée et sont identiques bit à bit :

- Échelle Foébé ;
- moteur partagé des sept Zones ;
- Boussole ;
- Respiration ;
- Lexique.

Aucune route indexable n’a été ajoutée ou retirée.

## Validation

- 31 pages HTML générées ;
- 29 pages indexables ;
- 29 URL dans le sitemap ;
- 29 questions FAQ ;
- 29 prochaines étapes ;
- 6 sections ;
- 4 portes d’entrée ;
- 41 contrôles de rendu et de non-régression réussis dans Chromium ;
- aucun débordement horizontal à 390 px et 1440 px sur la FAQ ;
- une seule flèche de retour en haut ;
- audit Astro réussi ;
- Wrangler prépare uniquement 126 fichiers depuis `dist`.

## Ce qui reste après déploiement

D2 et D3 ne sont pas publiées maintenant. Après la mise en production :

1. mesurer les Core Web Vitals réels ;
2. observer Search Console pendant plusieurs semaines ;
3. recouper les requêtes avec les questions réelles du public ;
4. préparer le hub Accompagnements ;
5. décider si deux ou trois réponses méritent une page Ressource autonome.
