'use client';

import React from 'react';
import { cn } from '../lib/cn';
import { Checkbox } from './Checkbox';
import { Select, type SelectOption } from './Select';
import { Search } from './Search';
import {
  IconAvatarEstudiante1,
  IconAvatarEstudiante2,
  IconAvatarEstudiante3,
  IconAvatarEstudiante4,
  IconAttentionMark,
  IconCheck,
  IconPendingDots,
  IconPlus,
} from './designerIcons';

/**
 * Table (Gestión) — Figma › "Table (Gestión)", section 7414:6899.
 *
 * `TableStudentRow` es la fila de estudiante (Figma › "Table Student Row",
 * frame 6034:1224: 3 Status × 4 State). Status viene por prop; de los 4 State,
 * Default/Hover son interacción real (hover del mouse) y Selected/HoverSelected
 * salen de `selected` + ese mismo hover — no hay prop `state`.
 *
 * El grupo es nombrado (`group/row`) a propósito: Checkbox reacciona a un
 * `group-hover` sin nombre (se pone celeste), y en esta fila el checkbox sin
 * marcar tiene que seguir blanco aunque la fila esté en hover.
 */
type StudentCharacter = 'estudiante-1' | 'estudiante-2' | 'estudiante-3' | 'estudiante-4';

const STUDENT_BODY: Record<StudentCharacter, React.FC<{ className?: string }>> = {
  'estudiante-1': IconAvatarEstudiante1,
  'estudiante-2': IconAvatarEstudiante2,
  'estudiante-3': IconAvatarEstudiante3,
  'estudiante-4': IconAvatarEstudiante4,
};

const STUDENT_COLOR: Record<StudentCharacter, string> = {
  'estudiante-1': 'text-green',
  'estudiante-2': 'text-magenta',
  'estudiante-3': 'text-yellow',
  'estudiante-4': 'text-blue',
};

const CONSENT_TEXT = {
  pending: 'Consentimiento pendiente de respuesta',
  'requires-action': 'No consintió',
} as const;

export interface TableStudentRowProps {
  name: string;
  /** Curso, al lado del nombre (Figma: "- Escalas B"). */
  course?: string;
  /** Active = consintió; Pending = consentimiento sin responder; RequiresAction = no consintió. */
  status?: 'active' | 'pending' | 'requires-action';
  /** Texto de abajo del nombre en Active (ej. "Última actividad: Hace 1 semana"). En Pending/RequiresAction ese lugar lo ocupa el aviso de consentimiento. */
  activity?: string;
  /** Personaje del avatar. */
  character?: StudentCharacter;
  /** Muestra el checkbox de selección (aparece en hover o si está elegida). */
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  onClick?: () => void;
  className?: string;
}

export function TableStudentRow({
  name,
  course,
  status = 'active',
  activity,
  character = 'estudiante-2',
  selectable = true,
  selected = false,
  onToggleSelect,
  onClick,
  className,
}: TableStudentRowProps) {
  const isActive = status === 'active';
  const Body = STUDENT_BODY[character];
  const text = isActive ? activity : CONSENT_TEXT[status];

  // Avatar por estado (Figma cambia el instance "estudiante" en cada variante):
  // Active → fondo gris-oscuro-800 y personaje a color; en hover el fondo pasa a
  // negro-900 y el personaje a celeste. Pending/RequiresAction → personaje
  // gris-500 con borde amarillo/rojo; solo en HoverSelected el borde y el
  // personaje se ponen celestes (en Hover a secas se quedan igual).
  const avatarClasses = isActive
    ? 'bg-darker-gray group-hover/row:bg-black'
    : cn(
        'bg-black ring-2',
        status === 'pending' ? 'ring-yellow' : 'ring-red',
        selected && 'group-hover/row:ring-blue',
      );
  const bodyClasses = isActive
    ? cn(STUDENT_COLOR[character], 'group-hover/row:text-blue')
    : cn('text-divider', selected && 'group-hover/row:text-blue');

  return (
    <div
      onClick={onClick}
      className={cn(
        'group/row flex w-full items-center gap-6 rounded-[24px] border-2 py-[14px] pl-[14px] transition-colors',
        selected ? 'border-blue' : 'border-transparent hover:bg-darker-gray',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      <span className="relative size-[72px] shrink-0">
        <span className={cn('flex size-full items-center justify-center rounded-[20px] transition-colors', avatarClasses)}>
          {/* 40×56 (el viewBox entero), no los 34×48 de Avatar: medido en el asset de esta fila. */}
          <Body className={cn('h-14 w-10 transition-colors', bodyClasses)} />
        </span>
        {!isActive && (
          <span
            className={cn(
              'absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full',
              status === 'pending' ? 'bg-yellow' : 'bg-red',
            )}
          >
            {status === 'pending' ? <IconPendingDots className="size-3" /> : <IconAttentionMark className="size-3" />}
          </span>
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-2 font-inter font-semibold">
        <div className={cn('flex gap-2 text-[20px] whitespace-nowrap', isActive ? 'text-whitesmoke group-hover/row:text-blue' : 'text-divider')}>
          <p className="truncate leading-[1.4] tracking-[0.2px]">{name}</p>
          {course && (
            <p className={cn('shrink-0 leading-[1.3]', isActive ? 'text-lightgray group-hover/row:text-blue' : 'text-gray-600')}>
              - {course}
            </p>
          )}
        </div>
        {text && (
          <p
            className={cn(
              'text-[16px] leading-6 tracking-[0.16px]',
              isActive && 'text-lightgray group-hover/row:text-whitesmoke',
              status === 'pending' && 'text-yellow group-hover/row:text-blue group-hover/row:underline',
              status === 'requires-action' && 'text-red group-hover/row:text-blue group-hover/row:underline',
            )}
          >
            {text}
          </p>
        )}
      </div>

      {selectable && (
        <div
          className={cn(
            '-mr-0.5 flex w-[104px] shrink-0 items-center justify-center',
            // Sin hover no se puede descubrir el checkbox — en pantallas táctiles queda siempre visible.
            !selected && 'invisible group-hover/row:visible group-focus-within/row:visible [@media(hover:none)]:visible',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={selected}
            onChange={() => onToggleSelect?.()}
            ariaLabel={`Elegir a ${name}`}
            className="h-10 w-10 rounded-[8px]"
          />
        </div>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
// Figma › "Table Header" (6878:2270), "Table Header Add Button" (6832:3382) y
// "Table Header Selector" (6832:3379). Device=Desktop/Mobile es un único
// componente responsive (md:), como Footer: en mobile los filtros se apilan.

const HEADER_LABEL = 'font-inter font-semibold text-[16px] leading-[1.5] tracking-[0.16px] whitespace-nowrap pb-2 transition-colors';
const HEADER_TILE = 'group/tile flex w-[104px] shrink-0 flex-col items-center justify-center rounded-[24px] p-4 transition-colors';

export interface TableHeaderAddButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function TableHeaderAddButton({ label = 'Agregar', onClick, className }: TableHeaderAddButtonProps) {
  return (
    <button type="button" onClick={onClick} className={cn(HEADER_TILE, 'h-[108px] bg-black hover:bg-blue', className)}>
      <span className={cn(HEADER_LABEL, 'text-whitesmoke group-hover/tile:text-black')}>{label}</span>
      <span className="flex size-11 items-center justify-center rounded-[16px] border-2 border-lightgray text-lightgray transition-colors group-hover/tile:border-darker-gray group-hover/tile:text-darker-gray">
        <IconPlus className="size-[26.4px]" />
      </span>
    </button>
  );
}

export interface TableHeaderSelectorProps {
  /** Total de filas elegibles. */
  total: number;
  /** Cuántas están elegidas: 0 = "Elegir", todas = "Todos (N)", algunas = "Selección (n)". */
  selectedCount: number;
  onToggleSelectAll?: () => void;
  disabled?: boolean;
  className?: string;
}

export function TableHeaderSelector({ total, selectedCount, onToggleSelectAll, disabled = false, className }: TableHeaderSelectorProps) {
  const none = selectedCount === 0;
  const all = !none && selectedCount >= total;
  const label = none ? 'Elegir' : all ? `Todos (${total})` : `Selección (${selectedCount})`;

  // Figma no dibuja hover para SomeSelected: se usa el mismo que AllSelectedHover.
  return (
    <button
      type="button"
      onClick={onToggleSelectAll}
      disabled={disabled}
      aria-pressed={!none}
      className={cn(HEADER_TILE, 'bg-black', !disabled && 'hover:bg-blue', className)}
    >
      <span
        className={cn(
          HEADER_LABEL,
          disabled ? 'text-divider' : none ? 'text-whitesmoke' : 'text-blue',
          !disabled && 'group-hover/tile:text-black',
        )}
      >
        {/* En hover, sin nada elegido, el label anticipa la acción. */}
        {none && !disabled ? (
          <>
            <span className="group-hover/tile:hidden">{label}</span>
            <span className="hidden group-hover/tile:inline">Elegir todos</span>
          </>
        ) : (
          label
        )}
      </span>
      <span
        className={cn(
          'flex size-11 items-center justify-center rounded-[16px] transition-colors',
          none
            ? cn('border-2', disabled ? 'border-divider' : 'border-lightgray group-hover/tile:border-black')
            : 'bg-blue text-black group-hover/tile:bg-black group-hover/tile:text-blue',
        )}
      >
        {!none && <IconCheck className="size-8" />}
      </span>
    </button>
  );
}

export interface TableHeaderProps {
  onAdd?: () => void;
  filterOptions: SelectOption[];
  filterValue: string;
  onFilterChange: (value: string) => void;
  sortOptions: SelectOption[];
  sortValue: string;
  onSortChange: (value: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  /** Ver TableHeaderSelector. */
  total: number;
  selectedCount: number;
  onToggleSelectAll?: () => void;
  selectDisabled?: boolean;
  className?: string;
}

export function TableHeader({
  onAdd,
  filterOptions,
  filterValue,
  onFilterChange,
  sortOptions,
  sortValue,
  onSortChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar',
  total,
  selectedCount,
  onToggleSelectAll,
  selectDisabled,
  className,
}: TableHeaderProps) {
  return (
    <div className={cn('flex w-full items-start pb-6 md:items-center', className)}>
      <TableHeaderAddButton onClick={onAdd} />
      <div className="flex min-w-0 flex-1 flex-col gap-5 py-4 md:h-[108px] md:flex-row md:items-end md:gap-4">
        <Select variant="neutral" label="Filtrar por" options={filterOptions} value={filterValue} onChange={onFilterChange} className="min-w-0 md:flex-1" />
        <Select variant="neutral" label="Ordenar por" options={sortOptions} value={sortValue} onChange={onSortChange} className="min-w-0 md:flex-1" />
        {/* Envuelto: con flex-basis 0 el padding+borde propio de Search (28px) se sumaba y lo dejaba más ancho que los Select. */}
        <div className="min-w-0 md:flex-1">
          <Search value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} className="max-w-none" />
        </div>
      </div>
      <TableHeaderSelector total={total} selectedCount={selectedCount} onToggleSelectAll={onToggleSelectAll} disabled={selectDisabled} />
    </div>
  );
}

export interface TableFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function TableFooter({ children, className }: TableFooterProps) {
  return (
    <div className={cn('flex w-full items-center justify-center gap-4 rounded-2xl bg-darker-gray p-4', className)}>
      {children}
    </div>
  );
}

export default TableStudentRow;
