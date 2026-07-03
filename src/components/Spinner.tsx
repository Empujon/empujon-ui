'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Spinner — indicador de carga circular del sistema de diseño.
 *
 * Unifica el patrón repetido en los aplicativos satélite
 * (`rounded-full border-2 border-t-transparent animate-spin`), que hoy está
 * copiado inline en agudeza-visual, lecturapredic y SB con tamaños distintos.
 *
 * Para el loader de puntos verdes del Figma (sección Loading › "cargando"),
 * ver `DotsLoader`.
 */
const spinnerVariants = cva('inline-block rounded-full border-current border-t-transparent animate-spin', {
  variants: {
    size: {
      xs: 'size-4 border-2',
      sm: 'size-5 border-2',
      md: 'size-8 border-[3px]',
      lg: 'size-10 border-[3px]',
      xl: 'size-14 border-4',
    },
    color: {
      orange: 'text-orange',
      green: 'text-green',
      blue: 'text-blue',
      white: 'text-white',
      black: 'text-black',
      current: 'text-current',
    },
  },
  defaultVariants: { size: 'md', color: 'orange' },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  /** Texto accesible para lectores de pantalla. Default 'Cargando'. */
  label?: string;
}

export function Spinner({ size, color, label = 'Cargando', className, ...props }: SpinnerProps) {
  return (
    <span role="status" aria-live="polite" className={cn('inline-flex', className)} {...props}>
      <span className={spinnerVariants({ size, color })} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default Spinner;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const spinnerBlockMeta: UiBlockMeta = {
  type: 'ui:spinner',
  label: 'Spinner',
  icon: 'Loader',
  exportName: 'Spinner',
  props: {
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: {
      control: 'enum',
      label: 'Color',
      default: 'orange',
      options: ['orange', 'green', 'blue', 'white', 'black'],
    },
  },
};
