export type AccompagnementStatus = "opening" | "later";

export interface AccompagnementOffer {
  id: "atelier" | "n1" | "n2" | "n3";
  name: string;
  status: AccompagnementStatus;
}

/**
 * Réserve architecturale pour octobre 2026.
 *
 * Tant que `enabled` reste à false :
 * - l’accueil conserve le formulaire « bientôt disponible » ;
 * - aucune page /accompagnements n’est annoncée au public ;
 * - N2 et N3 restent invisibles.
 *
 * Avant de passer `enabled` à true, créer et valider la route
 * `src/pages/accompagnements/index.astro`.
 */
export const accompagnementsHub = {
  enabled: false,
  href: "/accompagnements/",
  plannedOpening: "2026-10",
  offers: [
    { id: "atelier", name: "L’Atelier Foébé", status: "opening" },
    { id: "n1", name: "N1 · La Carte", status: "opening" },
    { id: "n2", name: "N2", status: "later" },
    { id: "n3", name: "N3", status: "later" },
  ] satisfies AccompagnementOffer[],
} as const;
