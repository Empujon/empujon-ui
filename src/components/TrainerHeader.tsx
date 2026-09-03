'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * TrainerHeader — encabezado de app entrenadora (Figma › "Header entrenadores" ›
 * "titulos entrenadores": ícono del microaplicativo + título + estudiante opcional).
 *
 * Hoy cada entrenador (fluidez_lectora, turbo, granpaneo, iconic_memory) hardcodea este
 * bloque a mano con el nombre de la app fijo; solo fluidez_lectora lo tenía extraído a
 * componente (sin props). Este centraliza layout/tipografía y deja título/ícono/subtítulo
 * como props — el ícono se recibe por prop (no se bundlea acá) para no duplicar los SVG
 * de marca que cada app ya tiene en su propio `/public`.
 *
 * Responsive 1:1 con Figma: en mobile el texto crece y hace wrap (flex-1); a partir de
 * `sm:` se fija sin wrap y centrado, como en el frame Desktop.
 */
export interface TrainerHeaderProps {
  /** Glifo/logo del microaplicativo, 44×44. */
  icon: React.ReactNode;
  /** Título del entrenador, ej. "Entrenador Turbolectura". */
  title: string;
  /** Texto secundario opcional, ej. "Estudiante: Eric Bejarano (2do grado)". */
  subtitle?: string;
  className?: string;
}

export function TrainerHeader({ icon, title, subtitle, className }: TrainerHeaderProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative shrink-0 size-11" aria-hidden="true">
        {icon}
      </div>
      <div className="flex flex-col items-start min-w-0 flex-1 not-italic sm:flex-none sm:shrink-0 sm:text-center sm:whitespace-nowrap">
        <p className="font-inter font-semibold text-[20px] leading-[1.3] text-whitesmoke w-full sm:w-auto">
          {title}
        </p>
        {subtitle && (
          <p className="font-inter font-medium text-[14px] leading-[1.4] tracking-[0.14px] text-lightgray w-full sm:w-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default TrainerHeader;
