'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * Switch — interruptor on/off (Figma › Settings › "Switch").
 *
 * Gap 100% nuevo, sin implementación previa en ningún repo. En Figma el track/knob es
 * una imagen distinta por cada combinación de State×On (8 SVGs); acá se reconstruye en
 * CSS puro decodificando el fill/stroke real de esos SVGs (no hay clases de Tailwind
 * en el código que exporta Figma para este componente, todo viene "quemado" en el asset):
 * off = fondo divider, knob blanco-100; on = fondo amarillo, knob negro-900; hover = knob
 * celeste (en cualquier estado); disabled = fondo gris-oscuro-700, knob divider; focus =
 * anillo celeste alrededor del track.
 */
export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onChange, label, disabled, className }: SwitchProps) {
  // OJO: un solo <button> para todo (track + label). `<button>` es un elemento
  // "labelable": envolverlo en <label> hace que el navegador reenvíe un click
  // sintético al botón además del click real, disparando onChange DOS veces por
  // click (prende y apaga en el mismo gesto -> "no funciona"). No envolver en <label>.
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'group inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span
        className={cn(
          'relative inline-flex h-4 w-8 shrink-0 items-center rounded-full border-2 transition-colors',
          'group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-blue',
          disabled ? 'bg-gray-700 border-gray-700' : checked ? 'bg-yellow border-yellow' : 'bg-divider border-divider',
        )}
      >
        <span
          className={cn(
            'inline-block size-3.5 rounded-full transition-transform',
            checked ? 'translate-x-4' : 'translate-x-0.5',
            disabled ? 'bg-divider' : checked ? 'bg-black group-hover:bg-blue' : 'bg-whitesmoke group-hover:bg-blue',
          )}
        />
      </span>
      {label && (
        <span className={cn('font-inter font-semibold text-[16px]', disabled ? 'text-divider' : 'text-whitesmoke')}>
          {label}
        </span>
      )}
    </button>
  );
}

export default Switch;
