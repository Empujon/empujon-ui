# @empujon/ui

Sistema de diseño de Empujón. Componentes React + design tokens compartidos, fieles al
Figma "Empujón — SISTEMA DE DISEÑO". Pensado para que **cualquier** frontend de la
organización (empujón, fluidez_lectora, agudeza-visual, turbo, granpaneo, lecturapredic…)
consuma los mismos componentes en vez de reimplementarlos inline.

## Componentes

- `Button` — 8 variantes × 3 tamaños × estados, ícono opcional, loading.
- `Spinner` — loader circular (unifica el patrón `border-t-transparent animate-spin`).
- `DotsLoader` / `ProgressDots` — loaders de puntos (Figma › Loading).
- `Card` (+ `CardHeader`/`CardTitle`/`CardBody`/`CardFooter`) — contenedor base.
- `Badge` — pill/etiqueta con punto de estado opcional.
- `Notification` — aviso éxito/advertencia con acción.

## Tokens

La fuente única es [`tokens/tokens.json`](tokens/tokens.json). `npm run tokens` genera:

- `tokens/generated/tokens.ts` — objeto de tokens para JS/TS.
- `tokens/generated/theme.dart` — `ThemeData` para la app Flutter (`empujon_mobile`).
- `tailwind-preset.cjs` — preset de Tailwind para las apps.

Editá el JSON y regenerá; no edites los archivos generados.

## Uso en una app (Next.js / React + Tailwind)

```bash
# requiere ~/.npmrc con auth a GitHub Packages (ver .npmrc)
npm install @empujon/ui
```

```ts
// tailwind.config.ts
import preset from '@empujon/ui/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@empujon/ui/dist/**/*.{js,cjs}', // para que Tailwind vea las clases de la lib
  ],
};
```

```tsx
import { Button, Card, Badge } from '@empujon/ui';

<Button variant="primary-dark" size="md">Empezar</Button>
```

> Las fuentes (Inter, Shantell Sans) las provee la app vía las CSS vars
> `--font-inter` y `--font-shantell` (como ya hace empujón en su `layout.tsx`).

## Desarrollo

```bash
npm install
npm run build       # genera tokens + bundle (ESM/CJS/d.ts)
npm run storybook   # vitrina de componentes en :6007
npm run typecheck
```

## Publicar

```bash
npm version patch          # o minor/major
npm publish                # usa publishConfig → GitHub Packages
```
