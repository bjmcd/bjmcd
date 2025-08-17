// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

//math plugins
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://bjmcd.dev',
  //Markdown and MDX content
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
  }, // Astro supports this directly. :contentReference[oaicite:0]{index=0}

  integrations: [
      starlight({
          title: 'My Docs',
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
          sidebar: [
              {
                  label: 'Guides', 
                  items: [
                      // Each item here is one entry in the navigation menu.
                      { label: 'Example Guide', slug: 'guides/example' },
                  ],
              },
              {
                  label: 'Reference',
                  autogenerate: { directory: 'reference' },
              },
          ],
          // NEW: load KaTeX CSS (can point to a local file or an npm module path)
          customCss: ['katex/dist/katex.min.css'], // Starlight supports this. :contentReference[oaicite:1]{index=1}
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});