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
 * Responsive: el círculo mide 300px salvo que el contenedor sea más angosto, en cuyo caso
 * se achica dejando siempre 16px de margen de cada lado (`min(300px, 100cqw - 32px)`). Usa
 * container query units (`cqw`) en vez de `%` porque `%` significa cosas distintas según la
 * propiedad (ancho del contenedor para `width`/`padding`, alto para `height`, font-size del
 * padre para `font-size`) — con `cqw` el mismo valor escala igual en todas. Texto, tracking
 * y padding se re-derivan del diámetro real para no clipear ni perder las proporciones del Figma.
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

// Proporciones del Figma (base: círculo de 300px) — se re-derivan del tamaño real
// vía `--countdown-size` para que todo escale junto cuando el contenedor achica el círculo.
const SIZE = 300;
const PAD_X = 80; // px-20
const PAD_Y = 40; // py-10
const NUMBER_SIZE = 200;
const NUMBER_TRACKING = 2;
const YA_SIZE = 128;
const YA_TRACKING = 1.28;

const CIRCLE_SIZE = `min(${SIZE}px, calc(100cqw - 32px))`;
const ratio = (px: number) => `calc(var(--countdown-size) * ${px / SIZE})`;

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
    // Wrapper que define el "contenedor" para las cqw de abajo: sin esto el propio círculo
    // no puede consultar su ancho contra sí mismo (sería circular).
    <div style={{ containerType: 'inline-size' as string, width: '100%' }}>
      <div
        role="timer"
        aria-live="assertive"
        style={{
          ['--countdown-size' as string]: CIRCLE_SIZE,
          width: 'var(--countdown-size)',
          height: 'var(--countdown-size)',
          paddingInline: ratio(PAD_X),
          paddingBlock: ratio(PAD_Y),
        }}
        className={cn(
          'flex items-center justify-center rounded-full transition-colors duration-300',
          showYa ? 'bg-green shadow-verde' : bgByColor[color],
          className,
        )}
      >
        <span
          key={showYa ? 'ya' : count}
          style={{
            fontSize: ratio(showYa ? YA_SIZE : NUMBER_SIZE),
            letterSpacing: ratio(showYa ? YA_TRACKING : NUMBER_TRACKING),
          }}
          className="font-shantell font-extrabold text-black text-center leading-[1.1] whitespace-nowrap"
        >
          {showYa ? '¡YA!' : count}
        </span>
      </div>
    </div>
  );
}

export default Countdown;
