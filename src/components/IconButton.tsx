'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * IconButton — botón circular solo-ícono del sistema de diseño de Empujón.
 *
 * Fiel al Figma "SISTEMA DE DISEÑO" › Buttons › `Icon Button` (component set,
 * node 7582:3371): `Background` (With/Without) × `Size` (XS 24 / S 32 / M 44 / L 58)
 * × `State` × ícono INSTANCE_SWAP.
 *
 * Estados vía clases Tailwind (no variante separada) — mismo criterio que Button:
 * default = base; hover = `enabled:hover:`; activo (click sostenido) =
 * `enabled:active:`; deshabilitado = `disabled:`. Colores 1:1 con Figma: default
 * gris claro (lgray), hover celeste (blue), activo naranja (orange, sin anillo),
 * deshabilitado gris (divider).
 */
const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'transition-colors duration-200 ease-in-out active:duration-[0ms]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      /** Background=With/Without en Figma — círculo de fondo o ícono suelto. */
      background: {
        with: 'rounded-pill bg-darker-gray text-lgray enabled:hover:text-blue enabled:active:text-orange disabled:text-divider',
        without: 'bg-transparent text-lgray enabled:hover:text-blue enabled:active:text-orange disabled:text-divider',
      },
      /** Size=XS/S/M/L en Figma (24/32/44/58px). */
      size: {
        xs: 'size-6',
        s: 'size-8',
        m: 'size-11',
        l: 'size-[58px]',
      },
    },
    defaultVariants: {
      background: 'with',
      size: 's',
    },
  },
);

/** Tamaño del ícono interno según el size del botón (proporción ~70-75%, 1:1 con Figma). */
const ICON_SIZE: Record<NonNullable<IconButtonProps['size']>, string> = {
  xs: 'size-4',
  s: 'size-6',
  m: 'size-8',
  l: 'size-[42px]',
};

export interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  /** Ícono a mostrar (equivalente a la propiedad INSTANCE_SWAP "Icon" de Figma). */
  icon: React.ReactNode;
  /** Requerido: el botón no lleva texto visible. */
  'aria-label': string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  background,
  size = 's',
  onClick,
  disabled,
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={rest['aria-label']}
      className={cn(iconButtonVariants({ background, size }), className)}
    >
      <span className={cn('inline-flex items-center justify-center', ICON_SIZE[size ?? 's'])}>{icon}</span>
    </button>
  );
}

export default IconButton;
