'use client';

import React from 'react';
import { cn } from '../lib/cn';
import {
  IconAvatarEstudiante1,
  IconAvatarEstudiante2,
  IconAvatarEstudiante3,
  IconAvatarEstudiante4,
  IconAvatarCircleFrame,
  IconAvatarDocente,
  IconAvatarDocenteCircleFrame,
} from './designerIcons';

/**
 * Avatar — marco de foto/ilustración de perfil (Figma › "Avatar", node 6914:2306
 * "Todos los avatares").
 *
 * Los 4 personajes de estudiante + el de docente SÍ están bundleados ahora (son
 * parte del catálogo cerrado del sistema de diseño, no arte libre por producto) —
 * usar `character`. Cada estudiante tiene su propio dibujo (no una recolorización
 * del mismo, confirmado comparando los 4 assets) y su color de marca fijo
 * (verde/magenta/amarillo/celeste); Border lo pinta blanco, Plain/Circle a color.
 * El docente no tiene variante blanca — siempre naranja/negro-900, en las 3 formas.
 *
 * `src` (foto real) y `children` (fallback genérico, ej. iniciales) se mantienen
 * para el caso "con foto" y para cualquier ilustración fuera del catálogo.
 */
export type AvatarCharacter = 'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4' | 'docente';

const STUDENT_BODY: Record<'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4', React.FC<{ className?: string }>> = {
  'estudiante-1': IconAvatarEstudiante1,
  'estudiante-2': IconAvatarEstudiante2,
  'estudiante-3': IconAvatarEstudiante3,
  'estudiante-4': IconAvatarEstudiante4,
};

const STUDENT_COLOR: Record<'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4', string> = {
  'estudiante-1': 'text-green',
  'estudiante-2': 'text-magenta',
  'estudiante-3': 'text-yellow',
  'estudiante-4': 'text-blue',
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Personaje ilustrado del catálogo (Figma). Ignorado si hay `src`. */
  character?: AvatarCharacter;
  /** Contenido de fallback cuando no hay `src` ni `character` (iniciales, ícono). */
  children?: React.ReactNode;
  /** Border = marco cuadrado con borde. Plain = cuadrado sin borde. Circle = circular con borde. */
  shape?: 'border' | 'plain' | 'circle';
  /** Color del borde (Border/Circle). Figma usa blanco-100 sobre fondo oscuro, negro-900 sobre fondo claro. Ignorado si hay `character` (el marco lo define el propio personaje). */
  borderColor?: 'whitesmoke' | 'black';
  /** Tamaño en px (ancho = alto). Default 72 (Figma). */
  size?: number;
  className?: string;
}

export function Avatar({
  src,
  alt = '',
  character,
  children,
  shape = 'border',
  borderColor = 'whitesmoke',
  size = 72,
  className,
}: AvatarProps) {
  const isCircle = shape === 'circle';
  const isPlain = shape === 'plain';
  const hasBorder = !isPlain;
  const isDocente = character === 'docente';
  const isStudent = !!character && character !== 'docente';

  // Proporciones tomadas del asset real a tamaño de referencia (72px): el
  // cuerpo del estudiante es 40×56, el del docente 42×58 — se escalan según
  // `size` para no depender de un tamaño fijo.
  const bodyStyle = isDocente
    ? { width: size * (42 / 72), height: size * (58 / 72) }
    : { width: size * (40 / 72), height: size * (56 / 72) };

  // El aro Circle de un personaje trae su propio fondo/marco en el SVG (frame) —
  // el contenedor no necesita bg/border propios en ese caso. Sin `character`
  // (foto o children), Circle sigue usando el bg/border genéricos de siempre.
  const frameComesFromCharacter = isCircle && !!character;

  let containerBg = 'bg-black';
  let containerBorder = hasBorder ? (borderColor === 'black' ? 'border-2 border-black' : 'border-2 border-whitesmoke') : '';
  if (character && isDocente) {
    containerBg = 'bg-[#D1D6D1]';
    containerBorder = hasBorder ? 'border-2 border-black' : '';
  } else if (character && isPlain) {
    containerBg = 'bg-transparent';
    containerBorder = '';
  }

  const renderCharacter = () => {
    if (isDocente) return <IconAvatarDocente className="size-full" />;
    if (isStudent) {
      const Body = STUDENT_BODY[character as keyof typeof STUDENT_BODY];
      const colorClass = STUDENT_COLOR[character as keyof typeof STUDENT_COLOR];
      return <Body className={cn('size-full', isCircle || isPlain ? colorClass : 'text-whitesmoke')} />;
    }
    return null;
  };

  // El aro de un personaje (Circle) es un dibujo festoneado/ondulado, no un
  // círculo perfecto — Figma nunca lo recorta con una máscara circular en el
  // contenedor, deja que el propio SVG defina el contorno. Clipparlo con
  // `rounded-full overflow-hidden` (como sí hace falta para foto/children)
  // le aplanaba las puntas y se veía "raro".
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center',
        frameComesFromCharacter ? '' : 'overflow-hidden',
        frameComesFromCharacter ? '' : isCircle ? 'rounded-full' : 'rounded-[20px]',
        !frameComesFromCharacter && containerBg,
        !frameComesFromCharacter && containerBorder,
        className,
      )}
      style={{ width: size, height: size }}
    >
      {frameComesFromCharacter && (
        isDocente
          ? <IconAvatarDocenteCircleFrame className="absolute inset-0 size-full" />
          : <IconAvatarCircleFrame className={cn('absolute inset-0 size-full', STUDENT_COLOR[character as keyof typeof STUDENT_COLOR])} />
      )}
      {src ? (
        <img src={src} alt={alt} className="relative z-10 size-full object-cover" />
      ) : character ? (
        <span className="relative z-10 shrink-0" style={bodyStyle}>{renderCharacter()}</span>
      ) : (
        children
      )}
    </div>
  );
}

export default Avatar;
