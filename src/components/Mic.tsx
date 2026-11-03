'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { Dropdown, type DropdownItem } from './Dropdown';
import { IconMic } from './designerIcons';

/**
 * Mic — selector de micrófono + medidor de nivel (Figma › hand-off fluidez
 * "Ajusta tu cámara y micrófono", node 1849:3222, bloque "mic").
 *
 * NO es reconocimiento de voz (STT): es la pieza VISUAL del chequeo de hardware
 * previo al ejercicio. La captura de audio (`getUserMedia` + `AnalyserNode`),
 * la lista de dispositivos (`enumerateDevices`) y la regla de "no te escuchamos"
 * siguen siendo responsabilidad de la app.
 *
 * Reemplaza a la píldora anterior (ícono + 30 barras blancas/verdes/rojas). En el
 * diseño nuevo el color de las barras sólo dice si hay señal (verde) o no (gris):
 * el error se marca en el selector (`error`), no en las barras.
 *
 * - Sin permiso todavía → `disabled`: selector gris, barras grises.
 * - Con permiso → selector blanco; las barras se encienden según `level`.
 * - Sin señal un rato → `error`: selector en rojo (la app decide cuándo).
 *
 * El selector va en `size="sm"`: en el Figma la instancia está a escala 0,917.
 *
 * Ancho: 408px en el Figma (desktop y mobile); acá es `max-w-[408px]` y las barras
 * reparten el espacio que deja el selector, para no desbordar en mobile chico.
 */
export interface MicProps {
  /** Nivel de audio 0–1. Las barras encendidas son `round(level × barsCount)`. */
  level?: number;
  /** Dispositivos de entrada para el selector (deviceId + nombre). */
  devices?: DropdownItem[];
  /** deviceId del micrófono en uso. */
  deviceId?: string;
  onDeviceChange?: (deviceId: string) => void;
  /** Sin permiso: selector gris y deshabilitado, barras apagadas. */
  disabled?: boolean;
  /** Sin señal: selector en rojo. */
  error?: boolean;
  /** aria-label del selector. Default "Elegir micrófono". */
  label?: string;
  /** Default 23, como en el Figma. */
  barsCount?: number;
  className?: string;
}

export function Mic({
  level = 0,
  devices = [],
  deviceId,
  onDeviceChange,
  disabled = false,
  error = false,
  label = 'Elegir micrófono',
  barsCount = 23,
  className,
}: MicProps) {
  const clamped = Math.min(Math.max(level, 0), 1);
  const activeCount = disabled ? 0 : Math.round(clamped * barsCount);

  return (
    <div className={cn('flex w-full max-w-[408px] items-center gap-[17px]', className)}>
      <Dropdown
        label={label}
        hideLabel
        icon={<IconMic className="size-full" />}
        items={devices}
        value={deviceId ? [deviceId] : []}
        onChange={(v) => {
          if (v[0]) onDeviceChange?.(v[0]);
        }}
        disabled={disabled}
        error={error}
        menuAlign="left"
        size="sm"
        className="shrink-0"
      />
      <div className="flex min-w-0 flex-1 items-center justify-between" aria-hidden="true">
        {Array.from({ length: barsCount }).map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-6 w-1.5 shrink-0 rounded-[7.333px] transition-colors duration-75',
              i < activeCount ? 'bg-green' : 'bg-divider',
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Mic;
