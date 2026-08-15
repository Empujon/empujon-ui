'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCheckMark } from './designerIcons';

/**
 * Notification — aviso del sistema de diseño.
 *
 * Fiel al Figma › Notificaciones › "notificación": ícono circular (éxito verde /
 * advertencia rojo) + título Shantell + subtítulo Inter + acción opcional (link),
 * separados por un borde inferior gris.
 *
 * Reemplaza los avisos inline duplicados (fluidez_lectora) y da una base común
 * para los satélites (hoy: turbo usa sonner, otros texto suelto).
 */

type NotificationType = 'success' | 'warning' | 'info';

const ICON_BG: Record<NotificationType, string> = {
  success: 'bg-green',
  warning: 'bg-red',
  info: 'bg-blue',
};

// El link que se probó para este ícono resultó ser una "x" de cerrar (misma pieza
// que Select/Modal), no un check ni un signo de exclamación — no correspondía a
// este componente. El check sí es el glifo real (`IconCheckMark`, ya confirmado
// contra Figma en Pagination/CardActionButton). El de advertencia sigue pendiente:
// no tengo un link real para el signo de exclamación de Figma todavía.
const BangIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true">
    <path d="M12 7v6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.6" fill="currentColor" />
  </svg>
);

export interface NotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: NotificationType;
  title: React.ReactNode;
  /** Texto secundario (ej. "Hace 5 min"). */
  meta?: React.ReactNode;
  /** Texto de la acción (link). Si se omite, no se renderiza. */
  actionLabel?: string;
  onAction?: () => void;
  /** Oculta el separador inferior. */
  hideDivider?: boolean;
}

export function Notification({
  type = 'success',
  title,
  meta,
  actionLabel,
  onAction,
  hideDivider = false,
  className,
  ...props
}: NotificationProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-6 p-4',
        !hideDivider && 'border-b-[3px] border-divider',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full text-black',
          ICON_BG[type],
        )}
        aria-hidden="true"
      >
        {type === 'success' ? <IconCheckMark className="size-6" /> : <BangIcon />}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="font-shantell font-semibold text-xl text-whitesmoke">{title}</p>
        {meta && <p className="font-inter font-semibold text-sm text-lgray tracking-[0.14px]">{meta}</p>}
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="self-start font-inter font-semibold text-base text-blue underline underline-offset-2 hover:no-underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default Notification;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

export const notificationBlockMeta: UiBlockMeta = {
  type: 'ui:notification',
  label: 'Notificación',
  icon: 'Bell',
  exportName: 'Notification',
  props: {
    title: { control: 'text', label: 'Título', default: 'Título de la notificación' },
    meta: { control: 'text', label: 'Detalle', default: 'Hace 5 min' },
    type: {
      control: 'enum',
      label: 'Tipo',
      default: 'success',
      options: ['success', 'warning', 'info'],
    },
    actionLabel: { control: 'text', label: 'Acción', default: '' },
  },
};
