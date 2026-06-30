# Checklist de validation — Preview Phase B

À exécuter sur l’URL Cloudflare de la branche `migration-astro` avant toute fusion dans `main`.

## Navigation et contenu

- [ ] L’accueil conserve son apparence et son formulaire email.
- [ ] `/faq/` affiche les 16 questions et les quatre groupes.
- [ ] Le lien FAQ est présent dans le Shell et le footer.
- [ ] `/comprendre/` affiche le H1 « Comprendre son self-care ».
- [ ] Les sept Zones conservent leur design, leur contenu et leur mini-test.
- [ ] La Boussole conserve tous ses états et scénarios.
- [ ] L’Échelle atteint l’écran de résultat.
- [ ] La Respiration démarre et s’arrête normalement.
- [ ] Le Lexique conserve ses interactions.
- [ ] Le Dictionnaire affiche d’abord la page légère, puis charge les 131 fiches après le clic.
- [ ] Une seule flèche de retour en haut apparaît.

## Formulaires

- [ ] Envoyer une adresse test depuis l’accueil.
- [ ] Envoyer une adresse test depuis une Zone.
- [ ] Vérifier la réception et le message de confirmation.

## SEO technique

- [ ] `/sitemap.xml` contient 28 URL indexables et un `<lastmod>` stable pour chacune.
- [ ] `/robots.txt` déclare le bon sitemap.
- [ ] `/faq.html` redirige en 301 vers `/faq/`.
- [ ] Une ancienne URL de Zone en `.html` redirige vers la route propre.
- [ ] Une URL inexistante répond en HTTP 404 et affiche les liens Accueil, Comprendre, FAQ et Outils.
- [ ] Les sources de page ne contiennent ni `YOUR_UMAMI_ID` ni URL `.html` interne.
- [ ] Le JSON-LD de `/faq/` contient un seul nœud `FAQPage` et 16 couples `Question`/`Answer`.
- [ ] Le validateur Schema.org ne remonte pas d’erreur sur `/faq/` ; le Rich Results Test peut ne plus reconnaître FAQ depuis la suppression de ce résultat enrichi par Google.

## Aperçus sociaux

Tester au minimum :

- [ ] Accueil ;
- [ ] FAQ ;
- [ ] Échelle ;
- [ ] Lexique ;
- [ ] Zone Relations.

Chaque aperçu doit afficher le bon titre, la bonne description et une image 1200 × 630.

## Performance de preview

Lancer PageSpeed Insights en mobile et desktop sur :

- [ ] `/` ;
- [ ] `/faq/` ;
- [ ] `/dictionnaire/` avant chargement du corpus ;
- [ ] `/echelle-foebe/` ;
- [ ] `/zone-corps/`.

Vérifier en priorité le TBT et le JavaScript inutilisé. Le Shell est désormais séparé en environ 31,8 Ko de JS minifié et 34,5 Ko de CSS externe. Conserver les valeurs de LCP, CLS, TBT et les recommandations sur les scripts, images et polices. L’INP réel sera surtout confirmé après publication avec les données de terrain.

## Après validation

- [ ] Fusionner `migration-astro` dans `main`.
- [ ] Déployer la production.
- [ ] Soumettre le sitemap dans Search Console.
- [ ] Inspecter `/`, `/faq/`, `/dictionnaire/`, `/echelle-foebe/` et une Zone.
- [ ] Contrôler l’indexation et les Core Web Vitals pendant les semaines suivantes.
