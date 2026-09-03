'use client';

import React from 'react';
import { cn } from '../lib/cn';
import {
  IconAvatarEstudiante1,
  IconAvatarEstudiante2,
  IconAvatarEstudiante3,
  IconAvatarEstudiante4,
  IconAvatarCircleFrame,
  IconAvatarCirclePhotoRing,
  IconAvatarDocente,
  IconAvatarDocenteCircleFrame,
} from './designerIcons';

/**
 * Avatar — marco de foto/ilustración de perfil (Figma › "Avatar", node 6914:2306
 * "Todos los avatares").
 *
 * Los 4 personajes de estudiante + el de docente + "iniciales" SÍ están
 * bundleados ahora (son parte del catálogo cerrado del sistema de diseño, no
 * arte libre por producto) — usar `character`. Cada estudiante tiene su propio
 * dibujo (no una recolorización del mismo, confirmado comparando los 4 assets)
 * y su color de marca fijo (verde/magenta/amarillo/celeste); Border lo pinta
 * blanco, Plain/Circle a color. El docente no tiene variante blanca — siempre
 * naranja/negro-900, en las 3 formas. "iniciales" es texto (pasado por
 * `children`, ej. "EB") con el mismo patrón de color que un estudiante pero
 * fijo en verde (Figma: `brand/verde 300`), tipografía Shantell Sans SemiBold.
 *
 * `src` (foto real) se mantiene para el caso "con foto"; `children` sin
 * `character` sigue siendo el fallback libre para cualquier contenido fuera
 * del catálogo.
 */
export type AvatarCharacter = 'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4' | 'docente' | 'iniciales';

const STUDENT_BODY: Record<'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4', React.FC<{ className?: string }>> = {
  'estudiante-1': IconAvatarEstudiante1,
  'estudiante-2': IconAvatarEstudiante2,
  'estudiante-3': IconAvatarEstudiante3,
  'estudiante-4': IconAvatarEstudiante4,
};

// `group-hover:text-black` es a propósito en las 4: en StudentCard (Figma ›
// "Student Card", fila Hover de los 15 nodos) el personaje se pone negro al
// pasar el mouse sobre la tarjeta contenedora — se nota más en "estudiante-4"
// porque su celeste (`text-blue`) es el mismo que `hover:bg-blue` de la
// card y si no fuera negro el dibujo directamente desaparecería, pero el
// cambio a negro pasa en los 5 themes por igual, no solo en ese caso.
// Inerte fuera de un ancestro `.group` con hover (Circle/Plain en otro lado).
const STUDENT_COLOR: Record<'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4', string> = {
  'estudiante-1': 'text-green group-hover:text-black',
  'estudiante-2': 'text-magenta group-hover:text-black',
  'estudiante-3': 'text-yellow group-hover:text-black',
  'estudiante-4': 'text-blue group-hover:text-black',
};

// "iniciales" no tiene dibujo propio (es texto) pero comparte el mismo patrón
// de color festoneado que un estudiante — Figma lo fija en verde siempre.
const INICIALES_COLOR = 'text-green';

// Contorno festoneado/ondulado (el mismo de IconAvatarCircleFrame, en su
// versión "relleno" a 72×72) — Figma lo usa para recortar la foto en Style
// Circle. No es un círculo: por eso una máscara `rounded-full` común lo
// aplanaba. El color del aro para "con foto" es `escala de grises/gris claro
// 200` (#e4e7e4), fijo (no depende de `borderColor`).
const AVATAR_CIRCLE_CLIP_PATH_D =
  'M72 21.0076V51.0031C72 51.831 71.664 52.5821 71.1216 53.1244C70.5792 53.6668 69.828 54.0027 69 54.0027C68.172 54.0027 67.4208 54.3386 66.8784 54.8809C66.336 55.4233 66 56.1744 66 57.0022C66 57.8301 65.664 58.5812 65.1216 59.1235C64.5792 59.6659 63.828 60.0018 63 60.0018C62.172 60.0018 61.4208 60.3377 60.8784 60.88C60.336 61.4224 60.0024 62.1675 60 62.9906V63.0013C59.9976 63.8244 59.6616 64.5707 59.1216 65.1106C58.5792 65.6542 57.828 65.9901 57 65.9901C56.172 65.9901 55.4208 66.326 54.8784 66.8684C54.336 67.4119 54 68.1606 54 68.9897V68.9932C54 69.8211 53.664 70.571 53.1216 71.1145C52.5792 71.6569 51.828 71.9928 51 71.9928H48V71.9964H42V72H30V71.9892H24V71.9928H21C19.344 71.9928 18.0024 70.6514 18 68.9969V68.9932C17.9988 68.1654 17.6628 67.4179 17.1216 66.8756C16.5792 66.3333 15.828 65.9973 15 65.9973C13.344 65.9973 12.0024 64.6571 12 63.0013V62.9978C11.9988 62.1711 11.6628 61.4212 11.1216 60.88C10.5792 60.3377 9.828 60.0018 9 60.0018C7.344 60.0018 6.0024 58.6616 6 57.0058V57.0022C5.9988 56.1744 5.6628 55.4269 5.1216 54.8846C4.5792 54.3423 3.828 54.0063 3 54.0063C1.3428 54.0063 0 52.6637 0 51.0067V21.0112C0 20.1821 0.336 19.4335 0.8784 18.89C1.4208 18.3476 2.172 18.0117 3 18.0117C3.828 18.0117 4.5792 17.6757 5.1216 17.1334C5.664 16.5899 6 15.8412 6 15.0121V15.0085C6 14.1807 6.336 13.4295 6.8784 12.8872C7.4208 12.3449 8.172 12.009 9 12.009C9.828 12.009 10.5792 11.6731 11.1216 11.1307C11.664 10.5884 12 9.83731 12 9.00943V9.00586C12 8.17678 12.336 7.42807 12.8784 6.88456C13.4208 6.34224 14.172 6.00631 15 6.00631C15.828 6.00631 16.5792 5.67032 17.1216 5.128C17.664 4.58448 18 3.83583 18 3.00676V3.00312C18 2.17525 18.336 1.42414 18.8784 0.881821C19.4208 0.339502 20.172 0.00357368 21 0.00357368H24V0H30V0.0107796H42V0.00720595H48V0.00357368H51C51.828 0.00357368 52.5792 0.339502 53.1216 0.881821C53.6628 1.42294 53.9988 2.17287 54 2.99955V3.00312C54.0024 4.65768 55.344 5.9991 57 5.9991C57.828 5.9991 58.5792 6.33503 59.1216 6.87735C59.664 7.42087 60 8.16958 60 8.99865V9.00943C60 10.6664 61.3428 12.009 63 12.009C63.828 12.009 64.5792 12.3449 65.1216 12.8872C65.664 13.4295 66 14.1807 66 15.0085C66 16.6655 67.3428 18.0081 69 18.0081C69.828 18.0081 70.5792 18.344 71.1216 18.8863C71.664 19.4287 72 20.1798 72 21.0076Z';

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Personaje ilustrado del catálogo (Figma). Ignorado si hay `src`. Con `character="iniciales"` el texto sale de `children` (ej. "EB"). */
  character?: AvatarCharacter;
  /** Con `character="iniciales"`: el texto a mostrar (ej. "EB"). Sin `src` ni `character`: fallback libre (ícono, contenido custom). */
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
  const clipId = React.useId();
  const isCircle = shape === 'circle';
  const isPlain = shape === 'plain';
  const hasBorder = !isPlain;
  const isDocente = character === 'docente';
  const isIniciales = character === 'iniciales';
  const isStudent = !!character && character !== 'docente' && character !== 'iniciales';

  // Proporción tomada del asset real a tamaño de referencia (72px): el cuerpo
  // (estudiante o docente, misma medida) es 34×48 — se escala según `size`
  // para no depender de un tamaño fijo.
  const bodyStyle = { width: size * (34 / 72), height: size * (48 / 72) };

  // El aro Circle de un personaje (o de una foto) trae su propio fondo/marco
  // festoneado — el contenedor no necesita bg/border propios en ese caso. Solo
  // el fallback genérico (`children` sin `character` ni `src`) sigue usando el
  // bg/border genéricos (círculo liso) de siempre.
  const hasCircleFrame = isCircle && (!!character || !!src);

  let containerBg = 'bg-black';
  let containerBorder = hasBorder ? (borderColor === 'black' ? 'border-2 border-black' : 'border-2 border-whitesmoke') : '';
  // Plain sigue con el mismo fondo negro-900 que Border (confirmado en el
  // asset real: el SVG de cada personaje en Plain trae un <rect fill="#171D17"
  // rx="20"/> detrás del dibujo) — la única diferencia con Border es que no
  // tiene el trazo blanco/negro alrededor (ya cubierto por `hasBorder`).
  if (character && isDocente) {
    containerBg = 'bg-[#D1D6D1]';
    containerBorder = hasBorder ? 'border-2 border-black' : '';
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

  // El aro de un personaje o de una foto (Circle) es un dibujo festoneado/
  // ondulado, no un círculo perfecto — Figma nunca lo recorta con una máscara
  // circular común. `rounded-full overflow-hidden` le aplanaba las puntas y se
  // veía "raro"; solo el fallback genérico (`children` sin `src`/`character`,
  // fuera del catálogo de Figma) sigue usando ese círculo liso.
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center',
        hasCircleFrame ? '' : 'overflow-hidden',
        hasCircleFrame ? '' : isCircle ? 'rounded-full' : 'rounded-[20px]',
        !hasCircleFrame && containerBg,
        !hasCircleFrame && containerBorder,
        className,
      )}
      style={{ width: size, height: size }}
    >
      {hasCircleFrame && !src && (
        isDocente
          ? <IconAvatarDocenteCircleFrame className="absolute inset-0 size-full" />
          : <IconAvatarCircleFrame className={cn('absolute inset-0 size-full', isIniciales ? INICIALES_COLOR : STUDENT_COLOR[character as keyof typeof STUDENT_COLOR])} />
      )}
      {src && isCircle ? (
        <>
          <svg viewBox="0 0 72 72" className="relative size-full" role="img" aria-label={alt}>
            <defs>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <path d={AVATAR_CIRCLE_CLIP_PATH_D} />
              </clipPath>
            </defs>
            <image href={src} width="72" height="72" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
          </svg>
          {/* El aro va DESPUÉS (encima) de la foto, no detrás: su trazo de 2px
              queda centrado sobre el borde de la máscara (mitad adentro, mitad
              afuera) — si quedara detrás, la foto le taparía la mitad interna
              y se vería de 1px en vez de 2px, igual que arma Figma. Sin
              relleno (a diferencia del de los personajes) para no tapar la foto. */}
          <IconAvatarCirclePhotoRing className="absolute inset-[-1.39%] text-[#e4e7e4]" />
        </>
      ) : src ? (
        <img src={src} alt={alt} className="relative z-10 size-full object-cover" />
      ) : isIniciales ? (
        <span
          className={cn('relative z-10 font-shantell font-semibold', isCircle || isPlain ? INICIALES_COLOR : 'text-whitesmoke')}
          style={{ fontSize: size * (40 / 72), letterSpacing: size * (0.4 / 72), lineHeight: 1.2 }}
        >
          {children}
        </span>
      ) : character ? (
        <span className="relative z-10 shrink-0" style={bodyStyle}>{renderCharacter()}</span>
      ) : (
        children
      )}
    </div>
  );
}

export default Avatar;
