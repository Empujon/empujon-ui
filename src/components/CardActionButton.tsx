'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconChevronForward, IconCheckMark } from './designerIcons';

/** CardActionButton — banda de acción grande con ícono + label + chevron (Figma › "Buttons" › "Card Action Button"). */
export interface CardActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  /** Marca la acción como completada (fondo negro, texto blanco, check en vez de chevron). */
  complete?: boolean;
  variant?: 'white' | 'outline';
  onClick?: () => void;
  className?: string;
}

export function CardActionButton({ label, icon, complete, variant = 'white', onClick, className }: CardActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-24 w-full items-center gap-6 rounded-[20px] px-6 transition-colors',
        complete
          ? 'bg-black text-whitesmoke'
          : variant === 'outline'
            ? 'border-[3px] border-green bg-darker-gray text-green hover:border-transparent hover:bg-blue hover:text-black'
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
