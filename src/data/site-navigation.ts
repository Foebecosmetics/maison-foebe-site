export interface NavigationItem {
  href: string;
  label: string;
  children?: NavigationItem[];
}

export interface NavigationSection {
  pole: string;
  links: NavigationItem[];
}

export interface ShellPageContext {
  href: string;
  backLabel: string;
  currentLabel: string;
  aria: string;
}

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    pole: 'Maison Foébé',
    links: [{ href: '/', label: 'Accueil' }],
  },
  {
    pole: 'Découvrir',
    links: [
      { href: '/comprendre/', label: 'Comprendre Maison Foébé' },
      { href: '/a-propos/', label: 'À propos' },
      { href: '/cadre-editorial/', label: 'Cadre éditorial & sources' },
      { href: '/methode/', label: 'La méthode Foébé' },
      { href: '/faq/', label: 'Questions fréquentes' },
    ],
  },
  {
    pole: 'Pratiquer',
    links: [
      { href: '/pratiquer/', label: '4 outils' },
      { href: '/echelle-foebe/', label: 'Échelle Foébé' },
      {
        href: '/zones/',
        label: '7 zones',
        children: [
          { href: '/zone-corps/', label: 'Corps' },
          { href: '/zone-mental/', label: 'Mental' },
          { href: '/zone-energie/', label: 'Énergie' },
          { href: '/zone-emotions/', label: 'Émotions' },
          { href: '/zone-environnement/', label: 'Environnement' },
          { href: '/zone-relations/', label: 'Relations' },
          { href: '/zone-sens/', label: 'Sens' },
        ],
      },
      { href: '/respiration/', label: 'Respiration guidée' },
      {
        href: '/boussole/',
        label: 'Boussole',
        children: [{ href: '/boussole-scenarios/', label: 'Scénarios' }],
      },
    ],
  },
  {
    pole: 'Ressources',
    links: [
      { href: '/lexique/', label: 'Lexique Foébé' },
      { href: '/dictionnaire/', label: 'Dictionnaire' },
    ],
  },
];

export const ROUTE_LABELS: Record<string, string> = {
  '/': 'Accueil',
  '/comprendre/': 'Comprendre',
  '/methode/': 'La méthode Foébé',
  '/pratiquer/': '4 outils',
  '/zones/': '7 zones',
  '/echelle-foebe/': 'Échelle Foébé',
  '/respiration/': 'Respiration guidée',
  '/boussole/': 'Boussole',
  '/boussole-scenarios/': 'Scénarios',
  '/lexique/': 'Lexique Foébé',
  '/dictionnaire/': 'Dictionnaire',
  '/dictionnaire/mode-emploi/': 'Mode d’emploi',
  '/dictionnaire/guides/': 'Guides experts',
  '/dictionnaire/skincare/': 'Skincare',
  '/dictionnaire/skincare/fondamentaux/': 'Fondamentaux et états de peau',
  '/dictionnaire/skincare/actifs-routines/': 'Repères, actifs et gestes skincare',
  '/dictionnaire/haircare/': 'Haircare',
  '/dictionnaire/bodycare/': 'Bodycare',
  '/dictionnaire/self-care/': 'Self-care',
  '/a-propos/': 'À propos',
  // Route réservée : la page sera créée en brouillon sans être ajoutée au menu.
  '/accompagnements/': 'Accompagnements',
  '/faq/': 'Questions fréquentes',
  '/cadre-editorial/': 'Cadre éditorial',
  '/mentions-legales/': 'Mentions légales',
  '/zone-energie/': 'Énergie',
  '/zone-corps/': 'Corps',
  '/zone-mental/': 'Mental',
  '/zone-emotions/': 'Émotions',
  '/zone-environnement/': 'Environnement',
  '/zone-relations/': 'Relations',
  '/zone-sens/': 'Sens',
};

export function normalizeSitePath(value: string): string {
  const raw = String(value || '/').split('?')[0].split('#')[0];
  if (!raw || raw === '/') return '/';
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`;
}

export function isCurrentPath(currentPath: string, href: string): boolean {
  return normalizeSitePath(currentPath) === normalizeSitePath(href);
}

export function isBranchActive(currentPath: string, item: NavigationItem): boolean {
  if (isCurrentPath(currentPath, item.href)) return true;
  return Boolean(item.children?.some((child) => isCurrentPath(currentPath, child.href)));
}

export function getShellPageContext(currentPath: string): ShellPageContext | null {
  const path = normalizeSitePath(currentPath);
  if (path === '/') return null;

  if (path.startsWith('/zone-')) {
    return {
      href: '/zones/',
      backLabel: '7 zones',
      currentLabel: ROUTE_LABELS[path] ?? 'Zone',
      aria: 'Retour à la page des 7 zones',
    };
  }

  if (path === '/boussole-scenarios/') {
    return {
      href: '/boussole/',
      backLabel: 'Boussole',
      currentLabel: 'Scénarios',
      aria: 'Retour à la Boussole Foébé',
    };
  }

  if (path.startsWith('/dictionnaire/') && path !== '/dictionnaire/') {
    return {
      href: '/dictionnaire/',
      backLabel: 'Dictionnaire',
      currentLabel: ROUTE_LABELS[path] ?? 'Ressource',
      aria: 'Retour au Dictionnaire Foébé',
    };
  }

  if (path === '/cadre-editorial/') {
    return {
      href: '/a-propos/',
      backLabel: 'À propos',
      currentLabel: 'Cadre éditorial',
      aria: 'Retour à la page À propos',
    };
  }

  if (['/zones/', '/echelle-foebe/', '/respiration/', '/boussole/'].includes(path)) {
    return {
      href: '/pratiquer/',
      backLabel: '4 outils',
      currentLabel: ROUTE_LABELS[path] ?? 'Pratiquer',
      aria: 'Retour aux 4 outils',
    };
  }

  return {
    href: '/',
    backLabel: 'Accueil',
    currentLabel: path === '/faq/' ? 'FAQ' : (ROUTE_LABELS[path] ?? 'Page actuelle'),
    aria: 'Retour à l’accueil',
  };
}

export function usesDarkNavigation(currentPath: string): boolean {
  const path = normalizeSitePath(currentPath);
  return path === '/lexique/' || path.startsWith('/dictionnaire/');
}

export function isImmersiveShellPage(currentPath: string): boolean {
  const path = normalizeSitePath(currentPath);
  return path === '/lexique/' || path.startsWith('/stories/');
}


/**
 * Classes de page rendues par Astro dès le premier HTML.
 * Elles remplacent les anciens marqueurs posés sur <body> dans les fichiers HTML
 * et réactivent les styles historiques qui en dépendent, sans JavaScript tardif.
 */
export function getPageBodyClasses(currentPath: string): string[] {
  const path = normalizeSitePath(currentPath);
  const token = path === '/'
    ? 'index'
    : path.replace(/^\/+|\/+$/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();

  const classes = ['foebe-page', `foebe-page-${token}`];
  const historical: Record<string, string[]> = {
    '/': ['page-index'],
    '/comprendre/': ['page-comprendre'],
    '/a-propos/': ['page-a-propos'],
    '/methode/': ['page-methode'],
    '/zones/': ['page-zones-premium'],
  };

  return [...classes, ...(historical[path] ?? [])];
}
