'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * StudentCard — tarjeta de estudiante seleccionable (Figma › "Cards" › "Student Card").
 * Gap 100% nuevo — no existe en ningún repo entrenador ni en `empujon/frontend`.
 *
 * El color de la barra de progreso y el status derivan de los datos reales, no de un
 * "theme" cosmético: sin avance (`current === 0`) → blanco; con avance y a tiempo →
 * verde; con avance y atrasado → rojo. Deducido cruzando los 5 ejemplos de Figma
 * (Verde/Rosa/Amarillo/Azul/Foto son solo la ilustración del avatar, no correlacionan
 * 1:1 con el color de la barra).
 */
export interface StudentCardProps {
  name: string;
  /** Avatar/ilustración (no se bundlea, ver componente `Avatar`). */
  avatar: React.ReactNode;
  progress: { current: number; total: number };
  status: 'on-time' | 'delayed';
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StudentCard({ name, avatar, progress, status, selected, onClick, className }: StudentCardProps) {
  const started = progress.current > 0;
  const fillColor = !started ? 'bg-whitesmoke' : status === 'delayed' ? 'bg-red' : 'bg-green';
  const pct = progress.total > 0 ? Math.min(100, (progress.current / progress.total) * 100) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex h-[224px] w-[152px] flex-col items-center justify-center gap-2 rounded-2xl bg-darker-gray px-2 py-4 transition-colors',
        selected ? 'border-[3px] border-blue' : 'hover:bg-blue',
        className,
      )}
    >
      <span className="size-[72px] shrink-0">{avatar}</span>
      <span className="font-shantell font-medium text-[16px] text-whitesmoke text-center group-hover:text-black group-hover:underline group-hover:decoration-wavy">
        {name}
      </span>
      <div className="flex w-[120px] items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-[8px] bg-divider">
          <div className={cn('h-2 rounded-[8px]', fillColor)} style={{ width: `${pct}%` }} />
        </div>
        <span className="w-10 shrink-0 text-right font-inter font-medium text-[14px] tracking-[0.14px] text-lightgray group-hover:text-black">
          {progress.current}/{progress.total}
        </span>
      </div>
      <span className="flex items-center gap-2 rounded-3xl bg-black px-3 py-1">
        <span className={cn('size-2 shrink-0 rounded-full', status === 'delayed' ? 'bg-orange' : 'bg-green')} />
        <span className="font-inter font-medium text-[14px] tracking-[0.14px] text-whitesmoke whitespace-nowrap">
          {status === 'delayed' ? 'Con retraso' : 'Al día'}
        </span>
      </span>
    </button>
  );
}

export default StudentCard;
