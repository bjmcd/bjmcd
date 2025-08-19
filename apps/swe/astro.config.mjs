// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// Keep math plugins if you want LaTeX here too
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://bjmcd.dev',
  base: '/docs/swe',

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
  },

  integrations: [
    starlight({
      title: 'SWE Docs',
      customCss: ['katex/dist/katex.min.css'],
      head: [
        {
          tag: 'meta',
          attrs: { 'data-pagefind-filter': 'space[content]', content: 'JHU' },
        },
      ],
      pagefind: {
        indexWeight: 2, // bias local results higher
        mergeIndex: [
          {
            bundlePath: 'https://bjmcd.dev/docs/jhu/pagefind',
            baseUrl: 'https://bjmcd.dev/docs/jhu/',
            indexWeight: 0.8,
            // Tag the merged index so users can filter by Space
            mergeFilter: { space: 'JHU' },
          },
        ],
      },
      // sidebar: [...]
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
