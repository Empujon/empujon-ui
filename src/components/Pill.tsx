'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCloseX } from './designerIcons';

/**
 * Pill — chip de estado con cierre opcional (Figma › "Pill"). Es el "Notification
 * Pill" que aparece en el encabezado de cada página del sistema de diseño.
 *
 * Distinto de `Badge` (que ya existe, pensado como etiqueta/tag de color plano):
 * Pill tiene su propio eje background(negro/gris-oscuro) × tamaño × status
 * (none/success/error, con punto + texto del mismo color) × botón de cerrar. No se
 * tocó `Badge` para no arriesgar a quien ya lo consume.
 */
export interface PillProps {
  children: React.ReactNode;
  background?: 'black' | 'dark-grey';
  size?: 'sm' | 'lg';
  status?: 'none' | 'success' | 'error';
  onClose?: () => void;
  disabled?: boolean;
  className?: string;
}

const statusColor = {
  none: 'text-whitesmoke',
  success: 'text-green',
  error: 'text-red',
} as const;

const dotColor = {
  none: '',
  success: 'bg-green',
  error: 'bg-red',
} as const;

export function Pill({ children, background = 'black', size = 'sm', status = 'none', onClose, disabled, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-3xl font-inter font-medium whitespace-nowrap',
        background === 'black' ? 'bg-black' : 'bg-darker-gray',
        size === 'sm' ? 'px-3 py-1 text-[14px]' : 'px-4 py-2 text-[16px]',
        disabled && 'opacity-40',
        className,
      )}
    >
      {status !== 'none' && <span className={cn('size-2 shrink-0 rounded-full', dotColor[status])} />}
      <span className={statusColor[status]}>{children}</span>
      {onClose && (
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          disabled={disabled}
          className={cn('shrink-0', statusColor[status])}
        >
          <IconCloseX className="size-4" />
        </button>
      )}
    </span>
  );
}

export default Pill;
