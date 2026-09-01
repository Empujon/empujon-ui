'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconImagePlaceholder } from './designerIcons';

/**
 * ImageCard — card con imagen destacada + label (Figma › "Cards" › "Image
 * Card", node 7701:1663). 3 estados medidos 1:1 contra los 3 nodos del set.
 *
 * Ojo: NO es la misma card que Access Card pese a lo que decía un comentario
 * previo acá — Access Card es una fila de texto+chevron sin imagen, layout
 * totalmente distinto. No la generaliza.
 *
 * Default/Hover recolorean la card ENTERA (borde + franja de label) — el área
 * de imagen queda siempre con el mismo fondo (`bg-divider`), solo cambia el
 * marco. Hover es interacción real (`hover:`).
 *
 * "Active" acá NO es el pseudo-estado `:active` (mouse presionado) como en el
 * resto de la familia Cards: por pedido explícito, un click deja la card en
 * naranja de forma persistente hasta el próximo click (toggle), no solo
 * mientras el mouse está presionado. Es controlable (`active` + `onClick`)
 * para casos tipo galería con selección única coordinada desde afuera; si no
 * se pasa `active`, la card maneja su propio toggle interno.
 */
export interface ImageCardProps {
  /** Imagen real (foto). Si no se pasa, se muestra el placeholder ilustrado de Figma. */
  image?: React.ReactNode;
  label?: string;
  /** Controlado: si se pasa, el toggle interno se ignora y este valor manda. */
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ImageCard({ image, label, active, onClick, className }: ImageCardProps) {
  const [internalActive, setInternalActive] = React.useState(false);
  const isControlled = active !== undefined;
  const isActive = isControlled ? active : internalActive;

  const handleClick = () => {
    if (!isControlled) setInternalActive((prev) => !prev);
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      className={cn(
        'group flex w-[328px] flex-col overflow-hidden rounded-card border-[3px] bg-darker-gray text-left transition-colors duration-200 ease-in-out',
        isActive ? 'border-orange bg-orange' : 'border-lightgray hover:border-blue hover:bg-blue',
        className,
      )}
    >
      <span className="flex h-[240px] w-full shrink-0 items-center justify-center bg-divider">
        {image ?? <IconImagePlaceholder className="size-full" />}
      </span>
      {label && (
        <span
          className={cn(
            'flex w-full items-center justify-center px-4 py-6',
            isActive ? 'bg-transparent' : 'bg-lightgray group-hover:bg-transparent',
          )}
        >
          <span className="text-center font-inter font-semibold text-[20px] tracking-[0.2px] text-black">
            {label}
          </span>
        </span>
      )}
    </button>
  );
}

export default ImageCard;
