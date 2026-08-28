'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * SquareButton — Figma › "Buttons" › "Square Button" (node 5767:33486). Tiene DOS
 * layouts, elegidos automáticamente según haya `icon` o no — medidos 1:1 contra los
 * 8 nodos del component set (2 types × 4 states):
 *
 * - Sin `icon` ("Type=Text Only"): tile grande centrada de 390×120, texto centrado.
 *   Default = bg naranja · Hover = bg celeste · Active(`selected`) = bg naranja +
 *   borde celeste · Disabled = sin fondo, borde+texto divider.
 * - Con `icon` ("Type=With Icon"): fila compacta de 390px, ícono + label a la izq.
 *   Default = bg gris-claro-200 · Hover = bg celeste (+ label subrayado wavy) ·
 *   Active(`selected`) = bg gris-claro-200 + borde celeste · Disabled = sin fondo,
 *   borde+texto divider.
 *
 * `selected` mapea al estado "Active" de Figma (borde celeste persistente) — no es
 * el `:active` real del navegador, es una selección que el consumidor controla
 * (ej. elegir un método de ingreso entre varias Square Button).
 */
export interface SquareButtonProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SquareButton({ label, description, icon, selected, disabled, onClick, className }: SquareButtonProps) {
  const hasIcon = Boolean(icon);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'group flex w-[390px] rounded-[24px] border-[3px] p-4 text-left transition-colors duration-200 ease-in-out',
        hasIcon ? 'items-center gap-[15px]' : 'h-[120px] flex-col items-center justify-center gap-2 text-center',
        disabled
          ? 'border-divider text-divider'
          : cn(
              'text-black',
              selected ? 'border-blue' : 'border-transparent',
              hasIcon
                ? selected
                  ? 'bg-lightgray'
                  : 'bg-lightgray enabled:hover:bg-blue'
                : selected
                  ? 'bg-orange'
                  : 'bg-orange enabled:hover:bg-blue',
            ),
        className,
      )}
    >
      {icon && <span className="size-11 shrink-0">{icon}</span>}
      <div className={cn('flex flex-col gap-1', hasIcon ? 'flex-1 items-start' : 'items-center')}>
        <span
          className={cn(
            'font-shantell font-semibold',
            hasIcon
              ? 'text-[20px] decoration-[15%] decoration-wavy group-enabled:group-hover:underline'
              : 'text-[24px] tracking-[0.24px]',
          )}
        >
          {label}
        </span>
        {description && (
          <span className={cn('font-inter font-semibold text-[16px] tracking-[0.16px]', !hasIcon && 'w-[320px]')}>
            {description}
          </span>
        )}
      </div>
    </button>
  );
}

export default SquareButton;
