'use client';

import React, { useState } from 'react';
import { cn } from '../lib/cn';
import { IconCaretDown } from './designerIcons';

/**
 * Accordion — panel expandible (Figma › "Accordion"). Gap 100% nuevo.
 *
 * Reemplaza al único acordeón que existe hoy (`AyudaContent.tsx` en
 * `empujon/frontend`, un FAQ simple sin exclusividad de grupo).
 *
 * `variant="filled"` sigue la spec 1:1 (card blanco-100, texto negro-900, pensada
 * para overlays claros como el modal de parámetros de ejercicio en Figma).
 * `variant="line"` no tiene spec exacta relevada en Figma (solo se documentó Filled
 * en detalle) — se infiere como la versión "sobre fondo oscuro" análoga, a confirmar
 * con diseño si hace falta pixel-perfect.
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

export function Accordion({ title, children, variant = 'filled', open, defaultOpen = false, onOpenChange, disabled, className }: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const isFilled = variant === 'filled';

  const toggle = () => {
    if (disabled) return;
    if (open === undefined) setInternalOpen((v) => !v);
    onOpenChange?.(!isOpen);
  };

  return (
    <div
      className={cn(
        // Radio único de 16px, confirmado 1:1 contra Figma (node 7245:5198) — antes
        // cambiaba a 20px al abrirse, sin ninguna cita que lo respaldara (fabricado
        // sin verificar).
        'w-full overflow-hidden rounded-[16px] border-2',
        isFilled ? 'bg-whitesmoke border-black' : 'bg-transparent border-whitesmoke',
        disabled && 'opacity-40',
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
          isFilled ? 'text-black' : 'text-whitesmoke',
        )}
      >
        <span className="flex-1 font-shantell font-semibold text-[20px] leading-[1.3]">{title}</span>
        <IconCaretDown className={cn('size-8 shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className={cn('flex flex-col gap-6 p-4', isFilled ? 'text-black' : 'text-whitesmoke')}>{children}</div>
      )}
    </div>
  );
}

export default Accordion;
