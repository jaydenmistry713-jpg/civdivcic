import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://civdivcic.org.uk',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    // sitemap() — re-enable before production deploy
  ],
  output: 'static',
});
