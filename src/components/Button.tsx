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
      /**
       * Jerarquía visual + contexto de fondo. Nombres y colores tomados 1:1 del
       * Figma (size M). Estados: default = clases base; hover = `hover:`;
       * activo (pressed) = `active:`; deshabilitado = `disabled:`.
       *
       * Patrones del sistema: el hover vira a celeste (#45acf7) casi siempre;
       * el estado activo agrega un borde celeste de 3px; deshabilitado usa
       * gris #6b796b (token `divider`).
       */
      variant: {
        // primario on dark: naranja → hover celeste (texto negro siempre); activo agrega borde celeste
        'primary-dark':
          'bg-orange text-black hover:bg-blue active:border-[3px] active:border-blue focus-visible:ring-orange disabled:bg-gray-700 disabled:text-divider',
        // primario on light: fondo NEGRO + texto naranja → hover gris-oscuro + texto celeste
        'primary-light':
          'bg-black text-orange hover:bg-darker-gray hover:text-blue active:border-[3px] active:border-blue disabled:bg-lightgray disabled:text-darker-gray disabled:opacity-40 focus-visible:ring-orange',
        // secundario on dark: gris-oscuro + borde/texto naranja → hover borde/texto celeste; activo fondo gris-300 + texto negro
        'secondary-dark':
          'bg-darker-gray text-orange border-[3px] border-orange hover:border-blue hover:text-blue active:bg-lgray active:border-blue active:text-black disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // secundario on light: transparente + borde/texto naranja → hover fondo claro + borde/texto negro
        'secondary-light':
          'bg-transparent text-orange border-[3px] border-orange hover:bg-whitesmoke hover:border-black hover:text-black active:border-blue disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // sin fondo: link subrayado, texto blanco → hover celeste, activo amarillo
        ghost:
          'bg-transparent text-whitesmoke underline underline-offset-4 hover:text-blue active:text-yellow disabled:text-lightgray disabled:opacity-40 focus-visible:ring-blue',
        // sin fondo shantell: link subrayado en Shantell, texto negro → hover naranja
        'ghost-shantell':
          'bg-transparent text-black font-shantell underline underline-offset-4 hover:text-orange active:text-black disabled:text-divider disabled:opacity-40 focus-visible:ring-orange',
        // peligro relleno: rojo + texto negro → hover INVIERTE (fondo negro + texto rojo); activo borde negro
        'danger-fill':
          'bg-red text-black hover:bg-black hover:text-red active:border-[3px] active:border-black focus-visible:ring-red disabled:bg-gray-700 disabled:text-divider',
        // peligro borde: gris-oscuro + borde/texto rojo → hover borde/texto celeste
        'danger-outline':
          'bg-darker-gray text-red border-[3px] border-red hover:border-blue hover:text-blue active:border-blue active:text-red disabled:border-divider disabled:text-divider focus-visible:ring-red',
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
