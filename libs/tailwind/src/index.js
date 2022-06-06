const plugin = require('tailwindcss/plugin');

const components = require('./components');
const themeExtensions = require('./theme');
const utilities = require('./utilities');

module.exports = plugin(
  function ({ addBase, addUtilities, addComponents, theme }) {
    addBase({
      ':root': {
        '--color-toggle-bg': theme('colors.toggle.bg.DEFAULT'),
      },
      svg: {
        fill: 'currentColor',
      },
      '*:disabled': {
        cursor: 'not-allowed',
      },
      'input:-webkit-autofill,\
        input:-webkit-autofill:hover,\
        input:-webkit-autofill:focus,\
        input:-webkit-autofill:active':
        {
          '-webkit-box-shadow': `0 0 0 30px ${theme('colors.bg.DEFAULT')} inset !important`,
          '-webkit-text-fill-color': `${theme('colors.fg')} !important`,
        },
    });
    addUtilities(utilities(theme));
    addComponents(components(theme));
  },
  {
    variants: {
      extend: {
        outline: ['hover', 'active'],
        backgroundColor: ['disabled'],
      },
      animation: ['motion-safe'],
    },
    theme: themeExtensions,
  },
);
