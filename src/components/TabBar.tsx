'use client';

import React from 'react';
import { cn } from '../lib/cn';

/**
 * TabBar — pestañas de navegación (Figma › "Tab bar"). Gap 100% nuevo.
 *
 * Seleccionada: borde inferior naranja 3px + texto naranja. Default: texto blanco
 * (`text-white`, el blanco-200 de marca, no blanco-100). Scrollable horizontal para
 * cuando no entran todas (Figma lo resuelve con un botón de scroll en mobile; acá se
 * resuelve con overflow-x nativo, más simple y funciona en cualquier ancho).
 */
export interface TabItem {
  value: string;
  label: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TabBar({ tabs, value, onChange, className }: TabBarProps) {
  return (
    <div role="tablist" className={cn('flex items-start overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex h-11 shrink-0 items-center justify-center whitespace-nowrap px-4 font-inter font-semibold text-[16px] tracking-[0.16px] transition-colors',
              isSelected
                ? 'border-b-[3px] border-orange text-orange'
                : 'border-b-[3px] border-transparent text-white hover:text-blue',
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;
