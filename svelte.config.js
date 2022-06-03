import path from 'path';

import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({ postcss: true })],

  kit: {
    adapter: adapter(),
    prerender: {
      enabled: true,
      default: true,
    },
    vite: {
      resolve: {
        alias: {
          $generated: path.resolve('./src/generated'),
          $config: path.resolve(`./src/config/config.${process.env.NODE_ENV}.ts`),
        },
      },
      optimizeDeps: {
        include: ['highlight.js', 'highlight.js/lib/core'],
      },
    },
  },
};

export default config;
