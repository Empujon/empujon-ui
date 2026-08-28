'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconChevronForward, IconCheckMark } from './designerIcons';

/**
 * CardActionButton — banda de acción grande con ícono + label + chevron (Figma ›
 * "Buttons" › "Card Action Button", node 3473:7704). 6 estados medidos 1:1:
 *
 * - Filled: Default = bg whitesmoke/texto negro · Hover = bg celeste/texto negro
 *   (sin cambio) · Complete = bg negro, texto whitesmoke, check.
 * - Outline: el fondo es SIEMPRE gris-oscuro-800 en sus 3 estados — solo cambian
 *   borde y texto. Default = borde/texto naranja · Hover = borde/texto celeste ·
 *   Complete = borde/texto divider (gris-500), sin hover propio (estado terminal).
 */
export interface CardActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  /** Marca la acción como completada (check en vez de chevron; color según variant). */
  complete?: boolean;
  variant?: 'white' | 'outline';
  onClick?: () => void;
  className?: string;
}

export function CardActionButton({ label, icon, complete, variant = 'white', onClick, className }: CardActionButtonProps) {
  const outline = variant === 'outline';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-24 w-full items-center gap-6 rounded-[20px] px-6 transition-colors duration-200 ease-in-out',
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
      {complete ? <IconCheckMark className="size-8 shrink-0" /> : <IconChevronForward className="size-8 shrink-0" />}
    </button>
  );
}

export default CardActionButton;
