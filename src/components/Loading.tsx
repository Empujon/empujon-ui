'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Loaders del sistema de diseño basados en el Figma › Loading.
 *
 * - DotsLoader: fila de puntos verdes que pulsan (sección "cargando").
 *   Equivale al patrón de TypingDots existente, generalizado para uso de carga.
 * - ProgressDots: barra de progreso hecha de puntos que se llenan (sección "loading", 0–100%).
 */

const dotColor = {
  green: 'bg-green',
  orange: 'bg-orange',
  blue: 'bg-blue',
  white: 'bg-white',
} as const;

const dotTextColor = {
  green: 'text-green',
  orange: 'text-orange',
  blue: 'text-blue',
  white: 'text-white',
} as const;

const dotSizeMap = {
  sm: 'size-1.5',
  md: 'size-2.5',
  lg: 'size-3.5',
} as const;

const dotsVariants = cva('inline-flex items-center', {
  variants: {
    gap: { sm: 'gap-1', md: 'gap-1.5', lg: 'gap-2' },
  },
  defaultVariants: { gap: 'md' },
});

export interface DotsLoaderProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof dotsVariants> {
  color?: keyof typeof dotColor;
  size?: keyof typeof dotSizeMap;
  /** Cantidad de puntos. Default 3. */
  count?: number;
  label?: string;
}

export function DotsLoader({
  color = 'green',
  size = 'md',
  count = 3,
  gap,
  label = 'Cargando',
  className,
  ...props
}: DotsLoaderProps) {
  return (
    <span role="status" aria-live="polite" className={cn(dotsVariants({ gap }), className)} {...props}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn('rounded-full animate-pulse-fast', dotColor[color], dotSizeMap[size])}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export interface ProgressDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progreso 0–100. */
  value: number;
  /** Cantidad de puntos en la barra. Default 10 (Figma solo define 10, en pasos de 20%). */
  total?: number;
  color?: keyof typeof dotColor;
  /** Muestra el porcentaje (Figma › Loading Progress lo muestra siempre). Default true. */
  showLabel?: boolean;
}

// Puntos de 16px, sin gap (tocándose borde a borde) y con anillo blanco-100 de 3px SIEMPRE
// visible (el relleno pasa de negro-900 a `color`; el anillo nunca cambia) — confirmado 1:1
// contra el SVG real de Figma (node 7414:7574, "Progress=0%"..."Progress=100%"): cada punto
// es `fill: #171D17|color, stroke: #F4F5F5, stroke-width: 3`. La versión anterior usaba
// puntos chicos con gap y un borde "divider" en vez del anillo blanco — no correspondía.
export function ProgressDots({ value, total = 10, color = 'green', showLabel = true, className, ...props }: ProgressDotsProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * total);
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('inline-flex items-center gap-6', className)}
      {...props}
    >
      <div className="inline-flex items-center">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'size-4 rounded-full border-[3px] border-whitesmoke transition-colors',
              i < filled ? dotColor[color] : 'bg-black',
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn('font-shantell font-semibold text-[24px] tracking-[0.24px]', dotTextColor[color])}>
          {clamped}%
        </span>
      )}
    </div>
  );
}

export default DotsLoader;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const dotsBlockMeta: UiBlockMeta = {
  type: 'ui:dots',
  label: 'Puntos (carga)',
  icon: 'MoreHorizontal',
  exportName: 'DotsLoader',
  props: {
    color: { control: 'enum', label: 'Color', default: 'green', options: ['green', 'orange', 'blue', 'white'] },
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['sm', 'md', 'lg'] },
    count: { control: 'number', label: 'Cantidad', default: 3, min: 2, max: 6 },
  },
};

export const progressBlockMeta: UiBlockMeta = {
  type: 'ui:progress',
  label: 'Barra de progreso',
  icon: 'BarChart3',
  exportName: 'ProgressDots',
  props: {
    value: { control: 'number', label: 'Progreso (%)', default: 60, min: 0, max: 100 },
    total: { control: 'number', label: 'Cantidad de puntos', default: 10, min: 4, max: 20 },
    color: { control: 'enum', label: 'Color', default: 'green', options: ['green', 'orange', 'blue', 'white'] },
    showLabel: { control: 'boolean', label: 'Mostrar porcentaje', default: true },
  },
};
