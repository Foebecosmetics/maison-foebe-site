# Maison Foébé — Comprendre les deux alertes npm faibles

## Verdict

Le projet n’a aucune alerte critique, élevée ou modérée.

```text
Critique : 0
Élevée : 0
Modérée : 0
Faible : 2
```

Les deux lignes affichées ne représentent pas deux failles indépendantes dans le site public. Elles décrivent la même chaîne de dépendances :

```text
Astro → esbuild
```

## De quoi s’agit-il ?

L’avis concerne une possibilité de lecture arbitraire de fichiers lorsque le serveur de développement esbuild est exécuté sous Windows. Le scénario annoncé est classé faible : score CVSS 2,5, accès local, complexité élevée et privilèges locaux nécessaires.

Maison Foébé est construit comme un site statique. En production, Cloudflare reçoit uniquement le dossier `dist`. Le serveur de développement, le code source et `node_modules` ne sont pas publiés.

Cela signifie que l’avis ne décrit pas une porte ouverte permettant à n’importe quel visiteur de lire les fichiers du site en production. Il concerne surtout l’environnement de développement d’une personne ayant déjà un accès à la machine.

## Pourquoi ne pas cliquer sur « fix --force » ?

La correction automatique proposée installe Astro 7.0.3. Il s’agit d’une version majeure susceptible de modifier le build ou les intégrations. Forcer cette mise à jour juste avant une migration propre créerait davantage de risque de régression que le maintien temporaire de cette alerte faible.

Décision retenue :

1. ne pas utiliser `npm audit fix --force` ;
2. garder le serveur de développement inaccessible publiquement ;
3. publier uniquement `dist` ;
4. prévoir la migration Astro 7 dans une branche de maintenance séparée ;
5. relancer `npm audit` après chaque mise à niveau contrôlée.

## Ce qui est protégé par le projet

L’audit de build vérifie que :

- Wrangler déploie `./dist` ;
- `.git`, `src`, `node_modules`, `package.json` et `wrangler.jsonc` ne font pas partie du site public ;
- aucun serveur Astro de développement n’est lancé en production ;
- le résultat final reste un ensemble de fichiers statiques.

Cette note ne prétend pas qu’un logiciel possède un risque nul. Elle explique pourquoi les deux alertes actuelles sont faibles, circonscrites à l’outillage de développement et non bloquantes pour le déploiement statique prévu.
