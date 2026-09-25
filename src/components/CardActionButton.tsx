'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCamera, IconCheckBadge, IconChevronForward } from './designerIcons';

/**
 * CardActionButton — banda de acción grande con ícono + label + chevron (Figma ›
 * "Buttons" › "Card Action Button", node 3473:7704). 6 estados medidos 1:1:
 *
 * - Filled: Default = bg whitesmoke/texto negro · Hover = bg celeste/texto negro
 *   (sin cambio) · Complete = bg negro, texto whitesmoke, check.
 * - Outline: el fondo es SIEMPRE gris-oscuro-800 en sus 3 estados — solo cambian
 *   borde y texto. Default = borde/texto naranja · Hover = borde/texto celeste ·
 *   Complete = borde/texto divider (gris-500), sin hover propio (estado terminal).
 *
 * `icon` trae un ícono default (cámara, igual que la instancia default de Figma)
 * para que el slot de ícono nunca se vea vacío — pasá tu propio ReactNode para
 * reemplazarlo, o `icon={null}` para ocultarlo.
 */
export interface CardActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  /**
   * Diferencia entre "Enabled" (default, `complete=false`) y "Complete":
   * - Enabled: la acción todavía no se hizo — es clickeable, tiene hover, y
   *   termina en un chevron (">") que invita a entrar/ejecutarla.
   * - Complete: la acción YA se completó — queda fija (sin hover propio) con
   *   una insignia de check verde al final en vez del chevron, como registro
   *   visual de que no hace falta volver a tocarla.
   */
  complete?: boolean;
  variant?: 'white' | 'outline';
  onClick?: () => void;
  className?: string;
}

export function CardActionButton({
  label,
  icon = <IconCamera className="size-full" />,
  complete,
  variant = 'white',
  onClick,
  className,
}: CardActionButtonProps) {
  const outline = variant === 'outline';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-24 w-full max-w-[664px] items-center gap-6 rounded-[20px] px-6 transition-colors duration-200 ease-in-out',
        outline
          ? complete
            ? 'border-[3px] border-divider bg-darker-gray text-divider'
            : 'border-[3px] border-orange bg-darker-gray text-whitesmoke hover:border-blue hover:text-blue'
          : complete
            ? 'bg-black text-whitesmoke'
            : 'bg-whitesmoke text-black hover:bg-blue',
        className,
      )}
    >
      {icon && <span className="size-11 shrink-0">{icon}</span>}
      <span className="flex-1 text-left font-inter font-semibold text-[24px] tracking-[0.24px]">{label}</span>
      {complete ? <IconCheckBadge className="size-8" /> : <IconChevronForward className="size-8 shrink-0" />}
    </button>
  );
}

export default CardActionButton;
