'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * StatusLabel — etiqueta informativa de estado.
 *
 * Fiel al Figma "SISTEMA DE DISEÑO" › sección "Status label" (component set,
 * node 7671:5997): `Variant` (Success/Error/Alert/Info/Neutral) ×
 * `Background` (Grey/Color), con punto de color opcional (`showIcon`).
 *
 * Los status labels pueden resaltar distintos estados o elementos para el
 * usuario. No se puede interactuar con ellos: son puramente informativos,
 * pensados solo para comunicar información relevante.
 *
 * Componente aparte del futuro Chip interactivo (ex "Tag") — ver memoria del
 * proyecto y Chip.stories.tsx.
 */
export interface StatusLabelProps {
  children: React.ReactNode;
  variant?: 'success' | 'error' | 'alert' | 'info' | 'neutral';
  /** Grey = fondo gris oscuro + texto/punto de color. Color = fondo de color + texto/punto negro. */
  background?: 'grey' | 'color';
  /** Punto de color a la izquierda del texto. Default: visible. */
  showIcon?: boolean;
  className?: string;
}

const GREY_TEXT_CLASS = {
  success: 'text-green',
  error: 'text-red',
  alert: 'text-yellow',
  info: 'text-blue',
  neutral: 'text-whitesmoke',
} as const;

const GREY_DOT_CLASS = {
  success: 'bg-green',
  error: 'bg-red',
  alert: 'bg-yellow',
  info: 'bg-blue',
  neutral: 'bg-whitesmoke',
} as const;

const COLOR_BG_CLASS = {
  success: 'bg-green',
  error: 'bg-red',
  alert: 'bg-yellow',
  info: 'bg-blue',
  neutral: 'bg-lightgray',
} as const;

export function StatusLabel({
  children,
  variant = 'success',
  background = 'grey',
  showIcon = true,
  className,
}: StatusLabelProps) {
  const isGrey = background === 'grey';

  return (
    <span
      className={cn(
        'inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px]',
        isGrey ? cn('bg-darker-gray', GREY_TEXT_CLASS[variant]) : cn(COLOR_BG_CLASS[variant], 'text-black'),
        className,
      )}
    >
      {showIcon && (
        <span className={cn('size-2 shrink-0 rounded-full', isGrey ? GREY_DOT_CLASS[variant] : 'bg-black')} />
      )}
      {children}
    </span>
  );
}

export default StatusLabel;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const statusLabelBlockMeta: UiBlockMeta = {
  type: 'ui:status-label',
  label: 'Etiqueta de estado',
  icon: 'Tag',
  exportName: 'StatusLabel',
  childrenProp: 'children',
  props: {
    children: { control: 'text', label: 'Texto', default: 'Estado', inline: true },
    variant: {
      control: 'enum',
      label: 'Variante',
      default: 'success',
      options: ['success', 'error', 'alert', 'info', 'neutral'],
    },
    background: {
      control: 'enum',
      label: 'Fondo',
      default: 'grey',
      options: ['grey', 'color'],
    },
  },
};
