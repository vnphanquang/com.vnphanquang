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
});
