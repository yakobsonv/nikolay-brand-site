import { defineConfig } from 'astro/config';

// Сайт-визитка компании Николая (ООО «Кирпичный трест»): статическая сборка.
// Пока нет домена — превью на Vercel закрыто от поиска (noindex в трёх местах:
// метатег в Base.astro, X-Robots-Tag в vercel.json, robots.txt).
export default defineConfig({
  output: 'static',
  build: { format: 'directory' },
  compressHTML: true,
});
