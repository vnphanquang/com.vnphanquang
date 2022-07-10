import path from 'path';

import gQueryCodegen from '@leveluptuts/g-query/codegen';
import { sveltekit } from '@sveltejs/kit/vite';
/**
 * @type {import('vite').UserConfig}
 */
const config = {
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
      out: './src/lib/servicesapi//graphql/queries',
      gPath: '$lib/services/api/graphql/g',
      // debug: false,
    }),
    sveltekit(),
  ],
};

export default config;
