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
  name = '',
  size = 'md',
  className,
}: ChoiceProps) {
  const labelColor = disabled ? 'text-divider' : 'text-white group-hover:text-blue';
  const cursor = disabled ? 'cursor-default' : 'cursor-pointer';

  return (
    <label className={cn('group inline-flex w-fit items-center gap-4 py-1', cursor, className)}>
      {type === 'radio' ? (
        <Radio checked={checked} onChange={onChange} name={name} disabled={disabled} ariaLabel={label} size={size} tone="yellow" />
      ) : (
        <Checkbox checked={checked} onChange={onChange} disabled={disabled} ariaLabel={label} size={size === 'md' ? 'md' : 'sm'} tone="yellow" />
      )}
      <span className={cn('font-inter font-semibold text-sm transition-colors', labelColor)}>{label}</span>
    </label>
  );
}

export default Choice;
