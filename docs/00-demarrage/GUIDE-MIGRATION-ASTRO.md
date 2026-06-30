# Mettre la version Phases A + B sur `migration-astro`

## 1. Sauvegarde

Dans GitHub Desktop, sélectionne le dépôt Maison Foébé puis vérifie que la branche affichée est bien :

```text
migration-astro
```

Clique sur **Fetch origin** avant de modifier les fichiers.

## 2. Remplacement

Décompresse le ZIP. Copie le **contenu** du dossier du projet à la racine du dépôt local.

La racine doit contenir directement :

```text
src/
public/
scripts/
package.json
package-lock.json
astro.config.mjs
wrangler.jsonc
```

Ne crée pas un sous-dossier supplémentaire autour de ces fichiers. Ne supprime jamais le dossier caché `.git` du dépôt local.

## 3. Commit et push

Dans GitHub Desktop :

```text
Commit : Phases A et B SEO complètes
```

Puis clique sur **Push origin**.

## 4. Cloudflare

Applique les réglages de `REGLAGES-CLOUDFLARE.md`. Le journal doit montrer qu’Astro construit `dist/`, puis que Wrangler lit les ressources depuis `dist`, et non des milliers de fichiers depuis la racine du dépôt.

## 5. Preview à contrôler

Utilise `CHECKLIST-PREVIEW-PHASE-B.md`. Les contrôles indispensables sont :

- accueil et formulaire email ;
- nouvelle FAQ et ses 16 questions ;
- Dictionnaire avant et après « Charger le dictionnaire interactif » ;
- Échelle jusqu’au résultat ;
- mini-test complet d’une Zone ;
- Boussole, Respiration et Lexique ;
- menu du Shell et une seule flèche de retour en haut ;
- redirections des anciennes URL `.html` ;
- aperçus sociaux ;
- PageSpeed des cinq pages critiques.

## 6. Ne pas fusionner immédiatement

La branche `main` reste inchangée tant que la preview n’a pas été validée sur smartphone et ordinateur. Une fois les tests terminés, la fusion vers `main` se fait en une seule bascule maîtrisée.

La refonte éditoriale de l’accueil pour les accompagnements d’octobre n’est pas incluse. Elle reste un chantier séparé afin de ne pas mélanger la migration avec le futur lancement.
