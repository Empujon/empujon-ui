'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * CardButton — "Illustration Button" en Figma (› "Buttons" › "Illustration Button",
 * node 7674:3715): card cuadrada de 328px con un ícono/ilustración grande y label
 * opcional debajo. Estados medidos 1:1 contra los 4 nodos del component set:
 *
 * - Enabled  (7674:3714): fondo whitesmoke, borde negro, sombra `shadow-primaria`.
 * - Hover    (7674:3713): fondo celeste, borde negro (sin cambio), sombra `shadow-celeste`.
 * - Active   (7674:3711): fondo whitesmoke (vuelve al default), borde celeste, sombra `shadow-celeste`.
 * - Disabled (7674:3712): fondo gris-oscuro-800, borde divider (gris-500), sombra `shadow-primaria`.
 *
 * Sin variante "seleccionado" — a diferencia de SquareButton, este set de Figma
 * no tiene un estado persistente de selección, solo interacción real (hover/active).
 */
export interface CardButtonProps {
  label?: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CardButton({ label, icon, disabled, onClick, className }: CardButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex size-[328px] flex-col items-center justify-center gap-4 overflow-hidden rounded-card border-2 shadow-primaria transition-colors duration-200 ease-in-out active:duration-[0ms]',
        disabled
          ? 'border-divider bg-darker-gray'
          : 'border-black bg-whitesmoke enabled:hover:bg-blue enabled:hover:shadow-celeste enabled:active:border-blue enabled:active:bg-whitesmoke enabled:active:shadow-celeste',
        className,
      )}
    >
      <span className="size-[240px] shrink-0">{icon}</span>
      {label && (
        <span
          className={cn(
            'whitespace-nowrap text-center font-shantell text-[24px] font-semibold tracking-[0.24px]',
            disabled ? 'text-divider' : 'text-black',
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default CardButton;
