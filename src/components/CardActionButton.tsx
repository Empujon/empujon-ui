'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconCamera, IconChevronForward } from './designerIcons';

// Insignia de "completado" (Figma nodes 7703:2360/2358, "check mark") — círculo
// verde-300 fijo con un check negro-900 adentro, igual en Filled y Outline (no
// cambia de color como el resto del contenido). Antes era un simple ícono
// currentColor; Figma lo reemplazó por esta insignia de 2 colores fijos.
const CompleteBadge = ({ className }: { className?: string }) => (
  <span className={cn('flex shrink-0 items-center justify-center rounded-full bg-green', className)}>
    <svg viewBox="0 0 24 24" fill="none" className="size-[75%]" aria-hidden="true">
      <path
        fill="#171D17"
        d="M10.257 19.6364C10.0104 19.6364 9.74927 19.5783 9.47366 19.4623C9.21256 19.3608 8.88619 19.1794 8.49455 18.9183C7.88532 18.5122 7.3051 18.019 6.75389 17.4388C6.21719 16.8586 5.695 16.2784 5.18731 15.6981C4.69412 15.1034 4.21544 14.5957 3.75127 14.1751C3.44665 13.914 3.25808 13.6094 3.18556 13.2612C3.11303 12.8986 3.13479 12.565 3.25083 12.2603C3.38138 11.9412 3.5772 11.6801 3.8383 11.4771C4.1139 11.2595 4.43302 11.1507 4.79566 11.1507C5.01324 11.1507 5.20181 11.1869 5.36137 11.2595C5.52093 11.3175 5.67324 11.4118 5.81829 11.5423C6.18093 11.8469 6.54356 12.2241 6.9062 12.6738C7.28334 13.1234 7.67499 13.5803 8.08114 14.0445C8.48729 14.5087 8.92246 14.9511 9.38663 15.3718C9.8508 15.7779 10.3512 16.1043 10.8879 16.3509L9.21256 16.4597C9.93784 15.1687 10.7792 13.8414 11.7365 12.4779C12.6939 11.1144 13.7165 9.76541 14.8044 8.43091C15.9068 7.09641 17.0165 5.83444 18.1334 4.64499C18.438 4.32587 18.6919 4.10829 18.8949 3.99225C19.1125 3.8762 19.3591 3.81818 19.6347 3.81818C19.9683 3.81818 20.2367 3.94148 20.4398 4.18807C20.6428 4.43466 20.7734 4.75378 20.8314 5.14543C20.8894 5.53708 20.8459 5.96499 20.7009 6.42916C20.5703 6.89333 20.3165 7.33575 19.9393 7.75641C19.1996 8.56871 18.467 9.41728 17.7418 10.3021C17.0165 11.1724 16.2985 12.079 15.5877 13.0219C14.8769 13.9502 14.1952 14.9076 13.5424 15.894C12.8897 16.8658 12.2732 17.8522 11.693 18.8531C11.5189 19.1577 11.3159 19.3608 11.0838 19.4623C10.8662 19.5783 10.5906 19.6364 10.257 19.6364Z"
      />
    </svg>
  </span>
);

/**
 * CardActionButton — banda de acción grande con ícono + label + chevron (Figma ›
 * "Buttons" › "Card Action Button", node 3473:7704). 6 estados medidos 1:1:
 *
 * - Filled: Default = bg whitesmoke/texto negro · Hover = bg celeste/texto negro
 *   (sin cambio) · Complete = bg negro, texto whitesmoke, check.
 * - Outline: el fondo es SIEMPRE gris-oscuro-800 en sus 3 estados — solo cambian
 *   borde y texto. Default = borde/texto naranja · Hover = borde/texto celeste ·
 *   Complete = borde/texto divider (gris-500), sin hover propio (estado terminal).
 *
 * `icon` trae un ícono default (cámara, igual que la instancia default de Figma)
 * para que el slot de ícono nunca se vea vacío — pasá tu propio ReactNode para
 * reemplazarlo, o `icon={null}` para ocultarlo.
 */
export interface CardActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  /**
   * Diferencia entre "Enabled" (default, `complete=false`) y "Complete":
   * - Enabled: la acción todavía no se hizo — es clickeable, tiene hover, y
   *   termina en un chevron (">") que invita a entrar/ejecutarla.
   * - Complete: la acción YA se completó — queda fija (sin hover propio) con
   *   una insignia de check verde al final en vez del chevron, como registro
   *   visual de que no hace falta volver a tocarla.
   */
  complete?: boolean;
  variant?: 'white' | 'outline';
  onClick?: () => void;
  className?: string;
}

export function CardActionButton({
  label,
  icon = <IconCamera className="size-full" />,
  complete,
  variant = 'white',
  onClick,
  className,
}: CardActionButtonProps) {
  const outline = variant === 'outline';
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-24 w-full max-w-[664px] items-center gap-6 rounded-[20px] px-6 transition-colors duration-200 ease-in-out',
        outline
          ? complete
            ? 'border-[3px] border-divider bg-darker-gray text-divider'
            : 'border-[3px] border-orange bg-darker-gray text-whitesmoke hover:border-blue hover:text-blue'
          : complete
            ? 'bg-black text-whitesmoke'
            : 'bg-whitesmoke text-black hover:bg-blue',
        className,
      )}
    >
      {icon && <span className="size-11 shrink-0">{icon}</span>}
      <span className="flex-1 text-left font-inter font-semibold text-[24px] tracking-[0.24px]">{label}</span>
      {complete ? <CompleteBadge className="size-8" /> : <IconChevronForward className="size-8 shrink-0" />}
    </button>
  );
}

export default CardActionButton;
