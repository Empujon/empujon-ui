'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * EmotionCard — tarjeta de emoción en layout "acostado" (Figma › "Emociones" ›
 * component set `Emociones acostado`: Cansadx, Confianza, Nervios por ahora).
 *
 * A diferencia de `EmotionSelector` (grilla 208×208, ícono arriba + label debajo),
 * acá el ícono va a la izquierda y un texto libre a la derecha — para usarse como
 * opción de respuesta (ej. "¿cómo pasaban los minutos?" → "Desaparecían muy lento").
 *
 * El ícono ocupa 66px dentro de un slot de 88px (mismo criterio que el resto de la
 * lib con los glifos, ver `figma-icon-hitbox-sizing`) — el slot fija el margen contra
 * la tarjeta, y forzar el tamaño del `<svg>` (en vez de dejarlo en su tamaño
 * intrínseco) evita que íconos con distinto viewBox/relación de aspecto (ej. el de
 * Cansancio, más alto que ancho por el "zzz") se vean más grandes o chicos entre sí.
 *
 * Estados 1:1 con Figma: Default = transparente + borde blanco-100. Hover = fondo
 * gray-700 (real `:hover`, no variante separada — mismo criterio que el resto de la
 * lib). Selected = fondo naranja + texto negro-900; el ícono también cambia de color
 * en Selected (ver `IconCansancioSeleccionado`/`IconConfianzaSeleccionado` en
 * `emotionIcons.tsx` — no es un invertido genérico, cada glifo tiene su propio
 * tratamiento en Figma, ej. los lentes de Confianza pasan a magenta) — como el ícono
 * es intercambiable (`icon`), es responsabilidad de quien lo consume pasar la
 * versión coloreada correcta según `selected`.
 */
export interface EmotionCardProps {
  /** Ícono de la emoción, ya coloreado para el estado actual (ver nota arriba). */
  icon: React.ReactNode;
  /** Texto libre al lado del ícono — capa de texto editable, no una propiedad de Figma. */
  label: string;
  /** Seleccionado (Figma State=Selected). Default false. */
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function EmotionCard({ icon, label, selected = false, onClick, className }: EmotionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-chico border-2 border-whitesmoke px-6 py-4 transition-colors cursor-pointer',
        selected ? 'bg-orange' : 'bg-transparent enabled:hover:bg-gray-700',
        className,
      )}
    >
      <span className="relative flex size-[88px] shrink-0 items-center justify-center" aria-hidden="true">
        <span className="[&>svg]:size-[66px]">{icon}</span>
      </span>
      <span
        className={cn(
          'font-inter text-label-medio font-semibold whitespace-nowrap',
          selected ? 'text-black' : 'text-whitesmoke',
        )}
      >
        {label}
      </span>
    </button>
  );
}

export default EmotionCard;
