import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge configurado con la escala tipográfica custom de Empujón.
 *
 * Sin esto, twMerge agrupa `text-label-medio` (font-size custom) junto con los
 * colores `text-orange` / `text-black`, y al "resolver el conflicto" borra el
 * color — dejando el texto en el color heredado. Registramos los tamaños como
 * `font-size` para que convivan con los colores.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["label-chico", "label-medio", "label-grande", "h1"] },
      ],
    },
  },
});

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind (tailwind-merge).
 * Uso: cn("px-4", condicion && "px-6", className) → la última gana.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
