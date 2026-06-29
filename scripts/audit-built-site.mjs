import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const srcPages = path.join(root, 'src', 'pages');
const siteOrigin = 'https://maisonfoebe.fr';
const umamiId = 'f25f1f6a-c967-4466-a744-e78fa7f4932f';
const errors = [];
const warnings = [];

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}
async function walk(dir) {
  if (!(await exists(dir))) return [];
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
  if (rel === '404.astro') return '/404.html';
  if (rel.endsWith('/index.astro')) return `/${rel.slice(0, -'/index.astro'.length)}/`;
  return null;
}
function routeFromOutput(file) {
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'/index.html'.length)}/`;
  return `/${rel}`;
}
function outputFileForPath(urlPath) {
  let clean;
  try { clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]); }
  catch { clean = urlPath.split('#')[0].split('?')[0]; }
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean === '/') return path.join(dist, 'index.html');
  if (clean === '/404.html') return path.join(dist, '404.html');
  if (path.extname(clean)) return path.join(dist, clean.slice(1));
  return path.join(dist, clean.slice(1).replace(/\/$/, ''), 'index.html');
}
function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
}
function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : null;
}
function firstMeta(html, key, value) {
  for (const tag of tags(html, 'meta')) {
    if ((attr(tag, key) ?? '').toLowerCase() === value.toLowerCase()) return attr(tag, 'content');
  }
  return null;
}
function firstLink(html, rel) {
  for (const tag of tags(html, 'link')) {
    const rels = (attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/);
    if (rels.includes(rel.toLowerCase())) return attr(tag, 'href');
  }
  return null;
}
function titleText(html) {
  const m = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
}
function stripTags(value) {
  return value.replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function localUrl(raw, base) {
  if (!raw || raw.startsWith('#') || /^(?:mailto:|tel:|data:|javascript:|blob:)/i.test(raw)) return null;
  try {
    const url = new URL(raw, base);
    return url.origin === siteOrigin ? url : null;
  } catch { return 'invalid'; }
}
function countOccurrences(text, needle) {
  return text.split(needle).length - 1;
}
function parseJsonLd(html, rel) {
  const nodes = [];
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try { nodes.push(JSON.parse(m[1])); }
    catch (error) { errors.push(`${rel} : JSON-LD invalide (${error.message})`); }
  }
  return nodes;
}
function flattenTypes(value, out = new Set()) {
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value)) { for (const item of value) flattenTypes(item, out); return out; }
  const t = value['@type'];
  if (Array.isArray(t)) t.forEach((x) => out.add(x));
  else if (typeof t === 'string') out.add(t);
  for (const child of Object.values(value)) flattenTypes(child, out);
  return out;
}
async function imageDimensions(file) {
  const buffer = await fs.readFile(file);
  // PNG
  if (buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // JPEG: scan Start Of Frame markers.
  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      const marker = buffer[offset + 1];
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      if (marker === 0xd9 || marker === 0xda) break;
      const length = buffer.readUInt16BE(offset + 2);
      if (!length) break;
      offset += 2 + length;
    }
  }
  return null;
}
function headingTexts(html) {
  return [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), text: stripTags(match[2]) }));
}
function controlHasName(html, tag) {
  const aria = attr(tag, 'aria-label') || attr(tag, 'aria-labelledby') || attr(tag, 'title');
  if (aria) return true;
  const id = attr(tag, 'id');
  if (id && new RegExp(`<label\\b[^>]*for=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i').test(html)) return true;
  const inner = tag.replace(/^<[^>]+>|<\/[^>]+>$/g, '').replace(/<[^>]+>/g, '').trim();
  return Boolean(inner);
}
function parseRedirects(text) {
  const redirects = new Map();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 3) { errors.push(`_redirects : ligne invalide → ${line}`); continue; }
    const [from, to, status] = parts;
    if (redirects.has(from)) errors.push(`_redirects : source dupliquée → ${from}`);
    redirects.set(from, { to, status });
  }
  return redirects;
}

if (!(await exists(dist))) {
  console.error('❌ dist/ absent. Lance npm run build.');
  process.exit(1);
}

const sourceFiles = (await walk(srcPages)).filter((f) => f.endsWith('.astro'));
const expectedRoutes = sourceFiles.map(routeFromSource).filter(Boolean).sort();
for (const route of expectedRoutes) {
  const target = outputFileForPath(route);
  if (!(await exists(target))) errors.push(`Route non générée : ${route}`);
}

const allDistFiles = await walk(dist);
const pageFiles = allDistFiles.filter((f) => {
  const rel = path.relative(dist, f).replaceAll(path.sep, '/');
  return f.endsWith('.html') && !rel.startsWith('data/');
});
const titleOwners = new Map();
const descOwners = new Map();
const indexableRoutes = new Set();
const noindexRoutes = new Set();
const inbound = new Map();

for (const file of pageFiles) {
  const rel = path.relative(dist, file).replaceAll(path.sep, '/');
  const route = routeFromOutput(file);
  const html = await fs.readFile(file, 'utf8');
  const base = new URL(route === '/404.html' ? '/' : route, siteOrigin);
  const is404 = route === '/404.html';
  const title = titleText(html);
  const description = firstMeta(html, 'name', 'description');
  const robots = (firstMeta(html, 'name', 'robots') ?? '').toLowerCase();
  const canonical = firstLink(html, 'canonical');
  const ogUrl = firstMeta(html, 'property', 'og:url');
  const ogTitle = firstMeta(html, 'property', 'og:title');
  const ogDescription = firstMeta(html, 'property', 'og:description');
  const ogImage = firstMeta(html, 'property', 'og:image');
  const ogImageAlt = firstMeta(html, 'property', 'og:image:alt');
  const twitterTitle = firstMeta(html, 'name', 'twitter:title');
  const twitterDescription = firstMeta(html, 'name', 'twitter:description');
  const twitterImage = firstMeta(html, 'name', 'twitter:image');
  const twitterImageAlt = firstMeta(html, 'name', 'twitter:image:alt');
  const nodeCount = (html.match(/<[a-z][^>]*>/gi) ?? []).length;
  const headings = headingTexts(html);
  const h1Count = headings.filter((heading) => heading.level === 1).length;
  const wordCount = stripTags(html).split(/\s+/).filter(Boolean).length;

  if (!title) errors.push(`${rel} : title absent`);
  if (!description) errors.push(`${rel} : meta description absente`);
  if (title && (title.length < 28 || title.length > 68)) warnings.push(`${rel} : longueur du title à revoir (${title.length} caractères)`);
  if (description && (description.length < 70 || description.length > 180)) warnings.push(`${rel} : longueur de description à revoir (${description.length} caractères)`);
  if (h1Count !== 1) errors.push(`${rel} : ${h1Count} H1 (attendu 1)`);
  for (const heading of headings) if (!heading.text) errors.push(`${rel} : heading H${heading.level} vide`);
  if (!robots) errors.push(`${rel} : meta robots absente`);
  if (html.includes('YOUR_UMAMI_ID')) errors.push(`${rel} : placeholder Umami présent`);
  if (countOccurrences(html, umamiId) !== 1) errors.push(`${rel} : Umami doit apparaître exactement une fois`);
  if (!is404 && !canonical) errors.push(`${rel} : canonical absente`);
  if (!is404 && canonical !== `${siteOrigin}${route}`) errors.push(`${rel} : canonical ${canonical} (attendu ${siteOrigin}${route})`);
  if (!is404 && ogUrl !== `${siteOrigin}${route}`) errors.push(`${rel} : og:url ${ogUrl} (attendu ${siteOrigin}${route})`);
  if (!ogTitle || !ogDescription || !twitterTitle || !twitterDescription) errors.push(`${rel} : titres/descriptions Open Graph ou Twitter incomplets`);
  if (!ogImage || !twitterImage) errors.push(`${rel} : image Open Graph/Twitter absente`);
  if (!ogImageAlt || !twitterImageAlt) errors.push(`${rel} : texte alternatif Open Graph/Twitter absent`);
  if (ogImage) {
    const resolvedImage = localUrl(ogImage, base);
    if (resolvedImage && resolvedImage !== 'invalid') {
      const imageFile = outputFileForPath(resolvedImage.pathname);
      if (!(await exists(imageFile))) errors.push(`${rel} : image Open Graph locale absente → ${ogImage}`);
      else {
        const dimensions = await imageDimensions(imageFile);
        if (!dimensions || dimensions.width !== 1200 || dimensions.height !== 630) {
          errors.push(`${rel} : image Open Graph attendue en 1200×630 → ${ogImage}`);
        }
      }
    }
  }
  if (nodeCount > 1400) errors.push(`${rel} : DOM excessif (${nodeCount} éléments)`);
  if ((await fs.stat(file)).size > 153600) errors.push(`${rel} : HTML trop lourd (${Math.round((await fs.stat(file)).size/1024)} Ko)`);
  if (!is404 && wordCount < 80) warnings.push(`${rel} : contenu textuel court (${wordCount} mots)`);

  if (title) {
    if (titleOwners.has(title)) errors.push(`${rel} : title dupliqué avec ${titleOwners.get(title)}`);
    else titleOwners.set(title, rel);
  }
  if (description) {
    if (descOwners.has(description)) errors.push(`${rel} : description dupliquée avec ${descOwners.get(description)}`);
    else descOwners.set(description, rel);
  }

  if (robots.includes('noindex')) noindexRoutes.add(route);
  else if (!is404) indexableRoutes.add(route);
  if (is404 && !robots.includes('noindex')) errors.push('404.html doit être noindex');
  if (is404 && robots.includes('nofollow')) errors.push('404.html ne doit pas bloquer le suivi de ses liens utiles');
  if (route === '/mentions-legales/' && !robots.includes('noindex')) errors.push('mentions-legales doit être noindex');

  const structured = parseJsonLd(html, rel);
  if (!structured.length) errors.push(`${rel} : JSON-LD absent`);
  const types = flattenTypes(structured);
  for (const type of ['Organization', 'Person', 'WebSite']) {
    if (!types.has(type)) errors.push(`${rel} : type JSON-LD ${type} absent`);
  }
  if (!is404 && route !== '/' && !types.has('BreadcrumbList')) errors.push(`${rel} : BreadcrumbList absent`);
  if (route === '/a-propos/' && (!types.has('ProfilePage') || !types.has('Person'))) errors.push('À propos : ProfilePage/Person incomplet');
  if (route === '/faq/') {
    if (!types.has('FAQPage')) errors.push('FAQ : type FAQPage absent');
    const visibleQuestions = (html.match(/<details\b[^>]*class=["'][^"']*faq-item/gi) ?? []).length;
    if (visibleQuestions < 12) errors.push(`FAQ : seulement ${visibleQuestions} questions visibles`);

    const graphNodes = structured.flatMap((item) => Array.isArray(item?.['@graph']) ? item['@graph'] : [item]);
    const faqPageNodes = graphNodes.filter((node) => node?.['@id'] === `${siteOrigin}/faq/#webpage`);
    if (faqPageNodes.length !== 1) errors.push(`FAQ : ${faqPageNodes.length} nœud(s) #webpage (attendu 1)`);
    else {
      const faqType = faqPageNodes[0]['@type'];
      if (faqType !== 'FAQPage') errors.push(`FAQ : le nœud #webpage doit être typé uniquement FAQPage, reçu ${JSON.stringify(faqType)}`);
      const entities = faqPageNodes[0].mainEntity;
      if (!Array.isArray(entities) || entities.length !== visibleQuestions) {
        errors.push(`FAQ : mainEntity ne correspond pas aux ${visibleQuestions} questions visibles`);
      } else {
        for (const [index, entity] of entities.entries()) {
          if (entity?.['@type'] !== 'Question' || entity?.acceptedAnswer?.['@type'] !== 'Answer') {
            errors.push(`FAQ : Question/Answer invalide à l’index ${index}`);
          }
        }
      }
    }
  }

  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const fullTag = `<button${match[1]}>${match[2]}</button>`;
    const visibleName = stripTags(match[2]);
    if (!visibleName && !attr(fullTag, 'aria-label') && !attr(fullTag, 'aria-labelledby') && !attr(fullTag, 'title')) {
      errors.push(`${rel} : bouton sans nom accessible`);
    }
  }
  for (const tagName of ['input', 'select', 'textarea']) {
    for (const tag of tags(html, tagName)) {
      if (tagName === 'input' && (attr(tag, 'type') ?? '').toLowerCase() === 'hidden') continue;
      if (!controlHasName(html, tag)) errors.push(`${rel} : ${tagName} sans label accessible`);
    }
  }

  for (const tagName of ['a', 'link', 'script', 'img', 'source']) {
    for (const tag of tags(html, tagName)) {
      if (tagName === 'link' && (attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/).includes('canonical')) continue;
      for (const attribute of tagName === 'a' || tagName === 'link' ? ['href'] : ['src', 'srcset']) {
        const rawValue = attr(tag, attribute);
        if (!rawValue) continue;
        for (const raw of attribute === 'srcset' ? rawValue.split(',').map((v) => v.trim().split(/\s+/)[0]) : [rawValue]) {
          const resolved = localUrl(raw, base);
          if (resolved === null) continue;
          if (resolved === 'invalid') { errors.push(`${rel} : URL invalide → ${raw}`); continue; }
          if (/\.html(?:$|[?#])/i.test(raw) && !raw.endsWith('/404.html')) errors.push(`${rel} : URL interne legacy → ${raw}`);
          const target = outputFileForPath(resolved.pathname);
          if (!(await exists(target))) errors.push(`${rel} : cible locale absente → ${raw}`);
          if (tagName === 'a') {
            const normalized = resolved.pathname === '/' ? '/' : resolved.pathname.endsWith('/') || path.extname(resolved.pathname) ? resolved.pathname : `${resolved.pathname}/`;
            if (!inbound.has(normalized)) inbound.set(normalized, new Set());
            inbound.get(normalized).add(route);
          }
        }
      }
      if (tagName === 'img' && attr(tag, 'alt') === null) errors.push(`${rel} : image sans attribut alt`);
    }
  }
}

// Sitemap : uniquement les pages indexables et toutes les pages indexables.
const sitemapPath = path.join(dist, 'sitemap.xml');
if (!(await exists(sitemapPath))) errors.push('sitemap.xml absent');
else {
  const sitemap = await fs.readFile(sitemapPath, 'utf8');
  const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
  for (const route of indexableRoutes) if (!locs.has(route)) errors.push(`sitemap : page indexable absente → ${route}`);
  for (const route of locs) {
    if (!indexableRoutes.has(route)) errors.push(`sitemap : URL non indexable ou inexistante → ${route}`);
    if (!(await exists(outputFileForPath(route)))) errors.push(`sitemap : route non générée → ${route}`);
  }
  const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (urlBlocks.length !== locs.size) errors.push('sitemap : structure <url> incohérente');
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (!loc || !lastmod) errors.push(`sitemap : loc ou lastmod absent dans un bloc URL`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) errors.push(`sitemap : lastmod invalide pour ${loc} → ${lastmod}`);
  }
}

// Maillage minimum des pages historiquement faibles.
for (const [route, minimum] of [['/lexique/', 3], ['/pratiquer/', 3], ['/a-propos/', 2], ['/boussole-scenarios/', 2], ['/faq/', 3]]) {
  const count = inbound.get(route)?.size ?? 0;
  if (count < minimum) errors.push(`Maillage insuffisant : ${route} reçoit ${count} lien(s) statique(s), minimum ${minimum}`);
}

// Redirections historiques.
const redirectsPath = path.join(dist, '_redirects');
if (!(await exists(redirectsPath))) errors.push('_redirects absent');
else {
  const redirects = parseRedirects(await fs.readFile(redirectsPath, 'utf8'));
  const legacy = [
    '/index.html','/comprendre.html','/methode.html','/pratiquer.html','/zones.html','/echelle-foebe.html',
    '/respiration.html','/boussole.html','/boussole-scenarios.html','/lexique.html','/dictionnaire.html',
    '/a-propos.html','/faq.html','/mentions-legales.html','/zone-corps.html','/zone-energie.html','/zone-emotions.html',
    '/zone-mental.html','/zone-environnement.html','/zone-relations.html','/zone-sens.html'
  ];
  for (const old of legacy) {
    const rule = redirects.get(old);
    if (!rule || rule.status !== '301') errors.push(`Redirection 301 manquante : ${old}`);
    else if (rule.to === old) errors.push(`Boucle de redirection : ${old}`);
  }
}

// Manifest et robots.
const manifestPath = path.join(dist, 'site.webmanifest');
if (!(await exists(manifestPath))) errors.push('site.webmanifest absent');
else {
  try {
    const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    for (const icon of manifest.icons ?? []) if (!(await exists(outputFileForPath(icon.src)))) errors.push(`Manifest : icône absente → ${icon.src}`);
  } catch (error) { errors.push(`Manifest invalide : ${error.message}`); }
}
const robotsPath = path.join(dist, 'robots.txt');
if (!(await exists(robotsPath))) errors.push('robots.txt absent');
else {
  const robots = await fs.readFile(robotsPath, 'utf8');
  if (!robots.includes('Sitemap: https://maisonfoebe.fr/sitemap.xml')) errors.push('robots.txt : sitemap absent');
  if (!robots.includes('Disallow: /data/')) errors.push('robots.txt : /data/ non bloqué');
}

// Déploiement Cloudflare strictement limité à dist.
const wranglerText = await fs.readFile(path.join(root, 'wrangler.jsonc'), 'utf8');
const wrangler = JSON.parse(wranglerText.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''));
if (!['./dist', './dist/'].includes(wrangler.assets?.directory)) errors.push('wrangler : assets.directory doit être ./dist/');
if (wrangler.assets?.not_found_handling !== '404-page') errors.push('wrangler : not_found_handling doit être 404-page');
if (wrangler.assets?.html_handling !== 'auto-trailing-slash') errors.push('wrangler : html_handling doit être auto-trailing-slash');

// Aucun ancien site HTML à la racine du projet.
for (const item of await fs.readdir(root, { withFileTypes: true })) {
  if (item.isFile() && item.name.endsWith('.html')) errors.push(`Fichier HTML legacy encore à la racine : ${item.name}`);
}

// Syntaxe de tous les scripts publics.
for (const file of (await walk(path.join(root, 'public'))).filter((f) => f.endsWith('.js'))) {
  try { await execFileAsync(process.execPath, ['--check', file]); }
  catch (error) { errors.push(`${path.relative(root, file)} : syntaxe JavaScript invalide`); }
}

// Garde-fous fonctionnels : la Phase B ne doit pas altérer les outils de la Phase A.
const homeHtml = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!homeHtml.includes('id="newsletterForm"') || !homeHtml.includes('https://formspree.io/f/mnnqbjrl')) {
  errors.push('Accueil : formulaire d’information absent ou action modifiée');
}
const zoneRoutes = ['zone-corps','zone-energie','zone-emotions','zone-mental','zone-environnement','zone-relations','zone-sens'];
for (const zoneRoute of zoneRoutes) {
  const zoneHtml = await fs.readFile(path.join(dist, zoneRoute, 'index.html'), 'utf8');
  for (const marker of ['data-zone-dataset', 'id="waitlistForm"', 'id="obsResultPanel"', 'data-answer="true"', 'data-answer="false"']) {
    if (!zoneHtml.includes(marker)) errors.push(`${zoneRoute} : fonction historique absente → ${marker}`);
  }
}
const criticalScriptChecks = [
  ['public/scripts/pages/echelle-foebe.js', ['function startTest()', 'function finishTest()', 'function renderResults(']],
  ['public/scripts/foebe-zone.js', ['showObsSummary()', 'data-answer']],
  ['public/scripts/pages/boussole.js', ['const stateData', 'function updateSynthesis()']],
  ['public/scripts/pages/respiration.js', ['function begin(', 'function stop(']],
  ['public/scripts/pages/lexique.js', ['var STORIES', 'function goToStory(']],
];
for (const [relative, markers] of criticalScriptChecks) {
  const content = await fs.readFile(path.join(root, relative), 'utf8');
  for (const marker of markers) if (!content.includes(marker)) errors.push(`${relative} : moteur historique incomplet → ${marker}`);
}
const shellPath = path.join(root, 'public', 'foebe-shell.js');
const shellScript = await fs.readFile(shellPath, 'utf8');
if (countOccurrences(shellScript, 'foebe-back-to-top') < 1) {
  errors.push('Shell : la flèche retour en haut est absente');
}
if (countOccurrences(shellScript, '/faq/') < 2) {
  errors.push('Shell : le lien FAQ doit être présent dans la navigation et le footer');
}
if ((await fs.stat(shellPath)).size > 51200) {
  errors.push(`Shell : JavaScript encore trop lourd (${Math.round((await fs.stat(shellPath)).size / 1024)} Ko, attendu ≤ 50 Ko minifié)`);
}
if (shellScript.includes('SHELL_CSS') || shellScript.includes('foebe-shell-css')) {
  errors.push('Shell : le CSS ne doit plus être construit et injecté par JavaScript');
}
const shellCssPath = path.join(root, 'public', 'styles', 'foebe-shell.css');
if (!(await exists(shellCssPath))) errors.push('Shell : feuille CSS externe absente');
for (const file of pageFiles) {
  const html = await fs.readFile(file, 'utf8');
  if (/class=["'][^"']*(?:back-to-top|scroll-top|top-up)[^"']*["']/i.test(html)) {
    errors.push(`${path.relative(dist, file)} : ancienne flèche locale détectée`);
  }
}

// Garde-fous spécifiques du Dictionnaire.
const dictionaryFile = path.join(dist, 'dictionnaire', 'index.html');
if (await exists(dictionaryFile)) {
  const dictionary = await fs.readFile(dictionaryFile, 'utf8');
  const nodes = (dictionary.match(/<[a-z][^>]*>/gi) ?? []).length;
  if (nodes > 1000) errors.push(`Dictionnaire principal trop lourd : ${nodes} éléments DOM`);
  if (!dictionary.includes('/data/dictionnaire-corpus.html')) errors.push('Dictionnaire : corpus différé absent');
  if (!(await exists(path.join(dist, 'data', 'dictionnaire-corpus.html')))) errors.push('Dictionnaire : corpus statique absent');
}

const notFoundHtml = await fs.readFile(path.join(dist, '404.html'), 'utf8');
for (const required404Link of ['href="/"', 'href="/comprendre/"', 'href="/faq/"', 'href="/pratiquer/"']) {
  if (!notFoundHtml.includes(required404Link)) errors.push(`404.html : lien utile absent → ${required404Link}`);
}

if (warnings.length) {
  console.log('\n⚠️  Avertissements :');
  for (const warning of warnings) console.log(`  - ${warning}`);
}
if (errors.length) {
  console.error(`\n❌ Audit échoué : ${errors.length} problème(s)`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`\n✅ Audit Phase B réussi : ${pageFiles.length} pages HTML, ${indexableRoutes.size} pages indexables, zéro incohérence bloquante.`);
