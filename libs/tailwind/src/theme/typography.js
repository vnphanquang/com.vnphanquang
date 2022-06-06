module.exports = {
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
};
