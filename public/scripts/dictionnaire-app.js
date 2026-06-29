(function(){
const items = [{"id": "fiche-vision-du-systeme-foebe", "title": "Vision du système Foébé", "territory": "terr-mode-emploi", "territoryTitle": "Mode d’emploi", "family": "famille-vision-du-systeme", "familyTitle": "Vision du système Foébé", "kind": "mode"}, {"id": "fiche-la-bibliotheque-foebe", "title": "La bibliothèque Foébé", "territory": "terr-mode-emploi", "territoryTitle": "Mode d’emploi", "family": "famille-vision-du-systeme", "familyTitle": "Vision du système Foébé", "kind": "mode"}, {"id": "fiche-comment-utiliser-la-bibliotheque", "title": "Comment utiliser la bibliothèque", "territory": "terr-mode-emploi", "territoryTitle": "Mode d’emploi", "family": "famille-vision-du-systeme", "familyTitle": "Vision du système Foébé", "kind": "mode"}, {"id": "fiche-peau-organe-de-protection", "title": "Peau: organe de protection", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-epiderme", "title": "Épiderme", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-couche-cornee", "title": "Couche cornée", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-derme", "title": "Derme", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-hypoderme", "title": "Hypoderme", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "tableau-tableau-repere-les-couches-de-la-peau", "title": "Tableau repère: les couches de la peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "table"}, {"id": "fiche-keratinocytes", "title": "Kératinocytes", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-melanine", "title": "Mélanine", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-teinte-de-peau", "title": "Teinte de peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "tableau-tableau-repere-teinte-de-peau-et-besoins-frequents", "title": "Tableau repère: teinte de peau et besoins fréquents", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "table"}, {"id": "tableau-tableau-repere-actifs-et-niveau-d-action", "title": "Tableau repère: actifs et niveau d’action", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "table"}, {"id": "fiche-auto-evaluation-peau", "title": "Auto-évaluation peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "tableau-tableau-repere-test-simple-pour-situer-sa-peau", "title": "Tableau repère: test simple pour situer sa peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "table"}, {"id": "fiche-peau-et-equilibre-global", "title": "Peau et équilibre global", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-hydratation-interne", "title": "Hydratation interne", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-antioxydants-alimentaires", "title": "Antioxydants alimentaires", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-acides-gras-essentiels", "title": "Acides gras essentiels", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-sommeil-stress-et-peau", "title": "Sommeil, stress et peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "fiche-intestin-et-peau", "title": "Intestin et peau", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "fiche"}, {"id": "tableau-tableau-repere-peau-nutrition-et-contexte", "title": "Tableau repère: peau, nutrition et contexte", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-fondamentaux-de-la-peau", "familyTitle": "Fondamentaux de la peau", "kind": "table"}, {"id": "fiche-peau-seche", "title": "Peau sèche", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-types-de-peau", "familyTitle": "Types de peau", "kind": "fiche"}, {"id": "fiche-peau-grasse", "title": "Peau grasse", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-types-de-peau", "familyTitle": "Types de peau", "kind": "fiche"}, {"id": "fiche-peau-mixte", "title": "Peau mixte", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-types-de-peau", "familyTitle": "Types de peau", "kind": "fiche"}, {"id": "fiche-peau-normale", "title": "Peau normale", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-types-de-peau", "familyTitle": "Types de peau", "kind": "fiche"}, {"id": "fiche-peau-sensible", "title": "Peau sensible", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-types-de-peau", "familyTitle": "Types de peau", "kind": "fiche"}, {"id": "fiche-peau-reactive", "title": "Peau réactive", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-etats-de-peau", "familyTitle": "États de peau", "kind": "fiche"}, {"id": "fiche-peau-deshydratee", "title": "Peau déshydratée", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-etats-de-peau", "familyTitle": "États de peau", "kind": "fiche"}, {"id": "fiche-imperfections", "title": "Imperfections", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-etats-de-peau", "familyTitle": "États de peau", "kind": "fiche"}, {"id": "fiche-peau-acneique", "title": "Peau acnéique", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-etats-de-peau", "familyTitle": "États de peau", "kind": "fiche"}, {"id": "fiche-hyperpigmentation", "title": "Hyperpigmentation", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-etats-de-peau", "familyTitle": "États de peau", "kind": "fiche"}, {"id": "fiche-peau-mature", "title": "Peau mature", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-terrains-cutanes", "familyTitle": "Terrains cutanés", "kind": "fiche"}, {"id": "fiche-peau-atopique", "title": "Peau atopique", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-terrains-cutanes", "familyTitle": "Terrains cutanés", "kind": "fiche"}, {"id": "fiche-barriere-cutanee", "title": "Barrière cutanée", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-reperes-cutanes", "familyTitle": "Repères cutanés", "kind": "fiche"}, {"id": "fiche-sebum", "title": "Sébum", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-reperes-cutanes", "familyTitle": "Repères cutanés", "kind": "fiche"}, {"id": "fiche-pores", "title": "Pores", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-reperes-cutanes", "familyTitle": "Repères cutanés", "kind": "fiche"}, {"id": "fiche-hydratation-cutanee", "title": "Hydratation cutanée", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-reperes-cutanes", "familyTitle": "Repères cutanés", "kind": "fiche"}, {"id": "fiche-exfoliation", "title": "Exfoliation", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-reperes-cutanes", "familyTitle": "Repères cutanés", "kind": "fiche"}, {"id": "fiche-acide-hyaluronique", "title": "Acide hyaluronique", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-niacinamide", "title": "Niacinamide", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-vitamine-c", "title": "Vitamine C", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-acide-salicylique-bha", "title": "Acide salicylique (BHA)", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-aha", "title": "AHA", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-retinol", "title": "Rétinol", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-ceramides", "title": "Céramides", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-acide-kojique", "title": "Acide kojique", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-bakuchiol", "title": "Bakuchiol", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-actifs-majeurs", "familyTitle": "Actifs majeurs", "kind": "fiche"}, {"id": "fiche-spf-protection-solaire", "title": "SPF: Protection solaire", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-gestes-essentiels", "familyTitle": "Gestes essentiels", "kind": "fiche"}, {"id": "fiche-introduire-un-actif", "title": "Introduire un actif", "territory": "terr-skincare", "territoryTitle": "Skincare", "family": "famille-gestes-essentiels", "familyTitle": "Gestes essentiels", "kind": "fiche"}, {"id": "fiche-texture-capillaire", "title": "Texture capillaire", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-bases", "familyTitle": "Bases", "kind": "fiche"}, {"id": "fiche-porosite", "title": "Porosité", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-bases", "familyTitle": "Bases", "kind": "fiche"}, {"id": "fiche-shrinkage", "title": "Shrinkage", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-bases", "familyTitle": "Bases", "kind": "fiche"}, {"id": "fiche-racines", "title": "Racines", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-longueurs", "title": "Longueurs", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-pointes", "title": "Pointes", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-densite-capillaire", "title": "Densité capillaire", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-epaisseur-du-cheveu", "title": "Épaisseur du cheveu", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-cheveux-boucles", "title": "Cheveux bouclés", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-cheveux-frises", "title": "Cheveux frisés", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-cheveux-crepus", "title": "Cheveux crépus", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-frisottis", "title": "Frisottis", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "fiche-fourches", "title": "Fourches", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "fiche"}, {"id": "tableau-tableau-repere-observer-sa-fibre-avant-de-choisir-un-soin", "title": "Tableau repère: observer sa fibre avant de choisir un soin", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-reperes-de-fibre-capillaire", "familyTitle": "Repères de fibre capillaire", "kind": "table"}, {"id": "fiche-test-de-porosite-au-verre-d-eau", "title": "Test de porosité au verre d’eau", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "fiche-test-d-absorption-sous-la-douche", "title": "Test d’absorption sous la douche", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "fiche-test-d-epaisseur-du-cheveu", "title": "Test d’épaisseur du cheveu", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "fiche-test-de-densite-capillaire", "title": "Test de densité capillaire", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "fiche-test-d-elasticite", "title": "Test d’élasticité", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "fiche-test-des-pointes", "title": "Test des pointes", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "fiche"}, {"id": "tableau-tableau-repere-quel-test-pour-quelle-question", "title": "Tableau repère: quel test pour quelle question ?", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-tests-d-observation-capillaire", "familyTitle": "Tests d’observation capillaire", "kind": "table"}, {"id": "fiche-casse", "title": "Casse", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-manifestations", "familyTitle": "Manifestations", "kind": "fiche"}, {"id": "fiche-noeuds", "title": "Nœuds", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-manifestations", "familyTitle": "Manifestations", "kind": "fiche"}, {"id": "fiche-cuir-chevelu-sec", "title": "Cuir chevelu sec", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-manifestations", "familyTitle": "Manifestations", "kind": "fiche"}, {"id": "fiche-hydratation-capillaire", "title": "Hydratation capillaire", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-leave-in", "title": "Leave-in", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-sceller", "title": "Sceller", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-loc-lco", "title": "LOC / LCO", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-clarification", "title": "Clarification", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-proteines-capillaires", "title": "Protéines capillaires", "territory": "terr-haircare", "territoryTitle": "Haircare", "family": "famille-gestes-routines-capillaires", "familyTitle": "Gestes & routines capillaires", "kind": "fiche"}, {"id": "fiche-peau-du-corps-seche", "title": "Peau du corps sèche", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-peau-du-corps", "familyTitle": "Peau du corps", "kind": "fiche"}, {"id": "fiche-peau-du-corps-sensible", "title": "Peau du corps sensible", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-peau-du-corps", "familyTitle": "Peau du corps", "kind": "fiche"}, {"id": "fiche-keratose-pilaire", "title": "Kératose pilaire", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-peau-du-corps", "familyTitle": "Peau du corps", "kind": "fiche"}, {"id": "fiche-zones-de-friction", "title": "Zones de friction", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-peau-du-corps", "familyTitle": "Peau du corps", "kind": "fiche"}, {"id": "fiche-hydratation-du-corps", "title": "Hydratation du corps", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-reperes-et-actifs-corps", "familyTitle": "Repères et actifs corps", "kind": "fiche"}, {"id": "fiche-exfoliation-du-corps", "title": "Exfoliation du corps", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-reperes-et-actifs-corps", "familyTitle": "Repères et actifs corps", "kind": "fiche"}, {"id": "fiche-uree", "title": "Urée", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-reperes-et-actifs-corps", "familyTitle": "Repères et actifs corps", "kind": "fiche"}, {"id": "fiche-beurres-vegetaux", "title": "Beurres végétaux", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-reperes-et-actifs-corps", "familyTitle": "Repères et actifs corps", "kind": "fiche"}, {"id": "fiche-routine-corps-logique-de-base", "title": "Routine corps: logique de base", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-gestes-rituels-corps", "familyTitle": "Gestes & rituels corps", "kind": "fiche"}, {"id": "fiche-soin-des-pieds", "title": "Soin des pieds", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-gestes-rituels-corps", "familyTitle": "Gestes & rituels corps", "kind": "fiche"}, {"id": "fiche-auto-massage-corporel", "title": "Auto-massage corporel", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-gestes-rituels-corps", "familyTitle": "Gestes & rituels corps", "kind": "fiche"}, {"id": "fiche-soin-des-mains", "title": "Soin des mains", "territory": "terr-bodycare", "territoryTitle": "Bodycare", "family": "famille-gestes-rituels-corps", "familyTitle": "Gestes & rituels corps", "kind": "fiche"}, {"id": "fiche-charge-mentale", "title": "Charge mentale", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-mental", "familyTitle": "Mental", "kind": "fiche"}, {"id": "fiche-surcharge-cognitive", "title": "Surcharge cognitive", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-mental", "familyTitle": "Mental", "kind": "fiche"}, {"id": "fiche-fatigue-decisionnelle", "title": "Fatigue décisionnelle", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-mental", "familyTitle": "Mental", "kind": "fiche"}, {"id": "fiche-hyperfonctionnement", "title": "Hyperfonctionnement", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-fonctionnement", "familyTitle": "Fonctionnement", "kind": "fiche"}, {"id": "fiche-burnout-fonctionnel", "title": "Burnout fonctionnel", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-fonctionnement", "familyTitle": "Fonctionnement", "kind": "fiche"}, {"id": "fiche-trop-plein-emotionnel", "title": "Trop-plein émotionnel", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-emotions", "familyTitle": "Émotions", "kind": "fiche"}, {"id": "fiche-regulation-emotionnelle", "title": "Régulation émotionnelle", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-emotions", "familyTitle": "Émotions", "kind": "fiche"}, {"id": "fiche-culpabilite-de-repos", "title": "Culpabilité de repos", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-emotions", "familyTitle": "Émotions", "kind": "fiche"}, {"id": "fiche-dette-de-recuperation", "title": "Besoin de récupération", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-energie-recuperation", "familyTitle": "Énergie & récupération", "kind": "fiche"}, {"id": "fiche-recuperation-incomplete", "title": "Récupération incomplète", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-energie-recuperation", "familyTitle": "Énergie & récupération", "kind": "fiche"}, {"id": "fiche-micro-recuperation", "title": "Micro-récupération", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-energie-recuperation", "familyTitle": "Énergie & récupération", "kind": "fiche"}, {"id": "fiche-corps-en-alerte", "title": "Corps en alerte", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-corps", "familyTitle": "Corps", "kind": "fiche"}, {"id": "fiche-systeme-nerveux-parasympathique", "title": "Système nerveux parasympathique", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-corps", "familyTitle": "Corps", "kind": "fiche"}, {"id": "fiche-ancrage-sensoriel", "title": "Ancrage sensoriel", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-corps", "familyTitle": "Corps", "kind": "fiche"}, {"id": "fiche-microrituel", "title": "Microrituel", "territory": "terr-self-care", "territoryTitle": "Self-care", "family": "famille-corps", "familyTitle": "Corps", "kind": "fiche"}, {"id": "guide-guides-experts-foebe", "title": "Guides experts Foébé", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guides-introduction", "familyTitle": "Introduction des guides", "kind": "guide"}, {"id": "guide-guide-1-les-huiles-vegetales", "title": "Guide 1 — Les huiles végétales", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "guide"}, {"id": "guide-ce-qu-une-huile-vegetale-fait-et-ne-fait-pas", "title": "Ce qu'une huile végétale fait et ne fait pas", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "guide"}, {"id": "guide-hydrater-nourrir-sceller-trois-gestes-distincts", "title": "Hydrater, nourrir, sceller : trois gestes distincts", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "guide"}, {"id": "guide-application-selon-la-zone", "title": "Application selon la zone", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "guide"}, {"id": "tableau-selection-des-huiles-tableau-de-reference", "title": "Sélection des huiles: tableau de référence", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "table"}, {"id": "guide-et-pour-le-corps", "title": "Corps — huiles végétales", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-les-huiles-vegetales", "familyTitle": "Guide 1 — Les huiles végétales", "kind": "guide"}, {"id": "guide-guide-2-actifs-skincare-routine", "title": "Guide 2 — Actifs skincare & routine", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-l-ordre-d-une-routine-principe-de-base", "title": "L'ordre d'une routine: principe de base", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-temps-d-attente-entre-les-etapes", "title": "Temps d'attente entre les étapes", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-introduire-un-actif-protocole-progressif", "title": "Introduire un actif: protocole progressif", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-compatibilites-des-actifs-reperes-de-tolerance", "title": "Compatibilités des actifs: repères de tolérance", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-routines-par-besoin", "title": "Routines par besoin", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-et-pour-le-corps-2", "title": "Corps — actifs & routine", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-actifs-skincare-routine", "familyTitle": "Guide 2 — Actifs skincare & routine", "kind": "guide"}, {"id": "guide-guide-3-cheveux-textures", "title": "Guide 3 — Cheveux texturés", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-cheveux-textures", "familyTitle": "Guide 3 — Cheveux texturés", "kind": "guide"}, {"id": "guide-comprendre-ses-cheveux-en-3-questions", "title": "Comprendre ses cheveux en 3 questions", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-cheveux-textures", "familyTitle": "Guide 3 — Cheveux texturés", "kind": "guide"}, {"id": "guide-parcours-selon-le-besoin", "title": "Parcours selon le besoin", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-cheveux-textures", "familyTitle": "Guide 3 — Cheveux texturés", "kind": "guide"}, {"id": "tableau-tableau-de-frequence", "title": "Tableau de fréquence", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-cheveux-textures", "familyTitle": "Guide 3 — Cheveux texturés", "kind": "table"}, {"id": "guide-guide-4-recuperation-surcharge", "title": "Guide 4 — Récupération & surcharge", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-recuperation-surcharge", "familyTitle": "Guide 4 — Récupération & surcharge", "kind": "guide"}, {"id": "guide-identifier-son-etat-point-de-depart", "title": "Identifier son état: point de départ", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-recuperation-surcharge", "familyTitle": "Guide 4 — Récupération & surcharge", "kind": "guide"}, {"id": "guide-le-corps-comme-espace-de-recuperation", "title": "Le corps comme espace de récupération", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-recuperation-surcharge", "familyTitle": "Guide 4 — Récupération & surcharge", "kind": "guide"}, {"id": "guide-formats-express", "title": "Formats express", "territory": "terr-guides", "territoryTitle": "Guides experts", "family": "famille-guide-recuperation-surcharge", "familyTitle": "Guide 4 — Récupération & surcharge", "kind": "guide"}];
const body=document.body;
const toolbar=document.getElementById('focus-toolbar');
const focusTitle=document.getElementById('focus-title');
const focusBack=document.getElementById('focus-back');
const focusFamily=document.getElementById('focus-family');
const focusHome=document.getElementById('focus-home');
const focusPrev=document.getElementById('focus-prev');
const focusNext=document.getElementById('focus-next');
const focusBottomNav=document.getElementById('focus-bottom-nav');
const focusBottomPrev=document.getElementById('focus-bottom-prev');
const focusBottomNext=document.getElementById('focus-bottom-next');
const focusCounter=document.getElementById('focus-counter');
const search=document.getElementById('dict-search');
const searchClear=document.getElementById('search-clear');
const searchResults=document.getElementById('search-results');
let currentFicheId=null,currentFamilyId=null,lastTerritoryId=null;
function meta(id){return items.find(x=>x.id===id)}
function clearModes(){
  body.classList.remove('focus-mode','family-mode','search-mode','chooser-mode');
  document.querySelectorAll('.focus-visible,.focus-visible-family,.focus-visible-territory,.family-visible-family,.family-visible-territory,.nav-visible').forEach(el=>el.classList.remove('focus-visible','focus-visible-family','focus-visible-territory','family-visible-family','family-visible-territory','nav-visible'));
  document.querySelectorAll('.dict-nav a').forEach(a=>a.classList.remove('active'));
  document.querySelectorAll('.chooser-panel').forEach(p=>p.classList.remove('visible'));
  if(toolbar) toolbar.classList.remove('visible');
  if(focusBottomNav) focusBottomNav.hidden=true;
}
function setSingleFicheDOM(id){
  const m=meta(id), el=document.getElementById(id);
  const layout=document.querySelector('.dict-layout');
  if(layout) layout.hidden=false;
  document.querySelectorAll('.territoire').forEach(t=>{t.hidden=true;t.classList.remove('focus-visible-territory');});
  document.querySelectorAll('.famille').forEach(f=>{f.hidden=true;f.classList.remove('focus-visible-family');});
  document.querySelectorAll('.fiche').forEach(f=>{f.hidden=true;f.classList.remove('focus-visible');});
  if(m){
    const terr=document.getElementById(m.territory), fam=document.getElementById(m.family);
    if(terr){terr.hidden=false;terr.classList.add('focus-visible-territory');}
    if(fam){fam.hidden=false;fam.classList.add('focus-visible-family');}
    document.querySelectorAll('[data-territory-nav]').forEach(n=>{n.classList.toggle('nav-visible', n.getAttribute('data-territory-nav')===m.territory);});
  }
  if(el){el.hidden=false;el.classList.add('focus-visible');}
}
function setChooserDOM(territoryId){
  const layout=document.querySelector('.dict-layout');
  if(layout) layout.hidden=true;
  document.querySelectorAll('.territoire,.famille,.fiche').forEach(el=>{el.hidden=true;});
  document.querySelectorAll('.chooser-panel').forEach(p=>p.classList.toggle('visible', p.id==='chooser-'+territoryId));
}
function updateFocusFrame(){if(!toolbar)return; document.documentElement.style.setProperty('--focus-height',toolbar.offsetHeight+'px');}
function topOf(el){
  if(!el)return;
  requestAnimationFrame(()=>{
    updateFocusFrame();
    const nav=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'))||60;
    const target=(body.classList.contains('focus-mode') && toolbar && toolbar.classList.contains('visible')) ? toolbar : el;
    const y=target.getBoundingClientRect().top+window.pageYOffset-nav-18;
    window.scrollTo({top:Math.max(0,y),behavior:'auto'});
  });
}
function updateNavVisibility(territoryId, focusPrefix){
  document.querySelectorAll('[data-territory-nav]').forEach(n=>n.classList.toggle('nav-visible', n.getAttribute('data-territory-nav')===territoryId));
}
function updateCounter(id){
  const m=meta(id);
  if(!m){
    focusCounter.textContent='';
    focusPrev.disabled=true;
    focusNext.disabled=true;
    if(focusBottomPrev) focusBottomPrev.disabled=true;
    if(focusBottomNext) focusBottomNext.disabled=true;
    return;
  }
  const siblings=items.filter(x=>x.family===m.family);
  const idx=siblings.findIndex(x=>x.id===id);
  const prevId=idx>0?siblings[idx-1].id:'';
  const nextId=idx<siblings.length-1?siblings[idx+1].id:'';
  focusCounter.textContent=(idx+1)+' / '+siblings.length;
  focusPrev.disabled=idx<=0;
  focusNext.disabled=idx>=siblings.length-1;
  focusPrev.dataset.target=prevId;
  focusNext.dataset.target=nextId;
  if(focusBottomPrev){
    focusBottomPrev.disabled=idx<=0;
    focusBottomPrev.dataset.target=prevId;
  }
  if(focusBottomNext){
    focusBottomNext.disabled=idx>=siblings.length-1;
    focusBottomNext.dataset.target=nextId;
  }
}
function moveBottomNav(id){
  if(!focusBottomNav) return;
  const el=document.getElementById(id);
  if(!el){focusBottomNav.hidden=true; return;}
  el.appendChild(focusBottomNav);
  focusBottomNav.hidden=false;
}
function enterFocus(id, scroll=true){
  const el=document.getElementById(id); const m=meta(id); if(!el||!m)return;
  clearModes();
  body.classList.add('focus-mode');
  setSingleFicheDOM(id);
  document.querySelectorAll('.chooser-panel').forEach(p=>p.classList.remove('visible'));
  document.querySelectorAll('.entry-card').forEach(c=>c.classList.toggle('is-active',c.dataset.dictEntry===m.territory));
  updateNavVisibility(m.territory);
  if(toolbar){
    toolbar.classList.add('visible');
    focusTitle.innerHTML='<span class="breadcrumb-trail"><strong>'+m.territoryTitle+'</strong><span class="breadcrumb-sep">›</span><span>'+m.familyTitle+'</span><span class="breadcrumb-sep">›</span><strong>'+m.title+'</strong></span>';
  }
  currentFicheId=id; currentFamilyId=m.family; lastTerritoryId=m.territory;
  updateCounter(id);
  moveBottomNav(id);
  document.querySelectorAll('.dict-nav a').forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+id));
  try{history.replaceState(null,'','#'+id);}catch(e){}
  updateFocusFrame();
  if(scroll) topOf(el);
}
function enterFamily(id, scroll=true){const fam=document.getElementById(id); if(!fam)return; const first=fam.querySelector('.fiche'); if(!first)return; enterFocus(first.id, scroll);}
function showChooser(territoryId, scroll=true){
  clearModes();
  body.classList.add('chooser-mode');
  lastTerritoryId=territoryId;
  setChooserDOM(territoryId);
  const panel=document.getElementById('chooser-'+territoryId);
  document.querySelectorAll('.entry-card').forEach(c=>c.classList.toggle('is-active',c.dataset.dictEntry===territoryId));
  try{history.replaceState(null,'','#'+territoryId);}catch(e){}
  if(panel && scroll) topOf(panel);
}
function home(){
  clearModes();
  const layout=document.querySelector('.dict-layout'); if(layout) layout.hidden=true;
  document.querySelectorAll('.territoire,.famille,.fiche').forEach(el=>{el.hidden=true;});
  document.querySelectorAll('.chooser-panel').forEach(p=>p.classList.remove('visible'));
  document.querySelectorAll('.entry-card').forEach(c=>c.classList.remove('is-active'));
  if(search){search.value='';}
  if(searchClear)searchClear.classList.remove('visible');
  if(searchResults)searchResults.classList.remove('visible');
  try{history.replaceState(null,'',location.pathname);}catch(e){}
  window.scrollTo({top:0,behavior:'auto'});
}
function searchRun(){const q=(search.value||'').trim().toLowerCase(); if(searchClear)searchClear.classList.toggle('visible',q.length>0); if(!q){if(searchResults)searchResults.classList.remove('visible'); return;} const terms=q.split(/\s+/).filter(Boolean); const matches=[]; document.querySelectorAll('.fiche').forEach(f=>{const hay=(f.dataset.search||f.textContent||'').toLowerCase(); if(terms.every(t=>hay.includes(t))) matches.push(f);}); if(!searchResults)return; searchResults.classList.add('visible'); const limited=matches.slice(0,18); searchResults.innerHTML='<p class="search-results-title"><strong>'+matches.length+'</strong> résultat(s). Choisis une fiche : elle s’ouvrira seule.</p><div class="search-results-list">'+limited.map(f=>{const m=meta(f.id)||{}; let snip=(f.textContent||'').replace(/\s+/g,' ').trim().slice(0,150); return '<button class="search-result-item" type="button" data-target="'+f.id+'"><span class="search-result-kicker">'+(m.territoryTitle||'')+' · '+(m.familyTitle||'')+'</span><span class="search-result-title">'+(m.title||f.id)+'</span><span class="search-result-snippet">'+snip+'…</span></button>';}).join('')+'</div>'+(matches.length>18?'<p class="search-result-more">Affichage des 18 premiers résultats. Précise le mot pour réduire la liste.</p>':''); searchResults.querySelectorAll('[data-target]').forEach(b=>b.addEventListener('click',()=>enterFocus(b.dataset.target,true)));}


function openObservatoireSearch(){
  clearModes();
  const layout=document.querySelector('.dict-layout'); if(layout) layout.hidden=true;
  document.querySelectorAll('.territoire,.famille,.fiche').forEach(el=>{el.hidden=true;});
  document.querySelectorAll('.chooser-panel').forEach(p=>p.classList.remove('visible'));
  document.querySelectorAll('.entry-card').forEach(c=>c.classList.toggle('is-active', c.dataset.observatoireAction==='search'));
  try{history.replaceState(null,'','#recherche-observatoire');}catch(e){}
  const zone=document.getElementById('recherche-observatoire') || document.querySelector('.dict-search-zone');
  if(zone) topOf(zone);
  if(search){ setTimeout(()=>search.focus({preventScroll:true}), 260); }
}
document.querySelectorAll('[data-observatoire-action="search"]').forEach(btn=>btn.addEventListener('click',openObservatoireSearch));
document.querySelectorAll('[data-dict-entry]').forEach(btn=>btn.addEventListener('click',()=>showChooser(btn.dataset.dictEntry,true)));

function buildDirectChoiceButtons(){
  document.querySelectorAll('.chooser-panel').forEach(panel=>{
    const select=panel.querySelector('.chooser-select');
    if(!select || panel.querySelector('.chooser-direct-groups')) return;
    const groups=document.createElement('div');
    groups.className='chooser-direct-groups';
    groups.setAttribute('aria-label','Choix directs');
    const seen=new Set();

    Array.from(select.children).forEach(child=>{
      if(child.tagName==='OPTION') return;
      if(child.tagName!=='OPTGROUP') return;
      const group=document.createElement('div');
      group.className='chooser-direct-group';
      const title=document.createElement('h3');
      title.className='chooser-direct-title';
      title.textContent=child.label || 'Repères';
      group.appendChild(title);
      const list=document.createElement('div');
      list.className='chooser-direct-list';

      Array.from(child.children).forEach(opt=>{
        if(!opt.value || seen.has(opt.value)) return;
        seen.add(opt.value);
        const btn=document.createElement('button');
        btn.type='button';
        btn.className='chooser-direct-btn';
        btn.dataset.target=opt.value;
        btn.textContent=opt.textContent;
        btn.addEventListener('click',()=>enterFocus(opt.value,true));
        list.appendChild(btn);
      });

      if(list.children.length){
        group.appendChild(list);
        groups.appendChild(group);
      }
    });

    const row=panel.querySelector('.chooser-select-row');
    if(row) row.insertAdjacentElement('afterend', groups);
  });

  document.body.classList.add('dict-direct-choices-ready');
}
buildDirectChoiceButtons();

document.querySelectorAll('.chooser-open').forEach(btn=>btn.addEventListener('click',()=>{const s=document.getElementById(btn.dataset.select); if(s&&s.value) enterFocus(s.value,true);}));
document.querySelectorAll('.chooser-select').forEach(s=>s.addEventListener('change',()=>{ if(s.value) enterFocus(s.value,true); }));
document.querySelectorAll('.index-family-chip[data-family]').forEach(btn=>btn.addEventListener('click',()=>enterFamily(btn.dataset.family,true)));
document.querySelectorAll('.first-fiche[data-first]').forEach(btn=>btn.addEventListener('click',()=>enterFocus(btn.dataset.first,true)));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=decodeURIComponent(a.getAttribute('href').slice(1));const target=document.getElementById(id); if(!target)return; e.preventDefault(); if(target.classList.contains('famille')) enterFamily(id,true); else if(target.classList.contains('territoire')) showChooser(id,true); else enterFocus(id,true);}));
if(focusBack)focusBack.addEventListener('click',()=>{if(lastTerritoryId) showChooser(lastTerritoryId,true); else home();});
if(focusFamily)focusFamily.addEventListener('click',()=>{if(lastTerritoryId){showChooser(lastTerritoryId,true); const panel=document.getElementById('chooser-'+lastTerritoryId); const select=panel?panel.querySelector('.chooser-select'):null; if(select){setTimeout(()=>select.focus(),80);}}});
if(focusHome)focusHome.addEventListener('click',home);
if(focusPrev)focusPrev.addEventListener('click',()=>{if(focusPrev.dataset.target) enterFocus(focusPrev.dataset.target,true);});
if(focusNext)focusNext.addEventListener('click',()=>{if(focusNext.dataset.target) enterFocus(focusNext.dataset.target,true);});
if(focusBottomPrev)focusBottomPrev.addEventListener('click',()=>{if(focusBottomPrev.dataset.target) enterFocus(focusBottomPrev.dataset.target,true);});
if(focusBottomNext)focusBottomNext.addEventListener('click',()=>{if(focusBottomNext.dataset.target) enterFocus(focusBottomNext.dataset.target,true);});
if(search)search.addEventListener('input',searchRun);
if(searchClear)searchClear.addEventListener('click',()=>{search.value='';search.focus();searchRun();});
const mobileJump=document.getElementById('mobile-jump'); if(mobileJump)mobileJump.addEventListener('change',()=>{if(mobileJump.value) enterFocus(mobileJump.value,true);});
window.addEventListener('resize',()=>{if(body.classList.contains('focus-mode')) updateFocusFrame();},{passive:true});
window.addEventListener('DOMContentLoaded',()=>{if(!location.hash){const layout=document.querySelector('.dict-layout'); if(layout) layout.hidden=true; document.querySelectorAll('.territoire,.famille,.fiche').forEach(el=>{el.hidden=true;});}});
window.addEventListener('load',()=>{if(location.hash&&location.hash.length>1){const id=decodeURIComponent(location.hash.slice(1)); const target=document.getElementById(id); if(target){if(target.classList.contains('territoire')) showChooser(id,false); else if(target.classList.contains('famille')) enterFamily(id,false); else enterFocus(id,false);}}});
})();

(function(){
  function text(el){return (el && el.textContent || '').replace(/\s+/g,' ').trim();}
  function buildMobileCards(){
    document.querySelectorAll('.repere-table').forEach(function(table){
      var wrap=table.closest('.repere-table-wrap');
      if(!wrap || wrap.nextElementSibling && wrap.nextElementSibling.classList && wrap.nextElementSibling.classList.contains('mobile-table-cards')) return;
      var headers=Array.prototype.map.call(table.querySelectorAll('thead th'), text);
      if(!headers.length) return;
      var box=document.createElement('div');
      box.className='mobile-table-cards';
      box.setAttribute('aria-label','Version cartes du tableau');

      /* Cas spécial : routine matin / soir.
         Sur mobile et tablette, on affiche deux cartes claires au lieu de cartes ligne par ligne
         où le matin ressemble à un titre isolé. */
      if(headers.length===2 && headers[0].toLowerCase()==='matin' && headers[1].toLowerCase()==='soir'){
        var matin=[], soir=[];
        table.querySelectorAll('tbody tr').forEach(function(row){
          var cells=Array.prototype.map.call(row.children, text);
          if(cells[0]) matin.push(cells[0]);
          if(cells[1]) soir.push(cells[1]);
        });
        [['Routine du matin', matin], ['Routine du soir', soir]].forEach(function(group, idx){
          var card=document.createElement('div');
          card.className='mobile-table-card routine-mobile-card';
          var h=document.createElement('h4');
          h.textContent=(idx+1)+'/2 · '+group[0];
          card.appendChild(h);
          var ul=document.createElement('ul');
          ul.className='routine-mobile-list';
          group[1].forEach(function(item){var li=document.createElement('li'); li.textContent=item; ul.appendChild(li);});
          card.appendChild(ul);
          box.appendChild(card);
        });
        wrap.insertAdjacentElement('afterend',box);
        return;
      }

      table.querySelectorAll('tbody tr').forEach(function(row){
        var cells=Array.prototype.map.call(row.children, text);
        if(!cells.length) return;
        var card=document.createElement('div');
        card.className='mobile-table-card';
        var h=document.createElement('h4');
        h.textContent=cells[0];
        card.appendChild(h);
        for(var i=1;i<cells.length;i++){
          if(!cells[i]) continue;
          var p=document.createElement('p');
          var lab=document.createElement('span');
          lab.className='mobile-table-label';
          lab.textContent=headers[i] || 'Repère';
          p.appendChild(lab);
          p.appendChild(document.createTextNode(cells[i]));
          card.appendChild(p);
        }
        box.appendChild(card);
      });
      wrap.insertAdjacentElement('afterend',box);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',buildMobileCards); else buildMobileCards();
})();

(function(){
  var fab=document.getElementById('mobile-retour-fab');
  var back=document.getElementById('focus-back');
  if(fab&&back) fab.addEventListener('click',function(){ back.click(); });
})();
