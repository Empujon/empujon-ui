'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { StatusLabel } from './StatusLabel';

/**
 * StudentCard — tarjeta de estudiante (Figma › "Cards" › "Student Card", node
 * 6914:2101). 3 estados × 5 themes medidos 1:1 contra los 15 nodos del set.
 *
 * El color de la barra de progreso y el label de estado derivan de los datos
 * reales, no del "theme" cosmético del avatar: sin avance (`current === 0`) →
 * "Sin empezar" (neutral, barra blanca); con avance y a tiempo → "Al día"
 * (verde); con avance y atrasado → "Con retraso" (rojo). Deducido cruzando los
 * 5 ejemplos de Figma (Verde/Rosa/Amarillo/Azul/Foto son solo la ilustración
 * del avatar — Amarillo y Foto comparten "Sin empezar" pese a temas distintos,
 * lo que confirma que el estado no depende del theme).
 *
 * Hover/Active son interacción real (`hover:`/`active:`), mismo criterio que
 * Button/SquareButton — no hay prop de "seleccionado". Active redeclara bg y
 * border-color explícitamente porque durante un click real el mouse sigue
 * sobre la card mientras está presionada, así que hover Y active matchean al
 * mismo tiempo.
 */
export interface StudentCardProps {
  name: string;
  /** Avatar/ilustración (no se bundlea, ver componente `Avatar`). */
  avatar: React.ReactNode;
  progress: { current: number; total: number };
  status: 'on-time' | 'delayed';
  onClick?: () => void;
  className?: string;
}

export function StudentCard({ name, avatar, progress, status, onClick, className }: StudentCardProps) {
  const started = progress.current > 0;
  const fillColor = !started ? 'bg-whitesmoke' : status === 'delayed' ? 'bg-red' : 'bg-green';
  const pct = progress.total > 0 ? Math.min(100, (progress.current / progress.total) * 100) : 0;
  const statusText = !started ? 'Sin empezar' : status === 'delayed' ? 'Con retraso' : 'Al día';
  const statusVariant = !started ? 'neutral' : status === 'delayed' ? 'error' : 'success';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex h-[224px] w-[152px] flex-col items-center justify-center gap-2 rounded-2xl border-[3px] border-transparent bg-darker-gray px-2 py-4 transition-colors duration-200 ease-in-out active:duration-[0ms]',
        'hover:bg-blue active:border-blue active:bg-darker-gray',
        className,
      )}
    >
      <span className="size-[72px] shrink-0">{avatar}</span>
      <span className="font-shantell font-medium text-[16px] text-whitesmoke text-center group-hover:text-black group-hover:underline group-hover:decoration-wavy group-active:text-whitesmoke group-active:no-underline">
        {name}
      </span>
      <div className="flex w-[120px] items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-[8px] bg-divider">
          <div className={cn('h-2 rounded-[8px]', fillColor)} style={{ width: `${pct}%` }} />
        </div>
        <span className="w-10 shrink-0 text-right font-inter font-medium text-[14px] tracking-[0.14px] text-lightgray group-hover:text-black group-active:text-lightgray">
          {progress.current}/{progress.total}
        </span>
      </div>
      <StatusLabel variant={statusVariant}>{statusText}</StatusLabel>
    </button>
  );
}

export default StudentCard;
