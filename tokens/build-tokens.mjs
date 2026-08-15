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
  // capa semántica (Figma "Styles > Colores > Fondos/Textos") — mismos hex, nombrados por uso.
  // Quedan disponibles como bg-<nombre>/text-<nombre>/border-<nombre> (Tailwind genera el
  // prefijo de utilidad solo; el nombre del color no debe repetirlo). "lectura" se repite en
  // Fondos y Textos con hex distintos, por eso el de fondo lleva el sufijo "-fondo".
  "background.cuerpo": "cuerpo",
  "background.superficie": "superficie",
  "background.lectura": "lectura-fondo",
  "text.primario": "primario",
  "text.secundario": "secundario",
  "text.lectura": "lectura",
  "text.deshabilitado": "deshabilitado",
  "text.resaltado": "resaltado",
  "text.exito": "exito",
  "text.atencion": "atencion",
  "text.informacion": "informacion",
  "text.error": "error",
};

const flatColors = {};
for (const [group, entries] of Object.entries(tokens.color)) {
  for (const [name, def] of Object.entries(entries)) {
    if (name === "$comment") continue;
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

export const fontWeight = ${JSON.stringify(
  Object.fromEntries(Object.entries(tokens.font.weight).map(([k, v]) => [k, v.value])),
  null,
  2,
)} as const;

export const shadow = ${JSON.stringify(
  Object.fromEntries(Object.entries(tokens.shadow).filter(([k]) => k !== "$comment").map(([k, v]) => [k, v.value])),
  null,
  2,
)} as const;
`;
writeFileSync(join(outDir, "tokens.ts"), tsOut);

/* ----- 2. theme.dart (Flutter) ----- */
// camelCase que también soporta segmentos que empiezan con número ("texto-grande" -> "textoGrande").
const toCamel = (kebab) => kebab.replace(/-([a-zA-Z0-9])/g, (_, c) => c.toUpperCase());
const hexToDart = (hex) => `0xFF${hex.replace("#", "").toUpperCase()}`;
const dartConst = (name, hex) => `  static const Color ${name} = Color(${hexToDart(hex)});`;

const dartColorLines = [];
for (const [path, alias] of Object.entries(colorAliases)) {
  if (!flatColors[path]) continue;
  dartColorLines.push(dartConst(toCamel(alias), flatColors[path]));
}

// Pesos por tamaño de texto — decisión de la librería (no vive en tokens.json porque el
// tamaño y el peso se aplican como clases Tailwind independientes en los componentes web;
// para Flutter, en cambio, TextStyle necesita ambos juntos).
const sizeWeight = {
  h1: "semibold",
  "h2": "semibold",
  "h3": "semibold",
  "label-grande": "semibold",
  "label-medio": "semibold",
  "label-chico": "semibold",
  "label-mini": "medium",
  subtitulo: "medium",
  "texto-grande": "regular",
  "texto-medio": "regular",
  "texto-chico": "medium",
  "enlace-grande": "medium",
  "enlace-medio": "medium",
  "enlace-chico": "medium",
};
const dartWeight = (weightName) => `FontWeight.w${tokens.font.weight[weightName].value}`;

const dartTextStyleLines = Object.entries(tokens.font.size).map(([key, def]) => {
  const familyValue = tokens.font.family[def.family].value;
  const weightName = sizeWeight[key] ?? "regular";
  const letterSpacing = parseFloat(def.letterSpacing) || 0;
  return `  static const TextStyle ${toCamel(key)} = TextStyle(\n` +
    `    fontSize: ${parseFloat(def.value)},\n` +
    `    height: ${def.lineHeight},\n` +
    `    letterSpacing: ${letterSpacing},\n` +
    `    fontWeight: ${dartWeight(weightName)},\n` +
    `    fontFamily: '${familyValue}',\n` +
    `  );`;
});

// "0px 0px 40px 0px rgba(r,g,b,a)" -> { blur, spread, r, g, b, a }
const parseShadow = (css) => {
  const [, blur, spread] = css.match(/^0px 0px (\d+)px (\d+)px/);
  const [, r, g, b, a] = css.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  return { blur: Number(blur), spread: Number(spread), r: Number(r), g: Number(g), b: Number(b), a: Number(a) };
};
const rgbaToDartColor = ({ r, g, b, a }) => {
  const hex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
  const alpha = Math.round(a * 255);
  return `0x${hex(alpha)}${hex(r)}${hex(g)}${hex(b)}`;
};
const dartShadowLines = Object.entries(tokens.shadow)
  .filter(([k]) => k !== "$comment")
  .map(([key, def]) => {
    const s = parseShadow(def.value);
    return (
      `  static const List<BoxShadow> ${toCamel(key)} = [\n` +
      `    BoxShadow(color: Color(${rgbaToDartColor(s)}), blurRadius: ${s.blur}, spreadRadius: ${s.spread}),\n` +
      `  ];`
    );
  });

const dartOut = `// ${HEADER.replace(/\/\*|\*\//g, "").trim()}
import 'package:flutter/material.dart';

/// Paleta de marca de Empujón. Espejo de design-tokens/tokens.json.
class EmpujonColors {
${dartColorLines.join("\n")}
}

/// Radios de marca (px lógicos).
class EmpujonRadius {
${Object.entries(tokens.radius)
  .map(([k, v]) => `  static const double ${toCamel(k)} = ${parseFloat(v.value)};`)
  .join("\n")}
}

/// Sombras de marca. Todas drop-shadow con blur 40 — ver tokens.json > shadow.
class EmpujonShadows {
${dartShadowLines.join("\n")}
}

/// Estilos de texto de marca (tamaño + interlineado + tracking + peso + familia),
/// espejo 1:1 de tokens.json > font.size. Usar directo o vía .copyWith(color: ...).
class EmpujonTextStyles {
${dartTextStyleLines.join("\n")}
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
    textTheme: TextTheme(
      displayLarge: EmpujonTextStyles.h1,
      headlineMedium: EmpujonTextStyles.h2,
      headlineSmall: EmpujonTextStyles.h3,
      titleMedium: EmpujonTextStyles.subtitulo,
      bodyLarge: EmpujonTextStyles.textoGrande,
      bodyMedium: EmpujonTextStyles.textoMedio,
      bodySmall: EmpujonTextStyles.textoChico,
      labelLarge: EmpujonTextStyles.labelGrande,
      labelMedium: EmpujonTextStyles.labelMedio,
      labelSmall: EmpujonTextStyles.labelChico,
    ),
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
const borderRadiusObj = Object.fromEntries(
  Object.entries(tokens.radius).map(([k, v]) => [k, v.value]),
);
const boxShadowObj = Object.fromEntries(
  Object.entries(tokens.shadow)
    .filter(([k]) => k !== "$comment")
    .map(([k, v]) => [k, v.value]),
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
      borderRadius: ${JSON.stringify(borderRadiusObj, null, 6)},
      boxShadow: ${JSON.stringify(boxShadowObj, null, 6)},
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
`;
writeFileSync(join(__dirname, "..", "tailwind-preset.cjs"), presetOut);

console.log("✓ design tokens generados: tokens/generated/tokens.ts, tokens/generated/theme.dart, tailwind-preset.cjs");
