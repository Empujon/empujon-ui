'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Button — componente base del sistema de diseño de Empujón.
 *
 * Fiel al Figma "SISTEMA DE DISEÑO" › Botones › `botón` (8 tipos × 3 tamaños × estados).
 * Pill (rounded-full), Inter Semibold, ícono opcional a izq/der.
 *
 * Convención de marca para hover: los primarios pasan de naranja a celeste; los
 * de borde se rellenan; peligro se intensifica. Estados via clases Tailwind
 * (no variantes separadas), así un mismo botón responde a interacción real.
 *
 * NO reemplaza a components/buttons/Button.tsx (legacy). Migración gradual.
 */
const buttonVariants = cva(
  // base: layout pill + tipografía + transición + foco accesible + disabled
  [
    'inline-flex items-center justify-center gap-2 rounded-full',
    'font-inter font-semibold whitespace-nowrap select-none',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      /** Jerarquía visual + contexto de fondo. Nombres tomados del Figma. */
      variant: {
        // primario: fondo sólido naranja → hover celeste, texto negro
        'primary-dark':
          'bg-orange text-black hover:bg-blue focus-visible:ring-orange disabled:bg-gray-700 disabled:text-gray-600',
        'primary-light':
          'bg-orange text-black hover:bg-blue focus-visible:ring-orange disabled:bg-lgray disabled:text-gray-600',
        // secundario: borde naranja, texto naranja → hover se rellena
        'secondary-dark':
          'bg-darker-gray text-orange border-[3px] border-orange hover:bg-orange hover:text-black focus-visible:ring-orange disabled:border-gray-700 disabled:text-gray-600 disabled:bg-transparent',
        'secondary-light':
          'bg-whitesmoke text-orange border-[3px] border-orange hover:bg-orange hover:text-black focus-visible:ring-orange disabled:border-lgray disabled:text-gray-600',
        // sin fondo (ghost): solo texto, hover sutil
        ghost:
          'bg-transparent text-white hover:text-orange focus-visible:ring-orange disabled:text-gray-600',
        // sin fondo shantell: ghost con tipografía display
        'ghost-shantell':
          'bg-transparent text-white font-shantell hover:text-orange focus-visible:ring-orange disabled:text-gray-600',
        // peligro relleno: rojo, texto negro
        'danger-fill':
          'bg-red text-black hover:brightness-110 focus-visible:ring-red disabled:bg-gray-700 disabled:text-gray-600',
        // peligro borde: borde rojo, texto rojo → hover se rellena
        'danger-outline':
          'bg-transparent text-red border-[3px] border-red hover:bg-red hover:text-black focus-visible:ring-red disabled:border-gray-700 disabled:text-gray-600',
      },
      /** Tamaño. Padding + tipografía según escala del Figma (S/M/L). */
      size: {
        sm: 'px-4 py-2 text-label-chico',
        md: 'px-6 py-4 text-label-medio',
        lg: 'px-8 py-6 text-label-grande',
      },
      /** Ancho completo del contenedor. */
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary-dark',
      size: 'md',
      fullWidth: false,
    },
  },
);

/** Tamaño del ícono según el size del botón. */
const ICON_SIZE: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
};

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Ícono opcional (ReactNode, normalmente un SVG). */
  icon?: React.ReactNode;
  /** Posición del ícono respecto al texto. Default 'left'. */
  iconPosition?: 'left' | 'right';
  /** Muestra spinner y deshabilita el botón. */
  loading?: boolean;
}

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
    <path
      className="opacity-90"
      fill="currentColor"
      d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2Z"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant,
    size = 'md',
    fullWidth,
    icon,
    iconPosition = 'left',
    loading = false,
    disabled,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const iconSizeClass = ICON_SIZE[size ?? 'md'];

  const renderIcon = (node: React.ReactNode) =>
    node ? <span className={cn('shrink-0 inline-flex items-center justify-center', iconSizeClass)}>{node}</span> : null;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading && renderIcon(<Spinner className={iconSizeClass} />)}
      {!loading && iconPosition === 'left' && renderIcon(icon)}
      {children != null && <span className="leading-[1.3]">{children}</span>}
      {!loading && iconPosition === 'right' && renderIcon(icon)}
    </button>
  );
});

export { Button, buttonVariants };
export default Button;
