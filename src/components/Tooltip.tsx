'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCloseX } from './designerIcons';

/**
 * Tooltip — globo de guiado/tutorial (Figma › "Tooltip" › "Tutorial Tooltip").
 *
 * Gap 100% nuevo. Distinto del sistema de "guiado tipo tour" que ya existe en
 * `empujon/frontend` (`GuideProvider`, con spotlight + anclaje por `data-guide`) — este
 * es solo la burbuja visual con paginación (ej. "1/3") y acciones Siguiente/Cerrar,
 * pensada para que la app la posicione (con o sin su propio sistema de spotlight).
 *
 * La "cruz" de cerrar inline junto al mensaje SÍ es el glifo real de Figma (`IconCloseX`)
 * — se me había pasado por completo en la primera pasada, no solo el placeholder. La flecha
 * decorativa que apunta al elemento anclado sigue siendo un triángulo CSS, no un asset.
 */
export interface TooltipProps {
  message: string;
  /** Paginación tipo "1/3". Si se omite no se muestra. */
  step?: string;
  direction?: 'right' | 'down';
  onNext?: () => void;
  nextLabel?: string;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
}

export function Tooltip({
  message,
  step,
  direction = 'right',
  onNext,
  nextLabel = 'Siguiente',
  onClose,
  closeLabel = 'Cerrar',
  className,
}: TooltipProps) {
  const isDown = direction === 'down';
  return (
    <div className={cn('inline-flex', isDown ? 'flex-col items-center' : 'items-center', className)}>
      <div
        className={cn(
          'flex flex-col gap-4 items-start rounded-[24px] bg-orange p-4 shadow-verde',
          isDown ? 'items-center' : '',
        )}
      >
        <div className={cn('flex items-start gap-2 max-w-[359px]', isDown ? 'flex-row-reverse' : '')}>
          <p className="flex-1 font-shantell font-semibold text-[20px] leading-[1.3] text-black">{message}</p>
          {onClose && (
            <button type="button" aria-label={closeLabel} onClick={onClose} className="shrink-0">
              <IconCloseX className="size-6 text-black" />
            </button>
          )}
        </div>
        {(step || onNext || onClose) && (
          <div className="flex items-center gap-2 w-full">
            {step && (
              <span className="flex-1 font-inter font-bold text-[20px] leading-[1.4] text-black underline">
                {step}
              </span>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 shrink-0 items-center justify-center rounded-pill border-2 border-orange px-4 font-inter font-semibold text-[16px] tracking-[0.16px] text-orange"
              >
                {closeLabel}
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                className="flex h-11 shrink-0 items-center justify-center rounded-pill bg-black px-4 font-inter font-semibold text-[16px] tracking-[0.16px] text-orange"
              >
                {nextLabel}
              </button>
            )}
          </div>
        )}
      </div>
      {isDown ? (
        <div className="border-x-8 border-t-8 border-x-transparent border-t-orange" />
      ) : (
        <div className="border-y-8 border-l-8 border-y-transparent border-l-orange" />
      )}
    </div>
  );
}

export default Tooltip;
