import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind (tailwind-merge).
 * Uso: cn("px-4", condicion && "px-6", className) → la última gana.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
