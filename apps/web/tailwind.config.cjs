/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        // FIXME: move font to a shared folder
        // for better reusability across clients
        // maybe vite copy plugin to copy to public asset folder?
        quang: ['PhanQuangCalligraphr', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
    },
  },

  plugins: [require('@tailwindcss/typography'), require('@vnphanquang/tailwind')],
};

module.exports = config;
