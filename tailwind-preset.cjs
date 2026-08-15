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
      "lightgray": "#E4E7E4",
      "cuerpo": "#171D17",
      "superficie": "#252924",
      "lectura-fondo": "#F4F5F5",
      "primario": "#F4F5F5",
      "secundario": "#E4E7E4",
      "lectura": "#171D17",
      "deshabilitado": "#6B796B",
      "resaltado": "#F79045",
      "exito": "#53F745",
      "atencion": "#FDF52A",
      "informacion": "#45ACF7",
      "error": "#F74553"
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
      "h2": [
            "24px",
            {
                  "lineHeight": "1.3",
                  "letterSpacing": "1px"
            }
      ],
      "h3": [
            "20px",
            {
                  "lineHeight": "1.4",
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
      ],
      "label-mini": [
            "14px",
            {
                  "lineHeight": "1.5",
                  "letterSpacing": "0"
            }
      ],
      "subtitulo": [
            "20px",
            {
                  "lineHeight": "1.4",
                  "letterSpacing": "0"
            }
      ],
      "texto-grande": [
            "20px",
            {
                  "lineHeight": "1.5",
                  "letterSpacing": "0"
            }
      ],
      "texto-medio": [
            "18px",
            {
                  "lineHeight": "1.5",
                  "letterSpacing": "0"
            }
      ],
      "texto-chico": [
            "14px",
            {
                  "lineHeight": "1.4",
                  "letterSpacing": "0"
            }
      ],
      "enlace-grande": [
            "20px",
            {
                  "lineHeight": "1.4",
                  "letterSpacing": "0"
            }
      ],
      "enlace-medio": [
            "18px",
            {
                  "lineHeight": "1.4",
                  "letterSpacing": "0"
            }
      ],
      "enlace-chico": [
            "14px",
            {
                  "lineHeight": "1.3",
                  "letterSpacing": "0"
            }
      ]
},
      borderRadius: {
      "pill": "100px",
      "card": "24px",
      "card-sm": "16px",
      "chico": "8px"
},
      boxShadow: {
      "primaria": "0px 0px 40px 0px rgba(0,0,0,0.5)",
      "naranja": "0px 0px 40px 0px rgba(247,144,69,0.2)",
      "verde": "0px 0px 40px 0px rgba(83,247,69,0.2)",
      "amarillo": "0px 0px 40px 0px rgba(253,245,42,0.2)",
      "celeste": "0px 0px 40px 0px rgba(69,172,247,0.2)",
      "magenta": "0px 0px 40px 0px rgba(234,69,247,0.2)"
},
      fontFamily: {
        inter: ['var(--font-inter)'],
        shantell: ['var(--font-shantell)'],
      },
      animation: {
        'pulse-fast': 'pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // LoadingSpinner (Figma › Spinner, Frame=1/2/3): recorre 3 grupos de puntos en
        // orden, cada uno visible 1/3 del ciclo, sin interpolar entre pasos (steps(1)) —
        // replica el flipbook de 3 frames real en vez de un fade continuo.
        'flip3': 'flip3 1.5s steps(1) infinite',
      },
      keyframes: {
        flip3: {
          '0%, 33.32%': { opacity: '1' },
          '33.33%, 100%': { opacity: '0' },
        },
      },
    },
  },
};
