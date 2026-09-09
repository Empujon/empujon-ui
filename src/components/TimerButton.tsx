'use client';

import React, { useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * TimerButton — botón-reloj que muestra una cuenta regresiva en mm:ss (Figma › "botón
 * contador", sección 1525:19391).
 *
 * Tres estados 1:1 del Figma:
 * - Default (1524:5892): fondo amarillo, texto negro-900.
 * - Hover    (1525:19383): fondo celeste, texto negro-900 (sin cambio).
 * - Alerta   (1525:19387): a partir de `warnThreshold` segundos restantes, pasa a fondo
 *   gris-oscuro-800 + texto rojo (error) — sin importar el hover, porque el Figma no
 *   define una variante hover para este estado.
 *
 * Dueño de su propio timer (mismo criterio que `Countdown`): recibe `seconds` como punto
 * de partida y decrementa solo, así el consumidor no maneja el `setInterval` a mano. Si
 * `seconds` cambia desde afuera (ej. se resincroniza con el server), el timer interno se
 * resetea a ese valor.
 *
 * No lleva `aria-live`: a diferencia de `Countdown` (3-2-1, dura segundos), este timer
 * puede correr varios minutos — anunciarlo cada segundo sería ruido para lectores de
 * pantalla. El texto sigue siendo legible on-demand para quien lo consulte.
 */
const timerButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-pill px-6 py-4',
    'font-inter font-semibold text-label-grande tabular-nums whitespace-nowrap select-none',
    'transition-colors duration-200 ease-in-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      urgent: {
        false: 'bg-yellow text-black enabled:hover:bg-blue focus-visible:ring-orange',
        true: 'bg-darker-gray text-red focus-visible:ring-red',
      },
    },
    defaultVariants: { urgent: false },
  },
);

export interface TimerButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof timerButtonVariants> {
  /** Segundos totales desde donde arranca la cuenta regresiva. */
  seconds: number;
  /** Segundos restantes a partir de los cuales pasa al estado de alerta. Default 300 (5 min). */
  warnThreshold?: number;
  /** Se llama una única vez al llegar a 0. */
  onComplete?: () => void;
  className?: string;
}

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, Math.round(totalSeconds));
  const mm = Math.floor(clamped / 60);
  const ss = clamped % 60;
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

export function TimerButton({
  seconds,
  warnThreshold = 300,
  onComplete,
  className,
  ...props
}: TimerButtonProps) {
  const [remaining, setRemaining] = useState(seconds);

  // Si el punto de partida cambia desde afuera (ej. resync con el server), reiniciar.
  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => setRemaining((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  return (
    <button
      type="button"
      className={cn(timerButtonVariants({ urgent: remaining <= warnThreshold }), className)}
      {...props}
    >
      {formatTime(remaining)}
    </button>
  );
}

export default TimerButton;
