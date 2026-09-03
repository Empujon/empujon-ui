'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconMic } from './designerIcons';

/**
 * Mic — indicador de nivel de micrófono, sacado 1:1 del componente real en
 * producción (fluidez_lectora, pantalla "Ajusta tu cámara y micrófono").
 *
 * NO es reconocimiento de voz (STT). Lo que hay ahí es un medidor de volumen
 * vía `getUserMedia` + `AnalyserNode` (fftSize 256, promedio de frequencyData
 * normalizado 0–1) para el chequeo de hardware previo al ejercicio — este
 * componente es la pieza VISUAL de esa idea, centralizada; la captura de
 * audio sigue siendo responsabilidad de la app.
 *
 * El color sale del propio nivel, igual que en prod: sin escuchar = blanco
 * 50%; escuchando con nivel 0.15–0.8 (rango "bueno" para hablar) = verde;
 * fuera de ese rango (muy bajo o saturado) = rojo.
 */
export interface MicProps {
  /** true = escuchando (glifo/barras toman color según `level`), false = idle (todo blanco 50%). */
  listening: boolean;
  /** Nivel de audio 0–1. Si se omite, listening=true usa un nivel demo (~1/3, cae en rango "bueno"). */
  level?: number;
  barsCount?: number;
  className?: string;
}

export function Mic({ listening, level, barsCount = 30, className }: MicProps) {
  const value = level ?? (listening ? 1 / 3 : 0);
  const activeCount = Math.round(value * barsCount);
  const inGoodRange = value >= 0.15 && value <= 0.8;
  const iconColor = !listening ? 'text-white/50' : inGoodRange ? 'text-green' : 'text-red';
  const activeBarColor = !listening ? 'bg-white/50' : inGoodRange ? 'bg-green' : 'bg-red';

  return (
    <div
      className={cn(
        'flex h-10 w-full max-w-sm shrink-0 items-center gap-3 rounded-pill bg-darker-gray px-3 md:h-12 md:px-4',
        className,
      )}
    >
      <IconMic className={cn('size-6 shrink-0', iconColor)} />
      <div className="flex h-6 flex-1 items-center justify-between gap-0.5">
        {Array.from({ length: barsCount }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'w-1.5 rounded-full transition-all duration-75',
              i < activeCount ? cn(activeBarColor, 'h-full') : 'h-2/3 bg-gray-600 opacity-50',
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Mic;
