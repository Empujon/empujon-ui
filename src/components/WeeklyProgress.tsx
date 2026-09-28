'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCheckBadge, IconTresPuntitos } from './designerIcons';

/**
 * WeeklyProgress — card del sistema de recompensas (Figma HAND-OFF).
 *
 * Tres variantes, cada una con su frame:
 *
 * - `week` — "Tu semana" (Handoff - Version Simplificada, 1718:31229 /
 *   mobile 1718:31253). Borde gris-oscuro-600; pasos hechos en verde,
 *   pendientes en gris-500. Textos: notas 1718:31099.
 * - `pending` — "Actividades pendientes" (Handoff - Version Actividades
 *   pendientes, 1761:32493 / mobile 1761:32530). Borde amarillo; pasos
 *   pendientes en amarillo con los puntitos en negro-900. Textos: notas
 *   1761:32348.
 * - `disabled` — "Tu semana" apagada mientras hay pendientes (1761:32507 /
 *   mobile 1761:32544). Fondo gris-oscuro-800 sin borde, todo en gris, sólo
 *   la línea de estado.
 *
 * El título de sección ("Progreso") NO es parte del componente: vive en la
 * página, igual que en el Figma, donde está afuera de la card.
 */
export type WeeklyProgressVariant = 'week' | 'pending' | 'disabled';

export interface WeeklyProgressProps {
  /** Cantidad de actividades (1 a 5 en el Figma). */
  total: number;
  /** Actividades ya completadas. Se acota a [0, total]. */
  completed: number;
  variant?: WeeklyProgressVariant;
  /** Título de la card. Default según la variante. */
  title?: string;
  className?: string;
}

export interface WeeklyProgressCopy {
  /** Línea de estado (Inter 14). */
  status: string;
  /** Número que va en Shantell Regular dentro de la segunda línea. `null` si no lleva. */
  remaining: number | null;
  /** Segunda línea (Shantell SemiBold). Vacía en `disabled`. */
  goal: string;
}

const activities = (n: number) => (n === 1 ? 'actividad' : 'actividades');

/**
 * Textos de "Tu semana" (notas 1718:31099):
 *
 * | caso              | estado                                     | meta                                      |
 * |-------------------|--------------------------------------------|-------------------------------------------|
 * | 0 hechas          | Todavía no completaste ninguna actividad.  | {X} más y llegás a tu meta de la semana.  |
 * | parcial           | Completaste {c} de {t} actividad{es}.      | {X} más y llegás a tu meta de la semana.  |
 * | todas (t > 1)     | Completaste todas las actividades.         | ¡Cumpliste tu meta semanal!               |
 * | meta de 1, hecha  | Completaste 1 de 1 actividad.              | ¡Cumpliste tu meta semanal!               |
 */
export function weeklyProgressCopy(total: number, completed: number): WeeklyProgressCopy {
  const t = Math.max(1, Math.floor(total));
  const c = Math.max(0, Math.min(t, Math.floor(completed)));

  if (c >= t) {
    return {
      status: t === 1 ? 'Completaste 1 de 1 actividad.' : 'Completaste todas las actividades.',
      remaining: null,
      goal: '¡Cumpliste tu meta semanal!',
    };
  }
  return {
    status: c === 0 ? 'Todavía no completaste ninguna actividad.' : `Completaste ${c} de ${t} ${activities(t)}.`,
    remaining: t - c,
    goal: ' más y llegás a tu meta de la semana.',
  };
}

/**
 * Textos de "Actividades pendientes" (notas 1761:32348):
 *
 * | caso          | estado                                                  | segunda línea                               |
 * |---------------|---------------------------------------------------------|---------------------------------------------|
 * | faltan r      | Tienes {r} actividad{es} pendiente{s} de semanas anteriores. | Complétalas para activar tu semana actual. |
 * | todas hechas  | Completaste todas las actividades.                      | Ahora puedes continuar con tu semana.       |
 *
 * {r} son las que FALTAN (no el total): con 5 pasos y 2 hechos dice "Tienes 3".
 */
export function pendingProgressCopy(total: number, completed: number): WeeklyProgressCopy {
  const t = Math.max(1, Math.floor(total));
  const c = Math.max(0, Math.min(t, Math.floor(completed)));
  if (c >= t) {
    return { status: 'Completaste todas las actividades.', remaining: null, goal: 'Ahora puedes continuar con tu semana.' };
  }
  const r = t - c;
  return {
    status: `Tienes ${r} ${activities(r)} ${r === 1 ? 'pendiente' : 'pendientes'} de semanas anteriores.`,
    remaining: null,
    goal: 'Complétalas para activar tu semana actual.',
  };
}

/** "Tu semana" apagada (1761:32519): sólo la línea de estado, siempre con números. */
export function disabledProgressCopy(total: number, completed: number): WeeklyProgressCopy {
  const t = Math.max(1, Math.floor(total));
  const c = Math.max(0, Math.min(t, Math.floor(completed)));
  return { status: `Completaste ${c} de ${t} ${activities(t)}.`, remaining: null, goal: '' };
}

// Colores por variante (tokens del preset; los que no son token van literales
// con su nombre del Figma).
const STYLES = {
  week: {
    card: 'border-[3px] border-gray-600',
    title: 'text-whitesmoke',
    status: 'text-whitesmoke',
    goal: 'text-[#CFFEC9]', // brand/verde-100
    connector: 'bg-lgray',
    todo: 'bg-divider text-whitesmoke',
  },
  pending: {
    card: 'border-[3px] border-yellow',
    title: 'text-whitesmoke',
    status: 'text-whitesmoke',
    goal: 'text-[#FDFF8B]', // brand/amarillo-200
    connector: 'bg-lgray',
    todo: 'bg-yellow text-black',
  },
  disabled: {
    card: 'bg-darker-gray',
    title: 'text-divider',
    status: 'text-divider',
    goal: '',
    connector: 'bg-divider',
    todo: 'bg-gray-600 text-lgray',
  },
} as const;

// Paso de la barra (Figma "status"): círculo de 32px. Hecho = insignia verde
// con check; pendiente = círculo del color de la variante con los tres
// puntitos rotados 90°, como la instancia del Figma (ícono 23.467/32 ≈ 73%).
function Step({ done, todoClass }: { done: boolean; todoClass: string }) {
  if (done) return <IconCheckBadge className="size-8" />;
  return (
    <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', todoClass)}>
      <IconTresPuntitos className="size-[73%] rotate-90" />
    </span>
  );
}

export function WeeklyProgress({ total, completed, variant = 'week', title, className }: WeeklyProgressProps) {
  const t = Math.max(1, Math.floor(total));
  // En `disabled` no se pintan pasos hechos: la semana todavía no se activó
  // (1761:32507 muestra los tres apagados).
  const c = variant === 'disabled' ? 0 : Math.max(0, Math.min(t, Math.floor(completed)));
  const s = STYLES[variant];
  const copy =
    variant === 'pending' ? pendingProgressCopy(t, completed)
      : variant === 'disabled' ? disabledProgressCopy(t, completed)
        : weeklyProgressCopy(t, completed);
  const heading = title ?? (variant === 'pending' ? 'Actividades pendientes' : 'Tu semana');

  return (
    // Card "recompensas": radio 24, padding 16 horizontal / 24 vertical.
    <div className={cn('flex w-full flex-col overflow-clip rounded-card px-4 py-6', s.card, className)}>
      <div className="flex w-full flex-col gap-[10px]">
        <p className={cn('font-inter font-semibold text-[20px] leading-[1.4] tracking-[0.2px]', s.title)}>{heading}</p>

        {/* Barra: pasos + conectores de 4px que se reparten el ancho, gap 4.
            Ancho: 290 en los frames de 328; en mobile la barra de "Tu semana"
            simplificada quedó en 290 y la de "Actividades pendientes" ocupa
            el ancho — por eso el techo sólo en `week`. */}
        <div
          className={cn('flex w-full items-center gap-1', variant === 'week' && 'max-w-[290px]')}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={t}
          aria-valuenow={c}
          aria-label={heading}
        >
          {Array.from({ length: t }).map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className={cn('h-1 min-w-px flex-1 rounded-[4px]', s.connector)} />}
              <Step done={i < c} todoClass={s.todo} />
            </React.Fragment>
          ))}
        </div>

        <p className={cn('font-inter font-medium text-[14px] leading-[1.5] tracking-[0.14px]', s.status)}>{copy.status}</p>

        {copy.goal && (
          <p className={cn('font-shantell font-semibold text-[16px] leading-[1.3]', s.goal)}>
            {copy.remaining !== null && <span className="font-normal">{copy.remaining}</span>}
            {copy.goal}
          </p>
        )}
      </div>
    </div>
  );
}

export default WeeklyProgress;
