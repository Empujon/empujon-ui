'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

export type DateRange = { from: string | null; to: string | null };

/** Parametrizable locale for calendar chrome. `from`/`to` are only used by
 *  the range picker's trigger placeholders. */
export type DatePickerLocale = {
  months: string[];
  weekdays: string[];
  from?: string;
  to?: string;
};

export const DEFAULT_LOCALE: DatePickerLocale = {
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  from: 'Desde',
  to: 'Hasta',
};

interface DatePickerBaseProps {
  label: string;
  placeholder?: string;
  saved?: boolean;
  error?: string;
  className?: string;
  variant?: 'default' | 'neutral';
  helper?: string;
  disabled?: boolean;
  /** Days drawn with green text. ISO YYYY-MM-DD. */
  highlightedDates?: string[];
  /** Locks the year header dropdown to this list (still chronological). */
  yearOptions?: number[];
  /** Month/weekday names. Defaults to Spanish. */
  locale?: DatePickerLocale;
}

interface DatePickerSingleProps extends DatePickerBaseProps {
  range?: false;
  value: string;
  onChange: (value: string) => void;
}

interface DatePickerRangeProps extends DatePickerBaseProps {
  range: true;
  /** Which end of the range this input edits. Both inputs share state. */
  rangeEnd: 'from' | 'to';
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

function parseDate(value: string): { year: number; month: number; day: number } | null {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m - 1, day: d };
}

function formatDisplayDate(value: string, months: string[]): string {
  const parsed = parseDate(value);
  if (!parsed) return '';
  const d = String(parsed.day).padStart(2, '0');
  return `${d} ${months[parsed.month]} ${parsed.year}`;
}

function cmp(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/** Inline copy of /images/chevron.svg with `currentColor` so the parent's
 *  text colour wins. The on-disk asset has a fixed fill (#E3F2E3@0.7) that
 *  `<Image>` cannot retint via CSS — this is the project's standard
 *  workaround (mirrors PillSelect / BreadcrumbSelect).
 *  The original art points DOWN. Caller applies rotation via className. */
const ChevronGlyph: React.FC<{ size?: number; className?: string }> = ({
  size = 14,
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden
    width={size}
    height={size}
    className={`flex-shrink-0 ${className}`}
  >
    <path
      fill="currentColor"
      d="M5.3509 6.03546C5.91827 6.03546 6.45019 6.14184 6.94664 6.35461C7.4431 6.56738 7.97501 6.91017 8.54238 7.38298C9.10976 7.85579 9.74806 8.49409 10.4573 9.29787C11.1665 10.1253 12.0057 11.1655 12.975 12.4184L11.1665 12.383C12.5377 10.9173 13.6369 9.74704 14.4644 8.87234C15.2918 8.02128 15.9419 7.38298 16.4147 6.95745C16.8875 6.55555 17.2776 6.29551 17.5849 6.1773C17.8686 6.0591 18.1641 6 18.4715 6C18.8734 6 19.2634 6.10638 19.6417 6.31915C19.9963 6.53191 20.2918 6.80378 20.5282 7.13475C20.7646 7.46572 20.8828 7.78487 20.8828 8.0922C20.8828 8.35225 20.8355 8.61229 20.741 8.87234C20.6464 9.13239 20.4336 9.45154 20.1027 9.82979C19.7717 10.208 19.2752 10.7045 18.6133 11.3191C17.9514 11.9338 17.053 12.7258 15.9183 13.695C15.2091 14.3097 14.6535 14.7825 14.2516 15.1135C13.8261 15.4444 13.4242 15.669 13.0459 15.7872C12.6677 15.9291 12.1949 16 11.6275 16C11.0601 16 10.5755 15.8818 10.1736 15.6454C9.74806 15.4326 9.27525 14.9598 8.75515 14.227C7.85681 12.9976 7.06484 12.0284 6.37926 11.3191C5.67004 10.6099 5.07903 10.0544 4.60622 9.65248C4.10976 9.25059 3.74333 8.9078 3.50692 8.62411C3.24688 8.36407 3.11685 8.04492 3.11685 7.66667C3.11685 7.21749 3.32962 6.82742 3.75515 6.49645C4.15704 6.18913 4.68896 6.03546 5.3509 6.03546Z"
    />
  </svg>
);

/** Inline copy of /images/calendar.svg with kebab-case attrs converted to
 *  camelCase. Colours kept as-is (#E3F2E3@0.7 stroke). */
const CalendarGlyph: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="#E3F2E3" strokeOpacity="0.7" strokeWidth="2" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="#E3F2E3" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="#E3F2E3" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="10" x2="21" y2="10" stroke="#E3F2E3" strokeOpacity="0.7" strokeWidth="2" />
  </svg>
);

/** Sort the two ends of a range so `from <= to`. Null values pass through. */
function normalizeRange(r: DateRange): DateRange {
  if (r.from && r.to && cmp(r.from, r.to) > 0) {
    return { from: r.to, to: r.from };
  }
  return r;
}

/** Combobox-style dropdown for the calendar header: shows the selected
 *  option as a button; opening reveals an inline text input + a list
 *  filtered by what's typed. Commits on click, Enter (best match), or
 *  numeric match for the year case. Closes on outside click / Escape.
 *
 *  `inputMode='text'` is used for the month (typing 'jun' filters to
 *  Junio); 'numeric' for the year (typing '2024' jumps to that year). */
const HeaderDropdown: React.FC<{
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
  inputMode?: 'text' | 'numeric';
  /** Approx character width of the trigger button — keeps month/year
   *  visually distinct (month is wider than year). */
  widthClass?: string;
}> = ({ label, options, value, onChange, inputMode = 'text', widthClass = '' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref on the currently-selected option's button so we can scroll it
  // into view when the dropdown opens. Without this, the captain would
  // see January (or year-80) on open even if Junio / current year is
  // active, and would have to scroll to find their value.
  const activeOptionRef = useRef<HTMLButtonElement>(null);

  // Focus the input as soon as we open, so the captain can just start
  // typing without having to click the field again. Also scroll the
  // active option into view so the captain lands on their current value.
  useEffect(() => {
    if (open) {
      setQuery('');
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
        activeOptionRef.current?.scrollIntoView({ block: 'center' });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Filter: empty query → full list. Otherwise case-insensitive
  // substring match on the label.
  // Strip diacritics by hand — the project's tsconfig target predates the
  // unicode property regex flag (`/\p{Diacritic}/u`).
  const norm = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = norm(query.trim());
    return options.filter((o) => norm(o.label).includes(q));
  }, [options, query]);

  const currentLabel = options.find((o) => o.value === value)?.label ?? String(value);

  const commit = (next: number) => {
    onChange(next);
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      // Numeric path (year): if the typed text is itself a valid option,
      // commit it directly — supports years outside the prebuilt list.
      if (inputMode === 'numeric') {
        const n = parseInt(query.trim(), 10);
        if (!isNaN(n)) {
          if (options.some((o) => o.value === n)) commit(n);
          else if (n >= 1000 && n <= 9999) commit(n);
          return;
        }
      }
      // Otherwise: take the first filtered option (best match).
      if (filtered.length > 0) commit(filtered[0].value);
    }
  };

  return (
    <div className="relative" ref={ref}>
      {open ? (
        // Inline input shown in place of the trigger so the layout doesn't
        // jump. Mirrors the trigger's width via `widthClass`.
        <input
          ref={inputRef}
          type="text"
          inputMode={inputMode === 'numeric' ? 'numeric' : 'text'}
          value={query}
          placeholder={currentLabel}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          aria-label={label}
          className={`bg-transparent border-b border-white text-white text-sm font-bold text-center focus:outline-none focus:border-green ${widthClass}`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={label}
          className={`inline-flex items-center justify-center gap-1 text-white text-sm font-bold hover:text-green transition-colors ${widthClass}`}
        >
          <span>{currentLabel}</span>
          {/* chevron.svg points down — no rotation needed for an open
              affordance. White via currentColor (inherited from text). */}
          <ChevronGlyph size={10} className="text-white" />
        </button>
      )}
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50 bg-dark-gray border border-blue rounded-xl py-1 max-h-48 overflow-y-auto shadow-xl min-w-[96px]">
          {filtered.length === 0 ? (
            <div className="px-3 py-1 text-xs text-white/40 font-inter">
              Sin coincidencias
            </div>
          ) : (
            filtered.map((opt) => (
              <button
                key={opt.value}
                ref={opt.value === value ? activeOptionRef : undefined}
                type="button"
                onClick={() => commit(opt.value)}
                className={`w-full text-center px-3 py-1 text-xs font-inter font-medium transition-colors
                  ${opt.value === value ? 'text-orange' : 'text-white hover:text-green'}`}
              >
                {opt.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    label,
    placeholder = 'Elegir fecha',
    saved = false,
    error,
    className = '',
    variant = 'default',
    helper,
    disabled = false,
    highlightedDates,
    yearOptions,
    locale = DEFAULT_LOCALE,
  } = props;

  const isRange = props.range === true;
  const rangeValue = isRange ? normalizeRange(props.value) : null;
  const rangeEnd = isRange ? props.rangeEnd : null;

  // The single value displayed in THIS trigger. For range mode it's the
  // selected end of the shared range.
  const displayValue = isRange
    ? (rangeEnd === 'from' ? rangeValue!.from : rangeValue!.to) ?? ''
    : props.value;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref to the trigger button so we can measure its position when the
  // calendar opens and follow it on scroll. The calendar panel itself
  // is portalled to <body> so it can escape any scrolling ancestor
  // (Modal.Content, sidebars, etc) — without a portal the panel would
  // be clipped by the parent's overflow:auto. Position is recomputed
  // on every scroll/resize while open.
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);
  // Drag-to-resize the range: when the captain pointer-down's on the
  // 'from' or 'to' endpoint cell, we capture the pointer and follow
  // wherever the cursor goes — each grid cell carries a data-iso attr
  // we use to figure out which date the cursor is on. `endpoint` is the
  // end we're dragging; `moved` flips true on the first significant
  // pointermove so we can swallow the synthetic click on pointerup.
  const dragRef = useRef<{ endpoint: 'from' | 'to'; moved: boolean } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const parsedDisplay = parseDate(displayValue);
  const [viewYear, setViewYear] = useState(parsedDisplay?.year ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsedDisplay?.month ?? today.getMonth());

  // When the trigger's value changes from outside (e.g. the partner input
  // moved the range), realign the visible month so reopening shows the
  // current selection — but ONLY while closed, to avoid yanking the view
  // out from under the user mid-selection.
  useEffect(() => {
    if (isOpen) return;
    const p = parseDate(displayValue);
    if (p) { setViewYear(p.year); setViewMonth(p.month); }
  }, [displayValue, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // The panel is portalled to <body>, so it's NOT inside
      // containerRef. Check both refs before treating a click as
      // "outside".
      const insideTrigger = !!containerRef.current?.contains(target);
      const insidePanel = !!panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // While open, keep the portalled panel glued to the trigger. We listen
  // with `capture: true` so we catch scrolls of ANY ancestor (Modal.Content,
  // sidebars, the document itself) — not just the document.
  useEffect(() => {
    if (!isOpen) {
      setPanelPos(null);
      return;
    }
    const PANEL_WIDTH = 300;
    const PANEL_HEIGHT_ESTIMATE = 360;
    const GAP = 8;
    const recompute = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      let top = rect.bottom + GAP;
      // If the panel would overflow the viewport bottom, flip it ABOVE
      // the trigger so the calendar stays usable. The user can't scroll
      // the page inside modals, so falling off-screen would be a dead end.
      if (top + PANEL_HEIGHT_ESTIMATE > window.innerHeight) {
        top = Math.max(GAP, rect.top - GAP - PANEL_HEIGHT_ESTIMATE);
      }
      let left = rect.left;
      // Clamp horizontally so the panel stays inside the viewport.
      if (left + PANEL_WIDTH > window.innerWidth - GAP) {
        left = Math.max(GAP, window.innerWidth - GAP - PANEL_WIDTH);
      }
      setPanelPos({ top, left });
    };
    recompute();
    window.addEventListener('scroll', recompute, { capture: true, passive: true });
    window.addEventListener('resize', recompute);
    return () => {
      window.removeEventListener('scroll', recompute, { capture: true } as EventListenerOptions);
      window.removeEventListener('resize', recompute);
    };
  }, [isOpen]);

  const goToPrevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth(viewMonth - 1);
  }, [viewMonth]);

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth(viewMonth + 1);
  }, [viewMonth]);

  const monthOptions = useMemo(
    () => locale.months.map((name, idx) => ({ value: idx, label: name })),
    [locale.months]
  );

  const effectiveYears = useMemo(() => {
    // Ascending order: oldest years at the top, current year + future
    // at the bottom. The dropdown auto-scrolls to the active year on
    // open (see HeaderDropdown), so the captain lands on the current
    // year without manual scrolling.
    if (yearOptions && yearOptions.length) {
      return yearOptions.slice().sort((a, b) => a - b);
    }
    const current = today.getFullYear();
    const span: number[] = [];
    for (let y = current - 80; y <= current + 5; y++) span.push(y);
    if (!span.includes(viewYear)) span.push(viewYear);
    return span.sort((a, b) => a - b);
  }, [yearOptions, viewYear, today]);

  const yearChoices = useMemo(
    () => effectiveYears.map((y) => ({ value: y, label: String(y) })),
    [effectiveYears]
  );

  const highlightSet = useMemo(
    () => new Set(highlightedDates ?? []),
    [highlightedDates]
  );

  const selectCell = (cell: { year: number; month: number; day: number; iso: string; kind: 'prev' | 'curr' | 'next' }) => {
    if (isRange) {
      const r = rangeValue!;
      const next: DateRange = rangeEnd === 'from'
        ? { from: cell.iso, to: r.to }
        : { from: r.from, to: cell.iso };
      (props.onChange as (v: DateRange) => void)(next);
    } else {
      (props.onChange as (v: string) => void)(cell.iso);
    }
    // Jump the visible month to the picked cell so the next-open shows
    // the correct page when the user reaches into a neighbouring month.
    if (cell.kind !== 'curr') {
      setViewYear(cell.year);
      setViewMonth(cell.month);
    }
    setIsOpen(false);
  };

  /** Update one end of the shared range in place. Used by drag-to-resize
   *  so the band repaints in real time as the cursor moves. The drag
   *  always edits the end the user grabbed (`endpoint`), regardless of
   *  this trigger's own `rangeEnd` — that lets a user grab the 'to' end
   *  from the 'from' input's calendar and still get the natural feel. */
  const commitRangeEnd = (endpoint: 'from' | 'to', iso: string) => {
    if (!isRange) return;
    const r = rangeValue!;
    const next: DateRange = endpoint === 'from'
      ? { from: iso, to: r.to }
      : { from: r.from, to: iso };
    (props.onChange as (v: DateRange) => void)(next);
  };

  /** Walk up from `el` to the first ancestor carrying a `data-iso` attr
   *  (set on each grid cell button below). null if the pointer is over
   *  panel chrome that isn't a day cell. */
  const findCellFromPoint = (clientX: number, clientY: number):
    { iso: string; year: number; month: number; kind: 'prev' | 'curr' | 'next' } | null => {
    const el = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    if (!el) return null;
    const cell = el.closest('[data-iso]') as HTMLElement | null;
    if (!cell) return null;
    const iso = cell.getAttribute('data-iso') || '';
    const kind = (cell.getAttribute('data-kind') || 'curr') as 'prev' | 'curr' | 'next';
    const [y, m] = iso.split('-').map(Number);
    if (!y || !m) return null;
    return { iso, year: y, month: m - 1, kind };
  };

  const onGridPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
    cell: { iso: string; kind: 'prev' | 'curr' | 'next' },
  ) => {
    if (!isRange) return;
    const r = rangeValue!;
    const isFromCell = !!r.from && r.from === cell.iso;
    const isToCell = !!r.to && r.to === cell.iso;
    if (!isFromCell && !isToCell) return;
    // If both ends are on the same day, prefer extending the end this
    // input represents — that's the natural "stretch from here" feel.
    const endpoint: 'from' | 'to' =
      isFromCell && isToCell ? (rangeEnd === 'to' ? 'to' : 'from')
      : isFromCell ? 'from' : 'to';
    dragRef.current = { endpoint, moved: false };
    setDragActive(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const hit = findCellFromPoint(e.clientX, e.clientY);
    if (!hit) return;
    const r = rangeValue!;
    const currentIso = drag.endpoint === 'from' ? r.from : r.to;
    if (hit.iso === currentIso) return;
    drag.moved = true;
    commitRangeEnd(drag.endpoint, hit.iso);
    // If the cursor leaves the current month while dragging, page the
    // calendar so the captain can keep dragging without re-grabbing.
    if (hit.kind !== 'curr') {
      setViewYear(hit.year);
      setViewMonth(hit.month);
    }
  };

  const onGridPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch { /* ignore */ }
    dragRef.current = null;
    // Defer the visual reset so the synthetic click event that fires on
    // pointerup AFTER a drag can see `dragActive=true` and bail out
    // inside the cell's onClick (we don't want it to commit / close).
    requestAnimationFrame(() => setDragActive(false));
  };

  // Build the 6×7 grid filling leading/trailing slots with the prev /
  // next month's days (drawn in grey). Each cell carries its own
  // {year, month, day, kind} so range math and click behaviour work
  // uniformly across all three buckets.
  type CellInfo = {
    day: number;
    year: number;
    month: number;
    kind: 'prev' | 'curr' | 'next';
    iso: string;
  };
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthYear = viewMonth === 0 ? viewYear - 1 : viewYear;
  const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
  const daysInPrev = getDaysInMonth(prevMonthYear, prevMonth);
  const nextMonthYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;

  const cells: CellInfo[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrev - i;
    cells.push({
      day: d, year: prevMonthYear, month: prevMonth, kind: 'prev',
      iso: formatDate(prevMonthYear, prevMonth, d),
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d, year: viewYear, month: viewMonth, kind: 'curr',
      iso: formatDate(viewYear, viewMonth, d),
    });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({
      day: nextDay, year: nextMonthYear, month: nextMonth, kind: 'next',
      iso: formatDate(nextMonthYear, nextMonth, nextDay),
    });
    nextDay++;
  }

  // Range render helpers — does a given iso fall on/inside/at-end of the
  // selected range? Used for the orange band + solid endpoints.
  const inRange = (iso: string): { isFrom: boolean; isTo: boolean; isMid: boolean } => {
    if (!isRange) return { isFrom: false, isTo: false, isMid: false };
    const r = normalizeRange(rangeValue!);
    if (!r.from || !r.to) {
      // Only one end set — that end is "solid", nothing is "mid".
      return {
        isFrom: iso === r.from,
        isTo: iso === r.to,
        isMid: false,
      };
    }
    const isFrom = iso === r.from;
    const isTo = iso === r.to;
    const isMid = !isFrom && !isTo && cmp(iso, r.from) > 0 && cmp(iso, r.to) < 0;
    return { isFrom, isTo, isMid };
  };

  return (
    <div className={`flex flex-col gap-2 w-full max-w-[680px] ${className}`} ref={containerRef}>
      <label
        className={
          variant === 'neutral'
            ? 'font-inter font-bold text-white'
            : 'text-white text-sm font-semibold'
        }
      >
        {label}
        {/* Legacy variant keeps the inline-next-to-label error.
            Neutral variant renders the error below the input (same slot
            as `helper`, in red) — see the helper/error block below. */}
        {error && variant !== 'neutral' && (
          <span className="text-magenta ml-2 font-normal">{error}</span>
        )}
      </label>
      <div className="relative" ref={triggerRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 pr-10 border-2 text-left
            focus:outline-none transition-colors flex items-center justify-between
            disabled:cursor-not-allowed disabled:opacity-60
            ${variant === 'neutral'
              ? 'h-[44px] rounded-[16px] font-inter text-label-chico'
              : 'py-1.5 rounded-2xl font-shantell font-bold text-base'}
            ${error
              ? variant === 'neutral'
                ? `bg-black border-red ${displayValue ? 'text-whitesmoke' : 'text-divider'}`
                : 'bg-transparent border-magenta text-white/70'
              : variant === 'neutral'
                ? `bg-black border-lgray ${displayValue ? 'text-whitesmoke' : 'text-divider'}`
                : saved && displayValue
                  ? 'bg-white border-gray/50 text-black'
                  : `bg-transparent focus:border-green ${displayValue ? 'text-white/70 border-blue' : 'text-white border-white'}`}`}
        >
          <span>{displayValue ? formatDisplayDate(displayValue, locale.months) : placeholder}</span>
        </button>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {displayValue ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isRange) {
                  const r = rangeValue!;
                  const next: DateRange = rangeEnd === 'from'
                    ? { from: null, to: r.to }
                    : { from: r.from, to: null };
                  (props.onChange as (v: DateRange) => void)(next);
                } else {
                  (props.onChange as (v: string) => void)('');
                }
                setIsOpen(false);
              }}
              className="flex items-center justify-center text-white hover:text-blue transition-colors pointer-events-auto"
            >
              {/* Inline copy of cruz.svg using currentColor — same
                  handwritten cross used by the Modal's close button
                  and the Header's CurtainMenu toggle. */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  fill="currentColor"
                  d="M12.4929 35C11.8737 35 11.3523 34.8362 10.9287 34.5085C10.5377 34.1808 10.2933 33.673 10.1955 32.9849C10.1303 32.2968 10.277 31.4285 10.6354 30.38C11.0265 29.2004 11.6782 27.8242 12.5906 26.2514C13.5031 24.6786 14.6273 23.0239 15.9633 21.2873C17.2994 19.518 18.8147 17.7813 20.5092 16.0775C22.2037 14.3737 24.0285 12.8173 25.9837 11.4083C26.7984 10.7858 27.5153 10.3106 28.1344 9.98299C28.7862 9.62256 29.3564 9.37681 29.8452 9.24575C30.3666 9.08192 30.8391 9 31.2627 9C32.0122 9 32.6477 9.26213 33.169 9.78639C33.723 10.3106 34 11.0807 34 12.0964C34 12.7845 33.8208 13.3743 33.4623 13.8658C33.1039 14.3245 32.6151 14.7505 31.9959 15.1437C29.78 16.4543 27.7108 18.0435 25.7882 19.9112C23.8982 21.7461 22.1385 23.7448 20.5092 25.9074C18.9124 28.0699 17.4297 30.2817 16.0611 32.5425C15.5071 33.4272 14.9369 34.0498 14.3503 34.4102C13.7637 34.8034 13.1446 35 12.4929 35ZM31.2627 34.9509C30.5458 34.9509 29.8778 34.7706 29.2587 34.4102C28.6721 34.0498 28.0367 33.3617 27.3523 32.3459C26.4073 30.9698 25.332 29.528 24.1263 28.0208C22.9206 26.4808 21.6497 24.9735 20.3136 23.4991C18.9776 21.9918 17.6415 20.5829 16.3055 19.2722C14.9695 17.9616 13.7312 16.8311 12.5906 15.8809C11.776 15.2256 11.1405 14.6194 10.6843 14.0624C10.2281 13.5054 10 12.8009 10 11.949C10 11.1298 10.2118 10.4417 10.6354 9.88469C11.0591 9.32766 11.6945 9.04915 12.5418 9.04915C13.1935 9.04915 13.7963 9.1966 14.3503 9.49149C14.9369 9.78639 15.7026 10.3434 16.6477 11.1626C17.332 11.7196 18.1792 12.506 19.1894 13.5217C20.2322 14.5375 21.3401 15.6843 22.5132 16.9622C23.6864 18.2401 24.8432 19.5507 25.9837 20.8941C27.1568 22.2048 28.2322 23.4663 29.2098 24.6786C30.22 25.8582 31.0346 26.8904 31.6538 27.775C32.6314 29.1512 33.2505 30.2161 33.5112 30.9698C33.8045 31.6906 33.9511 32.2804 33.9511 32.7391C33.9511 33.4272 33.7067 33.9679 33.2179 34.3611C32.7291 34.7543 32.0774 34.9509 31.2627 34.9509Z"
                />
              </svg>
            </button>
          ) : (
            <CalendarGlyph size={20} />
          )}
        </div>

        {isOpen && panelPos && typeof document !== 'undefined' && createPortal(
          // Outer panel: white border, dark surface. Inside it sits a
          // black calendar card with matching radius — the captain sees a
          // black rounded square framed by the white panel border.
          // Rendered as `position: fixed` and portalled to <body> so any
          // ancestor with `overflow: auto` (Modal.Content, etc.) can't
          // clip the calendar.
          <div
            ref={panelRef}
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              width: 300,
              zIndex: 1000,
            }}
            className="bg-darker-gray border-2 border-white rounded-2xl p-3 shadow-xl"
          >
            {/* Header row: month + year dropdowns on the left, chevrons
                stacked together on the right. */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 font-inter font-semibold text-white text-sm">
                <HeaderDropdown
                  label="Mes"
                  options={monthOptions}
                  value={viewMonth}
                  onChange={setViewMonth}
                  inputMode="text"
                  widthClass="w-[88px]"
                />
                <HeaderDropdown
                  label="Año"
                  options={yearChoices}
                  value={viewYear}
                  onChange={setViewYear}
                  inputMode="numeric"
                  widthClass="w-[56px]"
                />
              </div>
              <div className="flex items-center gap-1 text-white">
                <button
                  type="button"
                  onClick={goToPrevMonth}
                  aria-label="Mes anterior"
                  className="hover:opacity-70 transition-opacity p-0.5"
                >
                  {/* chevron.svg points down → rotate 90° clockwise so
                      the tip faces LEFT for "previous". */}
                  <ChevronGlyph size={14} className="rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Mes siguiente"
                  className="hover:opacity-70 transition-opacity p-0.5"
                >
                  {/* Down → rotate -90° (270°) so the tip faces RIGHT. */}
                  <ChevronGlyph size={14} className="-rotate-90" />
                </button>
              </div>
            </div>

            {/* Weekday header sits OUTSIDE the black card so the L/M/M/J
                /V/S/D row is on the panel background, not on the dark
                calendar surface. */}
            <div className="grid grid-cols-7 mb-1 px-2">
              {locale.weekdays.map((d, idx) => (
                <div key={`${d}-${idx}`} className="text-center text-white text-xs font-inter font-semibold">
                  {d}
                </div>
              ))}
            </div>

            {/* Black inner card holding ONLY the 6×7 day grid. Same
                rounding as the outer panel so the white border reads as
                a frame around a solid black calendar. */}
            <div className="bg-black rounded-2xl p-2">
              <div
                className="grid grid-cols-7"
                onPointerMove={onGridPointerMove}
                onPointerUp={onGridPointerUp}
                onPointerCancel={onGridPointerUp}
              >
                {cells.map((cell, i) => {
                  const isToday = cell.iso === todayStr;
                  const isHighlighted = highlightSet.has(cell.iso);
                  const isCurr = cell.kind === 'curr';

                  const { isFrom, isTo, isMid } = inRange(cell.iso);
                  const isSelectedSolid = isRange
                    ? (isFrom || isTo)
                    : cell.iso === displayValue;

                  // Range visuals — mid cells get the F79045/30 band on
                  // the FULL cell (same height as endpoints, no inset).
                  // Endpoints get a solid orange square whose corners
                  // round only on the outer edge: 'from' rounds the LEFT
                  // side, 'to' rounds the RIGHT side. Single-day range
                  // rounds all four corners.
                  const r = rangeValue ? normalizeRange(rangeValue) : null;
                  const bothEndsSet = !!(r?.from && r?.to);
                  const singleDayRange = bothEndsSet && r!.from === r!.to;

                  let endpointRoundingClass = 'rounded-md';
                  if (isRange && bothEndsSet && !singleDayRange) {
                    if (isFrom) endpointRoundingClass = 'rounded-l-md';
                    else if (isTo) endpointRoundingClass = 'rounded-r-md';
                  }

                  // Day-number text colour priority:
                  //   1. Selected solid (single mode or endpoint)  → black
                  //   2. Mid-range cell (orange 30% band)          → white
                  //   3. Highlighted (has event)                   → green
                  //   4. Neighbouring month                        → grey
                  //   5. Default                                   → white
                  let textClass = 'text-white';
                  if (isSelectedSolid) textClass = 'text-black';
                  else if (isMid) textClass = 'text-white';
                  else if (isHighlighted) textClass = 'text-green';
                  else if (!isCurr) textClass = 'text-white/30';

                  const hoverClass = !isSelectedSolid && !isMid
                    ? 'hover:bg-blue hover:text-black'
                    : '';

                  // "Hoy" reads as a square outlined in orange (matches
                  // the selected/endpoint colour but stays hollow), so
                  // it's distinguishable from solid selection. Skipped
                  // when the cell is already the solid endpoint.
                  const todayRing = isToday && !isSelectedSolid
                    ? 'ring-2 ring-orange ring-inset rounded-md'
                    : '';

                  return (
                    <div key={`${cell.kind}-${i}`} className="relative aspect-square">
                      {isMid && (
                        // Full-height band (same height as endpoint squares,
                        // no vertical inset), F79045 at 30% alpha. Touches
                        // its neighbours edge-to-edge — no horizontal gap.
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: 'rgba(247, 144, 69, 0.3)' }}
                          aria-hidden
                        />
                      )}
                      {isRange && bothEndsSet && !singleDayRange && (isFrom || isTo) && (
                        // Endpoint connector: the half of the cell that
                        // faces the band is also painted at 30% so the
                        // solid square visually merges with the band.
                        <div
                          className={`absolute inset-y-0 ${isFrom ? 'left-1/2 right-0' : 'left-0 right-1/2'}`}
                          style={{ backgroundColor: 'rgba(247, 144, 69, 0.3)' }}
                          aria-hidden
                        />
                      )}
                      <button
                        type="button"
                        data-iso={cell.iso}
                        data-kind={cell.kind}
                        onPointerDown={(e) => onGridPointerDown(e, cell)}
                        onClick={() => {
                          // Suppress click that fires after a drag —
                          // pointerup → click. dragRef is cleared in
                          // pointerup but `dragActive` lingers one frame
                          // to swallow this synthetic click.
                          if (dragActive || dragRef.current?.moved) return;
                          selectCell(cell);
                        }}
                        className={`relative z-10 w-full h-full flex items-center justify-center text-sm font-shantell font-bold transition-colors
                          ${isSelectedSolid ? `bg-orange ${endpointRoundingClass}` : 'rounded-md'}
                          ${textClass} ${hoverClass} ${todayRing}
                          ${(isFrom || isTo) && bothEndsSet && !singleDayRange ? 'cursor-ew-resize' : ''}`}
                        style={{ touchAction: (isFrom || isTo) ? 'none' : undefined }}
                      >
                        {cell.day}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  if (isRange) {
                    const r = rangeValue!;
                    const next: DateRange = rangeEnd === 'from'
                      ? { from: todayStr, to: r.to }
                      : { from: r.from, to: todayStr };
                    (props.onChange as (v: DateRange) => void)(next);
                  } else {
                    (props.onChange as (v: string) => void)(todayStr);
                  }
                  setIsOpen(false);
                }}
                className="text-sm font-shantell font-bold text-orange underline hover:opacity-80 transition-opacity"
              >
                Hoy
              </button>
            </div>
          </div>,
          document.body,
        )}
      </div>
      {/* Helper / error slot for the neutral variant: error takes
          precedence and turns red; otherwise the helper renders white.
          Legacy variant keeps the inline-label error (above) and only
          renders helper here. */}
      {(error && variant === 'neutral') ? (
        <p className="font-inter text-xs text-red">{error}</p>
      ) : helper ? (
        <p className="font-inter text-xs text-white">{helper}</p>
      ) : null}
    </div>
  );
};

export default DatePicker;
