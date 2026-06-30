# Correctifs après relecture de la Phase C

## Auteur public

Le `<meta name="author">` reste volontairement `Maison Foébé`. Un commentaire `TODO identité publique` est désormais placé directement dans `src/layouts/BaseLayout.astro`. Si un mode nominatif est activé plus tard, il faudra modifier ce meta et aligner simultanément les nœuds `Person`, `author` et `creator` du JSON-LD.

## HAL

Le lien ajouté dans le texte libre d’un CV HAL n’est pas présenté comme un backlink suivi garanti. Sa valeur principale est :

- la cohérence du profil public ;
- la relation entre l’IdHAL et la thèse `tel-02860264` ;
- la traçabilité des preuves citées sur la page À propos ;
- un signal d’identité et de confiance, sans promesse de gain SEO direct.

## Éléments volontairement non réalisés avant production

Restent documentés comme non réalisés :

- ajout effectif dans HAL ;
- validation Search Console ;
- Core Web Vitals terrain ;
- backlinks éditoriaux ;
- validation des profils sociaux.

Ils nécessitent soit une connexion externe, soit des données réelles de production, soit l’action d’un tiers.
