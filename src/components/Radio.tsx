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
  /** Estado de validación (anillo/hover rojo). Se ignora si está marcado o deshabilitado. */
  error?: boolean;
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
  error = false,
  ariaLabel = 'Seleccionar',
  size = 'md',
  tone = 'orange',
  className,
}: RadioProps) {
  const sizeClasses = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
  const dotClasses = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

  let ringClasses: string;
  let dotColor: string;
  if (disabled) {
    // Sin clases de hover: el radio no reacciona al mouse, y el group-hover del
    // <label> que lo envuelve no debe filtrarse igual (no "se activa").
    ringClasses = 'border-divider bg-transparent';
    dotColor = 'bg-divider';
  } else if (tone === 'yellow') {
    if (checked) {
      ringClasses = 'border-yellow bg-transparent hover:border-blue group-hover:border-blue';
      dotColor = 'bg-black';
    } else {
      ringClasses = 'border-white bg-transparent hover:border-blue group-hover:border-blue';
      dotColor = 'bg-black';
    }
  } else if (checked) {
    // Al pasar el mouse sobre un radio ya marcado, el anillo y el punto pasan a
    // celeste ("selected hover" del Figma) en vez de quedarse en el tinte de marcado.
    ringClasses = 'border-orange bg-transparent hover:border-blue group-hover:border-blue';
    dotColor = 'bg-orange group-hover:bg-blue';
  } else {
    ringClasses = 'border-white bg-transparent hover:border-blue hover:bg-white/5 group-hover:border-blue';
    dotColor = 'bg-orange';
  }

  // El error es un estado de validación, no un tinte: sólo pisa el anillo a rojo en
  // reposo (sin marcar, habilitado) — el hover, el marcado y el hover-marcado se
  // comportan igual que el estado enabled.
  if (error && !checked && !disabled) {
    ringClasses = 'border-red bg-transparent hover:border-blue hover:bg-white/5 group-hover:border-blue';
  }

  const disabledClass =
    tone === 'yellow' ? 'disabled:cursor-default' : 'disabled:cursor-default disabled:opacity-50';

  return (
    <span className={cn('group relative inline-flex flex-shrink-0 items-center justify-center', sizeClasses, className)}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn('appearance-none rounded-full border-2 cursor-pointer transition-colors', disabledClass, sizeClasses, ringClasses)}
      />
      {checked && <span aria-hidden className={cn('pointer-events-none absolute rounded-full transition-colors', dotColor, dotClasses)} />}
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
    error: { control: 'boolean', label: 'Error', default: false },
  },
};
