'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { StatusLabel } from './StatusLabel';
import { IconCheckMark } from './designerIcons';

/**
 * ProfileCard — card resumen de perfil (Figma › "Cards" › "Student Profile
 * Card", node 7701:1507). 2 layouts × 2 states medidos 1:1 contra los 4 nodos
 * del component set — pero los 2 layouts NO son un prop: es un solo markup
 * que cambia por breakpoint (`md:`), mobile-first, mismo criterio que
 * Footer/TrainerHeader en esta misma librería:
 *
 * - Base (mobile, Figma "Device=Mobile"): fila, avatar a la izquierda, ancho
 *   completo (`w-full`) — en mobile el ancho de la card no es un tamaño fijo
 *   propio: sigue el margen de 16px por lado de la grilla de la plataforma,
 *   que pone el contenedor de la página (no esta card). Si esta card se monta
 *   directo bajo `<body>` sin ese contenedor, se va a ver pegada a los bordes.
 * - `md:` (Figma "Device=Desktop"): columna, avatar arriba centrado, 320px fijo.
 *
 * Ninguna app consumidora necesita leer el viewport con JS ni elegir layout
 * a mano — la card responde sola al resize, sin flash de layout incorrecto.
 *
 * Radio de borde: `rounded-card` (24px, token del sistema) — Figma medía
 * 20px puntuales en este frame, pero se pidió unificar al radio estándar de
 * card en vez de clavar el valor exacto de este componente.
 *
 * La fila inferior (✓ + texto + StatusLabel, ej. "✓ Cuenta activa · Al día")
 * es contenido real de Figma — reemplaza al `children` libre que había antes
 * "por no haber relevado esa parte en detalle" (ya se relevó, node 7701:1521).
 *
 * Hover es interacción real (`hover:`), solo si hay `onClick` — a diferencia
 * de Student Card, Figma no tiene acá un estado "Active" propio.
 */
export interface ProfileCardProps {
  avatar: React.ReactNode;
  name: string;
  subtitle?: string;
  /** Fila inferior con check + texto + StatusLabel (Figma "dato 2"). Se omite si no se pasa. */
  accountStatus?: {
    /** Texto junto al ✓ (ej. "Cuenta activa"). */
    label: string;
    /** Texto de la StatusLabel a la derecha (ej. "Al día"). */
    statusLabel: string;
    statusVariant?: 'success' | 'error' | 'alert' | 'info' | 'neutral';
  };
  onClick?: () => void;
  className?: string;
}

export function ProfileCard({ avatar, name, subtitle, accountStatus, onClick, className }: ProfileCardProps) {
  const Comp = onClick ? 'button' : 'div';

  return (
    <Comp
      onClick={onClick}
      className={cn(
        'group flex w-full flex-row items-center gap-6 rounded-card bg-darker-gray p-4 text-left transition-colors duration-200 ease-in-out md:w-80 md:flex-col md:p-6',
        onClick && 'hover:bg-blue',
        className,
      )}
    >
      <span className="size-[104px] shrink-0">{avatar}</span>
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:w-full md:flex-none">
        <span
          className={cn(
            'font-shantell font-semibold text-[20px] tracking-[0.2px] text-whitesmoke',
            onClick && 'group-hover:text-black',
          )}
        >
          {name}
        </span>
        {subtitle && (
          <span
            className={cn(
              'font-inter font-semibold text-[16px] tracking-[0.16px] text-whitesmoke',
              onClick && 'group-hover:text-black',
            )}
          >
            {subtitle}
          </span>
        )}
        {accountStatus && (
          <div className="flex w-full items-center gap-2">
            <IconCheckMark className={cn('size-6 shrink-0 text-green', onClick && 'group-hover:text-darker-gray')} />
            <span
              className={cn(
                'flex-1 font-inter font-semibold text-[16px] tracking-[0.16px] text-lightgray',
                onClick && 'group-hover:text-darker-gray',
              )}
            >
              {accountStatus.label}
            </span>
            <StatusLabel background="color" variant={accountStatus.statusVariant ?? 'success'}>
              {accountStatus.statusLabel}
            </StatusLabel>
          </div>
        )}
      </div>
    </Comp>
  );
}

export default ProfileCard;
