# Checklist preview Cloudflare — Phase C

Après le push sur `migration-astro`, tester les URL suivantes :

- `/a-propos/`
- `/cadre-editorial/`
- `/faq/`
- `/mentions-legales/`
- `/echelle-foebe/`
- `/zone-corps/`
- `/dictionnaire/`
- une URL inexistante.

## À propos

- les trois références ouvrent les bons documents ;
- aucune mention PTO/L’Harmattan/AFNOR non documentée ne subsiste ;
- le bloc « Une présence sobre, par choix » est lisible ;
- le lien Cadre éditorial fonctionne ;
- aucune photo personnelle n’a été ajoutée.

## Cadre éditorial

- la page est visible dans le menu et le footer ;
- les six accordéons s’ouvrent ;
- le mail `contact@maisonfoebe.fr` ouvre le client mail ;
- aucun débordement horizontal sur mobile ;
- le mode jour et le mode nuit restent lisibles.

## FAQ

- les deux nouvelles questions sont visibles dans « Le cadre » ;
- les accordéons fonctionnent ;
- la carte de prochaine étape mène au cadre éditorial.

## Mentions légales

- Cloudflare est indiqué comme hébergeur ;
- Netlify n’apparaît plus ;
- la nature du site mentionne FAQ, Dictionnaire et cadre éditorial.

## Non-régression

- Échelle : démarrer, répondre, afficher le résultat ;
- Zone Corps : mini-test jusqu’au résultat ;
- Boussole : sélectionner une situation et afficher la synthèse ;
- Dictionnaire : rechercher et ouvrir une fiche ;
- Respiration : démarrer et arrêter un exercice ;
- une seule flèche retour en haut ;
- menu et footer présents sur mobile.

## SEO rendu

- `/cadre-editorial/` est dans `sitemap.xml` avec `lastmod` ;
- le JSON-LD des pages contient `publishingPrinciples` ;
- À propos reste typée `ProfilePage` ;
- les pages indexables ont `author` et `dateModified` ;
- la 404 renvoie bien le statut 404.
