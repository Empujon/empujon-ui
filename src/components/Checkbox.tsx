'use client';

// Checkbox — checkbox estilo Empujón (cuadrado o redondo).
//
// Relleno con checkmark negro inline al marcar. Renderiza SOLO el control;
// para fila control+label usá <Choice>.

import React from 'react';
import { cn } from '../lib/cn';
import { CHECKBOX_CHECK_MASK_SVG } from './designerIcons';

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  /** Estado de validación (borde/hover rojo). Se ignora si está marcado o deshabilitado. */
  error?: boolean;
  ariaLabel?: string;
  size?: 'xs' | 'sm' | 'md';
  /** Tinte del estado marcado. */
  tone?: 'blue' | 'orange' | 'yellow';
  /** Forma: `square` (default) o `round` (lee como radio en single-select). */
  shape?: 'square' | 'round';
  className?: string;
}

// El check real de Figma (node 6777:1780) es UN cuadrado redondeado con el tilde
// recortado adentro (boolean subtract) — no un trazo separado. Se aplica como CSS
// mask sobre el propio fondo de color del input, así el "agujero" del tilde deja
// ver lo que hay detrás en vez de simularlo con un ícono superpuesto.
const CHECK_MASK_URL = `url("data:image/svg+xml,${CHECKBOX_CHECK_MASK_SVG}")`;

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  error = false,
  ariaLabel = 'Seleccionar',
  size = 'md',
  tone = 'blue',
  shape = 'square',
  className,
}: CheckboxProps) {
  const roundedClass =
    shape === 'round' ? 'rounded-full' : size === 'md' ? 'rounded-[10px]' : 'rounded-[6px]';
  const sizeBoxClass = size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-7 h-7' : 'w-11 h-11';

  let stateClasses: string;
  if (disabled) {
    // Sin clases de hover: el checkbox no reacciona al mouse, y el group-hover
    // del <label> que lo envuelve no debe filtrarse igual (no "se activa").
    stateClasses = checked ? 'border-divider bg-divider' : 'border-divider bg-transparent';
  } else if (tone === 'yellow') {
    if (checked) {
      stateClasses = 'border-yellow bg-yellow hover:border-blue group-hover:border-blue';
    } else {
      stateClasses = 'border-white bg-transparent hover:border-blue group-hover:border-blue';
    }
  } else if (checked) {
    // Al pasar el mouse sobre un checkbox ya marcado, el relleno pasa a celeste
    // ("hover selected" del Figma) en vez de quedarse en el tinte de marcado.
    stateClasses =
      tone === 'orange'
        ? 'border-orange bg-orange hover:border-blue hover:bg-blue group-hover:border-blue group-hover:bg-blue'
        : 'border-blue bg-blue';
  } else {
    stateClasses = 'border-white bg-transparent hover:border-blue hover:bg-white/5 group-hover:border-blue';
  }

  // El error (Figma node 7287:2903) es un estado de validación, no un tinte: sólo
  // pisa el borde a rojo en reposo (sin marcar, habilitado) — el hover, el marcado
  // y el hover-marcado se comportan igual que el estado enabled.
  if (error && !checked && !disabled) {
    stateClasses = 'border-red bg-transparent hover:border-blue hover:bg-white/5 group-hover:border-blue';
  }

  const disabledClass =
    tone === 'yellow' ? 'disabled:cursor-default' : 'disabled:cursor-default disabled:opacity-50';

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn('appearance-none flex-shrink-0 cursor-pointer transition-colors border-2', roundedClass, sizeBoxClass, disabledClass, stateClasses, className)}
      style={
        checked
          ? ({
              WebkitMaskImage: CHECK_MASK_URL,
              maskImage: CHECK_MASK_URL,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
            } as React.CSSProperties)
          : undefined
      }
    />
  );
}

export default Checkbox;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const checkboxBlockMeta: UiBlockMeta = {
  type: 'ui:checkbox',
  label: 'Checkbox',
  icon: 'SquareCheck',
  exportName: 'Checkbox',
  controlled: { valueProp: 'checked', onChangeProp: 'onChange', initial: false },
  props: {
    tone: { control: 'enum', label: 'Color', default: 'blue', options: ['blue', 'orange', 'yellow'] },
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['xs', 'sm', 'md'] },
    shape: { control: 'enum', label: 'Forma', default: 'square', options: ['square', 'round'] },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
    error: { control: 'boolean', label: 'Error', default: false },
  },
};
