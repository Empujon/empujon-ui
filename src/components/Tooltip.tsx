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
 * La cruz de cerrar es el glifo real de Figma (`IconCloseX`), chico (14px) dentro de
 * una caja de click de 24px — medido en Figma (nodo 7590:3762: el glifo mide 13.16×14.18
 * dentro de un contenedor de 24×24, no llena la caja). El hint de teclado
 * (`showKeyboardHint`) es una aproximación simplificada de las teclas rotadas de Figma
 * (acá: dos chips con flecha arriba/abajo) — no hay asset 1:1 en la librería de íconos.
 *
 * La flecha decorativa es el mismo glifo cóncavo (un solo path, 8×16) que usa
 * `InformativeTooltip` — no un triángulo CSS ni un asset con URL que expira. Se ubica
 * dentro de un "riel" del mismo alto (lados) o ancho (arriba/abajo) que la burbuja,
 * igual que en el código exportado de Figma: sin gap/overlap negativo, la flecha queda
 * apoyada contra el borde de la burbuja porque el riel calza al ras.
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

const ARROW_COLOR: Record<TooltipColor, string> = {
  orange: 'text-orange',
  white: 'text-whitesmoke',
};

/** Rotación del glifo (orientado apuntando a la izquierda) por lado — igual que en Figma. */
const ARROW_ROTATION: Record<TooltipArrow, string> = {
  left: '',
  top: 'rotate-90',
  right: 'rotate-180',
  bottom: '-rotate-90',
};

/**
 * Riel donde vive la flecha — mismo alto (lados) o ancho (arriba/abajo) que la burbuja
 * vía `self-stretch`, con 40px de padding interno y la flechita alineada según el lado
 * (arriba en Right, centrada en Left; a la derecha en Top, a la izquierda en Bottom) —
 * mismas clases que exporta Figma para el nodo "Pointer".
 */
const ARROW_RAIL: Record<TooltipArrow, string> = {
  right: 'flex items-start self-stretch py-10',
  left: 'flex items-center self-stretch py-10',
  top: 'flex flex-col items-end self-stretch px-10',
  bottom: 'flex flex-col items-start self-stretch px-10',
};

/**
 * Tamaño de la caja EXTERIOR de la flecha — swapeado en Top/Bottom porque el glifo
 * (8×16) se rota 90°, así que su huella post-rotación es 16×8. Sin esto, el riel
 * alinea la flecha por su caja SIN rotar (8 de ancho) y el glifo ya rotado (16 de
 * ancho visual) queda descentrado ~4px respecto al inset esperado. Mismo truco que
 * `InformativeTooltip`.
 */
const ARROW_BOX: Record<TooltipArrow, string> = {
  left: 'h-4 w-2',
  right: 'h-4 w-2',
  top: 'h-2 w-4',
  bottom: 'h-2 w-4',
};

/** Dirección del flex del wrapper — bubble siempre primero en el DOM, `-reverse` la ubica del otro lado. */
const WRAPPER_LAYOUT: Record<TooltipArrow, string> = {
  right: 'flex-row items-center justify-center',
  left: 'flex-row-reverse items-center justify-center',
  bottom: 'flex-col items-end',
  top: 'flex-col-reverse items-end',
};

/** Glifo real de Figma (node "Vector", path único) — apunta a la izquierda; se rota para las demás direcciones. Mismo path que InformativeTooltip. */
function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 16" fill="none" className={className} aria-hidden="true">
      <path d="M0 8C4.41828 8 8 4.41828 8 0V16C8 11.5817 4.41828 8 0 8Z" fill="currentColor" />
    </svg>
  );
}

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
      <div className={ARROW_RAIL[arrow]}>
        <span className={cn('inline-flex shrink-0 items-center justify-center', ARROW_BOX[arrow])}>
          <ArrowGlyph className={cn('h-4 w-2', ARROW_COLOR[color], ARROW_ROTATION[arrow])} />
        </span>
      </div>
    </div>
  );
}

export default Tooltip;
