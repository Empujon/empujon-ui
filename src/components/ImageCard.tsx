'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * ImageCard — card con imagen destacada + label (Figma › "Cards" › "Image Card" /
 * "Access Card"). Generaliza ambas: Access Card es la misma card con la imagen vacía
 * (fondo sólido) vs llena — acá eso es simplemente `image` opcional.
 */
export interface ImageCardProps {
  image?: React.ReactNode;
  label?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ImageCard({ image, label, selected, onClick, className }: ImageCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex w-[328px] flex-col gap-2 overflow-hidden rounded-2xl border-2 bg-darker-gray p-3 text-left transition-colors',
        selected ? 'border-blue' : 'border-whitesmoke hover:border-blue',
        className,
      )}
    >
      <span className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-xl bg-black">
        {image}
      </span>
      {label && <span className="font-inter font-semibold text-[16px] text-whitesmoke">{label}</span>}
    </button>
  );
}

export default ImageCard;
