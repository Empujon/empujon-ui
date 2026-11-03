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
 * Estados del trigger (hand-off fluidez "Ajusta tu cámara y micrófono", node 1849:3222):
 * deshabilitado = borde e ícono `divider` (#6B796B); abierto = naranja; error = rojo;
 * reposo = whitesmoke. Abierto gana sobre error: es la interacción en curso.
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
  /** Texto del trigger. Con `hideLabel`, queda sólo como `aria-label`. */
  label: string;
  icon?: React.ReactNode;
  items: DropdownItem[];
  multiselect?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
  /** Ítem extra al final del menú, ej. { label: 'Agregar institución', onClick } */
  actionItem?: { label: string; icon?: React.ReactNode; onClick: () => void };
  /**
   * Trigger sólo con ícono + chevron. Figma: "componente dropdown con el texto
   * oculto" (selector de micrófono de fluidez).
   */
  hideLabel?: boolean;
  /** Trigger gris y sin abrir (ej. antes de que el navegador otorgue el permiso). */
  disabled?: boolean;
  /** Trigger en rojo (borde e ícono). */
  error?: boolean;
  /** De qué borde del trigger cuelga el menú. Default 'right' (selector del header). */
  menuAlign?: 'left' | 'right';
  /**
   * 'md' (default) = el componente del Figma. 'sm' = la instancia a escala 0,917
   * del selector de micrófono de fluidez (trigger 40px, ícono 22, textos 14,67).
   */
  size?: 'md' | 'sm';
  className?: string;
}

// Medidas por tamaño. 'sm' sale del design-context del hand-off de fluidez
// (node 1849:3222): todo el componente escalado a 0,917.
const SIZES = {
  md: {
    trigger: 'h-11 gap-3 px-4',
    icon: 'size-6',
    caret: 'size-4',
    menu: 'rounded-[16px] py-2 min-w-[223px]',
    item: 'gap-2 px-4 py-3 text-[16px] tracking-[0.16px]',
    check: 'size-6',
  },
  sm: {
    trigger: 'h-10 gap-[11px] px-[14.667px]',
    icon: 'size-[22px]',
    caret: 'size-[14.667px]',
    menu: 'rounded-[14.667px] py-[7.333px] min-w-[204px]',
    item: 'gap-[7.333px] px-[14.667px] py-[11px] text-[14.67px] tracking-[0.1467px]',
    check: 'size-[22px]',
  },
} as const;

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

export function Dropdown({
  label,
  icon,
  items,
  multiselect = false,
  value,
  onChange,
  actionItem,
  hideLabel = false,
  disabled = false,
  error = false,
  menuAlign = 'right',
  size = 'md',
  className,
}: DropdownProps) {
  const sz = SIZES[size];
  const [openState, setIsOpen] = useState(false);
  // Si se deshabilita con el menú abierto, el menú se cierra.
  const isOpen = openState && !disabled;
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

  const triggerColor = disabled
    ? 'cursor-not-allowed border-divider text-divider'
    : isOpen
      ? 'border-orange text-orange'
      : error
        ? 'border-red text-red hover:border-blue hover:text-blue'
        : 'border-whitesmoke text-whitesmoke hover:border-blue hover:text-blue';

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={hideLabel ? label : undefined}
        aria-invalid={error || undefined}
        className={cn(
          cn('group flex items-center rounded-pill border-2 bg-darker-gray transition-colors', sz.trigger),
          triggerColor,
        )}
      >
        {icon && <span className={cn('shrink-0', sz.icon)}>{icon}</span>}
        {!hideLabel && (
          <span
            className={cn(
              'font-inter font-semibold whitespace-nowrap',
              size === 'sm' ? 'text-[14.67px] tracking-[0.1467px]' : 'text-[16px] tracking-[0.16px]',
              !isOpen &&
                !disabled &&
                'group-hover:[text-decoration-line:underline] group-hover:[text-decoration-style:wavy] group-hover:underline-offset-2',
            )}
          >
            {label}
          </span>
        )}
        <IconCaretDown className={cn('shrink-0 transition-transform', sz.caret, isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute top-[calc(100%+2px)] z-10 flex flex-col items-start overflow-hidden bg-darker-gray shadow-[0px_1px_5px_0px_rgba(0,0,0,0.3),0px_2px_8px_1px_rgba(0,0,0,0.1)]',
            sz.menu,
            menuAlign === 'left' ? 'left-0' : 'right-0',
          )}
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
                  'group flex w-full items-center text-left font-inter font-semibold transition-colors',
                  sz.item,
                  isSelected && !multiselect ? 'text-orange' : 'text-whitesmoke hover:bg-blue hover:text-black',
                )}
              >
                {multiselect && <CheckboxGlyph checked={isSelected} />}
                <span className="flex-1 truncate">{item.label}</span>
                {isSelected && !multiselect && <IconCheckMark className={cn('shrink-0', sz.check)} />}
              </button>
            );
          })}
          {actionItem && (
            <button
              type="button"
              onClick={actionItem.onClick}
              className={cn('flex w-full items-center text-left font-inter font-semibold text-whitesmoke hover:bg-blue hover:text-black', sz.item)}
            >
              {actionItem.icon ?? <IconPlus className={cn('shrink-0', sz.check)} />}
              {actionItem.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
