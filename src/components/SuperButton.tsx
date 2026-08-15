'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * SuperButton — card de acción destacada, ancho fijo (Figma › "Special shape" ›
 * "Super Button"). `variant="gradient"` usa el gradiente de marca (`bg-gradient-empujon`,
 * ver tokens.json) con texto claro; `variant="flat"` es la versión sobre superficie
 * clara (gris-300 → celeste hover) que Figma llama "Teachers"/"Students" — mismo look,
 * distinto contenido, así que se generaliza a una sola variante.
 */
export interface SuperButtonProps {
  label: string;
  icon: React.ReactNode;
  variant?: 'gradient' | 'flat';
  onClick?: () => void;
  className?: string;
}

export function SuperButton({ label, icon, variant = 'gradient', onClick, className }: SuperButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-[390px] items-center gap-4 overflow-hidden rounded-[24px] p-4 text-left transition-colors',
        variant === 'gradient'
          ? 'border-2 border-orange bg-gradient-empujon text-whitesmoke hover:border-transparent hover:bg-[rgba(253,245,42,0.1)]'
          : 'bg-lgray text-black hover:bg-blue',
        className,
      )}
    >
      <span className="size-11 shrink-0">{icon}</span>
      <span className="font-shantell font-semibold text-[20px] underline decoration-wavy decoration-[15%]">{label}</span>
    </button>
  );
}

export default SuperButton;
