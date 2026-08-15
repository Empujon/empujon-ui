'use client';

import React, { useState } from 'react';
import { cn } from '../lib/cn';
import {
  IconEntusiasmo,
  IconFelicidad,
  IconCalma,
  IconConfianza,
  IconConfusion,
  IconCansancio,
  IconNervios,
  IconFrustracion,
  IconTristeza,
  IconEnojo,
  IconAburrimiento,
} from './emotionIcons';

/**
 * EmotionSelector — grilla de emociones seleccionables (Figma › "Emociones").
 *
 * Hoy existe copy-pasteado casi idéntico en fluidez_lectora/turbo/granpaneo/iconic_memory,
 * cada copia con nombres levemente distintos (ej. "CALMA" vs "TRANQUILIDAD" para la misma
 * emoción) — Figma normaliza 11 emociones con estas etiquetas exactas, ver `EMPUJON_EMOTIONS`.
 *
 * A diferencia del resto de la lib, ACÁ SÍ se bundlean los 11 glifos reales de Figma
 * (descargados directo del archivo, no dibujados a mano) como default de
 * `EMPUJON_EMOTIONS` — son contenido central del propio componente, no un ícono
 * genérico intercambiable como `Button.icon`. Igual se puede pisar por emoción vía
 * `emotions` si una app necesita otra ilustración.
 *
 * Estilo 1:1 con Figma: card 208×208, borde 2px blanco-100, radio `chico` (8px).
 * Default: transparente + texto blanco-100. Hover: fondo gris-500 (divider). Seleccionado:
 * fondo naranja-400 + texto negro-900.
 */
export interface EmotionItem {
  /** Clave estable, no cambia aunque cambie el label (ej. "calma"). */
  key: string;
  /** Texto visible, tal como lo normalizó Figma (ej. "CALMA"). */
  label: string;
  icon: React.ReactNode;
}

export interface EmotionSelectorProps {
  /** Default: `EMPUJON_EMOTIONS` (las 11 emociones con los glifos reales de Figma). */
  emotions?: EmotionItem[];
  /** Selección múltiple (como las 4 apps hoy) o única. Default true. */
  multiple?: boolean;
  /** Controlado: claves seleccionadas. Si se omite, el componente maneja su propio estado. */
  value?: string[];
  onChange?: (selectedKeys: string[]) => void;
  className?: string;
}

/**
 * Las 11 emociones normalizadas por Figma, con los glifos reales descargados del
 * archivo. Las apps legacy tienen 10 (fusionan "frustración" y "aburrimiento" en una
 * sola con nombre variable); esta lista es la fuente canónica para no seguir divergiendo.
 */
export const EMPUJON_EMOTIONS: EmotionItem[] = [
  { key: 'entusiasmo', label: 'ENTUSIASMO', icon: <IconEntusiasmo /> },
  { key: 'felicidad', label: 'FELICIDAD', icon: <IconFelicidad /> },
  { key: 'calma', label: 'CALMA', icon: <IconCalma /> },
  { key: 'confianza', label: 'CONFIANZA', icon: <IconConfianza /> },
  { key: 'confusion', label: 'CONFUSIÓN', icon: <IconConfusion /> },
  { key: 'cansancio', label: 'CANSANCIO', icon: <IconCansancio /> },
  { key: 'nervios', label: 'NERVIOS', icon: <IconNervios /> },
  { key: 'frustracion', label: 'FRUSTRACIÓN', icon: <IconFrustracion /> },
  { key: 'tristeza', label: 'TRISTEZA', icon: <IconTristeza /> },
  { key: 'enojo', label: 'ENOJO', icon: <IconEnojo /> },
  { key: 'aburrimiento', label: 'ABURRIMIENTO', icon: <IconAburrimiento /> },
];

export function EmotionSelector({
  emotions = EMPUJON_EMOTIONS,
  multiple = true,
  value,
  onChange,
  className,
}: EmotionSelectorProps) {
  const [internal, setInternal] = useState<string[]>([]);
  const selected = value ?? internal;

  const toggle = (key: string) => {
    const next = multiple
      ? selected.includes(key)
        ? selected.filter((k) => k !== key)
        : [...selected, key]
      : selected.includes(key)
        ? []
        : [key];
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div role="group" className={cn('grid grid-cols-2 sm:grid-cols-5 gap-4', className)}>
      {emotions.map((emotion) => {
        const isSelected = selected.includes(emotion.key);
        return (
          <button
            key={emotion.key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(emotion.key)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 size-[208px] rounded-chico border-2 border-whitesmoke cursor-pointer transition-colors',
              isSelected ? 'bg-orange text-black' : 'bg-transparent text-whitesmoke hover:bg-divider',
            )}
          >
            <span className="relative size-[100px] shrink-0" aria-hidden="true">
              {emotion.icon}
            </span>
            <span className="font-inter font-semibold text-[20px] leading-[1.3] text-center whitespace-nowrap">
              {emotion.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default EmotionSelector;
