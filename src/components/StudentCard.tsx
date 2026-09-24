'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { StatusLabel } from './StatusLabel';
import { IconAttentionMark, IconPendingDots } from './designerIcons';

/**
 * StudentCard — tarjeta de estudiante (Figma › "Cards" › "Student Card", node
 * 6914:2101). Medido 1:1 contra los 18 nodos del set (sep 2026): rediseño que
 * saca el eje "Theme" (el avatar ahora es una instancia libre, no una
 * variante) y deja 3 estados × 6 "Mode" — nombres/capas en inglés desde este
 * rediseño (antes en español), confirmado con la descripción oficial del
 * componente en Figma. El avatar pasó de 72px a 80px en el proceso.
 *
 * `mode: 'circuit-on-track' | 'circuit-behind'` — progreso real: barra +
 * `progress` ("n/total") + tag "Al día" (verde) / "Con retraso" (rojo).
 *
 * `mode: 'free'` — modo libre, sin circuito: sin barra de progreso, tag
 * "Modo libre" (neutral). Ojo: el layout NO es el mismo que los demás
 * (`justify-between` sin gap, en vez de `gap-2 justify-center`) — avatar y
 * tag quedan pegados a los bordes de la card en vez de agrupados al medio;
 * confirmado comparando las clases reales de Figma, no una corrección visual
 * mía.
 *
 * `mode: 'group-activity'` — actividad grupal en vivo: code tag ("Código:
 * …") + tag "En actividad" (verde, cambia a fondo de color + texto negro en
 * hover). Ya NO existe un estado "Esperando"/amarillo — eso lo había
 * agregado yo sin base real en una versión anterior; el Mode description de
 * Figma solo menciona "En actividad".
 *
 * `mode: 'measurement-pending'` (nuevo) — el estudiante necesita que le
 * inicien una medición antes de poder seguir. `avatar` es siempre el
 * placeholder fijo `<Avatar character="medicion-pendiente" />` (borde/badge
 * amarillo, ícono de 3 puntos) — la card le suma el badge, no el avatar.
 * Nombre atenuado (gris-500) siempre. A diferencia de TODOS los demás modos,
 * la card acá NO reacciona a hover/active salvo el borde celeste al quedar
 * seleccionada: ni fondo, ni nombre, ni el tag "Iniciar medición" cambian —
 * mismo layout `justify-between` que Free.
 *
 * `mode: 'unavailable'` (antes "consent-pending"/"Falta consentimiento") —
 * el estudiante no puede participar. `avatar` normalmente
 * `<Avatar character="consentimiento-pendiente" />` (borde/badge rojo, ícono
 * de atención) + nombre atenuado fijo. El tag "No disponible" arranca gris
 * apagado y en hover Y active (los dos, no solo hover) pasa a celeste +
 * subrayado — a diferencia de los demás tags, no vuelve al look idle en
 * active. El fondo de la card sí cambia a celeste en hover, como el resto.
 *
 * Hover/Active son interacción real (`hover:`/`active:`), mismo criterio que
 * Button/SquareButton — no hay prop de "seleccionado". Active redeclara bg y
 * border-color explícitamente porque durante un click real el mouse sigue
 * sobre la card mientras está presionada, así que hover Y active matchean al
 * mismo tiempo (excepto en `unavailable`, donde el tag deliberadamente NO
 * revierte).
 */
type StudentCardBaseProps = {
  name: string;
  /**
   * Avatar/ilustración (no se bundlea, ver componente `Avatar`). En
   * `mode="unavailable"` normalmente `<Avatar character="consentimiento-pendiente" />`
   * y en `mode="measurement-pending"` `<Avatar character="medicion-pendiente" />`
   * — los placeholders fijos de Figma — pero queda como prop libre.
   */
  avatar: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

type StudentCardCircuitProps = StudentCardBaseProps & {
  mode: 'circuit-on-track' | 'circuit-behind';
  progress: { current: number; total: number };
};

type StudentCardFreeProps = StudentCardBaseProps & {
  mode: 'free';
};

type StudentCardGroupActivityProps = StudentCardBaseProps & {
  mode: 'group-activity';
  /** Código de sala mostrado en el tag inferior (ej. "luna"). */
  code: string;
};

type StudentCardMeasurementPendingProps = StudentCardBaseProps & {
  mode: 'measurement-pending';
};

type StudentCardUnavailableProps = StudentCardBaseProps & {
  mode: 'unavailable';
};

export type StudentCardProps =
  | StudentCardCircuitProps
  | StudentCardFreeProps
  | StudentCardGroupActivityProps
  | StudentCardMeasurementPendingProps
  | StudentCardUnavailableProps;

export function StudentCard(props: StudentCardProps) {
  const { name, avatar, onClick, className } = props;
  const mode = props.mode;

  // Los 2 modos "placeholder" (avatar fijo, no ilustración real) comparten
  // nombre atenuado siempre y badge sobre el avatar — pero se comportan
  // distinto entre sí en hover/active, ver comentarios más abajo.
  const isPlaceholderAvatar = mode === 'measurement-pending' || mode === 'unavailable';
  // Único modo cuya card no reacciona nunca al mouse (ni fondo, ni nada
  // adentro) — confirmado comparando Default/Hover/Active en Figma: los 3
  // tienen el mismo `bg-darker-gray`.
  const isStatic = mode === 'measurement-pending';
  // Free y Measurement pending reparten avatar/name/tag a los bordes de la
  // card (`justify-between`, sin gap) en vez de agruparlos al medio.
  const isSpread = mode === 'free' || mode === 'measurement-pending';

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex h-[224px] w-[152px] flex-col items-center rounded-2xl border-[3px] border-transparent bg-darker-gray px-2 py-4 transition-colors duration-200 ease-in-out active:duration-[0ms]',
        isSpread ? 'justify-between' : 'gap-2 justify-center',
        'active:border-blue',
        !isStatic && 'hover:bg-blue active:bg-darker-gray',
        className,
      )}
    >
      <span className="relative size-[80px] shrink-0">
        {avatar}
        {mode === 'measurement-pending' && (
          <span className="absolute bottom-0 right-0 flex size-[17.78px] items-center justify-center rounded-full bg-yellow">
            <IconPendingDots className="size-[11.73px]" />
          </span>
        )}
        {mode === 'unavailable' && (
          <span className="absolute bottom-0 right-0 flex size-[17.78px] items-center justify-center rounded-full bg-red">
            <IconAttentionMark className="size-[11.73px]" />
          </span>
        )}
      </span>
      <span
        className={cn(
          'font-shantell font-medium text-[16px] text-center',
          isPlaceholderAvatar
            ? 'text-divider'
            : 'text-whitesmoke group-hover:text-black group-hover:underline group-hover:decoration-wavy group-active:text-whitesmoke group-active:no-underline',
        )}
      >
        {name}
      </span>
      {mode === 'circuit-on-track' || mode === 'circuit-behind' ? (
        <StudentCardCircuit mode={mode} progress={props.progress} />
      ) : mode === 'free' ? (
        <StatusLabel variant="neutral">Modo libre</StatusLabel>
      ) : mode === 'group-activity' ? (
        <>
          <span className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-darker-gray px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] text-green group-hover:bg-green group-hover:text-black group-active:bg-darker-gray group-active:text-green">
            <span className="size-2 shrink-0 rounded-full bg-green group-hover:bg-black group-active:bg-green" />
            En actividad
          </span>
          <span className="inline-flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-gray-700 px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] text-whitesmoke">
            <span>Código:</span>
            <span className="text-orange">{props.code}</span>
          </span>
        </>
      ) : mode === 'measurement-pending' ? (
        <span className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full bg-yellow px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] text-black">
          Iniciar medición
        </span>
      ) : (
        <span className="flex min-h-px flex-[1_0_0] items-center justify-center rounded-2xl bg-darker-gray text-center font-inter font-medium text-sm leading-[1.3] tracking-[0.14px] text-divider no-underline group-hover:bg-transparent group-hover:text-blue group-hover:underline group-active:bg-transparent group-active:text-blue group-active:underline">
          No disponible
        </span>
      )}
    </button>
  );
}

function StudentCardCircuit({
  mode,
  progress,
}: {
  mode: 'circuit-on-track' | 'circuit-behind';
  progress: { current: number; total: number };
}) {
  const behind = mode === 'circuit-behind';
  const fillColor = behind ? 'bg-red' : 'bg-green';
  const pct = progress.total > 0 ? Math.min(100, (progress.current / progress.total) * 100) : 0;

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
      <StatusLabel variant={behind ? 'error' : 'success'}>{behind ? 'Con retraso' : 'Al día'}</StatusLabel>
    </>
  );
}

export default StudentCard;
