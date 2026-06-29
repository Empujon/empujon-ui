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
  // base común: layout + tipografía + transición + foco accesible + disabled.
  // El padding y el tamaño de texto los ponen `size`/`compoundVariants` porque
  // las variantes "ghost" del Figma NO llevan padding horizontal.
  [
    'inline-flex items-center justify-center gap-2',
    'font-inter font-semibold whitespace-nowrap select-none',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      /**
       * Tipo. Colores/estados tomados 1:1 del Figma (size M, leídos del
       * design-context de cada nodo). Estados: default = base; hover = `enabled:hover:`;
       * activo (onClick) = `enabled:active:`; deshabilitado = `disabled:`.
       * El activo de las variantes rellenas usa `ring` (box-shadow) para no agrandar.
       */
      variant: {
        // primario on dark — default naranja/negro · hover celeste · activo naranja+anillo celeste · disabled gris700/divider
        'primary-dark':
          'rounded-full bg-orange text-black enabled:hover:bg-blue enabled:active:bg-orange enabled:active:ring-[3px] enabled:active:ring-inset enabled:active:ring-blue focus-visible:ring-orange disabled:bg-gray-700 disabled:text-divider',
        // primario on light — default negro/naranja · hover gris-oscuro/celeste · activo anillo celeste · disabled lightgray/darker-gray
        'primary-light':
          'rounded-full bg-black text-orange enabled:hover:bg-darker-gray enabled:hover:text-blue enabled:active:ring-[3px] enabled:active:ring-inset enabled:active:ring-blue disabled:bg-lightgray disabled:text-darker-gray focus-visible:ring-orange',
        // secundario on dark — gris-oscuro + borde/texto naranja · hover celeste · activo fondo gris-300 + texto negro · disabled divider
        'secondary-dark':
          'rounded-full bg-darker-gray text-orange border-[3px] border-orange enabled:hover:border-blue enabled:hover:text-blue enabled:active:bg-lgray enabled:active:border-blue enabled:active:text-black disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // secundario on light — transparente + borde/texto naranja · hover fondo claro + borde/texto negro · activo borde celeste · disabled divider
        'secondary-light':
          'rounded-full bg-transparent text-orange border-[3px] border-orange enabled:hover:bg-whitesmoke enabled:hover:border-black enabled:hover:text-black enabled:active:border-blue disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // sin fondo — link wavy, texto blanco · hover celeste · activo amarillo · disabled lightgray
        ghost:
          'bg-transparent text-whitesmoke [text-decoration-line:underline] [text-decoration-style:wavy] underline-offset-2 enabled:hover:text-blue enabled:active:text-yellow disabled:text-lightgray focus-visible:ring-blue',
        // sin fondo shantell — link wavy en Shantell, texto negro · hover naranja · activo negro · disabled divider
        'ghost-shantell':
          'bg-transparent text-black font-shantell [text-decoration-line:underline] [text-decoration-style:wavy] underline-offset-2 enabled:hover:text-orange enabled:active:text-black disabled:text-divider focus-visible:ring-orange',
        // peligro relleno — rojo/negro · hover INVIERTE (negro/rojo) · activo rojo+anillo negro · disabled gris700/divider
        'danger-fill':
          'rounded-full bg-red text-black enabled:hover:bg-black enabled:hover:text-red enabled:active:bg-red enabled:active:ring-[3px] enabled:active:ring-inset enabled:active:ring-black focus-visible:ring-red disabled:bg-gray-700 disabled:text-divider',
        // peligro borde — gris-oscuro + borde/texto rojo · hover borde/texto celeste · activo borde celeste + texto rojo · disabled divider
        'danger-outline':
          'rounded-full bg-darker-gray text-red border-[3px] border-red enabled:hover:border-blue enabled:hover:text-blue enabled:active:border-blue enabled:active:text-red disabled:border-divider disabled:text-divider focus-visible:ring-red',
      },
      /** Tamaño (texto). El padding lo aplican los compoundVariants según el tipo. */
      size: {
        sm: 'text-label-chico',
        md: 'text-label-medio',
        lg: 'text-label-grande',
      },
      /** Ancho completo del contenedor. */
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // Variantes con caja (pill): padding completo por tamaño.
      ...(['primary-dark', 'primary-light', 'secondary-dark', 'secondary-light', 'danger-fill', 'danger-outline'] as const).flatMap(
        (v) => [
          { variant: v, size: 'sm' as const, class: 'px-4 py-2' },
          { variant: v, size: 'md' as const, class: 'px-6 py-4' },
          { variant: v, size: 'lg' as const, class: 'px-8 py-6' },
        ],
      ),
      // ghost (sin fondo): solo padding vertical, sin horizontal. Disabled al 38% (Figma).
      { variant: 'ghost', class: 'py-4 disabled:opacity-[0.38]' },
      // ghost-shantell: tipografía FIJA 16px (no escala con size), padding vertical 8px. Disabled 38%.
      { variant: 'ghost-shantell', class: 'py-2 !text-label-chico disabled:opacity-[0.38]' },
      // primario on light: disabled al 38% (Figma aplica opacity al contenido).
      { variant: 'primary-light', class: 'disabled:opacity-[0.38]' },
    ],
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
