# Phase A — Fondations du shell et du menu

Statut : **implémentée et validée au build**.

## Ce qui a été corrigé

- Le shell est conservé : barre supérieure, présence discrète et retrait automatique mobile.
- Le menu est désormais rendu directement par le layout Astro commun.
- Les anciennes navigations de secours ne sont plus générées dans les pages.
- Le JavaScript enrichit le menu existant au lieu de le remplacer après chargement.
- Sur ordinateur, le survol ouvre le menu avec un effort minimal ; quitter la zone le referme lorsqu’il n’est pas épinglé. Le clic permet de le maintenir ouvert, tandis que le clavier et le mobile conservent une commande fiable.
- Le fond est verrouillé sur mobile pendant l’ouverture, puis la position de lecture est restaurée.
- Le panneau utilise `100dvh` pour suivre la hauteur réelle des navigateurs mobiles.
- Le shell reste visible tant que le menu est ouvert ou qu’un de ses contrôles possède le focus.
- Le Lexique est verrouillé en mode nuit et n’affiche pas le bouton jour/nuit. Le Dictionnaire conserve ses deux modes, jour et nuit.
- Les pages Lexique et Dictionnaire déclarent explicitement une navigation sombre.
- Le libellé court de la barre contextuelle est `FAQ`, tandis que le menu conserve `Questions fréquentes`.
- Les nettoyages tardifs et observateurs chargés de supprimer d’anciens éléments ont été retirés.

## Architecture obtenue

- `src/data/site-navigation.ts` : source unique des liens, libellés, routes sombres et contextes de page.
- `src/components/SiteShell.astro` : rendu HTML commun et accessible du shell.
- `src/layouts/BaseLayout.astro` : insertion unique du shell sur toutes les pages.
- `src/shell/foebe-shell.js` : interactions uniquement.
- `src/shell/foebe-shell.css` : états visuels partagés.

## Accompagnements — stratégie retenue

La route `/accompagnements/` est réservée dans les libellés du shell, mais elle n’est pas encore créée ni exposée.

Lors de sa création, la page brouillon devra :

1. ne pas être ajoutée au menu ni aux appels à l’action publics ;
2. utiliser `noindex, nofollow` ;
3. être exclue du sitemap ;
4. préparer les emplacements de l’Atelier, du N1, du N2 et du N3 sans rendre les offres indisponibles cliquables ;
5. être activée plus tard en retirant le verrou d’indexation et en ajoutant les liens publics.

Ainsi, l’architecture peut être finalisée à l’avance sans annoncer prématurément les offres.

## Validation réalisée

- `npm run build` : 31 pages générées avec succès.
- `npm run audit` : 29 pages indexables, zéro incohérence bloquante.
- Vérification statique : un seul shell, un seul menu et un seul bouton de thème par page générée.
- Vérification statique : aucune navigation de secours rendue dans le HTML final.
- Vérification statique : Lexique et Dictionnaire reçoivent bien l’état de navigation sombre.

## Validation à faire sur l’URL de prévisualisation

Avant fusion vers la branche publique, vérifier rapidement :

- ordinateur, mobile, tablette portrait et tablette paysage ;
- thème jour et thème nuit ;
- ouverture au survol, sortie naturelle, clic d’épinglage et fermeture fiable ;
- absence de ton sur ton sur Lexique et Dictionnaire ;
- absence du bouton sur le Lexique et maintien du bouton sur le Dictionnaire ;
- restauration de la position de lecture après fermeture du menu ;
- retour immédiat de la barre au toucher de la zone haute.
