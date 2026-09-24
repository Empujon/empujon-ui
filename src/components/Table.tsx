'use client';

import React from 'react';
import { cn } from '../lib/cn';
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
  IconAccionEditar,
  IconAccionEditarFilled,
  IconAccionMensajes,
  IconAccionMensajesFilled,
  IconAccionMover,
  IconAccionMoverFilled,
  IconAccionConsentimiento,
  IconAccionConsentimientoFilled,
  IconAccionInformes,
  IconAccionInformesFilled,
  IconAccionEliminar,
  IconAccionEliminarFilled,
  IconGlifoEditar,
  IconGlifoMensajes,
  IconGlifoMover,
  IconGlifoConsentimiento,
  IconGlifoInformes,
  IconGlifoEliminar,
} from './designerIcons';

/**
 * Table (Gestión) — Figma › "Table (Gestión)", section 7414:6899.
 *
 * `TableStudentRow` es la fila de estudiante (Figma › "Table Student Row",
 * frame 6034:1224: 3 Status × 4 State). Status viene por prop; de los 4 State,
 * Default/Hover son interacción real (hover del mouse) y Selected/HoverSelected
 * salen de `selected` + ese mismo hover — no hay prop `state`.
 *
 * El grupo es nombrado (`group/row`) para que ningún `group-hover` sin nombre
 * de un componente anidado reaccione al hover de la fila.
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
  /** Se llama al hacer click en cualquier parte de la fila (o en el checkbox). */
  onToggleSelect?: () => void;
  /** Click en el nombre (ej. abrir el perfil). Si se pasa, el click en el nombre no elige la fila. */
  onNameClick?: () => void;
  /** Click en el aviso de consentimiento (Pending/RequiresAction). Independiente de elegir la fila. */
  onConsentClick?: () => void;
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
  onNameClick,
  onConsentClick,
  className,
}: TableStudentRowProps) {
  const isActive = status === 'active';
  const Body = STUDENT_BODY[character];
  const text = isActive ? activity : CONSENT_TEXT[status];

  // Avatar por estado (Figma cambia el instance "estudiante" en cada variante):
  // Active → fondo gris-oscuro-800 siempre (también en hover, pedido de Rocío
  // 2026-09-23) y personaje a color; en hover el personaje pasa a celeste. Pending/RequiresAction → personaje
  // gris-500 con borde amarillo/rojo; solo en HoverSelected el borde y el
  // personaje se ponen celestes. Pedido de Rocío (2026-09-23): en Hover a secas
  // el personaje también pasa a celeste; el borde se queda amarillo/rojo.
  const avatarClasses = isActive
    ? 'bg-darker-gray'
    : cn(
        'bg-black ring-2',
        status === 'pending' ? 'ring-yellow' : 'ring-red',
        selected && 'group-hover/row:ring-blue',
      );
  const bodyClasses = isActive
    ? cn(STUDENT_COLOR[character], 'group-hover/row:text-blue')
    : 'text-divider group-hover/row:text-blue';

  return (
    <div
      // Toda la fila elige/desmarca; el teclado lo resuelve el checkbox de adentro.
      onClick={selectable ? onToggleSelect : undefined}
      className={cn(
        'group/row flex w-full items-center gap-6 rounded-[24px] border-2 py-[14px] pl-[14px] transition-colors',
        selected ? 'border-blue' : 'border-transparent hover:bg-darker-gray',
        selectable && 'cursor-pointer',
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
        <div className="flex gap-2 text-[20px] whitespace-nowrap">
          {/* Figma (2026-09-24): con hover en la fila el nombre queda blanco (en
              Pending/RequiresAction elegida sigue gris); "Hover on name" lo pasa a
              celeste con el subrayado de enlace/grande (Inter Medium, ondulado 15%). */}
          <button
            type="button"
            onClick={(e) => {
              if (!onNameClick) return;
              e.stopPropagation();
              onNameClick();
            }}
            className={cn(
              // pb-1/-mb-1: `truncate` corta lo que sobresale y el ondulado de 3px quedaba recortado abajo.
              'min-w-0 truncate pb-1 -mb-1 text-left leading-[1.4] tracking-[0.2px] transition-colors',
              isActive ? 'text-whitesmoke' : cn('text-divider', !selected && 'group-hover/row:text-whitesmoke'),
              'hover:font-medium hover:tracking-normal hover:!text-blue hover:underline hover:decoration-wavy hover:decoration-[15%] hover:[text-decoration-skip-ink:none] hover:[text-underline-position:from-font]',
            )}
          >
            {name}
          </button>
          {course && (
            <p className={cn('shrink-0 leading-[1.3]', isActive ? 'text-lightgray group-hover/row:text-blue' : 'text-gray-600')}>
              - {course}
            </p>
          )}
        </div>
        {text && isActive && (
          <p className="text-[16px] leading-6 tracking-[0.16px] text-lightgray group-hover/row:text-whitesmoke">{text}</p>
        )}
        {text && !isActive && (
          // El aviso de consentimiento es su propio click (no elige la fila): el
          // hover de la fila no lo toca, solo el hover sobre el texto mismo.
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConsentClick?.();
            }}
            className={cn(
              'self-start text-left text-[16px] leading-6 tracking-[0.16px] transition-colors hover:text-blue hover:underline',
              status === 'pending' ? 'text-yellow' : 'text-red',
            )}
          >
            {text}
          </button>
        )}
      </div>

      {selectable && (
        <div
          className={cn(
            '-mr-0.5 flex w-[104px] shrink-0 items-center justify-center',
            // Sin hover no se puede descubrir el checkbox — en pantallas táctiles queda siempre visible.
            !selected && 'invisible group-hover/row:visible group-focus-within/row:visible [@media(hover:none)]:visible',
          )}
          // Sin esto el click en el checkbox llegaría también a la fila y lo marcaría dos veces (= no cambia).
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mismo cuadro que el "Elegir" del header (44px, radio 16, tilde negro sobre
              celeste), no el Checkbox general de la librería: pedido de Rocío 2026-09-23,
              solo para la tabla. */}
          <span className="relative flex size-11 items-center justify-center">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggleSelect?.()}
              aria-label={`Elegir a ${name}`}
              className={cn(
                'absolute inset-0 cursor-pointer appearance-none rounded-[16px] border-2 transition-colors',
                selected ? 'border-blue bg-blue' : 'border-lightgray bg-transparent',
              )}
            />
            {selected && <IconCheck className="pointer-events-none relative size-8 text-black" />}
          </span>
        </div>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
// Figma › "Table Header" (6878:2270), "Table Header Add Button" (6832:3382) y
// "Table Header Selector" (6832:3379). Device=Desktop/Mobile es un único
// componente responsive (sm:), como Footer: en mobile los filtros se apilan.

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
    <div className={cn('flex w-full items-start pb-6 sm:items-center', className)}>
      <TableHeaderAddButton onClick={onAdd} />
      <div className="flex min-w-0 flex-1 flex-col gap-5 py-4 sm:h-[108px] sm:flex-row sm:items-end sm:gap-4 sm:px-2">
        <Select variant="neutral" label="Filtrar por" options={filterOptions} value={filterValue} onChange={onFilterChange} className="min-w-0 sm:flex-1" />
        <Select variant="neutral" label="Ordenar por" options={sortOptions} value={sortValue} onChange={onSortChange} className="min-w-0 sm:flex-1" />
        {/* Envuelto: con flex-basis 0 el padding+borde propio de Search (28px) se sumaba y lo dejaba más ancho que los Select. */}
        <div className="min-w-0 sm:flex-1">
          <Search value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} className="max-w-none" />
        </div>
      </div>
      <TableHeaderSelector total={total} selectedCount={selectedCount} onToggleSelectAll={onToggleSelectAll} disabled={selectDisabled} />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
// Figma › "Table Footer" (6034:567), "Action Button" (6228:9060) y "Table Footer
// Buttons Mobile" (6850:1973). Responsive con sm:, como el header: en desktop una
// barra de Action Buttons de 120px; en mobile una lista con hover celeste.
//
// Action Button: Default = ícono de contorno; Hover = fondo celeste + ícono filled
// negro; Active (mientras se aprieta) = ícono filled y label naranja sin fondo;
// Disabled = gris-oscuro-600. Figma apunta todos los "Icon Filled" a "mensajes
// filled" (quedó sin cambiar en las instancias): acá cada acción usa el suyo.

export type TableFooterAction = 'editar' | 'mensajes' | 'mover' | 'consentimiento' | 'informes' | 'eliminar';

type IconFC = React.FC<{ className?: string }>;

const FOOTER_ICONS: Record<TableFooterAction, { label: string; icon: IconFC; filled: IconFC; glyph: IconFC }> = {
  editar: { label: 'Editar', icon: IconAccionEditar, filled: IconAccionEditarFilled, glyph: IconGlifoEditar },
  mensajes: { label: 'Mensajes', icon: IconAccionMensajes, filled: IconAccionMensajesFilled, glyph: IconGlifoMensajes },
  mover: { label: 'Mover', icon: IconAccionMover, filled: IconAccionMoverFilled, glyph: IconGlifoMover },
  consentimiento: { label: 'Consentimiento', icon: IconAccionConsentimiento, filled: IconAccionConsentimientoFilled, glyph: IconGlifoConsentimiento },
  informes: { label: 'Informes', icon: IconAccionInformes, filled: IconAccionInformesFilled, glyph: IconGlifoInformes },
  eliminar: { label: 'Eliminar', icon: IconAccionEliminar, filled: IconAccionEliminarFilled, glyph: IconGlifoEliminar },
};

export interface TableFooterItem {
  action: TableFooterAction;
  /** Por defecto, el nombre de la acción ("Editar", "Mover"…). */
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface TableFooterProps {
  actions: TableFooterItem[];
  className?: string;
}

export function TableFooter({ actions, className }: TableFooterProps) {
  return (
    <div className={cn('w-full rounded-t-[24px] bg-darker-gray', className)}>
      {/* justify-evenly + maxWidth = n·120 + (n+1)·40: al ancho completo da exactamente el
          px-40 / gap-40 del Figma, y cuando el espacio no alcanza (justo arriba de 640px) los
          espacios se achican en vez de cortar botones. */}
      <div
        className="mx-auto hidden items-center justify-evenly sm:flex"
        style={{ maxWidth: actions.length * 120 + (actions.length + 1) * 40 }}
      >
        {actions.map((a) => {
          const { label, icon: Icon, filled: Filled } = FOOTER_ICONS[a.action];
          return (
            <button
              key={a.action}
              type="button"
              onClick={a.onClick}
              disabled={a.disabled}
              className={cn(
                // Se achica (min-w-0) solo si ni sin espacios entran; el label no se corta (nowrap, visible).
                'group/act flex h-[120px] min-w-0 max-w-[120px] flex-1 flex-col items-center justify-center gap-2 rounded-t-[12.308px] transition-colors',
                !a.disabled && 'hover:bg-blue active:bg-transparent',
              )}
            >
              <span className="relative size-[61.538px] shrink-0">
                <Icon
                  className={cn(
                    'absolute inset-0 size-full',
                    a.disabled ? 'text-gray-600' : 'text-whitesmoke group-hover/act:hidden group-active/act:hidden',
                  )}
                />
                {!a.disabled && (
                  <Filled className="absolute inset-0 hidden size-full text-black group-hover/act:block group-active/act:block group-active/act:text-orange" />
                )}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap font-inter font-semibold text-[12.308px] leading-[18.462px] tracking-[0.1231px] text-center',
                  a.disabled ? 'text-gray-600' : 'text-whitesmoke group-hover/act:text-black group-active/act:text-orange',
                )}
              >
                {a.label ?? label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col py-1 sm:hidden">
        {actions.map((a) => {
          const { label, glyph: Glyph } = FOOTER_ICONS[a.action];
          return (
            <button
              key={a.action}
              type="button"
              onClick={a.onClick}
              disabled={a.disabled}
              className={cn(
                'flex w-full items-center gap-4 rounded-[16px] px-6 py-3 text-left font-inter font-semibold text-[16px] leading-6 tracking-[0.16px] transition-colors',
                a.disabled ? 'text-gray-600' : 'text-whitesmoke hover:bg-blue hover:text-black',
              )}
            >
              <Glyph className="size-8 shrink-0" />
              {a.label ?? label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TableStudentRow;
