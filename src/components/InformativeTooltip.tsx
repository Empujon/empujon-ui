'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * InformativeTooltip — texto corto en hover/focus, sin acciones (Figma › "Tooltip" ›
 * "Informative Tooltip", node 7574:318). Hermano de `Tooltip` (el "Interactive
 * Tooltip"): mismo family en Figma, pero esta es la versión puramente informativa
 * — sin título grande, sin botones, sin close. Envuelve un trigger (`children`) y
 * se muestra solo con hover/focus sobre ese trigger; nunca requiere interacción.
 *
 * La flecha es el glifo real de Figma (un solo path, orientado apuntando a la
 * izquierda) rotado por CSS para las otras 3 direcciones — misma forma que usa
 * Figma internamente (ver `rotate-90`/`rotate-180`/`-rotate-90` en el código
 * exportado del componente), no un triángulo aproximado. Se normaliza a
 * `currentColor` para recolorear por `color` en vez de bundlear un SVG por color.
 * Sin overlap/gap negativo contra la burbuja — a diferencia de la versión anterior
 * de este glifo, esta forma (cóncava) ya calza sin hueco con gap 0.
 *
 * `arrow` describe hacia dónde apunta la flecha (= de qué lado está el trigger
 * respecto de la burbuja) — la burbuja se posiciona automáticamente del lado
 * contrario. No está portalado (posición `absolute` relativa al trigger) — igual
 * criterio que `Dropdown`; puede recortarse cerca del borde de la pantalla.
 */
export type InformativeTooltipArrow = 'right' | 'bottom' | 'left' | 'top';
export type InformativeTooltipColor = 'orange' | 'white';

export interface InformativeTooltipProps {
  text: string;
  arrow?: InformativeTooltipArrow;
  color?: InformativeTooltipColor;
  /** Elemento sobre el que se hace hover/focus para mostrar el tooltip. */
  children: React.ReactNode;
  className?: string;
}

const BUBBLE_BG: Record<InformativeTooltipColor, string> = {
  orange: 'bg-orange',
  white: 'bg-lightgray',
};

const ARROW_COLOR: Record<InformativeTooltipColor, string> = {
  orange: 'text-orange',
  white: 'text-lightgray',
};

/** Rotación del glifo (orientado apuntando a la izquierda) por lado — igual que en Figma. */
const ARROW_ROTATION: Record<InformativeTooltipArrow, string> = {
  left: '',
  top: 'rotate-90',
  right: 'rotate-180',
  bottom: '-rotate-90',
};

/**
 * Tamaño de la caja EXTERIOR de la flecha — swapeado en Top/Bottom porque el
 * glifo (8×16) se rota 90°, así que su huella post-rotación es 16×8. Mismo
 * truco que usa el código exportado de Figma (wrapper con w/h intercambiados
 * alrededor de un `rotate-90` interno) — sin esto, rotar un glifo no cuadrado
 * corre el contenido fuera de su caja.
 */
const ARROW_BOX: Record<InformativeTooltipArrow, string> = {
  left: 'h-4 w-2',
  right: 'h-4 w-2',
  top: 'h-2 w-4',
  bottom: 'h-2 w-4',
};

/** Dirección del flex de la burbuja — bubble siempre primero en el DOM, `-reverse` la ubica del otro lado. */
const WRAPPER_LAYOUT: Record<InformativeTooltipArrow, string> = {
  right: 'flex-row items-center',
  left: 'flex-row-reverse items-center',
  bottom: 'flex-col items-center',
  top: 'flex-col-reverse items-center',
};

/**
 * Dónde se ubica la burbuja respecto del trigger — siempre del lado contrario a
 * `arrow` (si la flecha apunta a la derecha, es porque el trigger está a la
 * derecha, así que la burbuja va a la izquierda). Gap de 4px, mismo valor que
 * el preview validado.
 */
const BUBBLE_POSITION: Record<InformativeTooltipArrow, string> = {
  right: 'right-[calc(100%+4px)] top-1/2 -translate-y-1/2',
  left: 'left-[calc(100%+4px)] top-1/2 -translate-y-1/2',
  bottom: 'bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2',
  top: 'top-[calc(100%+4px)] left-1/2 -translate-x-1/2',
};

/** Glifo real de Figma (node "Vector", path único) — apunta a la izquierda; se rota para las demás direcciones. */
function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 16" fill="none" className={className} aria-hidden="true">
      <path d="M0 8C4.41828 8 8 4.41828 8 0V16C8 11.5817 4.41828 8 0 8Z" fill="currentColor" />
    </svg>
  );
}

export function InformativeTooltip({ text, arrow = 'right', color = 'orange', children, className }: InformativeTooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const tooltipId = React.useId();

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={tooltipId}>{children}</span>
      <span
        role="tooltip"
        id={tooltipId}
        aria-hidden={!visible}
        className={cn(
          'pointer-events-none absolute z-10 inline-flex transition-[opacity,transform] duration-150 ease-out',
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          BUBBLE_POSITION[arrow],
          WRAPPER_LAYOUT[arrow],
        )}
      >
        <span className={cn('flex h-8 w-max max-w-[160px] shrink-0 items-center justify-center rounded-[8px] px-2', BUBBLE_BG[color])}>
          <span className="block w-full font-inter text-[14px] font-medium leading-[1.5] tracking-[0.14px] text-black">{text}</span>
        </span>
        <span className={cn('inline-flex shrink-0 items-center justify-center', ARROW_BOX[arrow])}>
          <ArrowGlyph className={cn('h-4 w-2', ARROW_COLOR[color], ARROW_ROTATION[arrow])} />
        </span>
      </span>
    </span>
  );
}

export default InformativeTooltip;
