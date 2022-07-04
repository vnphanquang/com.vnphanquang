import path from 'path';

import gQueryCodegen from '@leveluptuts/g-query/codegen';
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
    csp: {
      directives: {
        'script-src': ['self']
      },
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
      plugins: [
        gQueryCodegen({
          schema: '../api/src/services/graphql/schema.generated.graphql',
          out: './src/lib/services/graphql/queries',
          gPath: '$lib/services/graphql/g',
          // debug: false,
        }),
      ],
    },
  },
};

export default config;
