'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconChevronUp, IconChevronDown, IconCheckMark } from './designerIcons';

/**
 * Pagination — franja de 4 botones circulares (Figma › "Paginado").
 *
 * Gap 100% nuevo. La spec de Figma usa direcciones Arriba/Abajo (no Izquierda/Derecha),
 * pensada para navegar una lista vertical larga: "Primero" (gris, salta al principio),
 * "Arriba" (verde→celeste hover, un paso atrás), "Abajo" (verde→celeste hover, un paso
 * adelante), "Último" (naranja, con un ícono de check — literal en Figma, no una flecha;
 * se mantiene tal cual está documentado aunque el nombre sugiera "página final").
 */
export interface PaginationProps {
  onFirst?: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  className?: string;
}

const circleBase = 'flex size-20 items-center justify-center rounded-pill transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

export function Pagination({ onFirst, onPrevious, onNext, onLast, disablePrevious, disableNext, className }: PaginationProps) {
  return (
    <div className={cn('inline-flex items-center gap-10', className)}>
      {onFirst && (
        <button type="button" aria-label="Ir al principio" onClick={onFirst} className={cn(circleBase, 'bg-darker-gray text-whitesmoke')}>
          <IconChevronUp className="size-6" />
        </button>
      )}
      <button
        type="button"
        aria-label="Anterior"
        onClick={onPrevious}
        disabled={disablePrevious}
        className={cn(circleBase, 'bg-green text-black enabled:hover:bg-blue')}
      >
        <IconChevronUp className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={onNext}
        disabled={disableNext}
        className={cn(circleBase, 'bg-green text-black enabled:hover:bg-blue')}
      >
        <IconChevronDown className="size-6" />
      </button>
      {onLast && (
        <button type="button" aria-label="Ir al final" onClick={onLast} className={cn(circleBase, 'bg-orange text-black enabled:hover:bg-blue')}>
          <IconCheckMark className="size-6" />
        </button>
      )}
    </div>
  );
}

export default Pagination;
