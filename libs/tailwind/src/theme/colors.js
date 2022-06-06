const colorPallet = {
  fg: '#3c3836',
  bg: {
    DEFAULT: '#fbf1c7',
    accent: '#ebdbb2',
    highlight: '#f9f5d7',
  },
  border: '#d5c4a1',
  primary: {
    DEFAULT: '#d65d03',
    hover: '#c05302',
    active: '#af3a03',
  },
  secondary: '#98971a',
  // FIXME: give this a sensible token name
  yellow2: '#fabd2f',
};

module.exports = {
  colors: {
    ...colorPallet,
    toggle: {
      fg: {
        DEFAULT: colorPallet.fg,
        primary: colorPallet.primary,
      },
      bg: {
        DEFAULT: colorPallet.bg.DEFAULT,
        primary: colorPallet.bg.DEFAULT,
      },
    },
  },
};
