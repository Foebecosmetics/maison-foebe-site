import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src', 'shell');
const publicRoot = path.join(root, 'public');

const jsSource = await fs.readFile(path.join(sourceRoot, 'foebe-shell.js'), 'utf8');
const cssSource = await fs.readFile(path.join(sourceRoot, 'foebe-shell.css'), 'utf8');

const [js, css] = await Promise.all([
  transform(jsSource, {
    loader: 'js',
    target: 'es2018',
    minify: true,
    legalComments: 'none',
  }),
  transform(cssSource, {
    loader: 'css',
    target: 'es2018',
    minify: true,
    legalComments: 'none',
  }),
]);

await fs.mkdir(path.join(publicRoot, 'styles'), { recursive: true });
await fs.writeFile(path.join(publicRoot, 'foebe-shell.js'), js.code, 'utf8');
await fs.writeFile(path.join(publicRoot, 'styles', 'foebe-shell.css'), css.code, 'utf8');

console.log(`Shell optimisé : JS ${Buffer.byteLength(js.code)} octets, CSS ${Buffer.byteLength(css.code)} octets.`);
