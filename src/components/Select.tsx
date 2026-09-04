'use client';

// Select — campo select con dos variantes visuales.
//
// variant='default' (legacy /settings): <select> nativo estilado (Shantell,
//   transparente, borde blanco).
// variant='neutral' (sistema nuevo): trigger tipo Input neutral + panel dropdown
//   portalado (bg-black, items con hover azul, activo naranja subrayado).

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/cn';
import { IconCaretDown } from './designerIcons';

type Variant = 'default' | 'neutral';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  saved?: boolean;
  error?: string;
  disabled?: boolean;
  helper?: string;
  variant?: Variant;
  className?: string;
}

// Chevron real de Figma (mismo glifo de Dropdown/Accordion), no el hand-drawn de antes.
function Chevron({ className }: { className?: string }) {
  return <IconCaretDown className={className} />;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = '',
  saved = false,
  error,
  disabled = false,
  helper,
  variant = 'default',
  className,
}: SelectProps) {
  if (variant === 'neutral') {
    return (
      <NeutralSelect
        label={label}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder || 'Elegir'}
        error={error}
        disabled={disabled}
        helper={helper}
        className={className}
      />
    );
  }

  return (
    <div className={cn('flex flex-col gap-2 w-full max-w-[680px]', className)}>
      <label className="text-white text-sm font-semibold">
        {label}
        {error && <span className="text-magenta ml-2 font-normal">{error}</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full px-4 py-1.5 border-2 rounded-2xl text-label-chico appearance-none pr-10 font-inter font-bold focus:outline-none transition-colors',
            error
              ? 'bg-transparent border-magenta text-white/70'
              : saved && value
                ? 'bg-white border-gray/50 text-black'
                : cn('bg-transparent focus:border-green', value ? 'text-white/70 border-blue' : 'text-white border-white'),
          )}
          style={{ backgroundImage: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
          <Chevron className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

interface NeutralSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  error?: string;
  disabled: boolean;
  helper?: string;
  className?: string;
}

function NeutralSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled,
  helper,
  className,
}: NeutralSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (ev: MouseEvent) => {
      const target = ev.target as Node;
      const insideTrigger = !!containerRef.current?.contains(target);
      const insidePanel = !!panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) setIsOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setPanelPos(null);
      return;
    }
    const PANEL_HEIGHT_ESTIMATE = 240;
    const GAP = 4;
    const recompute = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      let top = rect.bottom + GAP;
      if (top + PANEL_HEIGHT_ESTIMATE > window.innerHeight) {
        top = Math.max(GAP, rect.top - GAP - PANEL_HEIGHT_ESTIMATE);
      }
      setPanelPos({ top, left: rect.left, width: rect.width });
    };
    recompute();
    window.addEventListener('scroll', recompute, { capture: true, passive: true });
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('scroll', recompute, { capture: true } as EventListenerOptions);
      window.removeEventListener('resize', recompute);
    };
  }, [isOpen]);

  const selected = options.find((o) => o.value === value) || null;

  let triggerClass: string;
  if (disabled) {
    triggerClass = 'border-2 border-transparent bg-darker-gray/50 text-darker-gray/50 cursor-not-allowed';
  } else if (error) {
    triggerClass = 'border-2 border-red bg-black';
  } else if (isOpen) {
    triggerClass = 'border-2 border-blue bg-black';
  } else {
    triggerClass = 'border-2 border-lgray bg-black';
  }

  const handlePick = (v: string) => {
    setIsOpen(false);
    if (v !== value) onChange(v);
  };

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-2 w-full max-w-[680px]', className)}>
      <label className="font-inter font-bold text-white">{label}</label>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen((p) => !p)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn('w-full flex items-center justify-between px-4 h-[44px] rounded-[16px] font-inter text-label-chico text-left focus:outline-none transition-colors', triggerClass)}
        >
          <span className={cn('truncate', !disabled && (selected ? 'text-whitesmoke' : 'text-divider'))}>{selected ? selected.label : placeholder}</span>
          <Chevron className={cn('w-4 h-4 flex-shrink-0 transition-transform', disabled ? 'text-darker-gray/50' : 'text-white', isOpen && 'rotate-180')} />
        </button>
      </div>

      {isOpen && !disabled && panelPos && typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={panelRef}
            role="listbox"
            className="fixed z-[60] bg-black py-2 rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.7)] overflow-y-auto max-h-[280px]"
            style={{ top: panelPos.top, left: panelPos.left, width: panelPos.width }}
          >
            {options.length === 0 ? (
              <p className="px-4 py-2 font-inter text-white/60 text-base">No hay opciones.</p>
            ) : (
              options.map((opt) => {
                const isActive = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => handlePick(opt.value)}
                    className={cn(
                      'w-full text-left px-4 py-2 font-inter text-base transition-colors whitespace-nowrap bg-black hover:text-black hover:bg-blue active:bg-orange active:text-black',
                      isActive ? 'text-orange underline decoration-solid underline-offset-4' : 'text-white',
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })
            )}
          </div>,
          document.body,
        )}
      {(error || helper) && (
        <p className={cn('font-inter text-xs', error ? 'text-red' : 'text-white')}>{error || helper}</p>
      )}
    </div>
  );
}

export default Select;

// ── Metadata de bloque (page builder) ──────────────────────────────────────────
import type { UiBlockMeta } from '../block-meta';

// Nota: `options` es un array y el sistema de bloques aún no tiene control para
// arrays; el wrapper del builder inyecta un set de opciones de ejemplo para que
// el bloque sea presentacional. Editar las opciones reales queda pendiente.
export const selectBlockMeta: UiBlockMeta = {
  type: 'ui:select',
  label: 'Selector',
  icon: 'ChevronDown',
  exportName: 'Select',
  controlled: { valueProp: 'value', onChangeProp: 'onChange', initial: '' },
  props: {
    label: { control: 'text', label: 'Etiqueta', default: 'Elegí una opción' },
    placeholder: { control: 'text', label: 'Placeholder', default: 'Elegir' },
    variant: { control: 'enum', label: 'Estilo', default: 'neutral', options: ['neutral', 'default'] },
    disabled: { control: 'boolean', label: 'Deshabilitado', default: false },
  },
};
