module.exports = (theme) => ({
  '.c-link': {
    '@apply hover:text-primary underline': {},
  },
  '.c-btn': {
    '@apply cursor-pointer text-bg bg-primary py-2 px-4 rounded-xl hover:bg-primary-hover active:bg-primary-active':
      {},
  },
  '.c-btn-outline': {
    '@apply cursor-pointer border bg-bg border-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-bg active:text-bg active:bg-primary-active':
      {},
  },
  '.c-btn-icon': {
    '@apply cursor-pointer transition-transform hover:text-primary active:scale-95': {},
  },
  '.c-btn-link': {
    '@apply cursor-pointer hover:bg-primary p-2 rounded hover:text-bg grid place-items-center': {},
  },
  '.c-tag': {
    '@apply rounded-xl bg-secondary px-2 text-sm text-bg': {},
  },
  '.c-toggle': {
    '--toggle-offset': '1.5rem',
    '@apply h-6 w-12 cursor-pointer appearance-none bg-toggle-fg bg-opacity-20 rounded-3xl border border-toggle-fg border-opacity-20':
      {},
    'box-shadow':
      'var(--color-toggle-bg) calc(-1 * var(--toggle-offset)) 0px 0px 2px inset, var(--color-toggle-bg) 0px 0px 0px 2px inset',
    transition: 'background, box-shadow 200ms ease-in-out',
    '&:focus-visible': {
      outline: '2px solid var(--color-toggle-bg)',
      'outline-offset': '2px',
    },

    '&:checked,&[checked="true"]': {
      '@apply border-opacity-100 bg-opacity-100': {},
      'box-shadow':
        'var(--color-toggle-bg) var(--toggle-offset) 0px 0px 2px inset, var(--color-toggle-bg) 0px 0px 0px 2px inset',
    },

    '&.c-toggle-xs': {
      '--toggle-offset': '0.5rem',
      '@apply h-4 w-6': {},
    },
    '&.c-toggle-sm': {
      '--toggle-offset': '0.75rem',
      '@apply h-5 w-8': {},
    },
    '&.c-toggle-md': {
      '--toggle-offset': '1.5rem',
      '@apply h-6 w-12': {},
    },
    '&.c-toggle-lg': {
      '--toggle-offset': '2rem',
      '@apply h-8 w-16': {},
    },
  },
  '.c-toggle-primary': {
    '--color-toggle-bg': theme('colors.toggle.bg.primary'),
    '@apply c-toggle border-toggle-fg-primary border-opacity-20 bg-toggle-fg-primary bg-opacity-20':
      {},
  },
  // stats
  '.c-stats': {
    '@apply inline-grid': {},
    '@apply grid-flow-col': {},
    '@apply divide-x divide-y-0': {},
    '@apply bg-bg-accent rounded-lg': {},
  },
  '.c-stat': {
    '@apply inline-grid w-full': {},
    '@apply gap-x-4 border-border px-6 py-4': {},
    'grid-template-columns': 'repeat(1, 1fr)',
  },
  '.c-stat-figure': {
    '@apply col-start-2 row-span-3 row-start-1 place-self-center justify-self-end': {},
  },
  '.c-stat-title': {
    '@apply col-start-1 whitespace-nowrap': {},
    '@apply opacity-60': {},
  },
  '.c-stat-value': {
    '@apply col-start-1 whitespace-nowrap': {},
    '@apply text-4xl font-extrabold': {},
  },
  '.c-stat-desc': {
    '@apply col-start-1 whitespace-nowrap': {},
    '@apply text-xs opacity-60': {},
  },
  '.c-stat-actions': {
    '@apply col-start-1 whitespace-nowrap': {},
    '@apply mt-4': {},
  },
  '.c-stats-horizontal': {
    '@apply grid-flow-col divide-x divide-y-0 overflow-x-auto': {},
  },
  '.c-stats-vertical': {
    '@apply grid-flow-row divide-y divide-x-0 overflow-y-auto': {},
  },

  // progress
  '.c-progress': {
    '@apply relative w-full appearance-none overflow-hidden rounded-lg h-2': {},
    '@apply h-2 rounded-lg': {},
  },
  '.c-progress:indeterminate::after': {
    '@apply bg-fg animate-progress-loading': {},
    '@apply inset-y-0 -left-[40%] w-1/3 absolute rounded-lg': {},
    content: '""',
  },
  // moz
  '.c-progress::-moz-progress-bar': {
    '@apply bg-bg-accent': {},
  },
  '.c-progress:indeterminate::-moz-progress-bar': {
    '@apply bg-bg-accent': {},
  },
  // webkit
  '.c-progress::-webkit-progress-bar': {
    '@apply bg-bg-accent rounded-lg': {},
  },
  '.c-progress::-webkit-progress-value': {
    '@apply bg-fg rounded-lg': {},
  },
});
