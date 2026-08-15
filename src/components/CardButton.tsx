'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * CardButton — card cuadrada seleccionable con glifo + label (Figma › "Buttons" ›
 * "Card Button"). Patrón de "elegir nivel/opción", visto ya en el código de
 * `turbo/LevelSelector` y `iconic_memory/LevelSelectorScreen` (ahí sin este look).
 */
export interface CardButtonProps {
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CardButton({ label, icon, selected, onClick, className }: CardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex size-[208px] flex-col items-center justify-center gap-2 rounded-[8px] border-2 border-whitesmoke transition-colors',
        selected ? 'bg-orange' : 'bg-lightgray hover:bg-blue',
        className,
      )}
    >
      <span className="size-[136px] shrink-0">{icon}</span>
      <span className="font-shantell font-semibold text-[24px] tracking-[0.24px] text-black text-center whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}

export default CardButton;
