# Google Search Console — après publication des Phases A + B

La vérification réelle ne peut commencer qu’après la mise en production sur `maisonfoebe.fr`. Le sitemap contiendra alors 28 URL indexables, dont la nouvelle FAQ et les répertoires du Dictionnaire.

Cette partie ne peut être exécutée sérieusement qu’après la bascule sur `main`, car elle dépend de l’exploration et des données réelles de Google.

## Jour de publication

1. Ouvrir la propriété Domaine `maisonfoebe.fr`.
2. Soumettre :

```text
https://maisonfoebe.fr/sitemap.xml
```

3. Utiliser l’inspection d’URL sur :

```text
https://maisonfoebe.fr/
https://maisonfoebe.fr/dictionnaire/
https://maisonfoebe.fr/echelle-foebe/
https://maisonfoebe.fr/zone-corps/
https://maisonfoebe.fr/a-propos/
```

4. Vérifier pour chacune :
   - URL autorisée à l’indexation ;
   - canonical déclarée identique à l’URL propre ;
   - page récupérée sans erreur ;
   - données structurées lisibles ;
   - demander une indexation lorsque l’option est disponible.

## Après 7 jours

- rapport **Pages** : nouvelles pages découvertes, pages exclues, erreurs de redirection ;
- rapport **Sitemaps** : sitemap lu et nombre d’URL découvertes ;
- rapport **Résultats enrichis** : breadcrumbs et éventuels avertissements ;
- rapport **Core Web Vitals** : premières données disponibles, si le volume de visites est suffisant.

## Après 14 à 28 jours

Exporter les données **Performances → Résultats de recherche** :

- requêtes ;
- pages ;
- impressions ;
- clics ;
- CTR ;
- position moyenne ;
- appareils.

Comparer en priorité :

- accueil ;
- Dictionnaire et ses nouveaux répertoires ;
- Échelle Foébé ;
- les sept zones ;
- Comprendre et Méthode.

## Alertes à traiter immédiatement

- « Explorée, actuellement non indexée » sur plusieurs pages importantes ;
- « Page en double » avec une ancienne URL `.html` choisie comme canonical ;
- redirection en boucle ;
- sitemap illisible ;
- erreur serveur 5xx ;
- forte hausse des pages introuvables ;
- données structurées invalides.

Ne pas interpréter l’absence de données Core Web Vitals comme une erreur : Google peut ne pas disposer d’assez de trafic réel pour constituer un groupe de données.