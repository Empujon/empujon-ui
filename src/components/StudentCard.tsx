'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { StatusLabel } from './StatusLabel';

/**
 * StudentCard — tarjeta de estudiante (Figma › "Cards" › "Student Card", node
 * 6914:2101). 3 estados × 5 themes × 2 modos, medido 1:1 contra los 30 nodos
 * del set (15 "Modo=Monitoreo" + 15 "Modo=Actividad grupal").
 *
 * `mode: 'monitoring'` (default) — el color de la barra de progreso y el
 * label de estado derivan de los datos reales, no del "theme" cosmético del
 * avatar: sin avance (`current === 0`) → "Sin empezar" (neutral, barra
 * blanca); con avance y a tiempo → "Al día" (verde); con avance y atrasado →
 * "Con retraso" (rojo). Deducido cruzando los 5 ejemplos de Figma
 * (Verde/Rosa/Amarillo/Azul/Foto son solo la ilustración del avatar —
 * Amarillo y Foto comparten "Sin empezar" pese a temas distintos, lo que
 * confirma que el estado no depende del theme).
 *
 * `mode: 'group-activity'` — para cuando el estudiante está en una actividad
 * grupal en vivo: reemplaza la barra de progreso + status label por dos
 * pills apiladas: el estado de la actividad (`activityStatus`, "En
 * actividad"/verde o "Esperando"/amarillo) y el código de sala (`code`). El
 * pill de actividad SÍ cambia a fondo de color + texto negro en hover (a
 * diferencia del status label de Monitoreo, que se queda igual); el pill de
 * código no cambia nunca — confirmado comparando los nodos Default/Hover/
 * Active de "Modo=Actividad grupal" en Figma.
 *
 * Hover/Active son interacción real (`hover:`/`active:`), mismo criterio que
 * Button/SquareButton — no hay prop de "seleccionado". Active redeclara bg y
 * border-color explícitamente porque durante un click real el mouse sigue
 * sobre la card mientras está presionada, así que hover Y active matchean al
 * mismo tiempo.
 */
type StudentCardBaseProps = {
  name: string;
  /** Avatar/ilustración (no se bundlea, ver componente `Avatar`). */
  avatar: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

type StudentCardMonitoringProps = StudentCardBaseProps & {
  mode?: 'monitoring';
  progress: { current: number; total: number };
  status: 'on-time' | 'delayed';
};

type StudentCardGroupActivityProps = StudentCardBaseProps & {
  mode: 'group-activity';
  activityStatus: 'active' | 'waiting';
  /** Código de sala mostrado en el pill inferior (ej. "luna"). */
  code: string;
};

export type StudentCardProps = StudentCardMonitoringProps | StudentCardGroupActivityProps;

const ACTIVITY_LABEL = { active: 'En actividad', waiting: 'Esperando' } as const;
const ACTIVITY_TEXT_CLASS = { active: 'text-green', waiting: 'text-yellow' } as const;
const ACTIVITY_DOT_CLASS = { active: 'bg-green', waiting: 'bg-yellow' } as const;
const ACTIVITY_HOVER_BG_CLASS = { active: 'group-hover:bg-green', waiting: 'group-hover:bg-yellow' } as const;
// Active (mousedown real) restaura el look idle por encima del hover — mismo
// criterio que el resto de la card (`active:` gana sobre `hover:` a propósito).
const ACTIVITY_ACTIVE_TEXT_CLASS = { active: 'group-active:text-green', waiting: 'group-active:text-yellow' } as const;
const ACTIVITY_ACTIVE_DOT_CLASS = { active: 'group-active:bg-green', waiting: 'group-active:bg-yellow' } as const;

export function StudentCard(props: StudentCardProps) {
  const { name, avatar, onClick, className } = props;

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
      {props.mode === 'group-activity' ? (
        <>
          <span
            className={cn(
              'inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-darker-gray px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] group-active:bg-darker-gray',
              ACTIVITY_TEXT_CLASS[props.activityStatus],
              ACTIVITY_HOVER_BG_CLASS[props.activityStatus],
              ACTIVITY_ACTIVE_TEXT_CLASS[props.activityStatus],
              'group-hover:text-black',
            )}
          >
            <span
              className={cn(
                'size-2 shrink-0 rounded-full group-hover:bg-black',
                ACTIVITY_DOT_CLASS[props.activityStatus],
                ACTIVITY_ACTIVE_DOT_CLASS[props.activityStatus],
              )}
            />
            {ACTIVITY_LABEL[props.activityStatus]}
          </span>
          <span className="inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-gray-700 px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] text-whitesmoke">
            <span>Código:</span>
            <span className="text-orange">{props.code}</span>
          </span>
        </>
      ) : (
        <StudentCardMonitoring progress={props.progress} status={props.status} />
      )}
    </button>
  );
}

function StudentCardMonitoring({
  progress,
  status,
}: Pick<StudentCardMonitoringProps, 'progress' | 'status'>) {
  const started = progress.current > 0;
  const fillColor = !started ? 'bg-whitesmoke' : status === 'delayed' ? 'bg-red' : 'bg-green';
  const pct = progress.total > 0 ? Math.min(100, (progress.current / progress.total) * 100) : 0;
  const statusText = !started ? 'Sin empezar' : status === 'delayed' ? 'Con retraso' : 'Al día';
  const statusVariant = !started ? 'neutral' : status === 'delayed' ? 'error' : 'success';

  return (
    <>
      <div className="flex w-[120px] items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-[8px] bg-divider">
          <div className={cn('h-2 rounded-[8px]', fillColor)} style={{ width: `${pct}%` }} />
        </div>
        <span className="w-10 shrink-0 text-right font-inter font-medium text-[14px] tracking-[0.14px] text-lightgray group-hover:text-black group-active:text-lightgray">
          {progress.current}/{progress.total}
        </span>
      </div>
      <StatusLabel variant={statusVariant}>{statusText}</StatusLabel>
    </>
  );
}

export default StudentCard;
