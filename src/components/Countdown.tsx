'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '../lib/cn';

/**
 * Countdown — cuenta regresiva antes de empezar un ejercicio (Figma › Loading › "3-2-1-¡ya!").
 *
 * Fiel al Figma: círculo de 300px, texto Shantell ExtraBold negro-900, sombra de color
 * a juego con el fondo (`shadow-naranja`/`shadow-amarillo`/`shadow-verde`, ver tokens.json
 * › shadow). El momento "¡YA!" siempre pasa a verde (señal de arranque), sin importar el
 * color elegido para 3-2-1 — así lo usan hoy fluidez_lectora/turbo/granpaneo/iconic_memory,
 * cada uno con su propia reimplementación del mismo timer; esto la centraliza.
 *
 * Dueño de su propio timer (como el original de fluidez_lectora): recibe `onComplete`,
 * no hace falta que el consumidor maneje el intervalo a mano.
 */
export interface CountdownProps {
  /** Desde qué número arranca la cuenta. Default 3. */
  from?: number;
  /** Color de fondo durante 3-2-1 (Figma: Color=yellow|orange). El "¡YA!" final siempre es verde. */
  color?: 'yellow' | 'orange';
  /** Milisegundos por número. Default 1000. */
  stepMs?: number;
  /** Milisegundos que se muestra "¡YA!" antes de completar. Default 1000. */
  yaMs?: number;
  /** Se llama una vez termina de mostrar "¡YA!". */
  onComplete: () => void;
  className?: string;
}

const bgByColor = {
  yellow: 'bg-yellow shadow-amarillo',
  orange: 'bg-orange shadow-naranja',
} as const;

export function Countdown({
  from = 3,
  color = 'yellow',
  stepMs = 1000,
  yaMs = 1000,
  onComplete,
  className,
}: CountdownProps) {
  const [count, setCount] = useState(from);
  const [showYa, setShowYa] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setShowYa(true);
      const timeout = setTimeout(onComplete, yaMs);
      return () => clearTimeout(timeout);
    }
    const timer = setTimeout(() => setCount((prev) => prev - 1), stepMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div
      role="timer"
      aria-live="assertive"
      className={cn(
        'flex items-center justify-center size-[300px] rounded-full px-20 py-10 transition-colors duration-300',
        showYa ? 'bg-green shadow-verde' : bgByColor[color],
        className,
      )}
    >
      <span
        key={showYa ? 'ya' : count}
        className={cn(
          'font-shantell font-extrabold text-black text-center leading-[1.1] whitespace-nowrap',
          showYa ? 'text-[128px] tracking-[1.28px]' : 'text-[200px] tracking-[2px]',
        )}
      >
        {showYa ? '¡YA!' : count}
      </span>
    </div>
  );
}

export default Countdown;
