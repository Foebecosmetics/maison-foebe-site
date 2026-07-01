# Maison Foébé — Phase C

Statut : **implémentée et validée au build et à l’audit renforcé**.

## Objectif

Harmoniser la migration après les Phases A et B, retrouver les styles historiques devenus inactifs pendant le passage à Astro et empêcher leur disparition silencieuse lors des prochaines évolutions.

## Récupération des CSS historiques

- Astro rend désormais dès le premier HTML une classe stable `foebe-page-*` pour chaque route.
- Les marqueurs historiques encore nécessaires sont restaurés sur les pages concernées :
  - `page-index` ;
  - `page-comprendre` ;
  - `page-a-propos` ;
  - `page-methode` ;
  - `page-zones-premium`.
- La classe `foebe-page-respiration` réactive les finitions des cartes de respiration.
- Le contenu sémantique `.seo-hidden` du Lexique est de nouveau maintenu hors du flux visuel sans être supprimé du document.
- Le bouton de retour mobile du Dictionnaire en mode focus, ainsi que ses contrastes jour/nuit et ses états survol/focus, sont restaurés.
- Le contenu des héros des sept zones est replacé au-dessus des vagues décoratives grâce à une couche explicite.
- Les styles ne dépendent plus d’une classe ajoutée artificiellement pendant un test ou après chargement JavaScript.

## Nettoyage

- Suppression des règles CSS de l’ancienne navigation `fallbackNav`, désormais remplacée par le composant Astro partagé.
- Suppression des anciennes barres de progression de secours qui ne correspondaient plus à aucun élément rendu.
- Suppression du second lien d’évitement du Dictionnaire : chaque page n’en conserve qu’un.
- Conservation des données structurées BreadcrumbList ; seuls les anciens correctifs visuels devenus morts sont retirés.

## Thèmes et métadonnées

- Le Lexique reste verrouillé en mode nuit, sans bouton de thème.
- Le Dictionnaire et ses sous-pages gardent les modes jour et nuit avec leur bouton.
- La description globale est alignée entre le JSON-LD, le manifeste, l’accueil et le footer.

## Double vérification ajoutée

L’audit échoue désormais automatiquement en cas de :

- classe de continuité CSS absente ;
- identifiant HTML dupliqué ;
- ancien correctif `fallbackNav` encore présent ;
- verrouillage accidentel du Dictionnaire en mode sombre ;
- bouton de thème absent sur le Dictionnaire ;
- bouton de thème réapparu sur le Lexique ;
- métadonnée globale désalignée ;
- règle `.seo-hidden` du Lexique absente ;
- bouton de retour mobile ou contrastes interactifs du Dictionnaire absents ;
- couche de contenu des héros de zone absente.

Une matrice visuelle séparée contrôle également les thèmes jour/nuit, les formats ordinateur, mobile et tablette paysage, les contrastes principaux, les focus et les débordements horizontaux. Des tests ciblés vérifient en plus les états normalement cachés : contenu SEO du Lexique, retour mobile du Dictionnaire en mode focus et superposition du héros des zones.
