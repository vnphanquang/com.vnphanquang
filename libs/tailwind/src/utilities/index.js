module.exports = (theme) => ({
  '.text-ellipsis': {
    '@apply overflow-hidden overflow-ellipsis whitespace-nowrap': {},
  },
  '.inset-center': {
    '@apply top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2': {},
  },
  '.border-letter': {
    border: '10px solid transparent',
    'border-image':
      '10 repeating-linear-gradient(-45deg, red 0, red 1em, transparent 0, transparent 2em, #58a 0, #58a 3em, transparent 0, transparent 4em)',
  },
});
