import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const srcPages = path.join(root, 'src', 'pages');
const siteOrigin = 'https://maisonfoebe.fr';
const errors = [];
const warnings = [];

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

function routeFromSource(file) {
  const rel = path.relative(srcPages, file).replaceAll(path.sep, '/');
  if (rel === 'index.astro') return '/';
  if (rel.endsWith('/index.astro')) return `/${rel.slice(0, -'/index.astro'.length)}/`;
  return null;
}

function outputFileForUrl(urlPath) {
  let clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean === '/') return path.join(dist, 'index.html');
  if (path.extname(clean)) return path.join(dist, clean.slice(1));
  return path.join(dist, clean.slice(1), 'index.html');
}

function extractAttrs(html, attr) {
  const values = [];
  const re = new RegExp(`\\b${attr}\\s*=\\s*["']([^"']+)["']`, 'gi');
  let m;
  while ((m = re.exec(html))) values.push(m[1]);
  return values;
}

function isIgnored(value) {
  return !value || value.startsWith('#') || /^(?:mailto:|tel:|data:|javascript:)/i.test(value);
}

const sourceFiles = (await walk(srcPages)).filter((f) => f.endsWith('.astro'));
const expectedRoutes = sourceFiles.map(routeFromSource).filter(Boolean).sort();

if (!(await exists(dist))) {
  console.error('❌ Le dossier dist/ n’existe pas. Lance d’abord npm run build.');
  process.exit(1);
}

for (const route of expectedRoutes) {
  const file = outputFileForUrl(route);
  if (!(await exists(file))) errors.push(`Route non générée : ${route} (${path.relative(root, file)})`);
}

const allDistFiles = await walk(dist);
const htmlFiles = allDistFiles.filter((f) => f.endsWith('.html'));
const textFiles = allDistFiles.filter((f) => /\.(?:html|css|js|xml|txt)$/i.test(f));

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  const html = await fs.readFile(file, 'utf8');
  const currentRoute = rel === 'index.html' ? '/' : `/${rel.replace(/index\.html$/, '')}`;
  const base = new URL(currentRoute, siteOrigin);

  if (html.includes('YOUR_UMAMI_ID')) errors.push(`${rel} contient encore YOUR_UMAMI_ID`);
  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    ?? html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonicalMatch) {
    errors.push(`${rel} : balise canonique absente`);
  } else {
    const canonicalUrl = new URL(canonicalMatch[1], siteOrigin);
    if (canonicalUrl.origin !== siteOrigin || canonicalUrl.pathname !== currentRoute) {
      errors.push(`${rel} : canonique incorrecte → ${canonicalMatch[1]} (attendu ${siteOrigin}${currentRoute})`);
    }
  }

  for (const attr of ['href', 'src']) {
    for (const raw of extractAttrs(html, attr)) {
      if (isIgnored(raw)) continue;
      let url;
      try { url = new URL(raw, base); } catch { errors.push(`${rel} : URL invalide ${raw}`); continue; }
      if (url.origin !== siteOrigin) continue;
      if (/\.html(?:$|[?#])/i.test(raw)) errors.push(`${rel} : ancienne URL .html encore utilisée → ${raw}`);
      const target = outputFileForUrl(url.pathname);
      if (!(await exists(target))) errors.push(`${rel} : cible locale absente → ${raw}`);
    }
  }
}

// Vérifie aussi les URLs injectées dynamiquement par les scripts.
for (const file of textFiles) {
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  const text = await fs.readFile(file, 'utf8');
  const dynamicLegacyPatterns = [
    /href\\?=["'][^"']+\.html(?:[?#][^"']*)?["']/gi,
    /href\s*:\s*["'][^"']+\.html(?:[?#][^"']*)?["']/gi,
    /location\.href\s*=\s*["'][^"']+\.html(?:[?#][^"']*)?["']/gi,
  ];
  for (const pattern of dynamicLegacyPatterns) {
    const matches = text.match(pattern) ?? [];
    for (const match of matches) errors.push(`${rel} : navigation dynamique legacy → ${match}`);
  }

  if (file.endsWith('.css')) {
    const re = /url\((['"]?)([^)'"\s]+)\1\)/gi;
    let m;
    while ((m = re.exec(text))) {
      const raw = m[2];
      if (isIgnored(raw) || /^https?:/i.test(raw)) continue;
      const cssRoute = `/${rel}`;
      const url = new URL(raw, new URL(cssRoute, siteOrigin));
      const target = outputFileForUrl(url.pathname);
      if (!(await exists(target))) errors.push(`${rel} : ressource CSS absente → ${raw}`);
    }
  }
}

const sitemapPath = path.join(dist, 'sitemap.xml');
if (!(await exists(sitemapPath))) {
  errors.push('sitemap.xml absent du build');
} else {
  const sitemap = await fs.readFile(sitemapPath, 'utf8');
  for (const route of expectedRoutes) {
    const absolute = `${siteOrigin}${route}`;
    if (!sitemap.includes(`<loc>${absolute}</loc>`)) errors.push(`sitemap.xml ne contient pas ${absolute}`);
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const url = new URL(loc);
    if (url.origin === siteOrigin && !expectedRoutes.includes(url.pathname)) {
      errors.push(`sitemap.xml contient une route non générée : ${url.pathname}`);
    }
  }
}

const redirectsPath = path.join(dist, '_redirects');
if (!(await exists(redirectsPath))) errors.push('_redirects absent du build');

if (warnings.length) {
  console.log('\n⚠️  Avertissements :');
  for (const item of warnings) console.log(`  - ${item}`);
}

if (errors.length) {
  console.error(`\n❌ Audit échoué : ${errors.length} problème(s)`);
  for (const item of errors) console.error(`  - ${item}`);
  process.exit(1);
}

console.log(`\n✅ Audit réussi : ${expectedRoutes.length} routes, ${htmlFiles.length} fichiers HTML, zéro lien local cassé.`);
