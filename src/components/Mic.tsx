'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconMic } from './designerIcons';

/**
 * Mic — indicador de nivel de micrófono (Figma › "Mic", State=Listening|Idle).
 *
 * Gap 100% nuevo. NO es reconocimiento de voz (STT) — ninguna app entrenadora lo
 * tiene. Lo que sí existe (fluidez_lectora/TestConfiguration, turbo/CameraCheckScreen,
 * granpaneo/CameraMicScreen) es un medidor de volumen vía `getUserMedia`+`AnalyserNode`
 * para el chequeo de hardware previo al ejercicio — este componente es la pieza VISUAL
 * de esa idea (barras que reflejan el volumen), centralizada; la captura de audio
 * sigue siendo responsabilidad de la app.
 */
export interface MicProps {
  /** true = escuchando (barras verdes activas), false = idle (todas grises). */
  listening: boolean;
  /** Nivel 0–1. Si se omite, listening=true muestra ~1/3 de las barras activas (spec de Figma). */
  level?: number;
  barsCount?: number;
  className?: string;
}

export function Mic({ listening, level, barsCount = 24, className }: MicProps) {
  const activeCount = Math.round((level ?? (listening ? 1 / 3 : 0)) * barsCount);
  return (
    <div className={cn('inline-flex items-center gap-2 rounded-pill bg-darker-gray py-2 pl-4 pr-6', className)}>
      {/* El glifo del mic es siempre verde en Figma, no cambia con el estado — solo las barras cambian. */}
      <IconMic className="size-8 shrink-0 text-green" />
      <div className="flex items-center gap-2">
        {Array.from({ length: barsCount }).map((_, i) => (
          <span
            key={i}
            className={cn('h-6 w-1.5 rounded-full', i < activeCount ? 'bg-green' : 'bg-gray-600 opacity-50')}
          />
        ))}
      </div>
    </div>
  );
}

export default Mic;
