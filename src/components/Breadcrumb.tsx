'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '../lib/cn';
import { IconCaretDown, IconCheckMark, IconHome } from './designerIcons';
import { IconButton } from './IconButton';
import { Search } from './Search';

/**
 * Breadcrumb — migas de pan de navegación (Figma › "Breadcrumb", node 7414:3177).
 * Un solo componente para toda la familia: cada ítem es un cruce simple (Inter,
 * sin subrayado salvo hover) o el actual (Shantell, sin subrayado); cualquier
 * ítem puede además pasar `dropdown` para volverse un selector que abre una
 * lista sin navegar (Figma › "Breadcrumb Item" con Has dropdown=Yes +
 * "Breadcrumb Dropdown Menu"), con el mismo comportamiento portado 1:1 de
 * `empujon/frontend` (búsqueda con umbral, filtrado sin diacríticos,
 * click-outside/Escape).
 *
 * El uso "selector" standalone (ex `BreadcrumbSelect`, el selector de
 * colegios de la home) es simplemente un Breadcrumb de un solo ítem con
 * `dropdown` y `showHomeIcon={false}`.
 */
const SEARCH_THRESHOLD = 3;

function normalizeForFilter(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export interface BreadcrumbDropdownOption {
  id: string;
  label: string;
}

export interface BreadcrumbDropdown {
  options: BreadcrumbDropdownOption[];
  /** Opción actualmente seleccionada. Define el label del ítem y la fila activa del menú. */
  currentId: string;
  /** Se dispara al elegir una opción distinta a la actual. */
  onSelect: (id: string) => void;
  /** Fuerza mostrar/ocultar el buscador del menú. Default: automático — aparece
   *  con más de `SEARCH_THRESHOLD` (3) opciones. */
  search?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  /** Destino del ítem. Si se pasa, se renderiza un <a> real: navega, admite
   *  click del medio y "abrir en pestaña nueva". Sin esto, usar `onClick`. */
  href?: string;
  /** Click del CUERPO del ítem (ícono + label) — navega u otra acción. En un
   *  ítem con `dropdown`, si se pasa, el cuerpo hace esto y el chevron pasa a
   *  ser el único que abre el menú; sin esto, con más de una opción, todo el
   *  cuerpo abre/cierra el menú. Un ítem con dropdown de una sola opción
   *  necesita este `onClick` para seguir siendo cliqueable (no hay chevron). */
  onClick?: () => void;
  /** Ícono a la izquierda del label (currentColor hereda el color del ítem). */
  icon?: React.ReactNode;
  /** Si se pasa, este ítem se vuelve un selector: abre una lista en vez de (o
   *  además de) navegar. Ver `BreadcrumbDropdown`. */
  dropdown?: BreadcrumbDropdown;
  /** Fuerza si este ítem se ve/comporta como "actual" (Shantell, terminal) o
   *  como link (Inter, hover). Default: `true` solo para el último ítem. Un
   *  ítem solo — p. ej. el link al inicio de la plataforma — normalmente
   *  necesita `current={false}` aunque sea el único, porque es un link, no
   *  "la página en la que estás". */
  current?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Ícono de casita antes del primer ítem. Default true. */
  showHomeIcon?: boolean;
  className?: string;
}

/** Hover de los segmentos tipo "link" (Inter): el label toma la fuente y el
 *  subrayado ondulado de un botón (font-shantell + wavy underline), igual que
 *  el ítem actual — es, ante todo, un botón. */
const LINK_HOVER = 'hover:font-shantell hover:text-blue hover:underline hover:decoration-wavy hover:underline-offset-[6px]';

export function Breadcrumb({ items, showHomeIcon = true, className }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn('flex items-center gap-2', className)}>
      {items.map((item, i) => {
        const isCurrent = item.current ?? i === items.length - 1;
        // El ícono de casita es parte del botón del primer ítem (Figma: chip +
        // label viven juntos dentro del mismo State-layer) — así el hover lo
        // afecta a los dos como una sola unidad, no un elemento aparte.
        const icon = item.icon ?? (i === 0 && showHomeIcon ? <IconHome className="size-6 shrink-0" /> : undefined);
        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-whitesmoke">/</span>}
            {item.dropdown ? (
              <BreadcrumbDropdownSegment item={{ ...item, icon }} dropdown={item.dropdown} isCurrent={isCurrent} />
            ) : isCurrent ? (
              <span className="inline-flex items-center gap-2 whitespace-nowrap font-shantell text-[20px] font-semibold text-whitesmoke">
                {icon}
                {item.label}
              </span>
            ) : item.href ? (
              // Un item con `href` es un ENLACE REAL (fix 28/08). Antes se
              // renderizaba siempre un <button> con `onClick` y el `href` se
              // ignoraba en silencio: la miga se veía cliqueable y no hacía
              // nada. Como <a>, además, funciona el click del medio, "abrir en
              // pestaña nueva" y los lectores de pantalla lo anuncian bien.
              <a
                href={item.href}
                onClick={item.onClick}
                className={cn('inline-flex items-center gap-2 whitespace-nowrap font-inter text-[20px] font-semibold text-whitesmoke', LINK_HOVER)}
              >
                {icon}
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className={cn('inline-flex items-center gap-2 whitespace-nowrap font-inter text-[20px] font-semibold text-whitesmoke', LINK_HOVER)}
              >
                {icon}
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

interface DropdownSegmentProps {
  item: BreadcrumbItem;
  dropdown: BreadcrumbDropdown;
  isCurrent: boolean;
}

/** Ítem-selector: label (+ ícono opcional) y, si hay más de una opción, el
 *  chevron que abre el menú debajo. Sin fondo propio — vive inline en la
 *  línea del breadcrumb, igual que en Figma. */
function BreadcrumbDropdownSegment({ item, dropdown, isCurrent }: DropdownSegmentProps) {
  const { options, currentId, onSelect } = dropdown;
  const onBodyClick = item.onClick;
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
  const fontClass = isCurrent ? 'font-shantell' : 'font-inter';

  return (
    <div ref={containerRef} className="relative inline-flex items-center gap-2">
      <button
        type="button"
        onClick={handleBody}
        disabled={!bodyInteractive}
        className={cn(
          'flex items-center gap-2 text-[20px] font-semibold',
          fontClass,
          isOpen
            ? 'text-orange'
            : bodyInteractive
              ? cn('cursor-pointer text-whitesmoke hover:text-blue', !isCurrent && 'hover:font-shantell')
              : 'cursor-default text-whitesmoke',
        )}
      >
        {item.icon}
        <span
          className={cn(
            'whitespace-nowrap',
            !isOpen && bodyInteractive && 'hover:underline hover:decoration-wavy hover:underline-offset-[6px]',
          )}
        >
          {current.label}
        </span>
      </button>
      {hasMultiple && (
        <IconButton
          icon={<IconCaretDown className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')} />}
          aria-label={isOpen ? 'Cerrar lista' : 'Abrir lista'}
          onClick={handleChevron}
          size="xs"
          background="with"
          className={isOpen ? 'text-orange' : undefined}
        />
      )}

      {isOpen && hasMultiple && (
        <BreadcrumbDropdownPanel options={options} currentId={currentId} onPick={handlePick} search={dropdown.search} />
      )}
    </div>
  );
}

interface PanelProps {
  options: BreadcrumbDropdownOption[];
  currentId: string;
  onPick: (id: string) => void;
  search?: boolean;
}

function BreadcrumbDropdownPanel({ options, currentId, onPick, search }: PanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const showSearch = search ?? options.length > SEARCH_THRESHOLD;

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
    <div className="absolute left-0 top-[calc(100%+4px)] z-50 w-[340px] overflow-hidden rounded-[16px] bg-darker-gray py-2 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.3),0px_2px_8px_1px_rgba(0,0,0,0.1)]">
      {showSearch && (
        <div className="px-2 pb-2" onClick={(e) => e.stopPropagation()}>
          <Search ref={inputRef} value={query} onChange={setQuery} />
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

export default Breadcrumb;
