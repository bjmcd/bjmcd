// apps/jhu/astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// adjust this if your repo root is elsewhere:
const repoRoot = resolve(__dirname, '../../');

export default defineConfig({
  site: 'https://bjmcd.dev',
  base: '/docs/jhu',
  trailingSlash: 'always',

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { output: 'htmlAndMathml' }]],
  },

  integrations: [
    starlight({
      title: 'JHU Docs',
      customCss: [
        'katex/dist/katex.min.css',
        './src/styles/pdf.css',
      ],
      tableOfContents: true,
      components: {
        PageTitle: './src/components/overrides/PageTitle.astro',
      },
      // Tag all pages in this app as space=JHU for Pagefind filters
      head: [
        {
          tag: 'meta',
          attrs: { name: 'pagefind:filters', content: '{"space":"JHU"}' },
        },
      ],

      pagefind: {
        indexWeight: 2, // bias local results
        mergeIndex: [
          {
            bundlePath: 'https://bjmcd.dev/docs/swe/pagefind',
            baseUrl: 'https://bjmcd.dev/docs/swe/',
            indexWeight: 0.8,
            // Label merged results from the SWE space
            mergeFilter: { space: 'SWE' },
          },
        ],
      },

      sidebar: [
        {
          label: 'Differential Calculus',
          collapsed: false, // apps/jhu/src/content/docs/guides/**
          items: [
            { label: 'Precalculus',  autogenerate: { directory: 'diffcalc/precalc',   collapsed: true } },
            { label: 'Limits & Derivatives', autogenerate: { directory: 'diffcalc/limitsder', collapsed: true } },
            { label: 'Differentiation Rules', autogenerate: { directory: 'diffcalc/diffrules', collapsed: true } },
            { label: 'Applying Differentiation', autogenerate: { directory: 'diffcalc/applydiff', collapsed: true } },
          ], 
        },
        {
          label: 'Probability & Statistics',
          collapsed: true, // apps/jhu/src/content/docs/guides/**
          autogenerate: { directory: 'probstats' },
        },
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        // Let Vite serve files from the repo root (where node_modules lives)
        allow: [repoRoot],
      },
    },
  },
});
