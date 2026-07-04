'use client';

// Input — campo de texto con la máquina de estados de Empujón.
//
// variant='neutral' (sistema nuevo): borde lgray / bg black / h-44 / rounded-16,
//   focus azul, error rojo, disabled muteado, readOnly (locked, legible).
// variant='default' (legacy /settings): Shantell, transparente, borde blanco.
//
// La clase `emp-placeholder-fill` la provee la app (globals.css) para forzar el
// color del placeholder frente al text-fill-color del defeat de autofill.

import React from 'react';
import { cn } from '../lib/cn';

type Variant = 'default' | 'neutral';

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  /** Locked: read-only pero con contenido visible. Variant 'neutral'. */
  readOnly?: boolean;
  /** Estado 'saved' legacy (/settings). Variant 'default'. */
  saved?: boolean;
  error?: string;
  disabled?: boolean;
  /** Texto bajo el campo (variant='neutral'). `error` tiene precedencia (rojo). */
  helper?: string;
  variant?: Variant;
  className?: string;
  maxLength?: number;
}

export function Input({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  readOnly = false,
  saved = false,
  error,
  disabled = false,
  helper,
  variant = 'default',
  className,
  maxLength,
}: InputProps) {
  if (variant === 'neutral') {
    let stateClass: string;
    if (disabled) {
      stateClass = 'border-2 border-transparent bg-darker-gray/50 text-darker-gray/50 placeholder:text-darker-gray/50 cursor-not-allowed';
    } else if (error) {
      stateClass = 'border-2 border-red bg-black text-white placeholder:text-divider emp-placeholder-fill focus:border-red';
    } else if (readOnly) {
      stateClass = 'border-2 border-transparent bg-black text-white cursor-default';
    } else {
      stateClass = 'border-2 border-lgray bg-black text-white placeholder:text-divider emp-placeholder-fill focus:border-blue';
    }
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <label className="font-inter font-bold text-white">{label}</label>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxLength}
          className={cn('w-full px-4 h-[44px] rounded-[16px] font-inter text-base focus:outline-none transition-colors', stateClass)}
          style={{
            WebkitTextFillColor: disabled ? undefined : '#E3F2E3',
            WebkitBoxShadow: disabled ? undefined : '0 0 0 1000px #171D17 inset',
          }}
        />
        {(error || helper) && (
          <p className={cn('font-inter text-xs', error ? 'text-red' : 'text-white')}>{error || helper}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-white text-sm font-semibold">
        {label}
        {error && <span className="text-magenta ml-2 font-normal">{error}</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        className={cn(
          'w-full px-4 py-1.5 border-2 rounded-2xl text-base font-shantell font-bold placeholder:font-shantell placeholder:text-white/70 placeholder:font-bold focus:outline-none transition-colors',
          error
            ? 'bg-transparent border-magenta text-white/70'
            : saved && value
              ? 'bg-white border-gray/50 text-black'
              : cn('bg-transparent focus:border-green', value ? 'text-white/70 border-blue' : 'text-white border-white'),
          readOnly && 'cursor-default opacity-70',
        )}
      />
    </div>
  );
}

export default Input;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const inputBlockMeta: UiBlockMeta = {
  type: 'ui:input',
  label: 'Campo de texto',
  icon: 'TextCursorInput',
  exportName: 'Input',
  controlled: { valueProp: 'value', onChangeProp: 'onChange', initial: '' },
  props: {
    label: { control: 'text', label: 'Etiqueta', default: 'Etiqueta' },
    placeholder: { control: 'text', label: 'Placeholder', default: 'Escribí…' },
    variant: { control: 'enum', label: 'Estilo', default: 'neutral', options: ['neutral', 'default'] },
    helper: { control: 'text', label: 'Texto de ayuda', default: '' },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
  },
};
