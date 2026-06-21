# Maison Foébé · site public Astro

Migration statique et conservatrice des 20 pages publiques.

## Installation

```bash
npm install
npm run validate
npm run dev
```

## Cloudflare Pages

- Build command : `npm run build`
- Build output directory : `dist`
- Version Node recommandée : 22

Le projet est entièrement statique et ne nécessite pas d’adaptateur Cloudflare pour Pages.

## Architecture

- `src/pages/` : routes Astro et endpoints statiques.
- `src/legacy/` : documents HTML validés, rendus sans réécriture de leur moteur.
- `public/` : Shell, assets, redirections et en-têtes Cloudflare.
- `archive/standalone-source/` : copie exacte du ZIP reçu.
- `archive/unclassified-assets/` : anciens assets non publiés.

Cette migration met le site sous Astro sans régression. La composantisation profonde des familles de pages est volontairement séparée d’une première mise en production.
