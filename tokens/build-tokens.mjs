/**
 * Generador de design tokens de Empujón.
 *
 * Lee la fuente neutra `tokens.json` y emite:
 *   1. `generated/tokens.ts`   — consumido por tailwind.config.ts (web)
 *   2. `generated/theme.dart`  — consumido por la app Flutter (empujon_mobile) cuando
 *                                empiece a tener UI nativa. Hoy la app es un WebView shell,
 *                                pero el archivo se mantiene sincronizado para no retrabajar.
 *
 * Correr con: `npm run tokens`
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(__dirname, "tokens.json"), "utf8"));
const outDir = join(__dirname, "generated");
mkdirSync(outDir, { recursive: true });

const HEADER = "/* AUTO-GENERADO desde design-tokens/tokens.json — NO editar a mano. Correr `npm run tokens`. */";

/* ----- aplanar colores a { nombreKebab: hex } usado por Tailwind ----- */
const colorAliases = {
  "brand.naranja": "orange",
  "brand.celeste": "blue",
  "brand.magenta": "magenta",
  "brand.verde": "green",
  "brand.amarillo": "yellow",
  "semantic.error": "red",
  "grayscale.negro": "black",
  "grayscale.blanco-200": "white",
  "grayscale.blanco-100": "whitesmoke",
  "grayscale.gris-oscuro-800": "darker-gray",
  "grayscale.gris-oscuro-700": "gray-700",
  "grayscale.gris-oscuro-600": "gray-600",
  "grayscale.gris-500": "divider",
  "grayscale.gris-300": "lgray",
  "grayscale.gris-claro-200": "lightgray",
};

const flatColors = {};
for (const [group, entries] of Object.entries(tokens.color)) {
  for (const [name, def] of Object.entries(entries)) {
    flatColors[`${group}.${name}`] = def.value;
  }
}

/* ----- 1. tokens.ts (web) ----- */
const twColors = {};
for (const [path, alias] of Object.entries(colorAliases)) {
  if (flatColors[path]) twColors[alias] = flatColors[path];
}
// además exponer la paleta completa por nombre semántico
const palette = {};
for (const [path, value] of Object.entries(flatColors)) {
  palette[path.replace(/\./g, "-")] = value;
}

const tsOut = `${HEADER}
export const colors = ${JSON.stringify(twColors, null, 2)} as const;

export const palette = ${JSON.stringify(palette, null, 2)} as const;

export const radius = ${JSON.stringify(
  Object.fromEntries(Object.entries(tokens.radius).map(([k, v]) => [k, v.value])),
  null,
  2,
)} as const;

export const gradient = {
  empujon: ${JSON.stringify(tokens.gradient.empujon.value)},
} as const;

type FontSizeToken = [string, { lineHeight: string; letterSpacing: string }];
export const fontSize: Record<string, FontSizeToken> = ${JSON.stringify(
  Object.fromEntries(
    Object.entries(tokens.font.size).map(([k, v]) => [
      k,
      [v.value, { lineHeight: String(v.lineHeight), letterSpacing: v.letterSpacing }],
    ]),
  ),
  null,
  2,
)};
`;
writeFileSync(join(outDir, "tokens.ts"), tsOut);

/* ----- 2. theme.dart (Flutter) ----- */
const hexToDart = (hex) => `0xFF${hex.replace("#", "").toUpperCase()}`;
const dartConst = (name, hex) => `  static const Color ${name} = Color(${hexToDart(hex)});`;

const dartColorLines = [];
for (const [path, alias] of Object.entries(colorAliases)) {
  if (!flatColors[path]) continue;
  const camel = alias.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  dartColorLines.push(dartConst(camel, flatColors[path]));
}

const dartOut = `// ${HEADER.replace(/\/\*|\*\//g, "").trim()}
import 'package:flutter/material.dart';

/// Paleta de marca de Empujón. Espejo de design-tokens/tokens.json.
class EmpujonColors {
${dartColorLines.join("\n")}
}

/// Radios de marca (px lógicos).
class EmpujonRadius {
${Object.entries(tokens.radius)
  .map(([k, v]) => `  static const double ${k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())} = ${parseFloat(v.value)};`)
  .join("\n")}
}

/// ThemeData base. Dark por default (fondo negro de marca).
ThemeData empujonTheme() {
  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: EmpujonColors.black,
    colorScheme: const ColorScheme.dark(
      primary: EmpujonColors.orange,
      secondary: EmpujonColors.blue,
      error: EmpujonColors.red,
      surface: EmpujonColors.darkerGray,
    ),
    fontFamily: '${tokens.font.family.ui.value}',
  );
}
`;
writeFileSync(join(outDir, "theme.dart"), dartOut);

/* ----- 3. tailwind-preset.cjs (preset compartido para apps) ----- */
const fontSizeObj = Object.fromEntries(
  Object.entries(tokens.font.size).map(([k, v]) => [
    k,
    [v.value, { lineHeight: String(v.lineHeight), letterSpacing: v.letterSpacing }],
  ]),
);
const presetOut = `/* ${HEADER.replace(/\/\*|\*\//g, "").trim()} */
/**
 * Preset de Tailwind de Empujón. Las apps lo extienden:
 *   // tailwind.config.ts
 *   import preset from '@empujon/ui/tailwind-preset';
 *   export default { presets: [preset], content: [..., './node_modules/@empujon/ui/dist/**'] };
 */
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(twColors, null, 6)},
      backgroundImage: {
        'gradient-empujon': ${JSON.stringify(tokens.gradient.empujon.value)},
      },
      fontSize: ${JSON.stringify(fontSizeObj, null, 6)},
      borderRadius: {
        pill: ${JSON.stringify(tokens.radius.pill.value)},
        card: ${JSON.stringify(tokens.radius.card.value)},
        'card-sm': ${JSON.stringify(tokens.radius["card-sm"].value)},
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
`;
writeFileSync(join(__dirname, "..", "tailwind-preset.cjs"), presetOut);

console.log("✓ design tokens generados: tokens/generated/tokens.ts, tokens/generated/theme.dart, tailwind-preset.cjs");
