'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCloseX } from './designerIcons';

/**
 * Tag — chip interactivo y cerrable del sistema de diseño.
 *
 * Fiel al Figma "SISTEMA DE DISEÑO" › sección "Tag" (component set, node
 * 7671:5802): `Size` (S/L) × `Variant` (Action/Informative) × `Status`
 * (Enabled/Hover/Focus/Pressed — solo aplica a `variant="action"`).
 *
 * `variant="action"` es el tag interactivo: fondo gris oscuro con borde
 * claro por default, celeste al pasar el mouse, borde celeste al enfocar,
 * naranja al presionar — con una X de cierre siempre visible. Componente
 * aparte de StatusLabel (que cubre el caso puramente informativo con status
 * semántico) — ver memoria del proyecto.
 * `variant="informative"` es estático dentro de este mismo component set:
 * fondo blanco, texto negro, sin estados ni cierre.
 *
 * Estados vía CSS real (`hover:`/`active:`/`focus-visible:`), no un prop de
 * estado — mismo criterio que IconButton. El botón de cerrar es un
 * `<button>` real anidado en un `<span role="button">` (nunca dentro de
 * otro `<button>`), así que siempre queda accesible por su cuenta.
 */
export interface TagProps {
  children: React.ReactNode;
  size?: 's' | 'l';
  variant?: 'action' | 'informative';
  /** Ícono opcional a la izquierda del texto (INSTANCE_SWAP en Figma). */
  icon?: React.ReactNode;
  onClick?: () => void;
  onClose?: () => void;
  className?: string;
}

const ICON_SIZE = { s: 'size-4', l: 'size-6' } as const;
// Cruz de cerrar: estándar fijo de la librería para TODO componente (no solo
// Tag) — IconCloseX a size-3.5 (14px) dentro de una caja de size-6 (24px).
// Ver memoria del proyecto: figma-icon-hitbox-sizing (medido en Figma sobre
// Interactive Tooltip, aplicado acá por consistencia, no vuelto a medir).
const CLOSE_HIT_SIZE = 'size-6';
const CLOSE_GLYPH_SIZE = 'size-3.5';

// Padding horizontal medido nodo por nodo en Figma (x/width de cada capa),
// no estimado. Es igual para S y L en "action" (16px borde→texto, 4px
// texto→cruz, 8px cruz→borde) — solo cambia con "informative" y ahí SÍ
// difiere S de L en su propio archivo (asimetría real medida, no un typo
// nuestro). Ver Tag.stories.tsx / conversación 2026-08-27.
const CONTAINER_PADDING = {
  action: { s: 'pl-4 pr-2', l: 'pl-4 pr-2' },
  informative: { s: 'px-3', l: 'pl-4 pr-3' },
} as const;

export function Tag({
  children,
  size = 's',
  variant = 'action',
  icon,
  onClick,
  onClose,
  className,
}: TagProps) {
  const isAction = variant === 'action';
  const interactive = isAction && Boolean(onClick || onClose);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (!interactive || !onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <span
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full font-inter transition-colors duration-150 ease-in-out',
        'focus-visible:outline-none',
        'gap-1',
        CONTAINER_PADDING[variant][size],
        size === 's'
          ? 'h-8 text-sm font-medium tracking-[0.14px]'
          : 'h-11 text-base font-semibold tracking-[0.16px]',
        isAction
          ? cn(
              size === 's' ? 'border' : 'border-2',
              'cursor-pointer border-lightgray bg-darker-gray text-whitesmoke',
              'hover:border-black hover:bg-blue hover:text-black',
              'active:border-black active:bg-orange active:text-black',
              'focus-visible:border-blue',
            )
          : 'bg-whitesmoke text-black',
        className,
      )}
    >
      {icon && <span className={cn('shrink-0', ICON_SIZE[size])}>{icon}</span>}
      <span className="leading-[1.5]">{children}</span>
      {isAction && (onClose ? (
        <button
          type="button"
          aria-label="Cerrar"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className={cn(
            'inline-flex shrink-0 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue',
            CLOSE_HIT_SIZE,
          )}
        >
          <IconCloseX className={CLOSE_GLYPH_SIZE} />
        </button>
      ) : (
        <span className={cn('inline-flex shrink-0 items-center justify-center', CLOSE_HIT_SIZE)}>
          <IconCloseX className={CLOSE_GLYPH_SIZE} />
        </span>
      ))}
    </span>
  );
}

export default Tag;
