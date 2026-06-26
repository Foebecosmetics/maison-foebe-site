# Maison Foébé — migration Astro corrigée

## État de cette livraison

- 20 pages Astro conservées.
- Index actuel conservé sans refonte éditoriale.
- Routes internes converties vers les URLs propres avec slash final.
- Anciennes URLs `.html` et anciens alias redirigés en 301 grâce à `public/_redirects`.
- Sitemap aligné sur les 20 routes réellement générées.
- Appel à l’image de zone inexistante supprimé.
- Appel à `foebe-breadcrumb.js` supprimé : le Shell fournit déjà la navigation contextuelle.
- Umami devient facultatif : aucun placeholder n’est publié.
- `npm run validate` construit puis audite les routes, les liens et les ressources locales.

## Umami

Dans Cloudflare Pages, ajouter une variable d’environnement seulement lorsque l’identifiant est disponible :

```text
PUBLIC_UMAMI_WEBSITE_ID=f25f1f6a-c967-4466-a744-e78fa7f4932f
```

Sans cette variable, le site fonctionne normalement et aucun script Umami n’est chargé.

## Commandes avant envoi sur GitHub

```bash
npm ci
npm run validate
```

Le dossier publié par Cloudflare doit être :

```text
dist
```

## Travail volontairement reporté

L’accueil (`src/pages/index.astro`) n’a pas été redesigné. La future architecture éditoriale d’octobre et le hub Accompagnements seront travaillés séparément, afin de ne pas exposer prématurément Atelier, N1, N2 ou N3.
