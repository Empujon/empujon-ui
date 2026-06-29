/* AUTO-GENERADO desde design-tokens/tokens.json — NO editar a mano. Correr `npm run tokens`. */
export const colors = {
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
} as const;

export const palette = {
  "brand-naranja": "#F79045",
  "brand-naranja-500": "#F46E1B",
  "brand-celeste": "#45ACF7",
  "brand-magenta": "#EA45F7",
  "brand-verde": "#53F745",
  "brand-amarillo": "#FDF52A",
  "semantic-error": "#F74553",
  "grayscale-negro": "#171D17",
  "grayscale-gris-oscuro-800": "#252924",
  "grayscale-gris-oscuro-700": "#3B453C",
  "grayscale-gris-oscuro-600": "#4D584F",
  "grayscale-gris-500": "#6B796B",
  "grayscale-gris-300": "#D1D6D1",
  "grayscale-gris-claro-200": "#E4E7E4",
  "grayscale-blanco-200": "#E3F2E3",
  "grayscale-blanco-100": "#F4F5F5"
} as const;

export const radius = {
  "pill": "100px",
  "card": "24px",
  "card-sm": "16px"
} as const;

export const gradient = {
  empujon: "linear-gradient(90deg, #E3F2E3 0%, #F79045 17%, #E3F2E3 31%, #45ACF7 46%, #E3F2E3 60%, #EA45F7 73%, #E3F2E3 86%, #FDF52A 98%)",
} as const;

type FontSizeToken = [string, { lineHeight: string; letterSpacing: string }];
export const fontSize: Record<string, FontSizeToken> = {
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
};
