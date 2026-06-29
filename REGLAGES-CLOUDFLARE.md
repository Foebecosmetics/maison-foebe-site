# Réglages Cloudflare pour la migration Astro

Dans le projet Worker relié au dépôt GitHub :

## Branches

```text
Branche de production : main
Branche de preview : migration-astro
Root directory : laisser vide
```

## Commandes de build

```text
Build command : npm run validate
Deploy command — production : npx wrangler deploy
Non-production branch deploy command : npx wrangler versions upload
```

Le build `npm run validate` :

1. génère `public/sitemap.xml` ;
2. construit Astro dans `dist/` ;
3. vérifie les routes, liens, canonicals, données structurées, redirections, manifeste et scripts.

`wrangler.jsonc` impose ensuite :

```json
"assets": {
  "directory": "./dist/",
  "not_found_handling": "404-page",
  "html_handling": "auto-trailing-slash"
}
```

## Ce qu’un journal correct doit montrer

- une commande Astro exécutée avant Wrangler ;
- `29 page(s) built` ;
- `Sitemap généré : 27 URL indexables` ;
- `Audit Phase A réussi` ;
- Wrangler lisant les fichiers dans `/dist` ;
- environ 119 ressources statiques, et non le dépôt entier.

## À ne pas faire

- ne pas mettre `assets.directory` à `.` ;
- ne pas utiliser seulement `npx wrangler versions upload` sans commande de build ;
- ne pas publier `node_modules`, `.git`, `src` ou `package.json` comme ressources publiques ;
- ne pas fusionner dans `main` avant validation de la preview.
