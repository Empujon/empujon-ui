'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Badge (pill) — etiqueta pequeña del sistema de diseño.
 *
 * Fiel al Figma › Notificaciones › "pill": fondo negro, px-3 py-1, rounded,
 * texto Inter Medium 14px, con punto de status opcional.
 *
 * Unifica los pills sueltos de los satélites (granpaneo ValuePill, turbo, etc.).
 */
const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-3xl px-3 py-1 font-inter font-medium text-sm tracking-[0.14px] whitespace-nowrap',
  {
    variants: {
      variant: {
        neutral: 'bg-black text-whitesmoke',
        orange: 'bg-orange text-black',
        yellow: 'bg-yellow text-black',
        green: 'bg-green text-black',
        blue: 'bg-blue text-black',
        danger: 'bg-red text-black',
        outline: 'bg-transparent text-white border border-divider',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
);

const statusColor = {
  green: 'bg-green',
  orange: 'bg-orange',
  yellow: 'bg-yellow',
  red: 'bg-red',
  blue: 'bg-blue',
  divider: 'bg-divider',
} as const;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Muestra un punto de estado de color a la izquierda. */
  status?: keyof typeof statusColor;
}

export function Badge({ variant, status, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {status && <span className={cn('size-2 shrink-0 rounded-full', statusColor[status])} />}
      {children}
    </span>
  );
}

export default Badge;
