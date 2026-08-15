'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { IconHome } from './designerIcons';

/**
 * Breadcrumb — migas de pan de navegación de solo lectura (Figma › "Breadcrumb",
 * variante "Simple path (no dropdowns)"): ítems de link (Inter, subrayado) + el
 * actual en Shantell sin subrayar, separados por "/".
 *
 * El propio frame de Figma también define una variante "Has Dropdown" — un
 * segmento que además abre un selector (el selector de colegios de la home de
 * empujón). Esa parte vive en `BreadcrumbSelect`, portado 1:1 de
 * `empujon/frontend` (búsqueda, filtrado, estados) con los íconos reales de la
 * librería.
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Ícono de casita antes del primer ítem. Default true. */
  showHomeIcon?: boolean;
  className?: string;
}

export function Breadcrumb({ items, showHomeIcon = true, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-2', className)}>
      {showHomeIcon && <IconHome className="size-6 shrink-0 text-whitesmoke" />}
      {items.map((item, i) => {
        const isCurrent = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-lightgray">/</span>}
            {isCurrent ? (
              <span className="font-shantell font-semibold text-[20px] text-whitesmoke whitespace-nowrap">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="font-inter font-medium text-[16px] text-lightgray underline underline-offset-2 whitespace-nowrap hover:text-blue"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
