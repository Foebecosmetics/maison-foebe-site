# Commencer ici — Migration Astro · Phases A + B + C

Cette archive est une version de travail séparée de la branche publique `main`.

## Pour créer une prévisualisation Cloudflare

1. Déposer le contenu de cette archive sur la branche `migration-astro`.
2. Laisser Cloudflare construire cette branche de prévisualisation.
3. Ne pas fusionner dans `main` avant la validation visuelle.

## Commandes de contrôle

```bash
npm run build
npm run audit
```

Résultat attendu : 31 pages HTML, 29 pages indexables et zéro incohérence bloquante.

## Points de contrôle prioritaires

- Sur ordinateur, le survol ouvre le menu et la sortie le referme lorsqu’il n’est pas épinglé.
- Un clic permet de maintenir le menu ouvert ; un second clic le ferme.
- Sur mobile et au clavier, le menu reste commandé par le bouton.
- Le Lexique reste toujours en mode sombre et n’affiche pas le bouton jour/nuit.
- Le Dictionnaire conserve bien ses deux modes, jour et nuit.
- Les classes historiques nécessaires au CSS sont rendues directement par Astro.
- Les surlignages de l’accueil restent mesurés dans les deux thèmes.
- Les trois repères de Comprendre reprennent leurs couleurs distinctes.
- Aucune largeur horizontale parasite n’apparaît en mobile ou tablette paysage.
