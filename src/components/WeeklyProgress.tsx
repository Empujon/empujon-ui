'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCheckBadge, IconTresPuntitos } from './designerIcons';

/**
 * WeeklyProgress — "Tu semana" del sistema de recompensas (Figma HAND-OFF ›
 * "Handoff - Version Simplificada", card "recompensas" 1718:31229 desktop /
 * 1718:31253 mobile). Un paso por actividad de la semana (1 a 5): verde con
 * check si está hecha, gris con tres puntitos si falta.
 *
 * Los textos salen de las "Notas para desarrolladores" (1718:31099), que
 * definen 4 escenarios — ver `weeklyProgressCopy`.
 *
 * El título de sección ("Progreso") NO es parte del componente: vive en la
 * página, igual que en el Figma, donde está afuera de la card.
 */
export interface WeeklyProgressProps {
  /** Meta de la semana: cantidad de actividades (1 a 5 en el Figma). */
  total: number;
  /** Actividades ya completadas esta semana. Se acota a [0, total]. */
  completed: number;
  /** Título de la card. Default "Tu semana". */
  title?: string;
  className?: string;
}

export interface WeeklyProgressCopy {
  /** Línea de estado (Inter 14). */
  status: string;
  /** Cuántas faltan — va en Shantell Regular dentro de la línea de meta. `null` si ya cumplió. */
  remaining: number | null;
  /** Resto de la línea de meta (Shantell SemiBold). */
  goal: string;
}

/**
 * Los 4 escenarios de las notas del Figma, más el caso intermedio general:
 *
 * | caso              | estado                                     | meta                                      |
 * |-------------------|--------------------------------------------|-------------------------------------------|
 * | 0 hechas          | Todavía no completaste ninguna actividad.  | {X} más y llegás a tu meta de la semana.  |
 * | parcial           | Completaste {c} de {t} actividad{es}.      | {X} más y llegás a tu meta de la semana.  |
 * | todas (t > 1)     | Completaste todas las actividades.         | ¡Cumpliste tu meta semanal!               |
 * | meta de 1, hecha  | Completaste 1 de 1 actividad.              | ¡Cumpliste tu meta semanal!               |
 *
 * El plural de "actividad" depende del total ("de 5 actividades", "de 1
 * actividad"), como en el nodo `Completaste {{X}} de {{X}} actividad{{es}}.`
 */
export function weeklyProgressCopy(total: number, completed: number): WeeklyProgressCopy {
  const t = Math.max(1, Math.floor(total));
  const c = Math.max(0, Math.min(t, Math.floor(completed)));
  const noun = t === 1 ? 'actividad' : 'actividades';

  if (c >= t) {
    return {
      status: t === 1 ? 'Completaste 1 de 1 actividad.' : 'Completaste todas las actividades.',
      remaining: null,
      goal: '¡Cumpliste tu meta semanal!',
    };
  }
  return {
    status: c === 0 ? 'Todavía no completaste ninguna actividad.' : `Completaste ${c} de ${t} ${noun}.`,
    remaining: t - c,
    goal: ' más y llegás a tu meta de la semana.',
  };
}

// Paso de la barra (Figma "status"): círculo de 32px. Hecho = insignia verde
// con check; pendiente = gris-500 con los tres puntitos blanco-100, rotados
// 90° como la instancia del Figma. El ícono ocupa 23.467/32 ≈ 73%.
function Step({ done }: { done: boolean }) {
  if (done) return <IconCheckBadge className="size-8" />;
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-divider text-whitesmoke">
      <IconTresPuntitos className="size-[73%] rotate-90" />
    </span>
  );
}

export function WeeklyProgress({ total, completed, title = 'Tu semana', className }: WeeklyProgressProps) {
  const t = Math.max(1, Math.floor(total));
  const c = Math.max(0, Math.min(t, Math.floor(completed)));
  const copy = weeklyProgressCopy(t, c);

  return (
    // Card "recompensas": borde 3px gris-oscuro-600 (#4D584F, token gray-600 —
    // NO `divider`, que es gris-500), radio 24, padding 16 horizontal / 24
    // vertical, sin fondo.
    <div
      className={cn(
        'flex w-full flex-col overflow-clip rounded-card border-[3px] border-gray-600 px-4 py-6 text-whitesmoke',
        className,
      )}
    >
      <div className="flex w-full flex-col gap-[10px]">
        <p className="font-inter font-semibold text-[20px] leading-[1.4] tracking-[0.2px]">{title}</p>

        {/* Barra: pasos + conectores de 4px gris-300 que se reparten el ancho,
            gap 4. Los conectores son SIEMPRE grises, también entre dos pasos
            hechos (así en los 4 escenarios del Figma).
            Ancho: 290 en los dos frames. En desktop 290 es el ancho completo
            de la card (328 − 2×16 − 2×3); en mobile la card mide 408 y la
            barra sigue en 290 mientras los textos llegan a 370. `w-full` +
            techo de 290 reproduce los dos frames. */}
        <div
          className="flex w-full max-w-[290px] items-center gap-1"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={t}
          aria-valuenow={c}
          aria-label={title}
        >
          {Array.from({ length: t }).map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="h-1 min-w-px flex-1 rounded-[4px] bg-lgray" />}
              <Step done={i < c} />
            </React.Fragment>
          ))}
        </div>

        <p className="font-inter font-medium text-[14px] leading-[1.5] tracking-[0.14px]">{copy.status}</p>

        {/* Verde-100 (#CFFEC9) no es token del preset todavía. El número va en
            Shantell Regular y el resto en SemiBold (nodo 1718:31242). */}
        <p className="font-shantell font-semibold text-[16px] leading-[1.3] text-[#CFFEC9]">
          {copy.remaining !== null && <span className="font-normal">{copy.remaining}</span>}
          {copy.goal}
        </p>
      </div>
    </div>
  );
}

export default WeeklyProgress;
