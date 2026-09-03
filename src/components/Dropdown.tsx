'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/cn';
import { IconCaretDown, IconCheckMark, IconPlus } from './designerIcons';

/**
 * Dropdown — trigger tipo píldora + menú (Figma › "Dropdown"). Gap 100% nuevo.
 *
 * Distinto de `Select` (que ya existe, pensado para formularios: label arriba, panel
 * portalado que se auto-posiciona contra el viewport). Este es el patrón "selector de
 * contexto" que se ve en Figma (ej. selector de institución en el header): trigger con
 * ícono opcional + label + chevron, menú con soporte de multiselect (checkbox) y un
 * ítem de acción al final (ej. "Agregar institución").
 *
 * El menú NO está portalado (posición `absolute` relativa al trigger) — más simple,
 * pero puede recortarse cerca del borde de la pantalla. Si eso importa, mirar cómo
 * `Select`/`NeutralSelect` resuelve el posicionamiento con portal + recompute on scroll.
 */
export interface DropdownItem {
  value: string;
  label: string;
}

export interface DropdownProps {
  /** Texto del trigger. */
  label: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
  multiselect?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  /** Ítem extra al final del menú, ej. { label: 'Agregar institución', onClick } */
  actionItem?: { label: string; icon?: React.ReactNode; onClick: () => void };
  className?: string;
}

const CheckboxGlyph = ({ checked }: { checked: boolean }) => (
  <span
    className={cn(
      'flex size-6 shrink-0 items-center justify-center border-2',
      checked
        ? 'rounded-chico border-orange bg-orange'
        : 'rounded border-lightgray bg-transparent group-hover:border-darker-gray',
    )}
  >
    {checked && <IconCheckMark className="size-4 text-black" />}
  </span>
);

export function Dropdown({ label, icon, items, multiselect = false, value, onChange, actionItem, className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (ev: MouseEvent) => {
      if (!ref.current?.contains(ev.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  const toggleItem = (itemValue: string) => {
    if (multiselect) {
      onChange(value.includes(itemValue) ? value.filter((v) => v !== itemValue) : [...value, itemValue]);
    } else {
      onChange([itemValue]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'group flex h-11 items-center gap-3 rounded-pill border-2 bg-darker-gray px-4 transition-colors',
          isOpen ? 'border-orange text-orange' : 'border-whitesmoke text-whitesmoke hover:border-blue hover:text-blue',
        )}
      >
        {icon && <span className="size-6 shrink-0">{icon}</span>}
        <span
          className={cn(
            'font-inter font-semibold text-[16px] tracking-[0.16px] whitespace-nowrap',
            !isOpen &&
              'group-hover:font-shantell group-hover:leading-[32px] group-hover:tracking-normal group-hover:[text-decoration-line:underline] group-hover:[text-decoration-style:wavy] group-hover:underline-offset-2',
          )}
        >
          {label}
        </span>
        <IconCaretDown className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+2px)] z-10 flex min-w-[223px] flex-col items-start overflow-hidden rounded-[16px] bg-darker-gray py-2 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.3),0px_2px_8px_1px_rgba(0,0,0,0.1)]"
        >
          {items.map((item) => {
            const isSelected = value.includes(item.value);
            return (
              <button
                key={item.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => toggleItem(item.value)}
                className={cn(
                  'group flex w-full items-center gap-2 px-4 py-3 text-left font-inter font-semibold text-[16px] tracking-[0.16px] transition-colors',
                  isSelected && !multiselect ? 'text-orange' : 'text-whitesmoke hover:bg-blue hover:text-black',
                )}
              >
                {multiselect && <CheckboxGlyph checked={isSelected} />}
                <span className="flex-1 truncate">{item.label}</span>
                {isSelected && !multiselect && <IconCheckMark className="size-6 shrink-0" />}
              </button>
            );
          })}
          {actionItem && (
            <button
              type="button"
              onClick={actionItem.onClick}
              className="flex w-full items-center gap-2 px-4 py-3 text-left font-inter font-semibold text-[16px] tracking-[0.16px] text-whitesmoke hover:bg-blue hover:text-black"
            >
              {actionItem.icon ?? <IconPlus className="size-6 shrink-0" />}
              {actionItem.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
