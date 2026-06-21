import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://maisonfoebe.fr',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
