# Checklist preview Cloudflare — Phase D1

À effectuer sur l’URL de preview `migration-astro` avant fusion vers `main`.

## FAQ sur smartphone

- [ ] `/faq/` se charge sans écran blanc.
- [ ] Les quatre portes du haut sont lisibles et conduisent aux bonnes sections.
- [ ] Aucun débordement horizontal.
- [ ] Les 29 accordéons restent fermés au chargement.
- [ ] Ouvrir « Pourquoi le repos ne suffit-il pas toujours à récupérer ? ».
- [ ] Le lien « Explorer la Zone Énergie » est visible et fonctionne.
- [ ] Ouvrir « Les outils enregistrent-ils mes réponses ? ».
- [ ] Le lien vers les mentions légales fonctionne.
- [ ] Une seule flèche de retour en haut est visible après défilement.
- [ ] Le menu et le footer contiennent la FAQ.
- [ ] Le thème jour/nuit reste fonctionnel.

## FAQ sur ordinateur

- [ ] Les quatre portes forment une grille 2 × 2.
- [ ] Les titres et accordéons restent alignés.
- [ ] La navigation du Shell ne masque pas les titres lors des ancres.
- [ ] Une seule prochaine étape apparaît dans chaque réponse ouverte.

## Non-régression des outils

- [ ] Échelle : démarrage, choix et écran suivant.
- [ ] Zone Corps : mini-test et résultat.
- [ ] Boussole : passage du premier écran au suivant.
- [ ] Respiration : sélection d’un exercice.
- [ ] Dictionnaire : ouverture d’une catégorie et chargement d’une fiche.

## Après validation

- [ ] Vérifier le log Cloudflare : le build doit lancer `npm run validate`.
- [ ] Vérifier que Wrangler lit environ 126 fichiers depuis `dist`, jamais la racine du dépôt.
- [ ] Fusionner vers `main` seulement après ces contrôles.

## Ancre vers les prochaines ouvertures

- [ ] Depuis la FAQ, un lien « prochaine étape » vers `/#portes` ouvre l’accueil directement sur le formulaire email.
