// DateRangePicker.tsx — single-trigger range picker.
//
// A two-column trigger ("Desde — Hasta" with an internal divider) opens
// ONE calendar floating below. The calendar mirrors DatePicker's
// visuals (white-framed panel, black inner card, L M M J V S D weekday
// row outside the card, Inter month/year + chevrons header, Shantell
// day cells, orange endpoints, F79045@30% mid band).
//
// Range picking flow:
//   1. First click   → sets `from`. The cell turns solid orange. `to`
//                      stays empty.
//   2. Hover after 1 → live preview band between `from` and the cell
//                      under the cursor (30% orange). Endpoint connector
//                      mirrors the committed-range visuals.
//   3. Second click  → commits `to`. The two endpoints snap to
//                      chronological order so `from <= to`.
//   4. Further click → starts a new range (treats current click as a
//                      fresh `from`).
//
// Drag-to-resize the COMMITTED endpoints (after step 3) is also
// supported, same as DatePicker's range mode.
'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { DEFAULT_LOCALE } from './DatePicker';
import type { DateRange, DatePickerLocale } from './DatePicker';

export type { DateRange, DatePickerLocale } from './DatePicker';

export interface DateRangePickerProps {
  /** Defaults to "Período" — the canonical label for the range picker
   *  across the captain flow. Pass an empty string to hide the label
   *  entirely (e.g. when the surrounding form renders its own). */
  label?: string;
  value: DateRange;
  onChange: (value: DateRange) => void;
  /** Defaults: "Desde" / "Hasta" (or `locale.from` / `locale.to`). They
   *  render as white deliberate labels, not as faded placeholder hints. */
  fromPlaceholder?: string;
  toPlaceholder?: string;
  error?: string;
  helper?: string;
  disabled?: boolean;
  className?: string;
  /** Days drawn with green text. ISO YYYY-MM-DD. */
  highlightedDates?: string[];
  /** Locks the year header dropdown to this list. */
  yearOptions?: number[];
  /** Month/weekday names + from/to placeholders. Defaults to Spanish. */
  locale?: DatePickerLocale;
}

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

function normalizeRange(r: DateRange): DateRange {
  if (r.from && r.to && cmp(r.from, r.to) > 0) {
    return { from: r.to, to: r.from };
  }
  return r;
}

/** Inline copy of /images/chevron.svg with `currentColor` so the parent's
 *  text colour wins. The original art points DOWN. */
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

/** Inline copy of /images/arrow.svg (a left-pointing arrow) with
 *  `currentColor`. Callers rotate it via className to point the other way. */
const ArrowGlyph: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className={className}
  >
    <path
      fill="#E3F2E3"
      d="M13.2435 4.74318C13.7322 4.74318 14.1424 4.91773 14.474 5.26682C14.8056 5.61591 14.9715 6.00864 14.9715 6.445C14.9715 6.65446 14.9365 6.84646 14.8667 7.021C14.7969 7.213 14.6922 7.41373 14.5525 7.62318C14.0115 8.30391 13.3918 8.86246 12.6936 9.29882C11.978 9.75264 11.2449 10.1541 10.4944 10.5032C9.72637 10.8523 9.02819 11.2014 8.39982 11.5505C7.77146 11.8995 7.274 12.3272 6.90746 12.8334L6.88128 10.7126C7.80637 11.8297 8.83618 12.8072 9.97073 13.645C11.1053 14.4828 12.3184 15.181 13.61 15.7395C13.994 15.9141 14.282 16.141 14.474 16.4203C14.666 16.6995 14.762 17.0486 14.762 17.4675C14.762 17.9214 14.5962 18.3054 14.2645 18.6195C13.9329 18.9337 13.5315 19.0908 13.0602 19.0908C12.9031 19.0908 12.7373 19.0646 12.5627 19.0123C12.3882 18.9774 12.1264 18.8814 11.7773 18.7243C10.4507 18.1483 9.12418 17.3454 7.79764 16.3155C6.47109 15.2857 5.26673 14.125 4.18455 12.8334C4.02746 12.6588 3.914 12.493 3.84419 12.3359C3.77437 12.1788 3.73946 11.9955 3.73946 11.7861C3.73946 11.6115 3.77437 11.4457 3.84419 11.2886C3.89655 11.1315 3.98382 10.9745 4.10601 10.8174C4.50746 10.2937 5.03109 9.84864 5.67691 9.48209C6.32273 9.133 7.02091 8.78391 7.77146 8.43482C8.50455 8.08573 9.22891 7.68428 9.94455 7.23046C10.6427 6.79409 11.2536 6.22682 11.7773 5.52864C11.9693 5.28427 12.1962 5.09227 12.458 4.95264C12.7198 4.813 12.9816 4.74318 13.2435 4.74318ZM12.9555 10.4508C13.1998 10.4508 13.4355 10.4595 13.6624 10.477C13.8893 10.5119 14.1685 10.5381 14.5002 10.5555C14.8318 10.573 15.2769 10.5817 15.8355 10.5817C16.3242 10.5817 16.7169 10.5643 17.0136 10.5294C17.3104 10.5119 17.5809 10.4857 17.8253 10.4508C18.0522 10.4159 18.3227 10.3985 18.6369 10.3985C19.1082 10.3985 19.4835 10.5294 19.7627 10.7912C20.042 11.0705 20.1816 11.4283 20.1816 11.8646C20.1816 12.3185 20.0507 12.7461 19.7889 13.1475C19.5271 13.5665 19.1431 13.8108 18.6369 13.8806C18.1656 13.933 17.6944 13.9766 17.2231 14.0115C16.7518 14.0465 16.2893 14.0639 15.8355 14.0639C15.3118 14.0639 14.7795 14.0465 14.2384 14.0115C13.6973 13.9766 13.1824 13.9243 12.6936 13.8545C12.1525 13.7497 11.7424 13.5315 11.4631 13.1999C11.1838 12.8857 11.0442 12.4755 11.0442 11.9694C11.0442 11.4806 11.2362 11.1054 11.6202 10.8435C12.0042 10.5817 12.4493 10.4508 12.9555 10.4508Z"
    />
  </svg>
);

/** Same combobox-style dropdown used by DatePicker's calendar header. */
const HeaderDropdown: React.FC<{
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (v: number) => void;
  inputMode?: 'text' | 'numeric';
  widthClass?: string;
}> = ({ label, options, value, onChange, inputMode = 'text', widthClass = '' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Ref on the active option's button — used to scroll it into view
  // when the dropdown opens (see DatePicker for the same trick).
  const activeOptionRef = useRef<HTMLButtonElement>(null);

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

  // Strip diacritics by hand — tsconfig target predates /\p{Diacritic}/u.
  const norm = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    const q = norm(query.trim());
    return options.filter((o) => norm(o.label).includes(q));
  }, [options, query]);

  const currentLabel = options.find((o) => o.value === value)?.label ?? String(value);

  const commit = (next: number) => { onChange(next); setOpen(false); };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputMode === 'numeric') {
        const n = parseInt(query.trim(), 10);
        if (!isNaN(n)) {
          if (options.some((o) => o.value === n)) commit(n);
          else if (n >= 1000 && n <= 9999) commit(n);
          return;
        }
      }
      if (filtered.length > 0) commit(filtered[0].value);
    }
  };

  return (
    <div className="relative" ref={ref}>
      {open ? (
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

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label = 'Período',
  value,
  onChange,
  fromPlaceholder,
  toPlaceholder,
  error,
  helper,
  disabled = false,
  className = '',
  highlightedDates,
  yearOptions,
  locale = DEFAULT_LOCALE,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger row + portalled panel refs. The panel is rendered into
  // <body> so an overflow:auto ancestor (Modal.Content, etc.) can't
  // clip it; we measure the trigger and reposition the panel on every
  // scroll/resize while open.
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);
  // Hover-preview state: the iso of the cell currently under the cursor
  // while the captain has clicked `from` but hasn't clicked `to` yet.
  const [hoverIso, setHoverIso] = useState<string | null>(null);
  // Drag-to-resize on committed endpoints (post step 3 above).
  const dragRef = useRef<{ endpoint: 'from' | 'to'; moved: boolean } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Placeholders fall back to the locale's from/to, then to Spanish.
  const resolvedFromPlaceholder = fromPlaceholder ?? locale.from ?? 'Desde';
  const resolvedToPlaceholder = toPlaceholder ?? locale.to ?? 'Hasta';

  const r = normalizeRange(value);
  const bothCommitted = !!(r.from && r.to);
  const onlyFromCommitted = !!r.from && !r.to;

  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  // Anchor the visible month to the from end if set, else today.
  const seed = parseDate(r.from || r.to || '');
  const [viewYear, setViewYear] = useState(seed?.year ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(seed?.month ?? today.getMonth());

  useEffect(() => {
    if (isOpen) return;
    // When the picker is closed and the captain edits the range from
    // outside, realign the visible month on next open.
    const s = parseDate(r.from || r.to || '');
    if (s) { setViewYear(s.year); setViewMonth(s.month); }
  }, [r.from, r.to, isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Panel is portalled to <body>, so it's NOT inside containerRef.
      const insideTrigger = !!containerRef.current?.contains(target);
      const insidePanel = !!panelRef.current?.contains(target);
      if (!insideTrigger && !insidePanel) {
        setIsOpen(false);
        setHoverIso(null);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // While open, keep the portalled panel glued to the trigger row. We
  // use the trigger ROW (not a single input) because the range picker
  // has two inputs side-by-side and the panel should sit centred under
  // both. `capture: true` catches scrolls of any ancestor.
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
      // Flip ABOVE if the panel would overflow the viewport bottom.
      if (top + PANEL_HEIGHT_ESTIMATE > window.innerHeight) {
        top = Math.max(GAP, rect.top - GAP - PANEL_HEIGHT_ESTIMATE);
      }
      // Center the panel horizontally below the row, clamped to viewport.
      let left = rect.left + rect.width / 2 - PANEL_WIDTH / 2;
      left = Math.max(GAP, Math.min(left, window.innerWidth - GAP - PANEL_WIDTH));
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
    // Ascending; the dropdown auto-scrolls to the active year on open.
    // See DatePicker for the same logic.
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

  // Build the 6×7 grid with prev/next month spillover (grey-tinted).
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
    cells.push({ day: d, year: prevMonthYear, month: prevMonth, kind: 'prev', iso: formatDate(prevMonthYear, prevMonth, d) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, year: viewYear, month: viewMonth, kind: 'curr', iso: formatDate(viewYear, viewMonth, d) });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, year: nextMonthYear, month: nextMonth, kind: 'next', iso: formatDate(nextMonthYear, nextMonth, nextDay) });
    nextDay++;
  }

  /** Effective range to paint — the committed value EXCEPT when the
   *  captain has only clicked `from` and is hovering a candidate `to`;
   *  in that case we paint a tentative range using `hoverIso`. */
  const paintRange = useMemo<DateRange>(() => {
    if (onlyFromCommitted && hoverIso) {
      return normalizeRange({ from: r.from, to: hoverIso });
    }
    return r;
  }, [onlyFromCommitted, hoverIso, r.from, r.to]);

  const inRange = (iso: string): { isFrom: boolean; isTo: boolean; isMid: boolean } => {
    const pr = paintRange;
    if (!pr.from && !pr.to) return { isFrom: false, isTo: false, isMid: false };
    if (!pr.from || !pr.to) {
      return { isFrom: iso === pr.from, isTo: iso === pr.to, isMid: false };
    }
    const isFrom = iso === pr.from;
    const isTo = iso === pr.to;
    const isMid = !isFrom && !isTo && cmp(iso, pr.from) > 0 && cmp(iso, pr.to) < 0;
    return { isFrom, isTo, isMid };
  };

  const onCellClick = (cell: CellInfo) => {
    // Step 1: nothing committed yet OR both committed → new `from`.
    if (!r.from || bothCommitted) {
      onChange({ from: cell.iso, to: null });
      setHoverIso(null);
      if (cell.kind !== 'curr') { setViewYear(cell.year); setViewMonth(cell.month); }
      return;
    }
    // Step 2: `from` set, no `to` → this commits `to`. Normalize so
    // from <= to regardless of which side they clicked first.
    const a = r.from!;
    const b = cell.iso;
    const sorted = cmp(a, b) <= 0 ? { from: a, to: b } : { from: b, to: a };
    onChange(sorted);
    setHoverIso(null);
    setIsOpen(false);
  };

  const onCellEnter = (cell: CellInfo) => {
    if (onlyFromCommitted) setHoverIso(cell.iso);
  };

  /** Walk up from the pointer target to the data-iso cell. */
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
    cell: CellInfo,
  ) => {
    // Only allow drag on committed endpoints — otherwise let the click
    // path (above) handle the first/second click flow.
    if (!bothCommitted) return;
    const isFromCell = !!r.from && r.from === cell.iso;
    const isToCell = !!r.to && r.to === cell.iso;
    if (!isFromCell && !isToCell) return;
    const endpoint: 'from' | 'to' = isFromCell && isToCell
      ? 'to'
      : (isFromCell ? 'from' : 'to');
    dragRef.current = { endpoint, moved: false };
    setDragActive(true);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const hit = findCellFromPoint(e.clientX, e.clientY);
    if (!hit) return;
    const currentIso = drag.endpoint === 'from' ? r.from : r.to;
    if (hit.iso === currentIso) return;
    drag.moved = true;
    const next: DateRange = drag.endpoint === 'from'
      ? { from: hit.iso, to: r.to }
      : { from: r.from, to: hit.iso };
    onChange(next);
    if (hit.kind !== 'curr') { setViewYear(hit.year); setViewMonth(hit.month); }
  };

  const onGridPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch { /* ignore */ }
    dragRef.current = null;
    requestAnimationFrame(() => setDragActive(false));
  };

  const fromLabel = r.from ? formatDisplayDate(r.from, locale.months) : '';
  const toLabel = r.to ? formatDisplayDate(r.to, locale.months) : '';

  return (
    <div className={`flex flex-col gap-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="font-inter font-bold text-white">{label}</label>
      )}
      <div className="relative">
        {/* Two inputs reading as a single "from → to" range. On desktop
            they sit side-by-side with an arrow glyph between them; on
            mobile they stack and the arrow rotates to point downward.
            Both inputs open the SAME calendar — we don't track which
            side was clicked because the picker always edits the same
            shared range. */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3" ref={triggerRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen((o) => !o)}
            disabled={disabled}
            className={`flex-1 w-full md:w-auto h-[44px] px-4 border-2 rounded-[16px] font-inter text-base text-left
              focus:outline-none transition-colors flex items-center
              disabled:cursor-not-allowed disabled:opacity-60 text-white
              ${error ? 'bg-black border-red' : 'bg-black border-lgray'}`}
          >
            <span className="truncate">{fromLabel || resolvedFromPlaceholder}</span>
          </button>

          {/* Arrow glyph between the inputs. Source asset is
              arrow.svg (a left-pointing arrow); we rotate it 180° to
              point right on desktop, and 90° to point downward when
              the inputs stack on mobile. */}
          <span
            aria-hidden
            className="flex-shrink-0 flex items-center justify-center self-center"
          >
            <ArrowGlyph className="w-5 h-5 rotate-90 md:rotate-180" />
          </span>

          <button
            type="button"
            onClick={() => !disabled && setIsOpen((o) => !o)}
            disabled={disabled}
            className={`flex-1 w-full md:w-auto h-[44px] px-4 border-2 rounded-[16px] font-inter text-base text-left
              focus:outline-none transition-colors flex items-center
              disabled:cursor-not-allowed disabled:opacity-60 text-white
              ${error ? 'bg-black border-red' : 'bg-black border-lgray'}`}
          >
            <span className="truncate">{toLabel || resolvedToPlaceholder}</span>
          </button>
        </div>

        {isOpen && panelPos && typeof document !== 'undefined' && createPortal(
          // Rendered as `position: fixed` and portalled to <body> so the
          // calendar can escape any ancestor with `overflow: auto`
          // (Modal.Content, sidebars, etc.). Position is recomputed
          // from the trigger row's bounding rect on every scroll/resize.
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
                  <ChevronGlyph size={14} className="rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  aria-label="Mes siguiente"
                  className="hover:opacity-70 transition-opacity p-0.5"
                >
                  <ChevronGlyph size={14} className="-rotate-90" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-1 px-2">
              {locale.weekdays.map((d, idx) => (
                <div key={`${d}-${idx}`} className="text-center text-white text-xs font-inter font-semibold">
                  {d}
                </div>
              ))}
            </div>

            <div className="bg-black rounded-2xl p-2">
              <div
                className="grid grid-cols-7"
                onPointerMove={onGridPointerMove}
                onPointerUp={onGridPointerUp}
                onPointerCancel={onGridPointerUp}
                onMouseLeave={() => setHoverIso(null)}
              >
                {cells.map((cell, i) => {
                  const isToday = cell.iso === todayStr;
                  const isHighlighted = highlightSet.has(cell.iso);
                  const isCurr = cell.kind === 'curr';

                  const { isFrom, isTo, isMid } = inRange(cell.iso);
                  const isSelectedSolid = isFrom || isTo;

                  const pr = paintRange;
                  const bothEndsSet = !!(pr.from && pr.to);
                  const singleDayRange = bothEndsSet && pr.from === pr.to;

                  let endpointRoundingClass = 'rounded-md';
                  if (bothEndsSet && !singleDayRange) {
                    if (isFrom) endpointRoundingClass = 'rounded-l-md';
                    else if (isTo) endpointRoundingClass = 'rounded-r-md';
                  }

                  let textClass = 'text-white';
                  if (isSelectedSolid) textClass = 'text-black';
                  else if (isMid) textClass = 'text-white';
                  else if (isHighlighted) textClass = 'text-green';
                  else if (!isCurr) textClass = 'text-white/30';

                  const hoverClass = !isSelectedSolid && !isMid
                    ? 'hover:bg-blue hover:text-black'
                    : '';

                  const todayRing = isToday && !isSelectedSolid
                    ? 'ring-2 ring-orange ring-inset rounded-md'
                    : '';

                  const isCommittedEndpoint = bothCommitted &&
                    ((r.from && r.from === cell.iso) || (r.to && r.to === cell.iso));

                  return (
                    <div key={`${cell.kind}-${i}`} className="relative aspect-square">
                      {isMid && (
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: 'rgba(247, 144, 69, 0.3)' }}
                          aria-hidden
                        />
                      )}
                      {bothEndsSet && !singleDayRange && (isFrom || isTo) && (
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
                        onMouseEnter={() => onCellEnter(cell)}
                        onClick={() => {
                          if (dragActive || dragRef.current?.moved) return;
                          onCellClick(cell);
                        }}
                        className={`relative z-10 w-full h-full flex items-center justify-center text-sm font-shantell font-bold transition-colors
                          ${isSelectedSolid ? `bg-orange ${endpointRoundingClass}` : 'rounded-md'}
                          ${textClass} ${hoverClass} ${todayRing}
                          ${isCommittedEndpoint ? 'cursor-ew-resize' : ''}`}
                        style={{ touchAction: isCommittedEndpoint ? 'none' : undefined }}
                      >
                        {cell.day}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-2 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  // "Hoy" picks the current day for whichever end is
                  // outstanding. If both ends are set, treat it as a new
                  // `from` (start over).
                  if (!r.from || bothCommitted) {
                    onChange({ from: todayStr, to: null });
                    setHoverIso(null);
                  } else {
                    const sorted = cmp(r.from, todayStr) <= 0
                      ? { from: r.from, to: todayStr }
                      : { from: todayStr, to: r.from };
                    onChange(sorted);
                    setHoverIso(null);
                    setIsOpen(false);
                  }
                }}
                className="text-sm font-shantell font-bold text-orange underline hover:opacity-80 transition-opacity"
              >
                Hoy
              </button>
              {(r.from || r.to) && (
                <button
                  type="button"
                  onClick={() => {
                    onChange({ from: null, to: null });
                    setHoverIso(null);
                  }}
                  className="text-sm font-shantell font-bold text-white/60 hover:text-white underline transition-opacity"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>,
          document.body,
        )}
      </div>
      {/* Helper / error slot: `error` takes precedence and turns red. */}
      {(error || helper) && (
        <p
          className={`font-inter text-xs ${error ? 'text-red' : 'text-white'}`}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
};

export default DateRangePicker;
