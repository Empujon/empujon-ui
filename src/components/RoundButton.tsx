'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * RoundButton — Figma › "Buttons" › "Round Button" (node 6731:956). Círculo con
 * ícono; en hover se expande a pill mostrando el label (medido en los 4 nodos:
 * Default/Hover × Small(32px)/Medium(44px)).
 *
 * Default: bg gris-oscuro-800, ícono 24px centrado, SIN label visible.
 * Hover: bg celeste, texto negro, el botón crece a ancho automático para mostrar
 * el label (Inter Semibold 16px). El padding difere apenas por tamaño en Figma —
 * small es asimétrico (8px izq / 16px der), medium es simétrico (16px ambos) —
 * de ahí el `size === 'sm'` puntual más abajo.
 *
 * `size-8`/`size-11` fijan el diámetro por default; en hover una clase `w-auto`
 * (mayor especificidad por el pseudo-elemento) gana sobre ese `width` fijo para
 * que el botón pueda crecer sin tocar el alto.
 */
export interface RoundButtonProps {
  icon: React.ReactNode;
  label?: string;
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export function RoundButton({ icon, label, size = 'sm', onClick, className }: RoundButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={cn(
        'group inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill bg-darker-gray text-whitesmoke transition-colors duration-200 ease-in-out hover:bg-blue hover:text-black',
        size === 'sm' ? 'size-8' : 'size-11',
        label && (size === 'sm' ? 'hover:w-auto hover:pl-2 hover:pr-4' : 'hover:w-auto hover:pl-4 hover:pr-4'),
        className,
      )}
    >
      <span className="size-6 shrink-0">{icon}</span>
      {label && (
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-inter font-semibold text-[16px] tracking-[0.16px] opacity-0 transition-all duration-200 group-hover:max-w-[200px] group-hover:opacity-100">
          {label}
        </span>
      )}
    </button>
  );
}

export default RoundButton;
