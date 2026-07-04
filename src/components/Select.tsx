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

// Chevron del proyecto (currentColor) — mismo path que usan BreadcrumbSelect y
// los filtros de Gestión.
function Chevron({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M5.3509 6.03546C5.91827 6.03546 6.45019 6.14184 6.94664 6.35461C7.4431 6.56738 7.97501 6.91017 8.54238 7.38298C9.10976 7.85579 9.74806 8.49409 10.4573 9.29787C11.1665 10.1253 12.0057 11.1655 12.975 12.4184L11.1665 12.383C12.5377 10.9173 13.6369 9.74704 14.4644 8.87234C15.2918 8.02128 15.9419 7.38298 16.4147 6.95745C16.8875 6.55555 17.2776 6.29551 17.5849 6.1773C17.8686 6.0591 18.1641 6 18.4715 6C18.8734 6 19.2634 6.10638 19.6417 6.31915C19.9963 6.53191 20.2918 6.80378 20.5282 7.13475C20.7646 7.46572 20.8828 7.78487 20.8828 8.0922C20.8828 8.35225 20.8355 8.61229 20.741 8.87234C20.6464 9.13239 20.4336 9.45154 20.1027 9.82979C19.7717 10.208 19.2752 10.7045 18.6133 11.3191C17.9514 11.9338 17.053 12.7258 15.9183 13.695C15.2091 14.3097 14.6535 14.7825 14.2516 15.1135C13.8261 15.4444 13.4242 15.669 13.0459 15.7872C12.6677 15.9291 12.1949 16 11.6275 16C11.0601 16 10.5755 15.8818 10.1736 15.6454C9.74806 15.4326 9.27525 14.9598 8.75515 14.227C7.85681 12.9976 7.06484 12.0284 6.37926 11.3191C5.67004 10.6099 5.07903 10.0544 4.60622 9.65248C4.10976 9.25059 3.74333 8.9078 3.50692 8.62411C3.24688 8.36407 3.11685 8.04492 3.11685 7.66667C3.11685 7.21749 3.32962 6.82742 3.75515 6.49645C4.15704 6.18913 4.68896 6.03546 5.3509 6.03546Z"
      />
    </svg>
  );
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
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-white text-sm font-semibold">
        {label}
        {error && <span className="text-magenta ml-2 font-normal">{error}</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full px-4 py-1.5 border-2 rounded-2xl text-base appearance-none pr-10 font-shantell font-bold focus:outline-none transition-colors',
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
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current">
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
    triggerClass = 'border-2 border-red bg-black text-white';
  } else if (isOpen) {
    triggerClass = 'border-2 border-blue bg-black text-white';
  } else {
    triggerClass = 'border-2 border-lgray bg-black text-white';
  }

  const handlePick = (v: string) => {
    setIsOpen(false);
    if (v !== value) onChange(v);
  };

  return (
    <div ref={containerRef} className={cn('flex flex-col gap-2', className)}>
      <label className="font-inter font-bold text-white">{label}</label>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => !disabled && setIsOpen((p) => !p)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn('w-full flex items-center justify-between px-4 h-[44px] rounded-[16px] font-inter text-base text-left focus:outline-none transition-colors', triggerClass)}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <Chevron className={cn('w-4 h-4 flex-shrink-0 transition-transform', isOpen && 'rotate-180')} />
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
