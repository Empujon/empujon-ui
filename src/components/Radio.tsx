'use client';

// Radio — radio button estilo Empujón (solo el círculo).
//
// Variante circular del Checkbox: borde blanco en reposo, relleno con punto
// interno al seleccionar. Renderiza SOLO el círculo para que el consumidor
// componga la fila (icono + texto). Para fila control+label usá <Choice>.

import React from 'react';
import { cn } from '../lib/cn';

export interface RadioProps {
  checked: boolean;
  onChange: () => void;
  /** Requerido para agrupar radios (navegación por teclado). */
  name: string;
  disabled?: boolean;
  ariaLabel?: string;
  size?: 'sm' | 'md';
  /** Tinte del estado seleccionado. `yellow` = diseño de encuesta/opciones. */
  tone?: 'orange' | 'yellow';
  className?: string;
}

export function Radio({
  checked,
  onChange,
  name,
  disabled = false,
  ariaLabel = 'Seleccionar',
  size = 'md',
  tone = 'orange',
  className,
}: RadioProps) {
  const sizeClasses = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
  const dotClasses = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

  let ringClasses: string;
  let dotColor: string;
  if (tone === 'yellow') {
    if (disabled) {
      ringClasses = 'border-divider bg-transparent';
      dotColor = 'bg-divider';
    } else if (checked) {
      ringClasses = 'border-yellow bg-transparent hover:border-blue group-hover:border-blue';
      dotColor = 'bg-black';
    } else {
      ringClasses = 'border-white bg-transparent hover:border-blue group-hover:border-blue';
      dotColor = 'bg-black';
    }
  } else {
    ringClasses = checked
      ? 'border-orange bg-transparent'
      : 'border-white bg-transparent hover:bg-white/5';
    dotColor = 'bg-orange';
  }
  const disabledClass =
    tone === 'yellow' ? 'disabled:cursor-default' : 'disabled:cursor-default disabled:opacity-50';

  return (
    <span className={cn('relative inline-flex flex-shrink-0 items-center justify-center', sizeClasses, className)}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn('appearance-none rounded-full border-2 cursor-pointer transition-colors', disabledClass, sizeClasses, ringClasses)}
      />
      {checked && <span aria-hidden className={cn('pointer-events-none absolute rounded-full', dotColor, dotClasses)} />}
    </span>
  );
}

export default Radio;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const radioBlockMeta: UiBlockMeta = {
  type: 'ui:radio',
  label: 'Radio',
  icon: 'CircleDot',
  exportName: 'Radio',
  controlled: { valueProp: 'checked', onChangeProp: 'onChange', initial: false },
  props: {
    name: { control: 'text', label: 'Grupo (name)', default: 'grupo' },
    tone: { control: 'enum', label: 'Color', default: 'orange', options: ['orange', 'yellow'] },
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['sm', 'md'] },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
  },
};
