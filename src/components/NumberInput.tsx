'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconPlus, IconMinus } from './designerIcons';

/**
 * NumberInput — stepper numérico +/- (Figma › Settings › "Number input").
 *
 * Gap 100% nuevo, sin implementación previa en ningún repo. Usa los glifos +/- reales
 * de Figma (antes eran texto `+`/`−` — corregido) — el hover solo cambia el fondo del
 * botón a celeste, el glifo no cambia de color (queda claro sobre celeste igual).
 */
export interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  /** Se concatena directo al valor, ej. value=24 + unit="p" -> "24p" (así lo muestra Figma). */
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function NumberInput({
  label,
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  unit,
  onChange,
  disabled,
  className,
}: NumberInputProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const canDecrease = !disabled && value - step >= min;
  const canIncrease = !disabled && value + step <= max;

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <span className={cn('font-inter font-semibold text-[16px] tracking-[0.16px]', disabled ? 'text-divider' : 'text-whitesmoke')}>
        {label}
      </span>
      <div className="inline-flex items-center overflow-clip rounded-pill border-2 border-lightgray bg-black shrink-0">
        <button
          type="button"
          aria-label="Disminuir"
          disabled={!canDecrease}
          onClick={() => onChange(clamp(value - step))}
          className="flex size-10 items-center justify-center text-lightgray enabled:hover:bg-blue disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IconMinus className="size-3" />
        </button>
        <span className="flex h-10 items-center justify-center border-x-2 border-whitesmoke px-4 font-inter font-semibold text-[14px] tracking-[0.14px] text-yellow whitespace-nowrap">
          {value}
          {unit}
        </span>
        <button
          type="button"
          aria-label="Aumentar"
          disabled={!canIncrease}
          onClick={() => onChange(clamp(value + step))}
          className="flex size-10 items-center justify-center text-lightgray enabled:hover:bg-blue disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <IconPlus className="size-5" />
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
