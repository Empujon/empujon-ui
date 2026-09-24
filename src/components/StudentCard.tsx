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
 * `mode: 'pending'` (Figma: "Modo=Measurement pending", nuevo) — el
 * estudiante necesita que le inicien una medición antes de poder seguir.
 * `avatar` es el MISMO avatar real del estudiante que en cualquier otro modo
 * (no un placeholder aparte — pedido explícito de Rocío: "que sea el mismo
 * avatar que en todas las demás"); esta card le suma por encima un aro
 * amarillo (`ring-2 ring-yellow`, mismo mecanismo que `TableStudentRow`) +
 * badge de 3 puntos. La card reacciona a hover/active como cualquier modo
 * normal (fondo celeste + nombre negro subrayado en hover, revierte en
 * active). Mismo layout `justify-between` que Free. "Iniciar medición" es un
 * `<button>` real con su PROPIO hover (`hover:`, no `group-hover:` — cambia
 * solo al pasar el mouse por encima del botón mismo, no con el hover de toda
 * la card: amarillo/negro idle → negro/celeste en su hover) y su propio
 * click (`onStartMeasurement`), independiente del click de la card entera
 * (`onClick`, ej. abrir el perfil): activa la medición ahí mismo, sin entrar
 * al perfil. Por eso el elemento raíz deja de ser un `<button>` real en este
 * modo — un `<button>` no puede anidar otro — y pasa a `<div role="button">`
 * con su propio manejo de teclado (Enter/Space), igual de accesible. El
 * `group` de la card en este modo está NOMBRADO (`group/card`, no `group` a
 * secas): el avatar usa `group-hover:text-black` (ver Avatar.tsx) sin
 * nombre, y como `:hover` de CSS también aplica al ancestro mientras el
 * mouse está sobre un hijo, un `group` sin nombrar haría que el avatar se
 * pusiera negro también al hacer hover en "Iniciar medición" (no solo en la
 * card) — nombrando el group y usando `group-hover/card:`/`group-active/card:`
 * solo en el nombre se corta esa cadena.
 *
 * `mode: 'unavailable'` (antes "consent-pending"/"Falta consentimiento") —
 * el estudiante no puede participar. `avatar` también es el mismo avatar
 * real (aro rojo + badge de atención encima, mismo mecanismo que Pending) +
 * nombre atenuado fijo. A diferencia de TODOS los demás modos, la card
 * entera NO es cliqueable (no hay `onClick` en la raíz) ni reacciona al
 * mouse — es un `<div>` sin fondo/borde interactivo. Lo único cliqueable es
 * el tag "No disponible" mismo: es un `<button>` real (cursor de mano
 * automático, mismo criterio que "Iniciar medición" en Pending) con su
 * PROPIO hover (`hover:`, no `group-hover:`) que lo pasa de gris apagado a
 * celeste + subrayado, y su propio `onClick`.
 *
 * Hover/Active son interacción real (`hover:`/`active:`), mismo criterio que
 * Button/SquareButton — no hay prop de "seleccionado". Active redeclara bg y
 * border-color explícitamente porque durante un click real el mouse sigue
 * sobre la card mientras está presionada, así que hover Y active matchean al
 * mismo tiempo. Excepción: `unavailable` no tiene card clickeable ni active
 * — ver arriba.
 */
type StudentCardBaseProps = {
  name: string;
  /**
   * Avatar/ilustración (no se bundlea, ver componente `Avatar`) — el mismo
   * en los 6 modos, incluidos `pending`/`unavailable`: esos dos le agregan un
   * aro de color + badge por encima, pero no cambian qué avatar se muestra.
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

type StudentCardPendingProps = StudentCardBaseProps & {
  mode: 'pending';
  /** Click en el tag "Iniciar medición" — independiente de `onClick` (el de la card entera). */
  onStartMeasurement?: () => void;
};

type StudentCardUnavailableProps = Omit<StudentCardBaseProps, 'onClick'> & {
  mode: 'unavailable';
  /** Click en el tag "No disponible" — la card entera no es cliqueable, solo este tag. */
  onClick?: () => void;
};

export type StudentCardProps =
  | StudentCardCircuitProps
  | StudentCardFreeProps
  | StudentCardGroupActivityProps
  | StudentCardPendingProps
  | StudentCardUnavailableProps;

export function StudentCard(props: StudentCardProps) {
  const { name, avatar, className } = props;
  const onClick = 'onClick' in props ? props.onClick : undefined;
  const mode = props.mode;

  // Único modo con nombre atenuado fijo (no reacciona al mouse) — `pending`
  // tiene nombre normal (blanco, hover negro subrayado como el resto).
  const isDimmedName = mode === 'unavailable';
  // Free y Pending reparten avatar/name/tag a los bordes de la card
  // (`justify-between`, sin gap) en vez de agruparlos al medio.
  const isSpread = mode === 'free' || mode === 'pending';
  // `pending` anida un click propio ("Iniciar medición") adentro del click de
  // la card — un <button> no puede contener otro <button>, así que acá la
  // raíz pasa a <div role="button"> con su propio Enter/Space.
  const isPending = mode === 'pending';
  // `unavailable` no es cliqueable: la card entera no reacciona al mouse
  // (ni fondo, ni active) — un <div> sin ningún manejador. Solo el tag "No
  // disponible" tiene su propio hover, ver más abajo.
  const isUnavailable = mode === 'unavailable';
  const Comp = isPending || isUnavailable ? 'div' : 'button';

  return (
    <Comp
      role={isPending ? 'button' : undefined}
      tabIndex={isPending && onClick ? 0 : undefined}
      onKeyDown={
        isPending
          ? (e: React.KeyboardEvent) => {
              if (!onClick) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      onClick={isUnavailable ? undefined : onClick}
      className={cn(
        'flex h-[224px] w-[152px] flex-col items-center rounded-2xl border-[3px] border-transparent bg-darker-gray px-2 py-4 transition-colors duration-200 ease-in-out active:duration-[0ms]',
        isSpread ? 'justify-between' : 'gap-2 justify-center',
        // Sin `group` en `unavailable`: la card no es cliqueable y no debe
        // reaccionar al mouse — si tuviera `group`, el avatar (que usa
        // `group-hover:text-black` para los otros modos) igual se pondría
        // negro con solo pasar el mouse por la card, aunque no le pusiera
        // `hover:bg-blue` acá. El aro/badge no dependen de `group`.
        // `pending` usa un `group/card` NOMBRADO (no `group` a secas): tiene
        // un <button> anidado ("Iniciar medición") con su propio hover, y
        // `:hover` en CSS también aplica al ancestro mientras el mouse está
        // sobre ese hijo — con `group` a secas, el avatar (que usa
        // `group-hover:text-black`, ver Avatar.tsx) se pondría negro también
        // al pasar el mouse por el botón, no solo por la card. Nombrando el
        // group acá y usando `group-hover/card:`/`group-active/card:` solo en
        // el nombre (no en el avatar, que no tiene variante nombrada) se
        // corta esa cadena: el avatar ya no matchea ningún `group-hover:`.
        isPending && 'group/card hover:bg-blue active:border-blue active:bg-darker-gray',
        !isPending && !isUnavailable && 'group hover:bg-blue active:border-blue active:bg-darker-gray',
        className,
      )}
    >
      <span
        className={cn(
          'relative size-[80px] shrink-0 rounded-[20px]',
          mode === 'pending' && 'ring-2 ring-yellow',
          mode === 'unavailable' && 'ring-2 ring-red',
        )}
      >
        {avatar}
        {mode === 'pending' && (
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
          isDimmedName
            ? 'text-divider'
            : isPending
              ? 'text-whitesmoke group-hover/card:text-black group-hover/card:underline group-hover/card:decoration-wavy group-active/card:text-whitesmoke group-active/card:no-underline'
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
      ) : mode === 'pending' ? (
        <button
          type="button"
          onClick={(e) => {
            // Propio click, no el de la card entera (que abriría el perfil) —
            // por eso este sí es un <button> real anidado en el <div
            // role="button"> de arriba, y por eso corta la propagación.
            e.stopPropagation();
            props.onStartMeasurement?.();
          }}
          className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-full bg-yellow px-2 font-inter font-medium text-sm leading-[1.5] tracking-[0.14px] text-black transition-colors duration-200 ease-in-out hover:bg-black hover:text-blue"
        >
          Iniciar medición
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="flex min-h-px flex-[1_0_0] items-center justify-center rounded-2xl text-center font-inter font-medium text-sm leading-[1.3] tracking-[0.14px] text-divider no-underline transition-colors duration-200 ease-in-out hover:text-blue hover:underline"
        >
          No disponible
        </button>
      )}
    </Comp>
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
