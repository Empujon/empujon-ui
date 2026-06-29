/* AUTO-GENERADO desde design-tokens/tokens.json — NO editar a mano. Correr `npm run tokens`. */
/**
 * Preset de Tailwind de Empujón. Las apps lo extienden:
 *   // tailwind.config.ts
 *   import preset from '@empujon/ui/tailwind-preset';
 *   export default { presets: [preset], content: [..., './node_modules/@empujon/ui/dist/**'] };
 */
module.exports = {
  theme: {
    extend: {
      colors: {
      "orange": "#F79045",
      "blue": "#45ACF7",
      "magenta": "#EA45F7",
      "green": "#53F745",
      "yellow": "#FDF52A",
      "red": "#F74553",
      "black": "#171D17",
      "white": "#E3F2E3",
      "whitesmoke": "#F4F5F5",
      "darker-gray": "#252924",
      "gray-700": "#3B453C",
      "gray-600": "#4D584F",
      "divider": "#6B796B",
      "lgray": "#D1D6D1",
      "lightgray": "#E4E7E4"
},
      backgroundImage: {
        'gradient-empujon': "linear-gradient(90deg, #E3F2E3 0%, #F79045 17%, #E3F2E3 31%, #45ACF7 46%, #E3F2E3 60%, #EA45F7 73%, #E3F2E3 86%, #FDF52A 98%)",
      },
      fontSize: {
      "h1": [
            "40px",
            {
                  "lineHeight": "1.2",
                  "letterSpacing": "1px"
            }
      ],
      "label-grande": [
            "24px",
            {
                  "lineHeight": "1.3",
                  "letterSpacing": "1px"
            }
      ],
      "label-medio": [
            "20px",
            {
                  "lineHeight": "1.3",
                  "letterSpacing": "0"
            }
      ],
      "label-chico": [
            "16px",
            {
                  "lineHeight": "1.5",
                  "letterSpacing": "1px"
            }
      ]
},
      borderRadius: {
        pill: "100px",
        card: "24px",
        'card-sm': "16px",
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        shantell: ['var(--font-shantell)'],
      },
      animation: {
        'pulse-fast': 'pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
};
