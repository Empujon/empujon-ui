'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconForwardIcon } from './designerIcons';

/**
 * AccessCard — fila de acceso rápido a una sección, título + descripción +
 * botón circular de avance (Figma › "Cards" › "Access Card", node 7701:1033).
 * NO es la misma card que Image Card — layout de fila con texto, sin imagen
 * (un comentario viejo en ImageCard.tsx decía lo contrario; ya corregido ahí).
 *
 * `background`: eje real de Figma, no cosmético — "empty" es para usar sobre
 * secciones que ya son oscuras/vacías (la card se distingue solo por un borde
 * inferior); "filled" es para usar sobre fondos vacíos (la card trae su
 * propio fondo, sin borde). Los 32 de altura del ejemplo de Figma vienen de
 * este eje, no de una preferencia estética libre.
 *
 * Hover es interacción real (`hover:`/`group-hover:`) — mismo criterio que el
 * resto de la familia Cards. El título cambia de Inter a Shantell + subrayado
 * wavy en hover, igual patrón que el variant `ghost` de Button.
 */
export interface AccessCardProps {
  title?: string;
  description?: string;
  background?: 'empty' | 'filled';
  onClick?: () => void;
  className?: string;
}

export function AccessCard({
  title = 'Nombre de la sección',
  description = 'Descripción de la sección en no más de 2 líneas',
  background = 'empty',
  onClick,
  className,
}: AccessCardProps) {
  const isFilled = background === 'filled';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-[328px] items-center gap-4 rounded-card p-4 text-left transition-colors duration-200 ease-in-out',
        isFilled ? 'bg-darker-gray hover:bg-gray-700' : 'border-b-[3px] border-black hover:bg-darker-gray',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="font-inter font-semibold text-[20px] leading-[1.3] text-orange group-hover:text-blue group-hover:underline group-hover:decoration-wavy">
          {title}
        </span>
        <span className="font-inter font-semibold text-[16px] tracking-[0.16px] text-lightgray">{description}</span>
      </div>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange group-hover:bg-blue">
        <IconForwardIcon className="size-6 text-black" />
      </span>
    </button>
  );
}

export default AccessCard;
