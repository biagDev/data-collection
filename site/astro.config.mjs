// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project-site config.
// When a custom domain is added later:
//   - set `site` to the custom domain (e.g. 'https://stats.example.com')
//   - remove `base` (or set to '/')
//   - add site/public/CNAME containing the domain
// Everything else stays the same.
export default defineConfig({
  site: 'https://biagDev.github.io',
  base: '/data-collection',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
