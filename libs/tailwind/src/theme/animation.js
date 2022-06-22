module.exports = {
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
        transform: 'translateY(-50px)',
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
        transform: 'translateY(50px)',
      },
    },
    'fade-in-up': {
      '0%': {
        opacity: '0',
        transform: 'translateY(50px)',
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
        transform: 'translateY(50px)',
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
};
