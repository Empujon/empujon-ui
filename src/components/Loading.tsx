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
  /** Cantidad de puntos en la barra. Default 10. */
  total?: number;
  color?: keyof typeof dotColor;
  size?: keyof typeof dotSizeMap;
}

export function ProgressDots({
  value,
  total = 10,
  color = 'green',
  size = 'md',
  className,
  ...props
}: ProgressDotsProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * total);
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'rounded-full border-2 transition-colors',
            dotSizeMap[size],
            i < filled
              ? cn(dotColor[color], 'border-transparent')
              : 'bg-transparent border-divider',
          )}
        />
      ))}
    </div>
  );
}

export default DotsLoader;
