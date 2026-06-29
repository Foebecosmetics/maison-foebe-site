# Correctifs de validation — Phase B

Ce document répond aux derniers points soulevés avant le déploiement de la preview Cloudflare.

## FAQPage

Le JSON-LD final de `/faq/` contient un seul nœud de page :

- `@id` : `https://maisonfoebe.fr/faq/#webpage` ;
- `@type` : `FAQPage` uniquement ;
- `mainEntity` : 16 objets `Question`, chacun relié à un `Answer`.

Il n’existe pas de second nœud `WebPage` portant le même identifiant. Ce contrôle est maintenant intégré à `npm run audit` et bloque le build en cas de régression.

Depuis mai 2026, Google n’affiche plus de résultats enrichis FAQ. Le Rich Results Test peut donc ne plus présenter cette FAQ comme un résultat enrichi éligible. La syntaxe et la cohérence du JSON-LD restent contrôlées dans le projet ; après publication, la page pourra aussi être vérifiée dans le validateur Schema.org et dans l’inspection d’URL de Search Console.

## Sitemap et lastmod

Les 28 URL indexables possèdent maintenant un `<lastmod>`.

Les dates ne sont pas recalculées à chaque build. Elles sont enregistrées explicitement dans :

`src/data/page-lastmod.json`

Cette méthode évite d’annoncer à Google qu’une page a changé uniquement parce qu’un déploiement technique a eu lieu. Lorsqu’une page est modifiée de manière significative, sa date doit être mise à jour dans ce fichier.

## Page 404

La 404 personnalisée :

- répond bien avec un statut HTTP 404 dans le runtime Cloudflare ;
- est en `noindex, follow` ;
- renvoie vers l’accueil, Comprendre, la FAQ et les outils ;
- conserve le Shell, le footer et une seule flèche de retour en haut.

Une 404 ne « récupère » pas automatiquement l’autorité d’une ancienne URL : une ancienne page ayant un équivalent doit toujours recevoir une redirection 301. Les liens de la 404 servent surtout à éviter une impasse pour la personne et à faciliter la navigation.

## Shell et performance

Avant le correctif :

- `foebe-shell.js` : environ 99 Ko, non minifié ;
- une grande partie du CSS était assemblée et injectée par JavaScript.

Après le correctif :

- `foebe-shell.js` : 31 804 octets, environ 9 Ko gzip ;
- `foebe-shell.css` : 34 492 octets, environ 5,7 Ko gzip ;
- JavaScript minifié automatiquement au build ;
- CSS externe, cacheable et chargé dans le `<head>` ;
- script du Shell chargé avec `defer` ;
- plus aucun gros bloc de styles reconstruit par le Shell.

Cela réduit le travail JavaScript initial. Les valeurs réelles de TBT, LCP et CLS devront néanmoins être mesurées sur la preview Cloudflare avec PageSpeed Insights.

## FAQ dans le Shell et le footer

Le lien `/faq/` est présent :

- dans le groupe « Découvrir » du menu principal ;
- dans la colonne « Découvrir » du footer.

L’audit automatique exige désormais ces deux présences.

## hreflang

Aucun `hreflang="x-default"` n’est ajouté pour le moment. Maison Foébé ne possède qu’une version française de chaque page. Les annotations hreflang deviennent utiles lorsqu’il existe plusieurs versions linguistiques ou régionales d’un même contenu.

## Validation finale

- 30 fichiers HTML générés ;
- 28 pages indexables ;
- 28 balises `lastmod` ;
- un seul nœud `FAQPage` avec 16 questions ;
- 404 utile et correctement servie en 404 ;
- lien FAQ présent dans le menu et le footer ;
- Shell JS réduit d’environ 99 Ko à 31,8 Ko ;
- zéro incohérence bloquante dans `npm run validate` ;
- Wrangler prépare uniquement 123 fichiers depuis `dist`.
