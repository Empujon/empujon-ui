'use client';

// Choice — fila control + label clicable (diseño de encuesta/opciones).
//
// Compone <Checkbox> o <Radio> (tone yellow) con su label, y maneja el color
// del label por estado (blanco / azul en hover / muteado disabled). Toda la
// fila es clicable. Para el control pelado usá <Checkbox>/<Radio>.

import React from 'react';
import { cn } from '../lib/cn';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

export interface ChoiceProps {
  type: 'checkbox' | 'radio';
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
  /** Estado de validación (label + control en rojo). Se ignora si está marcado o deshabilitado. */
  error?: boolean;
  /** Requerido para agrupar radios (ignorado en checkbox). */
  name?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function Choice({
  type,
  checked,
  onChange,
  label,
  disabled = false,
  error = false,
  name = '',
  size = 'md',
  className,
}: ChoiceProps) {
  const labelColor = disabled
    ? 'text-divider'
    : error && !checked
      ? 'text-red'
      : 'text-white group-hover:text-blue';
  const cursor = disabled ? 'cursor-default' : 'cursor-pointer';

  return (
    <label className={cn('group inline-flex w-fit items-center gap-4 py-1', cursor, className)}>
      {type === 'radio' ? (
        <Radio checked={checked} onChange={onChange} name={name} disabled={disabled} error={error} ariaLabel={label} size={size} tone="yellow" />
      ) : (
        <Checkbox checked={checked} onChange={onChange} disabled={disabled} error={error} ariaLabel={label} size={size === 'md' ? 'md' : 'sm'} tone="yellow" />
      )}
      <span className={cn('font-inter font-semibold text-sm transition-colors', labelColor)}>{label}</span>
    </label>
  );
}

export default Choice;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const choiceBlockMeta: UiBlockMeta = {
  type: 'ui:choice',
  label: 'Opción (control + texto)',
  icon: 'ListChecks',
  exportName: 'Choice',
  childrenProp: 'label',
  controlled: { valueProp: 'checked', onChangeProp: 'onChange', initial: false },
  props: {
    label: { control: 'text', label: 'Texto', default: 'Opción', inline: true },
    type: { control: 'enum', label: 'Tipo', default: 'checkbox', options: ['checkbox', 'radio'] },
    size: { control: 'enum', label: 'Tamaño', default: 'md', options: ['sm', 'md'] },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
    error: { control: 'boolean', label: 'Error', default: false },
  },
};
