'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * Estampita — card chica seleccionable tipo "ficha" (Figma › "Buttons" › "Estampita",
 * variantes curso/agregar/profesores). Se generaliza a icon+label; el estilo puntual
 * de cada variante (curso/agregar/profesores) queda a cargo del ícono que pasa el
 * consumidor.
 */
export interface EstampitaProps {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Estampita({ label, icon, disabled, onClick, className }: EstampitaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-[120px] flex-col items-center gap-2 rounded-2xl bg-darker-gray p-3 transition-colors',
        disabled ? 'opacity-40 cursor-not-allowed' : 'enabled:hover:bg-blue',
        className,
      )}
    >
      <span className="flex h-[120px] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
        {icon}
      </span>
      <span className={cn('font-inter font-semibold text-[14px] text-center', disabled ? 'text-divider' : 'text-whitesmoke')}>
        {label}
      </span>
    </button>
  );
}

export default Estampita;
