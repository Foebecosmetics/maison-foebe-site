# Maison Foébé — Migration Astro · Phases A + B + C

Cette version cumule :

- **Phase A** : fondations du shell, menu, thèmes et navigation partagée ;
- **Phase B** : corrections éditoriales, surlignages et pages ciblées ;
- **Phase C** : harmonisation, récupération des CSS historiques — y compris les états cachés du Lexique, du Dictionnaire et des zones —, nettoyage des correctifs obsolètes et audit de régression renforcé.

## Où se trouve quoi ?

- `src/` : pages, composants, styles et shell Astro ;
- `public/` : ressources publiques ;
- `scripts/` : génération et contrôles automatiques ;
- `docs/PHASE-A-FONDATIONS-SHELL.md` : fondations du shell et du menu ;
- `docs/PHASE-B.md` : corrections éditoriales et visuelles ;
- `docs/PHASE-C.md` : récupération CSS et harmonisation ;
- `docs/PHASE-C-VALIDATION.md` : résultats du build, de l’audit et de la double vérification visuelle.

## Contrôle local

```bash
npm run build
npm run audit
```

Le projet doit générer **31 pages HTML**, dont **29 indexables**, sans incohérence bloquante.

La future route `/accompagnements/` reste réservée dans l’architecture, mais n’est pas encore exposée dans le menu ni créée comme page publique.
