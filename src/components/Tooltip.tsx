'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCloseX, IconChevronUp, IconChevronDown } from './designerIcons';

/**
 * Tooltip — globo de guiado/tutorial y popover de acción (Figma › "Tooltip" › "Interactive Tooltip").
 *
 * Actualizado 1:1 contra el rebuild de Figma (node 6777:1816): antes solo cubría el caso
 * de onboarding (right/down, un solo color, sin description). Ahora es un único componente
 * que cubre dos usos:
 *   1. Coachmark de onboarding — step + acción secundaria "Cerrar" + primaria "Siguiente"/"Finalizar".
 *   2. Popover contextual (ej. nodo del circuito) — sin step, sin secundaria, un solo primary
 *      action tipo "Comenzar", con `description` como segunda línea.
 *
 * `arrow` reemplaza al viejo `direction` (ahora 4 lados, no 2) y `color` es nuevo (antes
 * solo existía el naranja). Cada sección (X / description / step / acciones) se muestra
 * según la presencia del prop correspondiente — mismo patrón que ya usaba este componente.
 *
 * La cruz de cerrar es el glifo real de Figma (`IconCloseX`). El hint de teclado
 * (`showKeyboardHint`) es una aproximación simplificada de las teclas rotadas de Figma
 * (acá: dos chips con flecha arriba/abajo) — no hay asset 1:1 en la librería de íconos.
 * La flecha decorativa que apunta al elemento anclado sigue siendo un triángulo CSS,
 * no un asset (evita depender de una URL de Figma que expira a los 7 días).
 */
export type TooltipArrow = 'right' | 'bottom' | 'left' | 'top';
export type TooltipColor = 'orange' | 'white';

export interface TooltipProps {
  /** Texto principal (título). */
  message: string;
  /** Segunda línea opcional, más chica. Si se pasa, se muestra. */
  description?: string;
  /** Paginación tipo "1/3". Si se omite no se muestra. */
  step?: string;
  /** Lado de la flecha — de qué lado está el elemento anclado. */
  arrow?: TooltipArrow;
  /** Color de la burbuja. */
  color?: TooltipColor;
  /** Hint de navegación por teclado (flechas arriba/abajo). */
  showKeyboardHint?: boolean;
  /** Muestra la X de cerrar arriba a la derecha. */
  onClose?: () => void;
  /** Acción principal (ej. "Siguiente", "Finalizar", "Comenzar"). */
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  /** Acción secundaria (ej. "Cerrar"). Solo tiene sentido en el flujo de onboarding. */
  onSecondaryAction?: () => void;
  secondaryActionLabel?: string;
  className?: string;
}

const BUBBLE_BG: Record<TooltipColor, string> = {
  orange: 'bg-orange',
  white: 'bg-whitesmoke',
};

/** Triángulo CSS por lado × color — clases completas (Tailwind no resuelve interpolación). */
const ARROW_SHAPE: Record<TooltipArrow, Record<TooltipColor, string>> = {
  right: {
    orange: 'border-y-8 border-l-8 border-y-transparent border-l-orange',
    white: 'border-y-8 border-l-8 border-y-transparent border-l-whitesmoke',
  },
  left: {
    orange: 'border-y-8 border-r-8 border-y-transparent border-r-orange',
    white: 'border-y-8 border-r-8 border-y-transparent border-r-whitesmoke',
  },
  bottom: {
    orange: 'border-x-8 border-t-8 border-x-transparent border-t-orange',
    white: 'border-x-8 border-t-8 border-x-transparent border-t-whitesmoke',
  },
  top: {
    orange: 'border-x-8 border-b-8 border-x-transparent border-b-orange',
    white: 'border-x-8 border-b-8 border-x-transparent border-b-whitesmoke',
  },
};

/** Dirección del flex del wrapper — bubble siempre primero en el DOM, `-reverse` la ubica del otro lado. */
const WRAPPER_LAYOUT: Record<TooltipArrow, string> = {
  right: 'flex-row items-center',
  left: 'flex-row-reverse items-center',
  bottom: 'flex-col items-center',
  top: 'flex-col-reverse items-center',
};

export function Tooltip({
  message,
  description,
  step,
  arrow = 'right',
  color = 'orange',
  showKeyboardHint = false,
  onClose,
  onPrimaryAction,
  primaryActionLabel = 'Siguiente',
  onSecondaryAction,
  secondaryActionLabel = 'Cerrar',
  className,
}: TooltipProps) {
  const showControlsRow = Boolean(step || onPrimaryAction || onSecondaryAction);

  return (
    <div className={cn('inline-flex drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]', WRAPPER_LAYOUT[arrow], className)}>
      <div className={cn('flex max-w-[423px] flex-col items-start gap-4 rounded-card px-4 py-[15px]', BUBBLE_BG[color])}>
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-start gap-2">
            <p className="w-[359px] font-shantell text-[20px] font-semibold leading-[1.3] text-black">{message}</p>
            {description && (
              <p className="w-[359px] font-inter text-[16px] font-semibold leading-normal text-black">{description}</p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="flex size-6 shrink-0 items-center justify-center"
            >
              <IconCloseX className="size-3.5 text-black" />
            </button>
          )}
        </div>

        {showKeyboardHint && (
          <div className="flex items-center gap-2 py-2">
            <span className="flex size-11 items-center justify-center rounded-chico border-2 border-black">
              <IconChevronUp className="size-4 text-black" />
            </span>
            <span className="flex size-11 items-center justify-center rounded-chico border-2 border-black">
              <IconChevronDown className="size-4 text-black" />
            </span>
          </div>
        )}

        {showControlsRow && (
          <div className="flex w-full items-center gap-2">
            {step && (
              <span className="flex-1 font-inter text-[16px] font-semibold leading-[1.5] tracking-[0.16px] text-black">
                {step}
              </span>
            )}
            {onSecondaryAction && (
              <button
                type="button"
                onClick={onSecondaryAction}
                className="flex h-11 shrink-0 items-center justify-center rounded-pill border-2 border-black px-4 font-inter text-[16px] font-semibold tracking-[0.16px] text-black transition-colors duration-200 ease-in-out hover:border-black hover:bg-blue hover:text-black active:border-blue active:bg-transparent active:text-black active:duration-0"
              >
                {secondaryActionLabel}
              </button>
            )}
            {onPrimaryAction && (
              <button
                type="button"
                onClick={onPrimaryAction}
                className="flex h-11 shrink-0 items-center justify-center rounded-pill border-[3px] border-transparent bg-black px-4 font-inter text-[16px] font-semibold tracking-[0.16px] text-orange transition-colors duration-200 ease-in-out hover:border-transparent hover:bg-darker-gray hover:text-blue active:border-blue active:bg-black active:text-orange active:duration-0"
              >
                {primaryActionLabel}
              </button>
            )}
          </div>
        )}
      </div>
      <div className={ARROW_SHAPE[arrow][color]} />
    </div>
  );
}

export default Tooltip;
