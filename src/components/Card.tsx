'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Card — contenedor base del sistema de diseño.
 *
 * Unifica el patrón repetido en TODOS los frontends de Empujón:
 * `bg-{dark} rounded-{16|24|30} p-{4|6}` (hoy inline en fluidez, granpaneo,
 * iconic_memory, turbo, SB; agudeza ya tiene un DarkCard local).
 *
 * Composición por slots: <Card><CardHeader/><CardBody/><CardFooter/></Card>.
 * `interactive` agrega estados hover/focus para cards clickeables.
 *
 * Spacing/tipografía de los slots ajustados 1:1 contra "Plain card" (archivo
 * Figma "MESA DE TRABAJO", node 9273:18356): header con gap-4/mb-4, título
 * Shantell SemiBold 20px, footer con gap-4 y acciones alineadas a la derecha.
 */
const cardVariants = cva('flex flex-col', {
  variants: {
    surface: {
      // panel/sección estándar del sistema (radius 24)
      dark: 'bg-darker-gray text-white',
      // fondo negro de página
      black: 'bg-black text-white',
      // modo claro (lectura larga)
      light: 'bg-whitesmoke text-black',
      // sin fondo, solo borde
      outline: 'bg-transparent text-white border-[3px] border-divider',
    },
    radius: {
      sm: 'rounded-card-sm',
      md: 'rounded-card',
      lg: 'rounded-[30px]',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'transition-colors cursor-pointer hover:border-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-black',
      false: '',
    },
  },
  defaultVariants: { surface: 'dark', radius: 'md', padding: 'md', interactive: false },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ surface, radius, padding, interactive, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ surface, radius, padding, interactive }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-start justify-between gap-3 mb-4', className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('font-shantell font-semibold text-[20px] tracking-[0.2px]', className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('font-inter', className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-center justify-end gap-4 mt-4', className)} {...props} />;
}

export default Card;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const cardBlockMeta: UiBlockMeta = {
  type: 'ui:card',
  label: 'Tarjeta',
  icon: 'Square',
  exportName: 'Card',
  childrenProp: 'children',
  props: {
    children: { control: 'text', label: 'Contenido', default: 'Contenido de la tarjeta', inline: true },
    surface: {
      control: 'enum',
      label: 'Superficie',
      default: 'dark',
      options: ['dark', 'black', 'light', 'outline'],
    },
    radius: { control: 'enum', label: 'Redondeo', default: 'md', options: ['sm', 'md', 'lg'] },
    padding: { control: 'enum', label: 'Relleno', default: 'md', options: ['none', 'sm', 'md', 'lg'] },
  },
};
