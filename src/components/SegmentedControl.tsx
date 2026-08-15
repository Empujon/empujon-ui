'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * SegmentedControl — selector de opción única en formato píldora (Figma › Settings ›
 * "Toggle"/"ToggleOption"). Renombrado para no confundirse con `Switch` (que en el uso
 * diario también se le dice "toggle") — la nomenclatura normalizada vive en los nombres
 * de variante de Figma, no en el nombre del componente en código.
 *
 * Gap 100% nuevo. Figma solo define 2 opciones (ej. "MAYÚSCULA"/"Minúscula") pero el
 * patrón generaliza limpio a N — `options` es un array abierto.
 *
 * Indicador negro con borde blanco-100, opciones separadas por un divisor blanco-100;
 * la opción activa tiene fondo blanco-100 + texto negro-900, hover (no-activa) fondo
 * celeste + texto negro-900.
 */
export interface SegmentedOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  /** Etiqueta a la izquierda del control, ej. "Tipo de letra". */
  label?: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function SegmentedControl({ label, options, value, onChange, disabled, className }: SegmentedControlProps) {
  return (
    <div className={cn('inline-flex items-center gap-6', className)}>
      {label && (
        <span className={cn('font-inter font-semibold text-[16px] tracking-[0.16px]', disabled ? 'text-divider' : 'text-whitesmoke')}>
          {label}
        </span>
      )}
      <div
        role="radiogroup"
        aria-label={label}
        className="inline-flex h-10 items-center overflow-clip rounded-[200px] border-2 border-whitesmoke bg-black divide-x-2 divide-whitesmoke"
      >
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex items-center justify-center gap-2.5 h-full px-4 font-inter font-semibold text-[14px] tracking-[0.14px] whitespace-nowrap transition-colors',
                disabled && 'cursor-not-allowed',
                isSelected
                  ? 'bg-whitesmoke text-black'
                  : 'bg-transparent text-lightgray hover:bg-blue hover:text-black',
              )}
            >
              {option.icon}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedControl;
