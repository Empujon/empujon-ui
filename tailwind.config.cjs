// Config de Tailwind SOLO para Storybook (la lib en sí no compila CSS;
// expone el preset para que las apps lo extiendan).
const preset = require('./tailwind-preset.cjs');

module.exports = {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
};
