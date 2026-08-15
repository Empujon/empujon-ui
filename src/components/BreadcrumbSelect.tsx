'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../lib/cn';
import { IconCaretDown, IconCheckMark, IconSearch } from './designerIcons';

/**
 * BreadcrumbSelect — segmento de breadcrumb que además es un selector (Figma ›
 * "Breadcrumb", node 7414:3177: "Breadcrumb Item" Dropdown=Has Dropdown +
 * "Breadcrumb Dropdown Menu"). Portado 1:1 de `empujon/frontend`
 * (`BreadcrumbSelect.tsx`, usado por OrgSelector/CourseSelector — el selector de
 * colegios de la home) — mismo comportamiento (búsqueda con umbral, filtrado sin
 * diacríticos, click-outside/Escape), con los íconos reales de la librería en vez
 * de los copiados a mano en la app.
 *
 * Distinto de `Breadcrumb` (la migas de solo lectura): este es el segmento
 * interactivo que abre una lista para cambiar de opción sin navegar.
 */
const SEARCH_THRESHOLD = 3;

function normalizeForFilter(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export interface BreadcrumbSelectOption {
  id: string;
  label: string;
}

export interface BreadcrumbSelectProps {
  /** Opción actualmente seleccionada. Define el label del trigger y la fila activa del menú. */
  currentId: string;
  options: BreadcrumbSelectOption[];
  /** Se dispara al elegir una opción distinta a la actual. */
  onSelect: (id: string) => void;
  /** Click handler opcional para el CUERPO del trigger (ícono + label). Si se
   *  pasa, el cuerpo navega (u otra acción) y el chevron pasa a ser el único
   *  que abre el menú. Sin esto, todo el cuerpo abre/cierra el menú. */
  onBodyClick?: () => void;
  /** Ícono a la izquierda del label (currentColor para heredar el color del trigger). */
  icon?: React.ReactNode;
  className?: string;
}

export function BreadcrumbSelect({ currentId, options, onSelect, onBodyClick, icon, className }: BreadcrumbSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = options.find((o) => o.id === currentId) || options[0] || null;
  const hasMultiple = options.length > 1;

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (ev: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(ev.target as Node)) setIsOpen(false);
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

  const handlePick = (id: string) => {
    setIsOpen(false);
    if (id === currentId) return;
    onSelect(id);
  };

  if (!current) return null;

  const handleBody = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    if (onBodyClick) onBodyClick();
    else if (hasMultiple) setIsOpen((p) => !p);
  };

  const handleChevron = () => {
    if (hasMultiple) setIsOpen((p) => !p);
  };

  const bodyInteractive = !!onBodyClick || hasMultiple;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="inline-flex items-center gap-1.5 rounded-pill bg-black py-2">
        <button
          type="button"
          onClick={handleBody}
          disabled={!bodyInteractive}
          className={cn(
            'flex items-center gap-2 pl-3 font-shantell font-semibold text-[20px]',
            hasMultiple ? 'pr-1' : 'pr-3',
            isOpen ? 'text-orange' : bodyInteractive ? 'cursor-pointer text-whitesmoke hover:text-blue' : 'cursor-default text-whitesmoke',
          )}
        >
          {icon}
          <span
            className={cn(
              'max-w-[140px] truncate whitespace-nowrap md:max-w-none',
              !isOpen && bodyInteractive && 'hover:underline hover:decoration-wavy hover:underline-offset-[6px]',
            )}
          >
            {current.label}
          </span>
        </button>
        {hasMultiple && (
          <button
            type="button"
            onClick={handleChevron}
            aria-label={isOpen ? 'Cerrar lista' : 'Abrir lista'}
            className="group/chev flex items-center justify-center py-0 pl-1 pr-3"
          >
            <span
              className={cn(
                'inline-flex size-6 items-center justify-center rounded-full transition-colors',
                isOpen ? 'text-orange' : 'text-whitesmoke group-hover/chev:bg-blue group-hover/chev:text-black',
              )}
            >
              <IconCaretDown className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />
            </span>
          </button>
        )}
      </div>

      {isOpen && hasMultiple && <BreadcrumbSelectPanel options={options} currentId={currentId} onPick={handlePick} />}
    </div>
  );
}

interface PanelProps {
  options: BreadcrumbSelectOption[];
  currentId: string;
  onPick: (id: string) => void;
}

function BreadcrumbSelectPanel({ options, currentId, onPick }: PanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const showSearch = options.length > SEARCH_THRESHOLD;

  useEffect(() => {
    if (!showSearch) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [showSearch]);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = normalizeForFilter(query.trim());
    return options.filter((o) => normalizeForFilter(o.label).includes(q));
  }, [options, query]);

  return (
    <div className="absolute left-0 top-[calc(100%+4px)] z-50 min-w-full overflow-hidden rounded-[16px] bg-black py-2 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.3),0px_2px_8px_1px_rgba(0,0,0,0.1)]">
      {showSearch && (
        <div className="px-2 pb-2" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-whitesmoke" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar"
              className="h-11 w-full rounded-[16px] border-2 border-lgray bg-black pl-10 pr-4 font-inter text-[16px] text-whitesmoke placeholder:text-whitesmoke focus:border-blue focus:outline-none transition-colors"
            />
          </div>
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="whitespace-nowrap px-4 py-2 font-inter text-[16px] text-lgray">Sin coincidencias</p>
      ) : (
        filtered.map((opt) => {
          const isActive = opt.id === currentId;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onPick(opt.id)}
              className={cn(
                'flex w-full items-center justify-between gap-3 whitespace-nowrap px-4 py-3 text-left font-inter font-semibold text-[16px] tracking-[0.16px] transition-colors hover:bg-blue hover:text-black active:bg-orange active:text-black',
                isActive ? 'text-orange' : 'text-whitesmoke',
              )}
            >
              <span className="truncate">{opt.label}</span>
              {isActive && <IconCheckMark className="size-4 shrink-0" />}
            </button>
          );
        })
      )}
    </div>
  );
}

export default BreadcrumbSelect;
