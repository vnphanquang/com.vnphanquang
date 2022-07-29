import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [preprocess({ postcss: true })],

  kit: {
    adapter: adapter({
      edge: true,
    }),
    prerender: {
      enabled: true,
      default: true,
    },
    csp: {
      directives: {
        'script-src': [
          'self',
          'https://*.googletagmanager.com',
          'sha256-1Ray/GuHtDhQt/fRxvE5QMSw6lDtuQboAn1Ti5HfNPI=',
        ],
      },
    },
  },
};

export default config;
