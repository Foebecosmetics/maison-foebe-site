# Migration Bun pour la preview Cloudflare

Cette variante utilise Bun afin de contourner le plantage de npm 10.9.2 dans l'environnement Workers Builds.

Réglages Cloudflare :
- Build variable : `BUN_VERSION = 1.2.15`
- Build command : `bun run validate`
- Production deploy command : `bunx wrangler deploy`
- Non-production deploy command : `bunx wrangler versions upload`
- Root directory : vide

Le dépôt ne contient volontairement plus `package-lock.json`, afin que Cloudflare ne lance plus `npm clean-install`.
Un `bun.lock` devra être généré et commité avant la fusion vers `main` pour figer les dépendances transitives.
