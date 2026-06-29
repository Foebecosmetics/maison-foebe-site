import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesRoot = path.join(root, 'src', 'pages');
const output = path.join(root, 'public', 'sitemap.xml');
const datesFile = path.join(root, 'src', 'data', 'page-lastmod.json');
const origin = 'https://maisonfoebe.fr';

async function walk(dir) {
  const items = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) items.push(...await walk(full));
    else items.push(full);
  }
  return items;
}

function routeFromFile(file) {
  const rel = path.relative(pagesRoot, file).replaceAll(path.sep, '/');
  if (rel === 'index.astro') return '/';
  if (rel === '404.astro') return null;
  if (rel.endsWith('/index.astro')) return `/${rel.slice(0, -'/index.astro'.length)}/`;
  return null;
}

const excluded = new Set(['/mentions-legales/']);
const routes = (await walk(pagesRoot))
  .filter((file) => file.endsWith('.astro'))
  .map(routeFromFile)
  .filter((route) => route && !excluded.has(route))
  .sort((a, b) => a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b, 'fr'));

const lastmod = JSON.parse(await fs.readFile(datesFile, 'utf8'));
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
for (const route of routes) {
  if (!lastmod[route]) throw new Error(`Date lastmod manquante pour ${route} dans src/data/page-lastmod.json`);
  if (!datePattern.test(lastmod[route])) throw new Error(`Date lastmod invalide pour ${route}: ${lastmod[route]}`);
}
for (const route of Object.keys(lastmod)) {
  if (!routes.includes(route)) throw new Error(`Date lastmod orpheline pour une route absente ou non indexable : ${route}`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((route) => [
    '  <url>',
    `    <loc>${origin}${route}</loc>`,
    `    <lastmod>${lastmod[route]}</lastmod>`,
    '  </url>',
  ].join('\n')).join('\n') +
  `\n</urlset>\n`;

await fs.writeFile(output, xml, 'utf8');
console.log(`Sitemap généré : ${routes.length} URL indexables avec lastmod explicite.`);
