module.exports = {
  ...require('@vnphanquang/eslint-plugin'),
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
};
