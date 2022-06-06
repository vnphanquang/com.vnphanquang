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

/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      boxShadow: {
        'center-sm': '0 0 2px 0 rgb(0 0 0 / 0.05)',
        center: '0 0 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'center-md': '0 0 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'center-lg': '0 0 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'center-xl': '0 0 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'center-2xl': '0 0 50px -12px rgb(0 0 0 / 0.25)',
        'center-inner': 'inset 0 0 4px 0 rgb(0 0 0 / 0.05)',
      },
      fontFamily: {
        quang: ['PhanQuangCalligraphr', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
      zIndex: {
        modal: '80', // a modal/dialog
        navbar: '90', // top-fixed navbar
        float: '100', // floating buttons and such
        overlay: '150', // a full screen overlay
        command: '200', // command palette
        notification: '300', // notification
      },
      backgroundImage: {
        paper: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
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
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-80px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(80px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(80px)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        dance: {
          '0%, 100%': { transform: 'translate3d(0, -10px, 0)' },
          '50%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 500ms ease-out',
        'fade-out': 'fade-out 500ms ease-out',
        'fade-in-down': 'fade-in-down 500ms ease-out',
        'fade-out-down': 'fade-out-down 500ms ease-out',
        'fade-in-up': 'fade-in-up 500ms ease-out',
        'fade-out-up': 'fade-out-up 500ms ease-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        dance: 'dance 1s ease-in-out both infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            'h2,h3,h4,h5,h6': {
              position: 'relative',
              '&:hover::before': {
                content: '"#"',
                position: 'absolute',
                right: '101%',
              },
            },
            pre: {
              padding: '0',
            },
            code: {
              'background-color': 'rgba(110,118,129,0.4)',
              'border-radius': '6px',
              'font-size': '85%',
              'font-weight': 'normal',
              padding: '0.2em 0.4em',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {
      outline: ['hover', 'active'],
      backgroundColor: ['disabled'],
    },
    animation: ['motion-safe'],
  },

  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;