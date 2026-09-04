'use client';

import React, { useId } from 'react';
import { cn } from '../lib/cn';

/**
 * Slider — control de rango (Figma › Settings › "Slider", Type=Single|Range).
 *
 * Gap 100% nuevo: no existe ninguna implementación previa en ningún repo de Empujón
 * (a diferencia de EmotionSelector/Countdown/ProgressBar de la Fase 1). Construido 1:1
 * contra el código+SVGs reales de Figma, sin referencia de producción para comparar —
 * conviene probarlo bien en Storybook antes de que alguna app lo adopte.
 *
 * `value`/`onChange` son `number` en modo simple y `[number, number]` en modo rango
 * (dos <input type="range"> nativos superpuestos, técnica estándar de doble-thumb).
 */
type SliderSingleProps = {
  range?: false;
  value: number;
  onChange: (value: number) => void;
};

type SliderRangeProps = {
  range: true;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export type SliderProps = (SliderSingleProps | SliderRangeProps) & {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  /** Unidad mostrada junto al valor en el badge, ej. "ppm". */
  unit?: string;
  disabled?: boolean;
  className?: string;
};

const thumbClasses =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:rounded-full ' +
  '[&::-webkit-slider-thumb]:bg-orange [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer ' +
  '[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange [&::-moz-range-thumb]:border-0 ' +
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer ' +
  'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-blue focus-visible:[&::-moz-range-thumb]:ring-2';

export function Slider(props: SliderProps) {
  const { label, min = 0, max = 100, step = 1, unit, disabled, className } = props;
  const id = useId();
  const isRange = props.range === true;
  const [lo, hi] = isRange ? props.value : [min, props.value];
  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  return (
    <div className={cn('flex flex-col gap-2 w-full max-w-[680px]', className)}>
      <div className="flex gap-4 items-center w-full">
        <label
          htmlFor={id}
          className={cn('flex-1 text-[16px] font-inter font-semibold', disabled ? 'text-divider' : 'text-whitesmoke')}
        >
          {label}
        </label>
        <div className="flex items-center gap-0.5 shrink-0 rounded-chico bg-black p-2 text-[14px] font-inter font-semibold whitespace-nowrap">
          <span className={disabled ? 'text-divider' : 'text-yellow'}>{isRange ? lo : hi}</span>
          {isRange && (
            <>
              <span className="text-lightgray">-</span>
              <span className={disabled ? 'text-divider' : 'text-yellow'}>{hi}</span>
            </>
          )}
          {unit && <span className="text-lightgray">{unit}</span>}
        </div>
      </div>

      <div className="relative h-6 w-full flex items-center">
        <div className="absolute inset-x-0 h-2 rounded-pill bg-divider" />
        <div
          className={cn('absolute h-2 rounded-pill', disabled ? 'bg-gray-700' : 'bg-yellow')}
          style={{ left: `${isRange ? loPct : 0}%`, width: `${hiPct - (isRange ? loPct : 0)}%` }}
        />
        {isRange && (
          <input
            type="range"
            aria-label={`${label} (mínimo)`}
            min={min}
            max={max}
            step={step}
            value={lo}
            disabled={disabled}
            onChange={(e) => props.onChange([Math.min(Number(e.target.value), hi), hi])}
            className={cn(
              'absolute inset-x-0 h-6 w-full appearance-none bg-transparent pointer-events-none disabled:cursor-not-allowed',
              thumbClasses,
            )}
          />
        )}
        <input
          id={id}
          type="range"
          aria-label={isRange ? `${label} (máximo)` : label}
          min={min}
          max={max}
          step={step}
          value={hi}
          disabled={disabled}
          onChange={(e) =>
            isRange
              ? props.onChange([lo, Math.max(Number(e.target.value), lo)])
              : props.onChange(Number(e.target.value))
          }
          className={cn(
            'absolute inset-x-0 h-6 w-full appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed',
            isRange && 'pointer-events-none',
            thumbClasses,
          )}
        />
      </div>

      <div className={cn('flex justify-between text-[14px] font-inter font-semibold w-full', disabled ? 'text-divider' : 'text-whitesmoke')}>
        <span>{isRange ? `Mín: ${min}` : min}</span>
        <span>{isRange ? `Máx: ${max}` : max}</span>
      </div>
    </div>
  );
}

export default Slider;
