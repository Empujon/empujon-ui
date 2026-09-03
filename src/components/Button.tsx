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
    // 200ms de easing hacia hover/default se ve bien, pero ese mismo delay aplicado
    // a :active hacía que un click real (mousedown→mouseup en ~50-150ms) soltara el
    // botón antes de que el color llegara a cambiar — se sentía como que el click no
    // hacía nada. `active:duration-[0ms]` fuerza el cambio a activo a ser instantáneo;
    // la vuelta a hover/default sigue con el easing normal.
    'transition-colors duration-200 ease-in-out active:duration-[0ms]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      /**
       * Tipo. Colores/estados tomados 1:1 del Figma (size M, leídos del
       * design-context de cada nodo). Estados: default = base; hover = `enabled:hover:`;
       * activo (onClick) = `enabled:active:`; deshabilitado = `disabled:`.
       *
       * El activo de las variantes rellenas es un BORDE de color (border-3), no un ring
       * (box-shadow) — confirmado 1:1 contra Figma (nodes 2402:2622, 2407:3018,
       * 4032:17860): el borde reservado transparente en default/hover simplemente
       * cambia de color al presionar. La versión anterior usaba `ring-inset`, que queda
       * *adentro* del borde transparente ya reservado — dejaba un hueco del color de
       * fondo entre el anillo y el borde real del botón.
       *
       * IMPORTANTE: en un click real el mouse sigue sobre el botón mientras está
       * presionado, así que `:hover` y `:active` matchean AL MISMO TIEMPO. Cualquier
       * propiedad que `hover:` toque (bg o text) y `active:` no vuelva a declarar
       * explícitamente se queda con el valor de hover, no con el de Figma para el
       * estado Active. Por eso cada variante rellena declara SIEMPRE bg/text/border en
       * `active:` aunque coincida con el default — no basta con declarar solo lo que
       * "cambia" a simple vista. Este fue el bug real detrás de danger-fill viéndose
       * "todo rojo" al presionar: el active:text quedaba heredado del hover (rojo sobre
       * rojo), nunca volvía a negro-900.
       */
      variant: {
        // primario on dark — default naranja/negro · hover celeste · activo borde celeste · disabled gris700/divider
        'primary-dark':
          'rounded-full bg-orange text-black border-[3px] border-transparent enabled:hover:bg-blue enabled:active:bg-orange enabled:active:border-blue focus-visible:ring-orange disabled:bg-gray-700 disabled:text-divider',
        // primario on light — default negro/naranja · hover gris-oscuro/celeste · activo borde celeste · disabled lightgray/darker-gray
        'primary-light':
          'rounded-full bg-black text-orange border-[3px] border-transparent enabled:hover:bg-darker-gray enabled:hover:text-blue enabled:active:bg-black enabled:active:text-orange enabled:active:border-blue disabled:bg-lightgray disabled:text-darker-gray focus-visible:ring-orange',
        // secundario on dark — gris-oscuro + borde/texto naranja · hover celeste · activo fondo gris-300 + texto negro · disabled divider
        'secondary-dark':
          'rounded-full bg-darker-gray text-orange border-[3px] border-orange enabled:hover:border-blue enabled:hover:text-blue enabled:active:bg-lgray enabled:active:border-blue enabled:active:text-black disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // secundario on light — fondo gris-oscuro #252924 + borde/texto naranja · hover fondo claro + borde/texto negro · activo borde celeste · disabled divider
        'secondary-light':
          'rounded-full bg-darker-gray text-orange border-[3px] border-orange enabled:hover:bg-whitesmoke enabled:hover:border-black enabled:hover:text-black enabled:active:bg-whitesmoke enabled:active:border-blue enabled:active:text-black disabled:border-divider disabled:text-divider focus-visible:ring-orange',
        // sin fondo — link wavy, texto blanco e Inter siempre. Antes hover/activo pasaban
        // la FAMILIA a Shantell ("label/shantell/hover" en Figma) — decisión de diseño
        // revertida: ahora la fuente NUNCA cambia, el subrayado wavy (ya presente en
        // default) es el único indicador de estado. Disabled vuelve a lightgray.
        ghost:
          'bg-transparent text-whitesmoke [text-decoration-line:underline] [text-decoration-style:wavy] underline-offset-2 enabled:hover:text-blue enabled:active:text-orange disabled:text-lightgray focus-visible:ring-blue',
        // sin fondo, para usar sobre superficies claras — mismo criterio que ghost: la
        // fuente no cambia en hover/activo, solo el color (gris-oscuro-700 en hover,
        // negro — igual que el default — en activo).
        'ghost-light':
          'bg-transparent text-black [text-decoration-line:underline] [text-decoration-style:wavy] underline-offset-2 enabled:hover:text-gray-700 disabled:text-divider focus-visible:ring-orange',
        // peligro relleno — rojo/negro · hover INVIERTE (negro/rojo) · activo rojo+borde negro · disabled gris700/divider
        'danger-fill':
          'rounded-full bg-red text-black border-[3px] border-transparent enabled:hover:bg-black enabled:hover:text-red enabled:active:bg-red enabled:active:text-black enabled:active:border-black focus-visible:ring-red disabled:bg-gray-700 disabled:text-divider',
        // peligro borde — gris-oscuro + borde/texto rojo · hover borde/texto celeste · activo borde celeste + texto rojo · disabled divider
        'danger-outline':
          'rounded-full bg-darker-gray text-red border-[3px] border-red enabled:hover:border-blue enabled:hover:text-blue enabled:active:border-blue enabled:active:text-red disabled:border-divider disabled:text-divider focus-visible:ring-red',
        // link — hipervínculo simple: texto naranja subrayado, hover celeste. Sin caja.
        link:
          'bg-transparent text-orange underline underline-offset-2 enabled:hover:text-blue enabled:active:text-yellow disabled:text-lightgray focus-visible:ring-orange',
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
      { variant: 'ghost-light', class: 'py-4 disabled:opacity-[0.38]' },
      // link: sin caja, solo el texto; disabled al 38%.
      { variant: 'link', class: 'disabled:opacity-[0.38]' },
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
  /** Si se pasa, el botón se renderiza como <a href>. */
  href?: string;
  /** target del enlace (sólo con href). */
  target?: string;
  /** rel del enlace (sólo con href). */
  rel?: string;
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

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
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
    href,
    target,
    rel,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading;
  const iconSizeClass = ICON_SIZE[size ?? 'md'];
  const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

  const renderIcon = (node: React.ReactNode) =>
    node ? <span className={cn('shrink-0 inline-flex items-center justify-center', iconSizeClass)}>{node}</span> : null;

  const content = (
    <>
      {loading && renderIcon(<Spinner className={iconSizeClass} />)}
      {!loading && iconPosition === 'left' && renderIcon(icon)}
      {children != null && <span className="leading-[1.3]">{children}</span>}
      {!loading && iconPosition === 'right' && renderIcon(icon)}
    </>
  );

  // Como enlace (<a>) cuando hay href y no está deshabilitado. Un <a> no tiene
  // estado disabled nativo, así que si está disabled caemos al <button>.
  if (href && !isDisabled) {
    // Los pseudo `:enabled`/`:disabled` (prefijo `enabled:`/`disabled:` de Tailwind)
    // NO matchean en un <a>, así que el hover/active no se dispararía. Como acá el
    // enlace nunca está disabled, quitamos esos prefijos para que hover/active valgan.
    const linkClasses = classes.replace(/enabled:/g, '').replace(/disabled:\S+/g, '');
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={cn(linkClasses, 'inline-flex items-center justify-center gap-2')}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
});

export { Button, buttonVariants };
export default Button;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const buttonBlockMeta: UiBlockMeta = {
  type: 'ui:button',
  label: 'Botón',
  icon: 'MousePointerClick',
  exportName: 'Button',
  childrenProp: 'children',
  props: {
    children: { control: 'text', label: 'Texto', default: 'Botón', inline: true },
    href: { control: 'text', label: 'Enlace (URL)', default: '' },
    variant: {
      control: 'enum',
      label: 'Estilo',
      default: 'primary-dark',
      options: [
        'primary-dark',
        'primary-light',
        'secondary-dark',
        'secondary-light',
        'ghost',
        'ghost-light',
        'danger-fill',
        'danger-outline',
        'link',
      ],
    },
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['sm', 'md', 'lg'] },
    fullWidth: { control: 'boolean', label: 'Ancho completo', default: false },
  },
};
