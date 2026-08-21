'use client';

import React, { useState } from 'react';
import { cn } from '../lib/cn';
import { IconCaretDown } from './designerIcons';

/**
 * Accordion — panel expandible (Figma › "Accordion", node 7414:3140).
 *
 * Reemplaza al único acordeón que existe hoy (`AyudaContent.tsx` en
 * `empujon/frontend`, un FAQ simple sin exclusividad de grupo).
 *
 * `variant="filled"` — tarjeta con fondo blanco-100 + borde negro-900, pensada
 * para overlays claros (ej. modal de parámetros de ejercicio). Radio: 16px
 * colapsado, 20px expandido o disabled — confirmado 1:1 contra Figma (nodes
 * 7245:5198/5230, 7259:1698/9169, 7245:5250, 7337:81/101).
 *
 * `variant="line"` — sin tarjeta: solo texto (blanco-100, pensado para fondo
 * oscuro `cuerpo`) + línea divisoria debajo (naranja por defecto, celeste en
 * hover, gris en disabled). Spec confirmada 1:1 contra Figma (nodes
 * 7245:5218/5224, 7259:1718/1459/9162, 7337:121/128) — la implementación
 * anterior asumía que esta variante no tenía spec relevada y la mostraba como
 * una tarjeta con borde, lo cual no correspondía a ningún nodo real.
 *
 * Estado Focus: pendiente (Figma define borde 3px celeste en Filled, y un
 * detalle de color en el chevron de Line) — queda para una siguiente pasada.
 */
export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  variant?: 'filled' | 'line';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Accordion({
  title,
  children,
  variant = 'filled',
  open,
  defaultOpen = false,
  onOpenChange,
  disabled,
  className,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const toggle = () => {
    if (disabled) return;
    if (open === undefined) setInternalOpen((v) => !v);
    onOpenChange?.(!isOpen);
  };

  if (variant === 'line') {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
        className={cn(
          'group flex w-full flex-col items-start gap-4 pt-4 text-left disabled:cursor-not-allowed',
          className,
        )}
      >
        <div className="flex w-full items-center justify-center gap-4">
          <span
            className={cn(
              'flex-1 font-shantell font-semibold text-[20px] leading-[1.3]',
              disabled ? 'text-gray-700' : 'text-whitesmoke group-hover:text-blue',
            )}
          >
            {title}
          </span>
          <IconCaretDown
            className={cn(
              'size-8 shrink-0 transition-transform',
              isOpen && 'rotate-180',
              disabled ? 'text-gray-700' : 'text-whitesmoke group-hover:text-blue',
            )}
          />
        </div>
        {isOpen && (
          <div
            className={cn(
              'flex w-full flex-col items-start py-2',
              disabled ? 'text-gray-700' : 'text-whitesmoke',
            )}
          >
            {children}
          </div>
        )}
        {/* Línea divisoria — naranja default, celeste en hover, gris en disabled
            (confirmado con las variables reales del nodo en Figma, no un color inventado). */}
        <div
          className={cn(
            'h-[2px] w-full',
            disabled ? 'bg-divider' : 'bg-orange group-hover:bg-blue',
          )}
        />
      </button>
    );
  }

  return (
    <div
      className={cn(
        // Radio único de 16px colapsado / 20px expandido o disabled — los 6 estados
        // relevados en Figma (Default, Hover, Disabled, Focus × colapsado/expandido)
        // siguen esta misma regla sin excepción.
        'w-full overflow-hidden border-2',
        isOpen || disabled ? 'rounded-[20px]' : 'rounded-[16px]',
        disabled ? 'border-gray-700 bg-divider' : 'border-black bg-whitesmoke',
        className,
      )}
    >
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center gap-4 p-4 text-left disabled:cursor-not-allowed',
          disabled ? 'text-gray-700' : 'text-black enabled:hover:bg-blue',
        )}
      >
        <span className="flex-1 font-shantell font-semibold text-[20px] leading-[1.3]">{title}</span>
        <IconCaretDown className={cn('size-8 shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className={cn('flex flex-col gap-6 p-4', disabled ? 'text-gray-700' : 'text-black')}>{children}</div>
      )}
    </div>
  );
}

export default Accordion;
