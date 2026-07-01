# Validation — Migration Astro · Phases A + B + C

Date : 1er juillet 2026

## Résultat technique

- Build Astro : **réussi**.
- Pages HTML générées : **31**.
- Pages indexables : **29**.
- Audit renforcé : **réussi, zéro incohérence bloquante**.

## Double vérification CSS

La migration rend de nouveau directement les classes attendues par les CSS historiques encore utiles :

- `page-index` ;
- `page-comprendre` ;
- `page-a-propos` ;
- `page-methode` ;
- `page-zones-premium` ;
- `foebe-page-respiration`.

Les règles devenues mortes autour de `fallbackNav` et des anciennes barres de progression de secours ont été retirées. Les CSS de page ne dépendent plus d’une classe artificiellement ajoutée pendant les tests. Une comparaison sélecteur par sélecteur avec `main` a également permis de restaurer trois pertes discrètes : `.seo-hidden` dans le Lexique, le bouton `.mobile-retour-fab` et les contrastes interactifs du Dictionnaire, ainsi que la couche `.zone-hero > *` au-dessus des vagues décoratives.

## Vérification visuelle et interactive

Une matrice représentative de **19 cas** a été contrôlée sur ordinateur, mobile et tablette paysage, en thème jour et nuit selon le contrat de chaque page.

Pages ou familles couvertes : accueil, Comprendre, Pratiquer, Zones, À propos, Méthode, Respiration, Lexique, Dictionnaire, sous-page Dictionnaire, page de zone, Boussole, Échelle Foébé, FAQ et mentions légales.

Contrôles validés :

- aucun débordement horizontal détecté ;
- une seule navigation globale par page ;
- cibles des liens d’évitement présentes ;
- menu desktop ouvert au survol, refermé à la sortie et épinglable au clic ;
- focus clavier visible ;
- panneau mobile sans défilement de la page arrière ;
- contenu visible lorsque les animations sont réduites ;
- Lexique verrouillé en nuit permanente, sans bouton de thème ;
- Dictionnaire non verrouillé, avec bascule réelle jour/nuit ;
- styles historiques de Comprendre, Zones, Méthode, À propos et Respiration actifs ;
- contenu SEO du Lexique maintenu hors du flux visuel ;
- retour mobile du Dictionnaire visible en mode focus et contrasté en nuit ;
- contenu des héros de zone maintenu au-dessus du décor.

## Contrat final des thèmes

- **Lexique** : nuit permanente, aucun bouton jour/nuit.
- **Dictionnaire et sous-pages** : modes jour et nuit, bouton conservé et fonctionnel.
- **Autres pages** : comportement global du thème conservé.

## Statut

La Phase C est **terminée**. La prochaine étape prévue est la Phase D : création du socle et de la page Accompagnements en brouillon non exposé, sans lien public ni indexation prématurée.
